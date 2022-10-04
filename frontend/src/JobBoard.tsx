import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { DragDropContext, Droppable, DroppableProvided, Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Column from './Column';

const { Header, Sider, Content } = Layout;

const Container = styled.div`
display: flex;
`;

const JobBoard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);

  const testData = {
    tasks: {
      'task-1': { id: 'task-1', content: 'blah4' },
      'task-2': { id: 'task-2', content: 'blah3' },
      'task-3': { id: 'task-3', content: 'blah1' },
      'task-4': { id: 'task-4', content: 'blah2' },
    },
    columns: {
      'column-1': { id: 'column-1', title: 'ColBlah', taskIds: ['task-1', 'task-2', 'task-3', 'task-4'] },
      'column-2': { id: 'column-2', title: 'Col2', taskIds: []},
      'column-3': { id: 'column-3', title: 'Col3', taskIds: []},
    },
    columnOrder: ['column-1', 'column-2', 'column-3'],
  };

  const [state, setState] = useState(testData);

  const onDragStart = () => {
    document.body.style.color = 'orange';
    document.body.style.transition = 'background-color 0.2s ease';
  };

  const onDragUpdate = (update: any) => {
    const { destination } = update;
    const opacity = destination ? destination.index / Object.keys(state.tasks).length : 0;
    document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity}`;
  };

  const onDragEnd = (result: any) => {
    document.body.style.color = 'inherit';
    document.body.style.backgroundColor = 'inherit';
    const { destination, source, draggableId } = result;
    if (!destination)
      return;
    if (destination.droppableId === source.droppableId &&
        destination.index === source.index)
      return;

    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      const newCol = {
        ...start,
        taskIds: newTaskIds,
      };
      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newCol.id]: newCol,
        },
      };
      setState(newState);
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    setState(newState);
  };

  return (
    <Layout style={{height: '100vh'}}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'nav 1',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'nav 2',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'nav 3',
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <Container>
            <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart} onDragUpdate={onDragUpdate}>
              {state.columnOrder.map(cid => {
                const col = state.columns[cid];
                const elems = col.taskIds.map(tid => state.tasks[tid]);
                return <Column key={cid} column={col} tasks={elems} />
              })}
            </DragDropContext>
          </Container>
        </Content>
      </Layout>
    </Layout>
  );
};

export default JobBoard;
