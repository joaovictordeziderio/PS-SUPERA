import React, {useEffect} from 'react';
import SideBar from '../SideBar/index';
import { useHistory } from 'react-router-dom';


export default function Logout(){
    const history = useHistory();
    
    useEffect(()=> {
        localStorage.clear();
        history.push('/');
    }, []);

    return(
        <SideBar />
    );
}