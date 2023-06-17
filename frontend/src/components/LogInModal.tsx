import { Button, Form, Modal } from "react-bootstrap";
import { User } from "../models/user";
import { loginCredentials } from "../network/notes_api";
import * as NotesApi from '../network/notes_api'
import TextInputField from "./form/TextInputField";
import { useForm } from "react-hook-form";

interface LogInModalProps {
    onDismiss: () => void,
    onLogInSend: (user: User) => void
}


function LogInModal({onDismiss,onLogInSend}:LogInModalProps) {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<loginCredentials>()

    async function onSubmit(credentials: loginCredentials) {
        try {
            const newUser = await NotesApi.login(credentials)
            onLogInSend(newUser)
        } catch (error) {
            alert(error)
            console.log(error)
        }
    }


    return (
        <Modal show onHide={onDismiss}>
        <Modal.Header closeButton>
            <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <TextInputField
                    name="username"
                    label="Username"
                    type="text"
                    placeholder="Username"
                    register={register}
                    registerOptions={{ required: "Required" }}
                    error={errors.username}
                />

                <TextInputField
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="Email"
                    register={register}
                    registerOptions={{ required: "Required" }}
                    error={errors.password}
                />
                <Button type="submit" disabled = {isSubmitting} className="w-100">Log In</Button>
            </Form>
        </Modal.Body>
    </Modal>
    )
}

export default LogInModal