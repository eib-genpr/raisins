import { Modal, Form, Input, Select, Avatar, Button, Upload, message } from 'antd';
import { PhoneOutlined, MailOutlined, UserOutlined, ShoppingOutlined, CloseOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { PlusOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Tag, Tooltip } from 'antd';
import React, { useRef } from 'react';

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
  const [resumeFilename, setResumeFilename] = useState(null);
  const [tags, setTags] = useState<string[]>([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState('');
  const inputRef = useRef<InputRef>(null);
  const editInputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  useEffect(() => {
    editInputRef.current?.focus();
  }, [inputValue]);

  const handleClose = (removedTag: string) => {
    const newTags = tags.filter(tag => tag !== removedTag);
    console.log(newTags);
    setTags(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue('');
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditInputValue(e.target.value);
  };

  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    setTags(newTags);
    setEditInputIndex(-1);
    setInputValue('');
  };

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
      setResumeFilename(r.filename);
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
    let response = await fetch(process.env.REACT_APP_API_URL + '/candidates/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({...values, resume_filename: resumeFilename}),
    });
    if (response.status === 201) {
      props.refetch();
      message.success('Candidate created successfully');
    } else
      message.error('Failed to create the candidate');
  };

  const onFinishFailed = () => {

  };

  const onJobChange = (value: string) => {
    setChosenJob(value);
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
            {resumeFilename && (<>
              <span style={{ color: 'darkgreen' }}>CV is attached <CloseOutlined onClick={() => setResumeFilename(null)}/></span>
            </>)}
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
                allowClear
              >
                {steps?.map((s, i) => (
                  <Select.Option value={i}>{s}</Select.Option>
                ))}
              </Select>
            </Form.Item>


          </div>

          <div>

            <div style={{ width: '100%' }}>            {inputVisible && (
              <Input
                ref={inputRef}
                type="text"
                size="small"
                style={{ width: '100%' }}
                className="tag-input"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputConfirm}
                onPressEnter={handleInputConfirm}
              />
            )}
            {!inputVisible && (
              <Tag className="site-tag-plus" onClick={showInput} style={{ width: '100%' }}>
                <PlusOutlined /> New Tag
              </Tag>
            )}
</div>

            {tags.map((tag, index) => {
              if (editInputIndex === index) {
                return (
                  <Input
                    ref={editInputRef}
                    key={tag}
                    size="small"
                    className="tag-input"
                    value={editInputValue}
                    onChange={handleEditInputChange}
                    onBlur={handleEditInputConfirm}
                    onPressEnter={handleEditInputConfirm}
                  />
                );
              }

              const isLongTag = tag.length > 20;

              const tagElem = (
                <Tag
                  className="edit-tag"
                  key={tag}
                  closable={true}
                  onClose={() => handleClose(tag)}
                >
                  <span
                    onDoubleClick={e => {
                      if (index !== 0) {
                        setEditInputIndex(index);
                        setEditInputValue(tag);
                        e.preventDefault();
                      }
                    }}
                  >
                    {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                  </span>
                </Tag>
              );
              return isLongTag ? (
                <Tooltip title={tag} key={tag}>
                  {tagElem}
                </Tooltip>
              ) : (
              tagElem
              );
            })}
          </div>



        </div>
      </Form>
    </Modal>
  )
}

export default NewCandidateModal;
