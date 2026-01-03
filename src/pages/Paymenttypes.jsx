import React, { useEffect, useState, useRef } from 'react';
import axios from '../helpers/axios';
import { Button, message, Tag } from 'antd';
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
                Add Payment Type
            </Button>

            <ProTable
                actionRef={actionRef}
                columns={[
                    {
                        title: 'Payment type',
                        dataIndex: 'ma_paymenttype_name',
                        key: 'ma_paymenttype_name',
                        valueType: 'text',
                    },

                    {
                        title: 'Status',
                        dataIndex: 'ma_paymenttype_status',
                        key: 'ma_paymenttype_status',
                        render: (_, record) => (
                            record.ma_paymenttype_status === 1 ?
                                <Tag color="green">Active</Tag> :
                                <Tag color="red">Inactive</Tag>
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
                    const { data } = await axios.get('/paymenttypes');
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
                scroll={{ x: 'max-content' }}
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
                title={currentRecord ? 'Edit Payment Type' : 'Add Payment Type'}
                width="400px"
                formRef={formRef}
                open={visible}
                initialValues={currentRecord || {}}
                onFinish={async (values) => {
                    const url = currentRecord ? `/paymenttypes/${currentRecord.id}` : '/paymenttypes';
                    const method = currentRecord ? 'put' : 'post';
                    const { data } = await axios[method](url, values);
                    if (!data.error) {
                        message.success(currentRecord ? 'Payment type updated' : 'Payment type added');
                        setVisible(false);
                        setCurrentRecord(null);
                        actionRef.current?.reload();
                    } else {
                        message.error('Failed to submit payment type');
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
                    name="ma_paymenttype_name"
                    rules={[{ required: true, message: 'Please enter payment type name' }]}
                    placeholder="Payment Type Name"
                    label="Payment Type"
                />

                <ProFormSelect
                    name="ma_paymenttype_status"
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
