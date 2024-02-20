import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

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
        <div className="registrations" style={{ background: 'linear-gradient(rgb(110, 132, 150), #002633)' }}>
            <h1>Registrations by Event</h1>
            {Object.keys(groupedRegistrations).map((eventTitle) => (
                <div key={eventTitle}>
                    <h2>{eventTitle}</h2>
                    <ul>
                        {groupedRegistrations[eventTitle].map((registration, index) => (
                            <li key={index}>
                                <p><strong>Username:</strong> {registration.username}</p>
                                <p><strong>Email:</strong> {registration.email}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default Registrations;
