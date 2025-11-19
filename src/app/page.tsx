"use client";

import { useState, useCallback } from "react";
import { Upload, TrendingUp, TrendingDown, AlertCircle, Loader2, BarChart3, Sparkles, X, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Sidebar } from "@/components/custom/Sidebar";
import { LanguageSelector } from "@/components/custom/LanguageSelector";

export default function Home() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState("home");
  
  const [image, setImage] = useState<string | null>(null);
  const [recommendation, setRecommendation] = useState<"buy" | "sell" | "hold" | null>(null);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar tamanho do arquivo (máx 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("Imagem muito grande. Por favor, use uma imagem menor que 5MB.");
        return;
      }

      // Validar tipo de arquivo
      if (!file.type.startsWith('image/')) {
        setError("Por favor, selecione um arquivo de imagem válido.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setRecommendation(null);
        setConfidence(null);
        setAnalysis(null);
        setError(null);
      };
      reader.onerror = () => {
        setError("Erro ao ler o arquivo. Tente novamente.");
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const analyzeChart = useCallback(async () => {
    if (!image) return;

    setAnalyzing(true);
    setError(null);

    try {
      console.log("Enviando imagem para análise...");
      
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image }),
      });

      console.log("Resposta recebida. Status:", response.status);

      const data = await response.json();
      
      if (!response.ok) {
        // Tratar erros específicos
        if (response.status === 400 || response.status === 401 || response.status === 429) {
          throw new Error(data.error || "Erro ao processar a análise");
        }
        throw new Error(data.error || `Erro na análise: ${response.status}`);
      }

      if (data.error) {
        throw new Error(data.error);
      }

      console.log("Análise concluída com sucesso:", data);
      
      setRecommendation(data.recommendation);
      setConfidence(data.confidence);
      setAnalysis(data.analysis || null);
    } catch (error) {
      console.error("Erro ao analisar:", error);
      
      let errorMessage = "Erro desconhecido ao analisar o gráfico";
      
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      
      // Mensagens mais amigáveis para erros comuns
      if (errorMessage.includes("OPENAI_API_KEY")) {
        errorMessage = "Configure a chave da OpenAI nas configurações do projeto para usar esta funcionalidade.";
      } else if (errorMessage.includes("Failed to fetch")) {
        errorMessage = "Erro de conexão. Verifique sua internet e tente novamente.";
      }
      
      setError(errorMessage);
    } finally {
      setAnalyzing(false);
    }
  }, [image]);

  const clearChart = useCallback(() => {
    setImage(null);
    setRecommendation(null);
    setConfidence(null);
    setAnalysis(null);
    setError(null);
  }, []);

  const getRecommendationColor = useCallback((rec: string | null) => {
    switch (rec) {
      case "buy":
        return "from-emerald-300 via-green-400 to-teal-400";
      case "sell":
        return "from-rose-300 via-red-400 to-pink-400";
      default:
        return "from-amber-300 via-orange-400 to-yellow-400";
    }
  }, []);

  const getRecommendationIcon = useCallback((rec: string | null) => {
    switch (rec) {
      case "buy":
        return <TrendingUp className="w-6 h-6" />;
      case "sell":
        return <TrendingDown className="w-6 h-6" />;
      default:
        return <AlertCircle className="w-6 h-6" />;
    }
  }, []);

  const getRecommendationText = useCallback((rec: string | null) => {
    switch (rec) {
      case "buy":
        return t.buy;
      case "sell":
        return t.sell;
      default:
        return t.hold;
    }
  }, [t]);

  const handleNavigation = useCallback((section: string) => {
    setActiveSection(section);
    console.log(`Navegando para: ${section}`);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100">
      {/* Sidebar */}
      {user && <Sidebar onNavigate={handleNavigation} activeSection={activeSection} />}

      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Header */}
      <header className={`relative border-b border-purple-200/40 bg-white/60 backdrop-blur-xl sticky top-0 z-50 ${user ? 'lg:ml-72' : ''}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 lg:gap-4">
              <div className="relative group">
                {/* Glow effect animado */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-300 via-pink-300 to-orange-300 rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-all duration-500 animate-pulse" />
                
                {/* Container do logo com gradiente */}
                <div className="relative p-2.5 lg:p-3 bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 rounded-2xl shadow-lg transform group-hover:scale-105 transition-all duration-300">
                  {/* Ícones sobrepostos para efeito 3D */}
                  <div className="relative">
                    <TrendingUp className="w-5 h-5 lg:w-7 lg:h-7 text-white absolute top-0 left-0 opacity-30 transform -translate-x-0.5 -translate-y-0.5" />
                    <LineChart className="w-5 h-5 lg:w-7 lg:h-7 text-white relative z-10" />
                  </div>
                  
                  {/* Sparkle decorativo */}
                  <Sparkles className="w-2.5 h-2.5 lg:w-3 lg:h-3 text-yellow-200 absolute -top-1 -right-1 animate-pulse" />
                </div>
              </div>
              <div>
                <h1 className="text-xl lg:text-2xl xl:text-3xl font-black bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">
                  {t.appName}
                </h1>
                <p className="text-xs lg:text-sm text-purple-600/70 hidden sm:block">{t.appSubtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 lg:gap-3">
              <LanguageSelector />
              {!user && (
                <>
                  <Link href="/login">
                    <Button 
                      variant="ghost"
                      className="text-purple-600 hover:text-purple-800 hover:bg-purple-100/50 transition-all duration-300 text-sm lg:text-base"
                    >
                      {t.login}
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button 
                      className="relative group overflow-hidden bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 hover:from-purple-500 hover:via-pink-500 hover:to-orange-500 text-white shadow-md shadow-purple-300/30 transition-all duration-300 text-sm lg:text-base"
                    >
                      <span className="relative z-10">{t.signup}</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={`relative container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16 ${user ? 'lg:ml-72' : ''}`}>
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12 lg:mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-200/40 via-pink-200/40 to-orange-200/40 border border-purple-300/40 rounded-full mb-6 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-orange-500" />
              <span className="text-sm text-purple-700 font-medium">{t.heroTag}</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-gray-800 via-purple-700 to-pink-700 bg-clip-text text-transparent">
                {t.heroTitle1}
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">
                {t.heroTitle2}
              </span>
            </h2>
            <p className="text-lg md:text-xl text-purple-700/70 max-w-3xl mx-auto leading-relaxed">
              {t.heroDescription}
            </p>
          </div>

          {/* Single Upload Area */}
          <div className="max-w-4xl mx-auto mb-16">
            <Card className="p-6 lg:p-8 bg-white/70 border-purple-200/40 backdrop-blur-xl shadow-xl shadow-purple-200/20">
              {/* Upload Area */}
              <div className="mb-6">
                <label
                  htmlFor="upload-chart"
                  className="group flex flex-col items-center justify-center w-full h-96 border-2 border-dashed border-purple-300/50 rounded-2xl cursor-pointer hover:border-pink-400/60 transition-all duration-300 bg-purple-50/30 hover:bg-pink-50/40 relative overflow-hidden"
                >
                  {image ? (
                    <div className="relative w-full h-full">
                      <img
                        src={image}
                        alt="Gráfico"
                        className="w-full h-full object-contain rounded-xl"
                      />
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          clearChart();
                        }}
                        className="absolute top-4 right-4 p-2 bg-red-400/80 hover:bg-red-500 rounded-full transition-colors"
                      >
                        <X className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center p-8">
                      <div className="p-6 bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 rounded-3xl mb-6 group-hover:scale-110 transition-transform duration-300">
                        <Upload className="w-16 h-16 text-white" />
                      </div>
                      <p className="text-xl font-semibold text-purple-700 mb-2">
                        {t.uploadTitle}
                      </p>
                      <p className="text-sm text-purple-600/60">{t.uploadSubtitle}</p>
                    </div>
                  )}
                  <input
                    id="upload-chart"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-red-800 font-medium text-sm mb-1">Erro na análise</p>
                      <p className="text-red-700 text-sm">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Analyze Button */}
              {image && !recommendation && (
                <Button
                  onClick={analyzeChart}
                  disabled={analyzing}
                  className="w-full bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 hover:from-purple-500 hover:via-pink-500 hover:to-orange-500 text-white font-semibold py-6 text-lg rounded-xl shadow-lg shadow-purple-300/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {analyzing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      {t.analyzing}...
                    </>
                  ) : (
                    <>
                      <BarChart3 className="w-5 h-5 mr-2" />
                      {t.analyzeButton}
                    </>
                  )}
                </Button>
              )}

              {/* Recommendation Result */}
              {recommendation && confidence !== null && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-4">
                  <div className={`p-8 rounded-2xl bg-gradient-to-br ${getRecommendationColor(recommendation)} shadow-xl`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {getRecommendationIcon(recommendation)}
                        <div>
                          <p className="text-white/90 text-sm font-medium">
                            {t.recommendation || "Recomendação"}
                          </p>
                          <p className="text-white font-bold text-3xl">
                            {getRecommendationText(recommendation)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-white/95 text-sm">
                        <span>{t.confidenceLevel}</span>
                        <span className="font-bold text-lg">{confidence}%</span>
                      </div>
                      <div className="w-full bg-white/30 rounded-full h-3 overflow-hidden">
                        <div
                          className="h-full bg-white/95 transition-all duration-1000 ease-out rounded-full"
                          style={{ width: `${confidence}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Analysis Text */}
                  {analysis && (
                    <div className="p-6 bg-white/80 rounded-xl border border-purple-200/40">
                      <h3 className="text-lg font-semibold text-purple-700 mb-3">
                        {t.analysisDetails || "Análise Detalhada"}
                      </h3>
                      <p className="text-purple-600/80 leading-relaxed">{analysis}</p>
                    </div>
                  )}

                  {/* New Analysis Button */}
                  <Button
                    onClick={clearChart}
                    variant="outline"
                    className="w-full border-purple-300 text-purple-600 hover:bg-purple-50"
                  >
                    {t.newAnalysis || "Nova Análise"}
                  </Button>
                </div>
              )}
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={`relative border-t border-purple-200/40 bg-white/60 backdrop-blur-xl mt-20 lg:mt-32 ${user ? 'lg:ml-72' : ''}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="relative group">
                {/* Glow effect animado */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-300 via-pink-300 to-orange-300 rounded-xl blur-lg opacity-40 group-hover:opacity-70 transition-all duration-500 animate-pulse" />
                
                {/* Container do logo com gradiente */}
                <div className="relative p-2 bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 rounded-xl shadow-lg">
                  {/* Ícones sobrepostos para efeito 3D */}
                  <div className="relative">
                    <TrendingUp className="w-6 h-6 text-white absolute top-0 left-0 opacity-30 transform -translate-x-0.5 -translate-y-0.5" />
                    <LineChart className="w-6 h-6 text-white relative z-10" />
                  </div>
                  
                  {/* Sparkle decorativo */}
                  <Sparkles className="w-2.5 h-2.5 text-yellow-200 absolute -top-1 -right-1 animate-pulse" />
                </div>
              </div>
              <span className="text-xl font-black bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">{t.appName}</span>
            </div>
            <p className="text-purple-700/60 text-sm lg:text-base">
              {t.footerRights}
            </p>
            <p className="text-purple-600/50 text-xs lg:text-sm">
              {t.footerDescription}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
