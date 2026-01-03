import { ModalForm, ProForm, ProTable, ProFormText, ProFormSelect, ProFormDatePicker } from '@ant-design/pro-components'
import { PageContainer } from '@ant-design/pro-layout'
import React from 'react'
import axios from '../helpers/axios'
import { Button, Tag } from 'antd'
import moment from 'moment'

export default function Assessment() {

    const tableRef = React.useRef()
    return (
        <PageContainer>

            <ModalForm
                title="Add Assessment"
                destroyOnClose={true}
                trigger={
                    <Button type="primary" style={{ marginBottom: 16 }}>Add Assessment</Button>
                }

                onFinish={async (values) => {
                    const response = await axios.post('/assessment', values);
                    tableRef.current.reload();
                    return true;
                }}
            >

                <ProFormText
                    name="ma_assessment_name"
                    label="Assessment Name"
                    placeholder="Enter assessment name"
                />
                <ProFormSelect
                    name="ma_assessment_type"
                    label="Assessment Type"
                    placeholder="Select assessment type"
                    request={async () => {
                        const res = await axios.get('/assessmenttypes')
                        return res.data.map(type => ({
                            label: type.ma_assessmenttype_name,
                            value: type.id
                        }))
                    }}
                />
                <ProFormSelect
                    name="ma_assessment_term"
                    label="Assessment Term"
                    placeholder="Select assessment term"
                    request={async () => {
                        const res = await axios.get('/term')
                        return res.data.map(term => ({
                            label: term.ma_term_name,
                            value: term.id
                        }))
                    }}
                />


                <ProFormSelect
                    name="ma_assessment_subject"
                    label="Assessment Subject"
                    placeholder="Select assessment subject"
                    request={async () => {
                        const res = await axios.get('/subjects')
                        return res.data.map(subject => ({
                            label: subject.ma_subject_name,
                            value: subject.id
                        }))
                    }}
                />

                <ProFormSelect
                    name="ma_assessment_teacher"
                    label="Assessment Teacher"
                    placeholder="Select assessment teacher"
                    request={async () => {
                        const res = await axios.get('/teachers')
                        return res.data.map(teacher => ({
                            label: teacher.ma_teacher_fname + ' ' + teacher.ma_teacher_surname,
                            value: teacher.id
                        }))
                    }}
                />

                <ProFormDatePicker
                    name="ma_assessment_date"
                    label="Assessment Date"
                    placeholder="Select assessment date"
                />



            </ModalForm>

            <ProTable
                actionRef={tableRef}
                columns={[
                    {
                        title: 'Assessment Name',
                        dataIndex: 'ma_assessment_name',
                        key: 'ma_assessment_name',
                        valueType: 'text',
                    },
                    {
                        title: 'Type',
                        dataIndex: ['Assessmenttype', 'ma_assessmenttype_name'],
                        key: 'ma_assessment_type',
                        valueType: 'text',
                        render: (_, record) => (
                            <Tag>{record.Assessmenttype.ma_assessmenttype_name}</Tag>
                        ),
                    },
                    {
                        title: 'Term',
                        dataIndex: ['Term', 'ma_term_name'],
                        key: 'ma_assessment_term',
                        valueType: 'text',
                        //tag
                        render: (_, record) => (
                            <Tag color="blue">{record.Term.ma_term_name}</Tag>
                        ),
                    },
                    {
                        title: 'Subject',
                        dataIndex: ['Subject', 'ma_subject_name'],
                        key: 'ma_assessment_subject',
                        valueType: 'text',

                    },
                    {
                        title: 'Teacher',
                        dataIndex: ['Teacher', 'ma_teacher_fname'],
                        key: 'ma_assessment_teacher',
                        valueType: 'text',
                        render: (_, record) => (
                            <Tag color="purple">{record.Teacher.ma_teacher_fname} {record.Teacher.ma_teacher_surname}</Tag>
                        ),
                    },
                    {
                        title: 'Asses Date',
                        dataIndex: 'ma_assessment_date',
                        key: 'ma_assessment_date',
                        valueType: 'date',
                        render: (_, record) => (
                            //use moment to format date
                            <Tag color="green">{moment(record.ma_assessment_date).format('YYYY-MM-DD')}</Tag>   
                        ),
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        search: false,
                        render: (_, record) => (
                            <ModalForm
                                title="Edit Assessment"
                                trigger={<Button type="primary">Edit</Button>}
                                modalProps={{
                                    destroyOnClose: true,
                                }}
                                initialValues={{
                                    ...record,
                                    ma_assessment_date: moment(record.ma_assessment_date),
                                }}
                                onFinish={async (values) => {
                                    await axios.put(`/assessment/${record.id}`, values);
                                    tableRef.current.reload();
                                    return true;
                                }}
                            >
                                <ProFormText
                                    name="ma_assessment_name"
                                    label="Assessment Name"
                                    placeholder="Enter assessment name"
                                    rules={[{ required: true, message: 'Please enter assessment name' }]}
                                />
                                <ProFormSelect
                                    name="ma_assessment_type"
                                    label="Assessment Type"
                                    placeholder="Select assessment type"
                                    request={async () => {
                                        const res = await axios.get('/assessmenttypes')
                                        return res.data.map(type => ({
                                            label: type.ma_assessmenttype_name,
                                            value: type.id
                                        }))
                                    }}
                                    rules={[{ required: true, message: 'Please select assessment type' }]}
                                />
                                <ProFormSelect
                                    name="ma_assessment_term"
                                    label="Assessment Term"
                                    placeholder="Select assessment term"
                                    request={async () => {
                                        const res = await axios.get('/term')
                                        return res.data.map(term => ({
                                            label: term.ma_term_name,
                                            value: term.id
                                        }))
                                    }}
                                    rules={[{ required: true, message: 'Please select assessment term' }]}
                                />
                                <ProFormSelect
                                    name="ma_assessment_subject"
                                    label="Assessment Subject"
                                    placeholder="Select assessment subject"
                                    request={async () => {
                                        const res = await axios.get('/subjects')
                                        return res.data.map(subject => ({
                                            label: subject.ma_subject_name,
                                            value: subject.id
                                        }))
                                    }}
                                    rules={[{ required: true, message: 'Please select assessment subject' }]}
                                />
                                <ProFormSelect
                                    name="ma_assessment_teacher"
                                    label="Assessment Teacher"
                                    placeholder="Select assessment teacher"
                                    request={async () => {
                                        const res = await axios.get('/teachers')
                                        return res.data.map(teacher => ({
                                            label: teacher.ma_teacher_fname + ' ' + teacher.ma_teacher_surname,
                                            value: teacher.id
                                        }))
                                    }}
                                    rules={[{ required: true, message: 'Please select assessment teacher' }]}
                                />
                                <ProFormDatePicker
                                    name="ma_assessment_date"
                                    label="Assessment Date"
                                    placeholder="Select assessment date"
                                    rules={[{ required: true, message: 'Please select assessment date' }]}
                                />
                            </ModalForm>
                        ),
                    }

                ]}
                request={async () => {
                    const res = await axios.get('/assessment')
                    //console.log(res.data)
                    return {
                        data: res.data
                    }
                }}
                rowKey="id"
                pagination={{ pageSize: 15 }}

            />
        </PageContainer>
    )
}
