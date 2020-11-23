import React, { useEffect } from 'react';
import { NotesList } from '../cmps/NotesList';
import { useDispatch, useSelector } from 'react-redux'
import { addNote, updateNote, removeNote } from "../store/actions/noteActions";
import { loadUser, logout } from '../store/actions/userActions';


export function Notes({ history }) {
  const dispatch = useDispatch();
  const { loggedUser } = useSelector((state) => state.userReducer);

  useEffect(() => {
    if (!loggedUser) history.push("/")
    else dispatch(loadUser(loggedUser._id))
  }, [])

  function onAddNote() {
    dispatch(addNote(loggedUser))
  }
  function onRemoveNote(noteId) {
    dispatch(removeNote(noteId, loggedUser))
  }

  function onUpdateNote(note) {
    dispatch(updateNote(note, loggedUser))
  }

  async function onLogOut() {
    await dispatch(logout())
    history.push("/")
  }

  if (!loggedUser) {
    return <h1>Loading...</h1>
  }
  return (
    <section className="note-app">
      <h1 data-title="note">Welcome, {loggedUser.username}</h1>
      <button onClick={onAddNote}>add</button>
      <button onClick={onLogOut}>LOGOUT</button>
      <NotesList
        notes={loggedUser.notes}
        onUpdateNote={onUpdateNote}
        onRemoveNote={onRemoveNote} />
    </section>
  );
}



