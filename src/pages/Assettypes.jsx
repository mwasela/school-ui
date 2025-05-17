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
                style={{ marginBottom: 16, marginLeft: 25, marginTop: 25 }}
                onClick={() => {
                    setCurrentRecord(null);
                    setVisible(true);
                }}
            >
                Add Asset
            </Button>

            <ProTable
                actionRef={actionRef}
                columns={[
                    {
                        title: 'Asset Type',
                        dataIndex: 'ma_assettype_name',
                        key: 'ma_assettype_name',
                        valueType: 'text',
                    },

                    {
                        title: 'Status',
                        dataIndex: 'ma_assettype_status',
                        key: 'ma_assettype_status',
                        render: (_, record) => {
                            const statusText = record.ma_assettype_status === 1 ? 'Active' : 'Inactive';
                            const statusColor = record.ma_assettype_status === 1 ? 'green' : 'red';
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
                    const { data } = await axios.get('/assettypes');
                    console.log("Assettypes", data);
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
                title={currentRecord ? 'Edit Asset Type' : 'Add Asset Type'}
                width="400px"
                formRef={formRef}
                open={visible}
                initialValues={currentRecord || {}}
                onFinish={async (values) => {
                    const url = currentRecord ? `/assettypes/${currentRecord.id}` : '/assettypes';
                    const method = currentRecord ? 'put' : 'post';
                    const { data } = await axios[method](url, values);
                    if (!data.error) {
                        message.success(currentRecord ? 'Asset type updated' : 'Asset type added');
                        setVisible(false);
                        setCurrentRecord(null);
                        actionRef.current?.reload();
                    } else {
                        message.error('Failed to submit Asset type');
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
                    name="ma_assettype_name"
                    rules={[{ required: true, message: 'Please enter asset name' }]}
                    placeholder="Asset Name"
                    label="Asset Name"
                />

                <ProFormSelect
                    name="ma_assettype_status"
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
