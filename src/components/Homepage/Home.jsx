import React from 'react'
import Masonary from '../Masnory/Masonary'
import Navbar from '../Navbar/Navbar'
import Topbanners from '../Banners/Topbanner'
import Cardwithimages from '../utils/cards/Cardwithimages'
import Prefooter from '../Footer/Prefooter'
import Footer from '../Footer/Footer'

const Home = () => {
  return (
    <div>
        <Navbar />
        <Topbanners />

        <Masonary />
        <Cardwithimages />

        <Prefooter />
        <Footer />
    </div>
  )
}

export default Home