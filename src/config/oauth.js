// OAuth Configuration
export const OAUTH_CONFIG = {
  GOOGLE: {
    CLIENT_ID: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    SCOPES: 'email profile'
  },
  FACEBOOK: {
    APP_ID: process.env.REACT_APP_FACEBOOK_APP_ID,
    SCOPES: 'email,public_profile'
  }
};
