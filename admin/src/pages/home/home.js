import React from 'react';
import {Admins} from "../admins/admins";
import Signoutbutton from "../../components/signout/signoutbutton";
import CleanUps from "../cleanups/cleanups";
import Footer from "../../components/footer/footer";
import Fundings from "../funding/funding";
import Navbar from "../../components/navbar/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDisplay from "../../components/products/products";
import Carousel from "../latest/latest";
import Registrations from "../registrations/registrations";
import 'firebase/analytics';
import Analytics from './analytics';

function Navigation() {
  return (
    <>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Analytics/>} />
          <Route path="/signout" element={<Signoutbutton />} />
          <Route path="/cleanups" element={<CleanUps />} />
          <Route path="/registrations" element={<Registrations />} />
          <Route path="/latest" element={<Carousel />} />
          <Route path="/fundings" element={<Fundings />} />
          <Route path="/products" element={<ProductDisplay />} />
          <Route path="/admins" element={<Admins />} />

        </Routes>

        <Footer />
      </Router>
    </>
  );
}






export default Navigation;
