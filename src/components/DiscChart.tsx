import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, LabelList, Label } from 'recharts';

const DiscChart: React.FC = () => {
  const discs = useSelector((state: RootState) => state.discs.discs);

  // Extract speed and turn properties from discs
  const data = discs.map((disc) => ({
    x: disc.turn+disc.fade, // X-axis will represent the Turn
    y: disc.speed, // Y-axis will represent the Speed
    color: disc.color, // Color of the point based on the color property of each disc
    name: disc.name, // Name of the disc
  }));
  const dataMaxY = Math.max(...data.map((disc) => disc.y));
  return (
    <div className="w-full h-full">
      <ScatterChart width={400} height={800} margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis
          type="number"
          dataKey="x"
          name="Turn/Fade"
          domain={['dataMax', 'dataMin']} // Reversed X-axis
          tickFormatter={(tick: number) => Math.round(tick).toString()}
        />
        <YAxis type="number" dataKey="y" name="Speed" domain={[0, 14]} tickCount={Math.ceil(dataMaxY / 2)} />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
        <Scatter name="Disc Data" data={data} fill="#3182CE" shape="circle" strokeWidth={2}>
          <LabelList dataKey="name" position="top" /> {/* Display disc name as label on top of each point */}
        </Scatter>
        <Label value="Turn/Fade" offset={0} position="insideBottom" />
        <Label value="Speed" offset={5} angle={-90} position="insideLeft" />
      </ScatterChart>
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const disc = payload[0].payload; // Get the disc data from the payload
    return (
      <div className="custom-tooltip">
        <p>{`Disc Name: ${disc.name}`}</p>
        <p>{`Speed: ${disc.y}`}</p>
        <p>{`Turn: ${disc.x}`}</p>
      </div>
    );
  }
  return null;
};

export default DiscChart;
