import React from 'react';
import { useEffect } from 'react';

import Home from './components/widgets/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmployeePage from './components/widgets/EmployeePage';
import MemberPage from './components/widgets/MemberPage';


import Login from './components/widgets/Login';
import GymInfo from './components/widgets/GymInfo';
import GymDetail from './components/widgets/GymDetail';
import ShowCurrentClass from './components/widgets/ClassSchedule';
import LogHours from './components/widgets/LogHours';
import EnrollClass from './components/widgets/EnrollClass';
import PastActivity from './components/widgets/PastActivity';
import EmployeeLogin from './components/widgets/EmployeeLogin';
import MemberLogin from './components/widgets/MemberLogin';



function App() {

	useEffect(() => {
		console.log("App.js");
	}, []);

	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/Employee" element={<EmployeePage />} />
					<Route path="/Login" element={<Login />} />
					<Route path="/Member" element={<MemberPage />} />
					<Route path="/Gym" element={<GymInfo />} />
					<Route path="/GymDetail" element={<GymDetail />} />
					<Route path="/ShowCurrentClass" element={<ShowCurrentClass />} />
					<Route path="/LogHours" element={<LogHours />} />
					<Route path="/EnrollClass" element={<EnrollClass />} />
					<Route path="/PastActivity" element={<PastActivity />} />
					<Route path="/EmployeeLogIn" element={<EmployeeLogin />} />
					<Route path="/MemberLogIn" element={<MemberLogin />} />

				</Routes>
			</BrowserRouter>
		</div>
	);
}
export default App;
