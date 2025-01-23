import React, { useEffect } from "react";
import Masonary from "../Masnory/Masonary";
import Navbar from "../Navbar/Navbar";
import Topbanners from "../Banners/Topbanner";
import Cardwithimages from "../utils/cards/Cardwithimages";
import Prefooter from "../Footer/Prefooter";
import Footer from "../Footer/Footer";
import axios from "axios";

const Home = () => {
  const [catdata, setCatdata] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  console.log("the process", process.env.REACT_APP_BASE_URL);

  const fetchCatData = async () => {
    try {
      console.log("in the fetch cats");
      const webURL = `${process.env.REACT_APP_BASE_URL}/category/get/`;
      const response = await axios.get(webURL);
      console.log("The Response", response.data.categories);
      return response.data.categories;
    } catch (error) {
      console.log("The Error", error);
    }
  };

  const filterCats = (data) => {
    const cats = data.filter((item) => item.isparent === false);
    console.log("The Cat Data", cats);
    return cats;
  };

  useEffect(() => {
    fetchCatData().then((data) => {
      console.log("The Data", data);
      if (data) {
        const filteredCats = filterCats(data); // Filter the categories
        setCatdata(filteredCats); // Set only the filtered categories
        setLoading(false);
      }
    });

    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Navbar />
      <Topbanners />

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <Masonary cats={catdata} /> {/* Pass only the filtered categories */}
        </div>
      )}

      <Cardwithimages />
      <Prefooter />
      <Footer />
    </div>
  );
};

export default Home;
