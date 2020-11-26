import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserLog } from '../cmps/UserLog'
import { login } from '../store/actions/userActions';
import loader from '../assets/img/loader.gif';

export function UserLogin({ history }) {
  const dispatch = useDispatch();
  const [isLoadingModal, setIsLoadingModal] = useState(false)
  const { msg } = useSelector(state => state.msgReducer)

  useEffect(() => {
    if (sessionStorage.user) history.push("/notes")
  }, [])

  async function onLogin(userToLog) {
    setIsLoadingModal(true)
    if (!userToLog) return
    try {
      await dispatch(login(userToLog))
      history.push("/notes")
    } catch (error) {
      setIsLoadingModal(false)
      console.log('Err:', error)
    }
  }

  return (
    <section className="user-login flex justify-center align-center">
      <div className="col-left flex justify-center align-center">
        <UserLog isLoadingModal={isLoadingModal} onLogin={onLogin} />

      </div>
      <div className="col-right flex justify-center align-center relative">
        {
          isLoadingModal &&
          <div className="loading-modal flex align-center justify-center fixed">
            <img src={loader} alt="" />
          </div>
        }
        <div className="col-right-wrapper absolute"></div>
      </div>
      {msg && <div className="msg-modal"></div>}
    </section>
  )
}
