import { Modal, Form, Input, Select, Avatar, Button, Upload, message } from 'antd';
import { PhoneOutlined, MailOutlined, UserOutlined, ShoppingOutlined,  EnvironmentOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

const AvatarStyled = styled.div`
*:hover {
  background-color: green;
  pointer: cursor;
}
margin-bottom: 8px;
`;

function NewCandidateModal(props: any) {
  const [form] = Form.useForm();
  const [steps, setSteps] = useState([]);
  const [chosenJob, setChosenJob] = useState('');
  const [uploading, setUploading] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);

  useEffect(() => {
    if (chosenJob?.length)
      setSteps(JSON.parse(props.jobs.filter((j) => j.id === chosenJob)[0].pipeline));
  }, [chosenJob]);

  const handleUpload = (file) => {
    const formData = new FormData();
    formData.append('file', file as RcFile);
    if (['pdf', 'doc', 'docx'].includes(file.name.split('.').pop().toLowerCase()) === false) {
      message.error('Only PDF, DOC, and DOCX files are allowed');
      return;
    }
    setUploading(true);
    fetch(process.env.REACT_APP_API_URL + '/resume/' + file.name, {
      method: 'PUT',
      body: formData,
    })
    .then(res => res.json())
    .then((r) => {
      message.success('Uploaded successfully');
      setFileUploaded(true);
    })
    .catch((e) => {
      message.error('Upload failed');
    })
    .finally(() => {
      setUploading(false);
    });
  };

  const uploadProps: UploadProps = {
    onRemove: file => {
    },
    beforeUpload: file => {
      handleUpload(file);
      return false;
    },
    fileList: [],
  };

  const onFinish = async (values) => {
    const response = await fetch(process.env.REACT_APP_API_URL + '/candidates/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    if (response.status === 201)
      message.success('Candidate created successfully');
    else
      message.error('Failed to create the candidate');
  };

  const onFinishFailed = () => {

  };

  const onJobChange = (value: string) => {
    setChosenJob(value);
  };

  const onStepChange = () => {

  };

  return (
    <Modal
      title="New candidate"
      centered
      open={props.open}
      onOk={() => {
        form.submit();
        props.setOpen(false)
      }}
      onCancel={() => {
        form.resetFields();
        props.setOpen(false)
      }}
      width={1000}
    >
      <Form
        name="basic"
        form={form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div style={{ display: 'grid', gridTemplateColumns: '20% 40% 40%', gap: '10px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gridRow: '1/3' }}>
            <AvatarStyled>
              <Avatar size={64} icon={<UserOutlined />} style={{  }} />
            </AvatarStyled>
            <Upload {...uploadProps}><Button loading={uploading} type='primary' icon={<UploadOutlined />}>Upload CV</Button></Upload>
            {fileUploaded && <span style={{ color: 'darkgreen' }}>CV is attached</span>}
          </div>

          <div>
            <UserOutlined style={{marginTop: '8px', marginRight: '4px' }} />
            <Form.Item
              name="fullname"
              rules={[{ required: true, message: 'Please enter the full name' }]}
              style={{ display: 'inline-block', width: '90%' }}
            >
              <Input placeholder="Full name" />
            </Form.Item>
          </div>

          <div>
            <MailOutlined style={{ marginTop: '8px', marginRight: '4px' }}/>
            <Form.Item
              name="email"
              rules={[{ required: false }]}
              style={{ display: 'inline-block', width: '90%' }}
            >
              <Input placeholder="Email" />
            </Form.Item>
          </div>

          <div>
            <PhoneOutlined style={{ marginTop: '8px', marginRight: '4px' }}/>
            <Form.Item
              name="phone"
              rules={[{ required: false }]}
              style={{ display: 'inline-block', width: '90%' }}
            >
              <Input placeholder="Phone number" />
            </Form.Item>
          </div>



          <div>
            <ShoppingOutlined style={{ marginTop: '8px', marginRight: '4px' }} />
            <Form.Item
              name="job"
              rules={[{ required: false }]}
              style={{ display: 'inline-block', width: '45%' }}
            >
              <Select
                placeholder="Job"
                onChange={onJobChange}
                allowClear
              >
                {props?.jobs?.map((j) => (
                  <Select.Option value={j.id}>{j.title}</Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="stage"
              rules={[{ required: false }]}
              style={{ display: 'inline-block', width: '45%' }}
            >
              <Select
                placeholder="Stage"
                disabled={!!!chosenJob?.length}
                onChange={onStepChange}
                allowClear
              >
                {steps?.map((s) => (
                  <Select.Option value={s}>{s}</Select.Option>
                ))}
              </Select>
            </Form.Item>

          </div>
        </div>
      </Form>
    </Modal>
  )
}

export default NewCandidateModal;
