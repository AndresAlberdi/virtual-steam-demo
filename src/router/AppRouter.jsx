import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import WorkbenchView from '../components/workbench/WorkbenchView';
import LoginView from '../views/LoginView';
import TeacherAnalyticsView from '../views/TeacherAnalyticsView';
import InvestorImpactView from '../views/InvestorImpactView';

// Guard para requerir autenticación
const RequireAuth = ({ children }) => {
  const { currentUser } = useAuth();
  if (!currentUser) return <Navigate to="/login" replace />;
  return children;
};

// Guard para verificar roles de usuario (RBAC)
const RequireRole = ({ roles, children }) => {
  const { currentUser } = useAuth();
  if (!currentUser || (!roles.includes(currentUser.role) && currentUser.role !== 'admin')) {
    return <Navigate to="/" replace />;
  }
  return children;
};

// Redirección inteligente según el rol del usuario
const DashboardRedirect = () => {
  const { currentUser } = useAuth();
  if (!currentUser) return <Navigate to="/login" replace />;
  if (currentUser.role === 'student') return <Navigate to="/student/workbench" replace />;
  if (currentUser.role === 'teacher') return <Navigate to="/teacher/analytics" replace />;
  if (currentUser.role === 'investor' || currentUser.role === 'supervisor') return <Navigate to="/investor/impact" replace />;
  return <Navigate to="/student/workbench" replace />;
};

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginView />} />
        <Route path="/" element={<DashboardRedirect />} />

        {/* Ruta de Estudiante: Simulador de Laboratorio (Workbench 5 Fases) */}
        <Route
          path="/student/workbench"
          element={
            <RequireAuth>
              <RequireRole roles={['student', 'teacher', 'investor', 'admin']}>
                <WorkbenchView />
              </RequireRole>
            </RequireAuth>
          }
        />

        {/* Ruta de Docente: Panel de Analítica de Aula y Bioseguridad */}
        <Route
          path="/teacher/analytics"
          element={
            <RequireAuth>
              <RequireRole roles={['teacher', 'admin']}>
                <TeacherAnalyticsView />
              </RequireRole>
            </RequireAuth>
          }
        />

        {/* Ruta de Inversionista / Embajada de EE. UU.: Métricas de Impacto Social & SROI */}
        <Route
          path="/investor/impact"
          element={
            <RequireAuth>
              <RequireRole roles={['investor', 'supervisor', 'admin']}>
                <InvestorImpactView />
              </RequireRole>
            </RequireAuth>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
