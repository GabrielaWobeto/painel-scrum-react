import { useApp } from '../../context/AppContext.jsx';
import { ScoreSelect, SprintCell, TableScroll, TextCellInput } from '../common/FormControls.jsx';

export default function OwnerTab() {
  const { data, updateField } = useApp();
  const rows = data.owner;

  return (
    <section className="panel">
      <h2>Stakeholder / Owner</h2>
      <div className="desc">Avaliação de comunicação e negociação — independente dos pontos de corrupção.</div>
      <TableScroll>
        <table>
          <thead><tr><th>Sprint</th><th>Empresa</th><th>Comunicação com a equipe (1-5)</th><th>Negociação com compradores (1-5)</th><th>Alinhamento com SM/PO sobre qualidade (1-5)</th><th>Nota Geral (1-5)</th><th>Observações</th></tr></thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={`${row.sprint}-${row.empresa}`}>
                <SprintCell rows={rows} index={index} />
                <td>{row.empresa}</td>
                <td><ScoreSelect value={row.comunicacao} onChange={(value) => updateField(['owner', index, 'comunicacao'], value)} /></td>
                <td><ScoreSelect value={row.negociacao} onChange={(value) => updateField(['owner', index, 'negociacao'], value)} /></td>
                <td><ScoreSelect value={row.alinhamento} onChange={(value) => updateField(['owner', index, 'alinhamento'], value)} /></td>
                <td><ScoreSelect value={row.notaGeral} onChange={(value) => updateField(['owner', index, 'notaGeral'], value)} /></td>
                <td><TextCellInput value={row.obs} onChange={(value) => updateField(['owner', index, 'obs'], value)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableScroll>
      <div className="note note-blue">Esta nota avalia o desempenho no papel — não confunda com os pontos ganhos/perdidos no mecanismo de corrupção.</div>
    </section>
  );
}
