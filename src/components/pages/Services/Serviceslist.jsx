import React from "react";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";
import Prefooter from "../../Footer/Prefooter";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
// import Checkbox from '@mui/material/Checkbox';
import Avatar from "@mui/material/Avatar";
import Topbanners from "../../Banners/Topbanner";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Serviceslist.css";

const Serviceslist = () => {
  const navigate = useNavigate();
  const [services, setServices] = React.useState([]);
  const [catname, setCatname] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const { id: CatID } = useParams();
  const fetchServicesByCatIdData = async () => {
    try {
      console.log("in the fetch services and the id from url is ", CatID);
      const webURL = `${process.env.REACT_APP_BASE_URL}/service/cat/${CatID}`;
      console.log("The URL", webURL);
      const response = await axios.get(webURL);
      console.log("The Response", response.data);
      return response.data;
    } catch (error) {
      console.log("The Error", error);
    }
  };

  useEffect(() => {
    fetchServicesByCatIdData().then((data) => {
      console.log("The Data", data);
      if (data) {
        setServices(data); // Set only the filtered categories
        setCatname(data[0].category.name);
        setLoading(false);
      }
    });

    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Navbar />
      <Topbanners />

      <div className="serviceslist">
        <p className="services_list_head">
          All the Services of {catname ? catname : ""}{" "}
        </p>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="serviceslist_items">
            <List
              dense
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              {services.map((value) => {
                return (
                  <ListItem
                    key={value}
                    disablePadding
                    onClick={() => {
                      navigate(`/shops/${value._id}`);
                    }}
                  >
                    <ListItemButton>
                      <ListItemAvatar>
                        <Avatar
                          alt={`Avatar n°${value.name}`}
                          src={value.image}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        id={value.name}
                        primary={value.name}
                        className="serviceslist_item_text"
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </div>
        )}
      </div>

      <Prefooter />

      <Footer />
    </div>
  );
};

export default Serviceslist;
