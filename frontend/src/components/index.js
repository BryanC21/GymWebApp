import React from 'react'
import {Link} from 'react-router-dom'
export default function HomePage () {
    return (
	<div>
		<Link to='/HomeStatic'><div>HomeStatic</div></Link>
		<Link to='/TWUHighlight'><div>TWUHighlight</div></Link>
		<Link to='/LoginHighlight'><div>LoginHighlight</div></Link>
		<Link to='/StaffLogin'><div>StaffLogin</div></Link>
		<Link to='/StaffLoginHighlight'><div>StaffLoginHighlight</div></Link>
		<Link to='/LoggedIn'><div>LoggedIn</div></Link>
		<Link to='/LoggedInReveal'><div>LoggedInReveal</div></Link>
		<Link to='/MemberSelect'><div>MemberSelect</div></Link>
		<Link to='/MemberSelectPushIn'><div>MemberSelectPushIn</div></Link>
		<Link to='/LoggedInStaffHighlight'><div>LoggedInStaffHighlight</div></Link>
		<Link to='/LoggedInMemberHighlight'><div>LoggedInMemberHighlight</div></Link>
		<Link to='/LoginSelector'><div>LoginSelector</div></Link>
		<Link to='/LoginSelectorStaff'><div>LoginSelectorStaff</div></Link>
		<Link to='/LoginSelectorMember'><div>LoginSelectorMember</div></Link>
		<Link to='/JoinGymHighlight'><div>JoinGymHighlight</div></Link>
		<Link to='/HomeDownStatic'><div>HomeDownStatic</div></Link>
		<Link to='/LoggedInACCSett'><div>LoggedInACCSett</div></Link>
		<Link to='/MemberDet'><div>MemberDet</div></Link>
	</div>
	)
}