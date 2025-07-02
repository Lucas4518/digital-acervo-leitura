
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface User {
  id: string;
  nome: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, senha: string) => Promise<boolean>;
  cadastrar: (nome: string, email: string, senha: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verificar se há usuário logado no localStorage (mantendo compatibilidade)
    const userData = localStorage.getItem('bibliotecaUser');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const cadastrar = async (nome: string, email: string, senha: string): Promise<boolean> => {
    try {
      // Verificar se já existe um usuário com esse email
      const { data: existingUsers, error: selectError } = await supabase
        .from('Usuarios')
        .select('*')
        .eq('user', email);

      if (selectError) {
        console.error('Erro ao verificar usuário existente:', selectError);
        return false;
      }

      if (existingUsers && existingUsers.length > 0) {
        return false; // Email já cadastrado
      }

      // Criar novo usuário
      const { data, error } = await supabase
        .from('Usuarios')
        .insert([
          {
            user: email,
            senha: parseInt(senha) // Convertendo para número conforme o schema
          }
        ])
        .select();

      if (error) {
        console.error('Erro ao cadastrar usuário:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Erro no cadastro:', error);
      return false;
    }
  };

  const login = async (email: string, senha: string): Promise<boolean> => {
    try {
      const { data: usuarios, error } = await supabase
        .from('Usuarios')
        .select('*')
        .eq('user', email)
        .eq('senha', parseInt(senha));

      if (error) {
        console.error('Erro no login:', error);
        return false;
      }

      if (usuarios && usuarios.length > 0) {
        const usuario = usuarios[0];
        const userData = { 
          id: usuario.id.toString(), 
          nome: usuario.user.split('@')[0], // Usando parte do email como nome
          email: usuario.user 
        };
        
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('bibliotecaUser', JSON.stringify(userData));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Erro no login:', error);
      return false;
    }
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
