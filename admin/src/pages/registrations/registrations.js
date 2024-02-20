import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import './registrations.css';

function Registrations() {
    const [registrationData, setRegistrationData] = useState([]);

    useEffect(() => {
        const fetchRegistrations = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'registrations'));
                const registrations = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setRegistrationData(registrations);
            } catch (error) {
                console.error('Error fetching registrations:', error);
            }
        };

        fetchRegistrations();
    }, []);

    const groupByEventTitle = () => {
        const groupedData = {};
        registrationData.forEach((registration) => {
            if (!groupedData[registration.event_title]) {
                groupedData[registration.event_title] = [];
            }
            groupedData[registration.event_title].push({
                username: registration.username,
                email: registration.email,
            });
        });
        return groupedData;
    };

    const groupedRegistrations = groupByEventTitle();

    return (
        <div className="registrations">
            <h1>Registrations by Event</h1>
            <div className='box'>
            {Object.keys(groupedRegistrations).map((eventTitle) => (
                <div key={eventTitle} className="event-container">
                    <h2 className="event-title">{eventTitle}</h2>
                    <div className="registration-list">
                        {groupedRegistrations[eventTitle].map((registration, index) => (
                            <div key={index} className="registration-item">
                          <p><strong>Username:</strong> {registration.username}</p>
                                    <p><strong>Email:</strong> {registration.email}</p>
                                    
                                    </div>
                        ))}
                       
                    </div>
                    </div>
               
            ))}
             </div>
        </div>
    );
}

export default Registrations;
