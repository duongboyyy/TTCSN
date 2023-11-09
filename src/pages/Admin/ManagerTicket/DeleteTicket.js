import { Button, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons"
import {  deleteTicket } from "../../../Service/usersService";
function DeleteTicket(props) {
    const { record,onReload } = props;
    const handleDelete = async () => {
        const response= await deleteTicket(record.id);
        if (response){
            onReload();
        }
        console.log(response);
    }
    return (
        <>
            <Popconfirm title="Sure to delete?" onConfirm={handleDelete}>
                <Button icon={<DeleteOutlined />} danger size="small" />
            </Popconfirm>
        </>
    )
}
export default DeleteTicket;