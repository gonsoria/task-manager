import React from 'react'
import { useSelector } from 'react-redux';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';

function Home() {

    const isAuthenticated = useSelector(state => state.isAuthenticated)

    return (
        <div>
            {
                isAuthenticated ? <Profile /> : <Login />
            }
        </div>
    )
}

export default Home