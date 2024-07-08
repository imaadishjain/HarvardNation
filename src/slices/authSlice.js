import { createSlice } from "@reduxjs/toolkit";



const initialState={

    token:localStorage.getItem("token")?JSON.parse(localStorage.getItem("token")):null,
    loading:false,
    signupData:null,
    includeLowerCase:false,
    includeUpperCase:false,
    includeSpecial:false,
    includeNumbers:false,
    length:false
}

const authSlice=createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
        setToken(state,value)
        {
            state.token=value.payload;
            console.log("Printing Token",state.token)
        },
        setLoading(state,value)
        {
            state.loading=value.payload
            
        },
        setSignupData(state,value)
        {
            state.signupData=value.payload
        },
        setLowerCase(state,value)
        {
            state.includeLowerCase=value.payload;

        },
        setUpperCase(state,value)
        {
            state.includeUpperCase=value.payload;
            

        },
        setNumbers(state,value)
        {
            state.includeNumbers=value.payload;

        },
        setSpecial(state,value)
        {
            state.includeSpecial=value.payload;

        },
        setLength(state,value)
        {
            state.length=value.payload;

        },

    }
})

export const {setToken,setLoading,setSignupData,setLength,setLowerCase,setUpperCase,setNumbers,setSpecial}=authSlice.actions;
export default authSlice.reducer