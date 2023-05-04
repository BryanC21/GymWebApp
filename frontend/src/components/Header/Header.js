import React from 'react'
import './Header.css'
import Logo from '../../assets/logo.png'

const Header = () => {
  return (
    <div className='header'>
      
      <img src={Logo} alt='Logo' className='logo'/>

      <ul className='header-menu'>
        <li>Home</li>
        <li>Member Benefits</li>
        <li>Sign In</li>
        <li>About</li>
      </ul>

    </div>
  )
}

export default Header
