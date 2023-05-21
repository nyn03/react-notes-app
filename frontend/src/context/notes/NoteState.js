import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {

  const host = 'http://localhost:5011';
  const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzOTZmZTE1YWYxYjcwOWYwYzdkYmYwIn0sImlhdCI6MTY4MjM5NDA3N30.bp7ZMnRHgcd4Ot43hu1OPQ8naYzw87McpIM31qgdA8Q';
  const notesInitial = [];

  const getAllNotes = async () => {
    const url = `${host}/api/notes/fetchallnotes`

    const response = await fetch(
      url,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': authToken
        },
      }
    )

    const json = await response.json();
    setNotes(json)
  };

  const [notes, setNotes] = useState(notesInitial);

  const addNote = async (data) => {
    const url = `${host}/api/notes/create`

    const response = await fetch(
      url,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': authToken
        },
        body: JSON.stringify(data)
      }
    )

    getAllNotes();
  }

  const editNote = async (id, title, description, tag) => {

    const data = {
      title,
      description,
      tag
    }

    const url = `${host}/api/notes/update/${id}`

    const response = await fetch(
      url,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': authToken
        },
        body: JSON.stringify(data)
      }
    )

    let newNotes = JSON.parse(JSON.stringify(notes))

    // update notes for client
    newNotes.forEach((note, index) => {
      if (note._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        return;
      }
    });

    setNotes(newNotes);
  }

  const deleteNote = async (id) => {

    const url = `${host}/api/notes/delete/${id}`

    const response = await fetch(
      url,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': authToken
        }
      }
    )

    getAllNotes();
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getAllNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;