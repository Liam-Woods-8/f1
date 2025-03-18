import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Line } from 'react-chartjs-2';
import { theme } from '../styles/theme';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DashboardWrapper = styled.div`
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

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const StatCard = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};

  h3 {
    color: ${({ theme }) => theme.colors.secondaryGray};
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }

  .value {
    font-size: ${({ theme }) => theme.typography.fontSizes.xl};
    font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
    color: ${({ theme }) => theme.colors.text};
  }
`;

const ChartContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const Dashboard: React.FC = () => {
  const currentRace = useSelector((state: RootState) => state.race.currentRace);
  const drivers = useSelector((state: RootState) => state.driver.drivers);
  const teams = useSelector((state: RootState) => state.team.teams);

  // Sample data for the line chart
  const lapTimeData = {
    labels: currentRace?.lapTimes.map(lap => `Lap ${lap.lap}`) || [],
    datasets: [
      {
        label: 'Lap Times',
        data: currentRace?.lapTimes.map(lap => {
          const [minutes, seconds] = lap.time.split(':');
          return Number(minutes) * 60 + Number(seconds);
        }) || [],
        borderColor: theme.colors.primary,
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Lap Time Progression',
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Time (seconds)',
        },
      },
    },
  };

  return (
    <DashboardWrapper>
      <Header>
        <h1>Race Dashboard</h1>
        <p>Overview of current race statistics and performance metrics</p>
      </Header>

      <StatsGrid>
        <StatCard>
          <h3>Active Drivers</h3>
          <div className="value">{drivers.length}</div>
        </StatCard>
        <StatCard>
          <h3>Teams</h3>
          <div className="value">{teams.length}</div>
        </StatCard>
        <StatCard>
          <h3>Current Race</h3>
          <div className="value">{currentRace?.raceName || 'No active race'}</div>
        </StatCard>
        <StatCard>
          <h3>Completed Laps</h3>
          <div className="value">{currentRace?.lapTimes.length || 0}</div>
        </StatCard>
      </StatsGrid>

      <ChartContainer>
        <Line data={lapTimeData} options={chartOptions} />
      </ChartContainer>
    </DashboardWrapper>
  );
};

export default Dashboard; 