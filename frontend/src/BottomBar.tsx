import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Button, Tooltip } from 'antd';
import { ShoppingOutlined, UserOutlined, HomeOutlined } from '@ant-design/icons';

const Bar = styled.div`
position: fixed;
height: 45px;
width: 410px;
max-width: 100%;
left: 50%;
transform: translateX(-50%);
bottom: 5%;
background-color: lightgrey;
border-radius: 50px;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
color: white;
font-weight: 500;
z-index: 2;
`;

function BottomBar(props: any) {
  const navigate = useNavigate();

  return (
    <Bar>
      <Tooltip title="Dashboard">
        <Button icon={<HomeOutlined />} shape="circle" onClick={() => navigate('/dashboard')} />
      </Tooltip>
      &nbsp;
      <Tooltip title="Jobs">
        <Button icon={<ShoppingOutlined />} shape="circle" onClick={() => navigate('/jobs')} />
      </Tooltip>
      &nbsp;
      <Tooltip title="Candidates">
        <Button icon={<UserOutlined />} shape="circle" onClick={() => navigate('/candidates')} />
      </Tooltip>
    </Bar>
  );
}

export default BottomBar;
