// cookieHandler.js (assuming this is your utility file)
import cookie from 'cookie';

export const getCookie = (req, name) => {
  const cookies = cookie.parse(req ? req.headers.cookie || "" : document.cookie);
  return cookies[name] || null;
};
