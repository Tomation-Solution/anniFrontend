import { NextPage } from "next";
import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import axios from "../../../helpers/axios";

import { Card,Box,IconButton, InputAdornment, Typography,TextField, Button,Grid, Checkbox } from "@mui/material"
import { style } from "@mui/system"
import { Lock, Person, Visibility, VisibilityOff } from "@mui/icons-material"
import Navbar from "../../../components/Navbar";
import HeroSection from "../../../components/HeroSection";


const Index:NextPage = ()=>{
    const router = useRouter()
    console.log(router.query);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<any>({status: null, data: [], message: ""});
    const [error, setError] = useState("");
    const validate = async()=>{
        setIsLoading(true);
        try{
            const resp = await axios.post('/tenant/auth/validate-email/' ,router.query);
            setIsLoading(false);
            setData(resp.data);

      return resp.data;
        }
        catch(err){
            setIsLoading(false);
            setError("You Token Must have expired");
        }
    }
    useEffect(()=>{
        validate()
    },[])
    console.log(data)

    if (error) {
        
        return(
            <Grid>

                                    <Navbar/>
                                    <HeroSection message={"AANI  "+"Lagos"+ "  Chapter"}/>
                                    <h1>{error}</h1>
            </Grid>
            );
      }
    return (
        <Grid>
              
            
            {
                isLoading?
                <h1>Verifying, Please wait...</h1>:
                <div>
                       <Navbar/>
                                   <HeroSection message={"AANI  "+"Lagos"+ "  Chapter"}/>
                    <br />

                    <div>
                        <h2>
                        {data.message}
                        </h2>
                        <Typography className='text' variant='subtitle2' fontWeight='normal' color='grey'>
                            Please Download our mobile app
                        </Typography>
                    </div>
               
                </div>
            }
        </Grid>
    )
}

export default Index