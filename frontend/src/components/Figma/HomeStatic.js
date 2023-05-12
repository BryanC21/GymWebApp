import React from 'react'
import './../styles/HomeStatic.css'
import ImgAsset from '../public'
import {Link} from 'react-router-dom'
export default function HomeStatic () {
	return (
		<div className='HomeStatic_HomeStatic'>
			<div className='Rectangle1'/>
			<span className='FITPAL'>FITPAL</span>
			<span className='CLASSESPERSONALTRAININGSHOPMEMBERBENEFITSTESTIMONIALS'>CLASSES      PERSONAL TRAINING      SHOP      MEMBER BENEFITS      TESTIMONIALS   </span>
			<Link to='/joingymhighlight'>
				<div className='Rectangle2'/>
			</Link>
			<span className='JOINGYM'>JOIN GYM</span>
			<Link to='/loginhighlight'>
				<div className='Rectangle3'/>
			</Link>
			<span className='LOGIN'>LOGIN</span>
			<Link to='/homedownstatic'>
				<img className='Untitled11' src = {ImgAsset.HomeStatic_Untitled11} />
			</Link>
			<img className='Line1' src = {ImgAsset.HomeStatic_Line1} />
			<img className='Line2' src = {ImgAsset.HomeStatic_Line2} />
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
			<span className='WorkHardPlayHarder'>Work Hard.<br/>Play Harder.</span>
			<Link to='/twuhighlight'>
				<div className='Rectangle5'/>
			</Link>
			<span className='TrialwithUs'>Trial with Us</span>
		</div>
	)
}