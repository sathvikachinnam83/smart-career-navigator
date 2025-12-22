import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserAnswers, CareerRecommendation } from '@/types/career';

interface AuthContextType {
  isLoggedIn: boolean;
  user: { email: string; name: string } | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  logout: () => void;
}

interface AppContextType {
  auth: AuthContextType;
  answers: UserAnswers | null;
  setAnswers: (answers: UserAnswers) => void;
  recommendations: CareerRecommendation[];
  setRecommendations: (recs: CareerRecommendation[]) => void;
  selectedCareer: string | null;
  setSelectedCareer: (id: string | null) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [answers, setAnswers] = useState<UserAnswers | null>(null);
  const [recommendations, setRecommendations] = useState<CareerRecommendation[]>([]);
  const [selectedCareer, setSelectedCareer] = useState<string | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - in production, this would call an API
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (email && password.length >= 6) {
      setIsLoggedIn(true);
      setUser({ email, name: email.split('@')[0] });
      return true;
    }
    return false;
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (email && password.length >= 6 && name) {
      setIsLoggedIn(true);
      setUser({ email, name });
      return true;
    }
    return false;
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoggedIn(true);
    setUser({ email: 'user@gmail.com', name: 'Google User' });
    return true;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setAnswers(null);
    setRecommendations([]);
    setSelectedCareer(null);
  };

  const auth: AuthContextType = {
    isLoggedIn,
    user,
    login,
    signup,
    loginWithGoogle,
    logout
  };

  return (
    <AppContext.Provider
      value={{
        auth,
        answers,
        setAnswers,
        recommendations,
        setRecommendations,
        selectedCareer,
        setSelectedCareer
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
