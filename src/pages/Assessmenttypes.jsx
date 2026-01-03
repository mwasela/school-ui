import { PageContainer } from '@ant-design/pro-layout'
import { ModalForm, ProFormSelect, ProFormText, ProTable } from '@ant-design/pro-components'
import React from 'react'
import axios from '../helpers/axios'
import { Button, Tag } from 'antd'

export default function Assessmenttypes() {
    const tableRef = React.useRef()
    return (
        <PageContainer
            title={false}
        >
            <ModalForm
                title="Add Assessment Type"
                destroyOnClose={true}
                trigger={
                    <Button
                        type="primary"
                        style={{
                            marginBottom: 16
                        }}
                    >Add Assessment Type</Button>
                }
                onFinish={async (values) => {
                    await axios.post('/assessmenttypes', values)
                    tableRef.current.reload()
                    return true
                }}
            >
                <ProFormText
                    name="ma_assessmenttype_name"
                    label="Assessment Type Name"
                    rules={[{ required: true, message: 'Please enter the assessment type name' }]}
                />
                <ProFormSelect
                    name="ma_assessmenttype_status"
                    label="Assessment Type Status"
                    options={[
                        { label: 'Active', value: 1 },
                        { label: 'Inactive', value: 0 },
                    ]}
                    rules={[{ required: true, message: 'Please select the assessment type status' }]}
                />
            </ModalForm>


            <ProTable
                actionRef={tableRef}
                rowKey="id"
                request={async (params) => {
                    const res = await axios.get('/assessmenttypes',
                        {
                            params: { ...params }
                         }
                    )
                    return {
                        data: res.data
                    }
                }}
                columns={[
                    {
                        title: 'Name',
                        dataIndex: 'ma_assessmenttype_name',
                        key: 'ma_assessmenttype_name',

                    },
                    {
                        title: 'Status',
                        dataIndex: 'ma_assessmenttype_status',
                        search: false,
                        key: 'ma_assessmenttype_status',
                        render: (_, record) => (
                            record.ma_assessmenttype_status === 1 ?
                                <Tag color="green">Active</Tag> :
                                <Tag color="red">Inactive</Tag>
                        ),
                    },
                    {
                        title: 'Action',
                        dataIndex: 'action',
                        search: false,
                        render: (_, record) => (
                            <ModalForm
                                title="Edit Assessment Type"
                                destroyOnClose={true}
                                initialValues={record}
                                trigger={
                                    <Button type="primary">Edit</Button>
                                }
                                onFinish={async (values) => {
                                    await axios.put(`/assessmenttypes/${record.id}`, values)
                                    tableRef.current.reload()
                                    return true
                                }}
                            >
                                <ProFormText
                                    name="ma_assessmenttype_name"
                                    label="Assessment Type Name"
                                />
                                <ProFormSelect
                                    name="ma_assessmenttype_status"
                                    label="Assessment Type Status"
                                    options={[
                                        { label: 'Active', value: 1 },
                                        { label: 'Inactive', value: 0 },
                                    ]}
                                />
                            </ModalForm>

                        )
                    }
                ]}
            />
        </PageContainer>
    )
}
