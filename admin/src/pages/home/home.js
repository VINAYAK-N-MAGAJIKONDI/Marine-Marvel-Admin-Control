import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Adduser from '../firebasesignup/signup';
import Signoutbutton from '../../components/signout/signoutbutton';
import Footer from '../../components/footer/footer';
import Navbar from '../../components/navbar/navbar';

function Home() {
  return (
    <Router>
      <>
        <Navbar />
        <Switch>
          <Route path="/signup">
            <Adduser />
          </Route>
          <Route path="/signout">
            <Signoutbutton />
          </Route>
          <Route path="/">
            {/* Default route, you can put your default component here */}
            <div>This is the homepage</div>
          </Route>
        </Switch>
        <Footer />
      </>
    </Router>
  );
}

export default Home;
