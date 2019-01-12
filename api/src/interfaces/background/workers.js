import { worker } from "cluster";

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

workers.whenAgain = function(minutes) {
  console.log('\x1b[35m%s\x1b[0m', `Waiting ${minutes} minute(s) to do stuffs again...`)
}

// Timer to execute the worker-process once per some minutes
workers.loop = function(minutes){
  setInterval(function(){
    workers.doTheThing()
    workers.doTheOtherThing()
    workers.whenAgain(minutes)
  },1000 * 60 * minutes)
}

// Init script
workers.init = function(){
  const minutes = process.env.WORKER_MINUTES || 0.2
  // Send to console, in yellow
  console.log('\x1b[33m%s\x1b[0m','🤖 Background workers are running 🤖')

  // Do the thing
  workers.doTheThing()

  // Do the other thing
  workers.doTheOtherThing()

  // When is going to happen again?
  workers.whenAgain(minutes)

  // Call the loop to keep doing things
  workers.loop(minutes)

}


// Export the module
export default workers
