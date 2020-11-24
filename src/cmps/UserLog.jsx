import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

export function UserLog({ onLogin }) {
    const [userDetails, setUserDetails] = useState(null)

    function onLogUserInp(ev) {
        setUserDetails({
            ...userDetails,
            [ev.target.name]: ev.target.value
        })
    }
    return (
        <form className='log-sign-form flex col wrap justify-center'
            onSubmit={ev => {
                ev.preventDefault()
                onLogin(userDetails)

            }}>
            <div className="form-container">
                <input onChange={onLogUserInp} name="username" type="text" placeholder="username" />
                <input onChange={onLogUserInp} name="password" type="text" placeholder="password" />
                <div className="flex align-center col">
                    <button >Login</button>
                    <div className="flex col text-center">
                        <p>Dont have an account?</p>
                        <NavLink to='/sign'>Sign in here </NavLink>
                    </div>
                </div>
            </div>
        </form>
    )
}
