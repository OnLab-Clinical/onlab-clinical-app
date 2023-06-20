// react
import { memo, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const Root = memo(() => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    useEffect(() => {
        if (pathname === '/') navigate('/auth/sign-in', { replace: true });
    }, [navigate, pathname]);

    return <Outlet />;
});

export default Root;
