import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import './Cardwithimages.css'



const Cardwithimages = () => {

    const Places = [

        {

            id:1,
            img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
            title: "Sea star",
            place:"Noida",
            link:"https://inciterz.com/",
            votes:"892",

        },

        {

            id:2,
            img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
            title: "Honey",
            place:"Ghaziabad",
            link:"https://inciterz.com/",
            votes:"282892",

        },

        {

            id:3,
            img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
            title: "Fern",
            place:"Noida",
            link:"https://inciterz.com/",
            votes:"991",

        },

        {

            id:4,
            img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
            title: "Mushrooms",
            place:"Ghaziabad",
            link:"https://inciterz.com/",
            votes:"18929",

        },

        {

            id:5,
            img: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f",
            title: "Snacks",
            place:"Noida",
            link:"https://inciterz.com/",
            votes:"991010",

        },


    ]
  return (
    <div>
      <p className="cardwithimages_head">Top rated paces in NCR</p>{" "}
      <div className="card_with_images_card_items">
        {
            Places.map( (place) => (

            
                <Card sx={{ maxWidth: 320, minWidth:280 }}     style={{padding:"10px", borderRadius:"10px"}}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={place.img}
                    alt="green iguana"
                    style={{borderRadius:"10px"}}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {place.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {place.place}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
                
            ))
        }

      </div>
    </div>
  );
};

export default Cardwithimages;
