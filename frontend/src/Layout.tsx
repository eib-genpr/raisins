import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Layout as AntLayout, Menu, Button, Dropdown } from 'antd';
import {
  PlusOutlined,
  ShoppingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import NewCandidateModal from './NewCandidateModal';
import { useQuery, gql } from '@apollo/client';

const { Header, Sider, Content } = AntLayout;

function Layout(props: any) {
  const location = useLocation();
  const navigate = useNavigate();
  const [newCandidateModalOpen, setNewCandidateModalOpen] = useState(false);

  const { loading, error, data } = useQuery(gql`{ allJobs { id, title, department {
    id
  }, tags {
    id
  }, description, requirements, country, city, street, zipCode, remote, employmentType, category, education, experience, minHours, maxHours, minSalary, maxSalary, resume, coverLetter, photo, phone, pipeline, candidateSet {
    id,
  }
  } }`);


  const onMenuSelected = ({ key }) => {
    if (key === '/jobs')
      navigate('/jobs');
  };

  const newMenu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <a target="_blank" rel="noopener noreferrer" onClick={() => setNewCandidateModalOpen(true)}>
              Candidate
            </a>
          ),
          icon: <UserOutlined />
        },
        {
          key: '2',
          label: (
            <a target="_blank" rel="noopener noreferrer">
              Job
            </a>
          ),
          icon: <ShoppingOutlined />
        },
      ]}
    />
  );

  return (<>
    <NewCandidateModal open={newCandidateModalOpen} setOpen={setNewCandidateModalOpen} jobs={data?.allJobs} />
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
          selectedKeys={[location.pathname]}
          onSelect={onMenuSelected}
          items={[
            {
              key: '/jobs',
              icon: <ShoppingOutlined />,
              label: 'Jobs',
            },
            {
              key: '/candidates',
              icon: <UserOutlined />,
              label: 'Candidates',
            },
          ]}
        />}
      </Sider>
      <AntLayout className="site-layout" style={{ display: 'inline-table' }}>
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <Dropdown overlay={newMenu}>
            <Button type="primary" icon={<PlusOutlined />} style={{ marginLeft: '10px' }}>
              New
            </Button>
          </Dropdown>
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
  </>
         );
}

export default Layout;
