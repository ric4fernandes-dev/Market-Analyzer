"use client";

import { useState } from "react";
import {
  User,
  Bell,
  Lock,
  Palette,
  Globe,
  Save,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

export default function ConfiguracoesPage() {
  const { user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    name: user?.name || "",
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
    notifications: {
      email: true,
      push: false,
      alerts: true,
    },
    theme: "dark",
    language: "pt-BR",
  });

  const handleSave = () => {
    // Aqui você implementaria a lógica de salvar as configurações
    alert("Configurações salvas com sucesso!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 lg:pl-72">
      <div className="p-6 lg:p-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
            Configurações
          </h1>
          <p className="text-slate-400">
            Gerencie suas preferências e configurações da conta
          </p>
        </div>

        <div className="max-w-4xl space-y-6">
          {/* Perfil */}
          <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg">
                <User className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white">
                Informações do Perfil
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={settings.name}
                  onChange={(e) =>
                    setSettings({ ...settings, name: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                  placeholder="Seu nome"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) =>
                    setSettings({ ...settings, email: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                  placeholder="seu@email.com"
                />
              </div>
            </div>
          </div>

          {/* Segurança */}
          <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
                <Lock className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white">
                Segurança e Senha
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Senha Atual
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={settings.currentPassword}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        currentPassword: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                    placeholder="••••••••"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Nova Senha
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={settings.newPassword}
                  onChange={(e) =>
                    setSettings({ ...settings, newPassword: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          {/* Notificações */}
          <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg">
                <Bell className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white">Notificações</h2>
            </div>

            <div className="space-y-4">
              <label className="flex items-center justify-between p-4 bg-slate-800/30 rounded-xl cursor-pointer hover:bg-slate-800/50 transition-all">
                <div>
                  <p className="text-white font-medium">
                    Notificações por Email
                  </p>
                  <p className="text-sm text-slate-400">
                    Receba atualizações importantes por email
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.notifications.email}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        email: e.target.checked,
                      },
                    })
                  }
                  className="w-5 h-5 text-cyan-500 bg-slate-700 border-slate-600 rounded focus:ring-cyan-500"
                />
              </label>

              <label className="flex items-center justify-between p-4 bg-slate-800/30 rounded-xl cursor-pointer hover:bg-slate-800/50 transition-all">
                <div>
                  <p className="text-white font-medium">Notificações Push</p>
                  <p className="text-sm text-slate-400">
                    Receba notificações no navegador
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.notifications.push}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        push: e.target.checked,
                      },
                    })
                  }
                  className="w-5 h-5 text-cyan-500 bg-slate-700 border-slate-600 rounded focus:ring-cyan-500"
                />
              </label>

              <label className="flex items-center justify-between p-4 bg-slate-800/30 rounded-xl cursor-pointer hover:bg-slate-800/50 transition-all">
                <div>
                  <p className="text-white font-medium">Alertas de Análise</p>
                  <p className="text-sm text-slate-400">
                    Seja notificado quando análises forem concluídas
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.notifications.alerts}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        alerts: e.target.checked,
                      },
                    })
                  }
                  className="w-5 h-5 text-cyan-500 bg-slate-700 border-slate-600 rounded focus:ring-cyan-500"
                />
              </label>
            </div>
          </div>

          {/* Aparência */}
          <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg">
                <Palette className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white">Aparência</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">
                  Tema
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setSettings({ ...settings, theme: "dark" })}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      settings.theme === "dark"
                        ? "border-cyan-500 bg-cyan-500/10"
                        : "border-white/10 bg-slate-800/30 hover:border-white/20"
                    }`}
                  >
                    <div className="w-full h-12 bg-slate-900 rounded-lg mb-2" />
                    <p className="text-white font-medium">Escuro</p>
                  </button>
                  <button
                    onClick={() => setSettings({ ...settings, theme: "light" })}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      settings.theme === "light"
                        ? "border-cyan-500 bg-cyan-500/10"
                        : "border-white/10 bg-slate-800/30 hover:border-white/20"
                    }`}
                  >
                    <div className="w-full h-12 bg-white rounded-lg mb-2" />
                    <p className="text-white font-medium">Claro</p>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Idioma */}
          <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white">Idioma e Região</h2>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Idioma
              </label>
              <select
                value={settings.language}
                onChange={(e) =>
                  setSettings({ ...settings, language: e.target.value })
                }
                className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
              >
                <option value="pt-BR">Português (Brasil)</option>
                <option value="en-US">English (US)</option>
                <option value="es-ES">Español</option>
                <option value="fr-FR">Français</option>
              </select>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button
              onClick={handleSave}
              className="px-8 py-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:scale-105"
            >
              <Save className="w-5 h-5 mr-2" />
              Salvar Alterações
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
