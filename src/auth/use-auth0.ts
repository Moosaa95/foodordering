import { useAuth0 } from '@auth0/auth0-react';
import { useCallback } from 'react';

const useAuthToken = () => {
  const { getAccessTokenSilently } = useAuth0();

  const fetchAccessToken = useCallback(async () => {
    try {
      const token = await getAccessTokenSilently();
      return token;
    } catch (error) {
      console.error('Failed to get Auth0 access token', error);
      return undefined;
    }
  }, [getAccessTokenSilently]);

  return { fetchAccessToken };
};

export default useAuthToken;
