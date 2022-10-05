import { useLocation } from 'react-router-dom';
import { Layout as AntLayout, Menu, Button } from 'antd';
import {
  PlusOutlined,
  ShoppingOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = AntLayout;

function Layout(props: any) {
  const location = useLocation();

  return (
    <AntLayout style={{height: '100vh'}}>
      <Sider trigger={null} collapsed={true} style={{ height: '100vh' }}>
        <div className="logo">
        </div>

        {location.pathname !== '/' &&
        <Menu
          style={{ height: '100vh' }}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <ShoppingOutlined />,
              label: 'Jobs',
            },
            {
              key: '2',
              icon: <UserOutlined />,
              label: 'Candidates',
            },
          ]}
        />}
      </Sider>
      <AntLayout className="site-layout" style={{ display: 'inline-table' }}>
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <Button type="primary" icon={<PlusOutlined />} style={{ marginLeft: '10px' }}>
            New
          </Button>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            height: '100vh',
            width: '100%',
          }}
        >
          {props.children}
        </Content>
      </AntLayout>
    </AntLayout>
  );
}

export default Layout;
