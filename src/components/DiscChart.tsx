import React from 'react';
import { Scatter } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const DiscChart: React.FC = () => {
  const discs = useSelector((state: RootState) => state.discs.discs);

  // Extract speed and turn properties from discs
  const data = {
    datasets: [
      {
        label: 'Speed vs. Turn',
        data: discs.map((disc) => ({ x: disc.speed, y: disc.turn })),
        backgroundColor: '#3182CE',
      },
    ],
  };

  const options = {
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Speed',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Turn',
        },
      },
    },
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <Scatter data={data} options={options} />
    </div>
  );
};

export default DiscChart;
