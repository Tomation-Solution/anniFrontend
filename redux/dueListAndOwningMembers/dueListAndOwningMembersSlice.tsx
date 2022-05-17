import {createSlice} from "@reduxjs/toolkit";
import {dueListAndOwningMembersGetApi} from "./dueListAndOwningMembersApi";
import { RootState } from "../store";


interface OwingMember{
    "user__email": string;
    "is_exco": boolean;
    "amount_owing": number;
}
interface AnotherDueType{
    "Name": string;
    "re_occuring": boolean;
    "is_for_excos": boolean;
    "amount": number;
    "startDate":string;
    "startTime":string;
    "endDate": string;
    "scheduletype": "day_of_week" |"month_of_year";
    "schedule": string;
    "chapters__id": number;
    "chapters__name": string;
}
interface DueListAndOwningMembersApiType {
    "list_of_owing_members": OwingMember[],
    "dues": AnotherDueType[]
}



interface initialStateType{
    status: "idle" | "loading" | "succeeded" | "failed";
    error: any;
    data: null | DueListAndOwningMembersApiType[]
}


const initialState={
    status:"idle",
    error:null,
    data:null,
} as initialStateType




const due_list_and_owning_members = createSlice({
    "name":"dueListAndOwningMembers",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{

    builder.addCase(dueListAndOwningMembersGetApi.pending,(state,{payload})=>{
        state.status="loading";
    })

    builder.addCase(dueListAndOwningMembersGetApi.fulfilled,(state,{payload})=>{
        state.status="succeeded";
        console.log({"payload from slice for dataOwing":payload})
        state.data = payload
    })


    
    builder.addCase(dueListAndOwningMembersGetApi.rejected,(state,{payload})=>{
        state.status="failed";
        console.log({"error from slice for dataOwing":payload})
        state.error = payload
    })
    

}})

export const selecDueListAndOwningMembers =(state:RootState)=>state.dueListAndOwningMembers;
export default due_list_and_owning_members.reducer;