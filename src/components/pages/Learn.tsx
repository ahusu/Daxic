// Learn.tsx

import React from 'react';

const discImage = 'https://infinitediscs.com/Inf_Uploads/DiscProducts/W675_Leopard3_1.Webp';

const Learn: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Disc Image */}
        <img src={discImage} alt="Disc" className="w-full" />

        {/* Flight Numbers */}
        <div className="px-4 py-2">
          <h2 className="text-xl font-semibold mb-2">Disc Flight Numbers</h2>
          <div className="flex justify-between">
            <div>
              <p className="font-semibold">Speed:</p>
              <p className="text-gray-600">7</p>
            </div>
            <div>
              <p className="font-semibold">Glide:</p>
              <p className="text-gray-600">5</p>
            </div>
            <div>
              <p className="font-semibold">Turn:</p>
              <p className="text-gray-600">-2</p>
            </div>
            <div>
              <p className="font-semibold">Fade:</p>
              <p className="text-gray-600">1</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learn;
