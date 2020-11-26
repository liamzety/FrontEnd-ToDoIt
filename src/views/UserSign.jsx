import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { signup } from '../store/actions/userActions';
import loader from '../assets/img/loader.gif';

export function UserSign({ history }) {
    const [isLoadingModal, setIsLoadingModal] = useState(false)
    const { msg } = useSelector(state => state.msgReducer)

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
        setIsLoadingModal(true)
        try {
            await dispatch(signup(userToAdd))
            history.push("/notes")

        } catch (error) {
            console.log('Err:', error)
            setIsLoadingModal(false)
        }

    }
    return (
        <div className="user-sign flex justify-center align-center">
            <div className="col-left relative">
                {
                    isLoadingModal &&
                    <div className="loading-modal flex align-center justify-center absolute">
                        <img src={loader} alt="" />
                    </div>
                }
            </div>
            <div className="col-right">
                <form className="log-sign-form flex col wrap justify-center"
                    onSubmit={ev => {
                        ev.preventDefault()
                        onSignup(userToAdd)

                    }}>
                    <div className="form-container">
                        <input onChange={onAddTempInp} name="username" type="text" placeholder="username" required />
                        <input onChange={onAddTempInp} name="password" type="text" placeholder="password" required />

                        <div className="flex align-center wrap-rev space-between">
                            <div>
                                <p>Already have an account?</p>
                                <NavLink to='/'>Log in here </NavLink>
                            </div>
                            <button style={{
                                cursor: isLoadingModal ? 'no-drop' : 'pointer',
                                backgroundColor: isLoadingModal ? '#393e46' : ''
                            }}>Sign me up!</button>
                        </div>
                    </div>
                </form>
            </div>
            {msg && <div className="msg-modal"></div>}

        </div>
    )
}
