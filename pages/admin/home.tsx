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
import {selectDashboard} from "../../redux/admin/dashboard/dashboardSlice";
import {useAppSelector,useAppDispatch} from "../../redux/hooks";
import AddDue from "../../components/Modal.jsx/Dues/AddDue";
import BasicModal from "../../components/Modals";

import Spinner from "../../components/Spinner"
import { selectMemberAndExco } from "../../redux/members/membersSlice";
import { getMembersAndExco } from "../../redux/members/membersApi";
const Home=() =>{
    
    const [value, setValue] = useState(0);
    const excoFields  =  ['S/N','Email','financial','is active',  'amount_owing']
    const memberFields = excoFields
 
    const  [open,setOpen] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    
    const router = useRouter();
    const {status,data:adminCardDashboardData,error} = useAppSelector(selectDashboard)
    const {status:member_and_exco_status,data,} = useAppSelector(selectMemberAndExco);

    const dispatch =  useAppDispatch()
    // console.log(user)
    const formatMembersData = (member)=>{

        
    }
    function createData(sn:number, email:string, financial:boolean, is_active:boolean, amount_owing:string,more_info:any) {
        return { sn, email, financial, is_active, amount_owing,more_info };
      }
      
      let rows = data.map((resp,index:number)=>createData(index+1,resp.email,resp.is_financial,resp.is_active,resp.amount_owing,resp))
      

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

            dispatch(getMembersAndExco({get_excos:false}))

      },[])

     
    return (
        
        <DashboardLayout>
            <BasicModal handleClose={handleClose} open={open} body={<AddDue handleClose={handleClose} />}/>

            {status ==="loading"?<Spinner />:''}
            {/* {memebers_api_status ==="loading"?<Spinner />:''} */}

            <Grid>
                <Grid container justifyContent='space-around'>
                    <Grid item md={7}>
                        <Grid container justifyContent='space-around'>
                            <Grid item md={5} my={1}>
                                <StatCard
                                    header={adminCardDashboardData?.num_of_members }
                                    icon={<PeopleRounded sx={{color:'#E76137'}} />}
                                    iconBg='#FFC5B2'
                                    hasBg={true}
                                    body='Total Members'
                                />
                            </Grid>

                            <Grid item md={5} my={1}>
                                <StatCard
                                header={adminCardDashboardData?.event_count }

                                    icon={<EventAvailable sx={{color:'#00B4EC'}} />}
                                    iconBg='#A9E7FA'
                                    hasBg={true}
                                    body='All Events'
                                />
                            </Grid>

                            <Grid item md={5} my={1}>
                                <StatCard
                                header={adminCardDashboardData?.exco_member }
                                    icon={<PersonPinRounded sx={{color:'#00B4EC'}}/>}
                                    iconBg='#BBFFF3'
                                    hasBg={true}
                                    body='Exco Members'
                                />
                            </Grid>

                            <Grid item md={5} my={1}>
                                <StatCard
                                    header='0' 
                                    icon={<PersonPinRounded sx={{color:'#E76137'}} />}
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
                    <Tab  {...a11yProps(0)} label="Members" className='text' sx={{textTransform:'capitalize'}} ></Tab>
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