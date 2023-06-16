import { Button, Form, Modal } from "react-bootstrap";
import { Note } from "../models/note";
import { NoteImport } from "../network/notes_api";
import { useForm } from "react-hook-form";
import * as NotesApi from "../network/notes_api"

interface addEditNoteDialogProps {
    noteToEdit?:Note
    onDismiss: () => void,
    onNoteSaved: (note: Note) => void
}

function AddEditNoteDialog({ noteToEdit,onDismiss, onNoteSaved }: addEditNoteDialogProps) {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<NoteImport>({
        defaultValues:{
            title:noteToEdit?.title || "",
            description:noteToEdit?.description || "",
        }
    })

    async function onSubmit(input: NoteImport) {
        try {
            let noteResponse:Note
            if(noteToEdit){
                noteResponse = await NotesApi.updateNote(noteToEdit._id,input)
            }else{
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
                <Modal.Title>{noteToEdit ? "Edit Note":"Add Note"}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form id="addEditnoteForm" onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Title" isInvalid = {!!errors.title}  {...register("title", { required: "Required " })} />
                        <Form.Control.Feedback type="invalid">
                            {errors.title?.message}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" placeholder="Description (Optional)" rows={5} {...register("description")} />
                    </Form.Group>
                </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" type='submit' form="addEditnoteForm" disabled = {isSubmitting}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddEditNoteDialog