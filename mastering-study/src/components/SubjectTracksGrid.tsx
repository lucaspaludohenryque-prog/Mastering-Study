"use client";

import React from "react";
import Link from "next/link";
import {
  Calculator,
  Atom,
  FlaskConical,
  Dna,
  Landmark,
  PenTool,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import type { SubjectTrack } from "@/types";

interface SubjectTracksGridProps {
  filterTerm?: string;
  onSelectTrack?: (trackName: string) => void;
}

export const subjectTracks: SubjectTrack[] = [
  {
    id: "matematica",
    name: "Matemática",
    description: "Álgebra, geometria plana e espacial, funções, trigonometria e combinatória.",
    modulesCount: 32,
    icon: Calculator,
    iconBgColor: "bg-indigo-50",
    iconColor: "text-indigo-600",
    cardBorderHover: "hover:border-indigo-300",
  },
  {
    id: "fisica",
    name: "Física",
    description: "Mecânica clássica, óptica, termodinâmica, ondas e eletromagnetismo.",
    modulesCount: 26,
    icon: Atom,
    iconBgColor: "bg-sky-50",
    iconColor: "text-sky-600",
    cardBorderHover: "hover:border-sky-300",
  },
  {
    id: "quimica",
    name: "Química",
    description: "Estrutura atômica, estequiometria, equilíbrio químico e funções orgânicas.",
    modulesCount: 24,
    icon: FlaskConical,
    iconBgColor: "bg-emerald-50",
    iconColor: "text-emerald-600",
    cardBorderHover: "hover:border-emerald-300",
  },
  {
    id: "biologia",
    name: "Biologia",
    description: "Citologia, genética mendeliana e molecular, fisiologia e ecologia aplicada.",
    modulesCount: 28,
    icon: Dna,
    iconBgColor: "bg-teal-50",
    iconColor: "text-teal-600",
    cardBorderHover: "hover:border-teal-300",
  },
  {
    id: "historia",
    name: "História",
    description: "História do Brasil colonial e republicano, História Geral e geopolítica contemporânea.",
    modulesCount: 22,
    icon: Landmark,
    iconBgColor: "bg-amber-50",
    iconColor: "text-amber-600",
    cardBorderHover: "hover:border-amber-300",
  },
  {
    id: "redacao",
    name: "Redação",
    description: "Estrutura dissertativa-argumentativa, repertório sociocultural e propostas de intervenção.",
    modulesCount: 18,
    icon: PenTool,
    iconBgColor: "bg-rose-50",
    iconColor: "text-rose-600",
    cardBorderHover: "hover:border-rose-300",
  },
];

export function SubjectTracksGrid({
  filterTerm = "",
  onSelectTrack,
}: SubjectTracksGridProps) {
  const normalizedFilter = filterTerm.toLowerCase().trim();

  const filteredTracks = subjectTracks.filter((track) => {
    if (!normalizedFilter) return true;
    return (
      track.name.toLowerCase().includes(normalizedFilter) ||
      track.description.toLowerCase().includes(normalizedFilter)
    );
  });

  return (
    <section aria-labelledby="tracks-heading" className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 id="tracks-heading" className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            Trilhas de Estudo
          </h2>
          <p className="text-xs text-slate-500">
            Aulas modulares geradas por IA com resolução de exercícios passo a passo.
          </p>
        </div>
        <span className="text-xs font-semibold text-slate-400">
          {filteredTracks.length} disciplinas disponíveis
        </span>
      </div>

      {filteredTracks.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 p-8 text-center bg-white/50">
          <BookOpen className="h-10 w-10 text-slate-300 mb-2" />
          <p className="text-sm font-semibold text-slate-600">Nenhuma matéria encontrada</p>
          <p className="text-xs text-slate-400">Tente buscar por outro termo ou limpe a pesquisa.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTracks.map((track) => {
            const Icon = track.icon;

            return (
              <div
                key={track.id}
                className="group rounded-3xl bg-slate-200/40 p-1.5 ring-1 ring-slate-900/5 transition-all hover:ring-slate-900/10 hover:shadow-md"
              >
                <div
                  className={`flex h-full flex-col justify-between rounded-[calc(1.5rem-0.375rem)] bg-white p-6 transition-colors border border-transparent ${track.cardBorderHover}`}
                >
                  <div className="space-y-4">
                    {/* Topo do Card com Ícone Grande e Contador */}
                    <div className="flex items-center justify-between">
                      <div
                        className={`flex h-14 w-14 items-center justify-center rounded-2xl ${track.iconBgColor} ${track.iconColor} group-hover:scale-105 transition-transform duration-200 shadow-xs`}
                      >
                        <Icon className="h-7 w-7" />
                      </div>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold text-slate-500">
                        {track.modulesCount} Módulos
                      </span>
                    </div>

                    {/* Título e Descrição */}
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                        {track.name}
                      </h3>
                      <p className="mt-1.5 text-xs text-slate-600 leading-relaxed line-clamp-2">
                        {track.description}
                      </p>
                    </div>
                  </div>

                  {/* Rodapé com Link "Acessar Trilha" */}
                  <div className="pt-5 mt-5 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => onSelectTrack?.(track.name)}
                      className="group/link inline-flex w-full items-center justify-between text-xs font-bold text-sky-600 hover:text-sky-700 transition-colors cursor-pointer"
                    >
                      <span>Acessar Trilha</span>
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-50 text-sky-600 group-hover/link:bg-sky-600 group-hover/link:text-white group-hover/link:translate-x-1 transition-all">
                        <ArrowRight className="h-3.5 w-3.5" />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
