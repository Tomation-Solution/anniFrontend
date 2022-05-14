import { useState } from "react";
import { ArrowDropDown } from "@mui/icons-material";
import { Grid, TextField, Menu, MenuItem, Typography, Checkbox } from "@mui/material";
// import HeadText from "../../../Dashboard/DashboardHead";
import HeadText from "../../Dashboard/DashboardHead";
import GreenButton from "../../Buttonn";


export default function AddDue(props){
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorEl1, setAnchorEl1] = useState(null);
    const open = Boolean(anchorEl);
    const open1 = Boolean(anchorEl1);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClose1 = () => {
        setAnchorEl1(null);
        // alert(val)
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClick1 = (event) => {
        setAnchorEl1(event.currentTarget);
    };

    return (
        <Grid container >
            <HeadText text='Add Due'/>
            <TextField
                variant='standard'
                label="Due Name"
                fullWidth
                InputLabelProps={{className:'light-text'}}
            />

            <TextField
                variant='standard'
                type='date'
                label="Start Date"
                fullWidth
                InputLabelProps={{className:'light-text'}}
            />
                        <TextField
                variant='standard'
                type='time'
                label="Start time"
                fullWidth
                InputLabelProps={{className:'light-text'}}
            />

<TextField
                variant='standard'
                type='number'
                label="Amount"
                fullWidth
                InputLabelProps={{className:'light-text'}}
            />

            <Grid my={2} py={1} container sx={{borderRadius:1}} className='light-grey-bg'>
            <Typography textAlign='center' id="demo-positioned-menu" onClick={handleClick1 }  className='light-text nav-link' variant="body2" component="div" sx={{ flexGrow: 1 }}>
                <Grid container px={1} alignItems='center' justifyContent='space-between' >Select Category<ArrowDropDown />
                </Grid>
            </Typography>
            <Menu id="basic-menu" sx={{width:'100%'}} anchorEl={anchorEl1} open={open1} onClose={handleClose1}
                MenuListProps={{'aria-labelledby': 'basic-button',}}>
                <MenuItem onClick={handleClose1}>Member</MenuItem>
                <MenuItem onClick={handleClose1}>Exco</MenuItem>
                {/* <MenuItem onClick={handleClose1}>Sub Commitee</MenuItem> */}
               
            </Menu>
            </Grid>


            <Grid my={2} py={1} container sx={{borderRadius:1}} className='light-grey-bg'>
            <Typography textAlign='center' id="demo-positioned-menu" onClick={handleClick1 }  className='light-text nav-link' variant="body2" component="div" sx={{ flexGrow: 1 }}>
                <Grid container px={1} alignItems='center' justifyContent='space-between' >Schedule Type<ArrowDropDown />
                </Grid>
            </Typography>
            <Menu id="basic-menu" sx={{width:'100%'}} anchorEl={anchorEl1} open={open1} onClose={handleClose1}
                MenuListProps={{'aria-labelledby': 'basic-button',}}>
                <MenuItem onClick={handleClose1}>Day of Week</MenuItem>
                <MenuItem onClick={handleClose1}>Month of Year</MenuItem>
                {/* <MenuItem onClick={handleClose1}>Sub Commitee</MenuItem> */}
               
            </Menu>
            </Grid>

            {/* <Grid  py={1} mb={2} container sx={{borderRadius:1}} className='light-grey-bg'>
            <Typography textAlign='center' id="demo-positioned-menu" onClick={handleClick }  className='light-text nav-link' variant="body2" component="div" sx={{ flexGrow: 1 }}>
                <Grid container px={1} alignItems='center' justifyContent='space-between' >Select Type<ArrowDropDown />
                </Grid>
            </Typography>
            <Menu id="basic-menu" sx={{width:'100%'}} anchorEl={anchorEl} open={open} onClose={handleClose}
                MenuListProps={{'aria-labelledby': 'basic-button',}}>
                <MenuItem onClick={handleClose}>Paid</MenuItem>
                <MenuItem onClick={handleClose}>Free</MenuItem>
               
            </Menu>
            </Grid> */}
           
           <Grid container>
               <Grid item>
                    <Typography>
                        <Checkbox title="uo" label='fdfdfd'/>
                        Recurrent
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography>
                        <Checkbox title="uo" label='fdfdfd'/>
                        One-Time
                    </Typography>
                </Grid>
            </Grid>

            {/* <TextField
                variant='standard'
                label="Course of Study"
                fullWidth
                InputLabelProps={{className:'light-text'}}
            /> */}
            <Grid md={12} mt={1} container justifyContent='space-around'>
                <GreenButton text='Save' textColor='#fff' paddingY={1} radius={3} bg='#203719' paddingX={7} />
                <GreenButton text='Cancel' textColor='#203719' paddingY={1} radius={3} bg='#E1F1DC' paddingX={7} click={()=>props.handleClose()} />
            </Grid>
        </Grid>
    )
}