import React, { useContext, useState } from "react";
import noteContext from "../context/notes/NoteContext";

export const AddNote = () => {

    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addNote(note)
        setNote({ title: "", description: "", tag: "" })
    }

    return (
        <>
            <h3>Add a note</h3>

            <form>
                <div className="form-group  my-3">
                    <label htmlFor="title">Title</label>
                    <input type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        placeholder="Enter email"
                        value={note.title}
                        onChange={onChange} />
                </div>
                <div className="form-group  my-3" >
                    <label htmlFor="description">Desciption</label>
                    <input type="text"
                        className="form-control"
                        id="description"
                        name="description"
                        placeholder="Description"
                        value={note.description}
                        onChange={onChange} />
                </div>
                <div className="form-group  my-3" >
                    <label htmlFor="tag">Tag</label>
                    <input type="text"
                        className="form-control"
                        id="tag"
                        name="tag"
                        placeholder="Tag"
                        value={note.tag}
                        onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary my-3" onClick={handleSubmit} >Submit</button>
            </form>
        </>
    )
}