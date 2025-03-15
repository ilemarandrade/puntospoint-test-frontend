import { Payload } from 'recharts/types/component/DefaultLegendContent';

interface ILegendProps {
  legends: Array<Payload>;
}

const Legend: React.FC<ILegendProps> = ({ legends }) => {
  return (
    <ul className="flex gap-2 flex-wrap justify-center">
      {legends.map((item) => (
        <li
          className="flex recharts-legend-item legend-item-8 justify-center items-center gap-1"
          key={item.value}
        >
          <div
            className={`w-4 h-4 `}
            style={{
              backgroundColor: item.color,
              height: item.type === 'square' ? '16px' : '3px',
              borderRadius: item.type === 'square' ? '0px' : '50px',
            }}
          ></div>
          <span className="text-xs">{item.value}</span>
        </li>
      ))}
    </ul>
  );
};

export default Legend;
