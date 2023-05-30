import Cookies from 'universal-cookie';

const AuthCheck = () => {
  const cookies = new Cookies();
  const isLoggedIn = !!cookies.get('jwt'); // Check if the "jwt" cookie is present

  return isLoggedIn;
};

export default AuthCheck;