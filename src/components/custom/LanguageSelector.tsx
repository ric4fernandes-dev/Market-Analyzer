"use client";

import { Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const languages = [
  { code: "pt" as const, label: "Português (PT)", flag: "🇵🇹" },
  { code: "br" as const, label: "Português (BR)", flag: "🇧🇷" },
  { code: "es" as const, label: "Español", flag: "🇪🇸" },
  { code: "fr" as const, label: "Français", flag: "🇫🇷" },
  { code: "de" as const, label: "Deutsch", flag: "🇩🇪" },
  { code: "en" as const, label: "English", flag: "🇬🇧" },
];

export function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage();

  const currentLanguage = languages.find((lang) => lang.code === language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="text-purple-200 hover:text-white hover:bg-purple-500/20 transition-all duration-300 gap-2"
        >
          <Globe className="w-4 h-4" />
          <span className="hidden sm:inline">{currentLanguage?.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-56 bg-slate-900/95 border-purple-500/20 backdrop-blur-xl"
      >
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`cursor-pointer transition-all duration-300 ${
              language === lang.code
                ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white"
                : "text-purple-300 hover:text-white hover:bg-purple-500/10"
            }`}
          >
            <span className="mr-3 text-lg">{lang.flag}</span>
            <span className="font-medium">{lang.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
