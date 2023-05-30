import React from 'react';
import Cookies from 'universal-cookie';

const LogoutButton = () => {
  const handleLogout = () => {
    const cookies = new Cookies();
    cookies.remove('jwt'); // Remove the "jwt" cookie
    // You might also want to make an API request to your backend to invalidate the JWT token on the server-side

    // Perform any other necessary logout logic, such as redirecting the user to the login page
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;