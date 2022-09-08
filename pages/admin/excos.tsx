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
import Spinner from "../../components/Spinner";
import AddExcoPostion from "../../components/Modal.jsx/ExcoManagement/AddExcoPostion";
import { createManageAssigningExcoParamType, deleteExcoPostion, getExcoPostion } from "../../redux/ManageAssigningExco/ManageAssigningExcoApi";
import { selectManage_assigning_exco } from "../../redux/ManageAssigningExco/ManageAssigningExcoSlice";
import AssignExco from "../../components/Modal.jsx/ExcoManagement/AssignExco";



export default function ExcosPage(){

    const [value, setValue] = useState(0);
    const memberFields = ['S/N','Name', 'About','Can Upload Min','Member','Actions']
    const { data,status,error} = useAppSelector(selectManage_assigning_exco);
    const [currentPostion,setCurrentPostion] = useState<createManageAssigningExcoParamType>()
    const dispatch = useAppDispatch()
    function createData(sn:number,name:string,about:string, can_upload_min:string,member:any,action:any  ) {
        return {sn,name, about, can_upload_min,member,action};
      }
      
    //   const rows = [
    //     createData(1,'Ade Johnson', 'ade@gmail.com', '08089348232','123, Ikorodu road, Onipanu ',),
        
    //   ];

    const rows = data.map((info,index:number)=> createData(index+1,info.name,info.about, info.can_upload_min?"Yes":"No",info.member_id,<Grid container justifyContent='space-between' >
         <Edit onClick={()=>{
            setCurrentPostion(value=>info)
            setOpenAsignModal(true)
         }} sx={{color:'green'}}  /> 
         <Delete onClick={()=>{
          if((typeof window !== 'undefined')){
            if(window.confirm('Do you Wanna Delete')){
              if(info.id){
                dispatch(deleteExcoPostion(info.id))
              }
            }

          }
         }} sx={{color:'red'}}/> </Grid> ))


     const handleChange = (event, newValue) => {
        setValue(newValue);
    };
 

      const [open, setOpen] = useState(false);
      const [openDeleteMember, setOpenDeleteMember] = useState(false);
      const [openAsignModal,setOpenAsignModal] = useState(false)
      const handleOpen = () => setOpen(true);
      const handleOpenDelete = () => setOpenDeleteMember(true);
      const handleClose = ():void => {setOpen(false)};
    //   const handleClose1 = () => setOpenEditMember(false);
      const handleCloseDelete = () => setOpenDeleteMember(false);


      useEffect(()=>{
        dispatch(getExcoPostion())
      },[])
      useEffect(()=>{
        if(status==='updated'){
            dispatch(getExcoPostion())
        }
      },[status])
    return (
        <DashboardLayout>
            {status==='loading'&&<Spinner/>}
            <BasicModal handleClose={handleClose} open={open} body={<AddExcoPostion handleClose={handleClose} />}/>
            <BasicModal handleClose={handleClose} open={openAsignModal} body={<AssignExco 
            currentPostion={currentPostion}
            handleClose={()=> setOpenAsignModal(false)} />}/>
            
            {/* <BasicModal handleClose={handleClose1} open={openEditMember} body={<EditNews handleClose={handleClose1} body='hello' />}/>
            <BasicModal handleClose={handleCloseDelete} open={openDeleteMember} body={<DeleteNews handleClose={handleCloseDelete} body='hello' />}/> */}
            <Grid px={2}>    
                <HeadText text='Exco Management'/>
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
                            text='Create Excos'
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