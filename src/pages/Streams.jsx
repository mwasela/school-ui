import { ProTable, ModalForm, ProFormText, ProFormSelect } from '@ant-design/pro-components'
import { PageContainer } from '@ant-design/pro-layout'
import React from 'react'
import axios from '../helpers/axios'
import moment from 'moment'
import { Button, Modal } from 'antd'


export default function Streams() {
  const tableref = React.useRef()

  return (
    <PageContainer>

      <ModalForm
        title="Add Stream"
        trigger={
        <Button
          type="primary"
          style={{
            marginBottom: 10
          }}
        >Add Stream</Button>
      }
        onFinish={async (values) => {
          //console.log(values)
          await axios.post('/streams', values)
          tableref.current.reload()
          return true
        }}
      >
        <ProFormText  
          name="ma_stream_name"
          label="Stream Name"
          rules={[{ required: true, message: 'Please enter stream name' }]}
        />
        <ProFormSelect
          name="ma_stream_grade"
          label="Stream Grade"
          request={async () => {
            const res = await axios.get('/grades')
            return res.data.map(grade => ({
              label: grade.ma_grade_name,
              value: grade.id
            }))
          }}
          rules={[{ required: true, message: 'Please enter stream grade' }]}
        />
        <ProFormSelect
          name="ma_stream_status"
          label="Stream Status"
          options={[
            {label: 'Active', value: 1},
            {label: 'Inactive', value: 0},
          ]}
          rules={[{ required: true, message: 'Please enter stream status' }]}
        />
      </ModalForm>


      <ProTable
      actionRef={tableref}
        columns={[
          {
            title: 'Stream Name',
            dataIndex: 'ma_stream_name',
            key: 'ma_stream_name',
          },
          {
            title: 'Stream Grade',
            dataIndex: ['Grade','ma_grade_name'],
            key: 'ma_stream_grade',
            
          },  
          {
            title: 'Stream Grade Level',
            dataIndex: ['Grade','ma_grade_level'],
            key: 'ma_stream_grade_level',
          },
          {
            title: 'Stream Status',
            dataIndex: 'ma_stream_status',
            key: 'ma_stream_status',
            //render with color and outline text
            render: (text) => (
              <span style={{
                color: text === 1 ? 'green' : 'red',
                border: `1px solid ${text === 1 ? 'green' : 'red'}`,
                padding: '2px 8px',
                borderRadius: '4px'
              }}>
                {text === 1 ? 'Active' : 'Inactive'}
              </span>
            )
          },
          {
            title: "Create Date",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
          },
          {
            title: 'Actions',
            key: 'actions',
            render: (_, record, index, action) => [
              <ModalForm
                title="Edit Stream"
                key="editStream"
                trigger={<Button type="primary">Edit</Button>}
                initialValues={record}
                onFinish={async (values) => {
                  //console.log(values) 
                  await axios.put(`/streams/${record.id}`, values)
                  tableref.current.reload()
                  return true
                }}
              >
                <ProFormText
                  name="ma_stream_name"
                  label="Stream Name"
                  rules={[{ required: true, message: 'Please enter stream name' }]}
                />
                <ProFormSelect
                  name="ma_stream_grade"
                  label="Stream Grade"
                  request={async () => {
                    const res = await axios.get('/grades')
                    return res.data.map(grade => ({
                      label: grade.ma_grade_name,
                      value: grade.id
                    }))
                  }}
                />
                <ProFormSelect
                  name="ma_stream_status"
                  label="Stream Status"
                  options={[
                    {label: 'Active', value: 1},
                    {label: 'Inactive', value: 0},
                  ]}
                  rules={[{ required: true, message: 'Please enter stream status' }]}
                />
              </ModalForm>
            ]
          }
        ]}
        request={async () => {
          const res = await axios.get('/streams')
          //console.log(res.data)
          if (res.status === 200) {
            return {
              data: res.data,
              success: true,
            }
          } else {
            return {
              data: [],
              success: true,
            }
          }
        }}
        scroll={{x:'max-content'}}
        rowKey="id"
        search={false}
        pagination={{
          pageSize: 10,
        }}
      />
    </PageContainer>
  )
}
