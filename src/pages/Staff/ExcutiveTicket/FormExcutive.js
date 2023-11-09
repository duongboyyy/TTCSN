import { Button, Form, Input, Modal, Upload } from "antd";
import { useState } from "react";
import { UploadOutlined } from "@ant-design/icons"
import { createTicket, responseTicket } from "../../../Service/usersService";
import { getCookie } from "../../../helper/cookie";
function FormExcutive(props) {
    const email = getCookie("email");
    const [form] = Form.useForm();
    const { record } = props;
    const [open, setOpen] = useState(false);
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
            ...record,
            response:{
                ...values,
                time: curDate,
                email:email
            }
        }
        const response = await responseTicket(record.id,data);
        if (response) {
            form.resetFields();
        }
        console.log(response);
    }
    return (
        <>
            <Button type="link" onClick={showModal}>Xử lí phiếu ghi</Button>
            <Modal
                title="Xử lí phiếu ghi"
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                width={1000}
            >
                <div className="header-form">
                    <h2 className="header-form__title">{record.title}</h2>
                    <span>{record.name}</span><span>{record.time}</span>
                    <div>{record.email}</div>
                </div>
                <div className=" main-from">
                    <p>{record.description}</p>
                    <img src={record.image}></img>
                </div>

                <div className="input">
                    <Form name="create-ticket" layout="horizontal" onFinish={handleSubmit} {...formItemLayout} labelWrap colon={false} labelAlign="left"
                        autoComplete="off" form={form}
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
                </div>
            </Modal>
        </>
    )

}
export default FormExcutive;