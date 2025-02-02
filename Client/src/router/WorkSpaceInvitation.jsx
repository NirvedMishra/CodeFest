import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const WorkSpaceInvitation = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');
  const workspaceId = queryParams.get('workspaceId');
  const [invitationConfirmed, setInvitationConfirmed] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const confirmInvitation = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/workspace/addInvitation`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({ token, workspaceId }),
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
        setInvitationConfirmed(true);
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    };

    if (token && workspaceId) {
      confirmInvitation();
    }
  }, [token, workspaceId]);

  if (invitationConfirmed) {
    return <Navigate to={`/workspace/${workspaceId}`} />;
  }

  if (error) {
    console.log(error);
    return <div>Error: {error}</div>;
  }

  return <div>Confirming invitation...</div>;
};

export default WorkSpaceInvitation;