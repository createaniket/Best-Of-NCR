import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MapEmbed = ({ shortUrl }) => {
  console.log("yhe short url here", shortUrl)
    const [embedUrl, setEmbedUrl] = useState('');

    // const API_URL = process.env.REACT_APP_BASE_URL;

    useEffect(() => {
        const fetchFullUrl = async () => {
            try {
              console.log("iam bhetre")
                const response = await axios.get(`http://localhost:5000/shop/expand/url`, {
                    params: { shortUrl },
                });
                const expandedUrl = response.data.fullUrl;


                console.log("the expanded urll", expandedUrl)

                // Transform the expanded URL into an embeddable URL
                const embedBaseUrl = expandedUrl.replace('/maps/', '/maps/embed/');
                setEmbedUrl(embedBaseUrl);
            } catch (error) {
                console.error('Error expanding URL:', error);
            }
        };

        fetchFullUrl();
    }, [shortUrl]);

    if (!embedUrl) return <p>Loading map...</p>;

    const embedUrlnew = `https://www.google.com/maps/embed?pb=https://www.google.com/maps/search/28.626075,+77.377397?coh=219680&utm_campaign=tt-rcs&entry=tts&g_ep=EgoyMDI0MTIxMS4wIPu8ASoASAFQAw%3D%3D`;

    return (
        <iframe

        title='maptttl'
            src={embedUrlnew}
            width="100%"
            height="450"
            style={{ border: 0, margin:"20px 00" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
    );
};

export default MapEmbed;
