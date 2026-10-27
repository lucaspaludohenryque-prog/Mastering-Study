"use client";

import React, { useState, useEffect } from "react";
import {
  KeyRound,
  Eye,
  EyeOff,
  CheckCircle2,
  Trash2,
  Save,
  AlertCircle,
  Sparkles,
} from "lucide-react";

const STORAGE_KEY = "mastering_study_byok_config";

export function ApiKeyForm() {
  const [apiKey, setApiKey] = useState("");
  const [provider, setProvider] = useState("gemini");
  const [showKey, setShowKey] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [feedbackType, setFeedbackType] = useState<"success" | "info" | "error" | null>(null);

  // Carrega chave existente no localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.apiKey) {
          setApiKey(parsed.apiKey);
          setProvider(parsed.provider || "gemini");
          setIsSaved(true);
        }
      }
    } catch (err) {
      console.error("Erro ao carregar chave do LocalStorage:", err);
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanKey = apiKey.trim();

    if (!cleanKey) {
      setFeedbackMessage("Por favor, informe uma chave de API válida.");
      setFeedbackType("error");
      return;
    }

    try {
      const config = {
        provider,
        apiKey: cleanKey,
        isConnected: true,
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
      setIsSaved(true);
      setFeedbackMessage("Chave salva com sucesso!");
      setFeedbackType("success");
    } catch (err) {
      console.error("Erro ao salvar chave:", err);
      setFeedbackMessage("Não foi possível salvar a chave no navegador.");
      setFeedbackType("error");
    }
  };

  const handleRemove = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setApiKey("");
      setIsSaved(false);
      setFeedbackMessage("Chave de API removida com sucesso.");
      setFeedbackType("info");
    } catch (err) {
      console.error("Erro ao remover chave:", err);
    }
  };

  const getMaskedKey = (key: string) => {
    if (!key || key.length < 8) return "••••••••••••";
    const start = key.slice(0, 6);
    const end = key.slice(-4);
    return `${start}••••••••••••${end}`;
  };

  return (
    <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs space-y-6">
      {/* Topo do Formulário com Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-50 text-sky-600">
            <KeyRound className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Gerenciar Chave de Acesso
            </h2>
            <p className="text-xs text-slate-500">
              Chave de API utilizada para gerar suas aulas personalizadas em texto
            </p>
          </div>
        </div>

        {/* Badge de Status Atual */}
        <div className="flex items-center gap-2">
          {isSaved ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 px-3 py-1 text-xs font-semibold text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Chave Ativa ({getMaskedKey(apiKey)})
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200/80 px-3 py-1 text-xs font-semibold text-amber-700">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              Nenhuma chave configurada
            </span>
          )}
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-5">
        {/* Provedor de IA */}
        <div className="space-y-1.5">
          <label htmlFor="ai-provider-select" className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Provedor de Inteligência Artificial
          </label>
          <select
            id="ai-provider-select"
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
            className="w-full h-11 rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 text-xs sm:text-sm font-medium text-slate-800 transition-colors focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
          >
            <option value="gemini">Google Gemini (Gemini 2.5 Flash / Pro) • Recomendado</option>
            <option value="openai">OpenAI (GPT-4o / GPT-4o-mini)</option>
            <option value="anthropic">Anthropic (Claude 3.5 Sonnet)</option>
            <option value="deepseek">DeepSeek (DeepSeek V3 / R1)</option>
          </select>
        </div>

        {/* Campo da Chave de API */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="api-key-input" className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Chave de API (Secret Key)
            </label>
            {apiKey && (
              <span className="text-[11px] text-slate-400">
                {apiKey.length} caracteres
              </span>
            )}
          </div>

          <div className="relative">
            <input
              id="api-key-input"
              type={showKey ? "text" : "password"}
              value={apiKey}
              onChange={(e) => {
                setApiKey(e.target.value);
                if (feedbackMessage) setFeedbackMessage(null);
              }}
              placeholder="Cole sua chave aqui (ex: AIzaSy...)"
              className="w-full h-12 rounded-xl border border-slate-200/90 bg-slate-50/50 pl-4 pr-12 text-sm font-mono text-slate-800 placeholder-slate-400 transition-all focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-3 focus:ring-sky-500/15"
              autoComplete="off"
              spellCheck={false}
              required
            />
            <button
              type="button"
              onClick={() => setShowKey(!showKey)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label={showKey ? "Ocultar chave de API" : "Mostrar chave de API"}
            >
              {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <p className="text-[11px] text-slate-400">
            A chave padrão do Google Gemini normalmente começa com as letras <code>AIzaSy...</code>
          </p>
        </div>

        {/* Mensagem de Feedback */}
        {feedbackMessage && (
          <div
            className={`flex items-center gap-2.5 rounded-xl p-3.5 text-xs font-semibold animate-fadeIn ${
              feedbackType === "success"
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                : feedbackType === "info"
                ? "bg-slate-100 text-slate-700 border border-slate-200"
                : "bg-rose-50 text-rose-800 border border-rose-200"
            }`}
            role="status"
          >
            {feedbackType === "success" && <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />}
            {feedbackType === "info" && <Sparkles className="h-4 w-4 text-slate-500 shrink-0" />}
            {feedbackType === "error" && <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />}
            <span>{feedbackMessage}</span>
          </div>
        )}

        {/* Botões de Ação */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            type="submit"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-sky-600 px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm shadow-sky-600/20 hover:bg-sky-700 active:scale-98 transition-all cursor-pointer"
          >
            <Save className="h-4 w-4" />
            <span>Salvar Chave</span>
          </button>

          {isSaved && (
            <button
              type="button"
              onClick={handleRemove}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-xs sm:text-sm font-semibold text-rose-600 hover:bg-rose-50 hover:border-rose-200 transition-colors cursor-pointer"
            >
              <Trash2 className="h-4 w-4" />
              <span>Remover Chave</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
