import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import Topbanners from "../../Banners/Topbanner";
import Prefooter from "../../Footer/Prefooter";
import Footer from "../../Footer/Footer";
import './Shoplist.css';

import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import Enquiryform from "../../utils/sidebars/Enquiryform";



const Shoplist = () => {
  const [shops, setShops] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const { id: serviceID } = useParams();

  const fetchShopsByServiceIdData = async () => {
    try {
      console.log("in the fetch shops and the id from url is ", serviceID);
      const webURL = `${process.env.REACT_APP_BASE_URL}/shop/shopbyserv/${serviceID}`;
      console.log("The URL", webURL);
      const response = await axios.get(webURL);
      console.log("The Response", response.data);
      return response.data;
    } catch (error) {
      console.log("The Error", error);
    }
  };

  useEffect(() => {
    fetchShopsByServiceIdData().then((data) => {
      console.log("The Data", data);
      if (data) {
        setShops(data);

        setLoading(false);
      }
    });

    // eslint-disable-next-line
  }, []);

  return (
    <div>
        <Navbar/>
        <Topbanners/>
      <div className="shoplist_conatiner">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="shoplist_container_items">
            <div className="shoplist_sect">

            {shops.map((shop) => (
              <div className="shop_list_conatiner_item">
                <img
                  src={shop.images?.[0]}
                  alt="shop"
                  className="shoplist_container_img"
                />

                <div className="shoplist_info_sect">

                <p className="shoplist_container_txt">{shop.name}</p>
                <p className="shoplist_votes"> Votes: {shop.votes.length}</p>
                <p className="shoplist_location"> <FaLocationDot className="locationicons" />
                {shop.address.slice(0, 50)}...</p>

                <p className="shoplist_tags">
                    {
                        shop.services.map((service) => (<span>{service.name}</span>))
                    }
           
                    </p>

                    <p className="shoplist_phonenumber"> <FaPhoneAlt  className="shop_phone_icon"/>
                    {shop.contact}</p>

                </div>
              </div>
            ))}
            </div>

            <div className="shoplist_ads_sect">
              <Enquiryform  enquiryformtitle={shops?.[0].services?.[0].name}/>


            </div>
          </div>
        )}
      </div>

      <Prefooter />
      <Footer />
    </div>
  );
};

export default Shoplist;