import React, { useContext, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Card, CardHeader } from '../components/common/Card';
import { Theme } from '../styles/theme';
import { Bar, Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  RadialLinearScale,
  PointElement,
  LineElement,
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

const DriverSelectionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`;

const DriverCard = styled.div<{ selected: boolean }>`
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme, selected }) => selected ? theme.colors.primary : theme.colors.white};
  color: ${({ theme, selected }) => selected ? theme.colors.white : theme.colors.text};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};
  box-shadow: ${({ theme }) => theme.shadows.sm};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const ComparisonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const DriverComparison: React.FC = () => {
  const theme = useContext(ThemeContext) as Theme;
  const drivers = useSelector((state: RootState) => state.driver.drivers);
  const [selectedDrivers, setSelectedDrivers] = useState<string[]>([]);

  const handleDriverSelect = (driverId: string) => {
    if (selectedDrivers.includes(driverId)) {
      setSelectedDrivers(selectedDrivers.filter(id => id !== driverId));
    } else if (selectedDrivers.length < 2) {
      setSelectedDrivers([...selectedDrivers, driverId]);
    }
  };

  const selectedDriversData = drivers.filter(driver => 
    selectedDrivers.includes(driver.driverId)
  );

  const performanceData = {
    labels: ['Points', 'Wins', 'Podiums', 'Fastest Laps', 'Q3 Appearances'],
    datasets: selectedDriversData.map(driver => ({
      label: driver.name,
      data: [
        driver.performance.points,
        driver.performance.wins,
        driver.performance.podiums,
        driver.performance.fastestLaps,
        driver.performance.qualifyingRecord.q3,
      ],
      backgroundColor: `${theme.colors.primary}80`,
      borderColor: theme.colors.primary,
      borderWidth: 1,
    })),
  };

  const radarData = {
    labels: ['Race Pace', 'Qualifying', 'Consistency', 'Overtaking', 'Defense'],
    datasets: selectedDriversData.map(driver => ({
      label: driver.name,
      data: [
        driver.performance.points / 10,
        driver.performance.qualifyingRecord.q3 / 5,
        (driver.performance.points / driver.performance.wins) || 0,
        driver.performance.podiums / 2,
        driver.performance.points / (driver.performance.wins + 1),
      ],
      backgroundColor: `${theme.colors.primary}20`,
      borderColor: theme.colors.primary,
      borderWidth: 2,
    })),
  };

  return (
    <PageWrapper>
      <Header>
        <h1>Driver Comparison</h1>
        <p>Select two drivers to compare their performance</p>
      </Header>

      <Card>
        <CardHeader 
          title="Select Drivers" 
          subtitle="Choose up to two drivers to compare"
        />
        <DriverSelectionGrid>
          {drivers.map(driver => (
            <DriverCard
              key={driver.driverId}
              selected={selectedDrivers.includes(driver.driverId)}
              onClick={() => handleDriverSelect(driver.driverId)}
            >
              <h3>{driver.name}</h3>
              <p>{driver.team}</p>
            </DriverCard>
          ))}
        </DriverSelectionGrid>
      </Card>

      {selectedDrivers.length === 2 && (
        <ComparisonGrid>
          <Card>
            <CardHeader 
              title="Performance Comparison" 
              subtitle="Key statistics comparison"
            />
            <Bar
              data={performanceData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </Card>

          <Card>
            <CardHeader 
              title="Driver Attributes" 
              subtitle="Relative performance in different aspects"
            />
            <Radar
              data={radarData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                },
                scales: {
                  r: {
                    beginAtZero: true,
                    max: 10,
                  },
                },
              }}
            />
          </Card>

          <Card>
            <CardHeader 
              title="Head to Head Stats" 
              subtitle="Direct comparison of key metrics"
            />
            <div style={{ padding: theme.spacing.lg }}>
              {selectedDriversData.map(driver => (
                <div key={driver.driverId} style={{ marginBottom: theme.spacing.md }}>
                  <h3>{driver.name}</h3>
                  <p>Points: {driver.performance.points}</p>
                  <p>Wins: {driver.performance.wins}</p>
                  <p>Podiums: {driver.performance.podiums}</p>
                  <p>Fastest Laps: {driver.performance.fastestLaps}</p>
                  <p>Experience: {driver.experience} years</p>
                </div>
              ))}
            </div>
          </Card>
        </ComparisonGrid>
      )}
    </PageWrapper>
  );
};

export default DriverComparison; 