"use client";

import React from "react";
import Link from "next/link";
import {
  Brain,
  LayoutDashboard,
  Compass,
  Library,
  FileCheck2,
  Sparkles,
  X,
  ChevronRight,
} from "lucide-react";
import type { NavItem } from "@/types";

interface SidebarProps {
  currentPath?: string;
  isOpen?: boolean;
  onClose?: () => void;
  onOpenAiSettings?: () => void;
}

const navItems: NavItem[] = [
  {
    id: "painel",
    title: "Painel",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    id: "trilhas",
    title: "Minhas Trilhas",
    href: "#minhas-trilhas",
    icon: Compass,
  },
  {
    id: "materias",
    title: "Matérias",
    href: "#materias",
    icon: Library,
  },
  {
    id: "questoes",
    title: "Banco de Questões",
    href: "#banco-questoes",
    icon: FileCheck2,
  },
  {
    id: "config-ia",
    title: "Configurações de IA",
    href: "#configuracoes-ia",
    icon: Sparkles,
    badge: "BYOK",
    isAiAction: true,
  },
];

export function Sidebar({
  currentPath = "/",
  isOpen = false,
  onClose,
  onOpenAiSettings,
}: SidebarProps) {
  return (
    <>
      {/* Backdrop para telas pequenas */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200/80 bg-white transition-transform duration-300 ease-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Menu Principal"
      >
        {/* Cabeçalho do Menu com Logo */}
        <div className="flex h-18 items-center justify-between px-6 border-b border-slate-100">
          <Link
            href="/"
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-lg p-1"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-sky-600 to-sky-500 text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform duration-200">
              <Brain className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-slate-900">
                Mastering <span className="text-sky-600 font-extrabold">Study</span>
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400">
                Plataforma IA
              </span>
            </div>
          </Link>

          {/* Botão fechar apenas no mobile */}
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="lg:hidden p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Fechar menu"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Links de Navegação */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1.5">
          <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Navegação Principal
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.href === currentPath && !item.isAiAction;

            const handleClick = (e: React.MouseEvent) => {
              if (item.isAiAction && onOpenAiSettings) {
                e.preventDefault();
                onOpenAiSettings();
                if (onClose) onClose();
              }
            };

            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={handleClick}
                className={`group flex items-center justify-between rounded-xl px-3.5 py-3 text-sm font-semibold transition-all duration-150 ${
                  isActive
                    ? "bg-sky-50 text-sky-700 shadow-xs border-l-4 border-sky-600 rounded-l-none pl-2.5"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`h-5 w-5 transition-colors ${
                      isActive
                        ? "text-sky-600"
                        : "text-slate-400 group-hover:text-slate-600"
                    }`}
                  />
                  <span>{item.title}</span>
                </div>

                {item.badge ? (
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800">
                    {item.badge}
                  </span>
                ) : (
                  <ChevronRight
                    className={`h-4 w-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-slate-400 ${
                      isActive ? "opacity-100 translate-x-0 text-sky-600" : ""
                    }`}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Rodapé da Sidebar - Identificação rápida */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-white border border-slate-200/60 shadow-xs">
            <div className="relative h-9 w-9 shrink-0 rounded-full bg-slate-200 overflow-hidden ring-2 ring-slate-100">
              {/* Avatar placeholder simples conforme solicitado */}
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-tr from-sky-600 to-indigo-600 text-white text-xs font-bold">
                LP
              </div>
              <span
                className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white"
                title="Online"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="truncate text-xs font-semibold text-slate-800">
                Lucas Paludo
              </span>
              <span className="truncate text-[11px] text-slate-400 font-medium">
                Modo Estudante • Nível 4
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
