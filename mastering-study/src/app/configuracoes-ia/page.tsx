"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { ApiKeyForm } from "@/components/ai-settings/ApiKeyForm";
import { SecurityPrivacyCard } from "@/components/ai-settings/SecurityPrivacyCard";
import { GeminiTutorial } from "@/components/ai-settings/GeminiTutorial";
import { ChevronRight, Sparkles } from "lucide-react";

export default function AiSettingsPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Menu Lateral Fixo */}
      <Sidebar
        currentPath="/configuracoes-ia"
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
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
        <main className="flex-1 px-4 sm:px-8 py-6 sm:py-8 space-y-8 max-w-5xl w-full mx-auto">
          {/* Breadcrumb de Navegação */}
          <nav aria-label="Navegação estrutural" className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <Link href="/" className="hover:text-slate-600 transition-colors">
              Painel
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-sky-600">Configurações de IA</span>
          </nav>

          {/* Cabeçalho da Página */}
          <div className="space-y-2 pb-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 border border-sky-200/80 px-3 py-1 text-xs font-bold text-sky-700">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Bring Your Own Key (BYOK)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              Configurações de Inteligência Artificial
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
              A plataforma Mastering Study utiliza a chave de API do próprio aluno para gerar aulas interativas em formato de texto, resoluções comentadas e planos de estudo dinâmicos de alta qualidade.
            </p>
          </div>

          {/* 1. Formulário Seguro da Chave de API */}
          <ApiKeyForm />

          {/* 2. Aviso de Privacidade e Segurança */}
          <SecurityPrivacyCard />

          {/* 3. Tutorial Didático: Como gerar minha chave gratuita? */}
          <GeminiTutorial />
        </main>
      </div>
    </div>
  );
}
