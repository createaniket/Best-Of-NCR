import React from "react";
import "./Enquiryform.css";



const Enquiryform = ({enquiryformtitle}) => {
  return (
    <div className="enquiry_form_container">
      <h2 className="enquiry_form_head">Get the list of Top <span>{enquiryformtitle}</span> </h2>
      <p className="enquiry_bio">
        We'll send you contact details in seconds for free.
      </p>

      <form className="enquiry_form">
        <div className="form-group">
          <div className="input-wrapper">
            <i className="fas fa-user input-icon"></i>
            <input
              type="text"
              id="name"
              placeholder="Name"
              className="form-input"
            />
          </div>
        </div>

        <div className="form-group">
          <div className="input-wrapper">
            <i className="fas fa-phone input-icon"></i>
            <input
              type="text"
              id="mobile"
              placeholder="Mobile Number"
              className="form-input"
            />
          </div>
        </div>

        <button type="submit" className="send_enquiry_btn">
          Send Enquiry
        </button>
      </form>
    </div>
  );
};

export default Enquiryform;
