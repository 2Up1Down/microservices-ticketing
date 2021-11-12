import { useContext } from "react";
import AuthContext from "../stores/authContext";

const useAuth = () => useContext(AuthContext);

export default useAuth;
