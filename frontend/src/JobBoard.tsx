import React, { useState } from 'react';
import { Layout, Menu, Button } from 'antd';
import styled from 'styled-components';
import {
  PlusOutlined,
  ShoppingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { DragDropContext } from 'react-beautiful-dnd';
import Step from './Step';

const { Header, Sider, Content } = Layout;

const Container = styled.div`
display: flex;
`;

const JobBoard: React.FC = () => {
  const testData = {
    candidates: {
      'candidate-1': { id: 'candidate-1', content: 'blah4' },
      'candidate-2': { id: 'candidate-2', content: 'blah3' },
      'candidate-3': { id: 'candidate-3', content: 'blah1' },
      'candidate-4': { id: 'candidate-4', content: 'blah2' },
    },
    steps: {
      'step-1': { id: 'step-1', title: 'ColBlah', candidateIds: ['candidate-1', 'candidate-2', 'candidate-3', 'candidate-4'] },
      'step-2': { id: 'step-2', title: 'Col2', candidateIds: []},
      'step-3': { id: 'step-3', title: 'Col3', candidateIds: []},
      'step-4': { id: 'step-4', title: 'Col3', candidateIds: []},
      'step-5': { id: 'step-5', title: 'Col3', candidateIds: []},
      'step-6': { id: 'step-6', title: 'Col3', candidateIds: []},
    },
    stepOrder: ['step-1', 'step-2', 'step-3', 'step-4', 'step-5', 'step-6'],
  };

  const [state, setState] = useState(testData);

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;
    if (!destination)
      return;
    if (destination.droppableId === source.droppableId &&
        destination.index === source.index)
      return;

    const start = state.steps[source.droppableId];
    const finish = state.steps[destination.droppableId];

    if (start === finish) {
      const newCandidateIds = Array.from(start.candidateIds);
      newCandidateIds.splice(source.index, 1);
      newCandidateIds.splice(destination.index, 0, draggableId);
      const newStep = {
        ...start,
        candidateIds: newCandidateIds,
      };
      const newState = {
        ...state,
        steps: {
          ...state.steps,
          [newStep.id]: newStep,
        },
      };
      setState(newState);
      return;
    }

    const startCandidateIds = Array.from(start.candidateIds);
    startCandidateIds.splice(source.index, 1);
    const newStart = {
      ...start,
      candidateIds: startCandidateIds,
    };

    const finishCandidateIds = Array.from(finish.candidateIds);
    finishCandidateIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      candidateIds: finishCandidateIds,
    };

    const newState = {
      ...state,
      steps: {
        ...state.steps,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    setState(newState);
  };

  return (
    <Layout style={{height: '100vh'}}>
      <Sider trigger={null} collapsed={true}>
        <div className="logo">
        </div>
        <Menu
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
        />
      </Sider>
      <Layout className="site-layout" style={{ display: 'inline-table' }}>
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
            minHeight: 280,
            minWidth: '100%',
          }}
        >
          <Container>
            <DragDropContext onDragEnd={onDragEnd}>
              {state.stepOrder.map(cid => {
                const step = state.steps[cid];
                const elems = step.candidateIds.map((tid: any) => state.candidates[tid]);
                return <Step key={cid} step={step} candidates={elems} />
              })}
            </DragDropContext>
          </Container>
        </Content>
      </Layout>
    </Layout>
  );
};

export default JobBoard;
