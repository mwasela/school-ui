import React, { useEffect, useState, useRef } from 'react';
import axios from '../helpers/axios';
import { Button, message, Tabs } from 'antd';
import {
    PageContainer,
    ProCard,
    ModalForm,
    ProFormSelect,
    ProTable,
    ProFormText,
} from '@ant-design/pro-components';

export default function Assettypes() {
    const [visible, setVisible] = useState(false);
    const [currentRecord, setCurrentRecord] = useState(null);
    const actionRef = useRef();
    const formRef = useRef();

    return (
        <PageContainer>

            <Button
                type="primary"
                style={{ marginBottom: 16, marginLeft: 5, marginTop: 5 }}
                onClick={() => {
                    setCurrentRecord(null);
                    setVisible(true);
                }}
            >
                Add Worker Type
            </Button>

            <ProTable
                actionRef={actionRef}
                toolBarRender={false}
                columns={[
                    {
                        title: 'Name',
                        dataIndex: 'ma_subjecttype_name',
                        key: 'ma_subjecttype_name',
                        valueType: 'text',
                    },

                    {
                        title: 'Status',
                        dataIndex: 'ma_subjecttype_status',
                        key: 'ma_subjecttype_status',
                        render: (_, record) => {
                            const statusText = record.ma_subjecttype_status === 1 ? 'Active' : 'Inactive';
                            const statusColor = record.ma_subjecttype_status === 1 ? 'green' : 'red';
                            return <span style={{ color: statusColor }}>{statusText}</span>;
                        },
                    },
                    {
                        title: 'Action',
                        dataIndex: 'action',
                        render: (_, record) => (
                            <Button
                                type="primary"
                                onClick={() => {
                                    setCurrentRecord(record);
                                    setVisible(true);
                                }}
                            >
                                Edit
                            </Button>
                        ),
                    },
                ]}
                request={async () => {
                    const { data } = await axios.get('/subjecttypes');
                    //console.log("workertypes", data);
                    return {
                        data: data,
                        success: true,
                    };
                }}
                rowKey="id"
                pagination={{ pageSize: 10 }}
                search={false}
                dateFormatter="string"
                options={{
                    fullScreen: true,
                    reload: true,
                    setting: true,
                }}
                tableAlertRender={false}
                tableAlertOptionRender={false}
            />




            <ModalForm
                title={currentRecord ? 'Edit Subject Type' : 'Add Subject Type'}
                width="400px"
                formRef={formRef}
                open={visible}
                initialValues={currentRecord || {}}
                onFinish={async (values) => {
                    const url = currentRecord ? `/subjecttypes/${currentRecord.id}` : '/subjecttypes';
                    const method = currentRecord ? 'put' : 'post';
                    const { data } = await axios[method](url, values);
                    if (!data.error) {
                        message.success(currentRecord ? 'Subject type updated' : 'Subject type added');
                        setVisible(false);
                        setCurrentRecord(null);
                        actionRef.current?.reload();
                    } else {
                        message.error('Failed to submit Subject type');
                        console.error(data.error);
                    }
                }}
                modalProps={{
                    onCancel: () => {
                        setVisible(false);
                        setCurrentRecord(null);
                        actionRef.current?.reload();
                    },
                }}
            >
                <ProFormText
                    name="ma_subjecttype_name"
                    rules={[{ required: true, message: 'Please enter subject type name' }]}
                    placeholder="Subject Name"
                    label="Name"
                />
                <ProFormSelect
                    name="ma_subjecttype_status"
                    label="Status"
                    options={[
                        { label: 'Active', value: 1 },
                        { label: 'Inactive', value: 0 },
                    ]}
                    placeholder="Status"
                    rules={[{ required: true, message: 'Please select status' }]}
                />

            </ModalForm>
        </PageContainer>
    );
}
