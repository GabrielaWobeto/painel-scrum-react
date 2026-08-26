import { useApp } from '../context/AppContext.jsx';

const TABS = [
  ['setup', 'Configuração'],
  ['alunos', 'Alunos'],
  ['escalacao', 'Escalação'],
  ['sm', 'Scrum Master'],
  ['owner', 'Owner'],
  ['po', 'Product Owner'],
  ['dev', 'Developers'],
  ['buyerProf', 'Compradores (Papel)'],
  ['buyerProduct', 'Compradores (Produto)'],
  ['corrupsab', 'Corrupção & Sabotagem'],
  ['result', 'Resultado Final'],
];

export default function Tabs() {
  const { activeTab, setActiveTab } = useApp();

  return (
    <nav className="tabs" aria-label="Abas do painel">
      {TABS.map(([key, label]) => (
        <button
          type="button"
          key={key}
          className={`tab ${activeTab === key ? 'active' : ''}`}
          onClick={() => setActiveTab(key)}
        >
          {label}
        </button>
      ))}
    </nav>
  );
}
