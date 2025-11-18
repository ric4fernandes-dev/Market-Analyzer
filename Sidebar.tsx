"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Home,
  Upload,
  History,
  Settings,
  CreditCard,
  User,
  LogOut,
  Menu,
  X,
  TrendingUp,
  Bell,
  HelpCircle,
  FileText,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const menuItems = [
    { icon: Home, label: "Início", href: "/" },
    { icon: Upload, label: "Nova Análise", href: "/analise" },
    { icon: History, label: "Histórico", href: "/historico" },
    { icon: TrendingUp, label: "Portfólio", href: "/portfolio" },
    { icon: Bell, label: "Alertas", href: "/alertas" },
    { icon: FileText, label: "Relatórios", href: "/relatorios" },
  ];

  const bottomMenuItems = [
    { icon: CreditCard, label: "Planos", href: "/planos" },
    { icon: Settings, label: "Configurações", href: "/configuracoes" },
    { icon: HelpCircle, label: "Ajuda", href: "/ajuda" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 bg-slate-900/95 border border-white/10 backdrop-blur-xl shadow-xl hover:bg-slate-800 transition-all duration-300"
        size="icon"
      >
        {isOpen ? (
          <X className="w-5 h-5 text-white" />
        ) : (
          <Menu className="w-5 h-5 text-white" />
        )}
      </Button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-slate-900/95 border-r border-white/10 backdrop-blur-xl z-40 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative p-2.5 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-lg">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">Meu Gráfico AI</h1>
                <p className="text-xs text-slate-400">Análise Inteligente</p>
              </div>
            </div>
          </div>

          {/* User Info */}
          {user && (
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-slate-400 truncate">{user.email}</p>
                </div>
              </div>
            </div>
          )}

          {/* Main Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                    active
                      ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-white shadow-lg shadow-cyan-500/10"
                      : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 transition-all duration-300 ${
                      active
                        ? "text-cyan-400"
                        : "text-slate-500 group-hover:text-cyan-400"
                    }`}
                  />
                  <span className="font-medium">{item.label}</span>
                  {active && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Bottom Navigation */}
          <div className="p-4 border-t border-white/10 space-y-1">
            {bottomMenuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                    active
                      ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-white"
                      : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 transition-all duration-300 ${
                      active
                        ? "text-cyan-400"
                        : "text-slate-500 group-hover:text-cyan-400"
                    }`}
                  />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}

            {/* Logout Button */}
            {user && (
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/30 transition-all duration-300 group"
              >
                <LogOut className="w-5 h-5 text-slate-500 group-hover:text-red-400 transition-colors" />
                <span className="font-medium">Sair</span>
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
