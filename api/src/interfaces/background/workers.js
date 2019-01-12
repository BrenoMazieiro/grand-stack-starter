// Instantiate the worker module object
const workers = {}

// Do something
workers.doTheThing = function(){
    console.log('\x1b[35m%s\x1b[0m','I did the thing')
}

// Do the other thing
workers.doTheOtherThing = function(){
    console.log('\x1b[35m%s\x1b[0m','I did other thing')
}

// Timer to execute the worker-process once per 6 hours
workers.loop = function(){
  setInterval(function(){
    workers.doTheThing()
    workers.doTheOtherThing()
  },1000 * 60 * 60 * 6)
}

// Init script
workers.init = function(){

  // Send to console, in yellow
  console.log('\x1b[33m%s\x1b[0m','Background workers are running')

  // Do the thing
  workers.doTheThing()

  // Do the other thing
  workers.doTheOtherThing()

  // Call the loop to keep doing things
  workers.loop()

}


// Export the module
export default workers
