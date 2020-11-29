import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import logoMain from '../assets/img/logo-main-light.png'

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
            <img src={logoMain} alt="logo" />
            <h1>Document your ideas</h1>
            <h1>and store all the concepts your earn each day</h1>
            <h1>into one place!</h1>
            <div className="form-container">
                <input onChange={onLogUserInp} name="username" type="text" placeholder="username" required />
                <input onChange={onLogUserInp} name="password" type="password" placeholder="password" required />
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
