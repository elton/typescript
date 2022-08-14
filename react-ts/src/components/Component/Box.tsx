import { Typography } from 'antd';
const { Title, Paragraph } = Typography;

const Box: React.FunctionComponent<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      <Title>Children container</Title>
      <Paragraph>{children}</Paragraph>
    </>
  );
};

export default Box;
