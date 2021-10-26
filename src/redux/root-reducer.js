import { combineReducers } from "redux";
import userReducer from './user/user.reducer';
import blogReducer from "./blog/blog.reducer";

export default combineReducers({
    user: userReducer,
    blog: blogReducer
})