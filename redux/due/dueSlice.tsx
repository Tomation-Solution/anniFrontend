import {createSlice} from "@reduxjs/toolkit";
import {createDueApi} from "./dueApi";
import { RootState } from "../store";

// import RootS

interface dueStateType{
    "id": null| number;
    "name": string;
    "re_occuring": boolean;
    "is_for_excos": boolean;
    amount:string;
    startDate:string;
    startTime:string;
    scheduletype: "day_of_week"|"month_of_year ";
    schedule:string[];

}

interface initialStateType{
    status: "idle" | "loading" | "succeeded" | "failed";
    isLoggedIn: boolean;
    error: any;
    data: null | dueStateType[]
}

const initialState ={
    status:"idle",
    isLoggedIn:false,
    error:null,
    data:null

}  as initialStateType


const due = createSlice({
    name:'due',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{

        builder.addCase(createDueApi.pending,(state,{payload})=>{
            state.status="loading";
        })

        builder.addCase(createDueApi.fulfilled,(state,{payload})=>{
            state.status="succeeded";
            if(state.data){

                state.data = [payload[0],...state.data,]
            }
            else{
                state.data =[payload[0]]
            }
            console.log({"state of success":payload})
            //add the reuturn data to redux cylce
        })


        builder.addCase(createDueApi.rejected,(state,{payload})=>{
            state.status="failed";
            state.error=payload
            //add the reuturn data to redux cylce
        })
    }
})


export const selectDue =(state:RootState)=>state.due;
export default due.reducer;