import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState={
    token:"",
    loading:false,
    error:""

}


const fetch2 = async(api,body,token="")=>{
const res = await fetch(api,{
    method:"post",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify(body)
  })
  return await res.json()
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

export const {addToken} = authReducer.actions
export default authReducer.reducer