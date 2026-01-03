import { ModalForm, ProTable, ProFormText, ProFormSelect } from '@ant-design/pro-components'
import React from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import { Tag, Button } from 'antd'
import axios from '../helpers/axios'

export default function Workers() {
  const tableref = React.useRef()
  const [editVisible, setEditVisible] = React.useState(false)
  const [currentRecord, setCurrentRecord] = React.useState(null)

  return (
    <PageContainer>


      <ModalForm  
        title="Add Worker"
        grid
        trigger={
        <Button
          type="primary"
          style={{
            marginBottom: 10
          }}
        >Add Worker</Button>
      }
        onFinish={async (values) => {
          //console.log(values)
          await axios.post('/workers', values)
          tableref.current.reload()
          return true
        }}
      >
        <ProFormText
          name="ma_worker_fname"
          label="First Name"
          colProps={{ span: 12 }}
          rules={[{ required: true, message: 'Please enter first name' }]}
        />
        <ProFormText
          name="ma_worker_surname"
          label="Last Name"
          colProps={{ span: 12 }}
          rules={[{ required: true, message: 'Please enter last name' }]}
        />
        <ProFormSelect
          name="ma_worker_workertype"
          label="Worker Type"
          colProps={{ span: 12 }}
          request={async () => {
            const res = await axios.get('/workertypes')
            return res.data.map(type => ({
              label: type.ma_workertype_name,
              value: type.id
            }))
          }}
          rules={[{ required: true, message: 'Please enter worker type' }]}
        />
        <ProFormText
          name="ma_worker_dob"
          label="Date of Birth"
          colProps={{ span: 12 }}
          rules={[{ required: true, message: 'Please enter date of birth' }]}
        />
        <ProFormSelect
          name="ma_worker_gender"
          label="Gender"
          colProps={{ span: 12 }}
          options={[
            { label: 'Male', value: 1 },
            { label: 'Female', value: 2 }
          ]}
          rules={[{ required: true, message: 'Please enter gender' }]}
        />
        <ProFormText
          name="ma_worker_natid"
          label="National ID"
          colProps={{ span: 12 }}
          type="text"
          rules={[{ required: true, message: 'Please enter national ID' }]}
        />
        <ProFormText
          name="ma_worker_email"
          label="Email"
          colProps={{ span: 12 }}
          type="email"
          rules={[{ required: true, message: 'Please enter email' }]}
        />
        <ProFormText
          name="ma_worker_phone"
          label="Phone"
          colProps={{ span: 12 }}
          type="text"
          rules={[{ required: true, message: 'Please enter phone' }]}
        />
        <ProFormText
          name="ma_worker_address"
          label="Address"
          colProps={{ span: 12 }}
          type="text"
          rules={[{ required: true, message: 'Please enter address' }]}
        />
        <ProFormText
          name="ma_worker_paymentfile"
          label="Payment File"
          colProps={{ span: 12 }}
          type="text"
          rules={[{ required: true, message: 'Please enter payment file' }]}
        />
        <ProFormSelect
          name="ma_worker_status"
          label="Status"
          colProps={{ span: 12 }}
          options={[
            {label: 'Active', value: 1},
            {label: 'Inactive', value: 0},
          ]}
          rules={[{ required: true, message: 'Please enter status' }]}
        />

      </ModalForm>

      <ModalForm
        title="Edit Worker"
        grid
        open={editVisible}
        initialValues={currentRecord}
        onOpenChange={setEditVisible}
        onFinish={async (values) => {
          await axios.put(`/workers/${currentRecord.id}`, values)
          tableref.current.reload()
          setEditVisible(false)
          setCurrentRecord(null)
          return true
        }}
      >
        <ProFormText
          name="ma_worker_fname"
          label="First Name"
          colProps={{ span: 12 }}
          rules={[{ required: true, message: 'Please enter first name' }]}
        />
        <ProFormText
          name="ma_worker_surname"
          label="Last Name"
          colProps={{ span: 12 }}
          rules={[{ required: true, message: 'Please enter last name' }]}
        />
        <ProFormSelect
          name="ma_worker_workertype"
          label="Worker Type"
          colProps={{ span: 12 }}
          request={async () => {
            const res = await axios.get('/workertypes')
            return res.data.map(type => ({
              label: type.ma_workertype_name,
              value: type.id
            }))
          }}
          rules={[{ required: true, message: 'Please enter worker type' }]}
        />
        <ProFormText
          name="ma_worker_dob"
          label="Date of Birth"
          colProps={{ span: 12 }}
          rules={[{ required: true, message: 'Please enter date of birth' }]}
        />
        <ProFormSelect
          name="ma_worker_gender"
          label="Gender"
          colProps={{ span: 12 }}
          options={[
            { label: 'Male', value: 1 },
            { label: 'Female', value: 2 }
          ]}
          rules={[{ required: true, message: 'Please enter gender' }]}
        />
        <ProFormText
          name="ma_worker_natid"
          label="National ID"
          colProps={{ span: 12 }}
          type="text"
          rules={[{ required: true, message: 'Please enter national ID' }]}
        />
        <ProFormText
          name="ma_worker_email"
          label="Email"
          colProps={{ span: 12 }}
          type="email"
          rules={[{ required: true, message: 'Please enter email' }]}
        />
        <ProFormText
          name="ma_worker_phone"
          label="Phone"
          colProps={{ span: 12 }}
          type="text"
          rules={[{ required: true, message: 'Please enter phone' }]}
        />
        <ProFormText
          name="ma_worker_address"
          label="Address"
          colProps={{ span: 12 }}
          type="text"
          rules={[{ required: true, message: 'Please enter address' }]}
        />
        <ProFormText
          name="ma_worker_paymentfile"
          label="Payment File"
          colProps={{ span: 12 }}
          type="text"
          rules={[{ required: true, message: 'Please enter payment file' }]}
        />
        <ProFormSelect
          name="ma_worker_status"
          label="Status"
          colProps={{ span: 12 }}
          options={[
            { label: 'Active', value: 1 },
            { label: 'Inactive', value: 0 }
          ]}
          rules={[{ required: true, message: 'Please enter status' }]}
        />
      </ModalForm>
      
      <ProTable 
        actionRef={tableref}
        rowKey="id"
        columns={[
          {
            title: 'First Name',
            dataIndex: 'ma_worker_fname',
            key: 'ma_worker_fname',
            valueType: 'text',
          },
          {
            title: 'Last Name',
            dataIndex: 'ma_worker_surname',
            key: 'ma_worker_surname',
            valueType: 'text',
          },
          {
            title: 'Type',
            dataIndex: ['Workertype','ma_workertype_name'],
            key: 'ma_worker_workertype',
            valueType: 'text',
            //render tag green
            render: (_, record) => (
              <Tag color="blue">{record.Workertype.ma_workertype_name}</Tag>
            )
          },
          {
            title: "DOB",
            dataIndex: 'ma_worker_dob',
            key: 'ma_worker_dob',
            valueType: 'date',

          },
             {
            title: "Gender",
            dataIndex: 'ma_worker_gender',
            key: 'ma_worker_gender',
            valueType: 'text',
            //tag render, and apprpriate gender emoji
            render: (_, record) => (
              <Tag>
                {record.ma_worker_gender === 1 ? 'Male ♂️' : record.ma_worker_gender === 2 ? 'Female ♀️' : 'Other'}
              </Tag>
            )
          },
          {
            title: 'National ID',
            dataIndex: 'ma_worker_natid',
            key: 'ma_worker_natid',
            valueType: 'text',
            render: (_, record) => (
              <Tag>{record.ma_worker_natid}</Tag>
            )
          },
          {
            title: 'Email',
            dataIndex: 'ma_worker_email',
            key: 'ma_worker_email',
            valueType: 'text',
          },
          {
            title: 'Phone',
            dataIndex: 'ma_worker_phone',
            key: 'ma_worker_phone',
            valueType: 'text',
            render: (_, record) => (
              <Tag>{record.ma_worker_phone}</Tag>
            )
          },
          {
            title: 'Address',
            dataIndex: 'ma_worker_address',
            key: 'ma_worker_address',
            valueType: 'text',
          },
          {
            title: 'Payment File',
            dataIndex: 'ma_worker_paymentfile',
            key: 'ma_worker_paymentfile',
            valueType: 'text',
          },
          {
            title: 'Status',
            dataIndex: 'ma_worker_status',
            key: 'ma_worker_status',
            valueType: 'text',
            render: (_, record) => (
              <Tag color={record.ma_worker_status === 1 ? 'green' : 'red'}>
                {record.ma_worker_status === 1 ? 'Active' : 'Inactive'}
              </Tag>
            )
          },
          {
            title: 'Actions',
            render: (_, record) => (
              <Button
                type="primary"
                onClick={() => {
                  setCurrentRecord(record)
                  setEditVisible(true)
                }}
              >
                Edit
              </Button>
            )
          }
       
        ]}
        request={async () => {
          const res = await axios.get('/workers')
          console.log("Workers", res.data)
          return {
            data: res.data,
            success: true,
          }
        }}
      />




    </PageContainer>  
  )
}
