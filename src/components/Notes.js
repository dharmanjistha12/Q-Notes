import React, { useContext, useEffect, useRef, useState} from 'react'
import noteContext from '../context/notes/noteContext'
import {useNavigate} from 'react-router-dom'
import Addnotes from './Addnotes';
import NoteItem from './NoteItem'
const Notes = (props) => {
	let navigate=useNavigate();
	const context = useContext(noteContext);
	const { notes, getNotes, editNote} = context;
	const [note, setNotes] = useState({id:"", etitle: "", edescription: "", etag: "" })

	const ref = useRef(null)
	const closeref=useRef(null);
	const handleOnchange = (e) => {
		setNotes({ ...note, [e.target.name]: e.target.value })
	}
	const handleClk=()=>{
		editNote(note.id,note.etitle,note.edescription,note.etag);
		closeref.current.click();
		props.alertFunc('Updated successfully','success')
	}
	useEffect(() => {
		if (localStorage.getItem('token')!==null) {
			getNotes()
		}
		else{
			navigate('/login')

		}
		// eslint-disable-next-line
	}, [])
	const updateNote = (currentnote) => {
		ref.current.click();
		setNotes({id: currentnote._id,etitle:currentnote.title,edescription:currentnote.description,etag:currentnote.etag});
	}
	return (
		<>
			<Addnotes alertFunc={props.alertFunc}/>
			<button ref={ref} type="button" className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" >
				Launch demo modal
			</button>
			<div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel">Edit note</h5>

						</div>
						<div className="modal-body">
							<form>
								<div className="row mb-3">
									<label className="col-sm-2 col-form-label" >Title</label>
									<div className="col-sm-10">
										<input type="text" value={note.etitle}  minLength={5}  className="form-control" id="etitle" name='etitle' onChange={handleOnchange} required/>
									</div>
								</div>
								<div className="row mb-3">
									<label className="col-sm-2 col-form-label">Description</label>
									<div className="col-sm-10">
										<input type="text" value={note.edescription}className="form-control" name='edescription' minLength={5} id="edescription" onChange={handleOnchange} required/>
									</div>
								</div>
								<div className="row mb-3">
									<label className="col-sm-2 col-form-label">Tag</label>
									<div className="col-sm-10">
										<input type="text" value={note.etag}className="form-control" name='etag' id="etag" minLength={3} onChange={handleOnchange} required/>
									</div>
								</div>
								<div className="row mb-3">
								</div>
								
							</form>
						</div>
						<div className="modal-footer">
							<button ref={closeref} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
							<button type="button" className="btn btn-danger" onClick={handleClk}>Save changes</button>
						</div>
					</div>
				</div>
			</div>
			<div className="row my-3">
				<h3>Your notes</h3>
				<div className="container">
					{notes.length===0 && 'No notes to display'}
				</div>
				{notes.map((note) => {
					return <NoteItem key={note._id} alertFunc={props.alertFunc} updateNote={updateNote} note={note} />
				})}
			</div>
		</>

	)
}

export default Notes
