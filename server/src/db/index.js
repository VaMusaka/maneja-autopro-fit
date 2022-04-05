// CONFIGURE AND CONNECT TO MongoDB
const mongoose = require('mongoose')

const dbURL = process.env.MONGO_URI

mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => console.log('DB  CONNECTED'))
mongoose.connection.on('error', (err) => console.log(err))
mongoose.connection.on('disconnected', () => console.log('DB DISCONNECTED'))

const gracefulShutdown = (msg, callback) => {
    mongoose.connection.close(() => {
        console.log('DB DISCONNECTED')
        callback()
    })
}

process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2')
    })
})

process.once('SIGINT', () => {
    gracefulShutdown('app terminated', () => {
        process.exit(0)
    })
})

process.on('SIGTERM', () => {
    gracefulShutdown('app shutdown', () => {
        process.exit(0)
    })
})

require('../model/schema/index')
