// react
import { memo, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const Root = memo(() => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/auth/sign-in', { replace: true });
    }, [navigate]);

    return <Outlet />;
});

export default Root;
