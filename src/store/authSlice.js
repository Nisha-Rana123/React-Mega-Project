import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    status: false,
    userData:null}
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
//login and logout reducers . It will update the state of the user in the store when the user logs in or logs out.
     login:(state, action)=>{
        state.status = true;
        state.userData = action.payload;
     },
     logout: (state)=>{
        state.status = false;
        state.userData = null;
     }
    }
});
export const{login, logout} =authSlice.actions;  //actions are the logic that will be executed when the user logs in or logs out. 
// It will update the state of the user in the store when the user logs in or logs out.
export default authSlice.reducer;