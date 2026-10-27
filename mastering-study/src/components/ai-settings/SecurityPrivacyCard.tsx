import React from "react";
import { Lock, ShieldCheck, HardDrive, EyeOff } from "lucide-react";

export function SecurityPrivacyCard() {
  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-sky-200/80 bg-gradient-to-br from-sky-50/90 via-white to-slate-50 p-6 sm:p-7 shadow-xs"
      role="region"
      aria-label="Aviso de Privacidade e Segurança"
    >
      <div className="flex flex-col sm:flex-row items-start gap-4">
        {/* Ícone de Cadeado em destaque */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky-600 text-white shadow-md shadow-sky-600/25">
          <Lock className="h-6 w-6" />
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-sky-100 px-2.5 py-0.5 text-[11px] font-bold text-sky-800 uppercase tracking-wider">
              <ShieldCheck className="h-3.5 w-3.5" />
              Privacidade Garantida
            </span>
            <span className="text-xs text-slate-400">• Modelo BYOK</span>
          </div>

          <p className="text-sm font-semibold text-slate-800 leading-relaxed">
            Sua segurança é nossa prioridade. Sua chave de API é salva apenas localmente no seu navegador (Local Storage). Nós não temos acesso a ela e ela jamais é enviada para os nossos servidores.
          </p>

          {/* Grid com destaques de segurança */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="flex items-center gap-2.5 text-xs text-slate-600">
              <HardDrive className="h-4 w-4 text-sky-600 shrink-0" />
              <span>Armazenamento isolado no dispositivo</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-600">
              <EyeOff className="h-4 w-4 text-sky-600 shrink-0" />
              <span>Sem rastreamento ou intermediação</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
