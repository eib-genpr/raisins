import { Modal, Form, Input } from 'antd';

function NewCandidateModal(props: any) {
  const [form] = Form.useForm();

  const onFinish = () => {

  };

  const onFinishFailed = () => {

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
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        <Form.Item
          style={{ width: '33%' }}
          label="First name"
          name="First name"
          rules={[{ required: true, message: 'Please enter first name' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={{ width: '33%' }}
          label="Last name"
          name="Last name"
          rules={[{ required: true, message: 'Please enter last name'}]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={{ width: '33%' }}
          label="Middle name"
          name="Middle name"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>

        </div>
      </Form>
    </Modal>
  )
}

export default NewCandidateModal;
