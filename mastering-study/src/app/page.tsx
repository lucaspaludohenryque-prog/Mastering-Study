"use client";

import React, { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { ApiKeyAlertBanner } from "@/components/ApiKeyAlertBanner";
import { ResumeLessonCard } from "@/components/ResumeLessonCard";
import { SubjectTracksGrid } from "@/components/SubjectTracksGrid";
import { ApiKeyModal } from "@/components/ApiKeyModal";
import type { ByokConfig } from "@/types";

const STORAGE_KEY = "mastering_study_byok_config";

export default function DashboardPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [byokConfig, setByokConfig] = useState<ByokConfig>({
    provider: "gemini",
    apiKey: "",
    isConnected: false,
  });

  // Carrega configuração persistida do LocalStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as ByokConfig;
        if (parsed.apiKey) {
          setByokConfig({
            ...parsed,
            isConnected: true,
          });
        }
      }
    } catch (err) {
      console.error("Falha ao recuperar dados do LocalStorage:", err);
    }
  }, []);

  // Salva no LocalStorage
  const handleSaveConfig = (newConfig: ByokConfig) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfig));
      setByokConfig(newConfig);
    } catch (err) {
      console.error("Falha ao salvar configuração:", err);
    }
  };

  const getProviderDisplayName = (providerId: string) => {
    const map: Record<string, string> = {
      gemini: "Google Gemini",
      openai: "OpenAI",
      anthropic: "Anthropic Claude",
      deepseek: "DeepSeek",
      openrouter: "OpenRouter",
    };
    return map[providerId] || providerId;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Menu Lateral Fixo */}
      <Sidebar
        currentPath="/"
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenAiSettings={() => setIsModalOpen(true)}
      />

      {/* Conteúdo Principal com compensação da Sidebar no Desktop */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        {/* Cabeçalho Superior */}
        <Header
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        {/* Área Principal (Main Content) */}
        <main className="flex-1 px-4 sm:px-8 py-6 sm:py-8 space-y-8 max-w-7xl w-full mx-auto">
          {/* Banner de Alerta (API Key BYOK) */}
          <ApiKeyAlertBanner
            isConnected={byokConfig.isConnected}
            providerName={getProviderDisplayName(byokConfig.provider)}
            onConfigureClick={() => setIsModalOpen(true)}
          />

          {/* Card: Continuar de onde parou */}
          <ResumeLessonCard
            onStartLesson={() => {
              if (!byokConfig.isConnected) {
                setIsModalOpen(true);
              }
            }}
          />

          {/* Grid de Matérias (Trilhas) */}
          <SubjectTracksGrid
            filterTerm={searchTerm}
            onSelectTrack={(trackName) => {
              if (!byokConfig.isConnected) {
                setIsModalOpen(true);
              }
            }}
          />
        </main>
      </div>

      {/* Modal BYOK para Gerenciamento de Chaves */}
      <ApiKeyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSaveConfig={handleSaveConfig}
        currentConfig={byokConfig}
      />
    </div>
  );
}
