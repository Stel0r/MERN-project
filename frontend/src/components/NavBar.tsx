import { Container, Nav, Navbar } from "react-bootstrap"
import { User } from "../models/user"
import NavBarLoggedInView from "./NavBarLoggedInView"
import NavBarLoggedOutView from "./NavBarLoggedOutView"
import {Link} from "react-router-dom"

interface NavBarProps{
    loggedUser:User|null,
    onSignUpClick:() => void,    
    onLogInClick:() => void,    
    onLogOutSuccess:() => void,    

}
function NavBar({loggedUser,onLogInClick,onLogOutSuccess,onSignUpClick}:NavBarProps) {
    return (
        <Navbar bg = "primary" variant="dark" expand ="md" sticky="top">
            <Container>
                <Navbar.Brand as ={Link} to="/">
                    CoolAppTest
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    <Nav>
                        <Nav.Link as={Link} to="/privacy">
                            Policy
                        </Nav.Link> 
                    </Nav>
                    <Nav className = "ms-auto">
                        {loggedUser ? <NavBarLoggedInView user = {loggedUser} onLogoutSuccesful={onLogOutSuccess}/>:<NavBarLoggedOutView onLogInClicked={onLogInClick} onSingUpClicked={onSignUpClick}/>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar