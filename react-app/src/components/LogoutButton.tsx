import Cookies from 'universal-cookie';
import './NavbarStaylse.css';
const LogoutButton = () => {
  const handleLogout = () => {
    const cookies = new Cookies();
    cookies.remove('jwt'); // Remove the "jwt" cookie
    // You might also want to make an API request to your backend to invalidate the JWT token on the server-side //IMPORTANTTTTTTTTT TODOOOOOOOOOOOOOOOOOOOOOOOOOO
    
    // Perform any other necessary logout logic, such as redirecting the user to the login page

    window.location.reload(); // Refresh the page
  };

  return <button className='signup-btn' onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
