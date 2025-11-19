"use client";

import { useState, useRef, useEffect } from "react";
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
  ChevronRight,
  Sparkles,
  Clock,
  LifeBuoy,
  Shield,
  Palette,
  Key,
  UserCircle,
  Crown,
  Zap,
  Star,
  Activity,
  Download,
  Eye,
  MessageCircle,
  BookOpen,
  Mail,
  LineChart,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

type SubMenuItem = {
  icon: any;
  labelKey: string;
  badge?: string;
  descriptionKey?: string;
};

type UserMenuItem = {
  icon: any;
  labelKey: string;
  highlight?: boolean;
  subItems?: SubMenuItem[];
};

type MenuItem = {
  icon: any;
  labelKey: string;
  id: string;
};

interface SidebarProps {
  onNavigate?: (id: string) => void;
  activeSection?: string;
}

export function Sidebar({ onNavigate, activeSection = "home" }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [expandedSubMenu, setExpandedSubMenu] = useState<string | null>(null);
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close user menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
        setExpandedSubMenu(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems: MenuItem[] = [
    { icon: History, labelKey: "history", id: "historico" },
    { icon: HelpCircle, labelKey: "help", id: "ajuda" },
  ];

  const userMenuItems: UserMenuItem[] = [
    {
      icon: Settings,
      labelKey: "settings",
      subItems: [
        { icon: UserCircle, labelKey: "profile", descriptionKey: "profileDesc" },
        { icon: Shield, labelKey: "security", descriptionKey: "securityDesc" },
        { icon: Palette, labelKey: "appearance", descriptionKey: "appearanceDesc" },
        { icon: Key, labelKey: "apiKeys", descriptionKey: "apiKeysDesc" },
      ],
    },
    {
      icon: Sparkles,
      labelKey: "upgrade",
      highlight: true,
      subItems: [
        { icon: Zap, labelKey: "basicPlan", badge: "€9.99", descriptionKey: "basicPlanDesc" },
        { icon: Crown, labelKey: "proPlan", badge: "€29.99", descriptionKey: "proPlanDesc" },
        { icon: Star, labelKey: "enterprisePlan", badge: "€99.99", descriptionKey: "enterprisePlanDesc" },
      ],
    },
    {
      icon: Clock,
      labelKey: "activityHistory",
      subItems: [
        { icon: Activity, labelKey: "recentAnalyses", descriptionKey: "recentAnalysesDesc" },
        { icon: Download, labelKey: "downloads", descriptionKey: "downloadsDesc" },
        { icon: Eye, labelKey: "views", descriptionKey: "viewsDesc" },
      ],
    },
    {
      icon: LifeBuoy,
      labelKey: "support",
      subItems: [
        { icon: MessageCircle, labelKey: "liveChat", descriptionKey: "liveChatDesc" },
        { icon: BookOpen, labelKey: "knowledgeBase", descriptionKey: "knowledgeBaseDesc" },
        { icon: Mail, labelKey: "emailContact", descriptionKey: "emailContactDesc" },
      ],
    },
  ];

  const isActive = (id: string) => activeSection === id;

  const handleUserMenuToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsUserMenuOpen(!isUserMenuOpen);
    if (isUserMenuOpen) {
      setExpandedSubMenu(null);
    }
  };

  const handleSubMenuToggle = (label: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedSubMenu(expandedSubMenu === label ? null : label);
  };

  const handleSubItemClick = (itemLabel: string, subItemLabel: string) => {
    console.log(`Clicou em: ${itemLabel} -> ${subItemLabel}`);
    setExpandedSubMenu(null);
  };

  const handleMenuClick = (id: string) => {
    if (onNavigate) {
      onNavigate(id);
    }
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    setIsOpen(false);
    setExpandedSubMenu(null);
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
          {/* Logo - DESIGN MODERNO PADRONIZADO */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="relative group">
                {/* Glow effect animado */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-2xl blur-xl opacity-60 group-hover:opacity-90 transition-all duration-500 animate-pulse" />
                
                {/* Container do logo com gradiente */}
                <div className="relative p-3 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 rounded-2xl shadow-2xl transform group-hover:scale-105 transition-all duration-300">
                  {/* Ícones sobrepostos para efeito 3D */}
                  <div className="relative">
                    <TrendingUp className="w-7 h-7 text-white absolute top-0 left-0 opacity-30 transform -translate-x-0.5 -translate-y-0.5" />
                    <LineChart className="w-7 h-7 text-white relative z-10" />
                  </div>
                  
                  {/* Sparkle decorativo */}
                  <Sparkles className="w-3 h-3 text-yellow-300 absolute -top-1 -right-1 animate-pulse" />
                </div>
              </div>
              
              <div>
                <h1 className="text-xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                  {t.appName}
                </h1>
                <p className="text-xs font-semibold text-slate-400 tracking-wide">
                  {t.intelligentAnalysis}
                </p>
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
                <div className="absolute top-full left-4 right-4 mt-2 bg-slate-800/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden z-[100] animate-in fade-in slide-in-from-top-2 duration-200 max-h-[calc(100vh-200px)] overflow-y-auto">
                  <div className="p-2 space-y-1">
                    {userMenuItems.map((item) => {
                      const Icon = item.icon;
                      const hasSubItems = item.subItems && item.subItems.length > 0;
                      const isExpanded = expandedSubMenu === item.labelKey;

                      return (
                        <div key={item.labelKey}>
                          {/* Main Item */}
                          <button
                            type="button"
                            onClick={(e) => handleSubMenuToggle(item.labelKey, e)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group ${
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
                            <span className="text-sm font-medium flex-1 text-left">{t[item.labelKey as keyof typeof t]}</span>
                            {item.highlight && (
                              <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" />
                            )}
                            <ChevronRight
                              className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${
                                isExpanded ? "rotate-90" : ""
                              }`}
                            />
                          </button>

                          {/* Sub Items */}
                          {hasSubItems && isExpanded && (
                            <div className="ml-4 mt-1 space-y-1 animate-in slide-in-from-top-2 duration-200">
                              {item.subItems!.map((subItem) => {
                                const SubIcon = subItem.icon;
                                return (
                                  <button
                                    key={subItem.labelKey}
                                    type="button"
                                    onClick={() => handleSubItemClick(item.labelKey, subItem.labelKey)}
                                    className="w-full flex items-start gap-3 px-4 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-300 group"
                                  >
                                    <SubIcon className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 mt-0.5 flex-shrink-0" />
                                    <div className="flex-1 text-left">
                                      <div className="flex items-center gap-2">
                                        <span className="text-xs font-medium">{t[subItem.labelKey as keyof typeof t]}</span>
                                        {subItem.badge && (
                                          <span className="text-xs font-semibold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full">
                                            {subItem.badge}
                                          </span>
                                        )}
                                      </div>
                                      {subItem.descriptionKey && (
                                        <p className="text-xs text-slate-500 mt-0.5">{t[subItem.descriptionKey as keyof typeof t]}</p>
                                      )}
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                    
                    {/* Divider */}
                    <div className="h-px bg-white/10 my-2" />
                    
                    {/* Logout */}
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300 group"
                    >
                      <LogOut className="w-4 h-4 text-slate-400 group-hover:text-red-400" />
                      <span className="text-sm font-medium">{t.logout}</span>
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
              const active = isActive(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
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
                  <span className="font-medium">{t[item.labelKey as keyof typeof t]}</span>
                  {active && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
