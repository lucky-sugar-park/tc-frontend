import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Login from '../components/views/auth/Login';
import Register from '../components/views/auth/Register';

const AuthenticatedRoot = (props) => {

    React.useEffect(()=>{

    }, [])

    return (
        <div style={{ height: "100%", width: "100%" }}>
            <Routes>
                <Route 
                    key="/"
                    path="/"
                    element={ <Login /> }
                    { ...props }
                />
                <Route 
                    key="/user/login"
                    path="/user/login"
                    element={ <Login /> }
                    { ...props }
                />
                <Route 
                    key="/user/register"
                    path="/user/register"
                    element={ <Register />}
                />
                <Route 
                    key="*"
                    path="*"
                    element={ <Login /> }
                    { ...props }
                />
            </Routes>
        </div>
    )
}

export default AuthenticatedRoot;