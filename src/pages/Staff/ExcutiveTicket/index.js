import React, { useEffect, useState } from 'react';
import { Space, Table, Tag } from 'antd';
import { getCostumerList, getTicketList } from '../../../Service/usersService';
import FormExcutive from './FormExcutive';
import EditAccount from '../../Admin/ManagerAccount/EditAccount';

function ExcutiveTiket(){
    
        
    const [data, setData] = useState([]);
    
    const fetchApi = async () => {
        const result = await getTicketList();
        setData(result.reverse());
    }

    useEffect(() => {
        
        fetchApi();
    }, []);

    const handleReload=()=>{
        fetchApi();
    }
    const columns=[
        {
            title:'Mã phiếu',
            dataIndex:'id',
            key:'id',
        },
        {
            title:'Tiêu đề',
            dataIndex:'title',
            key:'title',
        },
        {
            title:'Ngưởi gửi',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title:'Thời gian',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title:'Hành động',
            key: 'actions',
            render:(_,record)=>{
                return(
                    <>
                    <FormExcutive record={record}/>
                    </>
                )
            }
        }
    ]
    return (
        <>
            
           <Table dataSource={data} columns={columns} rowKey="id"/>
           
        </>
    )
}
export default ExcutiveTiket;