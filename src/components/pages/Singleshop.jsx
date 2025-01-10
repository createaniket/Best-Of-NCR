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
import MapEmbed from "../utils/maps/MapEmbed";

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
        document.querySelector(".img-showcase img:first-child")?.clientWidth ||
        0;
      const showcase = document.querySelector(".img-showcase");
      if (showcase) {
        showcase.style.transform = `translateX(${
          -(imgId - 1) * displayWidth
        }px)`;
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
        {
          <div className="card-wrapper">
            <div className="card_shop">
              <div className="shop_detail_content"></div>
            </div>
          </div>
        }
      </div>

      <section id="tabs">
        <div class="container">
          {/* <h6 class="section-title h1">Tabs</h6> */}
          <div class="row">
            <div class="col-xs-12">
              <nav>
                <div class="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                  <a
                    class="nav-item nav-link active"
                    id="nav-home-tab"
                    data-bs-toggle="tab"
                    href="#nav-home"
                    role="tab"
                    aria-controls="nav-home"
                    aria-selected="true"
                  >
                    Overview
                  </a>
                  <a
                    class="nav-item nav-link"
                    id="nav-profile-tab"
                    data-bs-toggle="tab"
                    href="#nav-profile"
                    role="tab"
                    aria-controls="nav-profile"
                    aria-selected="false"
                  >
                    Contact
                  </a>
                  <a
                    class="nav-item nav-link"
                    id="nav-contact-tab"
                    data-bs-toggle="tab"
                    href="#nav-contact"
                    role="tab"
                    aria-controls="nav-contact"
                    aria-selected="false"
                  >
                    Photos
                  </a>
                  <a
                    class="nav-item nav-link"
                    id="nav-about-tab"
                    data-bs-toggle="tab"
                    href="#nav-about"
                    role="tab"
                    aria-controls="nav-about"
                    aria-selected="false"
                  >
                    Related Shops
                  </a>
                </div>
              </nav>
              <div class="tab-content py-3 px-3 px-sm-0" id="nav-tabContent">
                <div
                  class="tab-pane fade show active"
                  id="nav-home"
                  role="tabpanel"
                  aria-labelledby="nav-home-tab"
                >
                  <div>
                    <p className="shop_detail_name">
                      {shopDetail.name || "Shop Name"}
                    </p>

                    <div className="shop_services">
                      {shopDetail.services?.map((service, index) => (
                        <p className="shop_service" key={index}>
                          {service.name}
                        </p>
                      ))}
                    </div>

                    <p className="shop_votes">
                      <span className="shop_vote_hd">Votes:</span>{" "}
                      <span className="votecount">
                        {" "}
                        {shopDetail?.votes?.length}{" "}
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

                    <p className="shop_bio">{shopDetail.bio}</p>
                  </div>
                </div>
                <div
                  class="tab-pane fade"
                  id="nav-profile"
                  role="tabpanel"
                  aria-labelledby="nav-profile-tab"
                >
                  <p className="shop_location">
                    <CiLocationOn /> {shopDetail.address}
                  </p>
                  <p className="shop_phone">
                    <span>

                    <FaPhoneAlt />
                    </span>
                     {shopDetail.contact}
                  </p>


                  <MapEmbed shortUrl={shopDetail.location} />
                </div>
                <div
                  class="tab-pane fade"
                  id="nav-contact"
                  role="tabpanel"
                  aria-labelledby="nav-contact-tab"
                >
                  <div className="product-imgs">
                    {shopDetail.images?.length > 0 ? (
                      <>
                        {" "}
                        <div className="img-display">
                          <div className="img-showcase">
                            {shopDetail?.images?.map((pic, index) => (
                              <img
                                key={index}
                                src={pic}
                                alt={`mine ${index + 1}`}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="img-select">
                          {shopDetail?.images?.map((pic, index) => (
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
                      </>
                    ) : (
                      <>
                        <p className="nomediahere">
                          No photos available right now
                        </p>
                      </>
                    )}
                  </div>
                </div>
                <div
                  class="tab-pane fade"
                  id="nav-about"
                  role="tabpanel"
                  aria-labelledby="nav-about-tab"
                >
                  <div className="shop_reatives">
                    <CustomCarousel
                      shops={shops}
                      compheading={`Related ${shopDetail?.services?.[0]?.name}`}
                    />
                    {/* Passing shops to CustomCarousel */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Singleshop;
