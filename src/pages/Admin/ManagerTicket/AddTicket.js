import { Alert, Button, Form, Input, Modal, Select, Upload, message } from "antd";
import { useEffect, useState } from "react";
import { roleAccount } from "../../../helper/roleAccount";
import { Option } from "antd/es/mentions";
import { checkEmail, checkExits, createTicket, getAccountList, getCostumerList, register } from "../../../Service/usersService";
import { generateToken } from "../../../helper/generateToken";
import { UploadOutlined } from "@ant-design/icons"

function AddTicket(props) {
    const { onReload } = props;
    const [open, setOpen] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await getCostumerList();
            setData(result);
        }
        fetchApi();
    }, []);
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setOpen(false);


    };
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };
    const formItemLayout = {
        labelCol: {
            flex: '100px'
        },
        wrapperCol: {
            flex: '300px'
        },

    };
    var curDate = new Date();
    const handleSubmit = async (values) => {
        const checkExitsEmail = await checkEmail("email", values.email);
        if (checkExitsEmail.length > 0) {
            console.log(checkExitsEmail[0].id)
            const options = {
                ...values,
                idcustomer:checkExitsEmail[0].id,
                name:checkExitsEmail[0].name,
                time: curDate,
            }
            const response = await createTicket(options);
            if (response) {
                onReload();
                console.log(response)
            }

        }
        form.resetFields();

    }
    return (
        <>
            <Button type='primary' style={{ marginBottom: '10px' }} onClick={showModal}>+ Thêm phiếu ghi</Button>
            <Modal
                title="Tạo phiếu ghi"
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                width={500}
                footer
            >
                <Form layout="horizontal" labelWrap colon={false} labelAlign="left" {...formItemLayout} onFinish={handleSubmit} form={form}>
                    <Form.Item
                        name="email"
                        label="Email người gửi"
                        hasFeedback
                        rules={[{ required: true, message: 'Lựa chọn tài khoản!' }]}
                    >
                        <Select placeholder="">
                            {data.map(item => (
                                <Option value={item.email} key={item.id}>{item.email}</Option>
                            ))}


                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Tiêu đề"
                        name="title"
                        rules={[
                            {
                                required: true,
                                message: 'Bắt buộc!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Mô tả"

                    >
                        <Input.TextArea showCount maxLength={9999999} rows={10} />
                    </Form.Item>
                    <Form.Item
                        name="image"
                        label="Ảnh"
                    >
                        <Upload >
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        name="image"
                        label="Ảnh"
                    >
                        <Upload >
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item label=" ">
                        <Button type="primary" htmlType="submit" onClick={handleCancel} >
                            Xác nhận
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
export default AddTicket;