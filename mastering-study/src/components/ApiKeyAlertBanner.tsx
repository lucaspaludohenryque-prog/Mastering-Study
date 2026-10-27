"use client";

import Link from "next/link";
import { AlertTriangle, KeyRound, CheckCircle2, ArrowRight } from "lucide-react";

interface ApiKeyAlertBannerProps {
  isConnected?: boolean;
  providerName?: string;
  onConfigureClick?: () => void;
  configHref?: string;
}

export function ApiKeyAlertBanner({
  isConnected = false,
  providerName = "Google Gemini",
  onConfigureClick,
  configHref = "/configuracoes-ia",
}: ApiKeyAlertBannerProps) {
  if (isConnected) {
    return (
      <div
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-2xl border border-emerald-200/90 bg-emerald-50/70 p-4 sm:px-6 shadow-xs transition-all"
        role="status"
      >
        <div className="flex items-center gap-3.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-700">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-emerald-900">
              Chave de API conectada e ativa
            </span>
            <span className="text-xs text-emerald-700">
              Provedor configurado: <strong>{providerName}</strong>. Suas aulas em texto interativo já podem ser geradas.
            </span>
          </div>
        </div>

        {onConfigureClick ? (
          <button
            type="button"
            onClick={onConfigureClick}
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-emerald-800 border border-emerald-200 shadow-2xs hover:bg-emerald-100/60 transition-colors cursor-pointer"
          >
            <span>Gerenciar Chave</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        ) : (
          <Link
            href={configHref}
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-emerald-800 border border-emerald-200 shadow-2xs hover:bg-emerald-100/60 transition-colors cursor-pointer"
          >
            <span>Gerenciar Chave</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>
    );
  }

  return (
    <div
      className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-amber-200/90 bg-amber-50/90 p-4 sm:px-6 shadow-xs transition-all animate-fadeIn"
      role="alert"
    >
      <div className="flex items-start sm:items-center gap-3.5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-700 mt-0.5 sm:mt-0">
          <AlertTriangle className="h-5 w-5" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-amber-950">
            Atenção: Você ainda não conectou sua chave de API.
          </span>
          <span className="text-xs text-amber-800">
            Clique aqui para configurar sua chave (BYOK) e liberar a geração de aulas interativas personalizadas por IA.
          </span>
        </div>
      </div>

      {onConfigureClick ? (
        <button
          type="button"
          onClick={onConfigureClick}
          className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-amber-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-amber-700 active:scale-98 transition-all cursor-pointer"
        >
          <KeyRound className="h-4 w-4" />
          <span>Configurar Chave</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      ) : (
        <Link
          href={configHref}
          className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-amber-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-amber-700 active:scale-98 transition-all cursor-pointer"
        >
          <KeyRound className="h-4 w-4" />
          <span>Configurar Chave</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      )}
    </div>
  );
}
