import React from "react";


const Landing: React.FC = () => {
  return (
    <>

      <div className="flex flex-col items-start justify-center h-[800] px-4 py-8">
        <div className="flex justify-left">
          <div className="w-[100px]"></div>
          <img className="p-4 m-4" src="https://uxwing.com/wp-content/themes/uxwing/download/arrow-direction/twisted-arrow-left-to-top-orange-icon.png" alt="arrow pointing to Add a Disc button" width="400" ></img>
        </div>
        <h1 className="text-3xl font-bold mb-4">Welcome to our Daxic, your new favorite Disc Management tool!</h1>
        <p className="text-lg mb-8">
          Getting started is simple. Just click on "Add a Disc" to begin adding discs to your bag.
        </p>

      </div>
    </>
  );
};

export default Landing;