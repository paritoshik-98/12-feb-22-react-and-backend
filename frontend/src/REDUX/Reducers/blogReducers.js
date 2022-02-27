export const BlogCreateReducer = (state={},action) => {
    switch (action.type) {
        case 'BLOG_CREATE_REQUEST':
            return {loading:true};
        case 'BLOG_CREATE_SUCCESS':
            return {loading:false,success:true};
        case 'BLOG_CREATE_FAIL':
            return {loading:false,error:action.payload};
        default:
            return state; 
    }
}

export const BlogFetchReducer = (state={},action) => {
    switch (action.type) {
        case 'BLOG_FETCH_REQUEST':
            return {loading:true};
        case 'BLOG_FETCH_SUCCESS':
            return {loading:false,success:true,blog:action.payload};
        case 'BLOG_FETCH_FAIL':
            return {loading:false,error:action.payload};
        default:
            return state; 
    }
}

export const BlogUpdateReducer = (state={},action) => {
    switch (action.type) {
        case 'BLOG_UPDATE_REQUEST':
            return {loading:true};
        case 'BLOG_UPDATE_SUCCESS':
            return {loading:false,success:true};
        case 'BLOG_UPDATE_FAIL':
            return {loading:false,error:action.payload};
        default:
            return state; 
    }
}

export const BlogDeleteReducer = (state={},action) => {
    switch (action.type) {
        case 'BLOG_DELETE_REQUEST':
            return {loading:true};
        case 'BLOG_DELETE_SUCCESS':
            return {loading:false,success:true};
        case 'BLOG_DELETE_FAIL':
            return {loading:false,error:action.payload};
        default:
            return state; 
    }
}

export const BlogListReducer = (state={},action) => {
    switch (action.type) {
        case 'BLOG_LIST_REQUEST':
            return {loading:true};
        case 'BLOG_LIST_SUCCESS':
            return {loading:false,success:true,blogs:action.payload};
        case 'BLOG_LIST_FAIL':
            return {loading:false,error:action.payload};
        default:
            return state; 
    }
}

export const MyBlogReducer = (state={},action) => {
    switch (action.type) {
        case 'MY_BLOG_REQUEST':
            return {loading:true};
        case 'MY_BLOG_SUCCESS':
            return {loading:false,success:true,blogs:action.payload};
        case 'MY_BLOG_FAIL':
            return {loading:false,error:action.payload};
        default:
            return state; 
    }
}

export const BlogLikeReducer = (state={},action) => {
    switch (action.type) {
        case 'LIKE' :
            return {loading : true};
        case 'LIKE_SUCCESS' :
            return {likes : action.payload};
        case 'LIKE_FAIL' :
            return {error : action.payload};
        case 'UNLIKE' :
            return {loading : true};
        case 'UNLIKE_SUCCESS' :
            return {likes : action.payload};
        case 'UNLIKE_FAIL' :
            return {error : action.payload};
        default:
            return state;
    }
}

export const UNSPLASH = (state={},action)=>{
    if(action.type==="select_unsplash"){return {url : action.payload}}
    else{return state}
}