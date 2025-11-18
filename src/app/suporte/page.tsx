"use client";

import { useState } from "react";
import {
  MessageCircle,
  Mail,
  Phone,
  Send,
  HelpCircle,
  Book,
  Video,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SuportePage() {
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
    priority: "normal",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Mensagem enviada! Nossa equipe responderá em breve.");
    setFormData({ subject: "", message: "", priority: "normal" });
  };

  const supportOptions = [
    {
      icon: MessageCircle,
      title: "Chat ao Vivo",
      description: "Fale com nossa equipe em tempo real",
      action: "Iniciar Chat",
      color: "from-cyan-500 to-blue-600",
      available: true,
    },
    {
      icon: Mail,
      title: "Email",
      description: "suporte@meugraficai.com",
      action: "Enviar Email",
      color: "from-purple-500 to-pink-600",
      available: true,
    },
    {
      icon: Phone,
      title: "Telefone",
      description: "+55 (11) 1234-5678",
      action: "Ligar Agora",
      color: "from-green-500 to-emerald-600",
      available: true,
    },
  ];

  const resources = [
    {
      icon: Book,
      title: "Base de Conhecimento",
      description: "Artigos e guias completos",
      link: "#",
    },
    {
      icon: Video,
      title: "Tutoriais em Vídeo",
      description: "Aprenda assistindo",
      link: "#",
    },
    {
      icon: FileText,
      title: "Documentação",
      description: "Referência técnica completa",
      link: "#",
    },
    {
      icon: HelpCircle,
      title: "FAQ",
      description: "Perguntas frequentes",
      link: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 lg:pl-72">
      <div className="p-6 lg:p-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-full mb-6">
            <HelpCircle className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium text-cyan-300">
              Estamos aqui para ajudar
            </span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Central de Suporte
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Escolha a melhor forma de entrar em contato conosco ou encontre
            respostas na nossa base de conhecimento
          </p>
        </div>

        {/* Support Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-6xl mx-auto">
          {supportOptions.map((option) => {
            const Icon = option.icon;
            return (
              <div
                key={option.title}
                className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 hover:scale-105"
              >
                <div className="relative inline-block mb-4">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${option.color} rounded-xl blur-lg opacity-50`}
                  />
                  <div
                    className={`relative p-3 bg-gradient-to-br ${option.color} rounded-xl`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">
                  {option.title}
                </h3>
                <p className="text-slate-400 text-sm mb-4">
                  {option.description}
                </p>

                {option.available ? (
                  <Button className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-xl transition-all">
                    {option.action}
                  </Button>
                ) : (
                  <Button
                    disabled
                    className="w-full bg-slate-800/50 text-slate-500 border border-white/5 rounded-xl cursor-not-allowed"
                  >
                    Indisponível
                  </Button>
                )}
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              Envie uma Mensagem
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Assunto
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                  placeholder="Como podemos ajudar?"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Prioridade
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) =>
                    setFormData({ ...formData, priority: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                >
                  <option value="low">Baixa</option>
                  <option value="normal">Normal</option>
                  <option value="high">Alta</option>
                  <option value="urgent">Urgente</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Mensagem
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={6}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all resize-none"
                  placeholder="Descreva seu problema ou dúvida..."
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:scale-105"
              >
                <Send className="w-5 h-5 mr-2" />
                Enviar Mensagem
              </Button>
            </form>
          </div>

          {/* Resources */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">
              Recursos de Ajuda
            </h2>

            <div className="space-y-4">
              {resources.map((resource) => {
                const Icon = resource.icon;
                return (
                  <a
                    key={resource.title}
                    href={resource.link}
                    className="block bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all duration-300 hover:scale-105 group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-all">
                        <Icon className="w-6 h-6 text-cyan-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                          {resource.title}
                        </h3>
                        <p className="text-slate-400 text-sm">
                          {resource.description}
                        </p>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Response Time */}
            <div className="mt-8 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-2">
                Tempo de Resposta
              </h3>
              <p className="text-slate-300 text-sm mb-4">
                Nossa equipe responde em média em:
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-2xl font-bold text-cyan-400">2h</p>
                  <p className="text-xs text-slate-400">Chat ao Vivo</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-cyan-400">24h</p>
                  <p className="text-xs text-slate-400">Email</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
