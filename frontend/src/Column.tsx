import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import Task from './Task';
import { Droppable } from 'react-beautiful-dnd';

const Container = styled.div`
margin: 8px;
border: 1px solid lightgrey;
border-radius: 2px;
width: 220px;
display: flex;
flex-direction: column;
`;

const Title = styled.h3`
padding: 8px;
`;

const TaskList = styled.div<{ isDraggingOver: boolean }>`
padding: 8px;
transition: background-color 0.2s ease;
background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
flex-grow: 1;
min-height: 100px;
`;

class InnerList extends React.Component<{ tasks: any }> {
  shouldComponentUpdate(nextProps) {
    if (nextProps === this.props.tasks) return false;
    return true;
  }
  render() {
    return this.props.tasks.map((t, i) => (
      <Task key={t.id} task={t} index={i} />
    ));
  }
}

function Column(props) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return (
    <Container>
      <Title>{props.column.title}</Title>
      <Droppable droppableId={props.column.id}>
        {(provided, snapshot) => (
          <TaskList ref={provided.innerRef} {...provided.droppableProps} isDraggingOver={snapshot.isDraggingOver}>
            <InnerList tasks={props.tasks} />
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </Container>
  );
}

export default Column;
