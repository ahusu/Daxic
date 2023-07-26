import React from 'react';

const Banner: React.FC = () => {
    return (
        <div className="relative bg-center bg-cover h-64" style={{backgroundImage: "url(https://e1.pxfuel.com/desktop-wallpaper/540/832/desktop-wallpaper-innova-targets-disc-golf.jpg)"}}>
            <div className="absolute inset-0 bg-black opacity-40"></div>
            <div className="relative h-full flex items-center justify-center text-center">
                <div>
                    <h1 className="text-5xl text-white font-bold">Daxic</h1>
                    <p className="text-xl text-white mt-2">Your ultimate disc golf inventory management tool</p>
                </div>
            </div>
        </div>
    );
}

export default Banner;
