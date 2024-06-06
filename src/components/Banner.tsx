import React from 'react';

const Banner: React.FC = () => {
    return (
        <div className="relative bg-center bg-cover h-64" style={{backgroundImage: "url(https://art.ngfiles.com/images/3400000/3400585_rogan2001_hash-slinging-slasher.png?f1692160722)"}}>
            <div className="absolute inset-0 bg-black opacity-40"></div>
            <div className="relative h-full flex items-center justify-center text-center">
                <div>
                    <h1 className="text-5xl text-white font-bold">Hash Buddy</h1>
                    <p className="text-xl text-white mt-2">Keep all of your hash in one place!</p>
                </div>
            </div>
        </div>
    );
}

export default Banner;
