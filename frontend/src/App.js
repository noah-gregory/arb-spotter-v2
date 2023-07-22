import React from 'react';
import './App.css';
// import { BrowserRouter, Routes, Switch, Route} from "react-router-dom";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import axios from 'axios';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import UploadPage from './pages/UploadPage';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" index element={<LoginPage />} />
				<Route path="/login" index element={<LoginPage />} />
				<Route path="/signup" index element={<SignupPage />} />
				<Route path='/upload' index element={<UploadPage />} />
			</Routes>
		</BrowserRouter>
	);
}
export default App