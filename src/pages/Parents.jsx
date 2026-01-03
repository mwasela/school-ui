import { ModalForm, ProTable,ProFormText, ProFormSelect } from '@ant-design/pro-components'
import React, { useRef } from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import axios from '../helpers/axios'
import { Modal, Button } from 'antd'

export default function Parents() {
  const tableRef = useRef()
  
  return (
    <PageContainer>

        <ModalForm  
        title="Add Parent"
        trigger={<Button type="primary" style={{ marginBottom: 16 }}>Add Parent</Button>}
        onFinish={async (values) => {
          await axios.post('/parents', values)
          tableRef.current?.reload()
          return true
        }}
      >
        <ProFormText
          name="ma_parent_fname"
          label="First Name"
          rules={[{ required: true, message: 'Please enter first name' }]}
        />
        <ProFormText
          name="ma_parent_surname"
          label="Last Name"
          rules={[{ required: true, message: 'Please enter last name' }]}
        />
        <ProFormText
          name="ma_parent_natid"
          label="NatID"
          rules={[{ required: true, message: 'Please enter NatID' }]}
        />
        <ProFormText
          name="ma_parent_address"
          label="Address"
          rules={[{ required: true, message: 'Please enter address' }]}
        />
        <ProFormText
          name="ma_parent_phone"
          label="Phone"
          rules={[{ required: true, message: 'Please enter phone' }]}
        />
        <ProFormText
          name="ma_parent_email"
          label="Email"
          rules={[{ required: true, message: 'Please enter email' }]}
        />
        <ProFormSelect
          name="ma_parent_gender"
          label="Gender"
          options={[
            {
              label: 'Male',
              value: 1,
            },
            {
              label: 'Female',
              value: 2,
            },
          ]}
        />
        <ProFormSelect
          name="ma_parent_status"
          label="Status"
          options={[
            {
              label: 'Active',
              value: 1,
            },
            {
              label: 'Inactive',
              value: 0,
            },
          ]}
        />
      </ModalForm>

      <ProTable
        actionRef={tableRef}
        columns={[
          {
            title: 'First Name',
            dataIndex: 'ma_parent_fname',
            key: 'ma_parent_fname',
            search: true,
          },
          {
            title: 'Last Name',
            dataIndex: 'ma_parent_surname',
            key: 'ma_parent_surname',
            search: true,
          },
          {
            title: 'NatID',
            dataIndex: 'ma_parent_natid',
            key: 'ma_parent_natid',
            search: true,
            render: (_, record) => (
              //outline text in blue
              <span style={{
                color: 'blue',
                border: '1px solid blue',
                padding: '2px 8px',
                borderRadius: '4px'
              }}>
                {record.ma_parent_natid}
              </span>
            ),
          },
          {
            title: 'Address',
            dataIndex: 'ma_parent_address',
            key: 'ma_parent_address',
            search: true,
          },
          {
            title: 'Phone',
            dataIndex: 'ma_parent_phone',
            key: 'ma_parent_phone',
            search: true,
          },
          {
            title: 'Email',
            dataIndex: 'ma_parent_email',
            key: 'ma_parent_email',
            search: true,
          },
          {
            title: 'Gender',
            dataIndex: 'ma_parent_gender',
            key: 'ma_parent_gender',
            search: false,
            render: (_, record) => (
              //if 1 male 2 female
              record.ma_parent_gender === 1 ? 'Male' : 'Female'
            ),
          },
          {
            title: 'Status',
            dataIndex: 'ma_parent_status',
            key: 'ma_parent_status',
            search: false,
            render: (_, record) => (
              //if 1 active 0 inactive, outline text in red if inactive green if active
              <span style={{
                color: record.ma_parent_status === 1 ? 'green' : 'red',
                border: `1px solid ${record.ma_parent_status === 1 ? 'green' : 'red'}`,
                padding: '2px 8px',
                borderRadius: '4px'
              }}>
                {record.ma_parent_status === 1 ? 'Active' : 'Inactive'}
              </span>
            ),
          },
          {
            title: 'Actions',
            valueType: 'option',
            render: (_, record, index, action) => [
              <ModalForm
                key="edit"
                title="Edit Parent"
                trigger={<Button type="primary">Edit</Button>}
                initialValues={record}
                onFinish={async (values) => {
                  await axios.put(`/parents/${record.id}`, values)
                  action.reload()
                  return true
                }}
              >
                <ProFormText
                  name="ma_parent_fname"
                  label="First Name"
                  rules={[{ required: true, message: 'Please enter first name' }]}
                />
                <ProFormText
                  name="ma_parent_surname"
                  label="Last Name"
                  rules={[{ required: true, message: 'Please enter last name' }]}
                />
                <ProFormText
                  name="ma_parent_natid"
                  label="NatID"
                  rules={[{ required: true, message: 'Please enter NatID' }]}
                />
                <ProFormText
                  name="ma_parent_address"
                  label="Address"
                  rules={[{ required: true, message: 'Please enter address' }]}
                />
                <ProFormText
                  name="ma_parent_phone"
                  label="Phone"
                  rules={[{ required: true, message: 'Please enter phone' }]}
                />
                <ProFormText
                  name="ma_parent_email"
                  label="Email"
                  rules={[{ required: true, message: 'Please enter email' }]}
                />
                <ProFormSelect
                  name="ma_parent_gender"
                  label="Gender"
                  options={[
                    { label: 'Male', value: 1 },
                    { label: 'Female', value: 2 },
                  ]}
                  rules={[{ required: true, message: 'Please select gender' }]}
                />
                <ProFormSelect
                  name="ma_parent_status"
                  label="Status"
                  options={[
                    { label: 'Active', value: 1 },
                    { label: 'Inactive', value: 0 },
                  ]}
                  rules={[{ required: true, message: 'Please select status' }]}
                />
              </ModalForm>
            ],
          },
        ]}
        rowKey="id"
        pagination={{
          pageSize: 10,
        }}
        toolBarRender={false}
        request={async (params) => {
          const res = await axios.get('/parents', { params })
          return {
            data: res.data,
            success: true,
            total: res.data.length,
          }
        }}
      />

  

    </PageContainer>
  )
}
