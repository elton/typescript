import { Layout, Menu, message } from 'antd';
import { useCallback } from 'react';
import { HiAdjustments, HiCube, HiHome } from 'react-icons/hi';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import Box from './components/Component/Box';
import List from './components/Component/List';
import Props from './components/Component/Props';
import StatesMgt from './components/Component/StatesMgt';
import Todo from './components/Component/Todo';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Navigation from './components/Router/Navigation';
import Params from './components/Router/Params';
import LogoImg from './logo.svg';

const { Header, Sider, Content, Footer } = Layout;

interface MenuItem {
  key: string;
  icon?: JSX.Element;
  label: JSX.Element | string;
  link?: string;
  children?: MenuItem[];
}

function App() {
  const onListClick = useCallback((item: string) => {
    message.info(`You clicked ${item}`);
  }, []);

  const year = new Date().getFullYear();
  const selectedKey = useLocation().pathname;

  const items: MenuItem[] = [
    {
      key: '0',
      icon: <HiHome />,
      link: '/',
      label: <Link to='/'>首页</Link>,
    },
    {
      key: '1',
      icon: <HiCube />,
      label: '组件',
      children: [
        {
          key: '1-1',
          label: <Link to='/components/props'>Component Props</Link>,
          link: '/components/props',
        },
        {
          key: '1-2',
          label: <Link to='/components/box'>Children container</Link>,
          link: '/components/box',
        },
        {
          key: '1-3',
          label: <Link to='/components/todo'>Hooks Example:Todo</Link>,
          link: '/components/todo',
        },
        {
          key: '1-4',
          label: <Link to='/components/list'>Complex Properties</Link>,
          link: '/components/list',
        },
        {
          key: '1-5',
          label: <Link to='/components/states-mgt'>Component State</Link>,
          link: '/components/states-mgt',
        },
      ],
    },
    {
      key: '2',
      icon: <HiAdjustments />,
      label: '路由',
      children: [
        {
          key: '2-1',
          label: <Link to='/router/params/2'>Reading Parameters</Link>,
          link: '/router/params/2',
        },
        {
          key: '2-2',
          label: <Link to='/router/navigation'>Navigation</Link>,
          link: '/router/navigation',
        },
      ],
    },
  ];
  return (
    <Layout className='min-h-[100vh]'>
      <Sider>
        <Link to='/' className='flex items-end space-x-2 justify-center my-4'>
          <img src={LogoImg} alt='logo' className='w-6 h-6' />
          <span className='text-white'>TypeScript in React</span>
        </Link>
        <Menu
          mode='inline'
          // selectedKeys={highlight()}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          className='h-full'
          items={items}
        />
      </Sider>
      <Layout>
        <Header className='bg-white'></Header>
        <Content className='bg-white m-4 p-4'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route
              path='/components/props'
              element={<Props name='Elton' age={45} />}
            />
            <Route path='/components/box' element={<Box>Hello there</Box>} />
            <Route
              path='/components/list'
              element={
                <List items={['one', 'two', 'three']} onClick={onListClick} />
              }
            />
            <Route path='/components/todo' element={<Todo />} />
            <Route path='/components/states-mgt' element={<StatesMgt />} />
            <Route path='/router/params/:id' element={<Params />} />
            <Route path='/router/navigation' element={<Navigation />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Content>
        <Footer className='text-center'>&copy;{year} Created by PWK.INK</Footer>
      </Layout>
    </Layout>
  );
}

export default App;
