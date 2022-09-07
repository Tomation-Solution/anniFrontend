import { useEffect, useState } from "react";
import { Delete, Edit, SearchRounded, AddCircleOutlineOutlined, EditAttributes} from "@mui/icons-material";
import { TextField, Grid, Button, Tabs, Tab, Box, Typography } from "@mui/material";
import { DashboardLayout } from "../../components/Dashboard/Admin/Sidebar/dashboard-layout"; 
import PropTypes  from "prop-types";
import {ArchiveTable, CustomizedTables, MemberTable, NewsTable} from "../../components/Dashboard/Admin/Tables";
import BasicModal from "../../components/Modals";
import HeadText from "../../components/Dashboard/DashboardHead";
import AddNews from "../../components/Modal.jsx/News/AddNews";
import EditNews from "../../components/Modal.jsx/News/EditNews";
import DeleteNews from "../../components/Modal.jsx/News/DeleteNews";
import GreenButton from "../../components/Buttonn";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { NewsType, selectNews } from "../../redux/news/newsSlice";
import { getNews } from "../../redux/news/newsApi";
import Spinner from "../../components/Spinner";



export default function News(){

    const [value, setValue] = useState(0);
    const memberFields = ['S/N','Title', 'Create At','Intended Readers','likes','dislikes','Actions']
    const { data,status,error} = useAppSelector(selectNews);
    const dispatch = useAppDispatch()
    function createData(sn:number,title:string,Reader:string, date:string,  likes:any,dislikes:any,action:any) {
        return {sn,title, date, Reader,likes,dislikes, action};
      }
      
    //   const rows = [
    //     createData(1,'Ade Johnson', 'ade@gmail.com', '08089348232','123, Ikorodu road, Onipanu ',<Grid container justifyContent='space-between' > <Edit onClick={()=>setOpenEditMember(true)} sx={{color:'green'}}/> <Delete onClick={()=>setOpenDeleteMember(true)} sx={{color:'red'}}/> </Grid> ),
    //     createData(2,'Ade Johnson', 'ade@gmail.com', '08089348232','123, Ikorodu road, Onipanu ', <Grid container justifyContent='space-between'> <Edit onClick={()=>setOpenEditMember(true)} sx={{color:'green'}}/>  <Delete sx={{color:'red'}}/> </Grid>),
    //     createData(3,'Ade Johnson', 'ade@gmail.com', '08089348232','123, Ikorodu road, Onipanu ', <Grid container justifyContent='space-between'> <Edit onClick={()=>setOpenEditMember(true)} sx={{color:'green'}}/> <Delete onClick={()=>alert(rows.name)} sx={{color:'red'}}/> </Grid>),
    //     createData(4,'Ade Johnson', 'ade@gmail.com', '08089348232','123, Ikorodu road, Onipanu ', <Grid container justifyContent='space-between'> <Edit onClick={()=>setOpenEditMember(true)} sx={{color:'green'}}/> <Delete sx={{color:'red'}}/> </Grid>),
    //     createData(5,'Ade Johnson', 'ade@gmail.com', '08089348232','123, Ikorodu road, Onipanu ', <Grid container justifyContent='space-between'> <Edit onClick={()=>setOpenEditMember(true)} sx={{color:'green'}}/> <Delete sx={{color:'red'}}/> </Grid>),
    //     createData(6,'Ade Johnson', 'ade@gmail.com', '08089348232','123, Ikorodu road, Onipanu ', <Grid container justifyContent='space-between'> <Edit onClick={()=>setOpenEditMember(true)} sx={{color:'green'}}/> <Delete sx={{color:'red'}}/> </Grid>),
    //     createData(7,'Ade Johnson', 'ade@gmail.com', '08089348232','123, Ikorodu road, Onipanu ', <Grid container justifyContent='space-between'> <Edit onClick={()=>setOpenEditMember(true)} sx={{color:'green'}}/> <Delete sx={{color:'red'}}/> </Grid>),
        
    //   ];
    const getIntendedReader = (data:NewsType):string=>{
        if(data.is_committe)return 'Committe';
        if(data.is_exco)return 'Exco';
        if(data.is_member)return 'Member'
        return '...'
    }
    const rows = data.map((resp_data,index:number)=>{
        return (
            createData(index+1,resp_data.name,getIntendedReader(resp_data),"12/22/33",resp_data.likes?resp_data.likes:0,resp_data.dislikes?resp_data.dislikes:0,
            <Grid container justifyContent='space-between' > <Edit onClick={()=>setOpenEditMember(true)} sx={{color:'green'}}/> <Delete onClick={()=>setOpenDeleteMember(true)} sx={{color:'red'}}/> </Grid> )
        )
    })

     const handleChange = (event, newValue) => {
        setValue(newValue);
    };
 

      const [open, setOpen] = useState(false);
      const [openEditMember, setOpenEditMember] = useState(false);
      const [openDeleteMember, setOpenDeleteMember] = useState(false);
      const handleOpen = () => setOpen(true);
      const handleOpenDelete = () => setOpenDeleteMember(true);
      const handleClose = () => setOpen(false);
      const handleClose1 = () => setOpenEditMember(false);
      const handleCloseDelete = () => setOpenDeleteMember(false);


      useEffect(()=>{
        dispatch(getNews())
      },[])
    return (
        <DashboardLayout>
            {status==='loading'&&<Spinner/>}
            <BasicModal handleClose={handleClose} open={open} body={<AddNews handleClose={handleClose} />}/>
            <BasicModal handleClose={handleClose1} open={openEditMember} body={<EditNews handleClose={handleClose1} body='hello' />}/>
            <BasicModal handleClose={handleCloseDelete} open={openDeleteMember} body={<DeleteNews handleClose={handleCloseDelete} body='hello' />}/>
            <Grid px={2}>    
                <HeadText text='News'/>
                    <Grid container my={2} py={1} className='rounded-corners' px={2}>
                       <Grid item md={7} sx={{borderRadius:'5px'}} py={1} px={2} className='light-grey-bg'>
                            <TextField
                                variant='standard'
                                size='medium'
                                placeholder='Search by Date or Title'
                                sx={{width:'100%',  borderBottom:'none'}}
                                InputProps={{disableUnderline:true}}
                                // onChange={()=>setSubcom(event.target.value)}
                            />        
                        </Grid> 
                        <Grid item alignContent='center' sx={{borderRadius:'5px'}} py={1} px={2} mx={1} className='dark-green-bg'>
                            <SearchRounded sx={{color:'#fff',paddingTop:1}}  />
                           
                        </Grid>

                        <GreenButton 
                            text='Create News'
                            bg='#365C2A'
                            radius={5}
                            textColor='white'
                            paddingX={5}
                            paddingY={1.5}
                            fontWeight={500}
                            click={()=>setOpen(true)}
                            />
                            
                        </Grid><br/>
        {/* // createData(1,'Ade Johnson', 'ade@gmail.com', '08089348232','123, Ikorodu road, Onipanu ',<Grid container justifyContent='space-between' > <Edit onClick={()=>setOpenEditMember(true)} sx={{color:'green'}}/> <Delete onClick={()=>setOpenDeleteMember(true)} sx={{color:'red'}}/> </Grid> ), */}

                    <NewsTable tableHead={memberFields} rows={rows}/>
                </Grid>
        </DashboardLayout>
    )
}