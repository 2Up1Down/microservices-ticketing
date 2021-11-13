import { createContext, useContext } from "react";
import axios from "axios";
import useSWR from "swr";

const AuthContext = createContext({
  currentUser: {},
  login: () => {},
  logout: () => {},
  authReady: false,
});

const fetcher = (url) => axios.get(url).then((res) => res.data);

const AuthContextProvider = ({ children }) => {
  const { data, error } = useSWR("/api/users/currentuser", fetcher);

  const context = {
    isLoading: !error && !data,
    isError: error,
    ...data,
  };
  console.log("SWR Log", data);

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export default AuthContext;
export { AuthContextProvider, useAuth };
