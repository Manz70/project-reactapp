import { useState } from 'react'
import { API_URL } from './config'
import { useHistory } from 'react-router';
import {REQ_HEADER_CREDENTIALS} from './config';


export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const history = useHistory()              //this hook returns the history object.

    function submit() {
        setError(false)
        fetch(API_URL + '/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: REQ_HEADER_CREDENTIALS,
            body: JSON.stringify({
                email,
                password
            })
        }).then(response => {
            if (response.status === 401) {  //401:unauthorized means not logged in , 403:forbidden () means unauthorized
                setError(true)
            }
            if (response.status === 200){     //200:succes , 500:server issue.
                history.push('/')
            }
        }).catch(err => {
            console.log('err')
        })
    }
    return (
        <div style={{padding: '50px'}}>
           {error && <p style={{color: 'red'}}>Incorrect credentials</p>}
            <form>
            <label>
                Email <br />
                <input type="email" value={email} onChange={(event) => { setEmail(event.target.value) }} />
            </label>

            <br />
            
            <label>
                Password <br />
                <input type="password" value={password} onChange={(event) => { setPassword(event.target.value) }} />
            </label>

            <br />

            <button type="button" onClick={submit}>Submit</button>
        </form>
        </div>
    )
}