// react
import { memo, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
// store
import { useAppSelector } from '@/contexts/core/store';
import { authState } from '../../reducers';

const AuthLayout = memo(() => {
    const { isAuthenticated } = useAppSelector(authState);

    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) return;

        navigate('/dashboard', { replace: true });
    }, [isAuthenticated, navigate]);

    if (isAuthenticated) return <></>;

    return <Outlet />;
});

export default AuthLayout;
