"use client";

import { useState } from "react";
import { Upload, TrendingUp, TrendingDown, AlertCircle, Loader2, BarChart3, Check, Zap, Crown, Bell, Clock, FileText, Settings, PieChart, Briefcase, Code, Headphones, Calendar, TrendingUpDown, CreditCard, Lock, Shield, Sparkles, ArrowRight, Star, LogOut, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Sidebar } from "@/components/custom/Sidebar";

export default function Home() {
  const { user, logout } = useAuth();
  const [image, setImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<{
    recommendation: "buy" | "sell" | "hold";
    confidence: number;
    analysis: string;
    keyPoints: string[];
  } | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal" | "mbway" | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!image) return;

    setAnalyzing(true);
    
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Erro ao analisar:", error);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleSelectPlan = (planName: string) => {
    setSelectedPlan(planName);
    setShowCheckout(true);
  };

  const handlePayment = () => {
    if (!paymentMethod) {
      alert("Por favor, selecione um método de pagamento");
      return;
    }
    alert(`Processando pagamento via ${paymentMethod} para o plano ${selectedPlan}...`);
  };

  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case "buy":
        return "from-emerald-400 via-green-500 to-teal-600";
      case "sell":
        return "from-rose-400 via-red-500 to-pink-600";
      default:
        return "from-amber-400 via-orange-500 to-yellow-600";
    }
  };

  const getRecommendationIcon = (rec: string) => {
    switch (rec) {
      case "buy":
        return <TrendingUp className="w-10 h-10" />;
      case "sell":
        return <TrendingDown className="w-10 h-10" />;
      default:
        return <AlertCircle className="w-10 h-10" />;
    }
  };

  const getRecommendationText = (rec: string) => {
    switch (rec) {
      case "buy":
        return "COMPRAR";
      case "sell":
        return "VENDER";
      default:
        return "MANTER";
    }
  };

  const pricingPlans = [
    {
      name: "Básico",
      price: "9,99",
      period: "mês",
      icon: Zap,
      color: "from-blue-500 via-cyan-500 to-teal-500",
      features: [
        { text: "10 análises por mês", icon: BarChart3 },
        { text: "Análise técnica básica", icon: TrendingUpDown },
        { text: "Recomendações de compra/venda", icon: TrendingUp },
        { text: "Suporte por email", icon: Headphones },
        { text: "Histórico de 30 dias", icon: Clock }
      ],
      popular: false
    },
    {
      name: "Profissional",
      price: "29,99",
      period: "mês",
      icon: Crown,
      color: "from-purple-500 via-fuchsia-500 to-pink-500",
      features: [
        { text: "100 análises por mês", icon: BarChart3 },
        { text: "Análise técnica avançada", icon: TrendingUpDown },
        { text: "Alertas em tempo real", icon: Bell },
        { text: "Suporte prioritário", icon: Headphones },
        { text: "Histórico ilimitado", icon: Clock },
        { text: "Análise de múltiplos ativos", icon: PieChart },
        { text: "Relatórios personalizados", icon: FileText }
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "99,99",
      period: "mês",
      icon: Sparkles,
      color: "from-orange-500 via-red-500 to-rose-500",
      features: [
        { text: "Análises ilimitadas", icon: BarChart3 },
        { text: "IA personalizada", icon: Settings },
        { text: "API de integração", icon: Code },
        { text: "Suporte 24/7", icon: Headphones },
        { text: "Análise de portfólio completo", icon: Briefcase },
        { text: "Consultoria dedicada", icon: Headphones },
        { text: "Backtesting de estratégias", icon: Calendar },
        { text: "Dashboard customizado", icon: PieChart }
      ],
      popular: false
    }
  ];

  const features = [
    {
      icon: BarChart3,
      title: "Análises Técnicas",
      description: "Análise completa de gráficos com IA avançada",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Bell,
      title: "Alertas em Tempo Real",
      description: "Receba notificações instantâneas sobre oportunidades",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Clock,
      title: "Histórico Completo",
      description: "Acesse todas as suas análises anteriores",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: PieChart,
      title: "Múltiplos Ativos",
      description: "Analise diversos ativos simultaneamente",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: FileText,
      title: "Relatórios Personalizados",
      description: "Gere relatórios detalhados das suas análises",
      color: "from-cyan-500 to-blue-500"
    },
    {
      icon: Briefcase,
      title: "Análise de Portfólio",
      description: "Visão completa do seu portfólio de investimentos",
      color: "from-pink-500 to-purple-500"
    }
  ];

  const paymentMethods = [
    {
      id: "card",
      name: "Cartão de Crédito/Débito",
      icon: CreditCard,
      description: "Visa, Mastercard, Amex",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: "paypal",
      name: "PayPal",
      icon: Shield,
      description: "Pagamento seguro via PayPal",
      color: "from-indigo-500 to-blue-500"
    },
    {
      id: "mbway",
      name: "MB WAY",
      icon: Lock,
      description: "Pagamento instantâneo",
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Sidebar */}
      {user && <Sidebar />}

      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Header */}
      <header className={`relative border-b border-white/5 bg-slate-900/30 backdrop-blur-xl sticky top-0 z-50 ${user ? 'lg:ml-72' : ''}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 lg:gap-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative p-2.5 lg:p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-lg">
                  <BarChart3 className="w-5 h-5 lg:w-7 lg:h-7 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-xl lg:text-2xl xl:text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  Meu Gráfico AI
                </h1>
                <p className="text-xs lg:text-sm text-slate-400 hidden sm:block">Análise inteligente de gráficos financeiros</p>
              </div>
            </div>
            <div className="flex items-center gap-2 lg:gap-3">
              {user ? (
                <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg border border-white/10">
                  <UserIcon className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm lg:text-base text-white font-medium">{user.name}</span>
                </div>
              ) : (
                <>
                  <Link href="/login">
                    <Button 
                      variant="ghost"
                      className="text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-300 text-sm lg:text-base"
                    >
                      Entrar
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button 
                      className="relative group overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 text-sm lg:text-base"
                    >
                      <span className="relative z-10">Criar Conta</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-slate-900/95 border-white/10 backdrop-blur-xl shadow-2xl animate-in slide-in-from-bottom-4 duration-500">
            <div className="p-6 md:p-8 lg:p-10">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  Finalizar Compra
                </h2>
                <Button
                  onClick={() => {
                    setShowCheckout(false);
                    setSelectedPlan(null);
                    setPaymentMethod(null);
                  }}
                  variant="ghost"
                  className="text-slate-400 hover:text-white hover:bg-white/5 rounded-full w-10 h-10 p-0 transition-all duration-300"
                >
                  ✕
                </Button>
              </div>

              {selectedPlan && (
                <Card className="p-5 lg:p-6 mb-8 bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg lg:text-xl font-bold text-white mb-1">Plano {selectedPlan}</h3>
                      <p className="text-slate-400 text-sm">
                        {pricingPlans.find(p => p.name === selectedPlan)?.features.length} funcionalidades incluídas
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                        €{pricingPlans.find(p => p.name === selectedPlan)?.price}
                      </p>
                      <p className="text-slate-400 text-sm">/mês</p>
                    </div>
                  </div>
                </Card>
              )}

              <div className="mb-8">
                <h3 className="text-lg lg:text-xl font-bold text-white mb-5">Método de Pagamento</h3>
                <div className="space-y-3">
                  {paymentMethods.map((method) => {
                    const MethodIcon = method.icon;
                    return (
                      <button
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id as "card" | "paypal" | "mbway")}
                        className={`w-full p-4 lg:p-5 rounded-2xl border-2 transition-all duration-300 group ${
                          paymentMethod === method.id
                            ? "border-cyan-500/50 bg-cyan-500/10 shadow-lg shadow-cyan-500/20"
                            : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`p-3 lg:p-4 rounded-xl bg-gradient-to-br ${method.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            <MethodIcon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                          </div>
                          <div className="flex-1 text-left">
                            <p className="font-semibold text-white text-sm lg:text-base">{method.name}</p>
                            <p className="text-xs lg:text-sm text-slate-400">{method.description}</p>
                          </div>
                          {paymentMethod === method.id && (
                            <Check className="w-6 h-6 text-cyan-400 animate-in zoom-in duration-300" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {paymentMethod === "card" && (
                <div className="mb-8 space-y-4 animate-in slide-in-from-top duration-500">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Número do Cartão
                    </label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 lg:py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Validade
                      </label>
                      <input
                        type="text"
                        placeholder="MM/AA"
                        className="w-full px-4 py-3 lg:py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-4 py-3 lg:py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Nome no Cartão
                    </label>
                    <input
                      type="text"
                      placeholder="João Silva"
                      className="w-full px-4 py-3 lg:py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300"
                    />
                  </div>
                </div>
              )}

              <div className="mb-8 p-5 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl">
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-green-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-green-400">Pagamento 100% Seguro</p>
                    <p className="text-xs text-green-300/80">
                      Seus dados são protegidos com criptografia SSL
                    </p>
                  </div>
                </div>
              </div>

              <Button
                onClick={handlePayment}
                disabled={!paymentMethod}
                className="w-full relative group overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-5 lg:py-6 text-base lg:text-lg shadow-2xl shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 rounded-xl"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Lock className="w-5 h-5" />
                  Confirmar Pagamento
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>

              <p className="text-xs text-slate-400 text-center mt-6">
                Ao confirmar, você concorda com nossos{" "}
                <span className="text-cyan-400 hover:underline cursor-pointer">
                  Termos de Serviço
                </span>
                {" "}
                e{" "}
                <span className="text-cyan-400 hover:underline cursor-pointer">
                  Política de Privacidade
                </span>
              </p>
            </div>
          </Card>
        </div>
      )}

      {/* Main Content */}
      <main className={`relative container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16 ${user ? 'lg:ml-72' : ''}`}>
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12 lg:mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-full mb-6 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-cyan-300 font-medium">Análise com IA Avançada</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                Transforme Gráficos em
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Decisões Inteligentes
              </span>
            </h2>
            <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Análise técnica profissional em segundos. Deixe nossa IA avaliar seus gráficos e receba recomendações precisas de compra e venda.
            </p>
          </div>

          {/* Upload Section */}
          <Card className="p-6 md:p-8 lg:p-10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] border-white/10 backdrop-blur-xl shadow-2xl mb-12 lg:mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3">
                Envie seu gráfico
              </h3>
              <p className="text-slate-400 text-base md:text-lg">
                Faça upload de um print do gráfico e receba uma análise completa em segundos
              </p>
            </div>

            <div className="mb-8">
              <label
                htmlFor="image-upload"
                className="group flex flex-col items-center justify-center w-full h-72 md:h-80 lg:h-96 border-2 border-dashed border-white/20 rounded-3xl cursor-pointer hover:border-cyan-500/50 transition-all duration-500 bg-gradient-to-br from-white/5 to-transparent hover:from-cyan-500/5 hover:to-blue-500/5 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/5 group-hover:to-blue-500/5 transition-all duration-500" />
                {image ? (
                  <div className="relative w-full h-full p-6">
                    <img
                      src={image}
                      alt="Preview"
                      className="w-full h-full object-contain rounded-2xl shadow-2xl"
                    />
                  </div>
                ) : (
                  <div className="relative z-10 flex flex-col items-center justify-center pt-5 pb-6">
                    <div className="relative mb-6">
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                      <div className="relative p-6 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-xl group-hover:scale-110 transition-transform duration-300">
                        <Upload className="w-10 h-10 md:w-12 md:h-12 text-white" />
                      </div>
                    </div>
                    <p className="mb-3 text-base md:text-lg text-slate-200 font-medium">
                      <span className="font-bold">Clique para fazer upload</span> ou arraste aqui
                    </p>
                    <p className="text-sm md:text-base text-slate-400">PNG, JPG ou JPEG (MAX. 10MB)</p>
                  </div>
                )}
                <input
                  id="image-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
            </div>

            {image && (
              <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Button
                  onClick={analyzeImage}
                  disabled={analyzing}
                  className="flex-1 relative group overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-6 lg:py-7 text-base lg:text-lg shadow-2xl shadow-cyan-500/25 transition-all duration-300 rounded-xl"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {analyzing ? (
                      <>
                        <Loader2 className="w-5 h-5 lg:w-6 lg:h-6 animate-spin" />
                        Analisando...
                      </>
                    ) : (
                      <>
                        <BarChart3 className="w-5 h-5 lg:w-6 lg:h-6" />
                        Analisar Gráfico
                        <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
                <Button
                  onClick={() => {
                    setImage(null);
                    setResult(null);
                  }}
                  variant="outline"
                  className="border-white/20 text-slate-300 hover:bg-white/10 hover:text-white hover:border-white/30 py-6 lg:py-7 text-base lg:text-lg rounded-xl transition-all duration-300"
                >
                  Limpar
                </Button>
              </div>
            )}
          </Card>

          {/* Results Section */}
          {result && (
            <div className="space-y-6 lg:space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <Card className="p-8 lg:p-12 bg-gradient-to-br from-white/[0.07] to-white/[0.02] border-white/10 backdrop-blur-xl shadow-2xl">
                <div className="text-center">
                  <div className="relative inline-block mb-6">
                    <div className={`absolute inset-0 bg-gradient-to-br ${getRecommendationColor(result.recommendation)} rounded-3xl blur-2xl opacity-50 animate-pulse`} />
                    <div className={`relative inline-flex items-center justify-center w-24 h-24 lg:w-28 lg:h-28 rounded-3xl bg-gradient-to-br ${getRecommendationColor(result.recommendation)} shadow-2xl`}>
                      {getRecommendationIcon(result.recommendation)}
                    </div>
                  </div>
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                    {getRecommendationText(result.recommendation)}
                  </h3>
                  <div className="flex items-center justify-center gap-3 text-slate-400 text-lg">
                    <span>Confiança:</span>
                    <span className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                      {result.confidence}%
                    </span>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden backdrop-blur-sm">
                    <div
                      className={`h-full bg-gradient-to-r ${getRecommendationColor(result.recommendation)} transition-all duration-1000 ease-out shadow-lg relative overflow-hidden`}
                      style={{ width: `${result.confidence}%` }}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse" />
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 md:p-8 lg:p-10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] border-white/10 backdrop-blur-xl shadow-2xl">
                <h4 className="text-xl lg:text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl">
                    <AlertCircle className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                  </div>
                  Análise Detalhada
                </h4>
                <p className="text-slate-300 leading-relaxed text-base lg:text-lg mb-8">
                  {result.analysis || "Análise técnica completa do gráfico enviado, identificando padrões, tendências e níveis de suporte/resistência relevantes para tomada de decisão."}
                </p>

                <h5 className="text-lg lg:text-xl font-semibold text-white mb-5 flex items-center gap-2">
                  <Star className="w-5 h-5 text-cyan-400" />
                  Pontos-chave:
                </h5>
                <ul className="space-y-4">
                  {result.keyPoints && result.keyPoints.length > 0 ? (
                    result.keyPoints.map((point, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-4 text-slate-300 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                      >
                        <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white flex items-center justify-center text-sm font-bold shadow-lg">
                          {index + 1}
                        </span>
                        <span className="flex-1 text-base">{point}</span>
                      </li>
                    ))
                  ) : (
                    <>
                      <li className="flex items-start gap-4 text-slate-300 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                        <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white flex items-center justify-center text-sm font-bold shadow-lg">
                          1
                        </span>
                        <span className="flex-1 text-base">Tendência identificada com base em médias móveis e volume</span>
                      </li>
                      <li className="flex items-start gap-4 text-slate-300 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                        <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white flex items-center justify-center text-sm font-bold shadow-lg">
                          2
                        </span>
                        <span className="flex-1 text-base">Níveis de suporte e resistência mapeados</span>
                      </li>
                      <li className="flex items-start gap-4 text-slate-300 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                        <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white flex items-center justify-center text-sm font-bold shadow-lg">
                          3
                        </span>
                        <span className="flex-1 text-base">Indicadores técnicos confirmam o movimento atual</span>
                      </li>
                    </>
                  )}
                </ul>
              </Card>
            </div>
          )}

          {/* Features Section */}
          <div className="mt-20 lg:mt-32">
            <div className="text-center mb-12 lg:mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full mb-6 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-purple-300 font-medium">Recursos Premium</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6">
                Todas as Funcionalidades
              </h2>
              <p className="text-slate-400 text-lg lg:text-xl max-w-3xl mx-auto">
                Recursos poderosos para análise profissional de mercado
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {features && features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card
                    key={index}
                    className="group p-6 lg:p-8 bg-gradient-to-br from-white/[0.07] to-white/[0.02] border-white/10 backdrop-blur-xl hover:scale-105 hover:border-white/20 transition-all duration-500 hover:shadow-2xl animate-in fade-in slide-in-from-bottom-4"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative mb-5">
                      <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />
                      <div className={`relative inline-flex items-center justify-center w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-gradient-to-br ${feature.color} shadow-xl group-hover:scale-110 transition-transform duration-500`}>
                        <Icon className="w-7 h-7 lg:w-8 lg:h-8 text-white" />
                      </div>
                    </div>
                    <h3 className="text-lg lg:text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-slate-400 text-sm lg:text-base leading-relaxed">
                      {feature.description}
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Pricing Section */}
          <div className="mt-20 lg:mt-32">
            <div className="text-center mb-12 lg:mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-full mb-6 backdrop-blur-sm">
                <Crown className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-300 font-medium">Planos Flexíveis</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6">
                Escolha seu plano
              </h2>
              <p className="text-slate-400 text-lg lg:text-xl max-w-3xl mx-auto">
                Selecione o plano ideal para suas necessidades de análise
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {pricingPlans && pricingPlans.map((plan, index) => {
                const PlanIcon = plan.icon;
                return (
                  <Card
                    key={index}
                    className={`group relative p-6 lg:p-8 xl:p-10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] border-white/10 backdrop-blur-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-in fade-in slide-in-from-bottom-4 ${
                      plan.popular ? "ring-2 ring-purple-500/50 shadow-2xl shadow-purple-500/20 lg:scale-105" : ""
                    }`}
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    {plan.popular && (
                      <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full blur-lg opacity-75" />
                          <span className="relative bg-gradient-to-r from-purple-500 to-pink-600 text-white text-xs font-bold px-5 py-2 rounded-full shadow-xl flex items-center gap-2">
                            <Star className="w-3 h-3" />
                            MAIS POPULAR
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="text-center mb-8">
                      <div className="relative inline-block mb-6">
                        <div className={`absolute inset-0 bg-gradient-to-br ${plan.color} rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500`} />
                        <div className={`relative inline-flex items-center justify-center w-20 h-20 lg:w-24 lg:h-24 rounded-3xl bg-gradient-to-br ${plan.color} shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
                          <PlanIcon className="w-10 h-10 lg:w-12 lg:h-12 text-white" />
                        </div>
                      </div>
                      <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">{plan.name}</h3>
                      <div className="flex items-baseline justify-center gap-2 mb-2">
                        <span className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                          €{plan.price}
                        </span>
                        <span className="text-slate-400 text-lg">/{plan.period}</span>
                      </div>
                    </div>

                    <ul className="space-y-4 mb-8">
                      {plan.features && plan.features.map((feature, featureIndex) => {
                        const FeatureIcon = feature.icon;
                        return (
                          <li key={featureIndex} className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center border border-green-500/20">
                              <FeatureIcon className="w-4 h-4 text-green-400" />
                            </div>
                            <span className="text-slate-300 text-sm lg:text-base flex-1 leading-relaxed">{feature.text}</span>
                          </li>
                        );
                      })}
                    </ul>

                    <Button
                      onClick={() => handleSelectPlan(plan.name)}
                      className={`w-full relative group/btn overflow-hidden py-6 lg:py-7 text-base lg:text-lg font-semibold shadow-2xl transition-all duration-500 rounded-xl ${
                        plan.popular
                          ? `bg-gradient-to-r ${plan.color} hover:scale-105 text-white`
                          : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                      }`}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Começar agora
                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                      </span>
                      {plan.popular && (
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                      )}
                    </Button>
                  </Card>
                );
              })}
            </div>

            <div className="mt-12 text-center space-y-3">
              <p className="text-slate-400 text-sm lg:text-base">
                Todos os planos incluem <span className="text-cyan-400 font-semibold">7 dias de teste grátis</span>. Cancele a qualquer momento.
              </p>
              <p className="text-slate-500 text-xs lg:text-sm">
                Pagamentos seguros processados via Stripe. Valores em euros (€).
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={`relative border-t border-white/5 bg-slate-900/30 backdrop-blur-xl mt-20 lg:mt-32 ${user ? 'lg:ml-72' : ''}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Meu Gráfico AI</span>
            </div>
            <p className="text-slate-400 text-sm lg:text-base">
              © 2024 Meu Gráfico AI. Todos os direitos reservados.
            </p>
            <p className="text-slate-500 text-xs lg:text-sm">
              Análise de mercado financeiro com inteligência artificial.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
