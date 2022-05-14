import { useState ,useEffect} from "react";
import { Delete, Edit, SearchRounded, AddCircleOutlineOutlined} from "@mui/icons-material";
import { TextField, Grid, Button, Tabs, Tab, Box, Typography } from "@mui/material";
import { DashboardLayout } from "../../components/Dashboard/Admin/Sidebar/dashboard-layout"; 
// import StatCard from "../../components/Dashboard/Admin/StatCard";
import PropTypes  from "prop-types";
import {CustomizedTables, MemberTable} from "../../components/Dashboard/Admin/Tables";
import BasicModal from "../../components/Modals";
import HeadText from "../../components/Dashboard/DashboardHead";
import AddPorfolio from "../../components/Modal.jsx/Members/AddPortfolio";
// import EditMembers from "../../components/Modal.jsx/Members/MembersEditMembers";
// import DeleteMembers from "../../components/Modal.jsx/Members/DeleteMembers";
import EditMembers from "../../components/Modal.jsx/Members/EditMembers";
import DeleteMembers from "../../components/Modal.jsx/Members/DeleteMembers";
// import GreenButton from "../../components/Buttonn";
import GreenButton from "../../components/Buttonn";
import {useAppSelector,useAppDispatch} from "../../redux/hooks";
import Spinner from "../../components/Spinner";
import { selectMembers } from "../../redux/admin/members/membersSlice";
import {selectDashboard} from "../../redux/admin/dashboard/dashboardSlice";
import {getDashboardApi} from "../../redux/admin/dashboard/dashboardApi";
import {getMembersApi} from "../../redux/admin/members/membersApi"

export default function Members(){

    const [value, setValue] = useState(0);
    const [subcomm, setSubcom] = useState('');
    const [excoFields,setExcoFields] = useState( ['NameS', 'PortFolio', 'Email', 'Phone','Course of study', 'Period of study'])
    const [memberFields,setMemberFields] = useState( ['NameS','Email', 'Phone','Address', 'Occupation','Course of study', 'Period of study','Actions'])
    function createData(name, email, phone, address, occupation,course, period, action) {
        return { name, email, phone, address, occupation,course, period, action };
      }
      
      const [rows,setRows] = useState([]);
      

     const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    function TabPanel(props) {
        const { children, value, index, ...other } = props;
      
        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
          >
            {value === index && (
              <Box sx={{ p: 3 }}>
                <Typography>{children}</Typography>
              </Box>
            )}
          </div>
        );
      }

      TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
      };
      
      function a11yProps(index) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
      }

      const [open, setOpen] = useState(false);
      const [openEditMember, setOpenEditMember] = useState(false);
      const [openDeleteMember, setOpenDeleteMember] = useState(false);
      const handleOpen = () => setOpen(true);
      const handleOpenDelete = () => setOpenDeleteMember(true);
      const handleClose = () => setOpen(false);
      const handleClose1 = () => setOpenEditMember(false);
      const handleCloseDelete = () => setOpenDeleteMember(false);

      const {status,data:adminCardDashboardData,error} = useAppSelector(selectDashboard)
      const {
          status:memebers_api_status,data:members_data,error:members_err } = useAppSelector(selectMembers);
      const dispatch =  useAppDispatch();


      useEffect(()=>{

        dispatch(getDashboardApi())

        dispatch(getMembersApi())

  },[])


  useEffect(()=>{
    //  
    if(members_data){
        //this means get  all the extra info of the members but here i just took the first memebers extra info hopefullly other members would use same info but if not we would have do it
        const newArrayList = ['email','chapter name','financial',...members_data[0].members[0].memeber_info.map((data)=>data.name)].map(item=>item[0].toLocaleUpperCase()+item.substr(1))
        console.log(newArrayList)
        setMemberFields(newArrayList)
        setRows(members_data[0].members)
    }
  },[members_data])


    return (
        <DashboardLayout>
        {status ==="loading"?<Spinner />:''}
        {memebers_api_status ==="loading"?<Spinner />:''}

            <BasicModal handleClose={handleClose} open={open} body={<AddPorfolio handleClose={handleClose} />}/>
            <BasicModal handleClose={handleClose1} open={openEditMember} body={<EditMembers handleClose={handleClose1} body='hello' />}/>
            <BasicModal handleClose={handleCloseDelete} open={openDeleteMember} body={<DeleteMembers handleClose={handleCloseDelete} body='hello' />}/>
            <Grid>    
                <Tabs value={value} onChange={handleChange} >
                    <Tab  {...a11yProps(0)} label="All Members" className='text' sx={{textTransform:'capitalize'}} >Hell</Tab>
                    <Tab  {...a11yProps(1)} label="Exco Members" className='text' sx={{textTransform:'capitalize'}} />
                    <Tab  {...a11yProps(2)} label="Commitee Members" className='text' sx={{textTransform:'capitalize'}} />
                    <Tab  {...a11yProps(3)} label="Sub Commitee Members" className='text' sx={{textTransform:'capitalize'}} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <Grid container my={2} py={1} className='rounded-corners' px={2}>
                       <Grid item md={7} sx={{borderRadius:'5px'}} py={1} px={2} className='light-grey-bg'>
                            <TextField
                                variant='standard'
                                size='large'
                                placeholder='Search'
                                sx={{width:'100%',  borderBottom:'none'}}
                                InputProps={{disableUnderline:true}}
                                onChange={()=>setSubcom(event.target.value)}
                            />        
                        </Grid> 
                        <Grid item alignContent='center' sx={{borderRadius:'5px'}} py={1} px={2} mx={1} className='dark-green-bg'>
                            <SearchRounded sx={{color:'#fff',paddingTop:1}} />
                        </Grid>
                        {/* <Grid item alignContent='center' sx={{borderRadius:'5px'}} py={1} px={2} mx={1} className='dark-green-bg'>
                            <Typography className='white-text'  textAlign='center' sx={{color:'white'}}>Add New</Typography>
                        </Grid> */}

                        <GreenButton 
                        text='Add New'
                        bg='#365C2A'
                        radius={5}
                        textColor='white'
                        paddingX={5}
                        paddingY={1.5}
                        fontWeight={500}
                        />

                        <GreenButton 
                        text='Batch Upload'
                        bg='#365C2A'
                        radius={5}
                        textColor='white'
                        paddingX={5}
                        paddingY={1.5}
                        fontWeight={500}
                        />
                        {/* <Grid item alignContent='center' sx={{borderRadius:'5px'}} py={1} px={2} mx={1} className='dark-green-bg'>
                            <Typography className='white-text'  textAlign='center' sx={{color:'white'}}>upload Multiple</Typography>
                        </Grid> */}
                    </Grid><br/>
                    {/* <MemberTable tableHead={memberFields} rows={rows}/> */}
                    <MemberTable tableHead={memberFields} rows={rows} forExco={false}/>
            
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Grid container my={2} py={1} className='rounded-corners' px={2}>
                       <Grid item md={7} sx={{borderRadius:'5px'}} py={1} px={2} className='light-grey-bg'>
                            <TextField
                                variant='standard'
                                size='large'
                                placeholder='Search'
                                sx={{width:'100%',  borderBottom:'none'}}
                                InputProps={{disableUnderline:true}}
                                onChange={()=>setSubcom(event.target.value)}
                            />

                            
                        </Grid> 
                        <Grid item alignContent='center' sx={{borderRadius:'5px'}} py={1} px={2} mx={1} className='dark-green-bg'>
                            <SearchRounded sx={{color:'#fff',paddingTop:1}} />
                        </Grid>
                        {/* <GreenButton 
                        text='Add New'
                        bg='#365C2A'
                        radius={5}
                        textColor='white'
                        paddingX={5}
                        paddingY={2}
                        fontWeight={500}
                        /> */}

                        <GreenButton 
                        text='Create Portfolio'
                        bg='#365C2A'
                        radius={5}
                        textColor='white'
                        paddingX={5}
                        paddingY={1.5}
                        fontWeight={500}
                        />
                    </Grid><br/>
                    <MemberTable tableHead={memberFields} rows={rows} forExco={true}/>

                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Grid container my={2} py={1} className='rounded-corners' px={2}>
                       <Grid item md={7} sx={{borderRadius:'5px'}} py={1} px={2} className='light-grey-bg'>
                            <TextField
                                variant='standard'
                                size='large'
                                placeholder='Search'
                                sx={{width:'100%',  borderBottom:'none'}}
                                InputProps={{disableUnderline:true}}
                                onChange={()=>setSubcom(event.target.value)}
                            />

                            
                        </Grid> 
                        <Grid item alignContent='center' sx={{borderRadius:'5px'}} py={1} px={2} mx={1} className='dark-green-bg'>
                            <SearchRounded sx={{color:'#fff',paddingTop:1}} />
                        </Grid>
                        {/* <Grid item alignContent='center' sx={{borderRadius:'5px'}} py={1} px={2} mx={1} className='dark-green-bg'>
                            <Typography className='white-text'  textAlign='center' sx={{color:'red'}}>Add New</Typography>
                        </Grid> */}

                        <GreenButton 
                        text='Create Portfolio'
                        bg='#365C2A'
                        radius={5}
                        textColor='white'
                        paddingX={5}
                        paddingY={1.5}
                        fontWeight={500}
                        />
                    </Grid><br/>
                    <CustomizedTables tableHead={excoFields} rows={rows}/>
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <Grid container textAlign='center'  my={2} py={1} className='rounded-corners' px={2}>
                       <Grid item md={7} sx={{borderRadius:'5px'}} py={1} px={2} className='light-grey-bg'>
                            <TextField
                                variant='standard'
                                size='large'
                                placeholder='Search'
                                sx={{width:'100%',  borderBottom:'none'}}
                                InputProps={{disableUnderline:true}}
                                value={subcomm}
                                onChange={()=>setSubcom(event.target.value)}
                            />       
                        </Grid> 
                        <Grid item alignContent='center' sx={{borderRadius:'5px'}} py={1} px={2} mx={1} className='dark-green-bg'>
                            <SearchRounded sx={{color:'#fff',paddingTop:1}} />
                        </Grid>
                        {/* <Grid item alignContent='center' sx={{borderRadius:'5px'}} py={1} px={2} mx={1} className='dark-green-bg'>
                            <Typography className='white-text'  textAlign='center' sx={{color:'red'}}>Add New</Typography>
                        </Grid> */}

                        <GreenButton 
                        text='Create Portfolio'
                        bg='#365C2A'
                        radius={5}
                        textColor='white'
                        paddingX={5}
                        paddingY={1.5}
                        fontWeight={500}
                        />
                    </Grid><br/>
                    <CustomizedTables tableHead={excoFields} rows={rows}/>
                </TabPanel>
            </Grid>
            
        </DashboardLayout>
    )
}