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
        const result = await fetch2("/register",body)
        console.log(result);
        return result
    }
  )


export const authReducer = createSlice({
    name:"user",
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(signupUser.fulfilled,(state,action)=>{
            state.loading=false
            if(action.payload.error){
                state.error = action.payload.error
            }
        })
        builder.addCase(signupUser.pending,(state,action)=>{
            state.loading=true
        })
    }

})


export default authReducer.reducer