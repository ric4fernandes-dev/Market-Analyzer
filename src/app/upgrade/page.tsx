"use client";

import { Check, Sparkles, Zap, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UpgradePage() {
  const plans = [
    {
      name: "Básico",
      price: "Grátis",
      description: "Perfeito para começar",
      features: [
        "5 análises por mês",
        "Histórico de 30 dias",
        "Suporte por email",
        "Relatórios básicos",
      ],
      current: true,
      icon: Sparkles,
      color: "from-slate-500 to-slate-600",
    },
    {
      name: "Pro",
      price: "R$ 49,90",
      period: "/mês",
      description: "Para profissionais sérios",
      features: [
        "Análises ilimitadas",
        "Histórico completo",
        "Suporte prioritário 24/7",
        "Relatórios avançados",
        "Alertas personalizados",
        "API de integração",
      ],
      popular: true,
      icon: Zap,
      color: "from-cyan-500 to-blue-600",
    },
    {
      name: "Enterprise",
      price: "R$ 199,90",
      period: "/mês",
      description: "Para equipes e empresas",
      features: [
        "Tudo do Pro",
        "Múltiplos usuários",
        "Dashboard personalizado",
        "Consultoria dedicada",
        "Treinamento da equipe",
        "SLA garantido",
        "White label",
      ],
      icon: Crown,
      color: "from-amber-500 to-orange-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 lg:pl-72">
      <div className="p-6 lg:p-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium text-cyan-300">
              Escolha o melhor plano para você
            </span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Faça Upgrade do Seu Plano
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Desbloqueie todo o potencial da análise inteligente de gráficos com
            nossos planos premium
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.name}
                className={`relative bg-slate-900/50 backdrop-blur-xl border rounded-2xl p-8 transition-all duration-300 hover:scale-105 ${
                  plan.popular
                    ? "border-cyan-500/50 shadow-2xl shadow-cyan-500/20"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full">
                    <span className="text-xs font-bold text-white">
                      MAIS POPULAR
                    </span>
                  </div>
                )}

                {plan.current && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-slate-700 rounded-full">
                    <span className="text-xs font-bold text-white">
                      PLANO ATUAL
                    </span>
                  </div>
                )}

                {/* Icon */}
                <div className="mb-6">
                  <div className="relative inline-block">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${plan.color} rounded-xl blur-lg opacity-50`}
                    />
                    <div
                      className={`relative p-3 bg-gradient-to-br ${plan.color} rounded-xl`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>

                {/* Plan Info */}
                <h3 className="text-2xl font-bold text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-slate-400 text-sm mb-6">{plan.description}</p>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-slate-400">{plan.period}</span>
                    )}
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  className={`w-full py-6 rounded-xl font-semibold transition-all duration-300 ${
                    plan.current
                      ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                      : plan.popular
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg shadow-cyan-500/30"
                      : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                  }`}
                  disabled={plan.current}
                >
                  {plan.current ? "Plano Atual" : "Fazer Upgrade"}
                </Button>
              </div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Perguntas Frequentes
          </h2>
          <div className="space-y-4">
            <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-2">
                Posso cancelar a qualquer momento?
              </h3>
              <p className="text-slate-400">
                Sim! Você pode cancelar seu plano a qualquer momento sem taxas
                adicionais. Seu acesso continuará até o final do período pago.
              </p>
            </div>
            <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-2">
                Como funciona o período de teste?
              </h3>
              <p className="text-slate-400">
                Oferecemos 7 dias de teste gratuito para todos os planos pagos.
                Você pode cancelar antes do término sem ser cobrado.
              </p>
            </div>
            <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-2">
                Posso mudar de plano depois?
              </h3>
              <p className="text-slate-400">
                Claro! Você pode fazer upgrade ou downgrade do seu plano a
                qualquer momento. As mudanças entram em vigor imediatamente.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
