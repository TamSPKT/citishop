import React from "react";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import Sliders from "../components/Slider/Slider";
import Scroll from "../components/Scroll";



const Home = () => {
  return (
    <div>
      
      <Announcement />
      <Scroll showBelow={250}/>
      <Sliders/>
      <Categories />
      <Products/>
      <Newsletter/>
      <Footer/>
    </div>
  );
};

export default Home;