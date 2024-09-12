'use client';

import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Card, CardContent } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface Dataset {
  type: 'line';
  label: string;
  borderColor?: string;
  backgroundColor?: string;
  borderWidth?: number;
  fill?: boolean;
  data: number[];
  tension?: number;  // Adding tension for the wave effect
}

interface ChartData {
  labels: string[];
  datasets: Dataset[];
}

const WaveChart: React.FC = () => {
  const [data, setData] = useState<ChartData | null>(null);

  const fetchData = async (): Promise<ChartData> => {
    // Simulate fetching data from a database
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [
            {
              type: 'line',
              label: 'Wave Dataset',
              borderColor: '#3b3fef',
              borderWidth: 2,
              fill: false,
              tension: 0.4,  // Adjust tension to create a wave effect
              data: [30, -20, 40, -50, 30, 70],
            },
          ],
        });
      }, 1000);
    });
  };

  useEffect(() => {
    fetchData().then((chartData) => setData(chartData));
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Card 
      className="WaveChart" 
      style={{ 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        justifyContent:  "center",  
        width: "100%", 
        height: "400px", 
        backgroundColor: "white", 
        borderRadius: "20px", 
        overflow: "hidden", 
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        paddingBottom: '30px' 
      }}
    >
      <div style={{height: "10%", padding: "20px", width: "100%", display: "flex"}}>
        <h5>Publish Frequency</h5>
      </div>
      <CardContent style={{width: "100%", height: "90%"}}>
        <div className="chart-container" style={{ paddingBottom: '30px'}}>
          {data ? <Line  data={data as any} /> : <div>Loading...</div>}
        </div>
      </CardContent>
    </Card>
  );
};

export default WaveChart;
