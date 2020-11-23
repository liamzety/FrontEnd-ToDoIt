import React from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { UserLog } from '../cmps/UserLog'
import { login } from '../store/actions/userActions';

export function Home({ history }) {
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
    <section className="home">
      <UserLog onLogin={onLogin} />
    </section>
  )
}
