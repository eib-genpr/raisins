import { Modal, Form, Input, Select } from 'antd';

function NewJobModal(props: any) {
  const [form] = Form.useForm();

  const onFinish = (values) => {
  };

  const onFinishFailed = () => {

  };

  return (
    <Modal
      title="New job"
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
        <div style={{ display: 'grid', gridTemplateColumns: '50% 50%', gap: '10px' }}>
          <div>
            <Form.Item
              name="title"
              rules={[{ required: true, message: 'Please enter the title' }]}
              style={{ display: 'inline-block', width: '100%' }}
            >
              <Input placeholder="Title" />
            </Form.Item>
          </div>

          <div>
            <Form.Item
              name="department"
              rules={[{ required: false }]}
              style={{ display: 'inline-block', width: '100%' }}
            >
              <Select
                placeholder="Department"
                allowClear
              >
                {props?.departments?.map((d) => (
                  <Select.Option value={d.id}>{d.name}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          <div>
            <Form.Item
              name="phone"
              rules={[{ required: false }]}
              style={{ display: 'inline-block', width: '100%' }}
            >
              <Input placeholder="Phone number" />
            </Form.Item>
          </div>



        </div>

      </Form>
    </Modal>
  )
}

export default NewJobModal;
