import { createContext, useContext, useReducer, useEffect } from 'react';

const AuthContext = createContext(null);

const initialState = {
  user: null,
  isAuthenticated: false,
};

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload, isAuthenticated: true };
    case 'LOGOUT':
      return { user: null, isAuthenticated: false };
    case 'UPDATE_PROFILE':
      return { ...state, user: { ...state.user, ...action.payload } };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState, () => {
    const saved = localStorage.getItem('athleteX_auth');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { user: parsed, isAuthenticated: true };
      } catch {
        return initialState;
      }
    }
    return initialState;
  });

  useEffect(() => {
    if (state.user) {
      localStorage.setItem('athleteX_auth', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('athleteX_auth');
    }
  }, [state.user]);

  const login = (userData) => dispatch({ type: 'LOGIN', payload: userData });
  const logout = () => dispatch({ type: 'LOGOUT' });
  const updateProfile = (data) => dispatch({ type: 'UPDATE_PROFILE', payload: data });

  return (
    <AuthContext.Provider value={{ ...state, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
