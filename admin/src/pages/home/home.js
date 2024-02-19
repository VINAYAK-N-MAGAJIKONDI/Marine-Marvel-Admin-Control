import React from 'react'
import Adduser from '../firebasesignup/signup';
import Signoutbutton from '../../components/signout/signoutbutton';
function Home (){




    return(<>
    <h1>Home</h1>
    <Adduser/>
    <Signoutbutton/>

    </>);
}

export default Home;