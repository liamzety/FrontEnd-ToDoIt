import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

export function UserLog({ onLogin, isLoadingModal }) {
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
                <input onChange={onLogUserInp} name="username" type="text" placeholder="username" required />
                <input onChange={onLogUserInp} name="password" type="text" placeholder="password" required />
                <div className="flex align-end col">
                    <button style={{
                        cursor: isLoadingModal ? 'no-drop' : 'pointer',
                        backgroundColor: isLoadingModal ? '#393e46' : ''
                    }}
                    >{isLoadingModal ? 'Loading...' : 'Login'}</button>
                    <div className="flex align-end col">
                        <p>Dont have an account?</p>
                        <NavLink to='/sign'>Sign in here </NavLink>
                    </div>
                </div>
            </div>
        </form>
    )
}
