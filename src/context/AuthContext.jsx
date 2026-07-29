import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const DEMO_USERS = [
  {
    uid: 'std_001',
    name: 'Estudiante Demo',
    email: 'estudiante@virtualstem.bo',
    role: 'student',
    institution: 'Fe y Alegría - La Paz'
  },
  {
    uid: 'tch_001',
    name: 'Prof. Rodrigo Mariaca (Docente)',
    email: 'profesor@virtualstem.bo',
    role: 'teacher',
    institution: 'Colegio Fe y Alegría'
  },
  {
    uid: 'inv_001',
    name: 'Embajada de EE.UU. (PD-LA PAZ-FY26-01)',
    email: 'investor@usembassy.gov',
    role: 'investor',
    institution: 'US Embassy La Paz / Partner'
  },
  {
    uid: 'adm_001',
    name: 'Andrés Alberdi (Admin)',
    email: 'admin@virtualstem.bo',
    role: 'admin',
    institution: 'Virtual-STEM Core'
  }
];

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('virtual_stem_user');
    return saved ? JSON.parse(saved) : DEMO_USERS[0];
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('virtual_stem_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('virtual_stem_user');
    }
  }, [currentUser]);

  const loginWithRole = (role) => {
    setLoading(true);
    setTimeout(() => {
      const user = DEMO_USERS.find(u => u.role === role) || DEMO_USERS[0];
      setCurrentUser(user);
      setLoading(false);
    }, 400);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, loginWithRole, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
