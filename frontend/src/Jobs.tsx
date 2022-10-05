import { Tabs } from 'antd';
import { ThunderboltOutlined, FieldTimeOutlined } from '@ant-design/icons';

function Jobs() {
  const tabs = [
    { label: (<span><ThunderboltOutlined />Active</span>), key: 'active', children: 'Content 1' },
    { label: (<span><FieldTimeOutlined />Archived</span>), key: 'archived', children: 'Content 2' },
  ];

  return (
    <>
      <Tabs items={tabs}></Tabs>
      <div>Hello</div>
    </>
  )
}

export default Jobs;
