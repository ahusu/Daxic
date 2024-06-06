import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, LabelList, Label, Cell } from 'recharts';

const Chart: React.FC = () => {
  const menu = useSelector((state: RootState) => state.menu.menu);

  const data = menu.map((bag) => ({
    x: bag.weight,
    y: bag.price,
    tag: bag.tag,
    name: bag.name,
  }));

  const renderCustomizedShape = (props: any) => {
    const { cx, cy, payload } = props;
    return (
      <circle cx={cx} cy={cy} r={10} fill={payload.color} />
    );
};

  const dataMaxY = Math.max(...data.map((bag) => bag.y));
  return (
    <div className="w-full h-full">
      <ScatterChart width={400} height={800} margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis
          type="number"
          dataKey="x"
          name="Weight"
          domain={['dataMax', 'dataMin']}
          tickFormatter={(tick: number) => Math.round(tick).toString()}
        />
        <YAxis type="number" dataKey="y" name="Price" domain={[0, 14]} tickCount={Math.ceil(dataMaxY / 2)} />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
        <Scatter name="Bags" data={data} shape={renderCustomizedShape}>
          {
            data.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.tag} />)
          }
          <LabelList dataKey="name" position="top" /> {}
        </Scatter>
        <Label value="Weight" offset={0} position="insideBottom" />
        <Label value="Price" offset={5} angle={-90} position="insideLeft" />
      </ScatterChart>
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const bag = payload[0].payload;
    return (
      <div className="custom-tooltip">
        <p>{`Name: ${bag.name}`}</p>
        <p>{`Price: ${bag.y}`}</p>
        <p>{`Weight: ${bag.x}`}</p>
      </div>
    );
  }
  return null;
};

export default Chart;