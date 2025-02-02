import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import Editor from '../Editor/Editor.jsx';
const WorkSpace = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    useEffect(() => {
        let isMounted = true; // Track if the component is mounted
    
        const fetchData = async () => {
          try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/workspace/getWorkspace/${id}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              },
            });
    
            if (!response.ok) {
              const contentType = response.headers.get('content-type');
              if (contentType && contentType.includes('application/json')) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Something went wrong');
              } else {
                throw new Error('Unexpected response format');
              }
            }
    
            const res = await response.json();
            if (isMounted) {
              setData(res.data);
            }
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchData();
    
        return () => {
          isMounted = false; // Cleanup function to set isMounted to false
        };
      }, [id]);
    
  return (
    <div>
    {data ? (
      <Editor Data={data} />
    ) : (
      <div>Loading...</div>
    )}
  </div>
  )
}

export default WorkSpace