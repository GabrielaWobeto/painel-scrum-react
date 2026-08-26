import { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';

function CompanyNameField({ which, label, value }) {
  const { renameEmpresa } = useApp();
  const [draft, setDraft] = useState(value);

  useEffect(() => setDraft(value), [value]);

  function commit() {
    if (draft.trim()) renameEmpresa(which, draft);
    else setDraft(value);
  }

  return (
    <div className="field">
      <label>{label}</label>
      <input
        type="text"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onBlur={commit}
        onKeyDown={(event) => {
          if (event.key === 'Enter') event.currentTarget.blur();
        }}
      />
    </div>
  );
}

export default function ConfigTab() {
  const { data, updateField } = useApp();
  const { meta, teamNames, weights } = data;
  const weightLabels = {
    sm: 'Scrum Master',
    owner: 'Owner',
    po: 'Product Owner',
    dev: 'Developers',
    buyer: 'Avaliação dos Compradores',
  };

  return (
    <section className="panel">
      <h2>Configuração</h2>
      <div className="desc">Identificação da turma e nomes das empresas/times. Alterar os nomes atualiza todas as abas automaticamente.</div>

      <div className="fields-row">
        <div className="field">
          <label>Turma</label>
          <input type="text" value={meta.turma} onChange={(event) => updateField(['meta', 'turma'], event.target.value)} />
        </div>
        <div className="field">
          <label>Data</label>
          <input type="text" value={meta.data} onChange={(event) => updateField(['meta', 'data'], event.target.value)} />
        </div>
      </div>

      <div className="fields-row">
        <CompanyNameField which="A" label="Nome — Empresa A" value={meta.empresaA} />
        <div className="field">
          <label>Time Caça — Empresa A</label>
          <input
            type="text"
            value={teamNames[meta.empresaA]?.Caça || ''}
            onChange={(event) => updateField(['teamNames', meta.empresaA, 'Caça'], event.target.value)}
          />
        </div>
        <div className="field">
          <label>Time Transporte — Empresa A</label>
          <input
            type="text"
            value={teamNames[meta.empresaA]?.Transporte || ''}
            onChange={(event) => updateField(['teamNames', meta.empresaA, 'Transporte'], event.target.value)}
          />
        </div>
      </div>

      <div className="fields-row">
        <CompanyNameField which="B" label="Nome — Empresa B" value={meta.empresaB} />
        <div className="field">
          <label>Time Caça — Empresa B</label>
          <input
            type="text"
            value={teamNames[meta.empresaB]?.Caça || ''}
            onChange={(event) => updateField(['teamNames', meta.empresaB, 'Caça'], event.target.value)}
          />
        </div>
        <div className="field">
          <label>Time Transporte — Empresa B</label>
          <input
            type="text"
            value={teamNames[meta.empresaB]?.Transporte || ''}
            onChange={(event) => updateField(['teamNames', meta.empresaB, 'Transporte'], event.target.value)}
          />
        </div>
      </div>

      <div className="note note-dark">Dica: os nomes de empresa já vêm pré-preenchidos como Maverick Aviation e SkyForge Ind. Aeronáutica. Eles podem ser alterados sem perder as referências internas.</div>

      <h2 className="section-gap">Pesos da Nota Final</h2>
      <div className="desc">Ajuste o peso de cada papel no cálculo da nota final da empresa.</div>
      <div className="weights-panel">
        {Object.entries(weights).map(([key, value]) => (
          <div className="weight-field" key={key}>
            <label>{weightLabels[key]}</label>
            <input
              type="number"
              min="0"
              step="0.5"
              value={value}
              onChange={(event) => updateField(['weights', key], Number.parseFloat(event.target.value) || 0)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
