import { ApolloError } from 'apollo-server'
const moment = require('moment')

const required = (value) => {
  return !value
}

const max = (value, max) => {
  if (required(value)) {
    return false
  }
  if (typeof value === 'string') {
    return value.length > Number(max)
  }
  if (typeof value === 'number') {
    return value > Number(max)
  }
  if (value instanceof Date) {
    if (max === 'now') {
      return moment(value).isAfter(moment())
    }
    return moment(value).isAfter(moment(max))
  }
  return false
}

const min = (value, min) => {
  if (required(value)) {
    return false
  }
  if (typeof value === 'string') {
    return value.length < Number(min)
  }
  if (typeof value === 'number') {
    return value < Number(min)
  }
  if (value instanceof Date) {
    if (min === 'now') {
      return moment(value).isBefore(moment())
    }
    return moment(value).isBefore(moment(min))
  }
  return false
}

const numberValue = (value) => {
  if (required(value)) {
    return false
  }
  return isNaN(value)
}

const length = (value, minimo, maximo) => {
  return !required(value) && (min(value, minimo) || max(value, maximo))
}

const enumValue = (value, enums) => {
  return enums.find(e => e === value) === undefined
}

const email = (email) => {
  if (!email || email.length > 254){
    return true
  }

  // eslint-disable-next-line no-useless-escape
  const tester = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/
  const valid = tester.test(email)
  if (!valid){
    return true
  }

  // Further checking of some things regex can't handle
  const parts = email.split("@")
  if (parts[0].length > 64){
    return true
  }

  const domainParts = parts[1].split(".")
  if (domainParts.some(part => part.length > 63 )){
    return true
  }

  return false
}

const validationField = (value, test) => {
  return test.split('|')
    .map(rule => rule.trim())
    .filter(rule => !!rule)
    .map(rule => {
      const [method, ...params] = rule.split(':')
      const [minValue, maxValue] = params
      switch (method) {
        case 'max':
          return max(value, params) ? `The max value lenght should be ${maxValue}` : null
        case 'min':
          return min(value, params) ? `The max value lenght should be ${minValue}` : null
        case 'length':
          return length(value, minValue, maxValue) ? `The value lenght should be between ${minValue} and ${maxValue}` : null
        case 'enum':
          return enumValue(value, params) ? 'An enum value was expected' : null
        case 'number':
          return numberValue(value) ? 'An number was expected' : null
        case 'email':
          return email(value) ? 'Invalid Email' : null
        case 'required':
          return required(value) ? 'Required Field' : null
        default:
          return null
      }
    })
    .filter(error => error !== null)
}

const getValueObject = (key, value) => {
  if (key === undefined) {
    return null
  }
  const keys = key.split('.')
  let obj = value
  for(let i = 0; i < keys.length; i++) {
    if (!(keys[i] in obj)) {
      return null
    }
    if (i === (keys.length - 1)) {
      return obj[keys[i]]
    }
    obj = obj[keys[i]]
  }
  return null
}

export const validation = (value, rules) => {
  if (rules === undefined) {
    return true
  }

  const errors = rules
    .map(rule => Object.assign({key: '', message: '', test: ''}, rule))
    .map(({ key, message, test }) => {
      const resultValidation = validationField(getValueObject(key, value), test)
      return resultValidation.length > 0 ? { key, messages: [!message ? resultValidation : message] } : null
    })
    .filter(error => error !== null)

  if (errors.length) {
    throw new ApolloError('There was error(s) validating the params!', 'form_arguments_invalid', errors)
  }

  return true
}
