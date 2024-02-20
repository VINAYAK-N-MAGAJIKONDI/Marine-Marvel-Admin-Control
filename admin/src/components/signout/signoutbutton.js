import React from 'react'
import {getAuth, signOut } from 'firebase/auth'
import { FaSignOutAlt } from 'react-icons/fa';
import {app} from "../../firebase"
const auth = getAuth(app);



function Signoutbutton(){




    return(
        <button onClick={()=> signOut(auth)} className="signoutbutton"><FaSignOutAlt/> Logout</button>
    )
}

export default Signoutbutton;