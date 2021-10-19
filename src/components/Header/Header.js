import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header id="header" className="">
      <div className="container d-flex align-items-center">
        <a href="index.html" className="logo mr-auto"><img src="/assets/img/logo.png" alt="" /></a>
        <nav className="nav-menu d-none d-lg-block">
          <ul>
            <li className="active"><Link to="/">Home</Link></li>
            <li><a href="#about">About</a></li>
            <li><a href="#roadmap">Roadmap</a></li>
            <li><a href="https://etherscan.io/" target="_blank" rel="noreferrer">Etherscan</a></li>
            <li><a href="https://twitter.com/365spaceproject" target="_blank" rel="noreferrer">Twitter</a></li>
            <li><a href="https://discord.gg/xzHGWBXcpZ" target="_blank" rel="noreferrer">Discord</a></li>
            <li><a href="https://instagram.com/365spaceproject" target="_blank" rel="noreferrer">Instagram</a></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
