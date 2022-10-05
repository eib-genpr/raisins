import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'antd/dist/antd.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Login';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import reportWebVitals from './reportWebVitals';
import JobBoard from './JobBoard';
import Jobs from './Jobs';
import Layout from './Layout';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/job/:id" element={<JobBoard />} />
          <Route path="/jobs" element={<Jobs />} />
        </Routes>
      </Layout>
    </Router>
    <ToastContainer />
  </React.StrictMode>
);

reportWebVitals();
