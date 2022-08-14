import { Typography } from 'antd';

const { Title, Paragraph } = Typography;
const Props: React.FunctionComponent<{ name: string; age: number }> = ({
  name,
  age,
}: User) => {
  return (
    <>
      <Title>Component Props</Title>
      <Paragraph>
        Hello {name}! {age && <>You are {age} years old.</>}
      </Paragraph>
    </>
  );
};

export default Props;
