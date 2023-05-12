import React from 'react';
import { useEffect } from 'react';

import Home from './components/widgets/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmployeePage from './components/widgets/EmployeePage';
import MemberPage from './components/widgets/MemberPage';


import Login from './components/widgets/Login';
import GymInfo from './components/widgets/GymInfo';
import ShowCurrentClass from './components/widgets/ClassSchedule';
import LogHours from './components/widgets/LogHours';
import EnrollClass from './components/widgets/EnrollClass';
import PastActivity from './components/widgets/PastActivity';
import EmployeeLogin from './components/widgets/EmployeeLogin';
import MemberLogin from './components/widgets/MemberLogin';

import HomeStatic from './components/Figma/HomeStatic';
import TWUHighlight from './components/Figma/TWUHighlight';
import LoginHighlight from './components/Figma/LoginHighlight';
import StaffLogin from './components/Figma/StaffLogin';
import StaffLoginHighlight from './components/Figma/StaffLoginHighlight';
import LoggedIn from './components/Figma/LoggedIn';
import LoggedInReveal from './components/Figma/LoggedInReveal';
import MemberSelect from './components/Figma/MemberSelect';
import MemberSelectPushIn from './components/Figma/MemberSelectPushIn';
import LoggedInStaffHighlight from './components/Figma/LoggedInStaffHighlight';
import LoggedInMemberHighlight from './components/Figma/LoggedInMemberHighlight';
import LoginSelector from './components/Figma/LoginSelector';
import LoginSelectorStaff from './components/Figma/LoginSelectorStaff';
import LoginSelectorMember from './components/Figma/LoginSelectorMember';
import JoinGymHighlight from './components/Figma/JoinGymHighlight';
import HomeDownStatic from './components/Figma/HomeDownStatic';
import LoggedInACCSett from './components/Figma/LoggedInACCSett';
import MemberDet from './components/Figma/MemberDet';


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
					<Route path="/ShowCurrentClass" element={<ShowCurrentClass />} />
					<Route path="/LogHours" element={<LogHours />} />
					<Route path="/EnrollClass" element={<EnrollClass />} />
					<Route path="/PastActivity" element={<PastActivity />} />
					<Route path="/EmployeeLogIn" element={<EmployeeLogin />} />
					<Route path="/MemberLogIn" element={<MemberLogin />} />

					<Route path="/homestatic" element={<HomeStatic />} />
					<Route path="/twuhighlight" element={<TWUHighlight />} />
					<Route path="/loginhighlight" element={<LoginHighlight />} />
					<Route path="/stafflogin" element={<StaffLogin />} />
					<Route path="/staffloginhighlight" element={<StaffLoginHighlight />} />
					<Route path="/loggedin" element={<LoggedIn />} />
					<Route path="/loggedinreveal" element={<LoggedInReveal />} />
					<Route path="/memberselect" element={<MemberSelect />} />
					<Route path="/memberselectpushin" element={<MemberSelectPushIn />} />
					<Route path="/loggedinstaffhighlight" element={<LoggedInStaffHighlight />} />
					<Route path="/loggedinmemberhighlight" element={<LoggedInMemberHighlight />} />
					<Route path="/loginselector" element={<LoginSelector />} />
					<Route path="/loginselectorstaff" element={<LoginSelectorStaff />} />
					<Route path="/loginselectormember" element={<LoginSelectorMember />} />
					<Route path="/joingymhighlight" element={<JoinGymHighlight />} />
					<Route path="/homedownstatic" element={<HomeDownStatic />} />
					<Route path="/loggedinaccsett" element={<LoggedInACCSett />} />
					<Route path="/memberdet" element={<MemberDet />} />

				</Routes>
			</BrowserRouter>
		</div>
	);
}
export default App;
