import React, { useEffect, useState } from 'react';
import { Note as NoteModel } from './models/note'
import Note from './components/note';
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import styles from './styles/NotesPage.module.css'
import styleUtils from "./styles/Utils.module.css"
import * as NotesApi from './network/notes_api'
import AddEditNoteDialog from './components/addEditNoteDialog'
import { FaPlus } from 'react-icons/fa'

function App() {

	const [notes, setNotes] = useState<NoteModel[]>([])
	const [notesLoading, setNotesLoading] = useState(true)
	const [showNotesLoadingError, setshowNotesLoadingError] = useState(false)


	const [showAddDialog, setShowAddDialog] = useState(false)
	const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null)

	useEffect(() => {
		async function getNotes() {
			try {
				setshowNotesLoadingError(false)
				setNotesLoading(true)
				const notesJson = await NotesApi.fetchNotes()
				setNotes(notesJson)
			} catch (error) {
				setshowNotesLoadingError(true)
			} finally {
				setNotesLoading(false)
			}
		}
		getNotes()
	}, [])

	async function deleteNote(note: NoteModel) {
		try {
			await NotesApi.deleteNote(note._id)
			setNotes(notes.filter((not) => not._id !== note._id))
		} catch (error) {
			console.error(error)
			alert(error)
		}
	}

	const notesGrid =
		<Row xs={1} md={2} xl={3} className={`g-4 ${styles.notesGrid}`}>
			{notes.map((n) =>
				<Col key={n._id}>
					<Note note={n} className={styles.note} onDelete={deleteNote} onNoteClick={setNoteToEdit} />
				</Col>)}
		</Row>

	return (
		<Container className = {styles.notesPage}>
			<Button onClick={() => { setShowAddDialog(true) }} className={`mb-3 ${styleUtils.blockCenter} mt-3 ${styleUtils.flexCenter}`}>
				<FaPlus />
				Add new Note
			</Button>
			{notesLoading && <Spinner animation="border" variant='primary' />}
			{showNotesLoadingError && <p>Something Went Wrong D: please Refresh</p>}
			{!notesLoading && !showNotesLoadingError &&
				<>
				{notes.length > 0 ? notesGrid : <p>You don't have any Notes, Create your First!</p>}
				</>}
			{showAddDialog && <AddEditNoteDialog onDismiss={() => setShowAddDialog(false)} onNoteSaved={(newNote) => {
				setShowAddDialog(false)
				setNotes([...notes, newNote])
			}} />}
			{noteToEdit &&
				<AddEditNoteDialog noteToEdit={noteToEdit} onDismiss={() => setNoteToEdit(null)} onNoteSaved={(updatedNote: NoteModel) => {
					setNotes(notes.map((note) => note._id === updatedNote._id ? updatedNote : note))
					setNoteToEdit(null)
				}
				} />}
		</Container>
	);
}

export default App;
