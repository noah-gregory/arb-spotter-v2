import React from 'react';
import './App.css';
// import { BrowserRouter, Routes, Switch, Route} from "react-router-dom";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import axios from 'axios';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import VerifyPage from './pages/VerifyPage';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" index element={<main className="App"><LoginPage /></main>} />
				 
				<Route path="/login" index element={<main className="App"><LoginPage /></main>} />
				 
				<Route path="/signup" index element={<main className="App"><SignupPage /></main>} />
				{/* <Route path="/verify/:token" index element={<main className="App"><VerifyPage /></main>}  /> */}
				<Route path="/verify/:token" element={<main className="App"><VerifyPage /></main>} />
				
			</Routes>
		</BrowserRouter>
	);
}
export default App
