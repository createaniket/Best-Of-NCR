import * as React from "react";
import Masonry from "@mui/lab/Masonry";

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
  },
  {
    img: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f",
    title: "Snacks",
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
  },
  {
    img: "https://images.unsplash.com/photo-1529655683826-aba9b3e77383",
    title: "Tower",
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
  },
];

const Masonary = () => {
  return (
    <div>
      <p className="masonary_home_head">Featured Categories</p>
      <Masonry columns={{ xs: 3, sm: 4 }} spacing={{ xs: 0.7, sm: 1, md: 2 }}>
        {itemData.map((item, index) => (
          <div key={index}>
            <img
              src={item.img}
              alt={item.title}
              loading="lazy"
              style={{
                borderBottomLeftRadius: 4,
                borderBottomRightRadius: 4,
                // display: 'block',
                width: "100%",
              }}
            />
          </div>
        ))}
      </Masonry>
    </div>
  );
};
export default Masonary;