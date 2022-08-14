import { Button, Col, Form, Input, List, Row, Space, Typography } from 'antd';
import { useCallback, useReducer } from 'react';
const { Title, Paragraph } = Typography;

interface TodoItem {
  id: number;
  done: boolean;
  text: string;
}

type ActionType =
  | { type: 'ADD'; text: string }
  | { type: 'DELETE'; id: number };

const Todo: React.FunctionComponent = () => {
  const [todos, dispatch] = useReducer(
    (state: TodoItem[], action: ActionType) => {
      switch (action.type) {
        case 'ADD':
          return [
            ...state,
            { id: state.length + 1, done: false, text: action.text },
          ];
        case 'DELETE':
          return state.filter((todo) => todo.id !== action.id);
        default:
          return state;
      }
    },
    []
  );

  const onAddTodo = useCallback<({ todo }: { todo: string }) => void>(
    ({ todo }) => {
      console.log('Success:', todo);
      dispatch({ type: 'ADD', text: todo });
    },
    []
  );

  return (
    <>
      <Title>Hooks example: Todo</Title>
      <Paragraph>
        <Space direction='vertical' className='flex'>
          <List
            bordered
            dataSource={todos}
            renderItem={(item) => (
              <List.Item>
                <Row gutter={16}>
                  <Col span={18}>{item.text}</Col>
                  <Col span={6}>
                    <Button
                      type='primary'
                      danger
                      onClick={() => {
                        dispatch({ type: 'DELETE', id: item.id });
                      }}>
                      Remove
                    </Button>
                  </Col>
                </Row>
              </List.Item>
            )}
          />
          <Form
            name='todo'
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            onFinish={onAddTodo}>
            <Form.Item
              label='New Todo'
              name='todo'
              rules={[{ required: true, message: 'Please input a todo!' }]}>
              <Input type='text' placeholder='Add todo' />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
              <Button type='primary' htmlType='submit'>
                Add
              </Button>
            </Form.Item>
          </Form>
        </Space>
      </Paragraph>
    </>
  );
};

export default Todo;
