import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {
	const host = process.env.REACT_APP_HOST;
	const noteIni = []
	const [notes, setNotes] = useState(noteIni);

	const getNotes = async () => {
		const response = await fetch(`${host}/api/notes/fetchallnotes`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				"auth-token": localStorage.getItem('token')
			}
		});
		const json =await response.json();
		// console.log(json);
		setNotes(json);
	}
	const addNote = async (title, description, tag) => {
		const response = await fetch(`${host}/api/notes/addnote`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				"auth-token": localStorage.getItem('token')
			},
			body: JSON.stringify({ title, description, tag })
		});
		const note =await response.json();
		// const note = {
		// 	"_id": "6318e800c1e0b8e32d193d57",
		// 	"user": "63179a25c56791bfd14e3471",
		// 	"title": title,
		// 	"description": description,
		// 	"tag": tag,
		// 	"date": "2022-09-07T18:50:40.553Z",
		// 	"__v": 0
		// };
		setNotes(notes.concat(note))
	}
	const editNote = async (id, title, description, tag) => {
		const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				"auth-token": localStorage.getItem('token')
			},
			body: JSON.stringify({ title, description, tag })
		});
		const json =await response.json();
		let newNote=JSON.parse(JSON.stringify(notes));
		for (let index = 0; index < newNote.length; index++) {
			const element = newNote[index];
			if (element._id === id) {
				newNote[index].title = title;
				newNote[index].description = description;
				newNote[index].tag = tag;
				break;
			}
		}
		setNotes(newNote);
	}
	const deleteNote =async (id) => {
		const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				"auth-token": localStorage.getItem('token')
			}
		});
		const json = response.json();
		const newNote = notes.filter((note) => { return note._id !== id });
		setNotes(newNote);
	}
	return (
		<NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes}}>
			{props.children}
		</NoteContext.Provider>
	)
}
export default NoteState