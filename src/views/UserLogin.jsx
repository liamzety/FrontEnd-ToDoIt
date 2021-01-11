import React, { useCallback, useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserLoginForm } from '../cmps/UserLoginForm'
import { login, loadUser } from '../store/actions/userActions';
import { MsgModal } from '../cmps/MsgModal';
import { Loader } from '../cmps/Loader';

export function UserLogin({ history }) {
  const dispatch = useDispatch();
  const [isLoadingModal, setIsLoadingModal] = useState(false)
  const { msg } = useSelector(state => state.msgReducer)

  const onLogin = useCallback(
    async (userToLog) => {
      setIsLoadingModal(true)
      if (!userToLog) return

      try {
        await dispatch(login(userToLog))
        history.push("/notes")

      } catch (error) {
        setIsLoadingModal(false)
        console.log('Err:', error)
      }
    },
    [dispatch, history])

  const handleUserReturn = useCallback(
    async () => {
      await dispatch(loadUser(_getCookie('userId')))
      history.push("/notes")
    },
    [dispatch, history],
  )

  useEffect(() => {
    if (_getCookie('userId')) {
      setIsLoadingModal(true)
      handleUserReturn()
    }
  }, [handleUserReturn])


  function _getCookie(cname) {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  return (
    <section className="user-login flex justify-center align-center">
      <div className="col-left flex justify-center align-center">
        <UserLoginForm isLoadingModal={isLoadingModal} onLogin={onLogin} />
      </div>
      <div className="col-right flex justify-center align-center relative">
        {isLoadingModal && <Loader />}
        <div className="col-right-wrapper absolute"></div>
      </div>
      <MsgModal msg={msg} />
    </section>
  )
}
