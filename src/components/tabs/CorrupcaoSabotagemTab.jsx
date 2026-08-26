import { BUYERS, TIMES } from '../../data/constants.js';
import { useApp } from '../../context/AppContext.jsx';
import { computeCorrupcaoPontos, computeSabotagemPontos } from '../../utils/scoring.js';

export default function CorrupcaoSabotagemTab() {
  const { data, updateField } = useApp();
  const corrupcao = data.corrupcao;
  const sabotagem = data.sabotagem;
  const corrupcaoPontos = computeCorrupcaoPontos(corrupcao);
  const sabotagemPontos = computeSabotagemPontos(sabotagem);
  const empresas = [data.meta.empresaA, data.meta.empresaB];
  const compradoresCorruptiveis = BUYERS.filter((buyer) => buyer !== 'Militar');

  return (
    <section className="panel">
      <h2>Corrupção &amp; Sabotagem</h2>
      <div className="desc">Estes dois mecanismos são baseados em regras fixas — os pontos abaixo são calculados automaticamente.</div>
      <div className="grid2">
        <div className="mini-card">
          <h3>🔒 Corruptor (Owner)</h3>
          <div className="mini-row">
            <label>Empresa do corruptor</label>
            <select value={corrupcao.empresaCorruptora} onChange={(event) => updateField(['corrupcao', 'empresaCorruptora'], event.target.value)}>
              {empresas.map((empresa) => <option key={empresa} value={empresa}>{empresa}</option>)}
            </select>
          </div>

          <div className="checkbox-row spaced-row">
            <input id="primeiraDescoberta" type="checkbox" checked={corrupcao.primeiraDescoberta} onChange={(event) => updateField(['corrupcao', 'primeiraDescoberta'], event.target.checked)} />
            <label htmlFor="primeiraDescoberta">1ª descoberta ocorreu</label>
          </div>

          {corrupcao.primeiraDescoberta && (
            <div className="mini-row">
              <label>Comprador que aceitou (1ª vez)</label>
              <select value={corrupcao.primeiroComprador} onChange={(event) => updateField(['corrupcao', 'primeiroComprador'], event.target.value)}>
                <option value="">—</option>
                {compradoresCorruptiveis.map((buyer) => <option key={buyer} value={buyer}>{buyer}</option>)}
              </select>
            </div>
          )}

          <div className="checkbox-row spaced-row">
            <input id="segundaDescoberta" type="checkbox" checked={corrupcao.segundaDescoberta} disabled={!corrupcao.primeiraDescoberta} onChange={(event) => updateField(['corrupcao', 'segundaDescoberta'], event.target.checked)} />
            <label htmlFor="segundaDescoberta">2ª descoberta ocorreu (mesmo assim)</label>
          </div>

          {corrupcao.segundaDescoberta && (
            <div className="mini-row">
              <label>Comprador que aceitou (2ª vez)</label>
              <select value={corrupcao.segundoComprador} onChange={(event) => updateField(['corrupcao', 'segundoComprador'], event.target.value)}>
                <option value="">—</option>
                {compradoresCorruptiveis.map((buyer) => <option key={buyer} value={buyer}>{buyer}</option>)}
              </select>
            </div>
          )}

          <div className="mini-row result-separator"><label><strong>Pontos do corruptor</strong></label><span className={`pts ${corrupcaoPontos.corruptor < 0 ? 'neg' : ''}`}>{corrupcaoPontos.corruptor.toFixed(1)}</span></div>
          {Object.entries(corrupcaoPontos.compradores).map(([buyer, points]) => (
            <div className="mini-row" key={buyer}><label>Pontos — {buyer}</label><span className={`pts ${points < 0 ? 'neg' : ''}`}>{points.toFixed(1)}</span></div>
          ))}
          <div className="note note-red compact-note">O corruptor nunca troca de papel e continua negociando normalmente, mesmo após ser descoberto.</div>
        </div>

        <div className="mini-card">
          <h3>🔒 Sabotador (Developer)</h3>
          <div className="mini-row">
            <label>Empresa do sabotador</label>
            <select value={sabotagem.empresaSabotador} onChange={(event) => updateField(['sabotagem', 'empresaSabotador'], event.target.value)}>
              {empresas.map((empresa) => <option key={empresa} value={empresa}>{empresa}</option>)}
            </select>
          </div>
          <div className="mini-row">
            <label>Time do sabotador</label>
            <select value={sabotagem.timeSabotador} onChange={(event) => updateField(['sabotagem', 'timeSabotador'], event.target.value)}>
              {TIMES.map((time) => <option key={time} value={time}>{time}</option>)}
            </select>
          </div>
          <div className="mini-row">
            <label>Tipo de ação</label>
            <select value={sabotagem.tipoAcao} onChange={(event) => updateField(['sabotagem', 'tipoAcao'], event.target.value)}>
              <option value="vazar">Vazar informação</option>
              <option value="atrapalhar">Atrapalhar decisões/produção</option>
            </select>
          </div>

          <div className="checkbox-row spaced-row">
            <input id="sabotadorDescoberto" type="checkbox" checked={sabotagem.descoberto} onChange={(event) => updateField(['sabotagem', 'descoberto'], event.target.checked)} />
            <label htmlFor="sabotadorDescoberto">Sabotador foi descoberto</label>
          </div>

          {sabotagem.descoberto && (
            <>
              <div className="mini-row">
                <label>Denúncias consecutivas recebidas</label>
                <select value={sabotagem.denunciasConsecutivas} onChange={(event) => updateField(['sabotagem', 'denunciasConsecutivas'], Number(event.target.value))}>
                  <option value="0">0</option><option value="1">1</option><option value="2">2</option>
                </select>
              </div>
              <div className="checkbox-row spaced-row">
                <input id="areaSoube" type="checkbox" checked={sabotagem.areaSoubeECalou} onChange={(event) => updateField(['sabotagem', 'areaSoubeECalou'], event.target.checked)} />
                <label htmlFor="areaSoube">PO/colegas da área sabiam e ficaram calados</label>
              </div>
            </>
          )}

          <div className="mini-row result-separator"><label><strong>Pontos do sabotador</strong></label><span className={`pts ${sabotagemPontos.sabotador < 0 ? 'neg' : ''}`}>{sabotagemPontos.sabotador.toFixed(1)}</span></div>
          <div className="mini-row"><label><strong>Pontos da área/time</strong></label><span className={`pts ${sabotagemPontos.area < 0 ? 'neg' : sabotagemPontos.area > 0 ? 'pos' : ''}`}>{sabotagemPontos.area > 0 ? '+' : ''}{sabotagemPontos.area.toFixed(1)}</span></div>
          <div className="mini-row"><label><strong>Demitido?</strong></label><span className="pts">{sabotagemPontos.demitido ? 'SIM — vai para o time RIVAL' : 'Não'}</span></div>
        </div>
      </div>
    </section>
  );
}
