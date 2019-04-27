import server from './interfaces/http/server'
import workers from'./interfaces/background/workers'

(() => { server.init(); workers.init()})()
