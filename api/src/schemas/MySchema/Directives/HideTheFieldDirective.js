import { SchemaDirectiveVisitor } from 'graphql-tools'

class HideTheFieldDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition (field) {
    field.resolve = async (...args) => 'This is secret! ;)'
  }
  visitArgumentDefinition(argument) {
    argument.resolve = async (...args) => 'This is secret! ;)'
  }
  visitInputFieldDefinition(field) {
    field.resolve = async (...args) => 'This is secret! ;)'
  }
}

export default HideTheFieldDirective
