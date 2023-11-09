import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Tag } from 'antd';
import { getAccountList, getTicketList } from '../../../Service/usersService';
import AddTicket from './AddTicket';
import DeleteTicket from './DeleteTicket';
import WatchDetailTicket from './WatchDetailTicket';
function ManagerTicket() {
    const [data, setData] = useState([]);

    const fetchApi = async () => {
        const result = await getTicketList();
        setData(result.reverse());
    }

    useEffect(() => {

        fetchApi();
    }, []);

    const handleReload = () => {
        fetchApi();
    }
    const columns = [
        {
            title: 'Mã phiéu',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Người gửi',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Thời gian',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: 'Trạng thái',
            key: 'status',
            render: (_, record) => {
                return (
                    <>
                        <Tag color={(record.role==="admin")?("volcano"):(record.role==="staff"?("blue"):(""))}>
                            {record.role}
                        </Tag>
                    </>
                )
            }
        },
        {
            title:'Hành động',
            key: 'actions',
            render:(_,record)=>{
                return(
                    <>
                    <WatchDetailTicket record={record} onReload={handleReload}/>
                    <> </>
                    <DeleteTicket record={record} onReload={handleReload}/>
                    </>
                )
            }
        }
    ]
    return (
        <>
            <AddTicket  onReload={handleReload}/>
            <Table dataSource={data} columns={columns} rowKey="id" />

        </>
    )
}
export default ManagerTicket;