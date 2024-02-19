import React from 'react'
import {getAuth, signOut } from 'firebase/auth'
import {app} from "../../firebase"
const auth = getAuth(app);



function Signoutbutton(){




    return(
        <button onClick={()=> signOut(auth)} className="signoutbutton">Logged out
        </button>
    )
}

export default Signoutbutton;