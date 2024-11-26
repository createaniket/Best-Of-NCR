import React from 'react'

import './Footer.css'

const Footer = () => {
  return (
    <div className='footer_main'>

        <div className="footer_main_items">
            <div className="footer_left">
                <div className="footer_left_top">

                <p className="footer_left_head">BestOfNoida</p>
                <p className="footer_left_txt">Discover Noida like never before!</p>
                </div>

                <div className="footer_left_bottom">
                    <p className="footer_left_bottom_txt">
                        BestOfNoida <span>&copy;</span>
                    </p>
                </div>

            </div>

            <div className="footer_right">

                <p className="footer_right_head">Support</p>
                <p className="footer_right_txt">Reach Out</p>
                <p className="footer_right_txt">Assistance</p>
                <p className="footer_right_txt">Help Center</p>
                <p className="footer_right_txt">User Manual</p>

            </div>
        </div>
    </div>
  )
}

export default Footer