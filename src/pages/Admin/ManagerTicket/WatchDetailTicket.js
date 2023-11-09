import { Button, Form, Input, Modal, Upload } from "antd";
import { useState } from "react";
import { UploadOutlined } from "@ant-design/icons"
import { FileSearchOutlined } from "@ant-design/icons"
function WatchDetailTicket(props) {
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
    //console.log(record.response.title)
    return (
        <>
            <Button type="primary"  size="small" onClick={showModal} icon={<FileSearchOutlined />}></Button>
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
                <img src={record.video}></img>
            </div>

            <div className="reponse">
                <p>Phản hồi</p>
                <h2 className="header-form__title">{record.response.title}</h2>
                <span>{record.response.name}</span><span>{record.response.time}</span>
                <div>{record.response.email}</div>
                <p>{record.response.description}</p>
                <img src={record.response.image}></img>
                <img src={record.response.video}></img>
            </div>
            </Modal>
        </>
    )

}
export default WatchDetailTicket;