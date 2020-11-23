import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
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
        <form className="user-add"
            onSubmit={ev => {
                ev.preventDefault()
                onSignup(userToAdd)

            }}>
            <input onChange={onAddTempInp} name="username" type="text" placeholder="username" />
            <input onChange={onAddTempInp} name="password" type="text" placeholder="password" />
            <button>Sign up</button>
        </form>
    )
}
