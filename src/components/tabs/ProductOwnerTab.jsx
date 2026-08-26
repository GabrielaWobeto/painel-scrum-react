import { useApp } from '../../context/AppContext.jsx';
import { ScoreSelect, SprintCell, TableScroll, TextCellInput, YesNoSelect } from '../common/FormControls.jsx';

export default function ProductOwnerTab() {
  const { data, updateField } = useApp();
  const rows = data.po;

  return (
    <section className="panel">
      <h2>Product Owner</h2>
      <div className="desc">Um Product Owner por time (2 times por empresa).</div>
      <TableScroll>
        <table>
          <thead><tr><th>Sprint</th><th>Empresa</th><th>Time</th><th>Requisitos claros ao time?</th><th>Acompanhou os testes de perto?</th><th>Reunião de priorização ocorreu?</th><th>Nota (1-5)</th><th>Observações</th></tr></thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={`${row.sprint}-${row.empresa}-${row.time}`}>
                <SprintCell rows={rows} index={index} />
                <td>{row.empresa}</td><td>{row.time}</td>
                <td><YesNoSelect value={row.requisitos} onChange={(value) => updateField(['po', index, 'requisitos'], value)} /></td>
                <td><YesNoSelect value={row.testes} onChange={(value) => updateField(['po', index, 'testes'], value)} /></td>
                <td><YesNoSelect value={row.reuniao} onChange={(value) => updateField(['po', index, 'reuniao'], value)} /></td>
                <td><ScoreSelect value={row.nota} onChange={(value) => updateField(['po', index, 'nota'], value)} /></td>
                <td><TextCellInput value={row.obs} onChange={(value) => updateField(['po', index, 'obs'], value)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableScroll>
      <div className="note note-teal">Critério-guia: o PO é avaliado pela clareza dos requisitos e pelo acompanhamento ativo da produção — não pela qualidade técnica do avião em si.</div>
    </section>
  );
}
