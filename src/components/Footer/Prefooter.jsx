import React from 'react';
import { ReactComponent as DealSvg } from '../assets/svgs/svgviewer-output.svg';
import './Prefooter.css'

const Prefooter = () => {
  return (
    <div className="prefooter_main">
      <div className="prefooter_items">
        <div className="prefooter_item_left">
          <div className="prefooter_item_left_one">
            <DealSvg className="dea_svg_pre_footer" />
          </div>
          <div className="prefooter_item_left_one">
            <p className="prefooter_item_left_one_head">
              Exclusive deals await you!
            </p>

            <p className="prefooter_item_left_one_txt">
              Want to receive exclusive offers and updates on the best of Noida? Join our mailing list now!
            </p>
          </div>
        </div>

        <div className="prefooter_item_right">
          <div className="prefooter_item_right_one">
            <p className="join_now_pre_footer">JOIN NOW</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prefooter;
