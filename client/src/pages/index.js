import axios from 'axios';

const LandingPage = ({currentUser}) => {
    console.log('current user: ', currentUser);

    return <h1>hello world</h1>;
};

export async function getServerSideProps({req}) {


    let res = {};
    try {
        res = await axios.get(
            'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
            {
                withCredentials: true,
                headers: req.headers,
            }
        );

    } catch (error) {
        return {
            props: {currentUser: 'null'},
        };
    }

    return {
        props: res.data,
    };
}

export default LandingPage;


