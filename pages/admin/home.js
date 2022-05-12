import { useState,useEffect } from "react";
import { useRouter } from 'next/router'
import { PeopleRounded, EventAvailable, PersonPinRounded, 
    AccountBalanceWalletRounded, AddCircleOutlineOutlined, Delete, Edit} from "@mui/icons-material";
import { Button, Grid, Tabs, Tab, Box, Typography } from "@mui/material";
import { DashboardLayout } from "../../components/Dashboard/Admin/Sidebar/dashboard-layout"; 
import StatCard from "../../components/Dashboard/Admin/StatCard";
import PropTypes  from "prop-types";
import {CustomizedTables, MemberTable} from "../../components/Dashboard/Admin/Tables";
import {isLoggedIn} from "../../helpers/auth.helper"
export default function Home(){
    
    const [value, setValue] = useState(0);
    const excoFields = ['Name', 'PortFolio', 'Email', 'Phone','Course of study', 'Period of study']
    const memberFields = ['Name','Email', 'Phone','Address', 'Occupation','Course of study', 'Period of study','Actions']
    const router = useRouter();
    // console.log(user)

    function createData(name, email, phone, address, occupation,course, period, action) {
        return { name, email, phone, address, occupation,course, period, action };
      }
      
      const rows = [
        createData('Ade Johnson', 'ade@gmail.com', '08089348232','123, Ikorodu road, Onipanu ', 'Project Manger', 'Project Management', '2010 - 2022',<Grid container justifyContent='space-between' > <Edit sx={{color:'#365C2A'}}/> <Delete sx={{color:'red'}}/> </Grid> ),
        createData('Ade Johnson', 'ade@gmail.com', '08089348232','123, Ikorodu road, Onipanu ', 'Project Manger', 'Project Management', '2010 - 2022', <Grid container> <Edit sx={{color:'#365C2A'}}/> <Delete sx={{color:'red'}}/> </Grid>),
        createData('Ade Johnson', 'ade@gmail.com', '08089348232','123, Ikorodu road, Onipanu ', 'Project Manger', 'Project Management', '2010 - 2022', <Grid container> <Edit sx={{color:'#365C2A'}}/> <Delete sx={{color:'red'}}/> </Grid>),
        
      ];
      

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


  
    return (
        <DashboardLayout>
            <Grid>
                <Grid container justifyContent='space-around'>
                    <Grid item md={7}>
                        <Grid container justifyContent='space-around'>
                            <Grid item md={5} my={1}>
                                <StatCard
                                    header='21,900' 
                                    icon={<PeopleRounded sx={{color:'#E76137'}} fontSize="16"/>}
                                    iconBg='#FFC5B2'
                                    hasBg={true}
                                    body='Total Members'
                                />
                            </Grid>

                            <Grid item md={5} my={1}>
                                <StatCard
                                    header='25' 
                                    icon={<EventAvailable sx={{color:'#00B4EC'}} fontSize="16"/>}
                                    iconBg='#A9E7FA'
                                    hasBg={true}
                                    body='All Events'
                                />
                            </Grid>

                            <Grid item md={5} my={1}>
                                <StatCard
                                    header='30' 
                                    icon={<PersonPinRounded sx={{color:'#00B4EC'}} fontSize="16"/>}
                                    iconBg='#BBFFF3'
                                    hasBg={true}
                                    body='Exco Members'
                                />
                            </Grid>

                            <Grid item md={5} my={1}>
                                <StatCard
                                    header='30' 
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
                            header='30' 
                            icon={<AccountBalanceWalletRounded sx={{color:'#365C2A', fontSize:'35'}} fontSize='large' />}
                            iconBg='#FFD7B2'
                            body='Total Income'
                            color='#BBFFF3'
                        />
                        <br/>
                        <StatCard
                            header='30' 
                            icon={<AccountBalanceWalletRounded sx={{color:'#F53B00', fontSize:'35'}} fontSize='large' />}
                            iconBg='#FFD7B2'
                            body='Total Outstanding'
                            color='#FFEBD9'
                        />
                        <br/>
                        <Button sx={{bgcolor:'#203719',color:'white'}} fullWidth >
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
                    <MemberTable tableHead={memberFields} rows={rows}/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                <CustomizedTables tableHead={excoFields} rows={rows}/>

                </TabPanel>
            </Grid>
            
        </DashboardLayout>
    )
}