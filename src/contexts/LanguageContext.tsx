"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "pt" | "br" | "es" | "fr" | "de" | "en";

type Translations = {
  [key in Language]: {
    // Header
    appName: string;
    appSubtitle: string;
    login: string;
    signup: string;

    // Hero Section
    heroTag: string;
    heroTitle1: string;
    heroTitle2: string;
    heroDescription: string;

    // Upload Area
    uploadTitle: string;
    uploadSubtitle: string;
    selectTimeframe: string;

    // Timeframes
    timeframe1m: string;
    timeframe5m: string;
    timeframe15m: string;
    timeframe30m: string;
    timeframe1h: string;
    timeframe4h: string;
    timeframe1d: string;
    timeframe1w: string;

    // Analysis
    analyzeButton: string;
    analyzing: string;
    recommendation: string;
    recommendationFor: string;
    confidenceLevel: string;

    // Recommendations
    buy: string;
    sell: string;
    hold: string;

    // Sidebar
    home: string;
    newAnalysis: string;
    history: string;
    portfolio: string;
    alerts: string;
    reports: string;
    help: string;
    settings: string;
    upgrade: string;
    activityHistory: string;
    support: string;
    logout: string;

    // Settings Submenu
    profile: string;
    profileDesc: string;
    security: string;
    securityDesc: string;
    appearance: string;
    appearanceDesc: string;
    apiKeys: string;
    apiKeysDesc: string;

    // Plans Submenu
    basicPlan: string;
    basicPlanDesc: string;
    proPlan: string;
    proPlanDesc: string;
    enterprisePlan: string;
    enterprisePlanDesc: string;

    // Activity Submenu
    recentAnalyses: string;
    recentAnalysesDesc: string;
    downloads: string;
    downloadsDesc: string;
    views: string;
    viewsDesc: string;

    // Support Submenu
    liveChat: string;
    liveChatDesc: string;
    knowledgeBase: string;
    knowledgeBaseDesc: string;
    emailContact: string;
    emailContactDesc: string;

    // Footer
    footerRights: string;
    footerDescription: string;

    // Language Selector
    selectLanguage: string;
    intelligentAnalysis: string;
  };
};

const translations: Translations = {
  pt: {
    appName: "Meu Gráfico AI",
    appSubtitle: "Análise inteligente de gráficos financeiros",
    login: "Entrar",
    signup: "Criar Conta",
    heroTag: "Análise de Gráficos com IA",
    heroTitle1: "Análise Inteligente de",
    heroTitle2: "Gráficos Financeiros",
    heroDescription: "Faça upload do seu gráfico e receba recomendações precisas de compra ou venda com inteligência artificial.",
    uploadTitle: "Clique para fazer upload do gráfico",
    uploadSubtitle: "PNG, JPG ou JPEG (máx. 10MB)",
    selectTimeframe: "Selecione o Timeframe",
    timeframe1m: "1 Minuto",
    timeframe5m: "5 Minutos",
    timeframe15m: "15 Minutos",
    timeframe30m: "30 Minutos",
    timeframe1h: "1 Hora",
    timeframe4h: "4 Horas",
    timeframe1d: "1 Dia",
    timeframe1w: "1 Semana",
    analyzeButton: "Analisar Gráfico",
    analyzing: "A analisar",
    recommendation: "Recomendação",
    recommendationFor: "Recomendação para",
    confidenceLevel: "Nível de Confiança",
    buy: "COMPRAR",
    sell: "VENDER",
    hold: "MANTER",
    home: "Início",
    newAnalysis: "Nova Análise",
    history: "Histórico",
    portfolio: "Portfólio",
    alerts: "Alertas",
    reports: "Relatórios",
    help: "Ajuda",
    settings: "Configurações",
    upgrade: "Fazer Upgrade",
    activityHistory: "Histórico de Atividades",
    support: "Suporte",
    logout: "Sair",
    profile: "Perfil",
    profileDesc: "Gerencie as suas informações pessoais",
    security: "Segurança",
    securityDesc: "Palavra-passe e autenticação",
    appearance: "Aparência",
    appearanceDesc: "Personalize o tema",
    apiKeys: "Chaves API",
    apiKeysDesc: "Chaves de integração",
    basicPlan: "Plano Básico",
    basicPlanDesc: "10 análises/mês",
    proPlan: "Plano Pro",
    proPlanDesc: "100 análises/mês",
    enterprisePlan: "Plano Enterprise",
    enterprisePlanDesc: "Ilimitado",
    recentAnalyses: "Análises Recentes",
    recentAnalysesDesc: "Últimas 30 análises",
    downloads: "Downloads",
    downloadsDesc: "Relatórios descarregados",
    views: "Visualizações",
    viewsDesc: "Gráficos visualizados",
    liveChat: "Chat ao Vivo",
    liveChatDesc: "Suporte em tempo real",
    knowledgeBase: "Base de Conhecimento",
    knowledgeBaseDesc: "Tutoriais e guias",
    emailContact: "Contacto por Email",
    emailContactDesc: "suporte@meugraficai.com",
    footerRights: "© 2024 Meu Gráfico AI. Todos os direitos reservados.",
    footerDescription: "Análise de mercado financeiro com inteligência artificial.",
    selectLanguage: "Selecionar Idioma",
    intelligentAnalysis: "Análise Inteligente",
  },
  br: {
    appName: "Meu Gráfico AI",
    appSubtitle: "Análise inteligente de gráficos financeiros",
    login: "Entrar",
    signup: "Criar Conta",
    heroTag: "Análise de Gráficos com IA",
    heroTitle1: "Análise Inteligente de",
    heroTitle2: "Gráficos Financeiros",
    heroDescription: "Faça upload do seu gráfico e receba recomendações precisas de compra ou venda com inteligência artificial.",
    uploadTitle: "Clique para fazer upload do gráfico",
    uploadSubtitle: "PNG, JPG ou JPEG (máx. 10MB)",
    selectTimeframe: "Selecione o Timeframe",
    timeframe1m: "1 Minuto",
    timeframe5m: "5 Minutos",
    timeframe15m: "15 Minutos",
    timeframe30m: "30 Minutos",
    timeframe1h: "1 Hora",
    timeframe4h: "4 Horas",
    timeframe1d: "1 Dia",
    timeframe1w: "1 Semana",
    analyzeButton: "Analisar Gráfico",
    analyzing: "Analisando",
    recommendation: "Recomendação",
    recommendationFor: "Recomendação para",
    confidenceLevel: "Nível de Confiança",
    buy: "COMPRAR",
    sell: "VENDER",
    hold: "MANTER",
    home: "Início",
    newAnalysis: "Nova Análise",
    history: "Histórico",
    portfolio: "Portfólio",
    alerts: "Alertas",
    reports: "Relatórios",
    help: "Ajuda",
    settings: "Configurações",
    upgrade: "Fazer Upgrade",
    activityHistory: "Histórico de Atividades",
    support: "Suporte",
    logout: "Sair",
    profile: "Perfil",
    profileDesc: "Gerencie suas informações pessoais",
    security: "Segurança",
    securityDesc: "Senha e autenticação",
    appearance: "Aparência",
    appearanceDesc: "Personalize o tema",
    apiKeys: "Chaves API",
    apiKeysDesc: "Chaves de integração",
    basicPlan: "Plano Básico",
    basicPlanDesc: "10 análises/mês",
    proPlan: "Plano Pro",
    proPlanDesc: "100 análises/mês",
    enterprisePlan: "Plano Enterprise",
    enterprisePlanDesc: "Ilimitado",
    recentAnalyses: "Análises Recentes",
    recentAnalysesDesc: "Últimas 30 análises",
    downloads: "Downloads",
    downloadsDesc: "Relatórios baixados",
    views: "Visualizações",
    viewsDesc: "Gráficos visualizados",
    liveChat: "Chat ao Vivo",
    liveChatDesc: "Suporte em tempo real",
    knowledgeBase: "Base de Conhecimento",
    knowledgeBaseDesc: "Tutoriais e guias",
    emailContact: "Contato por Email",
    emailContactDesc: "suporte@meugraficai.com",
    footerRights: "© 2024 Meu Gráfico AI. Todos os direitos reservados.",
    footerDescription: "Análise de mercado financeiro com inteligência artificial.",
    selectLanguage: "Selecionar Idioma",
    intelligentAnalysis: "Análise Inteligente",
  },
  es: {
    appName: "Mi Gráfico AI",
    appSubtitle: "Análisis inteligente de gráficos financieros",
    login: "Iniciar Sesión",
    signup: "Crear Cuenta",
    heroTag: "Análisis de Gráficos con IA",
    heroTitle1: "Análisis Inteligente de",
    heroTitle2: "Gráficos Financieros",
    heroDescription: "Sube tu gráfico y recibe recomendaciones precisas de compra o venta con inteligencia artificial.",
    uploadTitle: "Haz clic para subir el gráfico",
    uploadSubtitle: "PNG, JPG o JPEG (máx. 10MB)",
    selectTimeframe: "Selecciona el Timeframe",
    timeframe1m: "1 Minuto",
    timeframe5m: "5 Minutos",
    timeframe15m: "15 Minutos",
    timeframe30m: "30 Minutos",
    timeframe1h: "1 Hora",
    timeframe4h: "4 Horas",
    timeframe1d: "1 Día",
    timeframe1w: "1 Semana",
    analyzeButton: "Analizar Gráfico",
    analyzing: "Analizando",
    recommendation: "Recomendación",
    recommendationFor: "Recomendación para",
    confidenceLevel: "Nivel de Confianza",
    buy: "COMPRAR",
    sell: "VENDER",
    hold: "MANTENER",
    home: "Inicio",
    newAnalysis: "Nuevo Análisis",
    history: "Historial",
    portfolio: "Cartera",
    alerts: "Alertas",
    reports: "Informes",
    help: "Ayuda",
    settings: "Configuración",
    upgrade: "Mejorar Plan",
    activityHistory: "Historial de Actividades",
    support: "Soporte",
    logout: "Salir",
    profile: "Perfil",
    profileDesc: "Gestiona tu información personal",
    security: "Seguridad",
    securityDesc: "Contraseña y autenticación",
    appearance: "Apariencia",
    appearanceDesc: "Personaliza el tema",
    apiKeys: "Claves API",
    apiKeysDesc: "Claves de integración",
    basicPlan: "Plan Básico",
    basicPlanDesc: "10 análisis/mes",
    proPlan: "Plan Pro",
    proPlanDesc: "100 análisis/mes",
    enterprisePlan: "Plan Enterprise",
    enterprisePlanDesc: "Ilimitado",
    recentAnalyses: "Análisis Recientes",
    recentAnalysesDesc: "Últimos 30 análisis",
    downloads: "Descargas",
    downloadsDesc: "Informes descargados",
    views: "Visualizaciones",
    viewsDesc: "Gráficos visualizados",
    liveChat: "Chat en Vivo",
    liveChatDesc: "Soporte en tiempo real",
    knowledgeBase: "Base de Conocimiento",
    knowledgeBaseDesc: "Tutoriales y guías",
    emailContact: "Contacto por Email",
    emailContactDesc: "soporte@migraficai.com",
    footerRights: "© 2024 Mi Gráfico AI. Todos los derechos reservados.",
    footerDescription: "Análisis de mercado financiero con inteligencia artificial.",
    selectLanguage: "Seleccionar Idioma",
    intelligentAnalysis: "Análisis Inteligente",
  },
  fr: {
    appName: "Mon Graphique AI",
    appSubtitle: "Analyse intelligente de graphiques financiers",
    login: "Se Connecter",
    signup: "Créer un Compte",
    heroTag: "Analyse de Graphiques avec IA",
    heroTitle1: "Analyse Intelligente de",
    heroTitle2: "Graphiques Financiers",
    heroDescription: "Téléchargez votre graphique et recevez des recommandations précises d'achat ou de vente avec l'intelligence artificielle.",
    uploadTitle: "Cliquez pour télécharger le graphique",
    uploadSubtitle: "PNG, JPG ou JPEG (max. 10MB)",
    selectTimeframe: "Sélectionnez le Timeframe",
    timeframe1m: "1 Minute",
    timeframe5m: "5 Minutes",
    timeframe15m: "15 Minutes",
    timeframe30m: "30 Minutes",
    timeframe1h: "1 Heure",
    timeframe4h: "4 Heures",
    timeframe1d: "1 Jour",
    timeframe1w: "1 Semaine",
    analyzeButton: "Analyser le Graphique",
    analyzing: "Analyse en cours",
    recommendation: "Recommandation",
    recommendationFor: "Recommandation pour",
    confidenceLevel: "Niveau de Confiance",
    buy: "ACHETER",
    sell: "VENDRE",
    hold: "CONSERVER",
    home: "Accueil",
    newAnalysis: "Nouvelle Analyse",
    history: "Historique",
    portfolio: "Portefeuille",
    alerts: "Alertes",
    reports: "Rapports",
    help: "Aide",
    settings: "Paramètres",
    upgrade: "Améliorer le Plan",
    activityHistory: "Historique des Activités",
    support: "Support",
    logout: "Déconnexion",
    profile: "Profil",
    profileDesc: "Gérez vos informations personnelles",
    security: "Sécurité",
    securityDesc: "Mot de passe et authentification",
    appearance: "Apparence",
    appearanceDesc: "Personnalisez le thème",
    apiKeys: "Clés API",
    apiKeysDesc: "Clés d'intégration",
    basicPlan: "Plan Basique",
    basicPlanDesc: "10 analyses/mois",
    proPlan: "Plan Pro",
    proPlanDesc: "100 analyses/mois",
    enterprisePlan: "Plan Enterprise",
    enterprisePlanDesc: "Illimité",
    recentAnalyses: "Analyses Récentes",
    recentAnalysesDesc: "30 dernières analyses",
    downloads: "Téléchargements",
    downloadsDesc: "Rapports téléchargés",
    views: "Visualisations",
    viewsDesc: "Graphiques visualisés",
    liveChat: "Chat en Direct",
    liveChatDesc: "Support en temps réel",
    knowledgeBase: "Base de Connaissances",
    knowledgeBaseDesc: "Tutoriels et guides",
    emailContact: "Contact par Email",
    emailContactDesc: "support@mongraphiqueai.com",
    footerRights: "© 2024 Mon Graphique AI. Tous droits réservés.",
    footerDescription: "Analyse de marché financier avec intelligence artificielle.",
    selectLanguage: "Sélectionner la Langue",
    intelligentAnalysis: "Analyse Intelligente",
  },
  de: {
    appName: "Mein Diagramm AI",
    appSubtitle: "Intelligente Analyse von Finanzdiagrammen",
    login: "Anmelden",
    signup: "Konto Erstellen",
    heroTag: "Diagrammanalyse mit KI",
    heroTitle1: "Intelligente Analyse von",
    heroTitle2: "Finanzdiagrammen",
    heroDescription: "Laden Sie Ihr Diagramm hoch und erhalten Sie präzise Kauf- oder Verkaufsempfehlungen mit künstlicher Intelligenz.",
    uploadTitle: "Klicken Sie, um das Diagramm hochzuladen",
    uploadSubtitle: "PNG, JPG oder JPEG (max. 10MB)",
    selectTimeframe: "Timeframe Auswählen",
    timeframe1m: "1 Minute",
    timeframe5m: "5 Minuten",
    timeframe15m: "15 Minuten",
    timeframe30m: "30 Minuten",
    timeframe1h: "1 Stunde",
    timeframe4h: "4 Stunden",
    timeframe1d: "1 Tag",
    timeframe1w: "1 Woche",
    analyzeButton: "Diagramm Analysieren",
    analyzing: "Analysiere",
    recommendation: "Empfehlung",
    recommendationFor: "Empfehlung für",
    confidenceLevel: "Vertrauensniveau",
    buy: "KAUFEN",
    sell: "VERKAUFEN",
    hold: "HALTEN",
    home: "Startseite",
    newAnalysis: "Neue Analyse",
    history: "Verlauf",
    portfolio: "Portfolio",
    alerts: "Warnungen",
    reports: "Berichte",
    help: "Hilfe",
    settings: "Einstellungen",
    upgrade: "Plan Upgraden",
    activityHistory: "Aktivitätsverlauf",
    support: "Support",
    logout: "Abmelden",
    profile: "Profil",
    profileDesc: "Verwalten Sie Ihre persönlichen Informationen",
    security: "Sicherheit",
    securityDesc: "Passwort und Authentifizierung",
    appearance: "Erscheinungsbild",
    appearanceDesc: "Thema anpassen",
    apiKeys: "API-Schlüssel",
    apiKeysDesc: "Integrationsschlüssel",
    basicPlan: "Basis-Plan",
    basicPlanDesc: "10 Analysen/Monat",
    proPlan: "Pro-Plan",
    proPlanDesc: "100 Analysen/Monat",
    enterprisePlan: "Enterprise-Plan",
    enterprisePlanDesc: "Unbegrenzt",
    recentAnalyses: "Letzte Analysen",
    recentAnalysesDesc: "Letzte 30 Analysen",
    downloads: "Downloads",
    downloadsDesc: "Heruntergeladene Berichte",
    views: "Ansichten",
    viewsDesc: "Angesehene Diagramme",
    liveChat: "Live-Chat",
    liveChatDesc: "Echtzeit-Support",
    knowledgeBase: "Wissensdatenbank",
    knowledgeBaseDesc: "Tutorials und Anleitungen",
    emailContact: "E-Mail-Kontakt",
    emailContactDesc: "support@meindiagrammai.com",
    footerRights: "© 2024 Mein Diagramm AI. Alle Rechte vorbehalten.",
    footerDescription: "Finanzmarktanalyse mit künstlicher Intelligenz.",
    selectLanguage: "Sprache Auswählen",
    intelligentAnalysis: "Intelligente Analyse",
  },
  en: {
    appName: "My Chart AI",
    appSubtitle: "Intelligent financial chart analysis",
    login: "Login",
    signup: "Sign Up",
    heroTag: "Chart Analysis with AI",
    heroTitle1: "Intelligent Analysis of",
    heroTitle2: "Financial Charts",
    heroDescription: "Upload your chart and receive precise buy or sell recommendations with artificial intelligence.",
    uploadTitle: "Click to upload the chart",
    uploadSubtitle: "PNG, JPG or JPEG (max. 10MB)",
    selectTimeframe: "Select Timeframe",
    timeframe1m: "1 Minute",
    timeframe5m: "5 Minutes",
    timeframe15m: "15 Minutes",
    timeframe30m: "30 Minutes",
    timeframe1h: "1 Hour",
    timeframe4h: "4 Hours",
    timeframe1d: "1 Day",
    timeframe1w: "1 Week",
    analyzeButton: "Analyze Chart",
    analyzing: "Analyzing",
    recommendation: "Recommendation",
    recommendationFor: "Recommendation for",
    confidenceLevel: "Confidence Level",
    buy: "BUY",
    sell: "SELL",
    hold: "HOLD",
    home: "Home",
    newAnalysis: "New Analysis",
    history: "History",
    portfolio: "Portfolio",
    alerts: "Alerts",
    reports: "Reports",
    help: "Help",
    settings: "Settings",
    upgrade: "Upgrade Plan",
    activityHistory: "Activity History",
    support: "Support",
    logout: "Logout",
    profile: "Profile",
    profileDesc: "Manage your personal information",
    security: "Security",
    securityDesc: "Password and authentication",
    appearance: "Appearance",
    appearanceDesc: "Customize theme",
    apiKeys: "API Keys",
    apiKeysDesc: "Integration keys",
    basicPlan: "Basic Plan",
    basicPlanDesc: "10 analyses/month",
    proPlan: "Pro Plan",
    proPlanDesc: "100 analyses/month",
    enterprisePlan: "Enterprise Plan",
    enterprisePlanDesc: "Unlimited",
    recentAnalyses: "Recent Analyses",
    recentAnalysesDesc: "Last 30 analyses",
    downloads: "Downloads",
    downloadsDesc: "Downloaded reports",
    views: "Views",
    viewsDesc: "Viewed charts",
    liveChat: "Live Chat",
    liveChatDesc: "Real-time support",
    knowledgeBase: "Knowledge Base",
    knowledgeBaseDesc: "Tutorials and guides",
    emailContact: "Email Contact",
    emailContactDesc: "support@mychartai.com",
    footerRights: "© 2024 My Chart AI. All rights reserved.",
    footerDescription: "Financial market analysis with artificial intelligence.",
    selectLanguage: "Select Language",
    intelligentAnalysis: "Intelligent Analysis",
  },
};

// Função para detectar o idioma do navegador
function detectBrowserLanguage(): Language {
  if (typeof window === "undefined") return "en";
  
  const browserLang = navigator.language || (navigator as any).userLanguage;
  const langCode = browserLang.toLowerCase().split("-")[0];
  
  // Mapeamento de códigos de idioma para os idiomas suportados
  const languageMap: { [key: string]: Language } = {
    pt: "pt",
    br: "br",
    es: "es",
    fr: "fr",
    de: "de",
    en: "en",
  };
  
  // Se o idioma do navegador for português, verifica se é do Brasil
  if (langCode === "pt") {
    if (browserLang.toLowerCase().includes("br")) {
      return "br";
    }
    return "pt";
  }
  
  return languageMap[langCode] || "en";
}

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations[Language];
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    // Detecta o idioma do navegador ao carregar
    const detectedLanguage = detectBrowserLanguage();
    setLanguage(detectedLanguage);
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
