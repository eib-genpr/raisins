import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div<{ isDragging: boolean }>`
border: 1px solid lightgrey;
border-radius: 2px;
padding: 8px;
margin-bottom: 8px;
background-color: ${props => (props.isDragging ? 'lightgrey' : 'white')};
display: flex;
`;

function Candidate(props) {
  return (
    <Draggable draggableId={props.candidate.id} index={props.index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          {props.candidate.content}
        </Container>
      )}
    </Draggable>
  );
}

export default Candidate;
