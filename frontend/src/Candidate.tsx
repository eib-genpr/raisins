import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import { useQuery, gql } from '@apollo/client';
import Step from './Step';

const Container = styled.div`
display: flex;
`;

const Candidate: React.FC = (props: any) => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(gql`query getCandidate($candidateId: ID!) {
    candidateById(id: $candidateId) {
      id
      fullname
      email
      phone
      jobs {
        id
        title
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
  }`, {variables: {candidateId: id}});

  return (
    <>{id}</>
  );
};

export default Candidate;
