import { Button, Navbar } from "react-bootstrap";
import { User } from "../models/user";
import * as NotesApi from '../network/notes_api'

interface NavBarLoggedOutViewProps {
    onSingUpClicked: () => void,
    onLogInClicked: () => void,
}

function NavBarLoggedOutView({onLogInClicked,onSingUpClicked}:NavBarLoggedOutViewProps) {
    
    return (
        <>
        <Button onClick={onSingUpClicked}>Sign Up</Button>
        <Button onClick={onLogInClicked}>Log In</Button>
        </>
    )
}

export default NavBarLoggedOutView