import { createSlice } from "@reduxjs/toolkit";
import {toast} from "react-hot-toast";

const initialState={
            
          cart:localStorage.getItem("cart")
                   ?JSON.parse(localStorage.getItem("cart")):
                   [],
                
           totalItems:localStorage.getItem("totalItems")
                      ?JSON.parse(localStorage.getItem("totalItems")):
                      0,

           total:localStorage.getItem("total")
                 ? JSON.parse(localStorage.getItem("total")):
                 0,

}

const cartSlice=createSlice({
    name:"cart",
    initialState:initialState,
    reducers:{
        
        addToCart:(state,value)=>
            {
                const course=value.payload;
                const index=state.cart.findIndex((item)=>item._id===course._id);
             
                if(index>=0)
                {
                         toast.error("Product is already in the cart")
                         return
                }

                state.cart.push(course);
                state.totalItems++;
                state.total+=course.price;

                localStorage.setItem("cart", JSON.stringify(state.cart))
                localStorage.setItem("total", JSON.stringify(state.total))
                localStorage.setItem("totalItems", JSON.stringify(state.totalItems))

                toast.success("Item Successfully Added")

            },


            removeFromCart:(state,value)=>
                {
                     const course=value.payload;

                     const index=state.cart.findIndex((item)=>item._id===course._id)
                     console.log("Index",index);
                  
                     if(index>=0)
                     {
                        state.totalItems--;
                        state.total-=course.price;
                        state.cart.splice(index,1);
                        console.log("CART length",state.cart.length)
                        localStorage.setItem("cart", JSON.stringify(state.cart))
                        localStorage.setItem("total", JSON.stringify(state.total))
                        localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
                         console.log("Cart",state.cart);
                        toast.success("Item removed Successfully")
    
                     }
                },

                resetCart:(state)=>
                    {
                        state.cart=[];
                        state.totalItems=0;
                        state.total=0;

                        localStorage.removeItem("cart");
                        localStorage.removeItem("total");
                        localStorage.removeItem("totalItems")
                    }

    }
})

export const {addToCart,removeFromCart,resetCart}=cartSlice.actions
export default cartSlice.reducer