import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetch2 } from "../helpers/fetch2";

const initialState={
    token:"",
    loading:false,
    error:""

}


export const signupUser = createAsyncThunk(
    'signupuser',
    async (body) => {
        const result = await fetch2("http://localhost:5000/api/user/register",body)
        console.log(result);
        return result
    }
  )

  
export const signInUser = createAsyncThunk(
    'signinUser',
    async (body) => {
        const result = await fetch2("http://localhost:5000/api/user/login",body)
        console.log(result);
        return result
    }
  )


export const authReducer = createSlice({
    name:"user",
    initialState,
    reducers:{
        addToken:(state,action)=>{
            state.token=localStorage.getItem("token")
        },
        deleteToken:(action,state)=>{
            state.token=""
            localStorage.removeItem("token")
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(signupUser.fulfilled,(state,action)=>{
            state.loading=false
            console.log(action.payload);
            if(action.payload.message){
                state.error = action.payload.message
            }
        })
        builder.addCase(signupUser.pending,(state,action)=>{
            state.loading=true
        })

        builder.addCase(signInUser.fulfilled,(state,{payload:{success,message,token}})=>{
            state.loading=false
            if(success===true){
                state.token=token
                localStorage.setItem("token",token)
            }
            // console.log(success,message,token);
        })
        builder.addCase(signInUser.pending,(state,action)=>{
            state.loading=true
        })
    }

})

export const {addToken,deleteToken} = authReducer.actions
export default authReducer.reducer