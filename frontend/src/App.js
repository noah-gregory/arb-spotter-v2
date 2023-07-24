import React from 'react';
import './App.css';
// import { BrowserRouter, Routes, Switch, Route} from "react-router-dom";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import axios from 'axios';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import verifyEmail from './components/verifyEmail';

 

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" index element={<main className="App"><LoginPage /></main>} />
				 
				<Route path="/login" index element={<main className="App"><LoginPage /></main>} />
				 
				<Route path="/signup" index element={<main className="App"><SignupPage /></main>} />
				
				<Route path="/please-verify" index element={<main className="App"><verifyEmailPage /></main>} />
			</Routes>
		</BrowserRouter>
	);
}
export default App
