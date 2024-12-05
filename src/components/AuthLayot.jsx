import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { LoginPopUp } from '../components';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const AuthLayout = ({ children, authentication = true }) => {
    const navigate = useNavigate();
    const authStatus = useSelector((state) => state.auth.status);

    useEffect(() => {
        if (!authentication && authStatus !== authentication) {
            return;
        }
    }, [authStatus, authentication, navigate]);

    if (authentication && authStatus !== authentication) {
        return <LoginPopUp />;
    }

    return children;
};

AuthLayout.propTypes = {
    children: PropTypes.node.isRequired,
    authentication: PropTypes.bool
};

export default AuthLayout;
