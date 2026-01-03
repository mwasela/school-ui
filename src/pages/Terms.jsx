import { ProTable } from '@ant-design/pro-components'
import { PageContainer } from '@ant-design/pro-layout'
import React from 'react'
import axios from '../helpers/axios'
import { Button, Modal, Tag } from 'antd'
import moment from 'moment' 
import { ModalForm, ProFormText, ProFormDatePicker, ProFormSelect } from '@ant-design/pro-components'

export default function Terms() {
    const tableRef = React.useRef()

  return (
    <PageContainer>
        <ModalForm
            title="Add New Term"
            trigger={<Button type="primary" style={{ marginBottom: 16 }}>Add Term</Button>}
            modalProps={{
                destroyOnClose: true,
                onCancel: () => console.log('closed'),
            }}
            onFinish={async (values) => {
                await axios.post('/term', values);
                tableRef.current.reload();
                return true;
            }}
        >
            <ProFormText
                name="ma_term_name"
                label="Term Name"
                rules={[{ required: true, message: 'Please enter the term name' }]}
            />
            <ProFormDatePicker
                name="ma_term_startdate"
                label="Start Date"
                rules={[{ required: true, message: 'Please select the start date' }]}
            />
            <ProFormDatePicker
                name="ma_term_enddate"
                label="End Date"
                rules={[{ required: true, message: 'Please select the end date' }]}
            />
            <ProFormText
                name="ma_term_year"
                label="Year"
                rules={[{ required: true, message: 'Please enter the year' }]}
            />
            <ProFormSelect
                name="ma_term_status"
                label="Status"
                options={[
                    { label: 'Active', value: 1 },
                    { label: 'Inactive', value: 0 },
                ]}
                initialValue={1}
            />
        </ModalForm>

        <ProTable
            actionRef={tableRef}
            headerTitle="School Terms"
            columns={[
                {
                    title: 'Term Name',
                    dataIndex: 'ma_term_name',
                    key: 'ma_term_name',
                },
                {
                    title: 'Start Date',
                    dataIndex: 'ma_term_startdate',
                    key: 'ma_term_startdate',
                    render: (_, record) => (
                        <Tag color="green">
                        {moment(record.ma_term_startdate).format('YYYY-MM-DD')}
                        </Tag>  
                    ),
                },
                {
                    title: 'End Date',
                    dataIndex: 'ma_term_enddate',
                    key: 'ma_term_enddate',
                    render: (_, record) => (
                        <Tag color="blue">
                        {moment(record.ma_term_enddate).format('YYYY-MM-DD')}
                        </Tag>
                    ),
                },
                {
                    title: 'year',
                    dataIndex: 'ma_term_year',
                    key: 'ma_term_year',
                },
                {
                    title: 'Status',
                    dataIndex: 'ma_term_status',
                    key: 'ma_term_status',
                    render: (_, record) => (
                        //use outlined green and red tags to show active or inactive
                        record.ma_term_status === 1 ? <span style={{ color: 'green' }}>Active</span> : <span style={{ color: 'red' }}>Inactive</span>
                    ),
                },
                {
                    title: 'Created At',
                    dataIndex: 'createdAt',
                    key: 'createdAt',

                },
                {
                    title: 'Action',
                    key: 'action',
                    render: (_, record) => (
                        <ModalForm
                            title="Edit Term"
                            trigger={<Button type="primary">Edit</Button>}
                            modalProps={{
                                destroyOnClose: true,   
                                onCancel: () => console.log('closed'),
                            }}
                            onFinish={async (values) => {
                                await axios.put(`/term/${record.id}`, values);
                                tableRef.current.reload();
                                return true;
                            }}
                        >
                            <ProFormText
                                name="ma_term_name"
                                label="Term Name"
                                rules={[{ required: true, message: 'Please enter the term name' }]}
                                initialValue={record.ma_term_name}
                            />
                            <ProFormDatePicker
                                name="ma_term_startdate"
                                label="Start Date"
                                rules={[{ required: true, message: 'Please select the start date' }]}
                                initialValue={moment(record.ma_term_startdate)} 
                            />
                            <ProFormDatePicker
                                name="ma_term_enddate"
                                label="End Date"
                                rules={[{ required: true, message: 'Please select the end date' }]}
                                initialValue={moment(record.ma_term_enddate)}
                            />
                            <ProFormText
                                name="ma_term_year"
                                label="Year"
                                rules={[{ required: true, message: 'Please enter the year' }]}
                                initialValue={record.ma_term_year}
                            />
                            <ProFormSelect
                                name="ma_term_status"
                                label="Status"
                                options={[
                                    { label: 'Active', value: 1 },
                                    { label: 'Inactive', value: 0 },
                                ]}
                                initialValue={record.ma_term_status}
                            />
                        </ModalForm>
                    ),
                },
            ]}
            request={async () => {
                const response = await axios.get('/term');
                return {
                    data: response.data,
                    success: true,
                };
            }}
            rowKey="id"
            pagination={{
                pageSize: 10,
            }}
        />
    </PageContainer>
  )
}
