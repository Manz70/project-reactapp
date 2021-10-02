import './App.css';
import { Link, Route, Switch, useLocation, Redirect } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import React, { useState, useEffect } from 'react';
import { API_URL, REQ_HEADER_CREDENTIALS } from './config';
import Logout from './Logout';

const UserContext = React.createContext();

function App() {
    const [user, setUser] = useState(null)
    const { pathname } = useLocation()

    async function getProfile() {
        const response = await fetch(API_URL + '/profile', {
            credentials: REQ_HEADER_CREDENTIALS
        })

        if (response.status === 401) {
            setUser(null)
        }

        if (response.status === 200) {
            const data = await response.json()
            console.log(data)
            setUser(data)
        }
    }

    useEffect(() => {
        getProfile()
    }, [pathname])
    return (
        <UserContext.Provider value={user}>
            <div>
                <ul>
                    <li>
                        <Link to="/">home</Link>
                    </li>
                    {user ? (<li>
                        <Link to="/logout">Logout</Link>
                    </li>) : (
                        <>
                            <li>
                                <Link to="login">Login</Link>
                            </li>
                            <li>
                                <Link to="register">Register</Link>
                            </li>
                        </>
                    )}
                </ul>
                {user &&
                    <p>{user.name}</p>
                }
            </div>
            <Switch>
                <Route exact path="/">
                    this is home
                </Route>
                <Route path="/login">
                    {user ? <Redirect to="/" /> : <Login /> }
                </Route>
                <Route path="/register">
                    {user ? <Redirect to="/" /> : <Register /> }
                </Route>
                <Route>
                    <Logout />
                </Route>
                <Route path="/profile">
                    profile component
                </Route>
            </Switch>
        </UserContext.Provider>
    );
}

export default App;
