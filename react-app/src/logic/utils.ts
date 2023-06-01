import jwt_decode from 'jwt-decode';
export const getUserIDFromJWT = (jwt: string): string => {
    const decodedJWT: any = jwt_decode(jwt);
    return decodedJWT['_id'];
  };