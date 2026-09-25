import { createContext, useContext, useReducer, useEffect } from 'react';
import { mockAthletes } from '../data/mockAthletes';

const AthleteContext = createContext(null);

function athleteReducer(state, action) {
  switch (action.type) {
    case 'SET_ATHLETES':
      return { ...state, athletes: action.payload };
    case 'ADD_ATHLETE':
      return { ...state, athletes: [...state.athletes, action.payload] };
    case 'UPDATE_ATHLETE':
      return {
        ...state,
        athletes: state.athletes.map(a =>
          a.id === action.payload.id ? { ...a, ...action.payload } : a
        ),
      };
    case 'ADD_ACHIEVEMENT': {
      return {
        ...state,
        athletes: state.athletes.map(a =>
          a.id === action.payload.athleteId
            ? { ...a, achievements: [...a.achievements, action.payload.achievement] }
            : a
        ),
      };
    }
    case 'ADD_VIDEO': {
      return {
        ...state,
        athletes: state.athletes.map(a =>
          a.id === action.payload.athleteId
            ? { ...a, videos: [...a.videos, action.payload.video] }
            : a
        ),
      };
    }
    case 'CONNECT_COACH': {
      return {
        ...state,
        athletes: state.athletes.map(a =>
          a.id === action.payload.athleteId
            ? { ...a, connectedCoaches: [...new Set([...a.connectedCoaches, action.payload.coachId])] }
            : a
        ),
      };
    }
    default:
      return state;
  }
}

export function AthleteProvider({ children }) {
  const [state, dispatch] = useReducer(athleteReducer, { athletes: [] }, () => {
    const saved = localStorage.getItem('athleteX_athletes');
    if (saved) {
      try {
        return { athletes: JSON.parse(saved) };
      } catch {
        return { athletes: mockAthletes };
      }
    }
    return { athletes: mockAthletes };
  });

  useEffect(() => {
    localStorage.setItem('athleteX_athletes', JSON.stringify(state.athletes));
  }, [state.athletes]);

  const addAthlete = (athlete) => dispatch({ type: 'ADD_ATHLETE', payload: athlete });
  const updateAthlete = (data) => dispatch({ type: 'UPDATE_ATHLETE', payload: data });
  const addAchievement = (athleteId, achievement) =>
    dispatch({ type: 'ADD_ACHIEVEMENT', payload: { athleteId, achievement } });
  const addVideo = (athleteId, video) =>
    dispatch({ type: 'ADD_VIDEO', payload: { athleteId, video } });
  const connectCoach = (athleteId, coachId) =>
    dispatch({ type: 'CONNECT_COACH', payload: { athleteId, coachId } });

  return (
    <AthleteContext.Provider
      value={{
        athletes: state.athletes,
        addAthlete,
        updateAthlete,
        addAchievement,
        addVideo,
        connectCoach,
      }}
    >
      {children}
    </AthleteContext.Provider>
  );
}

export function useAthletes() {
  const context = useContext(AthleteContext);
  if (!context) throw new Error('useAthletes must be used within AthleteProvider');
  return context;
}
