import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useEffect} from 'react'



const useToast = ()=>{
    const notify = (msg) => toast(msg);

    // useEffect(()=>{
    //     notify()
    // },[])

    return {notify}
}


export default useToast 