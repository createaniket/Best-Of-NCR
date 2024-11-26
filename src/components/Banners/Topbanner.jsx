import React from "react";
import "./Topbanner.css";

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
const Topbanners = () => {
  return (
    <div className="topbanners_section">
      <div className="top_banner_pic">
        <img
          src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/80/de/4b/terrace-garden.jpg?w=1200&h=-1&s=1"
          alt=""
        />

        <p className="banner_head">Discover the Best of NCR</p>

        <p className="banner_txt">Explore top-rated spots in NCR</p>
      </div>

      <div className="filter_section">

        <div className="filter_section_left">
        <div className="filter_category">
          <p className="filter_tab_head">Category</p>
          <p className="filter_tab_txt">What are you looking for?</p>
          <div className="vertical_line_filter"></div>
        </div>

        <div className="filter_search">
          <p className="filter_tab_head">Serach</p>
          <p className="filter_tab_txt">Enter Keywords</p>
    
        </div>

        <div className="filter_results">
          {" "}
          <p className="filter_tab_head">Results</p>
          <p className="filter_tab_txt">View All</p>
        </div>

        <div className="filter_fiters">
          {" "}
          <p className="filter_tab_head">Filter</p>
          <p className="filter_tab_txt">Select Filter</p>
        </div>

        </div>

        <div className="filter_section_right">



        <div className="filter_arrow">
          <ArrowForwardIcon />
        </div>
        </div>
      </div>
    </div>
  );
};

export default Topbanners;
