import * as React from "react";
import Masonry from "@mui/lab/Masonry";
import { useNavigate } from "react-router-dom";

const Masonary = (props) => {
  const navigate = useNavigate();
  const Cats = props.cats.slice(0, 8);

  console.log("The Cats", Cats);

  return (
    <div>
      <p className="masonary_home_head">Featured Categories</p>
      <Masonry columns={{ xs: 3, sm: 4 }} spacing={{ xs: 0.7, sm: 1, md: 2 }}>
        {Cats.map((item, index) => (
          <div key={index}>

            <img
              src={item.image}
              alt={item.name}
              loading="lazy"
              style={{
                borderBottomLeftRadius: 4,
                borderBottomRightRadius: 4,
                // display: 'block',
                width: "100%",
              }}
              onClick={() => {navigate(`/services/${item._id}`)}}
            />
          </div>
        ))}
      </Masonry>
    </div>
  );
};
export default Masonary;