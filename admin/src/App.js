import './App.css';
import React, { useState } from 'react';
import SignIn from './pages/firebaselogin/login';
import { getAuth, onAuthStateChanged} from "firebase/auth";
import { useEffect } from 'react';
import {app} from "./firebase"

import Home from './pages/home/home';


const auth = getAuth(app);
function App() {

  const [user, setUser] = useState(null)

useEffect(() =>{
  onAuthStateChanged(auth, (user) => {
  if(user){
alert('User already logged in');

setUser(user);
  }else{

    
setUser(null);
  }
});},[]);
  
if(user===null){
  return <SignIn/>}


  return (
<Home/>
  );
}

export default App;
