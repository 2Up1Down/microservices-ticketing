import getCurrentUser from "../lib/auth";
import BaseLayout from "../components/common/base-layout";

const LandingPage = ({ currentUser }) => {
  console.log("current user: ", currentUser);

  return (
    <BaseLayout user={currentUser}>
      <h1>Landing Page</h1>
      {currentUser ? "You are signed in as: " : "You are NOT signed in"}
      {currentUser && currentUser.email}
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
