import { Modal, Form } from 'antd';

function NewJobModal(props: any) {
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
        Hello
      </Form>
    </Modal>
  )
}

export default NewJobModal;
