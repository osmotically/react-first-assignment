import React, { useState } from 'react';
import { Avatar, Layout, Menu } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  LoginOutlined,
} from '@ant-design/icons';
import AppNavItem from './enum/AppNav';
import './App.css';

const { Content, Footer, Sider } = Layout;

function App() {
  const params = new URLSearchParams(window.location.search);
  const [collapsed, setCollapsed] = useState(false);
  const [menu, setMenu] = useState(params.get('menu') ?? AppNavItem.HOMEPAGE);

  let content = (
    <>Main page</>
  );
  if (menu === AppNavItem.LOGIN) {
    content = (
      <>Login page</>
    );
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <Menu theme="dark" onClick={(e) => {
          setMenu(e.key);
          params.set('menu', e.key);
          window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
        }} defaultSelectedKeys={[menu]} mode="inline" >
          <div style={{ margin: '16px' }}>
            <Avatar icon={<UserOutlined />} style={{ margin: '0 8px' }} />
            {collapsed ? null : 'Please sign in'}
          </div>
          <Menu.Item key={AppNavItem.HOMEPAGE} icon={<HomeOutlined />}>
            Homepage
          </Menu.Item>
          <Menu.Item key={AppNavItem.LOGIN} icon={<LoginOutlined />}>
            Sign In
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content>
          <div className="site-layout-background" style={{ padding: '24px', minHeight: '360px' }}>
            {content}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Created by Osmotically</Footer>
      </Layout>
    </Layout>
  );
}

export default App;
