import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Grid,Button, IconButton } from '@mui/material';
import { Close, DeleteForeverRounded,Delete,Edit} from '@mui/icons-material';
import Image from 'next/image';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CancelIcon from '@mui/icons-material/Cancel';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, post, email, phone, course,period, action) {
  return { name, post, email, phone, course, period, action };
}

const rows = [
    createData('Biola Johnson', 'Chairman', 'biola2gmail.com', '09034394343', 'IT tech', '2021 - 2022', <IconButton><DeleteForeverRounded sx={{color:'red'}}/></IconButton>),
    createData('Biola Johnson', 'Chairman', 'biola2gmail.com', '09034394343', 'IT tech', '2021 - 2022', <IconButton><DeleteForeverRounded sx={{color:'red'}}/></IconButton>),
    createData('Biola Johnson', 'Chairman', 'biola2gmail.com', '09034394343', 'IT tech', '2021 - 2022', <IconButton><DeleteForeverRounded sx={{color:'red'}}/></IconButton>),
    createData('Biola Johnson', 'Chairman', 'biola2gmail.com', '09034394343', 'IT tech', '2021 - 2022', <IconButton><DeleteForeverRounded sx={{color:'red'}}/></IconButton>),
    createData('Biola Johnson', 'Chairman', 'biola2gmail.com', '09034394343', 'IT tech', '2021 - 2022', <IconButton><DeleteForeverRounded sx={{color:'red'}}/></IconButton>),
    createData('Biola Johnson', 'Chairman', 'biola2gmail.com', '09034394343', 'IT tech', '2021 - 2022', <IconButton><DeleteForeverRounded sx={{color:'red'}}/></IconButton>),
];

export function CustomizedTables(props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {/* {props.tableHead ? props.tableHead.map((e)=><StyledTableCell>{e}</StyledTableCell>):''} */}
            <StyledTableCell >Name</StyledTableCell>
            <StyledTableCell align="right">Portfolio</StyledTableCell>
            <StyledTableCell align="right">Email&nbsp;</StyledTableCell>
            <StyledTableCell align="right">Phone&nbsp;</StyledTableCell>
            <StyledTableCell align="right">Course of study&nbsp;</StyledTableCell>
            <StyledTableCell align="right">Period of study&nbsp;</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody className='text'>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell className='light-text' component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell className='light-text' align="right">{row.post}</StyledTableCell>
              <StyledTableCell className='light-text' align="right">{row.email}</StyledTableCell>
              <StyledTableCell className='light-text' align="right">{row.phone}</StyledTableCell>
              <StyledTableCell className='light-text' align="right">{row.course}</StyledTableCell>
              <StyledTableCell className='light-text' align="right">{row.period}</StyledTableCell>
              <StyledTableCell className='light-text' align="center">{row.action}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}



export function MemberTable(props) {
  console.log(props.rows)
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {props.tableHead ? props.tableHead.map((e)=><StyledTableCell >{e}</StyledTableCell>):''}
          

{
  props.forExco?
  <>
              <StyledTableCell>Postion Name</StyledTableCell>
            <StyledTableCell>Can Upload Min</StyledTableCell>

  </>
:""}
          
          </TableRow>
        </TableHead>
        <TableBody className='text'>
          {props.rows.filter(data=>{
            // props.forExco==true && data.exco_info !== undefined|null
            let showexco =true;
            if(props.forExco==true){
              if(data?.exco_info !== undefined|null){
                showexco =true

              }else{showexco=false}
            }

          return showexco
          }).map((row) => (
            <StyledTableRow key={row.user__email}>
              <StyledTableCell className='light-text' component="th" scope="row">
                {row.user__email}
              </StyledTableCell>
              {/* <StyledTableCell className='light-text' >{row.post}</StyledTableCell> */}
              <StyledTableCell className='light-text' >{row.user__chapter__name?row.user__chapter__name:'Does Not Belong To One Yet'}</StyledTableCell>
              <StyledTableCell className='light-text' >{row.is_financial?<CheckBoxIcon style={{'color':"green"}}/>:
              <CancelIcon style={{'color':"red"}}/>}</StyledTableCell>
         
              {row?.memeber_info?
              
              row.memeber_info.map(e=>{


return (
  <StyledTableCell className='light-text' key={e.name}>{e.value}</StyledTableCell>

)
              }):""}

        {
          props.forExco?
          <>
  <StyledTableCell className='light-text' key={row?.exco_info[0].name}>{row?.exco_info[0].name}</StyledTableCell>
  <StyledTableCell className='light-text' key={row?.exco_info[0].can_upload_min}>{row?.exco_info[0].can_upload_min?<CheckBoxIcon style={{'color':"green"}}/>:
              <CancelIcon style={{'color':"red"}}/>}</StyledTableCell>
            
          </>:""
        }      
              {/* <StyledTableCell className='light-text' >{row.occupation}</StyledTableCell>
              <StyledTableCell className='light-text' >{row.course}</StyledTableCell>
              <StyledTableCell className='light-text' >{row.period}</StyledTableCell>
              <StyledTableCell className='light-text' >{row.action}</StyledTableCell> */}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


export function DuesTable(props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {props.tableHead ? props.tableHead.map((e)=><StyledTableCell>{e}</StyledTableCell>):''}
            {/* <StyledTableCell >Name</StyledTableCell> */}
            {/* <StyledTableCell align="right">Portfolio</StyledTableCell>
            <StyledTableCell align="right">Email&nbsp;</StyledTableCell>
            <StyledTableCell align="right">Phone&nbsp;</StyledTableCell>
            <StyledTableCell align="right">Course of study&nbsp;</StyledTableCell>
            <StyledTableCell align="right">Period of study&nbsp;</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell> */}
          </TableRow>
        </TableHead>
        <TableBody className='text'>
          {props.rows.map((row,index) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell className='light-text' component="th" scope="row">
                {index+1}
              </StyledTableCell>
              {/* <StyledTableCell className='light-text' >{row.post}</StyledTableCell> */}
              <StyledTableCell className='light-text' >{row.Name}</StyledTableCell>
              <StyledTableCell className='light-text' >{row.startDate}</StyledTableCell>
              <StyledTableCell className='light-text' >{row.startTime}</StyledTableCell>
              <StyledTableCell className='light-text' >{row.re_occuring?"True":"False"}</StyledTableCell>
              <StyledTableCell className='light-text' >{row.is_for_excos?"True":"False"}</StyledTableCell>
              <StyledTableCell className='light-text' >{row.amount}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}



export function OwingTable(props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {props.tableHead ? props.tableHead.map((e)=><StyledTableCell>{e}</StyledTableCell>):''}
            {/* <StyledTableCell >Name</StyledTableCell> */}
            {/* <StyledTableCell align="right">Portfolio</StyledTableCell>
            <StyledTableCell align="right">Email&nbsp;</StyledTableCell>
            <StyledTableCell align="right">Phone&nbsp;</StyledTableCell>
            <StyledTableCell align="right">Course of study&nbsp;</StyledTableCell>
            <StyledTableCell align="right">Period of study&nbsp;</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell> */}
          </TableRow>
        </TableHead>
        <TableBody className='text'>
          {props.rows.map((row,index) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell className='light-text' component="th" scope="row">
                {index+1}
              </StyledTableCell>
              {/* <StyledTableCell className='light-text' >{row.post}</StyledTableCell> */}
              <StyledTableCell className='light-text' >{row.user__email}</StyledTableCell>
              <StyledTableCell className='light-text' >{row.is_exco?
              
              <CheckBoxIcon style={{'color':"green"}}/>:
              <CancelIcon style={{'color':"red"}}/>
            
            }</StyledTableCell>
              <StyledTableCell className='light-text' >{row.amount_owing}</StyledTableCell>
              {/* <StyledTableCell className='light-text' >{row.course}</StyledTableCell>
              <StyledTableCell className='light-text' >{row.amount}</StyledTableCell> */}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


export function NationalEventTable(props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {props.tableHead ? props.tableHead.map((e)=><StyledTableCell>{e}</StyledTableCell>):''}
          </TableRow>
        </TableHead>
        <TableBody className='text'>
          {props.rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell className='light-text' component="th" scope="row">
                {row.sn}
              </StyledTableCell>
              {/* <StyledTableCell className='light-text' >{row.post}</StyledTableCell> */}
              <StyledTableCell className='light-text' >{row.name}</StyledTableCell>
              <StyledTableCell className='light-text' >{row.date}</StyledTableCell>
              {/* <StyledTableCell className='light-text' >{row.category}</StyledTableCell> */}
              <StyledTableCell className='light-text' >{row.type}</StyledTableCell>
              <StyledTableCell className='light-text' >{row.address}</StyledTableCell>
              <StyledTableCell className='light-text' >{row.action}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


export function MemberEventTable(props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {props.tableHead ? props.tableHead.map((e)=><StyledTableCell>{e}</StyledTableCell>):''}
          </TableRow>
        </TableHead>
        <TableBody className='text'>
          {props.rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell className='light-text' component="th" scope="row">
                {row.sn}
              </StyledTableCell>
              {/* <StyledTableCell className='light-text' >{row.post}</StyledTableCell> */}
              <StyledTableCell className='light-text' >{row.name}</StyledTableCell>
              <StyledTableCell className='light-text' >{row.date}</StyledTableCell>
              {/* <StyledTableCell className='light-text' >{row.category}</StyledTableCell> */}
              <StyledTableCell className='light-text' >{row.type}</StyledTableCell>
              <StyledTableCell className='light-text' >{row.address}</StyledTableCell>
              <StyledTableCell className='light-text' >{row.action}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function StateEventTable(props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {props.tableHead ? props.tableHead.map((e)=><StyledTableCell>{e}</StyledTableCell>):''}
          </TableRow>
        </TableHead>
        <TableBody className='text'>
          {props.rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell className='light-text' component="th" scope="row">
                {row.sn}
              </StyledTableCell>
              {/* <StyledTableCell className='light-text' >{row.post}</StyledTableCell> */}
              <StyledTableCell className='light-text' >{row.name}</StyledTableCell>
              <StyledTableCell className='light-text' >{row.date}</StyledTableCell>
              {/* <StyledTableCell className='light-text' >{row.category}</StyledTableCell> */}
              <StyledTableCell className='light-text' >{row.type}</StyledTableCell>
              <StyledTableCell className='light-text' >{row.address}</StyledTableCell>
              <StyledTableCell className='light-text' >{row.action}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function AllEventTable(props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {props.tableHead ? props.tableHead.map((e)=><StyledTableCell>{e}</StyledTableCell>):''}
          </TableRow>
        </TableHead>
        <TableBody className='text'>
          {props.rows.map((row,index) => (
            <StyledTableRow key={index}>
              <StyledTableCell className='light-text' component="th" scope="row">
                {index+1}
              </StyledTableCell>
              {/* <StyledTableCell className='light-text' >{row.post}</StyledTableCell> */}
              <StyledTableCell className='light-text' >{row.name}</StyledTableCell>
              <StyledTableCell className='light-text' >{row.startDate}</StyledTableCell>
              <StyledTableCell className='light-text' >{(()=>{
                let val;
                if(row.is_for_excos){
                    val="Excos"
                }
                if (row.is_commitee){
                  val = "For Commitee:"+row.commitee_name
                }
                if(!row.is_for_excos&&!row.is_commitee){
                  val = "All Members"
                }
                return val
              })()}</StyledTableCell>
              <StyledTableCell className='light-text' >{row.is_paid_event?"Paid":"Free"}</StyledTableCell>
              <StyledTableCell className='light-text' >{"At my house dudes"}</StyledTableCell>
              <StyledTableCell className='light-text' >

              <Grid container justifyContent='space-between' > <Edit 
              // onClick={()=>setOpenEditMember(true)} 
              sx={{color:'#365C2A'}}/> 
                      <Delete 
                      // onClick={()=>setOpenDeleteMember(true)} 
                      sx={{color:'red'}}/> 
                      </Grid>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
// sn, name, date, category, type, action

export function ArchiveTable(props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {props.tableHead ? props.tableHead.map((e)=><StyledTableCell>{e}</StyledTableCell>):''}
          </TableRow>
        </TableHead>
        <TableBody className='text'>
          {props.rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell className='light-text' component="th" scope="row">
                {row.sn}
              </StyledTableCell>
              {/* <StyledTableCell className='light-text' >{row.post}</StyledTableCell> */}
              <StyledTableCell className='light-text' >{row.name}</StyledTableCell>
              <StyledTableCell className='light-text' >{row.email}</StyledTableCell>
              <StyledTableCell className='light-text' >{row.phone}</StyledTableCell>
              <StyledTableCell className='light-text' >{row.address}</StyledTableCell>
              <StyledTableCell className='light-text' >{row.occupation}</StyledTableCell>
              <StyledTableCell className='light-text' >{row.course}</StyledTableCell>
              <StyledTableCell className='light-text' >{row.period}</StyledTableCell>
              <StyledTableCell className='light-text' >{row.action}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


export function NewsTable(props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {props.tableHead ? props.tableHead.map((e)=><StyledTableCell>{e}</StyledTableCell>):''}
          </TableRow>
        </TableHead>
        <TableBody className='text'>
          {props.rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell className='light-text' component="th" scope="row">
                {row.sn}
              </StyledTableCell>
              {/* <StyledTableCell className='light-text' >{row.post}</StyledTableCell> */}
              <StyledTableCell className='light-text' >{row.title}</StyledTableCell>
              <StyledTableCell className='light-text' >{row.content}</StyledTableCell>
              <StyledTableCell className='light-text' >{row.date}</StyledTableCell>
              {/* <StyledTableCell className='light-text' >{row.address}</StyledTableCell> */}
              <StyledTableCell className='light-text' >{row.Reader}</StyledTableCell>
              <StyledTableCell className='light-text' >{row.action}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


export function GalleryTable(props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {props.tableHead ? props.tableHead.map((e)=><StyledTableCell>{e}</StyledTableCell>):''}
          </TableRow>
        </TableHead>
        <TableBody className='text'>
          {props.rows.map((row) => (
            <StyledTableRow key={row.sn}>
              <StyledTableCell className='light-text' component="th" scope="row">
                {row.sn}
              </StyledTableCell>
              {/* <StyledTableCell className='light-text' >{row.post}</StyledTableCell> */}
              <StyledTableCell className='light-text' ><Image src={row.image} height={'50px'} width={'50px'}/> </StyledTableCell>
              <StyledTableCell className='light-text' >{row.title}</StyledTableCell>
              <StyledTableCell className='light-text' >{row.action}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
