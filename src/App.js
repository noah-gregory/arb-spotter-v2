import React, {useState, useEffect} from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from 'axios';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';

function App() {
	// const [users, setUsers] = useState(null);

	// const [username, setUsername] = useState("");
	// const [email, setEmail] = useState("");
	// useEffect(() => {
	// 	axios
	// 		.get("/api/users")
	// 		.then((users) => setUsers(users))
	// 		.catch((err) => console.log(err));
	// }, []);

	// function submitForm() {
	// 	if (username === "") {
	// 		alert("Please fill the username field");
	// 		return;
	// 	}
	// 	if (email === "") {
	// 		alert("Please fill the email field");
	// 		return;
	// 	}
	// 	axios
	// 		.post("/api/users", {
	// 			username: username,
	// 			email: email,
	// 		})
	// 		.then(function () {
	// 			alert("Account created successfully");
	// 			window.location.reload();
	// 		})
	// 		.catch(function () {
	// 			alert("Could not creat account. Please try again");
	// 		});
	// }
	return (
		<BrowserRouter>
			<Routes>
				<Switch>
					<Route path="/" index element={<LoginPage />} />
					<Route path="/login" index element={<LoginPage />} />
					<Route path="/home" index element={<HomePage />} />
					<Route path="/signup" index element={<SignupPage />} />
				</Switch>
			</Routes>
		</BrowserRouter>
	);
};
export default App