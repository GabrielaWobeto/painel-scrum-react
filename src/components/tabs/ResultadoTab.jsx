import { useApp } from '../../context/AppContext.jsx';
import { computeEmpresaScore } from '../../utils/scoring.js';

export default function ResultadoTab() {
  const { data } = useApp();
  const empresas = [data.meta.empresaA, data.meta.empresaB];
  const scores = empresas.map((empresa) => ({ empresa, ...computeEmpresaScore(data, empresa) }));

  return (
    <section className="panel">
      <h2>Resultado Final</h2>
      <div className="desc">Cálculo automático a partir das médias lançadas em cada aba, ajustado pelos pontos de corrupção/sabotagem.</div>

      <div className="grid2">
        {scores.map((score, index) => (
          <div className={`dash-card dash-card-${index + 1}`} key={score.empresa}>
            <h3>{score.empresa}</h3>
            <div className="big">{score.final !== null ? score.final.toFixed(2) : '—'}</div>
            <div className="breakdown">
              {score.parts.map((part) => (
                <div key={part.key}><span>{part.key}</span><span>{part.val !== null ? part.val.toFixed(2) : '—'}</span></div>
              ))}
              <div className="breakdown-adjustment"><span>Ajuste (corrupção/sabotagem)</span><span>{score.ajuste >= 0 ? '+' : ''}{score.ajuste.toFixed(1)}</span></div>
            </div>
          </div>
        ))}
      </div>

      <div className="note note-orange">A nota final é uma média ponderada das notas médias por papel (pesos configuráveis em Configuração), somada aos pontos fixos de corrupção/sabotagem. Ela não substitui o julgamento do professor.</div>
    </section>
  );
}
