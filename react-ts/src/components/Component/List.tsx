import { Typography } from 'antd';
const { Title, Paragraph } = Typography;

const List: React.FunctionComponent<{
  items: string[];
  onClick?: (item: string) => void;
}> = ({ items, onClick }) => {
  return (
    <>
      <Title>Complex Properties</Title>
      <Paragraph>
        <ul>
          {items.map((item, index) => (
            <li key={index} onClick={() => onClick?.(item)}>
              {item}
            </li>
          ))}
        </ul>
      </Paragraph>
    </>
  );
};

export default List;
