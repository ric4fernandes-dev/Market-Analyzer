"use client";

import { useState } from "react";
import { Upload, TrendingUp, TrendingDown, AlertCircle, Loader2, BarChart3, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    recommendation: "buy" | "sell" | "hold";
    confidence: number;
    analysis: string;
    keyPoints: string[];
  } | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar tamanho do arquivo (máx 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError("Arquivo muito grande. Máximo 10MB.");
        return;
      }

      // Validar tipo do arquivo
      if (!file.type.startsWith("image/")) {
        setError("Por favor, envie apenas imagens.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResult(null);
        setError(null);
      };
      reader.onerror = () => {
        setError("Erro ao carregar a imagem. Tente novamente.");
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!image) return;

    setAnalyzing(true);
    setError(null);
    
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || "Erro ao analisar imagem");
      }

      setResult(data);
    } catch (error: any) {
      console.error("Erro ao analisar:", error);
      setError(error.message || "Erro ao analisar a imagem. Tente novamente.");
    } finally {
      setAnalyzing(false);
    }
  };

  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case "buy":
        return "from-green-500 to-emerald-600";
      case "sell":
        return "from-red-500 to-rose-600";
      default:
        return "from-yellow-500 to-orange-600";
    }
  };

  const getRecommendationIcon = (rec: string) => {
    switch (rec) {
      case "buy":
        return <TrendingUp className="w-8 h-8" />;
      case "sell":
        return <TrendingDown className="w-8 h-8" />;
      default:
        return <AlertCircle className="w-8 h-8" />;
    }
  };

  const getRecommendationText = (rec: string) => {
    switch (rec) {
      case "buy":
        return "COMPRAR";
      case "sell":
        return "VENDER";
      default:
        return "AGUARDAR";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Market Analyzer</h1>
              <p className="text-sm text-slate-400">Análise inteligente de gráficos financeiros</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          {/* Upload Section */}
          <Card className="p-6 md:p-8 bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Envie seu gráfico
              </h2>
              <p className="text-slate-400">
                Faça upload de um print do gráfico e receba uma análise completa
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-red-200 text-sm">{error}</p>
                </div>
                <button
                  onClick={() => setError(null)}
                  className="text-red-400 hover:text-red-300"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Upload Area */}
            <div className="mb-6">
              <label
                htmlFor="image-upload"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-slate-600 rounded-xl cursor-pointer hover:border-cyan-500 transition-all duration-300 bg-slate-900/50 hover:bg-slate-900/80"
              >
                {image ? (
                  <div className="relative w-full h-full p-4">
                    <img
                      src={image}
                      alt="Preview"
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-12 h-12 text-slate-400 mb-4" />
                    <p className="mb-2 text-sm text-slate-300">
                      <span className="font-semibold">Clique para fazer upload</span> ou arraste
                    </p>
                    <p className="text-xs text-slate-500">PNG, JPG ou JPEG (MAX. 10MB)</p>
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

            {/* Analyze Button */}
            {image && (
              <div className="flex gap-3">
                <Button
                  onClick={analyzeImage}
                  disabled={analyzing}
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-6 text-lg shadow-lg shadow-cyan-500/20"
                >
                  {analyzing ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Analisando...
                    </>
                  ) : (
                    <>
                      <BarChart3 className="w-5 h-5 mr-2" />
                      Analisar Gráfico
                    </>
                  )}
                </Button>
                <Button
                  onClick={() => {
                    setImage(null);
                    setResult(null);
                    setError(null);
                  }}
                  variant="outline"
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  Limpar
                </Button>
              </div>
            )}
          </Card>

          {/* Results Section */}
          {result && (
            <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Recommendation Card */}
              <Card className="p-8 bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <div className="text-center">
                  <div
                    className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br ${getRecommendationColor(
                      result.recommendation
                    )} mb-4 shadow-lg`}
                  >
                    {getRecommendationIcon(result.recommendation)}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {getRecommendationText(result.recommendation)}
                  </h3>
                  <div className="flex items-center justify-center gap-2 text-slate-400">
                    <span>Confiança:</span>
                    <span className="text-2xl font-bold text-white">
                      {result.confidence}%
                    </span>
                  </div>
                </div>

                {/* Confidence Bar */}
                <div className="mt-6">
                  <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${getRecommendationColor(
                        result.recommendation
                      )} transition-all duration-1000 ease-out shadow-lg`}
                      style={{ width: `${result.confidence}%` }}
                    />
                  </div>
                </div>
              </Card>

              {/* Analysis Details */}
              <Card className="p-6 md:p-8 bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-cyan-500" />
                  Análise Detalhada
                </h4>
                <p className="text-slate-300 leading-relaxed mb-6">{result.analysis}</p>

                <h5 className="text-lg font-semibold text-white mb-3">Pontos-chave:</h5>
                <ul className="space-y-2">
                  {result.keyPoints.map((point, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-slate-300"
                    >
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-sm font-semibold mt-0.5">
                        {index + 1}
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Disclaimer */}
              <Card className="p-4 bg-yellow-500/10 border-yellow-500/30 backdrop-blur-sm">
                <p className="text-sm text-yellow-200 text-center">
                  ⚠️ Esta análise é apenas informativa e não constitui recomendação de investimento.
                  Sempre consulte um profissional qualificado antes de tomar decisões financeiras.
                </p>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
