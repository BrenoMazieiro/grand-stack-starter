/*
 * Primary file for API
 *
 */

// Dependencies
import server from './interfaces/http/server'
import workers from'./interfaces/background/workers'

// Declare the app
var app = {}

// Init function
app.init = function(){

  // Start the server
  server.init()

  // Start the workers
  workers.init()

}

// Self executing
app.init()


// Export the app
module.exports = app
