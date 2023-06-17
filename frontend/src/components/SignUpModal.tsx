import { useForm } from "react-hook-form";
import { User } from "../models/user";
import { SignUpCredentials } from '../network/notes_api'
import * as NotesApi from '../network/notes_api'
import { Button, Form, Modal } from "react-bootstrap"
import TextInputField from './form/TextInputField'
import StylesUtils from '../styles/Utils.module.css'


interface SignUpModalProps {
    onDismiss: () => void,
    onSignUpSend: (user: User) => void
}



function SignUpModal({ onDismiss, onSignUpSend }: SignUpModalProps) {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignUpCredentials>()

    async function onSubmit(credentials: SignUpCredentials) {
        try {
            const newUser = await NotesApi.signUp(credentials)
            onSignUpSend(newUser)
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
                        name="email"
                        label="Email"
                        type="email"
                        placeholder="Email"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.email}
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
                    <Button type="submit" disabled = {isSubmitting} className="w-100">Sign up</Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default SignUpModal