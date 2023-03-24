import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetch2, fetch3 } from "../helpers/fetch2";

const initialState = [];

export const createTodo = createAsyncThunk("createtodo", async (body) => {
  const result = await fetch2(
    "http://localhost:5000/api/todo/createTodo",
    body
  );
  console.log(result);
  return result;
});

export const fetchTodo = createAsyncThunk("fetchtodo", async () => {
  const result = await fetch3("http://localhost:5000/api/todo/gettodo", "get");
//   console.log(result, "<-------");
  return result;
});

export const todoReducer = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createTodo.fulfilled, (state, { payload: { data } }) => {
      if (data) {
        state.push(data);
      }
    });
    builder.addCase(fetchTodo.fulfilled, (state, { payload: { data } }) => {
      
      // data returns a an array and we have to
      // update the entire initialstate that is an array

      // state=data (we cannot write this) we have to write
      return data;
    });
  },
});


// export const {} = todoReducer.actions;
export default todoReducer.reducer;
