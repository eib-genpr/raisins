import { Tabs, Card, Table } from 'antd';
import { ThunderboltOutlined, FieldTimeOutlined } from '@ant-design/icons';
import { useQuery, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TimeAgo from 'javascript-time-ago';
import { useEffect } from 'react';
import en from 'javascript-time-ago/locale/en'

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
background-color: #F3F3F3;
width: 100%;
height: 100vh;
`;

TimeAgo.addDefaultLocale(en)

function CandidatesTable() {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(gql`{
    allCandidates {
        id
      name
      surname
      middlename
      email
      phone
      jobs {
        id
        title
        pipeline
      }
      address
      salaryExpectation
      timezone
      steps {
        id
        job {
          id
          title
        }
        step
      }
    }
  }`);

  const columns = [
    {
      title: 'Full name',
      key: 'title',
      render: e => {
        return <>{e.name} {e.surname}</>
      }
    },
      {
      title: 'Jobs',
      key: 'jobs',
      render: e => {
        return <>{e.jobs[0].title}</> 
      }
    },
    {
      title: 'Stage',
      key: 'stage',
      render: e => {
        return <>{e?.jobs?.[0]?.pipeline && JSON.parse(e.jobs[0].pipeline)[e.steps[0].step]}</>
      }
    },
  ];

  const tabs = [
    {
      label: (<span><ThunderboltOutlined />Active</span>),
      key: 'active',
      children: <Table dataSource={data?.allCandidates} columns={columns} onRow={(record, index) => {
        return {
          onClick: (e) => navigate('/job/' + record.id),
        };
      }}></Table>
    },
    { label: (<span><FieldTimeOutlined />Archived</span>), key: 'archived', children: 'Content 2' }
  ];

  if (loading)
    return <span>Loading...</span>

  return (
    <>
      <Tabs items={tabs}></Tabs>
    </>
  )
}

export default CandidatesTable;
