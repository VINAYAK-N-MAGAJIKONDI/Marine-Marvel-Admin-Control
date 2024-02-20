import './App.css';
import React, { useState } from 'react';
import SignIn from './pages/firebaselogin/login';
import { getAuth, onAuthStateChanged} from "firebase/auth";
import { useEffect } from 'react';
import {app} from "./firebase"

import Navigation from './pages/home/home';


const auth = getAuth(app);
function App() {

  const [user, setUser] = useState(null)

useEffect(() =>{
  onAuthStateChanged(auth, (user) => {
  if(user){


setUser(user);
  }else{

    
setUser(null);
  }
});},[]);
  
if(user===null){
  return <SignIn/>}


  return (
<Navigation/>
  );
}

export default App;
