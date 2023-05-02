import React from 'react';
import Home from './components/widgets/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmployeePage from './components/widgets/EmployeePage';
import { useEffect } from 'react';

import HomeStatic from './components/HomeStatic';
import TWUHighlight from './components/TWUHighlight';
import LoginHighlight from './components/LoginHighlight';
import StaffLogin from './components/StaffLogin';
import StaffLoginHighlight from './components/StaffLoginHighlight';
import LoggedIn from './components/LoggedIn';
import LoggedInReveal from './components/LoggedInReveal';
import MemberSelect from './components/MemberSelect';
import MemberSelectPushIn from './components/MemberSelectPushIn';
import LoggedInStaffHighlight from './components/LoggedInStaffHighlight';
import LoggedInMemberHighlight from './components/LoggedInMemberHighlight';
import LoginSelector from './components/LoginSelector';
import LoginSelectorStaff from './components/LoginSelectorStaff';
import LoginSelectorMember from './components/LoginSelectorMember';
import JoinGymHighlight from './components/JoinGymHighlight';
import HomeDownStatic from './components/HomeDownStatic';
import LoggedInACCSett from './components/LoggedInACCSett';
import MemberDet from './components/MemberDet';
import Login from './components/widgets/Login';


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
