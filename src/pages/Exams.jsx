import { ProTable, ModalForm, ProFormSelect, ProFormText, ProFormDatePicker } from '@ant-design/pro-components'
import React from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import { Button, Modal, Tag } from 'antd'
import axios from '../helpers/axios'
import moment from 'moment'

export default function Exams() {
  const tableref = React.useRef()
  return (
    <PageContainer>

      <ModalForm
        title="Add Exam"
        trigger={
        <Button
          type="primary"
          style={{
            marginBottom: 16
          }}
        >Add Exam</Button>
      }
        onFinish={async (values) => {
          //console.log(values)

          await axios.post('/exams', values)
          tableref.current.reload()
          return true
        }}
      >
        <ProFormText
          name="ma_exam_name"
          label="Exam Name"
          rules={[{ required: true, message: 'Please enter exam name' }]}
        />
        <ProFormSelect
          name="ma_exam_grade"
          label="Exam Grade"
          request={async () => {
            const res = await axios.get('/grades')
            return res.data.map(grade => ({
              label: grade.ma_grade_name,
              value: grade.id
            }))
          }}
          rules={[{ required: true, message: 'Please enter exam grade' }]}
        />

        <ProFormDatePicker
          name="ma_exam_date"
          label="Exam Seat Date"
          showTime
          rules={[{ required: true, message: 'Please enter exam seat date' }]}
        />
      </ModalForm>

      <ProTable
      actionRef={tableref}
        rowKey="id"
        columns={[
          {
            title: 'Exam Name',
            dataIndex: 'ma_exam_name',
            key: 'ma_exam_name',
            width: 200,
          },
          {
            title: 'Exam Grade',
            dataIndex: ['Grade','ma_grade_name'],
            key: 'ma_exam_grade',
            width: 200,
            //tag green
            render: (_, record) => <Tag color="green">{record.Grade.ma_grade_name}</Tag>
          },
          {
            title: 'Exam Seat Date',
            dataIndex: 'ma_exam_date',
            key: 'ma_exam_date',
            width: 200,
            render: (_, record) => moment(record.ma_exam_date).format('DD-MM-YYYY HH:mm')

          },
          {
            title: 'Exam Status',
            dataIndex: 'ma_exam_status',
            key: 'ma_exam_status',
            width: 200,
            render: (_, record) => (
              <Tag color={record.ma_exam_status === 1 ? 'green' : 'red'}>
                {record.ma_exam_status === 1 ? 'Seated' : 'Pending'}
              </Tag>
            )
          },
          {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 200,
            render: (_, record) => <Tag>{moment(record.createdAt).format('DD-MM-YYYY HH:mm')}</Tag>

          },
          {
            title: 'Last Updated At',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            width: 200,
            render: (_, record) => <Tag  size="large">{moment(record.updatedAt).format('DD-MM-YYYY HH:mm')}</Tag>
          },
          {
            title: "Actions",
            key: 'actions',
            width: 150,
            render: (_, record) => (
              <Button
                type="primary"
                onClick={async () => {
                  const res = await axios.put(`/exams/${record.id}`, {
                    ma_exam_status: 1
                  })
                  Modal.success({
                    title: 'Success',
                    content: 'Exam has been seated successfully',
                    onOk: () => {
                      window.location.reload()
                    }
                  })
                }}
              >
                Mark as Seated
              </Button>
            )
          }
        ]}
        scroll={{ x: 'max-content' }}
        request={async () => {
          const res = await axios.get('/exams')
          return {
            data: res.data,
            success: true,
          }
        }}
      />


    </PageContainer>
  )
}
