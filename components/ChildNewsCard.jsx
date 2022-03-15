import { Grid, Typography } from "@mui/material"
import Image from "next/image";
import Link from 'next/link'

export default function ChildNewsCard (props){
    return(
        <Grid px={1} item md={4}>
            <Grid item md={11} marginX={1}>
                <Grid container py={1}  marginY={1} px={2} className='light-grey-bg rounded-corners'>
                    <Grid container >
                        <Typography variant='caption' className='light-text' >
                            {props.date}
                        </Typography>
                    </Grid>
                    <Grid item sm={3}>
                        <Image height='900px' src={props.image} className='rounded-corners-small' />
                    </Grid>
                    <Grid item paddingLeft={1} sm={9}>
                        <Typography textAlign='justify' variant='subtitle2' fontWeight='400' className='text'> 
                            {props.title}
                        </Typography>
                    </Grid>
                    {/* <Link href="/"> */}
                        <Typography  onClick={props.click} variant='caption' fontWeight='500' className='text nav-link green-text'>Read More</Typography>
                    {/* </Link> */}
                </Grid>
            </Grid>
        </Grid>
    )
}