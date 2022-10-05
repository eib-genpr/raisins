import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import { useQuery, gql } from '@apollo/client';
import Step from './Step';

const Container = styled.div`
display: flex;
`;

const JobBoard: React.FC = (props: any) => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(gql`query getJob($jobId: ID!) {
    jobById(id: $jobId) {
      id
      title
      department {
        id
      }
      tags {
        id
      }
      description
      requirements
      country
      city
      street
      zipCode
      remote
      employmentType
      category
      education
      experience
      minHours
      maxHours
      minSalary
      maxSalary
      resume
      coverLetter
      photo
      phone
      pipeline
      candidateSet {
        id
        name
        surname
        steps {
          id
          step
          candidate {
            id
          }
          job {
            id
          }
        }
      }
    }
  }`, {variables: {jobId: id}});

  /*
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
*/

  const [state, setState] = useState<any>({});

  useEffect(() => {
    if (data) {
      const newState = {candidates: {}, steps: {}, stepOrder: []};
      const pipeline = JSON.parse(data.jobById.pipeline);
      newState.stepOrder = pipeline;
      let steps = {};
      for (let step of pipeline)
        steps[step] = { id: step, title: step, candidateIds: [] };
      newState.steps = steps;

      let candidates = {};
      for (let candidate of data.jobById.candidateSet)
        candidates[candidate.id] = { id: candidate.id, content: candidate.name + ' ' + candidate.surname };
      newState.candidates = candidates;

      for (let candidate of data.jobById.candidateSet)
        for (let step of candidate.steps)
          newState.steps[Object.keys(newState.steps)[step.step]].candidateIds.push(candidate.id);

      setState(newState);
    }
  }, [data]);

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
    <Container>
      <DragDropContext onDragEnd={onDragEnd}>
        {state.stepOrder?.map(cid => {
          const step = state.steps[cid];
          const elems = step?.candidateIds.map((tid: any) => state.candidates[tid]);
          return <Step key={cid} step={step} candidates={elems} />
        })}
      </DragDropContext>
    </Container>
  );
};

export default JobBoard;
