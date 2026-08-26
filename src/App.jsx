import Header from './components/Header.jsx';
import Tabs from './components/Tabs.jsx';
import { useApp } from './context/AppContext.jsx';
import ConfigTab from './components/tabs/ConfigTab.jsx';
import AlunosTab from './components/tabs/AlunosTab.jsx';
import EscalacaoTab from './components/tabs/EscalacaoTab.jsx';
import ScrumMasterTab from './components/tabs/ScrumMasterTab.jsx';
import OwnerTab from './components/tabs/OwnerTab.jsx';
import ProductOwnerTab from './components/tabs/ProductOwnerTab.jsx';
import DevelopersTab from './components/tabs/DevelopersTab.jsx';
import BuyerRoleTab from './components/tabs/BuyerRoleTab.jsx';
import BuyerProductTab from './components/tabs/BuyerProductTab.jsx';
import CorrupcaoSabotagemTab from './components/tabs/CorrupcaoSabotagemTab.jsx';
import ResultadoTab from './components/tabs/ResultadoTab.jsx';

const TAB_COMPONENTS = {
  setup: ConfigTab,
  alunos: AlunosTab,
  escalacao: EscalacaoTab,
  sm: ScrumMasterTab,
  owner: OwnerTab,
  po: ProductOwnerTab,
  dev: DevelopersTab,
  buyerProf: BuyerRoleTab,
  buyerProduct: BuyerProductTab,
  corrupsab: CorrupcaoSabotagemTab,
  result: ResultadoTab,
};

export default function App() {
  const { activeTab } = useApp();
  const ActivePanel = TAB_COMPONENTS[activeTab] || ConfigTab;

  return (
    <>
      <div className="sticky-shell">
        <Header />
        <Tabs />
      </div>
      <main className="wrap">
        <ActivePanel />
        <div className="footer-note">
          Autosave no navegador ativo. Use “Salvar agora” para gravar manualmente e “Exportar JSON” para manter uma cópia externa.
        </div>
      </main>
    </>
  );
}
