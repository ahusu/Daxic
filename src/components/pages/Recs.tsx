import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const Recs: React.FC = () => {
  const [recs, setRecs] = useState('');
  const [loading, setLoading] = useState(false);
  const discs = useSelector((state: RootState) => state.discs.bag)
  console.log(discs)

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await axios.post('/ai', discs);
      setRecs(res.data);
    } catch (error) {
      setRecs('An error occurred while trying to get recommendations.');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[800px]">

      {loading ? (
        <iframe src="https://giphy.com/embed/V0IdVIIW1y5d6" width="600" height="600" allowFullScreen></iframe>
      ) : recs === '' ? (
        <button onClick={handleSubmit} className="px-6 py-2 text-black text-2xl bg-green-400 rounded hover:bg-green-600">
          Get Recommendations
        </button>
      ) : (
        <div className="p-6 mt-10 bg-white rounded shadow-md">
          <p>{recs.split(/(?=\d\.)/g).map((item, index) => <p className='p-4 m-4' key={index}>{item}</p>)}</p>
        </div>
      )}
      </div>
  );
};

export default Recs;
