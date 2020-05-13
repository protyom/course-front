import {push} from "connected-react-router";



export const getToken = () => {
    return async function(dispatch) {
        const token = localStorage.getItem('api_token');
        console.log(token);
        if (!token) {
            dispatch(push('/login'));
        }

    }
};


export const mapDispatchToProps = dispatch => ({
    checkLogin: () => dispatch(getToken()),
});

export const modExp = function (a, b, n) {
    a = a % n;
    var result = 1n;
    var x = a;
    while (b > 0) {
        var leastSignificantBit = b % 2n;
        b = b / 2n;
        if (leastSignificantBit == 1n) {
            result = result * x;
            result = result % n;
        }
        x = x * x;
        x = x % n;
    }
    return result;
};