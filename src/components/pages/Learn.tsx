// Learn.tsx

import React from 'react';

const discImage = 'https://infinitediscs.com/Inf_Uploads/DiscProducts/W675_Leopard3_1.Webp';

const Learn: React.FC = () => {
  return (
    <div className="min-h-screen py-8">

      {/* Flight Numbers Descriptions */}
      <div className="px-4 py-2">
        <h2 className="text-xl font-semibold mb-2">Disc Flight Numbers</h2>
        <div className="flex justify-between">
          <div>
            <p className="font-semibold">Speed: 7</p>
            <p className="text-gray-600">The first number represents the disc's speed rating. It indicates how fast the disc needs to be thrown in order to achieve its optimal flight pattern. Lower speed discs (e.g., 1-5) are easier to throw and are suitable for beginners, while higher speed discs (e.g., 8-14) require more arm speed and are designed for experienced players.</p>
          </div>
          <div>
            <p className="font-semibold">Glide: 5</p>
            <p className="text-gray-600">The second number denotes the disc's glide rating. It describes the disc's ability to maintain loft and stay in the air. Higher glide discs (e.g., 4-7) tend to stay aloft longer and provide more distance potential, while lower glide discs (e.g., 1-3) may have a more predictable and controlled flight path.</p>
          </div>
          <div>
            <p className="font-semibold">Turn: -2</p>
            <p className="text-gray-600">The third number refers to the disc's turn rating or high-speed stability. It describes the disc's tendency to curve during the initial part of its flight when thrown with power. A positive turn rating (e.g., -1 to -5) suggests the disc has a natural tendency to turn to the right (for right-handed backhand throws) or left (for left-handed backhand throws). Conversely, a zero or positive turn rating (e.g., 0 to +3) indicates a straighter flight or even some resistance to turning.</p>
          </div>
          <div>
            <p className="font-semibold">Fade: 1</p>
            <p className="text-gray-600">The fourth number represents the disc's fade rating or low-speed stability. It describes the disc's tendency to fade at the end of its flight when its speed decreases. A high fade rating (e.g., 2-5) means the disc will have a strong hook or curve at the end, while a low fade rating (e.g., 0-1) suggests a more gentle and subtle fade or a straighter finish.</p>
          </div>

        </div>

        {/* Disc Image */}
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <img src={discImage} alt="Disc" className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default Learn;
