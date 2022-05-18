import { createSlice } from "@reduxjs/toolkit";
import {EventType,creatEventsApi,setEventStateToIdle,getEventsApi2} from "./eventsApi"
import { RootState } from "../store";




interface initialStateType{
    status: "idle" | "loading"|"created" | "succeeded" | "failed"|"created";
    isLoggedIn: boolean;
    error: any;
    data: null | EventType[]
}

const initialState ={
    status:"idle",
    isLoggedIn:false,
    error:null,
    data:[]

}  as  initialStateType



const events = createSlice({
    name:'events',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        // getEventsApi

        builder.addCase(getEventsApi2.pending,(state,{payload})=>{
            state.status ="loading"
        })

        builder.addCase(getEventsApi2.fulfilled,(state,{payload})=>{
            state.status ="succeeded"
            
            console.log({"events list":payload})

            state.data = payload
        })


        builder.addCase(getEventsApi2.rejected,(state,{payload})=>{
            state.status ="failed"
            console.log({"events error":payload})
            state.error = payload
        })





        builder.addCase(setEventStateToIdle.pending,(state,{payload})=>{
            state.status ="loading"
        })

        builder.addCase(setEventStateToIdle.fulfilled,(state,{payload})=>{
            state.status ="idle"
        })


     

        builder.addCase(creatEventsApi.pending,(state,{payload})=>{
            state.status ="loading"
            
        })


        builder.addCase(creatEventsApi.fulfilled,(state,{payload})=>{
            state.status ="created";

            if(state.data){

                state.data = [payload[0],...state.data,];
            }
            else{
                state.data =payload;
            }
            console.log({"createSuccess Events":payload})
            
        })

        builder.addCase(creatEventsApi.rejected,(state,{payload})=>{
            state.status="failed";
            state.error=payload
            //add the reuturn data to redux cylce
        })
    }
})

export const selectEvent =(state:RootState)=>state.events;
export default events.reducer;