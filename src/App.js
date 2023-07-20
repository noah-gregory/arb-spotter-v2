import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Switch} from "react-router-dom";
import axios from 'axios';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Switch>
					<Route path="/" index element={<LoginPage />} />
					<Route path="/login" index element={<LoginPage />} />
					<Route path="/signup" index element={<SignupPage />} />
				</Switch>
			</Routes>
		</BrowserRouter>
	);
}
export default App