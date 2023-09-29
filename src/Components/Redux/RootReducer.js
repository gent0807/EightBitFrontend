import { combineReducers } from "redux";
import User from "./User";
import RegisterReplyText from "./RegisterReplyText";
import RegisterReCommentText from "./RegisterReCommentText";


const rootReducer = combineReducers({user:User, registerReplyText:RegisterReplyText, registerReCommentText:RegisterReCommentText});

export default rootReducer;
