"use client";

import { Clock, TrendingUp, Upload, Eye, Trash2, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AtividadesPage() {
  const activities = [
    {
      id: 1,
      type: "analysis",
      title: "Análise de Gráfico de Ações",
      description: "Análise completa do gráfico PETR4",
      timestamp: "Há 2 horas",
      icon: TrendingUp,
      color: "from-cyan-500 to-blue-600",
    },
    {
      id: 2,
      type: "upload",
      title: "Upload de Imagem",
      description: "Gráfico de candlestick enviado",
      timestamp: "Há 5 horas",
      icon: Upload,
      color: "from-purple-500 to-pink-600",
    },
    {
      id: 3,
      type: "view",
      title: "Visualização de Relatório",
      description: "Relatório mensal acessado",
      timestamp: "Ontem",
      icon: Eye,
      color: "from-green-500 to-emerald-600",
    },
    {
      id: 4,
      type: "analysis",
      title: "Análise de Tendência",
      description: "Análise de tendência VALE3",
      timestamp: "Há 2 dias",
      icon: TrendingUp,
      color: "from-cyan-500 to-blue-600",
    },
    {
      id: 5,
      type: "delete",
      title: "Exclusão de Análise",
      description: "Análise antiga removida",
      timestamp: "Há 3 dias",
      icon: Trash2,
      color: "from-red-500 to-rose-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 lg:pl-72">
      <div className="p-6 lg:p-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
              Histórico de Atividades
            </h1>
            <p className="text-slate-400">
              Acompanhe todas as suas ações e análises
            </p>
          </div>

          <Button className="px-6 py-3 bg-slate-800/50 hover:bg-slate-800 text-white border border-white/10 rounded-xl transition-all">
            <Filter className="w-4 h-4 mr-2" />
            Filtrar
          </Button>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500/50 via-purple-500/50 to-transparent" />

            {/* Activities */}
            <div className="space-y-6">
              {activities.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div
                    key={activity.id}
                    className="relative pl-16 group animate-in fade-in slide-in-from-left duration-500"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-0 top-0">
                      <div className="relative">
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${activity.color} rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity`}
                        />
                        <div
                          className={`relative p-3 bg-gradient-to-br ${activity.color} rounded-full shadow-lg`}
                        >
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </div>

                    {/* Activity Card */}
                    <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all duration-300 hover:scale-[1.02]">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white mb-1">
                            {activity.title}
                          </h3>
                          <p className="text-slate-400 text-sm mb-3">
                            {activity.description}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <Clock className="w-3 h-3" />
                            <span>{activity.timestamp}</span>
                          </div>
                        </div>

                        <Button
                          size="sm"
                          className="bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg transition-all"
                        >
                          Ver Detalhes
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Load More */}
          <div className="mt-8 text-center">
            <Button className="px-8 py-3 bg-slate-800/50 hover:bg-slate-800 text-white border border-white/10 rounded-xl transition-all">
              Carregar Mais Atividades
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl">
          <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white">
                Total de Análises
              </h3>
            </div>
            <p className="text-3xl font-bold text-white">127</p>
            <p className="text-sm text-slate-400 mt-1">
              +12% em relação ao mês passado
            </p>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
                <Upload className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white">
                Uploads Realizados
              </h3>
            </div>
            <p className="text-3xl font-bold text-white">89</p>
            <p className="text-sm text-slate-400 mt-1">Últimos 30 dias</p>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white">
                Tempo Médio
              </h3>
            </div>
            <p className="text-3xl font-bold text-white">2.5min</p>
            <p className="text-sm text-slate-400 mt-1">
              Por análise completa
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
