import React from 'react'
import './../styles/LoggedInStaffHighlight.css'
import ImgAsset from '../public'
import {Link} from 'react-router-dom'
export default function LoggedInStaffHighlight () {
	return (
		<div className='LoggedInStaffHighlight_LoggedInStaffHighlight'><div className='vecteezy_healthylifestyledoodlehanddrawnsetcollectionswith_1' style={{backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.60), rgba(0,0,0,0.60)),url(${ImgAsset.StaffLogin_vecteezy_healthylifestyledoodlehanddrawnsetcollectionswith_1})`}}/>
			<div className='Group3'>
				<div className='Rectangle5'/>
				<span className='Home'>Home</span>
			</div>
			<div className='Group4'>
				<div className='Rectangle5_1'/>
				<span className='Members'>Members</span>
			</div>
			<div className='Group5'>
				<div className='Rectangle5_2'/>
				<span className='Staff'>Staff</span>
			</div>
			<div className='Group6'>
				<div className='Rectangle5_3'/>
				<span className='AccountSettings'>Account Settings</span>
			</div>
			<div className='Rectangle1'/>
			<span className='FITPAL'>FITPAL</span>
			<span className='CLASSESPERSONALTRAININGSHOPMEMBERBENEFITSTESTIMONIALS'>CLASSES      PERSONAL TRAINING      SHOP      MEMBER BENEFITS      TESTIMONIALS   </span>
			<Link to='/joingymhighlight'>
				<div className='Rectangle2'/>
			</Link>
			<span className='JOINGYM'>JOIN GYM</span>
			<div className='Frame1'>
				<div className='Rectangle4'/>
				<span className='Joinus'>Join us</span>
				<span className='LoremipsumdolorsitametconsecteturadipiscingelitPharetraurnasuspendissenonornarequamdolorestVolutpatviverraaliquamquamvelconguedolorgravidadignissimTellustemporleoveltristiqueSodalesvitaecursusidatutmassacommodoLoremipsumdolorsitametconsecteturadipiscingelitPharetraurnasuspendissenonornarequamdolorestVolutpatviverraaliquamquamvel'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pharetra urna <br/><br/>suspendisse non ornare quam dolor est. Volutpat viverra aliquam quam vel <br/><br/>congue dolor gravida dignissim. Tellus tempor leo vel tristique. <br/><br/>Sodales vitae cursus id at ut massa commodo.<br/><br/>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pharetra urna <br/><br/>suspendisse non ornare quam dolor est. Volutpat viverra aliquam quam vel </span>
				<div className='Rectangle4_1'/>
				<span className='AboutCareersMembershipGuidelinesContactUs'>About      Careers      Membership Guidelines      Contact Us</span>
				<img className='image1' src = {ImgAsset.HomeDownStatic_image1} />
				<img className='image2' src = {ImgAsset.HomeDownStatic_image2} />
				<img className='image3' src = {ImgAsset.HomeDownStatic_image3} />
				<img className='image4' src = {ImgAsset.HomeDownStatic_image4} />
			</div>
			<div className='account_circle'>
				<img className='Vector' src = {ImgAsset.LoggedInStaffHighlight_Vector} />
				<img className='Vector_1' src = {ImgAsset.LoggedInStaffHighlight_Vector_1} />
			</div>
			<span className='WelcomeOwner'>Welcome, Owner!</span>
			<div className='Frame2'>
				<span className='Dashboard'>Dashboard</span>
				<span className='StaffMembers'>Staff : Members</span>
				<div className='Rectangle8'/>
				<div className='Group7'>
					<div className='Rectangle10'/>
					<div className='Rectangle9'/>
					<span className='MemberStatus'>Member Status</span>
					<span className='_10350CheckedIn'>10/350 Checked In</span>
				</div>
				<div className='Group8'>
					<div className='Rectangle10_1'/>
					<div className='Rectangle9_1'/>
					<span className='StaffStatus'>Staff Status</span>
					<span className='_710Present'>7/10 Present</span>
				</div>
				<div className='Group9'>
					<div className='Rectangle10_2'/>
					<div className='Rectangle9_2'/>
					<span className='NewRegistrations'>New Registrations</span>
					<span className='_5Monthly'>5 (Monthly)</span>
				</div>
				<div className='Group10'>
					<div className='Ellipse1'/>
					<div className='Ellipse2'/>
					<div className='Ellipse3'/>
					<div className='Ellipse4'/>
					<div className='Rectangle11'/>
					<div className='Rectangle12'/>
					<span className='_710'>7:10</span>
					<span className='Optimum'> Optimum</span>
				</div>
			</div>
		</div>
	)
}