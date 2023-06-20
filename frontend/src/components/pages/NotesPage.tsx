import { Container } from "react-bootstrap"
import NotesPagesLoggedInView from "../NotesPagesLoggedInView"
import NotesPagesLoggedOutView from "../NotesPagesLoggedOutView"
import styles from '../../styles/NotesPage.module.css'; 
import { User } from "../../models/user";

interface NotesPageProps{
    loggedUser:User|null
}


function NotesPage({loggedUser:loggedInUser}:NotesPageProps) {
    return (
        <Container className={styles.notesPage}>
				<>
					{loggedInUser ? <NotesPagesLoggedInView /> : <NotesPagesLoggedOutView />}
				</>
			</Container>
    )
}

export default NotesPage