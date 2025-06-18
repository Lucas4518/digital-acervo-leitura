
import React, { useState } from 'react';
import { AuthProvider, useAuth } from '@/components/AuthProvider';
import Login from '@/components/Login';
import Cadastro from '@/components/Cadastro';
import BibliotecaDigital from '@/components/BibliotecaDigital';

const AppContent = () => {
  const [showCadastro, setShowCadastro] = useState(false);
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <BibliotecaDigital />;
  }

  return showCadastro ? (
    <Cadastro onSwitchToLogin={() => setShowCadastro(false)} />
  ) : (
    <Login onSwitchToCadastro={() => setShowCadastro(true)} />
  );
};

const Index = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default Index;
