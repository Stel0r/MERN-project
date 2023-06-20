import { useEffect, useState } from 'react';
import LogInModal from './components/LogInModal';
import NavBar from './components/NavBar';
import SignUpModal from './components/SignUpModal';
import { User } from './models/user';
import * as NotesApi from './network/notes_api';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NotesPage from './components/pages/NotesPage';
import PrivacyPage from './components/pages/PrivacyPage';
import PageNotFound from './components/pages/PageNotFound';

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
		<BrowserRouter>
			<div>
				<NavBar
					loggedUser={loggedInUser}
					onLogInClick={() => { setShowLogIn(true) }}
					onLogOutSuccess={() => { setLoggedInUser(null) }}
					onSignUpClick={() => { setShowSignUp(true) }}
				/>
				<Container>
					<Routes>
						<Route path= "/" element ={<NotesPage loggedUser={loggedInUser}/>}/>
						<Route path= "/privacy" element ={<PrivacyPage/>}/>
						<Route path= "/*" element ={<PageNotFound/>}/>
					</Routes>
				</Container>
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
			</div>
		</BrowserRouter> 
	);
}

export default App;
