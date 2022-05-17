import {createAsyncThunk} from "@reduxjs/toolkit"
import axios from "../../helpers/axios";

export interface EventType{
    id?:number;
    "is_paid_event":boolean;
    "re_occuring":boolean;
    "is_virtual":boolean;
    "is_for_excos":boolean;
    "is_commitee":boolean;
    "is_active":boolean;
    "commitee_name":string;
    "name":string;
    "amount":number;
    "startDate":string;
    "startTime":string;
    "scheduletype":"day_of_week"|"month_of_year";
    "schedule":string[];
    "mintues":string;
    "hour":string;
    "for_chapters":boolean;
}


export const creatEventsApi = createAsyncThunk(
    "events/creatEventsApi",
    async (data:EventType,thunkApi)=>{

       try {
        const resp = await axios.post('/tenant/event/eventview/',data)
        let testingData  = resp.data.data
        // console.log({data})
        return resp.data.data
       } catch (err:any) {
           console.log({err})
        return thunkApi.rejectWithValue(err.response.data)
       }



})

export const setEventStateToIdle = createAsyncThunk(
    "events/setEventStateToIdle",
     (data,thunkApi)=>{
        return true
})



export const getEventsApi = createAsyncThunk(
    "events/getEventsApi",
    async ({isChapter=false}:{isChapter:boolean},thunkApi)=>{

       try {
        const resp = await axios.get(`/tenant/event/eventview/get_events/${isChapter?"?is_chapter=true":""}`)
       let  data  = resp.data.data
        console.log({data})
        return resp.data.data
       } catch (err:any) {
           console.log({err})
        return thunkApi.rejectWithValue(err.response.data)
       }



})