
import React from 'react';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { UserOutlined, DollarOutlined, BookOutlined, CheckCircleOutlined, CalendarOutlined, AppstoreOutlined, CoffeeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();
  const cards = [
    {
      title: 'Profiles',
      icon: <UserOutlined style={{ fontSize: 32 }} />, 
      number: 1200,
      endpoint: '/profiles',
    },
    {
      title: 'Fees',
      icon: <DollarOutlined style={{ fontSize: 32 }} />, 
      number: 450,
      endpoint: '/fees',
    },
    {
      title: 'Academics',
      icon: <BookOutlined style={{ fontSize: 32 }} />, 
      number: 98,
      endpoint: '/academics',
    },
    {
      title: 'Attendance',
      icon: <CheckCircleOutlined style={{ fontSize: 32 }} />, 
      number: 87,
      endpoint: '/attendance',
    },
    {
      title: 'Schedules',
      icon: <CalendarOutlined style={{ fontSize: 32 }} />, 
      number: 12,
      endpoint: '/schedules',
    },
    {
      title: 'Assets',
      icon: <AppstoreOutlined style={{ fontSize: 32 }} />, 
      number: 34,
      endpoint: '/masters/assets',
    },
    {
      title: 'Meals',
      icon: <CoffeeOutlined style={{ fontSize: 32 }} />, 
      number: 56,
      endpoint: '/masters/meals',
    },
  ];

  return (
    <PageContainer>
      <ProCard
        title={
          <div className="dashboard-title-center"><center>Mhandisi Dashboard</center></div>
        }
        style={{ marginBottom: 24, padding: 4 }}
        bodyStyle={{ padding: 4 }}
        headStyle={{ padding: 4 }}
      />

      <div className="dashboard-grid">
        {cards.map((card) => (
          <ProCard
            key={card.title}
            className="dashboard-card"
            onClick={() => navigate(card.endpoint)}
            bordered
            style={{ cursor: 'pointer', minWidth: 360, minHeight: 280 }}
            bodyStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}
          >
            <div className="dashboard-icon">{card.icon}</div>
            <div className="dashboard-title">{card.title}</div>
            <div className="dashboard-number">{card.number}</div>
          </ProCard>
        ))}
      </div>
    </PageContainer>
  );
}
