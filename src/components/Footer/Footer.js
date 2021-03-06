import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer id="footer">
      <div className="container">
        {/* <div className="footer-center">
          <a href="https://mobile.twitter.com/my8bituniverse"><img src="/assets/img/twitter-8bit.svg" alt="" /></a>
          <a href="https://discord.gg/v7MvdBKJDH"><img src="/assets/img/discord-8bit.svg" alt="" /></a>
        </div> */}
        <div className="footer-center mt-5">
          <Link className="footer" to="/terms">Terms</Link>
        </div>
        {/* <div className="text-center mt-4">
          <div className="text-center">Contract</div>
          <div className="text-center">
            <a className="badge badge-dark" href="https://etherscan.io/address/0xd8108ba38aD262a9206da06a0BA7FFF5d5EEa125" target="_blank">0xd8108ba38aD262a9206da06a0BA7FFF5d5EEa125</a>
          </div>
        </div> */}
        <div className="footer-center mt-5">
          Ⓒ 365 Space Project.
        </div>
      </div>
    </footer>
  )
}

export default Footer
