import { Typography } from 'antd';
import { useParams } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const Params = () => {
  const params = useParams();
  return (
    <>
      <Title>Reading parameter</Title>
      <Paragraph>Params: {params.id}</Paragraph>
    </>
  );
};

export default Params;
