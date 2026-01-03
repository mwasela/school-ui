import { ModalForm, ProTable, ProFormSelect, ProFormText, ProFormDatePicker, ProFormTextArea, ProFormDateTimePicker } from '@ant-design/pro-components'
import { PageContainer } from '@ant-design/pro-layout'
import React from 'react'
import axios from '../helpers/axios'
import { Button, Tag } from 'antd'
import moment from 'moment'

export default function Feepayments() {
  const tableRef = React.useRef()

  return (
    <PageContainer>

      <ModalForm
        title="Add Fee Payment"
        trigger={<Button type="primary" style={{ marginBottom: 16 }}>Add Fee Payment</Button>}
        onFinish={async (values) => {
          await axios.post('/feepayments', values);
          tableRef.current.reload();
          return true;
        }}
      >
        <ProFormSelect
          name="ma_payment_student"
          label="Student"
          request={async () => {
            const response = await axios.get('/students');
            return response.data.map((student) => ({
              label: student.ma_student_fname + ' ' + student.ma_student_middlename + ' ' +  student.ma_student_lname,
              value: student.id,
            }));
          }}
          rules={[{ required: true, message: 'Please select a student' }]}
        />
        <ProFormText
          name="ma_payment_amount"
          label="Amount Paid"
          type="number"
          rules={[{ required: true, message: 'Please enter the amount paid' }]}
        />
        <ProFormDateTimePicker
          name="ma_payment_date"
          label="Payment Date"
          rules={[{ required: true, message: 'Please select the payment date' }]}
        />
        <ProFormText
          name="ma_payment_transaction_id"
          label="Transaction ID"
          rules={[{ required: true, message: 'Please enter the transaction ID' }]}
        />
        <ProFormText
          name="ma_payment_phone"
          label="Payment Phone"
          rules={[{ required: true, message: 'Please enter the payment phone number' }]}
        />
        <ProFormTextArea
          name="ma_payment_notes"
          label="Payment Notes"
          rules={[{ required: false }]}
        />
        <ProFormSelect 
          name="ma_payment_status"
          label="Payment Status"
          options={[
            { label: 'Pending', value: 0 },
            { label: 'Completed', value: 1 },
            { label: 'Failed', value: 2 },
          ]}
          rules={[{ required: true, message: 'Please select the payment status' }]}
        />

      </ModalForm>


      <ProTable
        actionRef={tableRef}
        columns={[
          {
            title: 'Student Name',
            dataIndex: ['Student','ma_student_fname'],
            key: 'student_name',
            render: (_, record) => (
              <span>{record.Student.ma_student_fname} {record.Student.ma_student_middlename} {record.Student.ma_student_lname}</span>
            ),
          },
          {
            title: 'Paid',
            dataIndex: 'ma_payment_amount',
            key: 'ma_payment_amount',
            render: (_, record) => (
              <Tag color="purple">{record.ma_payment_amount}</Tag>
            ),
          },
          {
            title: 'Date',
            dataIndex: 'ma_payment_date',
            key: 'ma_payment_date',
            render: (_, record) => (
              <Tag color="blue">{moment(record.ma_payment_date).format('YYYY-MM-DD')}</Tag>
            ),
          },
          {
            title: 'Transaction ID',
            dataIndex: 'ma_payment_transaction_id',
            key: 'ma_payment_transaction_id',
          },
          {
            title: 'Payment Phone',
            dataIndex: 'ma_payment_phone',
            key: 'ma_payment_phone',  
            render : (_, record) => ( 
              <Tag color="geekblue">{record.ma_payment_phone}</Tag>
            )
          },
          {
            title: 'Payment Status',
            dataIndex: 'ma_payment_status',
            key: 'ma_payment_status',
            render: (_, record) => {
              let color = 'gray';
              let text = 'Unknown';
              if (record.ma_payment_status === 0) {
                color = 'orange';
                text = 'Pending';
              } else if (record.ma_payment_status === 1) {
                color = 'green';
                text = 'Completed';
              } else if (record.ma_payment_status === 2) {
                color = 'red';
                text = 'Failed';
              }
              return <Tag color={color}>{text}</Tag>;
            }
          },
          {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            search: false,
            render: (_, record) => (
              <Tag color="blue">
                {moment(record.createdAt).format('YYYY-MM-DD HH:mm:ss')}
              </Tag>
            ),
          },
          {
            title: 'Action',
            key: 'action',
            search: false,
            render: (_, record) => (
              <ModalForm
                title="Edit Fee Payment"
                trigger={<Button type="primary">Edit</Button>}
                modalProps={{ 
                  destroyOnClose: true,
                  onCancel: () => console.log('closed'),
                }}  
                initialValues={record}
                onFinish={async (values) => {
                  await axios.put(`/feepayments/${record.id}`, values);
                  tableRef.current.reload();
                  return true;
                }}
              >
                <ProFormSelect
                  name="ma_payment_student"
                  label="Student"
                  request={async () => {
                    const response = await axios.get('/students');
                    return response.data.map((student) => ({
                      label: student.ma_student_fname + ' ' + student.ma_student_middlename + ' ' +  student.ma_student_lname,
                      value: student.id,
                    }));
                  }}  
                  rules={[{ required: true, message: 'Please select a student' }]}
                />
                <ProFormText
                  name="ma_payment_amount"
                  label="Amount Paid"
                  type="number"
                  rules={[{ required: true, message: 'Please enter the amount paid' }]}
                  />
                <ProFormDateTimePicker
                  name="ma_payment_date"
                  label="Payment Date"
                  rules={[{ required: true, message: 'Please select the payment date' }]}
                />
                <ProFormText
                  name="ma_payment_transaction_id"
                  disabled
                  label="Transaction ID"
                  rules={[{ required: true, message: 'Please enter the transaction ID' }]}
                />
                <ProFormText
                  name="ma_payment_phone"
                  label="Payment Phone"
                  rules={[{ required: true, message: 'Please enter the payment phone number' }]}
                />
                <ProFormTextArea
                  name="ma_payment_notes"
                  label="Payment Notes"
                  rules={[{ required: false }]}
                />
                <ProFormSelect
                  name="ma_payment_status"
                  label="Payment Status"
                  options={[
                    { label: 'Pending', value: 0 },
                    { label: 'Completed', value: 1 },
                    { label: 'Failed', value: 2 },
                  ]}
                  rules={[{ required: true, message: 'Please select the payment status' }]}
                />
              </ModalForm>
            ),

          }


        ]}
        expandable={{
          expandedRowRender: (record) => (
            <div style={{ padding: '12px 24px' }}>
              <strong>Payment Notes:</strong>
              <p style={{ margin: '8px 0 0 0', color: '#666' }}>
                {record.ma_payment_notes || 'No notes available'}
              </p>
            </div>
          ),
        }}
        request={async () => {

          const request = await axios.get('/feepayments');
          //console.log(request.data);
          return {
            data: request.data,
            success: true,
          };

        }}
        rowKey="id"
        pagination={{
          pageSize: 10,
        }}
      />
    </PageContainer>
  )
}
