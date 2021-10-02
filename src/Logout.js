import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { API_URL, REQ_HEADER_CREDENTIALS } from './config'

export default function Logout() {
    const history = useHistory()
    async function logout() {
        const responose = await fetch(API_URL + '/logout', {
            method: 'post',
            credentials: REQ_HEADER_CREDENTIALS
        })

        if (responose.status === 200) {
            history.push('/')
        }
    }
    useEffect(() => {
        logout()
    }, [])
    return <div />
}