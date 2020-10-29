import React, { useEffect, useState, useCallback, useMemo } from 'react';
import ReadError from './model/error/ReadError';
import { getUsersApi } from './api'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await getUsersApi();
        setUsers(data || []);
      } catch(e) {
        if (e instanceof ReadError) {
          toast.error(e.message);
          setUsers([]);
        } else {
          throw e;
        }
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  
  return (
    <>
      <ul>
        {
          users.map(({id, name, age}) => {
            return <li key={id}>{`${name}(${age})`}</li>
          })
        }
      </ul>
      <ToastContainer />
    </>
  );
}

export default App;
