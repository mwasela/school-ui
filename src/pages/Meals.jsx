import { ProFormSelect, ProFormText, ModalForm  } from '@ant-design/pro-form'
import React from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import { Button} from 'antd'
import axios from '../helpers/axios'
import moment from 'moment'
import { Tag } from 'antd'
import { ProTable } from '@ant-design/pro-components'

export default function Meals() {
  const tableref = React.useRef()

  return (
    <PageContainer>
      <ModalForm
        title="Add Meal"
        trigger={
        <Button
          type="primary"
          style={{
            marginBottom: 10
          }}
        >Add Meal</Button>
      }
        onFinish={async (values) => {
          //console.log(values)
          await axios.post('/meals', values)
          tableref.current.reload()
          return true
        }}
      >
        <ProFormText
          name="ma_meal_name" 
          label="Meal Name"
          rules={[{ required: true, message: 'Please enter meal name' }]}
        />
        <ProFormSelect
          name="ma_meal_type"
          label="Meal Type"
          request={async () => {
            const res = await axios.get('/mealtypes')
            return res.data.map(type => ({
              label: type.ma_mealtype_name,
              value: type.id
            }))
          }}
          rules={[{ required: true, message: 'Please enter meal type' }]}
        />
        <ProFormText
          name="ma_meal_price"
          label="Meal Price"
          rules={[{ required: true, message: 'Please enter meal price' }]}
        />
        <ProFormSelect
          name="ma_meal_status"
          label="Meal Status"
          options={[
            {label: 'Available', value: 1},
            {label: 'Unavailable', value: 0},
          ]}
          rules={[{ required: true, message: 'Please enter meal status' }]}
        />
      </ModalForm>
      
      <ProTable
        actionRef={tableref}
        rowKey="id"
        columns={[
          {
            title: 'Meal Name',
            dataIndex: 'ma_meal_name',
            key: 'ma_meal_name',
          },
          {
            title: 'Meal Type',
            dataIndex: ['Mealtype','ma_mealtype_name'],
            key: 'ma_meal_type',
            valueType: 'select',
            request: async () => {
              const res = await axios.get('/mealtypes')
              return res.data.map(type => ({
                label: type.ma_mealtype_name,
                value: type.id
              }))
            },
            render: (_, record) => (
              <Tag color="blue">{record.Mealtype.ma_mealtype_name}</Tag>
            )
          },
          {
            title: 'Meal Price',
            dataIndex: 'ma_meal_price',
            key: 'ma_meal_price',
          },
          {
            title: 'Meal Status',
            dataIndex: 'ma_meal_status',
            key: 'ma_meal_status',
            render: (_, record) => (
              <span style={{
                color: record.ma_meal_status === 1 ? 'green' : 'red',
                fontWeight: 'bold',
                border: `1px solid ${record.ma_meal_status === 1 ? 'green' : 'red'}`,
                padding: '2px 8px',
                borderRadius: '4px',
              }}>
                {record.ma_meal_status === 1 ? 'Available' : 'Unavailable'}
              </span>
            )
          },
          {
            title: 'Change Status',
            render: (_, record) => (
              <Button
                onClick={async () => {
                  await axios.put(`/meals/${record.id}`,{
                    ma_meal_status: record.ma_meal_status === 1 ? 0 : 1
                  })
                  tableref.current.reload()
                }}
              >
                Toggle Status
              </Button>
            )
          }
        ]}
        request={async (params, sort, filter) => {
          const res = await axios.get('/meals', {
            params: {
              current: params.current,
              pageSize: params.pageSize,
              ...params,
            }
          })
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
