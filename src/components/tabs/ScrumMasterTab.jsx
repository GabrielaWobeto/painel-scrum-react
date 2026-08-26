import { useApp } from '../../context/AppContext.jsx';
import { ScoreSelect, SprintCell, TableScroll, TextCellInput, YesNoSelect } from '../common/FormControls.jsx';

export default function ScrumMasterTab() {
  const { data, updateField } = useApp();
  const rows = data.sm;

  return (
    <section className="panel">
      <h2>Scrum Master</h2>
      <div className="desc">Avaliação de processo — um Scrum Master por empresa, atendendo os dois times.</div>
      <TableScroll>
        <table>
          <thead><tr><th>Sprint</th><th>Empresa</th><th>Conduziu os eventos corretamente?</th><th>Removeu impedimentos?</th><th>Ajudou o time a melhorar entre Sprints?</th><th>Nota (1-5)</th><th>Observações</th></tr></thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={`${row.sprint}-${row.empresa}`}>
                <SprintCell rows={rows} index={index} />
                <td>{row.empresa}</td>
                <td><YesNoSelect value={row.conduziu} onChange={(value) => updateField(['sm', index, 'conduziu'], value)} /></td>
                <td><YesNoSelect value={row.removeu} onChange={(value) => updateField(['sm', index, 'removeu'], value)} /></td>
                <td><YesNoSelect value={row.ajudou} onChange={(value) => updateField(['sm', index, 'ajudou'], value)} /></td>
                <td><ScoreSelect value={row.nota} onChange={(value) => updateField(['sm', index, 'nota'], value)} /></td>
                <td><TextCellInput value={row.obs} onChange={(value) => updateField(['sm', index, 'obs'], value)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableScroll>
      <div className="note note-dark">Critério-guia: o SM não é avaliado por produzir, mas por garantir que o Scrum aconteça de verdade e por ajudar o time a evoluir de uma Sprint para a outra.</div>
    </section>
  );
}
