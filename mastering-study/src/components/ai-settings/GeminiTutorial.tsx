"use client";

import React, { useState } from "react";
import {
  ExternalLink,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Copy,
  Check,
  Sparkles,
  MousePointerClick,
  LogIn,
  Key,
} from "lucide-react";

interface StepItem {
  id: number;
  title: string;
  description: string;
  tip?: string;
  icon: React.ComponentType<{ className?: string }>;
}

const tutorialSteps: StepItem[] = [
  {
    id: 1,
    title: "Acesse a plataforma Google AI Studio",
    description:
      "Abra a página oficial de desenvolvedores do Google AI Studio em uma nova aba para criar seu acesso gratuito.",
    tip: "O plano gratuito do Google Gemini oferece cotas amplas para estudos e leitura de materiais interativos.",
    icon: LogIn,
  },
  {
    id: 2,
    title: "Faça login com sua conta Google",
    description:
      "Utilize sua conta pessoal ou acadêmica do Gmail. Caso seja seu primeiro acesso, confirme os termos de uso do serviço.",
    tip: "Nenhum cartão de crédito é exigido para utilizar a cota gratuita do Gemini.",
    icon: MousePointerClick,
  },
  {
    id: 3,
    title: "Clique em 'Create API Key' ou 'Get API Key'",
    description:
      "Na barra superior ou lateral esquerda, selecione a opção para gerar uma nova chave de API em um projeto padrão.",
    tip: "Você pode criar uma chave vinculada a qualquer projeto padrão sem custo.",
    icon: Key,
  },
  {
    id: 4,
    title: "Copie a chave gerada e cole no Mastering Study",
    description:
      "Copie a sequência gerada (que inicia com 'AIzaSy...'), retorne a esta página, cole no campo de senha acima e clique em 'Salvar Chave'.",
    tip: "A chave nunca expira e você pode regenerá-la quando desejar no painel do Google.",
    icon: Copy,
  },
];

export function GeminiTutorial() {
  const [openStep, setOpenStep] = useState<number | null>(1);
  const [copiedLink, setCopiedLink] = useState(false);

  const googleStudioUrl = "https://aistudio.google.com/app/apikey";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(googleStudioUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <section aria-labelledby="tutorial-heading" className="space-y-5">
      {/* Cabeçalho da Seção */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <HelpCircle className="h-5 w-5" />
          </div>
          <div>
            <h2 id="tutorial-heading" className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Como gerar minha chave gratuita?
            </h2>
            <p className="text-xs text-slate-500">
              Passo a passo simples para obter sua credencial no Google AI Studio em menos de 2 minutos.
            </p>
          </div>
        </div>

        {/* Link Direto para o Google AI Studio */}
        <div className="flex items-center gap-2">
          <a
            href={googleStudioUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-slate-800 transition-colors"
          >
            <span>Ir para Google AI Studio</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* Accordion / Sanfona de Passos */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-2 sm:p-3 shadow-xs space-y-2">
        {tutorialSteps.map((step) => {
          const Icon = step.icon;
          const isOpen = openStep === step.id;

          return (
            <div
              key={step.id}
              className={`rounded-2xl transition-all border ${
                isOpen
                  ? "border-sky-200/80 bg-sky-50/40 shadow-2xs"
                  : "border-slate-100 bg-white hover:bg-slate-50/70"
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenStep(isOpen ? null : step.id)}
                className="flex w-full items-center justify-between p-4 text-left cursor-pointer"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-xl text-xs font-bold shrink-0 transition-colors ${
                      isOpen
                        ? "bg-sky-600 text-white"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {step.id}
                  </div>
                  <span className="text-sm font-bold text-slate-800">
                    {step.title}
                  </span>
                </div>

                <div className="text-slate-400 pl-2">
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </div>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 pt-1 space-y-3 text-xs text-slate-600 border-t border-sky-100/60 mt-1">
                  <p className="leading-relaxed pl-11">{step.description}</p>
                  {step.tip && (
                    <div className="ml-11 flex items-start gap-2 rounded-xl bg-white/90 border border-slate-200/60 p-3 text-slate-600">
                      <Sparkles className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                      <span className="text-[11px] leading-relaxed">{step.tip}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Box de Ajuda Extra e Cópia do Link */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl bg-slate-100/80 border border-slate-200/60 p-4 text-xs text-slate-600">
        <span className="text-slate-600 font-medium">
          URL oficial de gerenciamento de chaves: <code className="bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-800 font-mono text-[11px]">aistudio.google.com/app/apikey</code>
        </span>
        <button
          type="button"
          onClick={handleCopyLink}
          className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 font-semibold text-slate-700 border border-slate-200 hover:bg-slate-50 transition-colors"
        >
          {copiedLink ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
          <span>{copiedLink ? "Link copiado!" : "Copiar link"}</span>
        </button>
      </div>
    </section>
  );
}
