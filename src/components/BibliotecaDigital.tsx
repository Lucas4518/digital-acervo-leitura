
import React, { useState, useEffect } from 'react';
import { BookOpen, Users, Target, Lightbulb, Star, ShoppingCart, Calendar, LogOut, User, Moon, Sun, Book } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import { useAuth } from './AuthProvider';

const BibliotecaDigital = () => {
  const [activeSection, setActiveSection] = useState('inicio');
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [userStats, setUserStats] = useState({
    livrosLidos: 12,
    livrosComprados: 8
  });
  const { user, logout } = useAuth();

  // Carregar tema salvo no localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('bibliotecaTheme');
    if (savedTheme === 'dark') {
      setIsDarkTheme(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Alternar tema
  const toggleTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('bibliotecaTheme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('bibliotecaTheme', 'light');
    }
    
    toast({
      title: "Tema alterado",
      description: `Tema ${newTheme ? 'escuro' : 'claro'} ativado`,
    });
  };

  const livros = [
    {
      id: 1,
      titulo: "Dom Casmurro",
      autor: "Machado de Assis",
      categoria: "Clássico Brasileiro",
      precoAluguel: "R$ 4,90",
      precoCompra: "R$ 19,90",
      rating: 4.8
    },
    {
      id: 2,
      titulo: "1984",
      autor: "George Orwell",
      categoria: "Distopia",
      precoAluguel: "R$ 5,90",
      precoCompra: "R$ 24,90",
      rating: 4.9
    },
    {
      id: 3,
      titulo: "O Pequeno Príncipe",
      autor: "Antoine de Saint-Exupéry",
      categoria: "Fábula",
      precoAluguel: "R$ 3,90",
      precoCompra: "R$ 16,90",
      rating: 4.7
    },
    {
      id: 4,
      titulo: "Cem Anos de Solidão",
      autor: "Gabriel García Márquez",
      categoria: "Realismo Mágico",
      precoAluguel: "R$ 6,90",
      precoCompra: "R$ 29,90",
      rating: 4.6
    }
  ];

  const handleAluguel = (livro: any) => {
    toast({
      title: "Aluguel Realizado!",
      description: `Você alugou o livro "${livro.titulo}" por ${livro.precoAluguel}`,
    });
  };

  const handleCompra = (livro: any) => {
    setUserStats(prev => ({
      ...prev,
      livrosComprados: prev.livrosComprados + 1
    }));
    
    toast({
      title: "Compra Realizada!",
      description: `Você comprou o livro "${livro.titulo}" por ${livro.precoCompra}`,
    });
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'inicio':
        return (
          <div className="space-y-16">
            {/* Hero Section */}
            <section className="text-center py-20 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl">
              <div className="max-w-4xl mx-auto px-6">
                <BookOpen className="w-16 h-16 text-blue-600 dark:text-blue-400 mx-auto mb-6" />
                <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
                  Bem-vindo, {user?.nome}!
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  Explore milhares de livros digitais. Aqui, você pode comprar ou alugar com apenas alguns cliques!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                    onClick={() => setActiveSection('livros')}
                  >
                    Explorar Livros
                  </Button>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section className="py-16">
              <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
                  Por que escolher nossa biblioteca?
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                  <Card className="text-center p-6 hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
                    <CardHeader>
                      <BookOpen className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                      <CardTitle className="text-xl dark:text-white">Acesso Instantâneo</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-300">
                        Comece a ler imediatamente após a compra ou aluguel. Sem esperas, sem filas.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="text-center p-6 hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
                    <CardHeader>
                      <Target className="w-12 h-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
                      <CardTitle className="text-xl dark:text-white">Preços Acessíveis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-300">
                        Alugue por dias ou compre para sempre. Encontre a opção que cabe no seu bolso.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="text-center p-6 hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
                    <CardHeader>
                      <Lightbulb className="w-12 h-12 text-amber-600 dark:text-amber-400 mx-auto mb-4" />
                      <CardTitle className="text-xl dark:text-white">100% Digital</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-300">
                        Sustentável e prático. Leia em qualquer dispositivo, a qualquer hora.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>
          </div>
        );

      case 'sobre':
        return (
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Sobre a Biblioteca Digital</h1>
              <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
            </div>
            
            <Card className="p-8 dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="space-y-6">
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  Somos uma plataforma digital dedicada a democratizar o acesso à leitura. 
                  Todos os livros disponíveis aqui são digitais e podem ser alugados ou comprados. 
                  Sem filas, sem atrasos, sem papel. Tudo online.
                </p>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6 hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
                <CardHeader className="text-center">
                  <Target className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                  <CardTitle className="text-xl text-blue-900 dark:text-blue-400">Missão</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 text-center">
                    Tornar a leitura acessível a todos em qualquer lugar.
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
                <CardHeader className="text-center">
                  <Lightbulb className="w-12 h-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
                  <CardTitle className="text-xl text-green-900 dark:text-green-400">Visão</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 text-center">
                    Ser referência em leitura digital no Brasil.
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
                <CardHeader className="text-center">
                  <Users className="w-12 h-12 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
                  <CardTitle className="text-xl text-purple-900 dark:text-purple-400">Valores</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 text-center">
                    Acessibilidade, Inovação, Sustentabilidade.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'livros':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Nosso Catálogo</h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">Descubra sua próxima leitura favorita</p>
              <div className="w-24 h-1 bg-blue-600 mx-auto mt-4"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {livros.map((livro) => (
                <Card key={livro.id} className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader className="pb-4">
                    <div className="aspect-[3/4] bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-lg mb-4 flex items-center justify-center">
                      <BookOpen className="w-12 h-12 text-blue-600 dark:text-blue-400" />
                    </div>
                    <CardTitle className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2">
                      {livro.titulo}
                    </CardTitle>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{livro.autor}</p>
                    <span className="inline-block bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-400 text-xs px-2 py-1 rounded-full">
                      {livro.categoria}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">{livro.rating}</span>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <Button 
                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => handleAluguel(livro)}
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Alugar {livro.precoAluguel}
                      </Button>
                      <Button 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => handleCompra(livro)}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Comprar {livro.precoCompra}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Navigation Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50 transition-colors">
        <nav className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">Biblioteca Digital</span>
            </div>
            
            <div className="hidden md:flex space-x-8 items-center">
              {[
                { id: 'inicio', label: 'Início' },
                { id: 'sobre', label: 'Sobre' },
                { id: 'livros', label: 'Livros' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    activeSection === item.id
                      ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400 font-medium'
                      : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              {/* Menu de Perfil */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="relative h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/50 hover:bg-blue-200 dark:hover:bg-blue-900/70"
                  >
                    <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 mr-4 bg-white dark:bg-gray-800 border dark:border-gray-700" align="end">
                  <DropdownMenuLabel className="dark:text-white">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{user?.nome}</p>
                      <p className="text-xs text-muted-foreground dark:text-gray-400">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="dark:bg-gray-700" />
                  
                  <div className="p-2 space-y-2">
                    <div className="flex items-center justify-between text-sm dark:text-gray-300">
                      <div className="flex items-center gap-2">
                        <Book className="h-4 w-4" />
                        <span>Livros lidos</span>
                      </div>
                      <span className="font-medium">{userStats.livrosLidos}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm dark:text-gray-300">
                      <div className="flex items-center gap-2">
                        <ShoppingCart className="h-4 w-4" />
                        <span>Livros comprados</span>
                      </div>
                      <span className="font-medium">{userStats.livrosComprados}</span>
                    </div>
                  </div>
                  
                  <DropdownMenuSeparator className="dark:bg-gray-700" />
                  
                  <div className="p-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm dark:text-gray-300">
                        {isDarkTheme ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                        <span>Tema escuro</span>
                      </div>
                      <Switch
                        checked={isDarkTheme}
                        onCheckedChange={toggleTheme}
                      />
                    </div>
                  </div>
                  
                  <DropdownMenuSeparator className="dark:bg-gray-700" />
                  
                  <DropdownMenuItem 
                    onClick={handleLogout}
                    className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Mobile menu */}
            <div className="md:hidden flex items-center space-x-2">
              <select 
                value={activeSection} 
                onChange={(e) => setActiveSection(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 text-sm"
              >
                <option value="inicio">Início</option>
                <option value="sobre">Sobre</option>
                <option value="livros">Livros</option>
              </select>
              
              {/* Menu de Perfil Mobile */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/50"
                  >
                    <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 mr-4 bg-white dark:bg-gray-800 border dark:border-gray-700" align="end">
                  <DropdownMenuLabel className="dark:text-white">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{user?.nome}</p>
                      <p className="text-xs text-muted-foreground dark:text-gray-400">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="dark:bg-gray-700" />
                  
                  <div className="p-2 space-y-2">
                    <div className="flex items-center justify-between text-sm dark:text-gray-300">
                      <div className="flex items-center gap-2">
                        <Book className="h-4 w-4" />
                        <span>Livros lidos</span>
                      </div>
                      <span className="font-medium">{userStats.livrosLidos}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm dark:text-gray-300">
                      <div className="flex items-center gap-2">
                        <ShoppingCart className="h-4 w-4" />
                        <span>Livros comprados</span>
                      </div>
                      <span className="font-medium">{userStats.livrosComprados}</span>
                    </div>
                  </div>
                  
                  <DropdownMenuSeparator className="dark:bg-gray-700" />
                  
                  <div className="p-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm dark:text-gray-300">
                        {isDarkTheme ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                        <span>Tema escuro</span>
                      </div>
                      <Switch
                        checked={isDarkTheme}
                        onCheckedChange={toggleTheme}
                      />
                    </div>
                  </div>
                  
                  <DropdownMenuSeparator className="dark:bg-gray-700" />
                  
                  <DropdownMenuItem 
                    onClick={handleLogout}
                    className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {renderSection()}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-white mt-16">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <BookOpen className="w-6 h-6" />
              <span className="text-lg font-semibold">Biblioteca Digital</span>
            </div>
            <p className="text-gray-400">
              Democratizando o acesso à leitura através da tecnologia
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BibliotecaDigital;
