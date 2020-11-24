import React from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { UserLog } from '../cmps/UserLog'
import { login } from '../store/actions/userActions';

export function UserLogin({ history }) {
  const dispatch = useDispatch();
  useEffect(() => {
    if (sessionStorage.user) history.push("/notes")
  }, [])

  //User

  async function onLogin(userToLog) {
    if (!userToLog) return
    try {
      await dispatch(login(userToLog))
      history.push("/notes")
    } catch (error) {
      console.log('Err:', error)
    }
  }

  return (
    <section className="user-login flex justify-center align-center">
      <div className="col-left flex justify-center align-center">
        <UserLog onLogin={onLogin} />

      </div>
      <div className="col-right flex justify-center align-center relative">
        <div className="col-right-wrapper absolute"></div>
      </div>
    </section>
  )
}
