import React from "react";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import BestSeller from "../components/BestSeller";
import OurPolicy from "../components/OurPolicy";
import NewsletterBox from "../components/NewsletterBox";

const Home = () => {
  return (
    <div>
      {/* ShopEZ Title Section */}
      <div className="text-center py-6">
        <h1 className="text-3xl font-bold">Welcome to ShopEZ</h1>
        <p className="text-gray-600 text-sm mt-2">
          Your simple and smart online shopping destination
        </p>
      </div>

      <Hero />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <NewsletterBox />
    </div>
  );
};

export default Home;