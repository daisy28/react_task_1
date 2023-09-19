import React, { useReducer } from "react";
import MkdSDK from "./utils/MkdSDK";

export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  role: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      //TODO
      const {user, token, role} = action.payload || {};
      return {
        ...state,
        isAuthenticated: true,
        user: user || null,
        token: token || null,
        role: role || null,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

let sdk = new MkdSDK();

export const tokenExpireError = (dispatch, errorMessage) => {
  const role = localStorage.getItem("role");
  if (errorMessage === "TOKEN_EXPIRED") {
    dispatch({
      type: "Logout",
    });
    window.location.href = "/" + role + "/login";
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  React.useEffect(() => {
    //TODO
    const checkAuth = async () => {
      try {
        const isAuthenticated = await sdk.check();
        if (isAuthenticated) {
          const user = localStorage.getItem("user");
          const token = localStorage.getItem("token");
          const role = localStorage.getItem("role");

          // Check if the token is still valid
          const isTokenValid = await sdk.verifyToken(token);
          if (isTokenValid) {
            dispatch({
              type: "LOGIN",
              payload: { user, token, role },
            });
          } else {
            // Token is invalid, log out the user
            dispatch({ type: "LOGOUT" });
          }
        }
      } catch (error) {
        // Handle authentication check error
        console.error("Authentication check error:", error);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
