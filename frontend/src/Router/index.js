import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from '../Components/index';
import HomeStatic from '../Components/HomeStatic';
import TWUHighlight from '../Components/TWUHighlight';
import LoginHighlight from '../Components/LoginHighlight';
import StaffLogin from '../Components/StaffLogin';
import StaffLoginHighlight from '../Components/StaffLoginHighlight';
import LoggedIn from '../Components/LoggedIn';
import LoggedInReveal from '../Components/LoggedInReveal';
import MemberSelect from '../Components/MemberSelect';
import MemberSelectPushIn from '../Components/MemberSelectPushIn';
import LoggedInStaffHighlight from '../Components/LoggedInStaffHighlight';
import LoggedInMemberHighlight from '../Components/LoggedInMemberHighlight';
import LoginSelector from '../Components/LoginSelector';
import LoginSelectorStaff from '../Components/LoginSelectorStaff';
import LoginSelectorMember from '../Components/LoginSelectorMember';
import JoinGymHighlight from '../Components/JoinGymHighlight';
import HomeDownStatic from '../Components/HomeDownStatic';
import LoggedInACCSett from '../Components/LoggedInACCSett';
import MemberDet from '../Components/MemberDet';
const RouterDOM = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="/"><HomePage /></Route>
				<Route exact path="/homestatic"><HomeStatic /></Route>
				<Route exact path="/twuhighlight"><TWUHighlight /></Route>
				<Route exact path="/loginhighlight"><LoginHighlight /></Route>
				<Route exact path="/stafflogin"><StaffLogin /></Route>
				<Route exact path="/staffloginhighlight"><StaffLoginHighlight /></Route>
				<Route exact path="/loggedin"><LoggedIn /></Route>
				<Route exact path="/loggedinreveal"><LoggedInReveal /></Route>
				<Route exact path="/memberselect"><MemberSelect /></Route>
				<Route exact path="/memberselectpushin"><MemberSelectPushIn /></Route>
				<Route exact path="/loggedinstaffhighlight"><LoggedInStaffHighlight /></Route>
				<Route exact path="/loggedinmemberhighlight"><LoggedInMemberHighlight /></Route>
				<Route exact path="/loginselector"><LoginSelector /></Route>
				<Route exact path="/loginselectorstaff"><LoginSelectorStaff /></Route>
				<Route exact path="/loginselectormember"><LoginSelectorMember /></Route>
				<Route exact path="/joingymhighlight"><JoinGymHighlight /></Route>
				<Route exact path="/homedownstatic"><HomeDownStatic /></Route>
				<Route exact path="/loggedinaccsett"><LoggedInACCSett /></Route>
				<Route exact path="/memberdet"><MemberDet /></Route>
			</Switch>
		</Router>
	);
}
export default RouterDOM;