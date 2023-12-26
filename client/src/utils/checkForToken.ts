import LocalStorage from '@/api/localStorage';

const checkForToken = () => {
  const storageData = LocalStorage.getItem('user-key');

  const accessToken =
    typeof window !== 'undefined' ? storageData.state.accessToken : null;
  const refreshToken =
    typeof window !== 'undefined' ? storageData.state.refreshToken : null;

  const parseJWT = (token: string | null) => {
    if (token) return JSON.parse(atob(token.split('.')[1]));
  };

  const authVerify = () => {
    const decodedAccess = parseJWT(accessToken);
    const decodedRefresh = parseJWT(refreshToken);

    if (decodedRefresh?.exp * 1000 < Date.now()) {
      return 'Refresh Token Expired';
    }

    if (decodedAccess?.exp * 1000 < Date.now()) {
      return 'Access Token Expired';
    }

    return true;
  };

  return { authVerify, storageData };
};

export default checkForToken;
