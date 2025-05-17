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
                Add Teacher Type
            </Button>

            <ProTable
                actionRef={actionRef}
                columns={[
                    {
                        title: 'Teacher type',
                        dataIndex: 'ma_teachertype_name',
                        key: 'ma_teachertype_name',
                        valueType: 'text',
                    },

                    {
                        title: 'Status',
                        dataIndex: 'ma_teachertype_status',
                        key: 'ma_teachertype_status',
                        render: (_, record) => {
                            const statusText = record.ma_teachertype_status === 1 ? 'Active' : 'Inactive';
                            const statusColor = record.ma_teachertype_status === 1 ? 'green' : 'red';
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
                    const { data } = await axios.get('/teachertypes');
                    //console.log("Mealtypes", data);
                    return {
                        data: data,
                        success: true,
                    };
                }}
                rowKey="id"
                pagination={{ pageSize: 10 }}
                search={false}
                toolBarRender={false}
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
                title={currentRecord ? 'Edit Teacher Type' : 'Add Teacher Type'}
                width="400px"
                formRef={formRef}
                open={visible}
                initialValues={currentRecord || {}}
                onFinish={async (values) => {
                    const url = currentRecord ? `/teachertypes/${currentRecord.id}` : '/teachertypes';
                    const method = currentRecord ? 'put' : 'post';
                    const { data } = await axios[method](url, values);
                    if (!data.error) {
                        message.success(currentRecord ? 'Teacher type updated' : 'Teacher type added');
                        setVisible(false);
                        setCurrentRecord(null);
                        actionRef.current?.reload();
                    } else {
                        message.error('Failed to submit Teacher type');
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
                    name="ma_teachertype_name"
                    rules={[{ required: true, message: 'Please enter Teacher type name' }]}
                    placeholder="Teacher Type Name"
                    label="Teacher Type"
                />

                <ProFormSelect
                    name="ma_teachertype_status"
                    label="Status"
                    placeholder="Status"
                    options={[
                        { label: 'Active', value: 1 },
                        { label: 'Inactive', value: 2 },
                    ]}

                />
            </ModalForm>
        </PageContainer>
    );
}
