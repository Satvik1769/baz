// checks whether the user is authenticated (Middleware)

export const isAuthenticated = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return false; // No token found
  }

  try {
    const { exp } = JSON.parse(atob(token.split(".")[1])); // Decode token
    if (exp * 1000 < Date.now()) {
      return false; // Token has expired
    }
    return true; // Token is valid
  } catch (e) {
    return false; // Token is malformed
  }
};
