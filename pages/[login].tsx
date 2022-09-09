import { useState,useRef,useEffect } from "react"
import { Card,Box,IconButton, InputAdornment, Typography,TextField, Button,Grid, Checkbox } from "@mui/material"
import { style } from "@mui/system"
import { Lock, Person, Visibility, VisibilityOff } from "@mui/icons-material"
import HeroSection from "../components/HeroSection"
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from '../styles/Home.module.css'
import Navbar from "../components/Navbar"
import Logo from '../images/logo.png'
import Image from "next/image"
import Footer from "../components/Footer"
import GreenButton from "../components/Buttonn"
import { useRouter } from "next/router"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import SubmitButton from "../components/MarkoBtn"
import {useAppDispatch,useAppSelector} from "../redux/hooks";
import {selectSignIn} from "../redux/auth/signin/signinSlice"
import {signinApi} from "../redux/auth/signin/signinApi"
import useToast from "../hooks/useToast"
interface LoginType{
    email:string;
    password:string;
}


const schema = yup.object().shape({
    email: yup.string().required('Email is required').email('Email is invalid'),
    password: yup.string().required('Password is required').min(2, 'Password must be at least 2 characters'),
  });
  



const Login =  () =>{

    const [showPassword, setShowPassword]= useState(true);
    const router = useRouter()
    const form = useRef(null);
    const {notify} = useToast()
    const dispatch = useAppDispatch();
    const  { error,status} = useAppSelector(selectSignIn)
    const {
        register,handleSubmit, formState: { errors },
    } = useForm<LoginType>({resolver:yupResolver(schema)})
    
    
    const submitData:SubmitHandler<LoginType>= (data)=>{

        dispatch(signinApi(data))
    }
  useEffect(()=>{
    if(status ==="failed"){
        notify(error?.data?.error[0])
    }
    if(status ==="succeeded"){
        notify("Login Successful")
        router.push('/admin/home')
    }
  },[status])

  console.log({"error in front end":error})

//   useEffect(()=>{

//   },[status])
    return(
        <Grid >
            <Navbar/>
            <HeroSection message={"AANI  "+ " "+router.query.login + "  Chapter"}/>
            
            <Grid className={styles.loginBg}   >
            {/* <center><Image src={Logo}/></center> */}
            <br/>
            
            <Grid item md={12} className={styles.card} sm={10}  style={{margin:'0 auto'}} >
                <Typography className='text' textAlign='center' marginBottom={2} fontWeight='bolder' >USER LOGIN</Typography>
               <Typography className='text' fontWeight='normal' textAlign='center' marginBottom={2} variant='subtitle2' color='InactiveCaption'>
               Click here to login into your Dashboard </Typography>
               <br/>
                        <form onSubmit={handleSubmit(submitData)} >
                <Grid>
                    
                    <>
                    <TextField 
                    placeholder=' Email' 
                    // label='Username'  
                    style={{width:'100%'}} size='small'
                    InputProps={{
                    
                        startAdornment:(
                            <Person color='disabled'  fontSize={'medium'}/>
                        )
                    }}
                    {...register("email")}
                    />
                    <Typography >{errors.email?.message}</Typography>
                    </>
                    
                </Grid>
                {/* <br/> */}
                <Grid container marginY={2}>
                    <>
                    <TextField 
                    placeholder=' Password'
                    // label='Password'
                    size='small'
                    type= {showPassword ? 'password' : 'text'}
                    style={{width:'100%'}}
                    InputLabelProps={{ shrink: true,  }}
                    InputProps={{
                        endAdornment: (
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={()=>setShowPassword(!showPassword)}
                            // onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        ),
                        startAdornment: (
                             <Lock color='disabled'  fontSize={'medium'} /> 
                              )
                        
                        
                    }}
                    {...register("password")}
                    />
                    <Typography >{errors.password?.message}</Typography>
                    </>

                </Grid>
                <br/>
                <Grid container alignItems='center' justifyContent='space-between' paddingY={1}>
                    <Grid item><Typography className='text' variant='subtitle2' fontWeight='normal' color='grey'>Forgot Password?</Typography></Grid>
                    <Grid item >
                        <Typography className='text' variant='subtitle2' fontWeight='normal' color='grey'>
                        <Checkbox/>Remember me</Typography>
                    </Grid>
                </Grid>
                <SubmitButton  text={status==="loading"?"Loading":'Login'} radius='10px'
               textColor='white' paddingY={1} paddingX={2} bg='#436937'
               
               />
               </form>
                {/* <GreenButton text='Login' /> */}
                {/* <Button variant='contained' size='large' className={styles.button}>Login</Button> */}
            </Grid>
            <br/>
            </Grid>
            <Footer/>
        </Grid>
    )
}


export default Login