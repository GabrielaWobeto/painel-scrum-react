import { useRef } from 'react';
import { useApp } from '../context/AppContext.jsx';

export default function Header() {
  const fileInputRef = useRef(null);
  const {
    data,
    fileName,
    lastSavedAt,
    saveStatus,
    changeFontScale,
    resetFontScale,
    manualSave,
    exportJson,
    importJson,
    resetAll,
  } = useApp();

  async function handleFileChange(event) {
    const file = event.target.files?.[0];
    if (file) await importJson(file);
    event.target.value = '';
  }

  return (
    <header className="topbar">
      <div>
        <h1>Painel de Avaliação — Simulação Scrum Competitiva</h1>
        <div className="sub">{fileName}</div>
        <div className="save-state">
          {saveStatus}
          {lastSavedAt ? ` • ${lastSavedAt.toLocaleTimeString('pt-BR')}` : ''}
        </div>
      </div>

      <div className="topbar-actions">
        <div className="fontctrl" aria-label="Controle de tamanho da fonte">
          <span className="lbl">Fonte</span>
          <button type="button" onClick={() => changeFontScale(-1)} title="Diminuir fonte">A−</button>
          <button type="button" onClick={resetFontScale} title="Restaurar fonte padrão">A</button>
          <button type="button" onClick={() => changeFontScale(1)} title="Aumentar fonte">A+</button>
          <span className="lbl">{data.meta.fontScale}px</span>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="application/json,.json"
          hidden
          onChange={handleFileChange}
        />

        <button className="btn btn-load" type="button" onClick={() => fileInputRef.current?.click()}>
          📂 Carregar JSON
        </button>
        <button className="btn btn-save" type="button" onClick={manualSave}>
          💾 Salvar agora
        </button>
        <button className="btn btn-export" type="button" onClick={exportJson}>
          ⬇ Exportar JSON
        </button>
        <button className="btn btn-reset" type="button" onClick={resetAll}>
          Limpar tudo
        </button>
      </div>
    </header>
  );
}
