import { Modal, Form, Input, Select, Avatar, Button, Upload, message } from 'antd';
import { UserOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

const AvatarStyled = styled.div`
*:hover {
  background-color: green;
  pointer: cursor;
}
`;

function NewCandidateModal(props: any) {
  const [form] = Form.useForm();
  const [steps, setSteps] = useState([]);
  const [chosenJob, setChosenJob] = useState('');
  const [uploading, setUploading] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);

  useEffect(() => {
    if (chosenJob.length)
    setSteps(JSON.parse(props.jobs.filter((j) => j.id === chosenJob)[0].pipeline));
  }, [chosenJob]);

  const handleUpload = (file) => {
    const formData = new FormData();
    formData.append('file', file as RcFile);
    console.log(file.name.split('.').pop());
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

  const onFinish = () => {

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
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Upload {...uploadProps}><Button loading={uploading} type='primary' icon={<UploadOutlined />}>Upload CV</Button></Upload>
        {fileUploaded && <span style={{ color: 'darkgreen' }}>CV is attached</span>}
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'center' }}>
          <AvatarStyled>
            <Avatar size={64} icon={<UserOutlined />} style={{  }} />
          </AvatarStyled>
          <Form.Item
            style={{ width: '25%', paddingLeft: '10px' }}
            label="First name"
            name="First name"
            rules={[{ required: true, message: 'Please enter first name' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            style={{ width: '25%', paddingLeft: '10px' }}
            label="Last name"
            name="Last name"
            rules={[{ required: true, message: 'Please enter last name'}]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            style={{ width: '25%', paddingLeft: '10px' }}
            label="Middle name"
            name="Middle name"
            rules={[{ required: false }]}
          >
            <Input />
          </Form.Item>

          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'baseline' }}>
            <PhoneOutlined style={{ paddingLeft: '10px' }}/>
            <Form.Item
              style={{ width: '30%', paddingLeft: '10px' }}
              label="Phone"
              name="Phone"
              rules={[{ required: false }]}
            >
              <Input />
            </Form.Item>

            <MailOutlined style={{ paddingLeft: '10px' }}/>
            <Form.Item
              style={{ width: '30%', paddingLeft: '10px' }}
              label="Email"
              name="Email"
              rules={[{ required: false }]}
            >
              <Input />
            </Form.Item>
          </div>
        </div>
        <div>
          <Form.Item name="job" label="Job" rules={[{ required: false }]} style={{ width: '50%' }}>
            <Select
              placeholder="Select a job"
              onChange={onJobChange}
              allowClear
            >
              {props?.jobs?.map((j) => (
                <Select.Option value={j.id}>{j.title}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          {chosenJob.length && 
            <Select
              placeholder="Select a step"
              onChange={onStepChange}
              allowClear
            >
              {steps?.map((s) => (
                <Select.Option value={s}>{s}</Select.Option>
              ))}
            </Select>
          }

        </div>
      </Form>
    </Modal>
  )
}

export default NewCandidateModal;
