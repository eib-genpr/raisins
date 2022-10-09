import { useEffect, useState } from 'react';
import NewCandidateModal from './NewCandidateModal';
import NewJobModal from './NewJobModal';
import BottomBar from './BottomBar';
import { useQuery, gql } from '@apollo/client';

function Layout(props: any) {
  const [newCandidateModalOpen, setNewCandidateModalOpen] = useState(false);
  const [newJobModalOpen, setNewJobModalOpen] = useState(false);
  const [users, setUsers] = useState([]);

  const { loading, error, data, refetch } = useQuery(gql`{ allJobs { id, title, department {
    id,
    name
  }, tags {
    id
  }, description, requirements, country, city, street, zipCode, remote, employmentType, category, education, experience, minHours, maxHours, minSalary, maxSalary, resume, coverLetter, photo, phone, pipeline, candidateSet {
    id,
  }
  } }`);

  useEffect(() => {
    const getUsers = async () => {
      const response = await (await fetch(process.env.REACT_APP_API_URL + '/auth/users/', {
        method: 'GET',
        headers: { 'Authorization': 'JWT ' + localStorage.getItem('access')}
      })).json();
      setUsers(response.results);
      console.log(response);
    }
    getUsers();
  }, []);

  return (
    <>
      <NewCandidateModal open={newCandidateModalOpen} setOpen={setNewCandidateModalOpen} jobs={data?.allJobs} refetch={refetch} />
      <NewJobModal open={newJobModalOpen} setOpen={setNewJobModalOpen} departments={[...new Set(data?.allJobs.map((j) => j.department))]} jobs={data?.allJobs} users={users} refetch={refetch} />
      {props.children}
      <BottomBar setNewCandidateModalOpen={setNewCandidateModalOpen} setNewJobModalOpen={setNewJobModalOpen} />
    </>
  );
}

export default Layout;
