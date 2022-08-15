import { Button, Space, Typography } from 'antd';
import { useEffect, useState } from 'react';

const { Title, Paragraph, Text } = Typography;

const StatesMgt: React.FunctionComponent = () => {
  const [state, setState] = useState<State>({ count: 0 });

  useEffect(() => {
    if (state.count <= 0) {
      setState({ count: 0 });
    }
  }, [state.count]);

  return (
    <>
      <Title>Component State</Title>
      <Paragraph>
        count: <Text code>{state.count}</Text>
      </Paragraph>
      <Space>
        <Button
          type='primary'
          shape='circle'
          onClick={() => setState((state) => ({ count: state.count + 1 }))}>
          +
        </Button>
        <Button
          type='primary'
          shape='circle'
          onClick={() => setState((state) => ({ count: state.count - 1 }))}>
          -
        </Button>
      </Space>
    </>
  );
};

export default StatesMgt;
