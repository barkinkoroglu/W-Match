import { useEffect, useState, useRef } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import firebaseAuth from '../helpers/auth/firebaseAuth';

const useAuthStatus = () => {
    const [status, setStatus] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);
    const mounted = useRef(true);
    const { auth } = firebaseAuth();
    useEffect(() => {
        if (mounted) {
            onAuthStateChanged(auth, (user) => {
                if (user) setLoggedIn(true);
                setStatus(false);
            });
        }
        return () => {
            mounted.current = false;
        };
    }, [mounted]);
    return { status, loggedIn };
};

export default useAuthStatus;