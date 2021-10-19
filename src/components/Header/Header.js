import React from 'react'

const Header = () => {
  return (
    <>
    <button type="button" className="mobile-nav-toggle d-lg-none"><i className="icofont-navigation-menu"></i></button>
    <header id="header" className="">
      <div className="container d-flex align-items-center">
        <a href="index.html" className="logo mr-auto"><img src="/assets/img/logo.png" alt="" /></a>
        <nav className="nav-menu d-none d-lg-block">
          <ul>
            <li className="active"><a href="/">Home</a></li>
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
      <nav className="mobile-nav d-lg-none">
        <ul>
          <li className="active"><a href="/">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#roadmap">Roadmap</a></li>
          <li><a href="https://etherscan.io/" target="_blank" rel="noreferrer">Etherscan</a></li>
          <li><a href="https://twitter.com/365spaceproject" target="_blank" rel="noreferrer">Twitter</a></li>
          <li><a href="https://discord.gg/xzHGWBXcpZ" target="_blank" rel="noreferrer">Discord</a></li>
          <li><a href="https://instagram.com/365spaceproject" target="_blank" rel="noreferrer">Instagram</a></li>
        </ul>
      </nav>
      <div className="mobile-nav-overly" style={{ display: "none" }}></div>
    </>

  )
}

export default Header
