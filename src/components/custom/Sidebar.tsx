"use client";

import { useState, useRef, useEffect } from "react";
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
  ChevronDown,
  Sparkles,
  Clock,
  LifeBuoy,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close user menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const userMenuItems = [
    { icon: Settings, label: "Configurações", href: "/configuracoes" },
    { icon: Sparkles, label: "Fazer Upgrade", href: "/upgrade", highlight: true },
    { icon: Clock, label: "Histórico de Atividades", href: "/atividades" },
    { icon: LifeBuoy, label: "Suporte", href: "/suporte" },
  ];

  const isActive = (href: string) => pathname === href;

  const handleUserMenuToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsUserMenuOpen(!isUserMenuOpen);
  };

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

          {/* User Info with Dropdown */}
          {user && (
            <div className="p-4 border-b border-white/10 relative z-50" ref={userMenuRef}>
              <button
                type="button"
                onClick={handleUserMenuToggle}
                className="w-full flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-sm font-semibold text-white truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-slate-400 truncate">{user.email}</p>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${
                    isUserMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute top-full left-4 right-4 mt-2 bg-slate-800/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-2 space-y-1">
                    {userMenuItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            setIsOpen(false);
                          }}
                          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group ${
                            item.highlight
                              ? "bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-300 hover:from-amber-500/30 hover:to-orange-500/30"
                              : "text-slate-300 hover:text-white hover:bg-white/10"
                          }`}
                        >
                          <Icon
                            className={`w-4 h-4 ${
                              item.highlight
                                ? "text-amber-400"
                                : "text-slate-400 group-hover:text-cyan-400"
                            }`}
                          />
                          <span className="text-sm font-medium">{item.label}</span>
                          {item.highlight && (
                            <Sparkles className="w-3 h-3 text-amber-400 ml-auto animate-pulse" />
                          )}
                        </Link>
                      );
                    })}
                    
                    {/* Divider */}
                    <div className="h-px bg-white/10 my-2" />
                    
                    {/* Logout */}
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setIsUserMenuOpen(false);
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300 group"
                    >
                      <LogOut className="w-4 h-4 text-slate-400 group-hover:text-red-400" />
                      <span className="text-sm font-medium">Sair</span>
                    </button>
                  </div>
                </div>
              )}
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
          </div>
        </div>
      </aside>
    </>
  );
}
