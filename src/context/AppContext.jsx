import { createContext, useContext, useEffect, useState } from 'react';
import { buildInitialData } from '../data/initialData.js';
import {
  clearLocalStorage,
  downloadJson,
  loadFromLocalStorage,
  readJsonFile,
  saveToLocalStorage,
} from '../utils/storage.js';

const AppContext = createContext(null);

function cloneData(data) {
  return structuredClone(data);
}

export function AppProvider({ children }) {
  const [data, setData] = useState(() => loadFromLocalStorage() || buildInitialData());
  const [activeTab, setActiveTab] = useState('setup');
  const [fileName, setFileName] = useState(() =>
    loadFromLocalStorage() ? '(dados recuperados do navegador)' : '(nenhum arquivo carregado)',
  );
  const [lastSavedAt, setLastSavedAt] = useState(null);
  const [saveStatus, setSaveStatus] = useState('Autosave ativo');

  useEffect(() => {
    document.documentElement.style.fontSize = `${data.meta.fontScale || 16}px`;
  }, [data.meta.fontScale]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const date = saveToLocalStorage(data);
        setLastSavedAt(date);
        setSaveStatus('Salvo automaticamente');
      } catch {
        setSaveStatus('Falha ao salvar automaticamente');
      }
    }, 350);

    return () => window.clearTimeout(timer);
  }, [data]);

  function updateField(path, value) {
    const parts = Array.isArray(path) ? path : String(path).split('.');
    setData((current) => {
      const next = cloneData(current);
      let target = next;

      for (let index = 0; index < parts.length - 1; index += 1) {
        target = target[parts[index]];
      }

      target[parts.at(-1)] = value;
      return next;
    });
  }

  function updateAluno(index, patch) {
    setData((current) => {
      const next = cloneData(current);
      next.alunos[index] = { ...next.alunos[index], ...patch };
      return next;
    });
  }

  function replaceAlunos(names) {
    setData((current) => ({
      ...current,
      alunos: names.map((nome, index) => ({
        id: index + 1,
        nome,
        empresa: '',
        time: '',
        papel: '',
      })),
    }));
  }

  function renameEmpresa(which, novoNome) {
    const metaKey = which === 'A' ? 'empresaA' : 'empresaB';
    const cleanName = novoNome.trim();
    if (!cleanName) return;

    setData((current) => {
      const oldName = current.meta[metaKey];
      if (oldName === cleanName) return current;

      const next = cloneData(current);
      const rename = (value) => (value === oldName ? cleanName : value);

      ['sm', 'owner', 'po', 'dev', 'buyerProduct'].forEach((collection) => {
        next[collection].forEach((row) => {
          row.empresa = rename(row.empresa);
        });
      });

      next.alunos.forEach((aluno) => {
        aluno.empresa = rename(aluno.empresa);
      });

      next.corrupcao.empresaCorruptora = rename(next.corrupcao.empresaCorruptora);
      next.sabotagem.empresaSabotador = rename(next.sabotagem.empresaSabotador);

      if (next.teamNames[oldName]) {
        next.teamNames[cleanName] = next.teamNames[oldName];
        delete next.teamNames[oldName];
      }

      next.meta[metaKey] = cleanName;
      return next;
    });
  }

  function changeFontScale(delta) {
    setData((current) => ({
      ...current,
      meta: {
        ...current.meta,
        fontScale: Math.max(12, Math.min(24, (current.meta.fontScale || 16) + delta)),
      },
    }));
  }

  function resetFontScale() {
    updateField(['meta', 'fontScale'], 16);
  }

  function manualSave() {
    try {
      const date = saveToLocalStorage(data);
      downloadJson(data);
      setLastSavedAt(date);
      setSaveStatus('Salvo manualmente • JSON baixado');
    } catch {
      setSaveStatus('Falha no salvamento manual');
    }
  }

  async function importJson(file) {
    try {
      const loaded = await readJsonFile(file);
      setData(loaded);
      setFileName(file.name);
      setSaveStatus('JSON carregado');
      return true;
    } catch {
      window.alert('Não foi possível ler este arquivo. Verifique se é um JSON válido gerado pelo painel.');
      return false;
    }
  }

  function exportJson() {
    downloadJson(data);
  }

  function resetAll() {
    const confirmed = window.confirm(
      'Isso apaga todos os dados lançados e também o salvamento automático do navegador. Continuar?',
    );

    if (!confirmed) return;

    clearLocalStorage();
    setData(buildInitialData());
    setFileName('(nenhum arquivo carregado)');
    setActiveTab('setup');
    setLastSavedAt(null);
    setSaveStatus('Dados limpos');
  }

  const value = {
    data,
    activeTab,
    fileName,
    lastSavedAt,
    saveStatus,
    setActiveTab,
    updateField,
    updateAluno,
    replaceAlunos,
    renameEmpresa,
    changeFontScale,
    resetFontScale,
    manualSave,
    importJson,
    exportJson,
    resetAll,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// O hook fica no mesmo arquivo do Provider por simplicidade do projeto.
// eslint-disable-next-line react-refresh/only-export-components
export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp deve ser usado dentro de AppProvider.');
  return context;
}
