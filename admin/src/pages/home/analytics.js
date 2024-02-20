import React from 'react';
import logo from '../../assets/logo.png'
import './home.css';

function WelcomeAdmin() {
    return (<div className="base">
        <div className="welcome-admin">
            <img src={logo} alt="Logo" className="logo" />
            <h1>Welcome Admin</h1>
            <p className="motto">Empowering You to Save Lives Underwater</p>
            <div className="message">
                <p>As an admin, you play a crucial role in protecting marine life. Your efforts in managing and maintaining our underwater ecosystems contribute to the conservation of our oceans.</p>
                <p>Together, let's work towards creating a sustainable future where marine life thrives. Thank you for your dedication and commitment to saving lives underwater!</p>
            </div>
        </div></div>
    );
}

export default WelcomeAdmin;
