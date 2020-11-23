import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { UserSign } from '../views/UserSign'

export function UserLog({ onLogin }) {
    const [userDetails, setUserDetails] = useState(null)

    function onLogUserInp(ev) {
        setUserDetails({
            ...userDetails,
            [ev.target.name]: ev.target.value
        })
    }
    return (
        <form className="user-login"
            onSubmit={ev => {
                ev.preventDefault()
                onLogin(userDetails)

            }}>
            <input onChange={onLogUserInp} name="username" type="text" placeholder="username" />
            <input onChange={onLogUserInp} name="password" type="text" placeholder="password" />
            <button>Login</button>
            <p>Dont have an account? <NavLink to='/sign'>Sign in here </NavLink></p>
        </form>
    )
}
