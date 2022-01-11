import { combineReducers } from 'redux'
import authReducer from './authReducer'
import profileReducer from './profileReducer'
import errorReducer from './errorReducer'
import userReducer from './userReducer'
import smileyStickerReducer from './smileyStickerReducer'
import guidelineReducer from './guidelineReducer'
import helpAndSupportReducer from './helpAndSupportReducer'
import companyReducer from './companyReducer'
import postReducer from './postReducer'
import friendReducer from './friendReducer'
import chatReducer from './chatReducer'

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  user: userReducer,
  icons: smileyStickerReducer,
  guideline: guidelineReducer,
  helpAndSupport: helpAndSupportReducer,
  company: companyReducer,
  post: postReducer,
  friend: friendReducer,
  chat: chatReducer
})
