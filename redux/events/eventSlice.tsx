import { createSlice } from "@reduxjs/toolkit";
import {EventType,creatEventsApi,setEventStateToIdle,getEventsApi} from "./eventsApi"
import { RootState } from "../store";




interface initialStateType{
    status: "idle" | "loading"|"created" | "succeeded" | "failed";
    isLoggedIn: boolean;
    error: any;
    data: null | EventType[]
}

const initialState ={
    status:"idle",
    isLoggedIn:false,
    error:null,
    data:null

}  as  initialStateType



const event = createSlice({
    name:'events',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        // getEventsApi

        // builder.addCase(getEventsApi.pending,(state,{payload})=>{
        //     state.status ="loading"
        // })

        // builder.addCase(getEventsApi.fulfilled,(state,{payload})=>{
        //     state.status ="succeeded"
        //     console.log({"events list":payload})
        // })





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

                state.data = [payload[0],...state.data,]
            }
            else{
                state.data =[payload[0]]
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

export const selectEvent =(state:RootState)=>state.event;
export default event.reducer;