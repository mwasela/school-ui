import { ModalForm, ProForm, ProFormText, ProTable, ProFormSelect } from '@ant-design/pro-components'
import { PageContainer } from '@ant-design/pro-layout'
import React from 'react'
import axios from '../helpers/axios'
import { Button, Tag } from 'antd'

export default function Assessmentrecords() {
  const tableRef = React.useRef()
  
  return (
    <PageContainer>
        <ModalForm
        title="Add Assessment Record"
        trigger={
          <Button type="primary" style={{ marginBottom: 16}}>Add Assessment Record</Button>
        }
        onFinish={async (values) => {
            await axios.post('/assessmentrecords', values);
            tableRef.current.reload();
            return true;
        }}
        >   
        <ProFormSelect
            name="ma_assessmentrecord_assessment"
            label="Assessment"
            request={async () => {
                const res = await axios.get('/assessment')
                return res.data.map(assessment => ({
                    label: assessment.ma_assessment_name,
                    value: assessment.id
                }))
            }}
            rules={[{ required: true, message: 'Please select an assessment' }]}
        />
        <ProFormSelect
            name="ma_assessmentrecord_student"
            label="Student"
            request={async () => {
                const res = await axios.get('/students')
                return res.data.map(student => ({
                    label: student.ma_student_fname + ' ' + student.ma_student_middlename + ' ' + student.ma_student_lname,
                    value: student.id
                }))
            }}
            rules={[{ required: true, message: 'Please select a student' }]}
        />
        <ProFormText
            name="ma_assessmentrecord_score"
            label="Score"
            rules={[{ required: true, message: 'Please enter the score' }]}
        />
        <ProFormSelect
            name="ma_assessmentrecord_status"
            label="Status"
            options={[
                { label: 'Active', value: 1 },
                { label: 'Inactive', value: 0 },
            ]}
            rules={[{ required: true, message: 'Please select the status' }]}
        />
        </ModalForm>

        <ProTable
            actionRef={tableRef}
            columns={[
                {
                    title: 'Asses ID',
                    dataIndex: ['Assessment', 'ma_assessment_name'],
                    key: 'ma_assessmentrecord_assessment',
                    valueType: 'text',
                },
                {
                    title: 'Type',
                    dataIndex: ['Assessment', 'Assessmenttype', 'ma_assessmenttype_name'],
                    key: 'ma_assessmentrecord_assessmenttype',
                    valueType: 'text',
                    request: async () => {
                        const res = await axios.get('/assessmenttypes')
                        return res.data.map(type => ({
                            label: type.ma_assessmenttype_name,
                            value: type.id
                        }))
                    },
                },
                {
                    title: 'Student',
                    dataIndex: ['Student', 'ma_student_fname'  ],
                    key: 'ma_assessmentrecord_student',
                    valueType: 'text',
                    width: 200,
                    render: (_, record) => (
                        <Tag color="blue">{record.Student.ma_student_fname} {record.Student.ma_student_middlename} {record.Student.ma_student_lname}</Tag>
                    ),
                },
                {
                    title: 'Score',
                    dataIndex: 'ma_assessmentrecord_score',
                    key: 'ma_assessmentrecord_score',
                    valueType: 'text',
                    render: (_, record) => (
                        <Tag color="green">{record.ma_assessmentrecord_score}</Tag>
                    ),  
                },
                {
                    title: 'Status',
                    dataIndex: 'ma_assessmentrecord_status',
                    key: 'ma_assessmentrecord_status',
                    valueType: 'text',
                    render: (_, record) => (
                        record.ma_assessmentrecord_status === 1 ?
                            <Tag color="green">Active</Tag> :
                            <Tag color="red">Inactive</Tag>
                    ),
                },
                {
                    title: 'Action',
                    key: 'action',
                    search: false,
                    render: (_, record) => (
                        <ModalForm
                            title="Edit Assessment Record"
                            trigger={<Button type="primary">Edit</Button>}
                            modalProps={{
                                destroyOnClose: true,
                            }}
                            initialValues={record}
                            onFinish={async (values) => {
                                await axios.put(`/assessmentrecords/${record.id}`, values);
                                tableRef.current.reload();
                                return true;
                            }}
                        >
                            <ProFormSelect
                                name="ma_assessmentrecord_assessment"
                                label="Assessment"
                                request={async () => {
                                    const res = await axios.get('/assessment')
                                    return res.data.map(assessment => ({
                                        label: assessment.ma_assessment_name,
                                        value: assessment.id
                                    }))
                                }}
                                rules={[{ required: true, message: 'Please select an assessment' }]}
                            />
                            <ProFormSelect
                                name="ma_assessmentrecord_student"
                                label="Student"
                                request={async () => {
                                    const res = await axios.get('/students')
                                    return res.data.map(student => ({
                                        label: student.ma_student_fname + ' ' + student.ma_student_middlename + ' ' + student.ma_student_lname,
                                        value: student.id
                                    }))
                                }}
                                rules={[{ required: true, message: 'Please select a student' }]}
                            />
                            <ProFormText
                                name="ma_assessmentrecord_score"
                                label="Score"
                                rules={[{ required: true, message: 'Please enter the score' }]}
                            />
                            <ProFormSelect
                                name="ma_assessmentrecord_status"
                                label="Status"
                                options={[
                                    { label: 'Active', value: 1 },
                                    { label: 'Inactive', value: 0 },
                                ]}
                                rules={[{ required: true, message: 'Please select the status' }]}
                            />
                        </ModalForm>
                    ),
                }
            ]}
            request={async () => {
                const res = await axios.get('/assessmentrecords')
                //aconsole.log(res.data)
                return {
                    data: res.data
                }
            }}
            rowKey="id"
            pagination={{
                pageSize: 10
            }}

        />
    </PageContainer>
  )
}
