import { useApp } from '../../context/AppContext.jsx';
import { ScoreSelect, SprintCell, TableScroll, TextCellInput, YesNoSelect } from '../common/FormControls.jsx';

export default function BuyerRoleTab() {
  const { data, updateField } = useApp();
  const rows = data.buyerProf;

  return (
    <section className="panel">
      <h2>Compradores — Desempenho no Papel</h2>
      <div className="desc">Avaliação do professor sobre como cada comprador exerceu seu papel.</div>
      <TableScroll>
        <table>
          <thead><tr><th>Sprint</th><th>Comprador</th><th>Aplicou o checklist de verificação?</th><th>Decisões coerentes com o papel?</th><th>Feedback construtivo nas Reviews?</th><th>Nota (1-5)</th><th>Observações</th></tr></thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={`${row.sprint}-${row.comprador}`}>
                <SprintCell rows={rows} index={index} />
                <td>{row.comprador}</td>
                <td><YesNoSelect value={row.checklist} onChange={(value) => updateField(['buyerProf', index, 'checklist'], value)} /></td>
                <td><YesNoSelect value={row.decisoes} onChange={(value) => updateField(['buyerProf', index, 'decisoes'], value)} /></td>
                <td><YesNoSelect value={row.feedback} onChange={(value) => updateField(['buyerProf', index, 'feedback'], value)} /></td>
                <td><ScoreSelect value={row.nota} onChange={(value) => updateField(['buyerProf', index, 'nota'], value)} /></td>
                <td><TextCellInput value={row.obs} onChange={(value) => updateField(['buyerProf', index, 'obs'], value)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableScroll>
      <div className="note note-orange">Critério-guia: avalie se o comprador aplicou o checklist a cada Sprint, se as decisões foram coerentes com o papel, e se o feedback nas Reviews foi útil.</div>
    </section>
  );
}
