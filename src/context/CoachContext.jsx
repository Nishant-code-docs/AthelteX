import { createContext, useContext, useReducer, useEffect } from 'react';
import { mockCoaches } from '../data/mockCoaches';

const CoachContext = createContext(null);

function coachReducer(state, action) {
  switch (action.type) {
    case 'SET_COACHES':
      return { ...state, coaches: action.payload };
    case 'ADD_COACH':
      return { ...state, coaches: [...state.coaches, action.payload] };
    case 'UPDATE_COACH':
      return {
        ...state,
        coaches: state.coaches.map(c =>
          c.id === action.payload.id ? { ...c, ...action.payload } : c
        ),
      };
    case 'CONNECT_ATHLETE': {
      return {
        ...state,
        coaches: state.coaches.map(c =>
          c.id === action.payload.coachId
            ? { ...c, connectedAthletes: [...new Set([...c.connectedAthletes, action.payload.athleteId])] }
            : c
        ),
      };
    }
    default:
      return state;
  }
}

export function CoachProvider({ children }) {
  const [state, dispatch] = useReducer(coachReducer, { coaches: [] }, () => {
    const saved = localStorage.getItem('athleteX_coaches');
    if (saved) {
      try {
        return { coaches: JSON.parse(saved) };
      } catch {
        return { coaches: mockCoaches };
      }
    }
    return { coaches: mockCoaches };
  });

  useEffect(() => {
    localStorage.setItem('athleteX_coaches', JSON.stringify(state.coaches));
  }, [state.coaches]);

  const addCoach = (coach) => dispatch({ type: 'ADD_COACH', payload: coach });
  const updateCoach = (data) => dispatch({ type: 'UPDATE_COACH', payload: data });
  const connectAthlete = (coachId, athleteId) =>
    dispatch({ type: 'CONNECT_ATHLETE', payload: { coachId, athleteId } });

  return (
    <CoachContext.Provider
      value={{
        coaches: state.coaches,
        addCoach,
        updateCoach,
        connectAthlete,
      }}
    >
      {children}
    </CoachContext.Provider>
  );
}

export function useCoaches() {
  const context = useContext(CoachContext);
  if (!context) throw new Error('useCoaches must be used within CoachProvider');
  return context;
}
