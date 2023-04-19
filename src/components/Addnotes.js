import React, { useContext } from 'react'
import { useState } from 'react'
import noteContext from '../context/notes/noteContext'
const Addnotes = (props) => {
	const context = useContext(noteContext);
	const { addNote } = context;
	const [note, setNote] = useState({ title: "", description: "", tag: "" })
	const handleOnchange = (e) => {
		setNote({ ...note, [e.target.name]: e.target.value })
	}
	const handleAdd = (e) => {
		e.preventDefault();
		addNote(note.title, note.description, note.tag);
		props.alertFunc('Note added successfully','success')
		setNote({title:"",description:"",tag:""})
	}
	return (
		<div>
			<div className="container my-3">
				<h3>Add notes</h3>
				<form>
					<div className="row mb-3">
						<label className="col-sm-2 col-form-label">Title</label>
						<div className="col-sm-10">
							<input type="text" value={note.title} className="form-control" id="title" name='title' onChange={handleOnchange} />
						</div>
					</div>
					<div className="row mb-3">
						<label className="col-sm-2 col-form-label">Description</label>
						<div className="col-sm-10">
							<input type="text" value={note.description} className="form-control" name='description' id="description" onChange={handleOnchange} />
						</div>
					</div>
					<div className="row mb-3">
						<label className="col-sm-2 col-form-label">Tag</label>
						<div className="col-sm-10">
							<input type="text" value={note.tag} className="form-control" name='tag' id="tag" onChange={handleOnchange} />
						</div>
					</div>
					<div className="row mb-3">
					</div>
					<button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-danger" onClick={handleAdd}>Add</button>
				</form>
			</div>
		</div>
	)
}

export default Addnotes
