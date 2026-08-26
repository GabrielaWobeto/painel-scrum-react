import { useApp } from '../../context/AppContext.jsx';
import { ScoreSelect, SprintCell, TableScroll, TextCellInput, YesNoSelect } from '../common/FormControls.jsx';

export default function DevelopersTab() {
  const { data, updateField } = useApp();
  const rows = data.dev;

  return (
    <section className="panel">
      <h2>Developers</h2>
      <div className="desc">Avaliação por time — a qualidade do produto é um dos principais indicadores de entendimento do processo pelo grupo.</div>
      <TableScroll>
        <table>
          <thead><tr><th>Sprint</th><th>Empresa</th><th>Time</th><th>Qualidade do produto (1-5)</th><th>Seguiu o processo?</th><th>Colaboração do time (1-5)</th><th>Nota Time (1-5)</th><th>Destaque individual (opcional)</th></tr></thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={`${row.sprint}-${row.empresa}-${row.time}`}>
                <SprintCell rows={rows} index={index} />
                <td>{row.empresa}</td><td>{row.time}</td>
                <td><ScoreSelect value={row.qualidade} onChange={(value) => updateField(['dev', index, 'qualidade'], value)} /></td>
                <td><YesNoSelect value={row.processo} onChange={(value) => updateField(['dev', index, 'processo'], value)} /></td>
                <td><ScoreSelect value={row.colaboracao} onChange={(value) => updateField(['dev', index, 'colaboracao'], value)} /></td>
                <td><ScoreSelect value={row.notaTime} onChange={(value) => updateField(['dev', index, 'notaTime'], value)} /></td>
                <td><TextCellInput value={row.destaque} placeholder="nome (se houver)" onChange={(value) => updateField(['dev', index, 'destaque'], value)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableScroll>
      <div className="note note-green">Reserve a coluna de destaque individual apenas para casos que realmente chamem atenção, positiva ou negativamente.</div>
    </section>
  );
}
