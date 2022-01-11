require('module-alias/register')
const express = require('express')
const app = express()
// const socketio = require('socket.io')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

//routes which should handle requests
const userRouter = require('./api/routes/userRoute')
const postRouter = require('./api/routes/postRoute')
const professionRouter = require('./api/routes/professionRoute')
const forgotPasswordRouter = require('./api/routes/forgotPasswordRoute')
const friendRequestRouter = require('./api/routes/friendRequestRoute')
const smileyStickerRouter = require('./api/routes/smileyStickerRoute')
const searchRouter = require('./api/routes/searchRoute')
const guidelineRouter = require('./api/routes/guidelineRoute')
const settingRouter = require('./api/routes/settingRoute')
const helpAndSupportRouter = require('./api/routes/helpAndSupportRoute')
const companyRouter = require('./api/routes/companyRoute')
const chatRouter = require('./api/routes/chatRoute')
const quizRouter = require('./api/routes/quizRoute')

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

var db = mongoose.connection
db.on('error', console.error.bind(console, 'Connection error:'))
db.once('open', function callback () {
  console.log('Database Connected! API URL : ' + process.env.PROXY)
})

exports.skyBook = function (req, res) {
  res.render('skyBook')
}

mongoose.promise = global.Promise

app.use(morgan('dev'))
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// app.use('cors');
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    return res.status(200).json({})
  }
  next()
})

app.use('/user', userRouter)
app.use('/quiz', quizRouter)
app.use('/post', postRouter)
app.use('/friendRequest', friendRequestRouter)
app.use('/profession', professionRouter)
app.use('/forgotPassword', forgotPasswordRouter)
app.use('/smileySticker', smileyStickerRouter)
app.use('/search', searchRouter)
app.use('/guideline', guidelineRouter)
app.use('/setting', settingRouter)
app.use('/helpAndSupport', helpAndSupportRouter)
app.use('/company', companyRouter)
app.use('/chat', chatRouter)

app.use((req, res, next) => {
  const error = new Error('URL Not found or Please Check POST or GET')
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message
    }
  })
})

module.exports = app
