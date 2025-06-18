
import React, { useState } from 'react';
import { BookOpen, Users, Target, Lightbulb, Star, ShoppingCart, Calendar, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { useAuth } from './AuthProvider';

const BibliotecaDigital = () => {
  const [activeSection, setActiveSection] = useState('inicio');
  const { user, logout } = useAuth();

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
            <section className="text-center py-20 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl">
              <div className="max-w-4xl mx-auto px-6">
                <BookOpen className="w-16 h-16 text-blue-600 mx-auto mb-6" />
                <h1 className="text-5xl font-bold text-gray-900 mb-6">
                  Bem-vindo, {user?.nome}!
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
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
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                  Por que escolher nossa biblioteca?
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                  <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <BookOpen className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                      <CardTitle className="text-xl">Acesso Instantâneo</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">
                        Comece a ler imediatamente após a compra ou aluguel. Sem esperas, sem filas.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <Target className="w-12 h-12 text-green-600 mx-auto mb-4" />
                      <CardTitle className="text-xl">Preços Acessíveis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">
                        Alugue por dias ou compre para sempre. Encontre a opção que cabe no seu bolso.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <Lightbulb className="w-12 h-12 text-amber-600 mx-auto mb-4" />
                      <CardTitle className="text-xl">100% Digital</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">
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
              <h1 className="text-4xl font-bold text-gray-900 mb-6">Sobre a Biblioteca Digital</h1>
              <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
            </div>
            
            <Card className="p-8">
              <CardContent className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Somos uma plataforma digital dedicada a democratizar o acesso à leitura. 
                  Todos os livros disponíveis aqui são digitais e podem ser alugados ou comprados. 
                  Sem filas, sem atrasos, sem papel. Tudo online.
                </p>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <CardTitle className="text-xl text-blue-900">Missão</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">
                    Tornar a leitura acessível a todos em qualquer lugar.
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <Lightbulb className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <CardTitle className="text-xl text-green-900">Visão</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">
                    Ser referência em leitura digital no Brasil.
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <CardTitle className="text-xl text-purple-900">Valores</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">
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
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Nosso Catálogo</h1>
              <p className="text-lg text-gray-600">Descubra sua próxima leitura favorita</p>
              <div className="w-24 h-1 bg-blue-600 mx-auto mt-4"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {livros.map((livro) => (
                <Card key={livro.id} className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <CardHeader className="pb-4">
                    <div className="aspect-[3/4] bg-gradient-to-br from-blue-100 to-indigo-200 rounded-lg mb-4 flex items-center justify-center">
                      <BookOpen className="w-12 h-12 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg font-bold text-gray-900 line-clamp-2">
                      {livro.titulo}
                    </CardTitle>
                    <p className="text-sm text-gray-600">{livro.autor}</p>
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {livro.categoria}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600">{livro.rating}</span>
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
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Biblioteca Digital</span>
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
                      ? 'bg-blue-100 text-blue-700 font-medium'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-red-600 text-red-600 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>

            {/* Mobile menu */}
            <div className="md:hidden flex items-center space-x-2">
              <select 
                value={activeSection} 
                onChange={(e) => setActiveSection(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
              >
                <option value="inicio">Início</option>
                <option value="sobre">Sobre</option>
                <option value="livros">Livros</option>
              </select>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="border-red-600 text-red-600 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {renderSection()}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
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
