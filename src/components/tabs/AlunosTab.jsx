import { useMemo, useState } from 'react';
import * as XLSX from 'xlsx';
import { PAPEIS, TIMES } from '../../data/constants.js';
import { useApp } from '../../context/AppContext.jsx';
import { TableScroll } from '../common/FormControls.jsx';

function extractNamesFromWorkbook(workbook) {
  const names = [];

  workbook.SheetNames.forEach((sheetName) => {
    const sheet = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    rows.forEach((row) => {
      row.forEach((cell) => {
        if (
          typeof cell === 'string'
          && cell.trim().split(' ').length >= 2
          && cell.trim().length > 5
          && !/\d/.test(cell)
        ) {
          names.push(cell.trim());
        }
      });
    });
  });

  return Array.from(new Set(names));
}

export default function AlunosTab() {
  const { data, updateAluno, replaceAlunos } = useApp();
  const [search, setSearch] = useState('');
  const empresas = [data.meta.empresaA, data.meta.empresaB];

  const filteredStudents = useMemo(() => {
    const query = search.trim().toLowerCase();
    return data.alunos
      .map((aluno, index) => ({ aluno, index }))
      .filter(({ aluno }) => aluno.nome.toLowerCase().includes(query));
  }, [data.alunos, search]);

  const counts = useMemo(() => {
    const companyCounts = {};
    empresas.forEach((empresa) => {
      companyCounts[empresa] = {
        'Scrum Master': 0,
        'Owner/Stakeholder': 0,
        'Product Owner-Caça': 0,
        'Product Owner-Transporte': 0,
        'Developer-Caça': 0,
        'Developer-Transporte': 0,
      };
    });

    const buyerCounts = {
      'Comprador - Governo': 0,
      'Comprador - Militar': 0,
      'Comprador - Setor Privado': 0,
    };

    data.alunos.forEach((aluno) => {
      if (aluno.papel.startsWith('Comprador - ')) {
        if (buyerCounts[aluno.papel] !== undefined) buyerCounts[aluno.papel] += 1;
      } else if (aluno.papel === 'Scrum Master' || aluno.papel === 'Owner/Stakeholder') {
        if (companyCounts[aluno.empresa]) companyCounts[aluno.empresa][aluno.papel] += 1;
      } else if (aluno.papel === 'Product Owner' || aluno.papel === 'Developer') {
        const key = `${aluno.papel}-${aluno.time}`;
        if (companyCounts[aluno.empresa]?.[key] !== undefined) companyCounts[aluno.empresa][key] += 1;
      }
    });

    return { companyCounts, buyerCounts };
  }, [data.alunos, empresas]);

  const unassigned = data.alunos.filter((aluno) => !aluno.papel).length;

  function handleRoleChange(index, papel) {
    const patch = { papel };

    if (papel.startsWith('Comprador - ') || papel === '') {
      patch.empresa = '';
      patch.time = '';
    } else if (papel === 'Scrum Master' || papel === 'Owner/Stakeholder') {
      patch.time = '';
    }

    updateAluno(index, patch);
  }

  async function handleExcelImport(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer, { type: 'array' });
      const names = extractNamesFromWorkbook(workbook);

      if (!names.length) {
        window.alert('Não encontrei nomes reconhecíveis nesse arquivo.');
        return;
      }

      const confirmed = window.confirm(
        `Encontrei ${names.length} nomes. Isso substitui a lista atual de alunos e apaga as atribuições. Continuar?`,
      );

      if (confirmed) replaceAlunos(names);
    } catch {
      window.alert('Não foi possível ler este arquivo Excel.');
    } finally {
      event.target.value = '';
    }
  }

  return (
    <section className="panel">
      <h2>Alunos</h2>
      <div className="desc">Atribua cada aluno a um papel e equipe. A atribuição é feita pelo professor.</div>

      <div className="roster-search">
        <input type="text" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar aluno por nome..." />
      </div>

      <TableScroll>
        <table className="roster-table">
          <thead><tr><th>#</th><th>Nome</th><th>Papel</th><th>Empresa</th><th>Time</th></tr></thead>
          <tbody>
            {filteredStudents.map(({ aluno, index }) => {
              const needsEmpresa = ['Scrum Master', 'Owner/Stakeholder', 'Product Owner', 'Developer'].includes(aluno.papel);
              const needsTime = ['Product Owner', 'Developer'].includes(aluno.papel);

              return (
                <tr key={aluno.id}>
                  <td>{aluno.id}</td>
                  <td>{aluno.nome}</td>
                  <td>
                    <select value={aluno.papel} onChange={(event) => handleRoleChange(index, event.target.value)}>
                      {PAPEIS.map((papel) => (
                        <option key={papel || 'none'} value={papel}>{papel || '— não atribuído —'}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    {needsEmpresa && (
                      <select value={aluno.empresa} onChange={(event) => updateAluno(index, { empresa: event.target.value })}>
                        <option value="">—</option>
                        {empresas.map((empresa) => <option key={empresa} value={empresa}>{empresa}</option>)}
                      </select>
                    )}
                  </td>
                  <td>
                    {needsTime && (
                      <select value={aluno.time} onChange={(event) => updateAluno(index, { time: event.target.value })}>
                        <option value="">—</option>
                        {TIMES.map((time) => <option key={time} value={time}>{time}</option>)}
                      </select>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </TableScroll>

      <div className={`note ${unassigned > 0 ? 'note-orange' : 'note-green'}`}>
        {unassigned} de {data.alunos.length} alunos ainda sem papel atribuído.
      </div>

      <h2 className="section-gap">Resumo de Vagas Preenchidas</h2>
      <div className="grid2">
        {empresas.map((empresa) => (
          <div className="mini-card" key={empresa}>
            <h3>{empresa}</h3>
            <div className="mini-row"><label>Scrum Master</label><span className="pts">{counts.companyCounts[empresa]['Scrum Master']} / 1</span></div>
            <div className="mini-row"><label>Owner/Stakeholder</label><span className="pts">{counts.companyCounts[empresa]['Owner/Stakeholder']} / 1</span></div>
            <div className="mini-row"><label>PO — {data.teamNames[empresa]?.Caça}</label><span className="pts">{counts.companyCounts[empresa]['Product Owner-Caça']} / 1</span></div>
            <div className="mini-row"><label>PO — {data.teamNames[empresa]?.Transporte}</label><span className="pts">{counts.companyCounts[empresa]['Product Owner-Transporte']} / 1</span></div>
            <div className="mini-row"><label>Devs — {data.teamNames[empresa]?.Caça}</label><span className="pts">{counts.companyCounts[empresa]['Developer-Caça']} / 4</span></div>
            <div className="mini-row"><label>Devs — {data.teamNames[empresa]?.Transporte}</label><span className="pts">{counts.companyCounts[empresa]['Developer-Transporte']} / 5</span></div>
          </div>
        ))}
      </div>

      <div className="mini-card section-small-gap">
        <h3>Compradores</h3>
        <div className="mini-row"><label>Governo</label><span className="pts">{counts.buyerCounts['Comprador - Governo']} / 1</span></div>
        <div className="mini-row"><label>Militar</label><span className="pts">{counts.buyerCounts['Comprador - Militar']} / 1</span></div>
        <div className="mini-row"><label>Setor Privado</label><span className="pts">{counts.buyerCounts['Comprador - Setor Privado']} / 1</span></div>
      </div>

      <h2 className="section-gap">Importar Lista de Alunos</h2>
      <div className="desc">Substitui a lista atual por uma nova a partir de Excel (.xlsx/.xls), mantendo a função existente no painel original.</div>
      <input type="file" accept=".xlsx,.xls" onChange={handleExcelImport} />
      <div className="reference-file">A planilha original também está preservada em <code>public/data/alunos.xlsx</code>.</div>
    </section>
  );
}
