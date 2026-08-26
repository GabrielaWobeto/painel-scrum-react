import { BUYERS, BUYER_IMAGES, COMPANY_IMAGES, ROLE_COLORS, TIMES } from '../../data/constants.js';
import { useApp } from '../../context/AppContext.jsx';

function getCompanyImages(data, empresa) {
  return empresa === data.meta.empresaA ? COMPANY_IMAGES.A : COMPANY_IMAGES.B;
}

function CompanyBlock({ empresa }) {
  const { data } = useApp();
  const images = getCompanyImages(data, empresa);
  const sm = data.alunos.find((aluno) => aluno.papel === 'Scrum Master' && aluno.empresa === empresa);
  const owner = data.alunos.find((aluno) => aluno.papel === 'Owner/Stakeholder' && aluno.empresa === empresa);

  function teamRoster(time) {
    return data.alunos
      .filter((aluno) => aluno.empresa === empresa && aluno.time === time && ['Product Owner', 'Developer'].includes(aluno.papel))
      .sort((a, b) => (a.papel === 'Product Owner' ? -1 : b.papel === 'Product Owner' ? 1 : a.nome.localeCompare(b.nome)));
  }

  return (
    <div className="company-block">
      <div className="company-header">
        <img src={images.logo} alt={`Identidade visual de ${empresa}`} />
        <div>
          <h2>{empresa}</h2>
          <div className="company-meta">
            Scrum Master: {sm ? sm.nome : <span className="tag-unassigned">não atribuído</span>} · Owner: {owner ? owner.nome : <span className="tag-unassigned">não atribuído</span>}
          </div>
        </div>
      </div>

      <div className="teams-grid">
        {TIMES.map((time) => {
          const roster = teamRoster(time);
          return (
            <div className="team-card" key={time}>
              <img className="team-img" src={images[time]} alt={data.teamNames[empresa]?.[time] || time} />
              <div className="team-body">
                <h3>{data.teamNames[empresa]?.[time] || time}</h3>
                <ul className="role-list">
                  {!roster.length ? (
                    <li><span className="tag-unassigned">ninguém atribuído ainda</span></li>
                  ) : roster.map((aluno) => (
                    <li key={aluno.id}>
                      <span>{aluno.nome}</span>
                      <span className="role-badge" style={{ background: ROLE_COLORS[aluno.papel] || '#6E6E6E' }}>
                        {aluno.papel === 'Product Owner' ? 'PO' : 'Dev'}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function EscalacaoTab() {
  const { data } = useApp();
  const empresas = [data.meta.empresaA, data.meta.empresaB];

  return (
    <section className="panel">
      <h2>Escalação</h2>
      <div className="desc">Visão de equipe com as imagens originais fornecidas no projeto.</div>

      {empresas.map((empresa) => <CompanyBlock key={empresa} empresa={empresa} />)}

      <h2>Compradores</h2>
      <div className="buyers-strip">
        {BUYERS.map((buyer) => {
          const aluno = data.alunos.find((item) => item.papel === `Comprador - ${buyer}`);
          return (
            <div className="buyer-card" key={buyer}>
              <img src={BUYER_IMAGES[buyer]} alt={buyer} />
              <div className="buyer-body">
                <h3>{buyer}</h3>
                <div>{aluno ? aluno.nome : <span className="tag-unassigned">não atribuído</span>}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
