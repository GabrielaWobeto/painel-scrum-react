import { useApp } from '../../context/AppContext.jsx';
import { DecisionSelect, ScoreSelect, SprintCell, TableScroll, YesNoSelect } from '../common/FormControls.jsx';

export default function BuyerProductTab() {
  const { data, updateField } = useApp();
  const rows = data.buyerProduct;

  return (
    <section className="panel">
      <h2>Ficha do Comprador — Avaliação do Produto</h2>
      <div className="desc">Transcreva aqui os dados que cada comprador preencheu na ficha em papel, ao final de cada Sprint.</div>
      <TableScroll>
        <table>
          <thead><tr><th>Sprint</th><th>Comprador</th><th>Empresa</th><th>Produto</th><th>Padrão Técnico</th><th>Padrão Visual</th><th>Prazo</th><th>Com. Owner (1-5)</th><th>Sinal</th><th>Decisão</th><th>Nota (1-5)</th></tr></thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={`${row.sprint}-${row.comprador}-${row.empresa}-${row.produto}`}>
                <SprintCell rows={rows} index={index} />
                <td>{row.comprador}</td><td>{row.empresa}</td><td>{row.produto}</td>
                <td><YesNoSelect value={row.pt} onChange={(value) => updateField(['buyerProduct', index, 'pt'], value)} /></td>
                <td><YesNoSelect value={row.pv} onChange={(value) => updateField(['buyerProduct', index, 'pv'], value)} /></td>
                <td><YesNoSelect value={row.prazo} onChange={(value) => updateField(['buyerProduct', index, 'prazo'], value)} /></td>
                <td><ScoreSelect value={row.comOwner} onChange={(value) => updateField(['buyerProduct', index, 'comOwner'], value)} /></td>
                <td><YesNoSelect value={row.sinal} onChange={(value) => updateField(['buyerProduct', index, 'sinal'], value)} /></td>
                <td><DecisionSelect value={row.decisao} onChange={(value) => updateField(['buyerProduct', index, 'decisao'], value)} /></td>
                <td><ScoreSelect value={row.nota} onChange={(value) => updateField(['buyerProduct', index, 'nota'], value)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableScroll>
      <div className="note note-orange">Militar só avalia Caça; Setor Privado só avalia Transporte; Governo avalia os dois. Linhas fora do papel do comprador podem ficar em branco.</div>
    </section>
  );
}
