"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, KeyRound, Eye, EyeOff, X, ShieldCheck } from "lucide-react";
import type { ByokConfig } from "@/types";

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveConfig: (config: ByokConfig) => void;
  currentConfig?: ByokConfig;
}

const aiProviders = [
  { id: "gemini", name: "Google Gemini (Gemini 2.5 Flash / Pro)", placeholder: "AIzaSy..." },
  { id: "openai", name: "OpenAI (GPT-4o / GPT-4o-mini)", placeholder: "sk-proj-..." },
  { id: "anthropic", name: "Anthropic (Claude 3.5 Sonnet)", placeholder: "sk-ant-..." },
  { id: "deepseek", name: "DeepSeek (DeepSeek V3 / R1)", placeholder: "sk-..." },
  { id: "openrouter", name: "OpenRouter (Multi-modelos)", placeholder: "sk-or-..." },
];

export function ApiKeyModal({
  isOpen,
  onClose,
  onSaveConfig,
  currentConfig,
}: ApiKeyModalProps) {
  const [provider, setProvider] = useState("gemini");
  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (currentConfig?.apiKey) {
      setApiKey(currentConfig.apiKey);
      setProvider(currentConfig.provider || "gemini");
    }
  }, [currentConfig]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) {
      setError("Por favor, informe sua chave de API.");
      return;
    }
    setError("");
    onSaveConfig({
      provider,
      apiKey: apiKey.trim(),
      isConnected: true,
    });
    onClose();
  };

  const selectedProviderInfo = aiProviders.find((p) => p.id === provider);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
    >
      <div className="w-full max-w-lg rounded-3xl bg-white border border-slate-200/80 shadow-2xl overflow-hidden animate-scaleIn">
        {/* Cabeçalho do Modal */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
              <KeyRound className="h-5 w-5" />
            </div>
            <div>
              <h3 id="modal-headline" className="text-base font-bold text-slate-900">
                Configurações de IA (BYOK)
              </h3>
              <p className="text-xs text-slate-400">Bring Your Own Key</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
            aria-label="Fechar modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 px-6 py-5">
            <div className="rounded-xl bg-sky-50/70 border border-sky-100 p-3.5 text-xs text-sky-900 flex items-start gap-2.5">
              <ShieldCheck className="h-4 w-4 text-sky-600 shrink-0 mt-0.5" />
              <span>
                Suas aulas em texto interativo são geradas diretamente na sua conta do provedor de IA. Sua chave fica salva exclusivamente no seu navegador.
              </span>
            </div>

            {/* Seleção do Provedor */}
            <div className="space-y-1.5">
              <label htmlFor="ai-provider" className="text-xs font-bold text-slate-700">
                Provedor de Inteligência Artificial
              </label>
              <select
                id="ai-provider"
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
                className="w-full h-11 rounded-xl border border-slate-200 bg-white px-3.5 text-xs sm:text-sm font-medium text-slate-800 transition-colors focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              >
                {aiProviders.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Campo da Chave de API */}
            <div className="space-y-1.5">
              <label htmlFor="api-key-input" className="text-xs font-bold text-slate-700">
                Chave de API (Secret Key)
              </label>
              <div className="relative">
                <input
                  id="api-key-input"
                  type={showKey ? "text" : "password"}
                  value={apiKey}
                  onChange={(e) => {
                    setApiKey(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder={selectedProviderInfo?.placeholder || "sk-..."}
                  className="w-full h-11 rounded-xl border border-slate-200 bg-white pl-3.5 pr-11 text-xs sm:text-sm font-mono text-slate-800 transition-colors focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                  autoComplete="off"
                  spellCheck={false}
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                  aria-label={showKey ? "Ocultar chave" : "Mostrar chave"}
                >
                  {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {error && <p className="text-xs font-medium text-rose-600">{error}</p>}
            </div>
          </div>

          {/* Rodapé com Ações */}
          <div className="flex items-center justify-end gap-3 border-t border-slate-100 bg-slate-50/70 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-6 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-sky-700 active:scale-98 transition-all"
            >
              <Sparkles className="h-4 w-4" />
              <span>Salvar e Ativar</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
