import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../store/actions/userActions';
import loader from '../assets/img/loader.gif';
import { ImWarning } from 'react-icons/im';
import { UserSignForm } from '../cmps/UserSignForm';
import { Loader } from '../cmps/Loader';

export function UserSign({ history }) {
    const [isLoadingModal, setIsLoadingModal] = useState(false)
    const { msg } = useSelector(state => state.msgReducer)

    const dispatch = useDispatch();

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
            <div className="flex align-center justify-center col-left relative">
                {isLoadingModal && <Loader />}
            </div>
            <div className="col-right">
                <UserSignForm onSignup={onSignup} isLoadingModal={isLoadingModal} />
            </div>
            <div className={`${msg ? 'show-msg' : 'hide-msg'} msg-modal`}>
                <div className="icon-container flex align-center justify-center">
                    <ImWarning />
                </div>
                <div className="msg-container flex align-center justify-center">
                    <p>{msg}</p>
                </div>
            </div>

        </div>
    )
}
