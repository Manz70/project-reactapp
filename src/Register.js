import { useState } from "react";
import { REQ_HEADER_CREDENTIALS, API_URL } from "./config";
import { useHistory } from "react-router";



export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmation, setConfirm] = useState("");
    const [errors, setErrors] = useState([]); //errors here as array according to the back-end
    const history = useHistory()

    function submit() {
        setErrors([])
        fetch(API_URL + '/register', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: REQ_HEADER_CREDENTIALS,
            body: JSON.stringify({
                name,
                email,
                password,
                confirmation
            })
        }).then(async (response) => {
            if (response.status === 400) {  // 400: validation error
                const result = await response.json()
                setErrors(result.errors)
            }
            if (response.status === 200) {     //200:succes , 500:server issue.
                history.push('/login')
            }
        }).catch(err => {
            console.log('err')
        })
    }

    return (
        <div>
            <ul>
                {errors.map((error, i) => <li key={i}>{error.msg}</li>)}
            </ul>
            <form>
                <label>
                    Name <br />
                    <input type="text" value={name} onChange={(event) => { setName(event.target.value) }} />
                </label>

                <br />

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
                <label>
                    Confirma Password <br />
                    <input type="password" value={confirmation} onChange={(event) => { setConfirm(event.target.value) }} />
                </label>

                <button type="button" onClick={submit}>Submit</button>
            </form>
        </div>
    )
}