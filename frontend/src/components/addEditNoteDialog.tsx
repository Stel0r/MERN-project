import { Button, Form, Modal } from "react-bootstrap";
import { Note } from "../models/note";
import { NoteImport } from "../network/notes_api";
import { useForm } from "react-hook-form";
import * as NotesApi from "../network/notes_api"
import TextInputField from './form/TextInputField'

interface addEditNoteDialogProps {
    noteToEdit?: Note
    onDismiss: () => void,
    onNoteSaved: (note: Note) => void
}

function AddEditNoteDialog({ noteToEdit, onDismiss, onNoteSaved }: addEditNoteDialogProps) {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<NoteImport>({
        defaultValues: {
            title: noteToEdit?.title || "",
            description: noteToEdit?.description || "",
        }
    })

    async function onSubmit(input: NoteImport) {
        try {
            let noteResponse: Note
            if (noteToEdit) {
                noteResponse = await NotesApi.updateNote(noteToEdit._id, input)
            } else {
                noteResponse = await NotesApi.createNote(input)
            }
            onNoteSaved(noteResponse)
        } catch (error) {
            console.error(error)
            alert(error)
        }
    }

    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>{noteToEdit ? "Edit Note" : "Add Note"}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form id="addEditnoteForm" onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField
                        name="title"
                        label="Title"
                        type="text"
                        placeholder="Title of your note"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.title}
                    />

                    <TextInputField
                        name="description"
                        label="Description"
                        as="textarea"
                        rows={5}
                        placeholder="Content of your Note"
                        register={register}
                    />
                </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" type='submit' form="addEditnoteForm" disabled={isSubmitting}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddEditNoteDialog