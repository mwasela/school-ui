import { ModalForm, ProTable, ProFormText, ProFormSelect } from '@ant-design/pro-components'
import { PageContainer } from '@ant-design/pro-layout'
import axios from '../helpers/axios'
import React from 'react'
import { Modal, Button, Input } from 'antd'
import { render } from 'react-dom'

export default function Classes() {

  return (
    <PageContainer>

      <ModalForm
        title="Add Grade"
        trigger={
        <Button
          type="primary"
          style={{
            marginBottom: 10
          }}
        >Add Grade</Button>
      }
        onFinish={async (values) => {
          //console.log(values)
          await axios.post('/grades', values)
          return true
        }}
      >
        <ProFormText
          name="ma_grade_name"
          label="Grade Name"
          rules={[{ required: true, message: 'Please enter grade name' }]}
        >
          
        </ProFormText>
        <ProFormSelect    
          name="ma_grade_level"
          label="Grade Level"
          options={[
            {label: '10', value: 10},
            {label: '20', value: 20},
            {label: '30', value: 30},
            {label: '40', value: 40},
            {label: '50', value: 50},
            {label: '60', value: 60},
            {label: '70', value: 70},
            {label: '80', value: 80},
            {label: '90', value: 90},
            {label: '100', value: 100},
            {label: '110', value: 110},
            {label: '120', value: 120},
            {label: '130', value: 130},
            {label: '140', value: 140},
          ]}
          rules={[{ required: true, message: 'Please enter grade level' }]}
        />
        <ProFormText
          name="ma_grade_status"
          label="Grade Status"
   
          valueEnum={{
            1: 'Active',
            0: 'Inactive',
          }}
          rules={[{ required: true, message: 'Please enter grade status' }]}
        >
        </ProFormText>
          </ModalForm>
      <ProTable
        columns={[
          { title: 'Grade Name', dataIndex: 'ma_grade_name' },
          { title: 'Grade Level', dataIndex: 'ma_grade_level' },
          { 
            title: 'Grade Status', 
            dataIndex: 'ma_grade_status', 
            valueEnum: { 1: 'Active', 0: 'Inactive' },
            render: (text, record) => (
              <span style={{ 
                color: record.ma_grade_status === 1 ? 'green' : 'red',
                border: `1px solid ${record.ma_grade_status === 1 ? 'green' : 'red'}`,
                padding: '2px 8px',
                borderRadius: '4px'
              }}>
                {record.ma_grade_status === 1 ? 'Active' : 'Inactive'}
              </span>
            ),
          },
          //add edit button
          {
            title: 'Actions',
            valueType: 'option',
            render: (text, record, _, action) => [
              <ModalForm
                title="Edit Grade"
                key="edit"
                trigger={<Button type="primary">Edit</Button>}
                initialValues={record}
                onFinish={async (values) => {
                  //console.log(values)
                  await axios.put(`/grades/${record.id}`, values)
                  action.reload()
                  return true
                }}
              >
                <ProFormText
                  name="ma_grade_name"
                  label="Grade Name"
                  rules={[{ required: true, message: 'Please enter grade name' }]}
                >
                </ProFormText>
                <ProFormSelect
                  name="ma_grade_level"
                  label="Grade Level"
                  options={[
                    {label: '10', value: 10},
                    {label: '20', value: 20},
                    {label: '30', value: 30},
                    {label: '40', value: 40},
                    {label: '50', value: 50},
                    {label: '60', value: 60},
                    {label: '70', value: 70},
                    {label: '80', value: 80},
                    {label: '90', value: 90},
                    {label: '100', value: 100},
                    {label: '110', value: 110},
                    {label: '120', value: 120},
                    {label: '130', value: 130},
                    {label: '140', value: 140},
                  ]}
                />
                <ProFormSelect
                  name="ma_grade_status"
                  label="Grade Status"
                  options={[
                    {label: 'Active', value: 1},
                    {label: 'Inactive', value: 0},
                  ]}
                  rules={[{ required: true, message: 'Please enter grade status' }]}
                />
              </ModalForm>
            ],
          },
        ]}

        request={async () => {

          const res = await axios.get('/grades')
          //console.log(res.data)
          return {
            data: res.data,
            success: true,
          }
        }}
        rowKey="id"
        search={false}
        pagination={{
          pageSize: 10,
        }}
      />


    </PageContainer>
  )
}
