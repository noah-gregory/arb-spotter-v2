import React from 'react';
import './App.css';
// import * as ReactBootStrap from "react-bootstrap";
// import { BrowserRouter, Routes, Switch, Route} from "react-router-dom";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import axios from 'axios';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import UploadPage from './pages/UploadPage';
import FeedPage from './pages/FeedPage';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" index element={<main className="App"><LoginPage /></main>} />
				 
				<Route path="/login" index element={<main className="App"><LoginPage /></main>} />
				 
				<Route path="/signup" index element={<main className="App"><SignupPage /></main>} />

				<Route path="/upload" index element={<main className="App"><UploadPage /></main>} />

				<Route path="/feed" index element={<main className="App"><FeedPage /></main>} />
			</Routes>
		</BrowserRouter>
	);
}
export default App
