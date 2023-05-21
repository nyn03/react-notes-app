import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/NoteContext";
import { AddNote } from "./AddNote";
import { NoteItem } from "./NoteItem";

export const Notes = () => {

    const context = useContext(noteContext);
    const { notes, getAllNotes, editNote } = context;

    useEffect(() => {
        getAllNotes()
    }, [])

    const editNoteRef = useRef(null);
    const closeModalRef = useRef(null);

    const updateNote = (currentNote) => {
        editNoteRef.current.click();
        setNote({id: currentNote._id,  etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
    }

    const [enote, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });

    const onChange = (e) => {
        setNote({ ...enote, [e.target.name]: e.target.value })
    }

    const handleUpdate = () => {
        editNote(enote.id, enote.etitle, enote.edescription, enote.etag);
        console.log('Updated note')
        closeModalRef.current.click();
    }

    return (
        <div className="row my-3">
            <AddNote />

            <button type="button" className="btn btn-primary d-none"
                data-bs-toggle="modal"
                data-bs-target="#editNoteModal"
                ref={editNoteRef}
            >
                Edit notes
            </button>

            <div className="modal fade" id="editNoteModal" tabIndex="-1" aria-labelledby="editNoteModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="editNoteModalLabel">Edit notes</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group  my-3">
                                    <label htmlFor="etitle">Title</label>
                                    <input type="text"
                                        className="form-control"
                                        id="etitle"
                                        name="etitle"
                                        placeholder="Enter email"
                                        value={enote.etitle}
                                        onChange={onChange} />
                                </div>
                                <div className="form-group  my-3" >
                                    <label htmlFor="edescription">Desciption</label>
                                    <input type="text"
                                        className="form-control"
                                        id="edescription"
                                        name="edescription"
                                        placeholder="Description"
                                        value={enote.edescription}
                                        onChange={onChange} />
                                </div>
                                <div className="form-group  my-3" >
                                    <label htmlFor="etag">Tag</label>
                                    <input type="text"
                                        className="form-control"
                                        id="etag"
                                        name="etag"
                                        placeholder="Tag"
                                        value={enote.etag}

                                        onChange={onChange} />
                                </div>
                                {/* <button type="submit" className="btn btn-primary my-3" onClick={handleSubmit} >Submit</button> */}
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" 
                            data-bs-dismiss="modal"
                            ref={closeModalRef}
                            >Close</button>
                            <button type="button" className="btn btn-primary"
                                onClick={handleUpdate}
                            >Update</button>
                        </div>
                    </div>
                </div>
            </div>

            <h3>Your notes</h3>
            {
                notes.map((note) => {
                    return <NoteItem note={note} key={note._id}
                        updateNote={updateNote}
                    ></NoteItem>
                })
            }
        </div>
    )
}