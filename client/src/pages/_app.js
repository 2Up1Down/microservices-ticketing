import "bootstrap/dist/css/bootstrap.css";

// AuthContextProvider might be implemented at a later stage
// import { AuthContextProvider } from "../stores/authContext";

export default ({ Component, pageProps }) => {
  return (
    // <AuthContextProvider>
    <Component {...pageProps} />
    // </AuthContextProvider>
  );
};
