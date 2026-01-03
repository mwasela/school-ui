import React, { useEffect, useState, useRef } from 'react';
import axios from '../helpers/axios';
import { Button, message, Tabs } from 'antd';
import {
  PageContainer,
  ProCard,
  ModalForm,
  ProFormSelect,
  ProTable,
    ProFormText,
} from '@ant-design/pro-components';

export default function Assets() {
  const [visible, setVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const actionRef = useRef();
  const formRef = useRef();

  return (
    <PageContainer>

                <Button
                  type="primary"
                  style={{ marginBottom: 16 }}
                  onClick={() => {
                    setCurrentRecord(null);
                    setVisible(true);
                  }}
                >
                  Add Asset
                </Button>

                <ProTable
                  actionRef={actionRef}
                  columns={[
                    {
                      title: 'Asset Name',
                      dataIndex: 'ma_asset_name',
                      key: 'ma_asset_name',
                      valueType: 'text',
                    },
                    {
                      title: 'Asset Type',
                      dataIndex: ['assetType','ma_assettype_name'],
                      key: 'ma_asset_type',
                      valueType: 'select',
                      request: async () => {
                        const { data } = await axios.get('/assettypes');
                        return data.map((item) => ({
                          label: item.ma_assettype_name,
                          value: item.id,
                        }));
                      },
                    },
                    {
                      title: 'Target Device',
                      dataIndex: 'ma_asset_description',
                      key: 'ma_asset_description',
                      valueType: 'text',
                      search: false,
                    },
                    {
                      title: 'Status',
                      dataIndex: 'ma_asset_status',
                      key: 'ma_asset_status',
                      valueType: 'select',
                      valueEnum: {
                        1: { text: 'Active' },
                        2: { text: 'Inactive' },
                      },
                      render: (_, record) => {
                        const statusText = record.ma_asset_status === 1 ? 'Active' : 'Inactive';
                        const statusColor = record.ma_asset_status === 1 ? 'green' : 'red';
                        return <span style={{ color: statusColor }}>{statusText}</span>;
                      },
                    },
                    {
                      title: 'Action',
                      dataIndex: 'action',
                      search: false,
                      render: (_, record) => (
                        <Button
                          type="primary"
                          onClick={() => {
                            setCurrentRecord(record);
                            setVisible(true);
                          }}
                        >
                          Edit
                        </Button>
                      ),
                    },
                  ]}
                  request={async (params, sort, filter) => {
                    const { data } = await axios.get('/assets', {
                      params: {
                        current: params.current,
                        pageSize: params.pageSize,
                        ...params,
                      }
                    });
                    //console.log("assets",data);
                    return {
                      data: data,
                      success: true,
                      total: data.length,
                    };
                  }}
                  rowKey="id"
                  pagination={{ pageSize: 10 }}
                  
                  dateFormatter="string"
                  options={{
                    fullScreen: true,
                    reload: true,
                    setting: true,
                  }}
            
                />
            
            
         

      <ModalForm
        title={currentRecord ? 'Edit Asset' : 'Add Asset'}
        width="400px"
        formRef={formRef}
        open={visible}
        initialValues={currentRecord || {}}
        onFinish={async (values) => {
          const { data } = await axios.post('/assets', values);
          if (!data.error) {
            message.success(currentRecord ? 'Asset updated' : 'Asset added');
            setVisible(false);
            setCurrentRecord(null);
            actionRef.current?.reload();
          } else {
            message.error('Failed to submit Asset');
            console.error(data.error);
          }
        }}
        modalProps={{
          onCancel: () => {
            setVisible(false);
            setCurrentRecord(null);
            actionRef.current?.reload();
          },
        }}
      >
        <ProFormText
          name="ma_asset_name"
          rules={[{ required: true, message: 'Please enter asset name' }]}
          placeholder="Asset Name"
          label="Asset Name"
        />
        <ProFormSelect
          name="ma_asset_type"
          label="Asset Type"
          rules={[{ required: true, message: 'Please select asset type' }]}
          placeholder="Asset Type"
          request={async () => {
            const { data } = await axios.get('/assettypes');
            //console.log("Assettypes", data);
            return data.map((item) => ({
              label: item.ma_assettype_name,
              value: item.id,
            }));
          }}

        />
        <ProFormText
          name="ma_asset_description"
          label="Asset Description"
          rules={[{ required: true, message: 'Please enter asset description' }]}
          placeholder="Asset Description"
          
        />

        <ProFormSelect
            name="ma_asset_status"
            label="Asset Status"
            rules={[{ required: true, message: 'Please select asset status' }]}
            placeholder="Asset Status"
            options={[
              { label: 'Active', value: 1 },
              { label: 'Inactive', value: 2 },
            ]}
        />
      </ModalForm>
    </PageContainer>
  );
}
