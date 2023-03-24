import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../reducers/authReducer'

export const Store = configureStore({
    reducer:{
        user:authReducer
    }
})


// {
//     user:{
//         token:'',
//         loading:"",
//         error:""
//     }
// }
