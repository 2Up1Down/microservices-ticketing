import getCurrentUser from "../lib/auth";
import BaseLayout from "../components/common/base-layout";

const LandingPage = ({ currentUser }) => {
  console.log("current user: ", currentUser);

  return (
    <BaseLayout>
      <h1>Landing Page</h1>
      {currentUser ? "You are signed in" : "You are NOT signed in"}
      <p>some ftext</p>
    </BaseLayout>
  );
};

export async function getServerSideProps({ req }) {
  const currentUser = await getCurrentUser(req.headers);

  return {
    props: currentUser,
  };
}

export default LandingPage;
