"use client";

import React, { useState } from "react";
import { Play, Clock, Sparkles } from "lucide-react";
import type { CurrentLesson } from "@/types";

interface ResumeLessonCardProps {
  lesson?: CurrentLesson;
  onStartLesson?: () => void;
}

const defaultLesson: CurrentLesson = {
  discipline: "Matemática",
  title: "Logaritmos e Propriedades Operatórias",
  description: "Módulo 04: Aplicação de logaritmos na resolução de equações exponenciais e funções aplicadas.",
  progressPercent: 60,
  estimatedRemainingTime: "12 min restantes",
  moduleInfo: "Aula 3 de 5",
};

export function ResumeLessonCard({
  lesson = defaultLesson,
  onStartLesson,
}: ResumeLessonCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleResume = () => {
    setIsLoading(true);
    if (onStartLesson) {
      onStartLesson();
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 1200);
  };

  return (
    <section aria-labelledby="resume-heading" className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 id="resume-heading" className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
          Continuar de onde parou
        </h2>
        <span className="text-xs font-semibold text-slate-400">
          Último acesso recente
        </span>
      </div>

      {/* Double-Bezel Hardware Wrapper */}
      <div className="rounded-3xl bg-slate-200/50 p-1.5 ring-1 ring-slate-900/5 transition-all hover:ring-slate-900/10">
        <article className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 rounded-[calc(1.5rem-0.375rem)] bg-white p-5 sm:p-7 shadow-xs">
          {/* Informações da Aula */}
          <div className="flex-1 space-y-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-700 tracking-wide uppercase">
                {lesson.discipline}
              </span>
              <span className="text-xs font-medium text-slate-400">•</span>
              <span className="text-xs font-medium text-slate-500">{lesson.moduleInfo}</span>
              <span className="text-xs font-medium text-slate-400">•</span>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500">
                <Clock className="h-3.5 w-3.5 text-slate-400" />
                {lesson.estimatedRemainingTime}
              </span>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                {lesson.title}
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
                {lesson.description}
              </p>
            </div>

            {/* Barra de Progresso Fictícia */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-500">Progresso da aula interativa</span>
                <span className="text-sky-600">{lesson.progressPercent}% concluído</span>
              </div>
              <div
                className="h-2 w-full max-w-md overflow-hidden rounded-full bg-slate-100"
                role="progressbar"
                aria-valuenow={lesson.progressPercent}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Progresso da aula atual"
              >
                <div
                  className="h-full rounded-full bg-gradient-to-r from-sky-600 to-sky-400 transition-all duration-700 ease-out"
                  style={{ width: `${lesson.progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Botão Retomar Aula (Button-in-Button Pattern) */}
          <div className="shrink-0 pt-2 lg:pt-0">
            <button
              type="button"
              onClick={handleResume}
              disabled={isLoading}
              className="group inline-flex w-full lg:w-auto items-center justify-between gap-4 rounded-full bg-sky-600 pl-6 pr-2 py-2 text-sm font-bold text-white shadow-md shadow-sky-600/20 hover:bg-sky-700 active:scale-98 transition-all disabled:opacity-75 cursor-pointer"
            >
              <span>{isLoading ? "Abrindo Aula..." : "Retomar Aula"}</span>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 group-hover:bg-white/30 group-hover:translate-x-0.5 transition-all">
                {isLoading ? (
                  <Sparkles className="h-5 w-5 animate-spin" />
                ) : (
                  <Play className="h-5 w-5 fill-current" />
                )}
              </div>
            </button>
          </div>
        </article>
      </div>
    </section>
  );
}
