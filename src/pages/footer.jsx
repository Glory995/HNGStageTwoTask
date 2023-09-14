

import React from 'react'
import facebook from "../images/Vector.png"
import instagram from "../images/fa-brands_instagram.png"
import twitter from "../images/Vector (1).png"
import youtube from "../images/fa-brands_youtube.png"


function Footer() {
  return (
    <div className='fotterdiv'>
        <div className="imagesfooter">
                <img src={facebook} alt="" className="icon" />
            <img src={instagram} alt="" className="icon" />
            <img src={twitter} alt="" className="icon" />
            <img src={youtube} alt="" className="icon" />
        </div>

        <ul className="listting">
            <li>Condition Of Use</li>
            <li>Privacy & policy</li>
            <li>Press Room</li>
        </ul>

        <p className="footerp">© 2021 MovieBox by Adriana Eka Prayudha  </p>
    
    </div>
  )
}

export default Footer
