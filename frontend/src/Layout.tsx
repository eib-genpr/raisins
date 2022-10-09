import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Layout as AntLayout, Menu, Button, Dropdown } from 'antd';
import {
  PlusOutlined,
  ShoppingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import NewCandidateModal from './NewCandidateModal';
import NewJobModal from './NewJobModal';
import BottomBar from './BottomBar';
import { useQuery, gql } from '@apollo/client';

const { Header, Sider, Content } = AntLayout;

function Layout(props: any) {
  const location = useLocation();
  const navigate = useNavigate();
  const [newCandidateModalOpen, setNewCandidateModalOpen] = useState(false);
  const [newJobModalOpen, setNewJobModalOpen] = useState(false);

  const { loading, error, data, refetch } = useQuery(gql`{ allJobs { id, title, department {
    id,
    name
  }, tags {
    id
  }, description, requirements, country, city, street, zipCode, remote, employmentType, category, education, experience, minHours, maxHours, minSalary, maxSalary, resume, coverLetter, photo, phone, pipeline, candidateSet {
    id,
  }
  } }`);

  return (
    <>
      <NewCandidateModal open={newCandidateModalOpen} setOpen={setNewCandidateModalOpen} jobs={data?.allJobs} refetch={refetch} />
      <NewJobModal open={newJobModalOpen} setOpen={setNewJobModalOpen} departments={[...new Set(data?.allJobs.map((j) => j.department))]} jobs={data?.allJobs} refetch={refetch} />
      {props.children}
      <BottomBar setNewCandidateModalOpen={setNewCandidateModalOpen} setNewJobModalOpen={setNewJobModalOpen} />
    </>
  );
}

export default Layout;
