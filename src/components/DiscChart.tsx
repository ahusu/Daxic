import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, LabelList, Label, Cell } from 'recharts';

const DiscChart: React.FC = () => {
  const discs = useSelector((state: RootState) => state.discs.discs);

  const data = discs.map((disc) => ({
    x: disc.turn+disc.fade,
    y: disc.speed,
    color: disc.color,
    name: disc.name,
  }));

  const renderCustomizedShape = (props: any) => {
    const { cx, cy, payload } = props;
    return (
      <circle cx={cx} cy={cy} r={10} fill={payload.color} />
    );
};

  const dataMaxY = Math.max(...data.map((disc) => disc.y));
  return (
    <div className="w-full h-full">
      <ScatterChart width={400} height={800} margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis
          type="number"
          dataKey="x"
          name="Turn/Fade"
          domain={['dataMax', 'dataMin']}
          tickFormatter={(tick: number) => Math.round(tick).toString()}
        />
        <YAxis type="number" dataKey="y" name="Speed" domain={[0, 14]} tickCount={Math.ceil(dataMaxY / 2)} />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
        <Scatter name="Disc Data" data={data} shape={renderCustomizedShape}>
          {
            data.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)
          }
          <LabelList dataKey="name" position="top" /> {}
        </Scatter>
        <Label value="Turn/Fade" offset={0} position="insideBottom" />
        <Label value="Speed" offset={5} angle={-90} position="insideLeft" />
      </ScatterChart>
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const disc = payload[0].payload;
    return (
      <div className="custom-tooltip">
        <p>{`Disc Name: ${disc.name}`}</p>
        <p>{`Speed: ${disc.y}`}</p>
        <p>{`Stability: ${disc.x}`}</p>
      </div>
    );
  }
  return null;
};

export default DiscChart;