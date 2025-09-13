import React, { useEffect } from 'react';
import { User, Mail, Wallet, Calendar, TrendingUp, TrendingDown, BarChart3, Settings, Edit3, Shield, Award, Target, Sun, Moon } from 'lucide-react';
import useStore from '../store/useStore'; // Adjust import path as needed

const Profile = () => {
  // Get theme state and toggle function from the store
  const theme = useStore((state) => state.theme);
  const toggleTheme = useStore((state) => state.toggleTheme);

  // Apply theme to document element when component mounts or theme changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    balance: 1250.75,
    signUpDate: '2024-01-15',
    totalBets: 47,
    winRate: 68.5,
    totalWinnings: 3420.50,
    level: 'Expert Trader',
    avatar: null
  };

  const performanceData = [
    { date: '2024-01-15', bets: 3, wins: 2, amount: 150.00, profit: 45.50 },
    { date: '2024-01-16', bets: 5, wins: 4, amount: 300.00, profit: 120.00 },
    { date: '2024-01-17', bets: 2, wins: 1, amount: 100.00, profit: -25.00 },
    { date: '2024-01-18', bets: 4, wins: 3, amount: 200.00, profit: 75.00 },
    { date: '2024-01-19', bets: 6, wins: 4, amount: 400.00, profit: 80.00 },
    { date: '2024-01-20', bets: 3, wins: 2, amount: 150.00, profit: 30.00 },
    { date: '2024-01-21', bets: 4, wins: 3, amount: 250.00, profit: 95.00 },
  ];

  const recentBets = [
    { id: 1, direction: 'UP', amount: 50.00, result: 'win', profit: 15.25, time: '2 hours ago' },
    { id: 2, direction: 'DOWN', amount: 75.00, result: 'loss', profit: -75.00, time: '4 hours ago' },
    { id: 3, direction: 'UP', amount: 100.00, result: 'win', profit: 30.50, time: '6 hours ago' },
    { id: 4, direction: 'DOWN', amount: 25.00, result: 'win', profit: 8.75, time: '8 hours ago' },
  ];

  const quickActions = [
    { icon: Wallet, label: 'Deposit', action: 'deposit' },
    { icon: TrendingUp, label: 'Withdraw', action: 'withdraw' },
    { icon: Settings, label: 'Settings', action: 'settings' },
    { icon: Shield, label: 'Security', action: 'security' },
  ];

  const handleQuickAction = (action) => {
    console.log(`Quick action: ${action}`);
  };

  return (
    <div className="app-container">
      <style>
        {`
        /* Default Dark Theme Variables */
        :root {
          --bg-primary: linear-gradient(135deg, #0F0F23 0%, #1E1E38 100%);
          --bg-secondary: #1A1B2E;
          --bg-tertiary: #252640;
          --text-primary: #F8FAFC;
          --text-secondary: #94A3B8;
          --border-color: rgba(248, 250, 252, 0.08);
          --accent-purple: #8B5CF6;
          --accent-green: #22C55E;
          --accent-blue: #3B82F6;
          --accent-red: #EF4444;
          --accent-gold: #F59E0B;
          --card-bg: rgba(26, 27, 46, 0.95);
          --shadow: rgba(0, 0, 0, 0.3);
          --glass-bg: rgba(26, 27, 46, 0.8);
          --glass-border: rgba(248, 250, 252, 0.1);
        }
        
        /* Light Theme Override */
        [data-theme="light"] {
          --bg-primary: linear-gradient(135deg, #FAFBFC 0%, #F4F6F8 100%);
          --bg-secondary: #FFFFFF;
          --bg-tertiary: #F8FAFC;
          --text-primary: #0F172A;
          --text-secondary: #475569;
          --border-color: rgba(15, 23, 42, 0.08);
          --card-bg: rgba(255, 255, 255, 0.95);
          --shadow: rgba(15, 23, 42, 0.1);
          --glass-bg: rgba(255, 255, 255, 0.8);
          --glass-border: rgba(15, 23, 42, 0.1);
        }

        body {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
            sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          transition: all 0.3s ease;
          background: var(--bg-primary);
          color: var(--text-primary);
          min-height: 100vh;
        }

        .app-container {
          min-height: 100vh;
          background: var(--bg-primary);
        }

        .container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 2rem 1rem;
        }
        
        .header {
          padding: 2rem 1rem;
          background: var(--glass-bg);
          border-bottom: 1px solid var(--border-color);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1280px;
          margin: 0 auto;
        }

        .edit-button, .theme-toggle {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          border: 1px solid var(--border-color);
          background: var(--card-bg);
          color: var(--text-primary);
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .theme-toggle {
          padding: 0.75rem;
          border-radius: 50%;
        }

        .edit-button:hover, .theme-toggle:hover {
          transform: scale(1.05);
          border-color: var(--accent-purple);
          color: var(--accent-purple);
          background: var(--bg-tertiary);
          box-shadow: 0 4px 20px var(--shadow);
        }
        
        .grid-container {
          display: grid;
          gap: 2rem;
        }

        @media (min-width: 1024px) {
          .grid-container {
            grid-template-columns: 1fr 2fr;
          }
        }

        .card {
          border-radius: 1.5rem;
          padding: 2rem;
          border: 1px solid var(--glass-border);
          background: var(--card-bg);
          box-shadow: 0 8px 32px var(--shadow);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          transition: all 0.3s ease;
        }

        .card:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 48px var(--shadow);
        }
        
        .stat-card {
          border-radius: 1.5rem;
          padding: 1.5rem;
          border: 1px solid var(--glass-border);
          background: var(--card-bg);
          box-shadow: 0 8px 32px var(--shadow);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 48px var(--shadow);
        }

        .stat-grid {
          display: grid;
          gap: 1rem;
        }
        
        @media (min-width: 768px) {
          .stat-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        
        .list-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem;
          border-radius: 0.75rem;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          transition: all 0.2s ease-in-out;
        }

        .list-item:hover {
          background: var(--glass-bg);
          transform: translateY(-2px);
          box-shadow: 0 4px 15px var(--shadow);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .avatar-gradient {
          background: linear-gradient(135deg, var(--accent-purple), var(--accent-blue));
        }

        .icon-circle-up {
          background: rgba(34, 197, 94, 0.1);
          color: var(--accent-green);
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon-circle-down {
          background: rgba(239, 68, 68, 0.1);
          color: var(--accent-red);
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .quick-actions-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }

        .quick-action-button {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          border-radius: 0.75rem;
          border: 1px solid var(--border-color);
          background: var(--bg-tertiary);
          color: var(--text-primary);
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
        }
        
        .quick-action-button:hover {
          transform: translateY(-2px);
          border-color: var(--accent-purple);
          color: var(--accent-purple);
          box-shadow: 0 4px 15px var(--shadow);
          background: var(--card-bg);
        }

        .quick-action-button:hover span {
          color: var(--accent-purple);
        }

        .profit-positive {
          color: var(--accent-green);
        }

        .profit-negative {
          color: var(--accent-red);
        }
        `}
      </style>

      {/* Header */}
      <div className="header">
        <div className="header-content">
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.25rem', color: 'var(--text-primary)' }}>
              User Profile
            </h1>
            <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)' }}>
              Manage your account and view performance
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button className="edit-button">
              <Edit3 style={{ width: '1rem', height: '1rem' }} />
              Edit Profile
            </button>
            <button className="theme-toggle" onClick={toggleTheme}>
              {theme === 'light' ? 
                <Moon style={{ width: '1rem', height: '1rem' }} /> : 
                <Sun style={{ width: '1rem', height: '1rem' }} />
              }
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="grid-container">
          {/* Left Column - Profile Info & Quick Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Profile Card */}
            <div className="card">
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <div className="avatar-gradient" style={{ 
                  width: '6rem', 
                  height: '6rem', 
                  margin: '0 auto 1rem auto', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
                  <User style={{ width: '3rem', height: '3rem', color: 'white' }} />
                </div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.25rem', color: 'var(--text-primary)' }}>
                  {user.name}
                </h2>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  {user.level}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem', marginTop: '0.5rem' }}>
                  <Award style={{ width: '1rem', height: '1rem', color: 'var(--accent-gold)' }} />
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    Level 5 Trader
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Mail style={{ width: '1.25rem', height: '1.25rem', color: 'var(--accent-purple)' }} />
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    {user.email}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Calendar style={{ width: '1.25rem', height: '1.25rem', color: 'var(--accent-purple)' }} />
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    Joined {new Date(user.signUpDate).toLocaleDateString()}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Wallet style={{ width: '1.25rem', height: '1.25rem', color: 'var(--accent-purple)' }} />
                  <span style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                    ${user.balance.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card">
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                Quick Actions
              </h3>
              <div className="quick-actions-grid">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickAction(action.action)}
                    className="quick-action-button"
                  >
                    <action.icon style={{ width: '1.5rem', height: '1.5rem', marginBottom: '0.25rem' }} />
                    <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Performance & History */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Stats Cards */}
            <div className="stat-grid">
              <div className="stat-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <Target style={{ width: '1.25rem', height: '1.25rem', color: 'var(--accent-green)' }} />
                  <span style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-secondary)' }}>
                    Total Bets
                  </span>
                </div>
                <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>
                  {user.totalBets}
                </p>
              </div>
              <div className="stat-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <TrendingUp style={{ width: '1.25rem', height: '1.25rem', color: 'var(--accent-blue)' }} />
                  <span style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-secondary)' }}>
                    Win Rate
                  </span>
                </div>
                <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>
                  {user.winRate}%
                </p>
              </div>
              <div className="stat-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <Wallet style={{ width: '1.25rem', height: '1.25rem', color: 'var(--accent-purple)' }} />
                  <span style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-secondary)' }}>
                    Total Winnings
                  </span>
                </div>
                <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>
                  ${user.totalWinnings.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Performance History */}
            <div className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <BarChart3 style={{ width: '1.5rem', height: '1.5rem', color: 'var(--accent-purple)' }} />
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                  Performance History
                </h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {performanceData.map((day, index) => (
                  <div key={index} className="list-item">
                    <div>
                      <p style={{ fontWeight: '500', color: 'var(--text-primary)' }}>
                        {new Date(day.date).toLocaleDateString()}
                      </p>
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        {day.bets} bets • {day.wins} wins
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontWeight: '600', color: 'var(--text-primary)' }}>
                        ${day.amount.toFixed(2)}
                      </p>
                      <p className={day.profit >= 0 ? 'profit-positive' : 'profit-negative'} style={{ fontSize: '0.875rem', fontWeight: '500' }}>
                        {day.profit >= 0 ? '+' : ''}${day.profit.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Bets */}
            <div className="card">
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
                Recent Bets
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {recentBets.map((bet) => (
                  <div key={bet.id} className="list-item">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div className={bet.direction === 'UP' ? 'icon-circle-up' : 'icon-circle-down'}>
                        {bet.direction === 'UP' ? (
                          <TrendingUp style={{ width: '1rem', height: '1rem' }} />
                        ) : (
                          <TrendingDown style={{ width: '1rem', height: '1rem' }} />
                        )}
                      </div>
                      <div>
                        <p style={{ fontWeight: '500', color: 'var(--text-primary)' }}>
                          {bet.direction} Bet
                        </p>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                          {bet.time}
                        </p>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontWeight: '600', color: 'var(--text-primary)' }}>
                        ${bet.amount.toFixed(2)}
                      </p>
                      <p className={bet.profit >= 0 ? 'profit-positive' : 'profit-negative'} style={{ fontSize: '0.875rem', fontWeight: '500' }}>
                        {bet.profit >= 0 ? '+' : ''}${bet.profit.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;