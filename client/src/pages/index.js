import getCurrentUser from "../lib/auth";
import BaseLayout from "../components/common/base-layout";
import getAllTickets from "../lib/tickets";

const LandingPage = ({ currentUser, tickets = [] }) => {
  const ticketList = tickets.map((ticket) => {
    return (
      <tr key={ticket.id}>
        <td>{ticket.title}</td>
        <td>{ticket.price}</td>
      </tr>
    );
  });

  return (
    <BaseLayout user={currentUser}>
      <h1>Landing Page</h1>
      <div>
        {currentUser ? "You are signed in as: " : "You are NOT signed in"}
        {currentUser && currentUser.email}
      </div>
      <div>
        <h1>Tickets</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>{ticketList}</tbody>
        </table>
      </div>
    </BaseLayout>
  );
};

export async function getServerSideProps({ req }) {
  const currentUser = await getCurrentUser(req.headers);
  const tickets = await getAllTickets(req.headers);

  return {
    props: { currentUser, tickets },
  };
}

export default LandingPage;
