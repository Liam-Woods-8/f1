import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Card, CardHeader } from '../components/common/Card';
import { Line, Bar } from 'react-chartjs-2';
import { Theme } from '../styles/theme';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PageWrapper = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const Header = styled.div`
  h1 {
    font-size: ${({ theme }) => theme.typography.fontSizes.xxl};
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }

  p {
    color: ${({ theme }) => theme.colors.secondaryGray};
  }
`;

const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const RaceAnalytics: React.FC = () => {
  const theme = useContext(ThemeContext) as Theme;
  const currentRace = useSelector((state: RootState) => state.race.currentRace);
  const drivers = useSelector((state: RootState) => state.driver.drivers);

  // Lap Times Chart Data
  const lapTimesData = {
    labels: currentRace?.lapTimes.map(lap => `Lap ${lap.lap}`) || [],
    datasets: drivers.map(driver => ({
      label: driver.name,
      data: currentRace?.lapTimes
        .filter(lap => lap.position === drivers.findIndex(d => d.driverId === driver.driverId) + 1)
        .map(lap => {
          const [minutes, seconds] = lap.time.split(':');
          return Number(minutes) * 60 + Number(seconds);
        }) || [],
      borderColor: driver.team === 'Red Bull Racing' ? '#0600EF' :
                  driver.team === 'Mercedes' ? '#00D2BE' :
                  driver.team === 'Ferrari' ? '#DC0000' :
                  driver.team === 'McLaren' ? '#FF8700' :
                  theme.colors.primary,
      tension: 0.1,
    })),
  };

  // Pit Stops Chart Data
  const pitStopsData = {
    labels: drivers.map(driver => driver.name),
    datasets: [{
      label: 'Pit Stop Duration',
      data: drivers.map(driver => 
        currentRace?.pitStops
          .filter(stop => stop.lap <= currentRace.lapTimes.length)
          .reduce((total, stop) => total + stop.duration, 0) || 0
      ),
      backgroundColor: theme.colors.primary,
    }],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Time (seconds)',
        },
      },
    },
  };

  return (
    <PageWrapper>
      <Header>
        <h1>Race Analytics</h1>
        <p>Detailed analysis of race performance and statistics</p>
      </Header>

      <ChartGrid>
        <Card>
          <CardHeader 
            title="Lap Times Comparison" 
            subtitle="Driver lap times throughout the race"
          />
          <Line data={lapTimesData} options={chartOptions} />
        </Card>

        <Card>
          <CardHeader 
            title="Total Pit Stop Duration" 
            subtitle="Cumulative pit stop time per driver"
          />
          <Bar 
            data={pitStopsData} 
            options={{
              ...chartOptions,
              scales: {
                ...chartOptions.scales,
                y: {
                  ...chartOptions.scales.y,
                  title: {
                    display: true,
                    text: 'Duration (seconds)',
                  },
                },
              },
            }} 
          />
        </Card>

        <Card>
          <CardHeader 
            title="Race Statistics" 
            subtitle="Key performance indicators"
          />
          <div style={{ padding: theme.spacing.lg }}>
            <p>Total Laps: {currentRace?.lapTimes.length || 0}</p>
            <p>Total Pit Stops: {currentRace?.pitStops.length || 0}</p>
            <p>Race Status: {currentRace?.isLive ? 'Live' : 'Completed'}</p>
            <p>Circuit: {currentRace?.circuit || 'N/A'}</p>
          </div>
        </Card>
      </ChartGrid>
    </PageWrapper>
  );
};

export default RaceAnalytics; 