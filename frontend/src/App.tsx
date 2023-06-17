import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import NavBar from './components/NavBar';
import styles from './styles/NotesPage.module.css';
import { User } from './models/user';
import * as NotesApi from './network/notes_api'
import SignUpModal from './components/SignUpModal';
import LogInModal from './components/LogInModal';
import NotesPagesLoggedInView from './components/NotesPagesLoggedInView';
import NotesPagesLoggedOutView from './components/NotesPagesLoggedOutView';

function App() {


	const [loggedInUser, setLoggedInUser] = useState<User | null>(null)
	const [showSignUp, setShowSignUp] = useState(false)
	const [showLogIn, setShowLogIn] = useState(false)


	useEffect(() => {
		async function fetchLoggedInUser() {
			try {
				const user = await NotesApi.getLoggedUser()
				setLoggedInUser(user)
			} catch (error) {
				console.error(error)
			}
		}

	}, [])

	return (
		<div>
			<NavBar
				loggedUser={loggedInUser}
				onLogInClick={() => { setShowLogIn(true) }}
				onLogOutSuccess={() => { setLoggedInUser(null) }}
				onSignUpClick={() => { setShowSignUp(true) }}
			/>
			<Container className={styles.notesPage}>
				<>
					{loggedInUser ? <NotesPagesLoggedInView /> : <NotesPagesLoggedOutView />}
				</>
				{showSignUp &&
					<SignUpModal
						onDismiss={() => { setShowSignUp(false) }}
						onSignUpSend={(user) => {
							setLoggedInUser(user)
							setShowSignUp(false)
						}}
					/>
				}
				{showLogIn &&
					<LogInModal
						onDismiss={() => { setShowLogIn(false) }}
						onLogInSend={(user) => {
							setLoggedInUser(user)
							setShowLogIn(false) 
						}}
					/>
				}
			</Container>
		</div>
	);
}

export default App;
