
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  nome: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, senha: string) => boolean;
  cadastrar: (nome: string, email: string, senha: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verificar se há usuário logado no localStorage
    const userData = localStorage.getItem('bibliotecaUser');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const cadastrar = (nome: string, email: string, senha: string): boolean => {
    // Verificar se já existe um usuário com esse email
    const usuarios = JSON.parse(localStorage.getItem('bibliotecaUsuarios') || '[]');
    const usuarioExistente = usuarios.find((u: any) => u.email === email);
    
    if (usuarioExistente) {
      return false; // Email já cadastrado
    }

    // Criar novo usuário
    const novoUsuario = {
      id: Date.now().toString(),
      nome,
      email,
      senha
    };

    usuarios.push(novoUsuario);
    localStorage.setItem('bibliotecaUsuarios', JSON.stringify(usuarios));
    return true;
  };

  const login = (email: string, senha: string): boolean => {
    const usuarios = JSON.parse(localStorage.getItem('bibliotecaUsuarios') || '[]');
    const usuario = usuarios.find((u: any) => u.email === email && u.senha === senha);
    
    if (usuario) {
      const userData = { id: usuario.id, nome: usuario.nome, email: usuario.email };
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('bibliotecaUser', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('bibliotecaUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, cadastrar, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
