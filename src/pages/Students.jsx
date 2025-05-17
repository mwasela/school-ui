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
    ProFormDatePicker,
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
                Add Student
            </Button>

            <ProTable
                actionRef={actionRef}
                columns={[
                    {
                        title: 'First Name',
                        dataIndex: 'ma_student_fname',
                        key: 'ma_student_fname',
                        valueType: 'text',
                    },
                    {
                        title: 'Middle Name',
                        dataIndex: 'ma_student_middlename',
                        key: 'ma_student_middlename',
                    },
                    {
                        title: 'Last Name',
                        dataIndex: 'ma_student_lname',
                        key: 'ma_student_lname',
                        valueType: 'text',
                    },
                    {
                        title: 'Admission Number',
                        dataIndex: 'ma_student_admission_no',
                        key: 'ma_student_admission_no',
                    },
                    {
                        title: 'DOB',
                        dataIndex: 'ma_student_dob',
                        key: 'ma_student_dob',
                        valueType: 'text',
                    },
                    {
                        title: 'Gender',
                        dataIndex: 'ma_student_gender',
                        key: 'ma_student_gender',
                        render: (_, record) => {
                            //if 1 male if 2 female
                            const genderText = record.ma_student_gender === 1 ? 'Male' : 'Female';
                            return <span>{genderText}</span>;
                        }
                    },
                    {
                        title: 'Date of Admission',
                        dataIndex: 'ma_student_dateofaddmission',
                        key: 'ma_student_dateofaddmission',
                        valueType: 'text',
                    },
                    {
                        title: 'Parent Name',
                        dataIndex: ['parent', 'ma_parent_fname'],
                        key: 'ma_student_parent',
                        valueType: 'text',
                        render: (_, record) => {
                            return <span>{record.parent ? `${record.parent.ma_parent_fname} ${record.parent.ma_parent_surname}` : 'N/A'}</span>;
                        }
                    },
                    {
                        title: 'Grade',
                        dataIndex: ['grade', 'ma_grade_name'],
                        key: 'ma_student_grade',
                    },
                    {
                        title: 'Stream',
                        dataIndex: ['stream', 'ma_stream_name'],
                        key: 'ma_student_stream',
            
                    },
                    {
                        title: 'Address',
                        dataIndex: 'ma_student_address',
                        key: 'ma_student_address',
                    },
                    {
                        title: 'File No',
                        dataIndex: 'ma_student_paymentsfile',
                        key: 'ma_student_paymentsfile',
                    },
                    {
                        title: 'Photo',
                        dataIndex: 'ma_student_photo',
                        key: 'ma_student_photo',
                        render: (_, record) => {
                            return <img src={record.ma_student_photo} alt="Student" style={{ width: 50, height: 50 }} />;
                        }
                    },
                    {
                        title: 'Status',
                        dataIndex: 'ma_student_status',
                        key: 'ma_student_status',
                        render: (_, record) => {
                            const statusText = record.ma_student_status === 1 ? 'Active' : 'Inactive';
                            const statusColor = record.ma_student_status === 1 ? 'green' : 'red';
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
                    }
                ]}
                request={async () => {
                    const { data } = await axios.get('/students');
                    console.log("Students", data);
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
                title={currentRecord ? 'Edit Student' : 'Add Student'}
                width="400px"
                formRef={formRef}
                open={visible}
                initialValues={currentRecord || {}}
                onFinish={async (values) => {
                    const url = currentRecord ? `/students/${currentRecord.id}` : '/students';
                    const method = currentRecord ? 'put' : 'post';
                    const { data } = await axios[method](url, values);
                    if (!data.error) {
                        message.success(currentRecord ? 'Student data updated' : 'New Student Created');
                        setVisible(false);
                        setCurrentRecord(null);
                        actionRef.current?.reload();
                    } else {
                        message.error('Failed to submit Student data');
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
                    name="ma_student_fname"
                    label="First Name"
                    placeholder="Enter First Name"
                    rules={[{ required: true, message: 'First Name is required' }]}
                />
                <ProFormText
                    name="ma_student_middlename"
                    label="Middle Name"
                    placeholder="Enter Middle Name"
                />
                <ProFormText
                    name="ma_student_lname"
                    label="Last Name"
                    placeholder="Enter Last Name"
                    rules={[{ required: true, message: 'Last Name is required' }]}
                />
                <ProFormText
                    name="ma_student_admission_no"
                    label="Admission Number"
                    placeholder="Enter Admission Number"
                />
                <ProFormDatePicker
                    name="ma_student_dob"
                    label="Date of Birth"
                    placeholder="Enter Date of Birth"
                />
                <ProFormSelect
                    name="ma_student_gender"
                    label="Gender"
                    placeholder="Select Gender"
                    options={[
                        { label: 'Male', value: 1 },
                        { label: 'Female', value: 2 },
                    ]}
                    />

                <ProFormDatePicker
                    name="ma_student_dateofaddmission"
                    label="Date of Admission"
                    placeholder="Enter Date of Admission"
                />
                <ProFormSelect
                    name="ma_student_parent"
                    label="Parent"
                    placeholder="Select Parent"
                    request={async () => {
                        const { data } = await axios.get('/parents');
                        return data.map((parent) => ({
                            label: `${parent.ma_parent_fname} ${parent.ma_parent_surname}`,
                            value: parent.id,
                        }));
                    }}
                />
                <ProFormSelect
                    name="ma_student_grade"
                    label="Grade"
                    placeholder="Select Grade"
                    request={async () => {
                        const { data } = await axios.get('/grades');
                        return data.map((grade) => ({
                            label: grade.ma_grade_name,
                            value: grade.id,
                        }));
                    }}
                />
                <ProFormSelect
                    name="ma_student_stream"
                    label="Stream"
                    placeholder="Select Stream"
                    request={async () => {
                        const { data } = await axios.get('/streams');
                        return data.map((stream) => ({
                            label: stream.ma_stream_name,
                            value: stream.id,
                        }));
                    }}
                />
                <ProFormText
                    name="ma_student_address"
                    label="Address"
                    placeholder="Enter Address"
                />
                <ProFormText
                    name="ma_student_paymentsfile"
                    label="File No"
                    placeholder="Enter File No"
                />
                <ProFormText
                    name="ma_student_photo"
                    label="Photo URL"
                    placeholder="Enter Photo URL"
                />
                <ProFormSelect
                    name="ma_student_status"
                    label="Status"
                    placeholder="Select Status"
                    options={[
                        { label: 'Active', value: 1 },
                        { label: 'Inactive', value: 2 },
                    ]}
                />


            </ModalForm>
        </PageContainer>
    );
}
