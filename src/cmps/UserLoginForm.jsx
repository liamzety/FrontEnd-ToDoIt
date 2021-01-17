import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import logoMain from '../assets/img/logo-main-light.png'

export function UserLoginForm({ onLogin, isLoadingModal }) {
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
                if (isLoadingModal) return
                onLogin(userDetails)

            }}>
            <img src={logoMain} alt="logo" />
            <h1>Document your ideas</h1>
            <h1>into one place!</h1>
            <div className="form-container">
                <input onChange={onLogUserInp} name="username" type="text" placeholder="username" required />
                <input onChange={onLogUserInp} name="password" type="password" placeholder="password" required />
                <div className="flex align-end col">
                    <div className="btn-container flex  col align-center">
                        <button
                            className={`btn btn-prime w100 ${isLoadingModal ? 'btn-disabled' : ''}`}
                        >Login</button>
                        <span>Or</span>
                        <button
                            className={`btn btn-sec w100 ${isLoadingModal ? 'btn-disabled' : ''}`}
                            type="button"
                            onClick={() => {
                                if (isLoadingModal) return
                                onLogin({ username: 'guest', password: 'guest' })
                            }}>Try as a Guest</button>
                    </div>
                    <div className="flex align-end col">
                        <p>Dont have an account?</p>
                        <NavLink to='/sign'>Sign in here </NavLink>
                    </div>

                </div>
            </div>
        </form>
    )
}
