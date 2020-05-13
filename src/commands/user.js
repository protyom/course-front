import axios from "axios";
import { push } from 'connected-react-router';


export const getUser = (email, password) => {
    return async function(dispatch) {
        try {
            const user = {
                username: email,
                password: password,
                client_id: "tgA2ww6Vtt6ztqpqoyMtijZGbNuoupwVD7lYmPiC",
                client_secret: "Do4fshsPrd7Iqe4IjAoL8raZppxmW733R5scrHZtlBxxkQLdRU50nUnWcPCaksBNfRU8AqkeoZFOPI6ocabZWKYPWkthGFNzKWVpHIyxGMfVnHt9nITNK68GDVZOV5bR",
                grant_type: "password"
            };
            const {data} = await axios.post('http://localhost/api/token/', user);
            console.log(dispatch);
            console.log(data);
            localStorage.setItem('api_token', data.access_token);
            dispatch(push('/'))
        } catch (error) {
            console.log(error);
        }
    }
};

export const mapStateToProps = state => ({
    token: state.token,
    error: state.error,
});

export const mapDispatchToProps = dispatch => ({
    setUser: (email, password) => dispatch(getUser(email, password)),
});