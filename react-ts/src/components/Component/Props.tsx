import { Typography } from 'antd';

const { Title, Paragraph } = Typography;
const Props = (user: User) => {
  return (
    <>
      <Title>Component Props</Title>
      <Paragraph>
        Hello {user.name}! {user.age && <>You are {user.age} years old.</>}
      </Paragraph>
    </>
  );
};

export default Props;
