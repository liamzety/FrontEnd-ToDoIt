import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { signup } from '../store/actions/userActions';

export function UserSign({ history }) {
    const dispatch = useDispatch();
    const [userToAdd, setUserToAdd] = useState(null)

    function onAddTempInp(ev) {
        setUserToAdd({
            ...userToAdd,
            [ev.target.name]: ev.target.value
        })
    }
    async function onSignup(userToAdd) {
        if (!userToAdd) return
        try {
            await dispatch(signup(userToAdd))
            history.push("/notes")
        } catch (error) {
            console.log('Err:', error)
        }
    }
    return (
        <div className="user-sign flex justify-center align-center">
            <div className="col-left">
            </div>
            <div className="col-right">
                <form className="log-sign-form flex col wrap justify-center"
                    onSubmit={ev => {
                        ev.preventDefault()
                        onSignup(userToAdd)

                    }}>
                    <div className="form-container">
                        <input onChange={onAddTempInp} name="username" type="text" placeholder="username" />
                        <input onChange={onAddTempInp} name="password" type="text" placeholder="password" />

                        <div className="flex align-center wrap-rev space-between">
                            <div>
                                <p>Already have an account?</p>
                                <NavLink to='/'>Log in here </NavLink>
                            </div>
                            <button>Sign me up!</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
