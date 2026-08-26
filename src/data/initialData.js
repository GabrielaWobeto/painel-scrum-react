import { BUYERS, SEED_NAMES, SPRINTS, TIMES } from './constants.js';

export function buildInitialData(
  empresaA = 'Maverick Aviation',
  empresaB = 'SkyForge Ind. Aeronáutica',
) {
  const empresas = [empresaA, empresaB];
  const sm = [];
  const owner = [];
  const po = [];
  const dev = [];
  const buyerProf = [];
  const buyerProduct = [];

  SPRINTS.forEach((sprint) => {
    empresas.forEach((empresa) => {
      sm.push({ sprint, empresa, conduziu: '', removeu: '', ajudou: '', nota: '', obs: '' });
      owner.push({ sprint, empresa, comunicacao: '', negociacao: '', alinhamento: '', notaGeral: '', obs: '' });

      TIMES.forEach((time) => {
        po.push({ sprint, empresa, time, requisitos: '', testes: '', reuniao: '', nota: '', obs: '' });
        dev.push({ sprint, empresa, time, qualidade: '', processo: '', colaboracao: '', notaTime: '', destaque: '' });
      });

      buyerProduct.push({ sprint, comprador: 'Governo', empresa, produto: 'Caça', pt: '', pv: '', prazo: '', comOwner: '', sinal: '', decisao: '', nota: '' });
      buyerProduct.push({ sprint, comprador: 'Governo', empresa, produto: 'Transporte', pt: '', pv: '', prazo: '', comOwner: '', sinal: '', decisao: '', nota: '' });
      buyerProduct.push({ sprint, comprador: 'Militar', empresa, produto: 'Caça', pt: '', pv: '', prazo: '', comOwner: '', sinal: '', decisao: '', nota: '' });
      buyerProduct.push({ sprint, comprador: 'Setor Privado', empresa, produto: 'Transporte', pt: '', pv: '', prazo: '', comOwner: '', sinal: '', decisao: '', nota: '' });
    });

    BUYERS.forEach((comprador) => {
      buyerProf.push({ sprint, comprador, checklist: '', decisoes: '', feedback: '', nota: '', obs: '' });
    });
  });

  return {
    meta: {
      turma: '',
      data: '',
      empresaA,
      empresaB,
      fontScale: 16,
    },
    sm,
    owner,
    po,
    dev,
    buyerProf,
    buyerProduct,
    corrupcao: {
      empresaCorruptora: empresaA,
      primeiraDescoberta: false,
      primeiroComprador: '',
      segundaDescoberta: false,
      segundoComprador: '',
    },
    sabotagem: {
      empresaSabotador: empresaA,
      timeSabotador: 'Caça',
      tipoAcao: 'atrapalhar',
      denunciasConsecutivas: 0,
      descoberto: false,
      areaSoubeECalou: false,
    },
    weights: { sm: 1, owner: 1, po: 1, dev: 2, buyer: 2 },
    teamNames: {
      [empresaA]: { Caça: 'Esquadrão Falcon', Transporte: 'Falcon Carggo' },
      [empresaB]: { Caça: 'SkyForge Combat', Transporte: 'SkyForge Transport' },
    },
    alunos: SEED_NAMES.map((nome, index) => ({
      id: index + 1,
      nome,
      empresa: '',
      time: '',
      papel: '',
    })),
  };
}

export function normalizeData(candidate) {
  const empresaA = candidate?.meta?.empresaA || 'Maverick Aviation';
  const empresaB = candidate?.meta?.empresaB || 'SkyForge Ind. Aeronáutica';
  const base = buildInitialData(empresaA, empresaB);

  if (!candidate || typeof candidate !== 'object') return base;

  return {
    ...base,
    ...candidate,
    meta: { ...base.meta, ...(candidate.meta || {}) },
    weights: { ...base.weights, ...(candidate.weights || {}) },
    corrupcao: { ...base.corrupcao, ...(candidate.corrupcao || {}) },
    sabotagem: { ...base.sabotagem, ...(candidate.sabotagem || {}) },
    teamNames: { ...base.teamNames, ...(candidate.teamNames || {}) },
    alunos: Array.isArray(candidate.alunos) ? candidate.alunos : base.alunos,
    sm: Array.isArray(candidate.sm) ? candidate.sm : base.sm,
    owner: Array.isArray(candidate.owner) ? candidate.owner : base.owner,
    po: Array.isArray(candidate.po) ? candidate.po : base.po,
    dev: Array.isArray(candidate.dev) ? candidate.dev : base.dev,
    buyerProf: Array.isArray(candidate.buyerProf) ? candidate.buyerProf : base.buyerProf,
    buyerProduct: Array.isArray(candidate.buyerProduct) ? candidate.buyerProduct : base.buyerProduct,
  };
}
