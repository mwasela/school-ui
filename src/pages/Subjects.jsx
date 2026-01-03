import { ModalForm, ProTable, ProFormText, ProFormSelect } from '@ant-design/pro-components'
import { PageContainer } from '@ant-design/pro-layout'
import { Button, Modal, Tag } from 'antd'
import React from 'react'
import axios from '../helpers/axios'
import moment from 'moment'

export default function Subjects() {
  return (
    <PageContainer>

      <ModalForm
        title="Add Subject"
        trigger={
        <Button
          type="primary"
          style={{
            marginBottom: 10
          }}
        >Add Subject</Button>
      } 
        onFinish={async (values) => {
          //console.log(values)
          await axios.post('/subjects', values)
          return true
        }}
      >
        <ProFormText
          name="ma_subject_name"
          label="Subject Name"
          rules={[{ required: true, message: 'Please enter subject name' }]}
        />
        <ProFormSelect
          name="ma_subject_grade"
          label="Subject Grade"
          request={async () => {
            const res = await axios.get('/grades')
            return res.data.map(grade => ({
              label: grade.ma_grade_name,
              value: grade.id
            }))
          }}
          rules={[{ required: true, message: 'Please enter subject grade' }]}
        />
        <ProFormSelect
          name="ma_subject_type"
          label="Subject Type"
          request={async () => {
            const res = await axios.get('/subjecttypes')
            return res.data.map(type => ({
              label: type.ma_subjecttype_name,
              value: type.id
            }))
          }}
          rules={[{ required: true, message: 'Please enter subject type' }]}
        />
        <ProFormSelect
          name="ma_subject_status"
          label="Subject Status"
          options={[
            {label: 'Active', value: 1},
            {label: 'Inactive', value: 0},
          ]}
          rules={[{ required: true, message: 'Please enter subject status' }]}
        />
      </ModalForm>

      <ProTable
        columns={[
          {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 80,
          },
          {
            title: 'Subject Name',
            dataIndex: 'ma_subject_name',
            key: 'ma_subject_name',
            width: 200,
          },
          {
            title: 'Grade',
            dataIndex: ['Grade', 'ma_grade_name'],
            key: 'ma_subject_grade',
            width: 200,
          },
          {
            title: 'Type',
            dataIndex: ['Subjecttype', 'ma_subjecttype_name'],
            key: 'ma_subject_type',
            width: 300,
          },
          {
            title: 'Created on',
            dataIndex: 'createdAt', 
            key: 'createdAt',
            width: 200,
            render: (_, record) => moment(record.createdAt).format('DD-MM-YYYY HH:mm')
          },
          {
            title: 'Status',
            dataIndex: 'ma_subject_status',
            key: 'ma_subject_status',
            width: 150,
            render: (_, record) => (
              <Tag color={record.ma_subject_status === 1 ? 'green' : 'red'}>
                {record.ma_subject_status === 1 ? 'Active' : 'Inactive'}
              </Tag>
            )
          },
          {
            title: 'Actions',
            key: 'actions',
            width: 150,
            render: (_, record) => 
            <ModalForm
              title="Edit Subject"
              trigger={
                <Button type="primary">Edit</Button>
              }
              initialValues={record}
              onFinish={async (values) => {
                await axios.put(`/subjects/${record.id}`, values)
                return true
              }}
            >
              <ProFormText
                name="ma_subject_name"
                label="Subject Name"
                rules={[{ required: true, message: 'Please enter subject name' }]}
              />
              <ProFormSelect
                name="ma_subject_grade"
                label="Subject Grade"
                request={async () => {
                  const res = await axios.get('/grades')
                  return res.data.map(grade => ({
                    label: grade.ma_grade_name,
                    value: grade.id
                  }))
                }}
              />
              <ProFormSelect
                name="ma_subject_type"
                label="Subject Type"
                request={async () => {
                  const res = await axios.get('/subjecttypes')
                  return res.data.map(type => ({
                    label: type.ma_subjecttype_name,
                    value: type.id
                  }))
                }}
              />
              <ProFormSelect
                name="ma_subject_status"
                label="Subject Status"
                options={[
                  {label: 'Active', value: 1},
                  {label: 'Inactive', value: 0},
                ]}
                rules={[{ required: true, message: 'Please select subject status' }]}
              />
            </ModalForm>
          }
        ]}
        scroll={{ x: 'max-content' }}
        request={async () => {
          const res = await axios.get('/subjects')
          console.log("data",res.data)
          return {
            data: res.data,
            success: true,
          }
        }}
      />
    </PageContainer>
  )
}
