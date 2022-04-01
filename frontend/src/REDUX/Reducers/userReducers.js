export const UserLoginReducer = (state={},action) => {
    switch (action.type) {
        case 'LOGIN_REQUEST':
            return {loading:true};
        case 'LOGIN_SUCCESS':
            return {loading:false,success:true,user:action.payload};
        case 'LOGIN_FAIL':
            return {loading:false,error:action.payload};
        case 'LOGOUT':
            return {};    
        default: 
            return state;
    }
}

export const UserRegisterReducer = (state={},action) => {
    switch (action.type) {
        case 'REGISTER_REQUEST':
            return {loading:true};
        case 'REGISTER_SUCCESS':
            return {loading:false,success:true};
        case 'REGISTER_FAIL':
            return {loading:false,error:action.payload};  
        default: 
            return state;
    }
}

export const UserUpdateReducer = (state={},action) => {
    switch (action.type) {
        case 'UPDATE_REQUEST':
            return {loading:true};
        case 'UPDATE_SUCCESS':
            return {loading:false,success:true,user:action.payload};
        case 'UPDATE_FAIL':
            return {loading:false,error:action.payload};  
        default: 
            return state;
    }
}

export const DP_Reducer = (state={},action) => {
    switch (action.type) {
        case 'DP_UPDATED':
            return {pic:action.payload};
        case 'DP_REMOVED' :
            return {pic:action.payload};
          default: 
            return state;
    }
}