import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useQuery, gql } from '@apollo/client';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Candidates chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: 'Candidates',
      data: labels.map(() => 50),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

function Dashboard() {
  const { loading, error, data: gqlData, refetch } = useQuery(gql`{
    allCandidates {
        id
        fullname
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
      createdAt
    }
  }`);

  return (
    <div style={{ height: '500px' }}>
      <Line options={options} data={data} />
    </div>
  );
}

export default Dashboard;
