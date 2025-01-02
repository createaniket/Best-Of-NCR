import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Topbanners from "../Banners/Topbanner";
import {
  FetchShopById,
  FetchAllShops,
  CastVoteForShop,
  DownVoteForShop,
} from "../../Services/ApiCalls";

import "./Singleshop.css";

import { CiLocationOn } from "react-icons/ci";
import { FaPhoneAlt } from "react-icons/fa";
import CustomCarousel from "../slider/CustomCarousel"; // Fixed import path

import { BiSolidUpvote, BiSolidDownvote } from "react-icons/bi";

const Singleshop = () => {
  const navigate = useNavigate();
  const [shopDetail, setShopDetail] = useState({});
  const [voted, setVoted] = useState(false);
  const { id: shopID } = useParams();

  const [shops, setShops] = useState([]); // Fixed useState initialization

  const UserToken = localStorage.getItem("token");

  const FetchAllShopsNow = async () => {
    try {
      const data = await FetchAllShops();
      console.log("Shops:", data);
      setShops(data); // Set shops data once fetched
    } catch (error) {
      console.error("Error fetching shop details:", error);
    }
  };

  const UserId = localStorage.getItem("userid");

  const fetchShopDetails = async () => {
    try {
      const data = await FetchShopById(shopID);
      console.log("Shop details:", data);

      setShopDetail(data);

      // Check if the user has already voted
      if (data.votes.some((vote) => vote.user === UserId)) {
        setVoted(true);
      }
    } catch (error) {
      console.error("Error fetching shop details:", error);
    }
  };

  const HandleCastVote = async () => {
    if (!UserToken) {
      navigate("/login");
    } else {
      try {
        const data = await CastVoteForShop(shopID);
        console.log("Shop Vote Casted:", data);
        setShopDetail(data);
      } catch (error) {
        console.error("Error fetching shop details:", error);
      }
    }
  };

  const HandleCastVoteDown = async () => {
    if (!UserToken) {
      navigate("/login");
    } else {
      try {
        const data = await DownVoteForShop(shopID);
        console.log("Shop Vote Casted down:", data);
        setShopDetail(data);
      } catch (error) {
        console.error("Error fetching shop details:", error);
      }
    }
  };

  useEffect(() => {
    if (shopID) {
      fetchShopDetails();
    }

    FetchAllShopsNow();

    // eslint-disable-next-line
  }, [shopID]);

  useEffect(() => {
    const imgs = document.querySelectorAll('.img-select [role="button"]');
    const imgBtns = [...imgs];
    let imgId = 1;

    const slideImage = () => {
      const displayWidth =
        document.querySelector(".img-showcase img:first-child")?.clientWidth || 0;
      const showcase = document.querySelector(".img-showcase");
      if (showcase) {
        showcase.style.transform = `translateX(${-(imgId - 1) * displayWidth}px)`;
      }
    };

    imgBtns.forEach((imgItem) => {
      imgItem.addEventListener("click", (event) => {
        event.preventDefault();
        imgId = imgItem.dataset.id;
        slideImage();
      });
    });

    window.addEventListener("resize", slideImage);

    return () => {
      imgBtns.forEach((imgItem) => {
        imgItem.removeEventListener("click", slideImage);
      });
      window.removeEventListener("resize", slideImage);
    };
  }, [shopDetail.images]);

  return (
    <div>
      <Navbar />
      <Topbanners />
      <div className="shop-details">
        {shopDetail ? (
          <div>
            <h1>{shopDetail.name || "Shop Name"}</h1>
          </div>
        ) : (
          <p>Loading shop details...</p>
        )}
      </div>

      <div className="shop_details_sect">
        {shopDetail.images?.length > 0 && (
          <div className="card-wrapper">
            <div className="card_shop">
              <div className="product-imgs">
                <div className="img-display">
                  <div className="img-showcase">
                    {shopDetail.images.map((pic, index) => (
                      <img key={index} src={pic} alt={`mine ${index + 1}`} />
                    ))}
                  </div>
                </div>
                <div className="img-select">
                  {shopDetail.images.map((pic, index) => (
                    <div className="img-item" key={index}>
                      <div
                        role="button"
                        tabIndex="0"
                        data-id={index + 1}
                        onClick={(e) => e.preventDefault()}
                        onKeyPress={(e) =>
                          e.key === "Enter" && e.preventDefault()
                        }
                      >
                        <img src={pic} alt={`Thumbnail ${index + 1}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="shop_detail_content">
                <div>
                  <p className="shop_detail_name">
                    {shopDetail.name || "Shop Name"}
                  </p>

                  <div className="shop_services">
                    {shopDetail.services.map((service, index) => (
                      <p className="shop_service" key={index}>
                        {service.name}
                      </p>
                    ))}
                  </div>

                  <p className="shop_votes">
                    <span className="shop_vote_hd">Votes:</span>{" "}
                    <span className="votecount">
                      {" "}
                      {shopDetail?.votes.length}{" "}
                    </span>{" "}
                    <span className="upvoteicn">
                      {voted ? (
                        <BiSolidUpvote
                          className="upvote_icn"
                          onClick={HandleCastVote}
                        />
                      ) : (
                        <BiSolidDownvote
                          className="upvote_icn_down"
                          onClick={HandleCastVoteDown}
                        />
                      )}{" "}
                    </span>
                  </p>
                  <p className="shop_location">
                    <CiLocationOn /> {shopDetail.location}
                  </p>
                  <p className="shop_phone">
                    <FaPhoneAlt /> {shopDetail.contact}
                  </p>

                  <p className="shop_bio">{shopDetail.bio}</p>

                  <div className="shop_reatives">
                    <CustomCarousel
                      shops={shops}
                      compheading={`Related ${shopDetail.services[0].name}`}
                    />{" "}
                    {/* Passing shops to CustomCarousel */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Singleshop;
