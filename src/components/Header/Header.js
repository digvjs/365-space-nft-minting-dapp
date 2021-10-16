import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/img/8bit-logo.png'

const Header = () => {
  return (
    <header id="header" className="">
      <div className="container d-flex align-items-center">
        <a href="index.html" className="logo mr-auto"><img src={Logo} alt="" /></a>
        <nav className="nav-menu d-none d-lg-block">
          <ul>
            <li className="active"><Link to="/">Home</Link></li>
            <li><a href="#about">About</a></li>
            <li><a href="#roadmap">Roadmap</a></li>
            <li><a href="https://etherscan.io/">Etherscan</a></li>
            <li><a href="https://mobile.twitter.com/my8bituniverse">Twitter</a></li>
            <li><a href="https://discord.gg/v7MvdBKJDH">Discord</a></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
