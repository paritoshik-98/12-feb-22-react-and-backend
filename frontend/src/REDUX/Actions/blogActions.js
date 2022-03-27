import axios from 'axios'
import '../../Axios'

export const createBlogAction = (data) => (dispatch) => {
    try {
        dispatch({type:'BLOG_CREATE_REQUEST'})
    axios.post('/api/blog/add',data).then(res=>{
        if(res.status===200){
            dispatch({type:'BLOG_CREATE_SUCCESS'})
        }
    }).catch(err=>dispatch({type:'BLOG_CREATE_FAIL',payload:err.response.data}))
    }
     catch (error) {
        dispatch({type:'BLOG_CREATE_FAIL',payload:error.message})    
    }
    
} 

export const updateBlogAction = (data,id) => (dispatch) => {
    try {
        dispatch({type:'BLOG_UPDATE_REQUEST'})
        const path = '/api/blog/'+id+'/edit'
        axios.put(path,data).then(res=>{
        if(res.status===200){
            dispatch({type:'BLOG_UPDATE_SUCCESS'})
        }
    }).catch(err=>dispatch({type:'BLOG_UPDATE_FAIL',payload:err.response.data}))
    }
     catch (error) {
        dispatch({type:'BLOG_UPDATE_FAIL',payload:error.message})    
    }
    
} 

export const deleteBlogAction = (id) => (dispatch) => {
    try {
        dispatch({type:'BLOG_DELETE_REQUEST'})
        const path = '/api/blog/'+id+'/delete'
        axios.delete(path).then(res=>{
        if(res.status===200){
            dispatch({type:'BLOG_DELETE_SUCCESS'})
        }
    }).catch(err=>dispatch({type:'BLOG_DELETE_FAIL',payload:err.response.data}))
    }
     catch (error) {
        dispatch({type:'BLOG_DELETE_FAIL',payload:error.message})    
    }
    
} 

export const getBlogListAction = () => (dispatch) => {
    try {
        dispatch({type:'BLOG_LIST_REQUEST'})
        axios.get('/api/blog/all').then(res=>{
        if(res.status===200){
            dispatch({type:'BLOG_LIST_SUCCESS',payload:res.data})
        }
    }).catch(err=>dispatch({type:'BLOG_LIST_FAIL',payload:err.response.data}))
    }
     catch (error) {
        dispatch({type:'BLOG_LIST_FAIL',payload:error.message})    
    }
    
} 



export const fetchBlogAction = (id) => (dispatch) => {
    try {
        dispatch({type:'BLOG_FETCH_REQUEST'})
        const path = '/api/blog/read/'+id
        axios.get(path).then(res=>{
        if(res.status===200){
            dispatch({type:'BLOG_FETCH_SUCCESS',payload:res.data})
        }
    }).catch(err=>dispatch({type:'BLOG_FETCH_FAIL',payload:err.response.data}))
    }
     catch (error) {
        dispatch({type:'BLOG_FETCH_FAIL',payload:error.message})    
    }
    
} 

export const like = (id) => (dispatch) => {
    try {
        dispatch({type:'LIKE'})
        const path = `/api/blog/${id}/like`
        axios.put(path).then(res=>{
            if(res.status===200){
                dispatch({type:'LIKE_SUCCESS',payload:res.data})
            }
        }).catch(err=>dispatch({type:'LIKE_FAIL',payload:err.response.data}))
    }
    catch (error) {
        dispatch({type:'LIKE_FAIL',payload:error.message})    
    }
    
} 

export const unlike = (id) => (dispatch) => {
    try {
        dispatch({type:'UNLIKE'})
        const path = `/api/blog/+${id}+/like`
        axios.put(path).then(res=>{
        if(res.status===200){
            dispatch({type:'UNLIKE_SUCCESS',payload:res.data})
        }
    }).catch(err=>dispatch({type:'UNLIKE_FAIL',payload:err.response.data}))
    }
     catch (error) {
        dispatch({type:'UNLIKE_FAIL',payload:error.message})    
    }
    
} 
