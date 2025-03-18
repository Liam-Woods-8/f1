import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Card, CardHeader } from '../components/common/Card';
import { Theme } from '../styles/theme';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
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

const TeamsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const TeamCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const TeamLogo = styled.div<{ color: string }>`
  width: 60px;
  height: 60px;
  border-radius: ${({ theme }) => theme.borderRadius.round};
  background-color: ${({ color }) => color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const StatValue = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text};
`;

const StatLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.secondaryGray};
`;

const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const TeamAnalytics: React.FC = () => {
  const theme = useContext(ThemeContext) as Theme;
  const teams = useSelector((state: RootState) => state.team.teams);

  const constructorsData = {
    labels: teams.map(team => team.name),
    datasets: [
      {
        label: 'Constructor Points',
        data: teams.map(team => team.performance.points),
        backgroundColor: teams.map(team => team.color),
        borderColor: teams.map(team => team.color),
        borderWidth: 1,
      },
    ],
  };

  const winsDistributionData = {
    labels: teams.map(team => team.name),
    datasets: [
      {
        data: teams.map(team => team.performance.wins),
        backgroundColor: teams.map(team => team.color),
        borderColor: teams.map(team => team.color),
        borderWidth: 1,
      },
    ],
  };

  return (
    <PageWrapper>
      <Header>
        <h1>Team Analytics</h1>
        <p>Comprehensive analysis of team performance</p>
      </Header>

      <TeamsGrid>
        {teams.map(team => (
          <TeamCard key={team.teamId}>
            <TeamLogo color={team.color} />
            <div>
              <h3>{team.name}</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: theme.spacing.md }}>
                <div>
                  <StatValue>{team.performance.points}</StatValue>
                  <StatLabel>Points</StatLabel>
                </div>
                <div>
                  <StatValue>{team.performance.wins}</StatValue>
                  <StatLabel>Wins</StatLabel>
                </div>
                <div>
                  <StatValue>{team.performance.podiums}</StatValue>
                  <StatLabel>Podiums</StatLabel>
                </div>
                <div>
                  <StatValue>{team.performance.fastestLaps}</StatValue>
                  <StatLabel>Fastest Laps</StatLabel>
                </div>
              </div>
            </div>
          </TeamCard>
        ))}
      </TeamsGrid>

      <ChartGrid>
        <Card>
          <CardHeader 
            title="Constructor Standings" 
            subtitle="Points accumulated by each team"
          />
          <Bar
            data={constructorsData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: 'Points',
                  },
                },
              },
            }}
          />
        </Card>

        <Card>
          <CardHeader 
            title="Race Wins Distribution" 
            subtitle="Percentage of wins by team"
          />
          <Doughnut
            data={winsDistributionData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'right' as const,
                },
              },
            }}
          />
        </Card>

        <Card>
          <CardHeader 
            title="Performance Metrics" 
            subtitle="Detailed team statistics"
          />
          <div style={{ padding: theme.spacing.lg }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: theme.spacing.sm }}>Team</th>
                  <th style={{ textAlign: 'right', padding: theme.spacing.sm }}>Points</th>
                  <th style={{ textAlign: 'right', padding: theme.spacing.sm }}>Wins</th>
                  <th style={{ textAlign: 'right', padding: theme.spacing.sm }}>Podiums</th>
                </tr>
              </thead>
              <tbody>
                {teams.map(team => (
                  <tr key={team.teamId}>
                    <td style={{ padding: theme.spacing.sm }}>{team.name}</td>
                    <td style={{ textAlign: 'right', padding: theme.spacing.sm }}>{team.performance.points}</td>
                    <td style={{ textAlign: 'right', padding: theme.spacing.sm }}>{team.performance.wins}</td>
                    <td style={{ textAlign: 'right', padding: theme.spacing.sm }}>{team.performance.podiums}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </ChartGrid>
    </PageWrapper>
  );
};

export default TeamAnalytics; 