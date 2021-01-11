import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import logoMain from '../assets/img/logo-main-light.png'

export function UserSignForm({ onSignup, isLoadingModal }) {
    const [userToAdd, setUserToAdd] = useState(null)

    function onAddTempInp(ev) {
        setUserToAdd({
            ...userToAdd,
            [ev.target.name]: ev.target.value
        })
    }

    return (
        <form className="log-sign-form flex col wrap justify-center"
            onSubmit={ev => {
                ev.preventDefault()
                onSignup(userToAdd)

            }}>
            <img src={logoMain} alt="logo" />
            <h1>Document your ideas</h1>
            <h1>into one place!</h1>

            <div className="form-container">
                <input onChange={onAddTempInp} name="username" type="text" placeholder="username" required />
                <input onChange={onAddTempInp} name="password" type="password" placeholder="password" required />

                <div className="flex align-center wrap-rev space-between">
                    <div>
                        <p>Already have an account?</p>
                        <NavLink to='/'>Log in here </NavLink>
                    </div>
                    <button className={`btn btn-prime ${isLoadingModal ? 'btn-disabled' : ''}`} >Sign me up!</button>
                </div>
            </div>
        </form>
    )
}
