import { Alert, Button, Form, Input, Modal, Select, Upload, message } from "antd";
import { useEffect, useState } from "react";
import { roleAccount } from "../../../helper/roleAccount";
import { Option } from "antd/es/mentions";
import { checkEmail, checkExits, createTicket, getAccountList, getCostumerList, register } from "../../../Service/usersService";
import { imageDb } from '../../Home/config';
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import { v4 } from "uuid";

function AddTicket(props) {
    const { onReload } = props;
    const [open, setOpen] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [img, setImg] = useState('');
    const [mp4, setMp4] = useState('');
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
            let data = {};
        if ((values.image !== undefined) && (values.video !== undefined)) {

            const imgRef = ref(imageDb, `files/${v4()}`);
            const mp4Ref = ref(imageDb, `videos/${v4()}`);
            uploadBytes(imgRef, img).then(async (value) => {
                getDownloadURL(value.ref).then(async (url) => {
                    values.image = url;
                    uploadBytes(mp4Ref, mp4).then(async (value1) => {
                        getDownloadURL(value1.ref).then(async (url1) => {
                            values.video = url1;
                            data = {
                                ...values,
                                idcustomer:checkExitsEmail[0].id,
                                name:checkExitsEmail[0].name,
                                time: curDate,
                                isWatch:false,
                                status:"default",
                                response:"",
                            }
                            const response = await createTicket(data);
                            if (response) {
                                onReload();
                                console.log(response)
                                form.resetFields();
                            }
                        })
                    });

                })
            });
        }else if(values.image !== undefined){
            const imgRef = ref(imageDb, `files/${v4()}`);
            uploadBytes(imgRef, img).then(async (value) => {
                getDownloadURL(value.ref).then(async (url) => {
                    values.image = url;
                    data = {
                        ...values,
                        idcustomer:checkExitsEmail[0].id,
                        name:checkExitsEmail[0].name,
                        time: curDate,
                        isWatch:false,
                        status:"default",
                        response:"",
                    }
                    const response = await createTicket(data);
                    if (response) {
                        onReload();
                        console.log(response)
                        form.resetFields();
                    }

                })
            });
        }
        else if(values.video !== undefined){
            const mp4Ref = ref(imageDb, `videos/${v4()}`);
            uploadBytes(mp4Ref, mp4).then(async (value1) => {
                getDownloadURL(value1.ref).then(async (url1) => {
                    values.video = url1;
                    data = {
                        ...values,
                        idcustomer:checkExitsEmail[0].id,
                        name:checkExitsEmail[0].name,
                        time: curDate,
                        isWatch:false,
                        status:"default",
                        response:"",
                    }
                    const response = await createTicket(data);
                    if (response) {
                        onReload();
                        console.log(response)
                        form.resetFields();
                    }
                })
            });
        }
        else {
            data = {
                ...values,
                idcustomer:checkExitsEmail[0].id,
                name:checkExitsEmail[0].name,
                time: curDate,
                isWatch:false,
                status:"default",
                response:"",
            }
            const response = await createTicket(data);
            if (response) {
                onReload();
                console.log(response)
                form.resetFields();
            }

        }

        }
        

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
                        <div>
                            <input type="file" accept=".jpg, .png" onChange={(e) => {
                                
                                    setImg(e.target.files[0]);
                                
                            }} />
                        </div>
                    </Form.Item>
                    <Form.Item
                        name="video"
                        label="Ảnh"
                    >
                        <div>
                            <input type="file" accept=".mp4" onChange={(e) => {

                                setMp4(e.target.files[0]);
                                
                            }} />
                        </div>
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