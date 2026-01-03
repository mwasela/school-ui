import { ModalForm, ProFormSelect, ProFormText, ProTable } from '@ant-design/pro-components'
import { PageContainer } from '@ant-design/pro-layout'
import React from 'react'
import axios from '../helpers/axios'
import { Button, Tag } from 'antd'
import moment from 'moment'

export default function Feestructure() {
    const tableRef = React.useRef();

    return (
        <PageContainer>
            <ModalForm
                title="Add Fee Structure"
                trigger={<Button type="primary" style={{ marginBottom: 16 }}>Add Fee Structure</Button>}
                onFinish={async (values) => {
                    const response = await axios.post('/feestructure', values);
                    tableRef.current.reload();
                    return true;
                }}
            >
                <ProFormSelect

                    name="ma_fee_grade"
                    label="Grade"
                    request={async () => {
                        const response = await axios.get('/grades');
                        return response.data.map((cls) => ({
                            label: cls.ma_grade_name,
                            value: cls.id,
                        }));
                    }}
                    rules={[{ required: true, message: 'Please select a grade' }]}
                />
                <ProFormSelect
                    name="ma_fee_term"
                    label="Term"
                    request={async () => {
                        const response = await axios.get('/term');
                        return response.data.map((term) => ({
                            label: term.ma_term_name,
                            value: term.id,
                        }));
                    }}
                    rules={[{ required: true, message: 'Please select a term' }]}
                />
                <ProFormText
                    name="ma_fee_amount"
                    label="Amount"
                    rules={[{ required: true, message: 'Please enter the amount' }]}
                />

                <ProFormSelect
                    name="ma_fee_status"
                    label="Status"
                    options={[
                        { label: 'Active', value: 1 },
                        { label: 'Inactive', value: 0 },
                    ]}
                    rules={[{ required: true, message: 'Please select a status' }]}
                />

            </ModalForm>


            <ProTable
                actionRef={tableRef}
                search={{
                    labelWidth: 'auto',
                }}
                columns={[
                    {
                        title: 'Grade',
                        dataIndex: ['Grade', 'ma_grade_name'],
                        key: 'ma_fee_grade',
                        valueType: 'select',
                        request: async () => {
                            const response = await axios.get('/grades');
                            return response.data.map((cls) => ({
                                label: cls.ma_grade_name,
                                value: cls.ma_grade_name,
                            }));
                        },
                    },
                    {
                        title: 'Amount',
                        dataIndex: 'ma_fee_amount',
                        key: 'ma_fee_amount',
                        search: false,
                        render: (_, record) => (
                            <Tag color="purple">{record.ma_fee_amount}</Tag>
                        ),
                    },
                    {
                        title: 'Term',
                        dataIndex: ['Term', 'ma_term_name'],
                        key: 'ma_fee_term',
                        valueType: 'select',
                        request: async () => {
                            const response = await axios.get('/term');
                            return response.data.map((term) => ({
                                label: term.ma_term_name,
                                value: term.ma_term_name,
                            }));
                        },
                    },
                    {
                        title: 'Year',
                        dataIndex: ['Term', 'ma_term_year'],
                        key: 'ma_term_year',
                        search: false,
                        render: (_, record) => (
                            <Tag color="blue">{record.Term.ma_term_year}</Tag>
                        ),
                    },
                    {
                        title: 'Status',
                        dataIndex: 'ma_fee_status',
                        key: 'ma_fee_status',
                        valueType: 'select',
                        valueEnum: {
                            1: { text: 'Active', status: 'Success' },
                            0: { text: 'Inactive', status: 'Error' },
                        },
                        render: (_, record) => (
                            record.ma_fee_status === 1 ? <Tag color="green">Active</Tag> : <Tag color="red">Inactive</Tag>
                        ),
                    },
                    {
                        title: 'Created At',
                        dataIndex: 'createdAt',
                        key: 'createdAt',
                        search: false,
                        render: (_, record) => (
                            <Tag color="blue">
                                {moment(record.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                            </Tag>
                        ),
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        search: false,
                        render: (_, record) => (
                            <ModalForm
                                title="Edit Fee Structure"
                                trigger={<Button type="primary">Edit</Button>}
                                initialValues={record}
                                onFinish={async (values) => {
                                    const response = await axios.put(`/feestructure/${record.id}`, values);
                                    tableRef.current.reload();
                                    return true;
                                }}
                            >
                                <ProFormSelect

                                    name="ma_fee_grade"
                                    label="Grade"
                                    request={async () => {
                                        const response = await axios.get('/grades');
                                        return response.data.map((cls) => ({
                                            label: cls.ma_grade_name,
                                            value: cls.id,
                                        }));
                                    }}
                                    rules={[{ required: true, message: 'Please select a grade' }]}
                                />
                                <ProFormSelect
                                    name="ma_fee_term"
                                    label="Term"
                                    request={async () => {
                                        const response = await axios.get('/term');
                                        return response.data.map((term) => ({
                                            label: term.ma_term_name,
                                            value: term.id,
                                        }));
                                    }}
                                    rules={[{ required: true, message: 'Please select a term' }]}
                                />
                                <ProFormText
                                    name="ma_fee_amount"
                                    label="Amount"
                                    rules={[{ required: true, message: 'Please enter the amount' }]}
                                />
                                <ProFormSelect
                                    name="ma_fee_status"
                                    label="Status"
                                    options={[
                                        { label: 'Active', value: 1 },
                                        { label: 'Inactive', value: 0 },
                                    ]}
                                    rules={[{ required: true, message: 'Please select a status' }]}
                                />
                            </ModalForm>
                        ),

                    }
                ]}
                request={async (params) => {
                    const { current, pageSize, ...searchParams } = params;
                    const response = await axios.get('/feestructure', {
                        params: {
                            page: current,
                            pageSize,
                            ...searchParams,
                        }
                    });
                    return {
                        data: response.data.data,
                        success: true,
                        total: response.data.total,
                    };
                }}
                rowKey="id"
                scroll={{ x: 'max-content' }}
                pagination={{
                    pageSize: 10,
                }}
            />







        </PageContainer>
    )
}
