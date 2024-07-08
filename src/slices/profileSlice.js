import { createSlice } from "@reduxjs/toolkit";

const initialState={

   user:localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):null,
   loading:false
}

const profileSlice=createSlice({
    name:"profile",
    initialState:initialState,
    reducers:{
        setUser(state,value)
        {
          
            state.user=value.payload;
            console.log("Printing User",state.user);

            if(state.user)
            {
                localStorage.setItem("user", JSON.stringify(state.user))
            }
           
            
        },
        setLoading(state,payload)
        {
            state.loading=payload.value;
        }
    }
})

export const {setUser,setLoading}=profileSlice.actions;
export default profileSlice.reducer