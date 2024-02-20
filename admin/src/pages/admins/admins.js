import Adduser from '../firebasesignup/signup';
import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import {app} from '../../firebase';
import './admins.css'

const auth = getAuth(app);
const database = getDatabase(app);


function Admins(){


    return(<>
    <div className="admins-container">
    <h1 className='admin-header'> Manage Administrators </h1>
    <Adduser />
    </div>



    </>);
}








function UserList() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);

      if (user) {
        const usersRef = ref(database, 'users');
        onValue(usersRef, (snapshot) => {
          const data = snapshot.val();
          const userArray = Object.values(data || {});
          setUsers(userArray);
        });
      }
    });
  }, []);

  const handleDeleteUser = (userId) => {
  
    if (!currentUser || !currentUser.uid) {
      alert('You are not authorized to delete users.');
      return;
    }

    
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      const userRef = ref(database, `users/${userId}`);
      remove(userRef)
        .then(() => {
          alert('User deleted successfully.');
          
          setUsers(users.filter((user) => user.id !== userId));
        })
        .catch((error) => {
          alert('An error occurred while deleting the user:', error.message);
        });
    }
  };

  return (
    <div style={{ background: 'linear-gradient(rgb(110, 132, 150), #002633)' }}>
      <h1>Users</h1>
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} (
              {user.email}
              )
              <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
}

export {UserList, Admins} 
