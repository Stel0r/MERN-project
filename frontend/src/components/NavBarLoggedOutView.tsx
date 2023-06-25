import { Button } from "react-bootstrap";

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