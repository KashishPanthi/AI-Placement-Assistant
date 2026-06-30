export const saveToken = (token, email, name) => {
  localStorage.setItem('token', token);
  localStorage.setItem('email', email);
  localStorage.setItem('name', name);
};

export const getToken = () => localStorage.getItem('token');
export const getName = () => localStorage.getItem('name');
export const getEmail = () => localStorage.getItem('email');

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('email');
  localStorage.removeItem('name');
};

export const isLoggedIn = () => !!localStorage.getItem('token');