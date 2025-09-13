import { create } from 'zustand';

// Helpers to safely access localStorage (SSR/initial load guard)
const safeGet = (key, fallback) => {
  try {
    if (typeof window === 'undefined') return fallback;
    const v = window.localStorage.getItem(key);
    return v !== null ? v : fallback;
  } catch { return fallback; }
};
const persist = (key, value) => {
  try { if (typeof window !== 'undefined') window.localStorage.setItem(key, value); } catch(_) {}
};

const useStore = create((set, get) => ({
  // User state
  user: null,
  isAuthenticated: false,
  
  // Wallet state
  balance: 100, // Mock $100 USDT balance
  transactions: [],
  
  // Betting state
  currentBets: [],
  activeCycle: {
    id: 1,
    market: 'BTC/USDT',
    status: 'OPEN', // OPEN, LOCKED, SETTLED
    timeRemaining: 600, // 10 minutes in seconds (5 min open + 5 min locked)
    totalCycleTime: 600, // 10 minutes total
    openTime: 300, // First 5 minutes for betting
    lockedTime: 300, // Last 5 minutes for settlement
    upPool: 0,
    downPool: 0,
    upBets: [], // Array of individual bets
    downBets: [], // Array of individual bets
    currentPrice: 110699.58,
    startPrice: 110699.58, // Price when cycle started
    endPrice: null,
    result: null, // 'UP' or 'DOWN'
    cyclePhase: 'OPEN' // OPEN, LOCKED, SETTLING
  },
  selectedCurrencyPair: 'BTC/USDT',
  
  // UI state
  currentPage: 'home',
  showModal: false,
  modalType: null,
  modalData: null,
  theme: 'dark', // 'light' or 'dark'
  chartInterval: safeGet('chartInterval','1m'), // 1m,5m,15m,1h default
  chartSymbol: safeGet('chartSymbol','BTCUSDT'), // Trading symbol for charts (no slash, matches exchange API format)
  
  // Actions
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  
  toggleTheme: () => set((state) => ({
    theme: state.theme === 'light' ? 'dark' : 'light'
  })),

  setChartInterval: (interval) => {
    persist('chartInterval', interval);
    set({ chartInterval: interval });
  },
  setChartSymbol: (symbol) => {
    persist('chartSymbol', symbol);
    set({ chartSymbol: symbol });
  },

  updateBalance: (amount) => set((state) => ({
    balance: Math.max(0, state.balance + amount)
  })),
  
  addTransaction: (transaction) => set((state) => ({
    transactions: [transaction, ...state.transactions]
  })),
  
  placeBet: (bet) => set((state) => {
    const newBet = {
      id: Date.now(),
      ...bet,
      timestamp: new Date().toISOString(),
      status: 'PENDING',
      userPercentage: 0 // Will be calculated
    };
    
    const newBalance = state.balance - bet.amount;
    const newTransaction = {
      id: Date.now(),
      type: 'BET',
      amount: -bet.amount,
      description: `Bet ${bet.amount} USDT on ${bet.direction}`,
      timestamp: new Date().toISOString()
    };
    
    // Update pools
    const updatedUpBets = bet.direction === 'UP' ? [...state.activeCycle.upBets, newBet] : state.activeCycle.upBets;
    const updatedDownBets = bet.direction === 'DOWN' ? [...state.activeCycle.downBets, newBet] : state.activeCycle.downBets;
    
    const newUpPool = updatedUpBets.reduce((sum, b) => sum + b.amount, 0);
    const newDownPool = updatedDownBets.reduce((sum, b) => sum + b.amount, 0);
    
    // Calculate user's percentage in the pool they bet on
    const userPool = bet.direction === 'UP' ? newUpPool : newDownPool;
    const userPercentage = userPool > 0 ? (bet.amount / userPool) * 100 : 0;
    
    return {
      currentBets: [...state.currentBets, newBet],
      balance: newBalance,
      transactions: [newTransaction, ...state.transactions],
      activeCycle: {
        ...state.activeCycle,
        upPool: newUpPool,
        downPool: newDownPool,
        upBets: updatedUpBets,
        downBets: updatedDownBets
      }
    };
  }),
  
  settleBets: (result) => set((state) => {
    const winningPool = result === 'UP' ? state.activeCycle.upPool : state.activeCycle.downPool;
    const losingPool = result === 'UP' ? state.activeCycle.downPool : state.activeCycle.upPool;
    const totalPool = winningPool + losingPool;
    
    // Apply 5% house commission as per PRD
    const houseCommission = totalPool * 0.05;
    const winningsPool = totalPool - houseCommission;
    
    const settledBets = state.currentBets.map(bet => {
      if (bet.direction === result) {
        // Calculate user's percentage of the winning pool
        const userPool = result === 'UP' ? state.activeCycle.upPool : state.activeCycle.downPool;
        const userPercentage = userPool > 0 ? (bet.amount / userPool) : 0;
        const winnings = winningsPool * userPercentage;
        
        return {
          ...bet,
          status: 'WON',
          winnings: winnings,
          userPercentage: userPercentage
        };
      } else {
        return {
          ...bet,
          status: 'LOST',
          winnings: 0,
          userPercentage: 0
        };
      }
    });
    
    const totalWinnings = settledBets
      .filter(bet => bet.status === 'WON')
      .reduce((sum, bet) => sum + bet.winnings, 0);
    
    const newTransactions = settledBets
      .filter(bet => bet.status === 'WON')
      .map(bet => ({
        id: Date.now() + Math.random(),
        type: 'WIN',
        amount: bet.winnings,
        description: `Won ${bet.winnings.toFixed(2)} USDT (${bet.userPercentage.toFixed(2)}% of pool)`,
        timestamp: new Date().toISOString()
      }));
    
    return {
      currentBets: [],
      balance: state.balance + totalWinnings,
      transactions: [...newTransactions, ...state.transactions],
      activeCycle: {
        ...state.activeCycle,
        status: 'SETTLED',
        result: result,
        upBets: [],
        downBets: [],
        upPool: 0,
        downPool: 0
      }
    };
  }),

  // Calculate payout multipliers
  getPayoutMultipliers: () => {
    const state = get();
    const { upPool, downPool } = state.activeCycle;
    const totalPool = upPool + downPool;
    
    if (totalPool === 0) {
      return { upMultiplier: 1.0, downMultiplier: 1.0 };
    }
    
    // Apply 5% house commission
    const winningsPool = totalPool * 0.95;
    
    // Calculate multipliers (how much you get back for each $1 bet)
    const upMultiplier = upPool > 0 ? winningsPool / upPool : 1.0;
    const downMultiplier = downPool > 0 ? winningsPool / downPool : 1.0;
    
    return {
      upMultiplier: Math.max(upMultiplier, 0.1), // Minimum 0.1x multiplier
      downMultiplier: Math.max(downMultiplier, 0.1)
    };
  },
  
  updateActiveCycle: (updates) => set((state) => ({
    activeCycle: { ...state.activeCycle, ...updates }
  })),
  
  setCurrentPage: (page) => set({ currentPage: page }),
  
  setCurrencyPair: (pair) => set({ selectedCurrencyPair: pair }),
  
  showModal: (type, data = null) => set({ 
    showModal: true, 
    modalType: type, 
    modalData: data 
  }),
  
  hideModal: () => set({ 
    showModal: false, 
    modalType: null, 
    modalData: null 
  }),
  
  // Timer functions
  startTimer: () => {
    const interval = setInterval(() => {
      const state = get();
      if (state.activeCycle.timeRemaining > 0) {
        const newTimeRemaining = state.activeCycle.timeRemaining - 1;
        
        // Determine phase based on time remaining
        let newCyclePhase = 'OPEN';
        let newStatus = 'OPEN';
        
        if (newTimeRemaining > 300) {
          // First 5 minutes - Open for betting
          newCyclePhase = 'OPEN';
          newStatus = 'OPEN';
        } else if (newTimeRemaining > 0) {
          // Last 5 minutes - Locked for settlement
          newCyclePhase = 'LOCKED';
          newStatus = 'LOCKED';
        } else {
          // Time's up - Settlement
          newCyclePhase = 'SETTLING';
          newStatus = 'SETTLED';
        }
        
        set({
          activeCycle: {
            ...state.activeCycle,
            timeRemaining: Math.max(0, newTimeRemaining),
            status: newStatus,
            cyclePhase: newCyclePhase
          }
        });
        
        // Auto-settle when cycle completes
        if (newTimeRemaining <= 0 && state.activeCycle.status !== 'SETTLED') {
          const result = Math.random() > 0.5 ? 'UP' : 'DOWN';
          
          // Set end price for settlement
          set({
            activeCycle: {
              ...state.activeCycle,
              endPrice: state.activeCycle.currentPrice,
              result: result
            }
          });
          
          get().settleBets(result);
          get().showModal('RESULT', { result, winnings: 0 });
          
          // Reset cycle after a brief delay
          setTimeout(() => {
            set({
              activeCycle: {
                id: state.activeCycle.id + 1,
                market: 'BTC/USDT',
                status: 'OPEN',
                timeRemaining: 600, // Reset to 10 minutes
                totalCycleTime: 600,
                openTime: 300,
                lockedTime: 300,
                upPool: 0,
                downPool: 0,
                upBets: [],
                downBets: [],
                currentPrice: state.activeCycle.currentPrice,
                startPrice: state.activeCycle.currentPrice, // New start price
                endPrice: null,
                result: null,
                cyclePhase: 'OPEN'
              }
            });
          }, 3000); // 3 second delay before new cycle
        }
      }
    }, 1000);
    
    return interval;
  }
}));

export default useStore;