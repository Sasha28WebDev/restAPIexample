
const express = require('express')
const app = express()
require('dotenv').config()

const { APP_PORT, APP_IP, APP_PATH } = process.env;

const userRouter = require('./routes/user.routes')
const authRouter = require('./routes/auth.routes')

const {authenticateJWT} = require('./middleware/middleware')



app.use(express.json())

app.use('/auth', authRouter)
app.use('/api', authenticateJWT, userRouter)
//app.use('/api',auth.tokenGenerate)
const server = app.listen(APP_PORT,APP_IP,()=>console.log(`server running at http://${APP_IP}:${APP_PORT}/`))

process.on('SIGTERM', () => {
    console.info('SIGTERM signal received.');
    console.log('Closing http server.');
    server.close(() => {
      console.log('Http server closed.');
      process.exit(0);
    });
  });