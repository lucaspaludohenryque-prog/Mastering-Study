"use client";

import React from "react";
import { Search, Bell, Menu, User } from "lucide-react";

interface HeaderProps {
  onOpenMobileMenu?: () => void;
  searchTerm?: string;
  onSearchChange?: (val: string) => void;
}

export function Header({
  onOpenMobileMenu,
  searchTerm = "",
  onSearchChange,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-18 w-full items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 sm:px-8 backdrop-blur-md">
      {/* Lado Esquerdo: Botão Mobile + Saudação */}
      <div className="flex items-center gap-3 sm:gap-6">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 lg:hidden transition-colors"
          aria-label="Abrir menu de navegação"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex flex-col">
          <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900">
            Olá, Estudante!
          </h1>
          <p className="hidden text-xs text-slate-500 sm:block">
            Continue seus estudos de alta performance orientados por IA.
          </p>
        </div>
      </div>

      {/* Lado Direito: Barra de Pesquisa + Notificações + Avatar */}
      <div className="flex items-center gap-3 sm:gap-5">
        {/* Barra de Pesquisa Estilizada */}
        <div className="relative w-44 sm:w-72 md:w-80">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder="Buscar matérias ou aulas..."
            className="h-10 w-full rounded-full border border-slate-200/80 bg-slate-50/80 pl-9 pr-12 text-xs sm:text-sm text-slate-800 placeholder-slate-400 transition-all focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-3 focus:ring-sky-500/15"
            aria-label="Buscar matérias ou aulas"
          />
          <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 sm:inline-block">
            Ctrl K
          </kbd>
        </div>

        {/* Notificações */}
        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/80 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          aria-label="Notificações da plataforma"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-sky-500 ring-2 ring-white" />
        </button>

        {/* Avatar de Perfil (Placeholder Simples) */}
        <div className="flex items-center gap-2 pl-1 sm:pl-2">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 border border-slate-200/80 text-slate-600 hover:border-slate-300 transition-colors cursor-pointer overflow-hidden">
            <User className="h-5 w-5 text-slate-500" />
          </div>
        </div>
      </div>
    </header>
  );
}
