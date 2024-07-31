import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const DashboardStats = ({ isPanelHovered }: any) => {
  const stats = [
    { value: '324', label: 'Appoin. this month', icon: '👥' },
    { value: '22', label: 'Certified Consultants', icon: '👨‍⚕️' },
    { value: '4000', label: 'Registered Users', icon: '👥' },
    { value: '40', label: 'Blog Posts', icon: '📝' },
    { value: '383821 Rs.', label: 'Earning this Month', icon: '💰' },
    { value: '10.4 M Rs.', label: 'Total Earning till Now', icon: '🏦' },
  ];

  return (
    <>
      <h1 className="mb-4" style={{
        marginLeft: "120px",
        transform: isPanelHovered ? 'translateX(150px)' : 'translateX(0)',
        transition: 'transform 0.3s ease-in-out', 
        fontSize: "1.5rem"
      }}>
        Welcome Back, <span style={{ color: '#ff6600' }}>Kanika</span>
      </h1>
      <Container
        className="p-3"
        style={{
          background: 'transparent',
          display: isPanelHovered ? 'none' : 'block',
          transition: 'transform 0.3s ease-in-out',
        }}
      >
        <Row className="g-3 justify-content-center">
          {stats.map((stat, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={2} className="d-flex">
              <Card className="text-left stat-card">
                <Card.Body>
                  <Card.Title className="display-10">{stat.icon} {stat.value}</Card.Title>
                  <Card.Text className="text-muted">{stat.label}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default DashboardStats;
