import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import Avatar from './Avatar';

const Container = styled.div<{ isDragging: boolean }>`
border: 1px solid green;
border-radius: 2px;
padding: 8px;
margin-bottom: 8px;
background-color: ${props => (props.isDragging ? 'skyblue' : 'white')};
border-radius: 5px;
display: flex;
align-items: center;
`;

function CandidateDraggable(props) {
  return (
    <Draggable draggableId={props.candidate.id} index={props.index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <Avatar userId={props.candidate.id} size={2} text={`${props.candidate.content.name[0]}${props.candidate.content.surname[0]}`}></Avatar>
          {props.candidate.content.name} {props.candidate.content.surname}
        </Container>
      )}
    </Draggable>
  );
}

export default CandidateDraggable;
