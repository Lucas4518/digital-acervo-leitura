
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BookOpen } from 'lucide-react';
import { useAuth } from './AuthProvider';
import { toast } from '@/hooks/use-toast';

interface CadastroProps {
  onSwitchToLogin: () => void;
}

const Cadastro: React.FC<CadastroProps> = ({ onSwitchToLogin }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { cadastrar } = useAuth();

  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nome || !email || !senha) {
      toast({
        title: "Erro no cadastro",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive"
      });
      return;
    }

    // Validar se a senha é numérica (conforme schema do banco)
    if (!/^\d+$/.test(senha)) {
      toast({
        title: "Erro no cadastro",
        description: "A senha deve conter apenas números.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const cadastroSuccess = await cadastrar(nome, email, senha);
      
      if (cadastroSuccess) {
        toast({
          title: "Cadastro realizado com sucesso!",
          description: "Agora você pode fazer login com suas credenciais.",
        });
        setNome('');
        setEmail('');
        setSenha('');
        // Redirecionar para login após sucesso
        setTimeout(() => {
          onSwitchToLogin();
        }, 2000);
      } else {
        toast({
          title: "Erro no cadastro",
          description: "Este email já está em uso. Tente outro.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Erro no cadastro",
        description: "Ocorreu um erro inesperado. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Biblioteca Digital</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Criar Conta</h1>
          <p className="text-gray-600">Junte-se à nossa comunidade de leitores</p>
        </div>

        <Card className="p-6">
          <form onSubmit={handleCadastro} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome Completo</Label>
              <Input
                id="nome"
                type="text"
                placeholder="Digite seu nome completo"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="senha">Senha (apenas números)</Label>
              <Input
                id="senha"
                type="password"
                placeholder="Digite uma senha numérica"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full"
                disabled={isLoading}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
              disabled={isLoading}
            >
              {isLoading ? "Cadastrando..." : "Cadastrar"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Já tem uma conta?{' '}
              <button
                onClick={onSwitchToLogin}
                className="text-blue-600 hover:text-blue-700 font-medium"
                disabled={isLoading}
              >
                Faça login aqui
              </button>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Cadastro;
