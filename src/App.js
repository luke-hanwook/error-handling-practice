import React, { useEffect, useState } from 'react';
import ReadError from './model/error/ReadError';
import { getUsersApi } from './api'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsersApi();
        setUsers(data);
      } catch(e) {
        if (e instanceof ReadError) {
          toast.error(e.message);
          setUsers([]);
        } else {
          throw e;
        }
      }
    }

    fetchUsers();
  }, [])

  return (
    <>
      <ul>
        {
          users.length > 0 ? users.map(({id, name, age}) => {
            return <li key={id}>{`${name} (${age})`}</li>
          }) : "No data..."
        }
      </ul>
      <ToastContainer />
    </>
  );
}

export default App;
