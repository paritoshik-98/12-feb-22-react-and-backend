import { createStore, combineReducers, applyMiddleware } from "redux" ;
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { UserLoginReducer, UserRegisterReducer, UserUpdateReducer } from "./Reducers/userReducers";
import { BlogCreateReducer, BlogDeleteReducer, BlogFetchReducer, BlogLikeReducer, BlogListReducer, BlogUpdateReducer, MyBlogReducer } from "./Reducers/blogReducers";

const rootReducer = combineReducers({
    userLogin : UserLoginReducer,
    userRegister : UserRegisterReducer,
    userUpdate : UserUpdateReducer,
    createBlog : BlogCreateReducer,
    updateBlog : BlogUpdateReducer,
    deleteBlog : BlogDeleteReducer,
    fetchBlog : BlogFetchReducer,
    blogList : BlogListReducer,
    myBlogs : MyBlogReducer,
    likeBlog : BlogLikeReducer
})

const userFromLS = () =>  localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')) : null 

const initialState = {
    userLogin:{
        user: userFromLS(),
        accessToken:localStorage.getItem('accessToken')
    }
}

const store = createStore(rootReducer,initialState,composeWithDevTools(applyMiddleware(thunk)));

export default store