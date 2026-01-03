import { ProFormDatePicker, ProFormText, ProFormSelect, ProTable, ModalForm, ProFormGroup } from '@ant-design/pro-components'
import React from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import axios from '../helpers/axios'
import moment from 'moment'
import { Modal, Button } from 'antd'

export default function Teachers() {
  const tableref = React.useRef()
  return (
      <PageContainer>

        <ModalForm
          title="Add Teacher"
          trigger={
          <Button
            type="primary"
            style={{
              marginBottom: 10
            }}
          >Add Teacher</Button>
        }
          onFinish={async (values) => {
            //console.log(values)
            await axios.post('/teachers', values)
            tableref.current.reload()
            return true
          }}
        >
          <ProFormGroup>
            <ProFormText
              name="ma_teacher_fname"
              label="First Name"
              width="md"
              rules={[{ required: true, message: 'Please enter first name' }]}
            />
            <ProFormText
              name="ma_teacher_surname"
              label="Last Name"
              width="md"
              rules={[{ required: true, message: 'Please enter last name' }]}
            />
          </ProFormGroup>
          <ProFormGroup>
            <ProFormText
              name="ma_teacher_natid"
              label="National ID"
              width="md"
              rules={[{ required: true, message: 'Please enter National ID' }]}
            />
            <ProFormText
              name="ma_teacher_tsc_no"
              label="TSC No"
              width="md"
              rules={[{ required: true, message: 'Please enter TSC No' }]}
            />
          </ProFormGroup>
          <ProFormGroup>
            <ProFormDatePicker
              name="ma_teacher_dob"
              label="Date of Birth"
              width="md"
              rules={[{ required: true, message: 'Please enter date of birth' }]}
            />
            <ProFormSelect
              name="ma_teacher_gender"
              label="Gender"
              width="md"
              options={[
                { label: 'Male', value: 1 },
                { label: 'Female', value: 2 },
              ]}
              rules={[{ required: true, message: 'Please select gender' }]}
            />
          </ProFormGroup>
          <ProFormGroup>
            <ProFormText
              name="ma_teacher_phone"
              label="Phone"
              width="md"
              rules={[{ required: true, message: 'Please enter phone' }]}
            />
            <ProFormText
              name="ma_teacher_email"
              label="Email"
              width="md"
              rules={[{ required: true, message: 'Please enter email' }]}
            />
          </ProFormGroup>
          <ProFormText
            name="ma_teacher_address"
            label="Address"
            rules={[{ required: true, message: 'Please enter address' }]}
          />
          <ProFormText
            name="ma_teacher_photo"
            label="Photo"
          />
          <ProFormGroup>
            <ProFormSelect
              name="ma_teacher_type"
              label="Type"
              width="md"
              request={async () => {
                const res = await axios.get('/teachertypes')
                return res.data.map(type => ({
                  label: type.ma_teachertype_name,
                  value: type.id
                }))
              }}
              rules={[{ required: true, message: 'Please select type' }]}
            />
            <ProFormSelect
              name="ma_teacher_subjectcombo_id"
              label="Subject Combo"
              width="md"
              request={async () => {
                const res = await axios.get('/subjectcombos')
                return res.data.map(combo => ({
                  label: combo.ma_subjectcombo_name,
                  value: combo.id
                }))
              }}
              rules={[{ required: true, message: 'Please select subject combo' }]}
            />
          </ProFormGroup>
          <ProFormSelect
            name="ma_teacher_status"
            label="Status"
            options={[
              { label: 'Active', value: 1 },
              { label: 'Inactive', value: 0 },
            ]}
            rules={[{ required: true, message: 'Please select status' }]}
          />
        </ModalForm>


        <ProTable
        actionRef={tableref}
          columns={[
            {
              title: 'First Name',
              dataIndex: 'ma_teacher_fname',
              key: 'ma_teacher_fname',
            },
            {
              title: 'Last Name',
              dataIndex: 'ma_teacher_surname',
              key: 'ma_teacher_surname',
            },
            {
              title: "National ID",
              dataIndex: 'ma_teacher_natid',
              key: 'ma_teacher_natid',
            },
            {
              title: 'TSC No',
              dataIndex: 'ma_teacher_tsc_no',
              key: 'ma_teacher_tsc_no',
              //outline blue and fill lightblue
              render: (text) => <span style={{ outline: '2px solid blue', backgroundColor: 'lightblue', padding: '2px' }}>{text}</span>,
            },
            {
              title: 'DOB',
              dataIndex: 'ma_teacher_dob',
              key: 'ma_teacher_dob',
              render: (text) => moment(text).format('YYYY-MM-DD'),
            },
            {
              title: 'Gender',
              dataIndex: 'ma_teacher_gender',
              key: 'ma_teacher_gender',
              //if 1 male  if 2 female (add gender emojis)
              render: (text) => (text === 1 ? 'Male ♂' : text === 2 ? 'Female ♀' : ''),
            },
            {
              title: 'Phone',
              dataIndex: 'ma_teacher_phone',
              key: 'ma_teacher_phone',
              //make link to call phone number
              render: (text) => <a href={`tel:${text}`}>{text}</a>,

            },
            {
              title: 'Email',
              dataIndex: 'ma_teacher_email',
              key: 'ma_teacher_email',
              //link to mailto
              render: (text) => <a href={`mailto:${text}`}>{text}</a>,
            },
            {
              title: 'Address',
              dataIndex: 'ma_teacher_address',
              key: 'ma_teacher_address',
            },
            {
              title: 'Photo',
              dataIndex: 'ma_teacher_photo',
              key: 'ma_teacher_photo',
            },
            {
              title: 'Type',
              dataIndex:['Teachertype', 'ma_teachertype_name'],
              key: 'ma_teacher_type',
              //make green outline
              render: (text) => <span style={{ outline: '2px solid green', padding: '2px' }}>{text}</span>,
            
            },
            {
              title: 'Subject Combo',
              dataIndex: 'ma_teacher_subjectcombo_id',
              key: 'ma_teacher_subjectcombo_id',
            },
            {
              title: 'Status',
              dataIndex: 'ma_teacher_status',
              key: 'ma_teacher_status',
              render: (text) => (
                <span style={{
                  color: text === 1 ? 'green' : 'red',
                  border: `1px solid ${text === 1 ? 'green' : 'red'}`,
                  padding: '2px 8px',
                  borderRadius: '4px'
                }}>
                  {text === 1 ? 'Active' : 'Inactive'}
                </span>
              ),

            },
            {
              title: 'Actions',
              dataIndex: 'actions',
              key: 'actions',
              render: (_, record) => (
                <ModalForm
                  title="Edit Teacher"
                  trigger={<Button type="primary">Edit</Button>}
                  initialValues={record}
                  onFinish={async (values) => {
                    //console.log(values)
                    await axios.put(`/teachers/${record.id}`, values)
                    tableref.current.reload()
                    return true
                  }}
                >
                  <ProFormGroup>
                    <ProFormText
                      name="ma_teacher_fname"
                      label="First Name"
                      width="md"
                      rules={[{ required: true, message: 'Please enter first name' }]}
                    />
                    <ProFormText
                      name="ma_teacher_surname"
                      label="Last Name"
                      width="md"
                      rules={[{ required: true, message: 'Please enter last name' }]}
                    />
                  </ProFormGroup>
                  <ProFormGroup>
                    <ProFormText
                      name="ma_teacher_natid"
                      label="National ID"
                      width="md"
                      rules={[{ required: true, message: 'Please enter National ID' }]}
                    />
                    <ProFormText
                      name="ma_teacher_tsc_no"
                      label="TSC No"
                      width="md"
                      rules={[{ required: true, message: 'Please enter TSC No' }]}
                    />
                  </ProFormGroup>
                  <ProFormGroup>
                    <ProFormDatePicker
                      name="ma_teacher_dob"
                      label="Date of Birth"
                      width="md"
                      rules={[{ required: true, message: 'Please enter date of birth' }]}
                    />
                    <ProFormSelect
                      name="ma_teacher_gender"
                      label="Gender"
                      width="md"
                      options={[
                        { label: 'Male', value: 1 },
                        { label: 'Female', value: 2 },
                      ]}
                      rules={[{ required: true, message: 'Please select gender' }]}
                    />
                  </ProFormGroup>
                  <ProFormGroup>
                    <ProFormText
                      name="ma_teacher_phone"
                      label="Phone"
                      width="md"
                      rules={[{ required: true, message: 'Please enter phone' }]}
                    />
                    <ProFormText
                      name="ma_teacher_email"
                      label="Email"
                      width="md"
                      rules={[{ required: true, message: 'Please enter email' }]}
                    />
                  </ProFormGroup>
                  <ProFormText
                    name="ma_teacher_address"
                    label="Address"
                    rules={[{ required: true, message: 'Please enter address' }]}
                  />
                  <ProFormText
                    name="ma_teacher_photo"
                    label="Photo"
                  />
                  <ProFormGroup>
                    <ProFormSelect
                      name="ma_teacher_type"
                      label="Type"
                      width="md"
                      request={async () => {
                        const res = await axios.get('/teachertypes')
                        return res.data.map(type => ({
                          label: type.ma_teachertype_name,
                          value: type.id
                        }))
                      }}
                      rules={[{ required: true, message: 'Please select type' }]}
                    />
                    <ProFormSelect
                      name="ma_teacher_subjectcombo_id"
                      label="Subject Combo"
                      width="md"
                      request={async () => {
                        const res = await axios.get('/subjectcombos')
                        return res.data.map(combo => ({
                          label: combo.ma_subjectcombo_name,
                          value: combo.id
                        }))
                      }}
                      rules={[{ required: true, message: 'Please select subject combo' }]}
                    />
                  </ProFormGroup>
                  <ProFormSelect
                    name="ma_teacher_status"
                    label="Status"
                    options={[
                      { label: 'Active', value: 1 },
                      { label: 'Inactive', value: 0 },
                    ]}
                    rules={[{ required: true, message: 'Please select status' }]}
                  />
                </ModalForm>
              ),
            }


          ]}
          scroll={{ x: 'max-content' }}
          request={async () => {
            const res = await axios.get('/teachers')
            //console.log(res.data)
            return {
              data: res.data,
              success: true,
            }
          }}
        />
      </PageContainer>
  )
}
