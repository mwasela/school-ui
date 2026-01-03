import React, { useEffect, useState, useRef } from 'react';
import axios from '../helpers/axios';
import { Button, message, Tabs, Tag } from 'antd';
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
                Add Mealtype
            </Button>

            <ProTable
                actionRef={actionRef}
                columns={[
                    {
                        title: 'Meal Type Name',
                        dataIndex: 'ma_mealtype_name',
                        key: 'ma_mealtype_name',
                        valueType: 'text',
                    },

                    {
                        title: 'Status',
                        dataIndex: 'ma_mealtype_status',
                        key: 'ma_mealtype_status',
                        render: (_, record) => (
                            <Tag color={record.ma_mealtype_status === 1 ? 'green' : 'red'}>
                                {record.ma_mealtype_status === 1 ? 'Active' : 'Inactive'}
                            </Tag>
                        ),
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
                    const { data } = await axios.get('/mealtypes');
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
                title={currentRecord ? 'Edit Meal Type' : 'Add Meal Type'}
                width="400px"
                formRef={formRef}
                open={visible}
                initialValues={currentRecord || {}}
                onFinish={async (values) => {
                    const url = currentRecord ? `/mealtypes/${currentRecord.id}` : '/mealtypes';
                    const method = currentRecord ? 'put' : 'post';
                    const { data } = await axios[method](url, values);
                    if (!data.error) {
                        message.success(currentRecord ? 'Meal type updated' : 'Meal type added');
                        setVisible(false);
                        setCurrentRecord(null);
                        actionRef.current?.reload();
                    } else {
                        message.error('Failed to submit Meal type');
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
                    name="ma_mealtype_name"
                    rules={[{ required: true, message: 'Please enter asset name' }]}
                    placeholder="Meal Type Name"
                    label="Mealtype Name"
                />

                <ProFormSelect
                    name="ma_mealtype_status"
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
