import { Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const Navigation = () => {
  const navigation = useNavigate();
  const id = Math.floor(Math.random() * 100);
  return (
    <>
      <Title>Navigation</Title>
      <Button type='primary' onClick={() => navigation(`/router/params/${id}`)}>
        Go to params with id ( a random number )
      </Button>
    </>
  );
};

export default Navigation;
