import { useState,useEffect  } from "react";
import { useRouter } from 'next/router'
import { PeopleRounded, EventAvailable, PersonPinRounded, 
    AccountBalanceWalletRounded, AddCircleOutlineOutlined, Delete, Edit} from "@mui/icons-material";
import { Button, Grid, Tabs, Tab, Box, Typography } from "@mui/material";
import { DashboardLayout } from "../../components/Dashboard/Admin/Sidebar/dashboard-layout"; 
import StatCard from "../../components/Dashboard/Admin/StatCard";
import PropTypes  from "prop-types";
import {CustomizedTables, MemberTable} from "../../components/Dashboard/Admin/Tables";
import {isLoggedIn} from "../../helpers/auth.helper";
import {getDashboardApi} from "../../redux/admin/dashboard/dashboardApi";
import {getMembersApi} from "../../redux/admin/members/membersApi"
import { selectMembers } from "../../redux/admin/members/membersSlice";
import {selectDashboard} from "../../redux/admin/dashboard/dashboardSlice";
import {useAppSelector,useAppDispatch} from "../../redux/hooks";
import AddDue from "../../components/Modal.jsx/Dues/AddDue";
import BasicModal from "../../components/Modals";

import Spinner from "../../components/Spinner"
const Home=() =>{
    
    const [value, setValue] = useState(0);
    const [excoFields,setExcoFields] = useState( ['NameS', 'PortFolio', 'Email', 'Phone','Course of study', 'Period of study'])
    const [memberFields,setMemberFields] = useState( ['NameS','Email', 'Phone','Address', 'Occupation','Course of study', 'Period of study','Actions'])
    const [rows,setRows] = useState([]);
    const  [open,setOpen] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    
    const router = useRouter();
    const {status,data:adminCardDashboardData,error} = useAppSelector(selectDashboard)
    const {
        status:memebers_api_status,data:members_data,error:members_err } = useAppSelector(selectMembers);
    const dispatch =  useAppDispatch()
    // console.log(user)
    const formatMembersData = (member)=>{

        
    }
    function createData(name, email, phone, address, occupation,course, period, action) {
        return { name, email, phone, address, occupation,course, period, action };
      }
      
      

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
            <BasicModal handleClose={handleClose} open={open} body={<AddDue handleClose={handleClose} />}/>

            {status ==="loading"?<Spinner />:''}
            {memebers_api_status ==="loading"?<Spinner />:''}

            <Grid>
                <Grid container justifyContent='space-around'>
                    <Grid item md={7}>
                        <Grid container justifyContent='space-around'>
                            <Grid item md={5} my={1}>
                                <StatCard
                                    header={adminCardDashboardData?.num_of_members }
                                    icon={<PeopleRounded sx={{color:'#E76137'}} fontSize="16"/>}
                                    iconBg='#FFC5B2'
                                    hasBg={true}
                                    body='Total Members'
                                />
                            </Grid>

                            <Grid item md={5} my={1}>
                                <StatCard
                                header={adminCardDashboardData?.event_count }

                                    icon={<EventAvailable sx={{color:'#00B4EC'}} fontSize="16"/>}
                                    iconBg='#A9E7FA'
                                    hasBg={true}
                                    body='All Events'
                                />
                            </Grid>

                            <Grid item md={5} my={1}>
                                <StatCard
                                header={adminCardDashboardData?.exco_member }
                                    icon={<PersonPinRounded sx={{color:'#00B4EC'}} fontSize="16"/>}
                                    iconBg='#BBFFF3'
                                    hasBg={true}
                                    body='Exco Members'
                                />
                            </Grid>

                            <Grid item md={5} my={1}>
                                <StatCard
                                    header='0' 
                                    icon={<PersonPinRounded sx={{color:'#E76137'}} fontSize="16"/>}
                                    iconBg='#FFD7B2'
                                    hasBg={true}
                                    body='Commitee Members'
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    
                    <Grid item md={4} p={2} className='light-grey-bg rounded-corners'>
                        {/* <IconCard/>
                        <IconCard/>
                        <IconCard/> */}
                        <StatCard
                            header={adminCardDashboardData?.total_income }
                            icon={<AccountBalanceWalletRounded sx={{color:'#365C2A', fontSize:'35'}} fontSize='large' />}
                            iconBg='#FFD7B2'
                            body='Total Income'
                            color='#BBFFF3'
                        />
                        <br/>
                        <StatCard
                        header={adminCardDashboardData?.amount_owing }
                            icon={<AccountBalanceWalletRounded sx={{color:'#F53B00', fontSize:'35'}} fontSize='large' />}
                            iconBg='#FFD7B2'
                            body='Total Outstanding'
                            color='#FFEBD9'
                        />
                        <br/>
                        
                        <Button sx={{bgcolor:'#203719',color:'white'}} fullWidth onClick={handleOpen}>
                            <AddCircleOutlineOutlined/> &nbsp; &nbsp;
                            Add Due
                        </Button>                            
                    </Grid>
                   
                </Grid>
            
                
                <Tabs
                    value={value}
                    onChange={handleChange}
                >
                    <Tab  {...a11yProps(0)} label="Members" className='text' sx={{textTransform:'capitalize'}} >Hell</Tab>
                    <Tab  {...a11yProps(1)} label="Exco Members" className='text' sx={{textTransform:'capitalize'}} />
                    {/* <Tab value="three" label="Commitee Members" className='text' sx={{textTransform:'capitalize'}} />
                    <Tab value="four" label="Sub-Commitee Members" className='text' sx={{textTransform:'capitalize'}} /> */}
                </Tabs>
                <TabPanel value={value} index={0}>
                    {/* <CustomizedTables tableHead={excoFields} rows={rows}/> */}
                    <MemberTable tableHead={memberFields} rows={rows} forExco={false}/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                <MemberTable tableHead={memberFields} rows={rows} forExco={true}/>
                </TabPanel>
            </Grid>
            
        </DashboardLayout>

    )
}


export default  Home