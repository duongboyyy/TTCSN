import { Alert, Button, Form, Input, Modal, Select, Upload, message } from "antd";
import { useEffect, useState } from "react";
import { roleAccount } from "../../../helper/roleAccount";
import { Option } from "antd/es/mentions";
import { checkEmail, checkExits, createTicket, getAccountList, getCostumerList, register } from "../../../Service/usersService";
import { generateToken } from "../../../helper/generateToken";
import { UploadOutlined } from "@ant-design/icons"

function CreateTicket(props) {
    const { onReload ,item} = props;
    const [open, setOpen] = useState(false);
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
    var curDate = new Date();
    const formItemLayout = {
        labelCol: {
            flex: '110px'
        },
        wrapperCol: {
            flex: '400px'
        },

    };
    const handleSubmit = async (values) => {
        const data = {
            ...values,
            "idcustomer": item[0].id,
            "time": curDate,
            "name": item[0].name,
            "email": item[0].email,
            "response": ""
        }
        const response = await createTicket(data);
        if (response) {
            form.resetFields();
            onReload();
            handleCancel();
        }
        console.log(response);

    }
    return (
        <>
            <Button type='primary' style={{ marginBottom: '10px' }} onClick={showModal}>+ Thêm yêu cầu hỗ trợ</Button>
            <Modal
                title="Điền yêu cầu hỗ trợ"
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                width={500}
                footer
            >
                <Form name="create-ticket" layout="horizontal" onFinish={handleSubmit} {...formItemLayout} labelWrap colon={false} labelAlign="left" form={form}
                    autoComplete="off"
                >
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
                        label="Nội dung"
                        rules={[
                            {
                                required: true,
                                message: 'Bắt buộc!',
                            },
                        ]}
                    >
                        <Input.TextArea showCount maxLength={999999} rows={10} />
                    </Form.Item>
                    <Form.Item
                        name="image"
                        label="Ảnh"
                    >
                        <Upload>
                            <Button icon={<UploadOutlined />} >Tải ảnh lên</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        name="video"
                        label="Video"
                    >
                        <Upload >
                            <Button icon={<UploadOutlined />}>Tải video lên</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item label=" ">
                        <Button type="primary" htmlType="submit" >
                            Xác nhận
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
export default CreateTicket;