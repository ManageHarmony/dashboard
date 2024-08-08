'use client';

import React, { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, ChartOptions, LineController, BarController } from 'chart.js';
import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  BarController,
  LineController,
  Title,
  Tooltip,
  Legend
);
interface Dataset {
  type: 'line' | 'bar';
  label: string;
  borderColor?: string;
  backgroundColor?: string;
  borderWidth?: number;
  fill?: boolean;
  data: number[];
}

interface ChartData {
  labels: string[];
  datasets: Dataset[];
}

const DynamicChart: React.FC = () => {
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
              label: 'Dataset 2',
              borderColor: '#3b3fef',
              borderWidth: 2,
              fill: false,
              data: [30, -20, 40, -50, 30, 70],
            },
            {
              type: 'bar',
              label: 'Dataset 1',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              data: [40, -10, 60, -80, 40, 50],
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            },
          ],
        });
      }, 1000);
    });
  };

  useEffect(() => {
    fetchData().then((chartData) => setData(chartData));
  }, []);

  const options: ChartOptions<'line' | 'bar'> = {
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
  };

  return (
    <Card className="dynamicChart" style={{ width: "100%", height: "350px", backgroundColor: "white", borderRadius: "20px", overflow: "hidden", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
      <CardHeader title={<Typography variant="h6">Chart Title</Typography>} />
      <CardContent>
        <div className="chart-container" style={{ height: '300px', paddingBottom: '30px' }}>
          {data ? <Bar options={options} data={data as any} /> : <div>Loading...</div>}
        </div>
      </CardContent>
    </Card>
  );
};

export default DynamicChart;
