function average(values) {
  const numbers = values
    .map((value) => Number.parseFloat(value))
    .filter((value) => !Number.isNaN(value));

  if (!numbers.length) return null;
  return numbers.reduce((sum, value) => sum + value, 0) / numbers.length;
}

export function computeCorrupcaoPontos(corrupcao) {
  let corruptor = 0;
  const compradores = {};

  if (corrupcao.primeiraDescoberta) {
    corruptor -= 1;
    if (corrupcao.primeiroComprador) {
      compradores[corrupcao.primeiroComprador] = (compradores[corrupcao.primeiroComprador] || 0) - 1;
    }
  }

  if (corrupcao.segundaDescoberta) {
    corruptor -= 1;
    if (corrupcao.segundoComprador) {
      compradores[corrupcao.segundoComprador] = (compradores[corrupcao.segundoComprador] || 0) - 1;
    }
  }

  return { corruptor, compradores };
}

export function computeSabotagemPontos(sabotagem) {
  let sabotador = 0;
  let area = 0;
  let demitido = false;

  if (sabotagem.descoberto) {
    sabotador -= 1;
    area += sabotagem.areaSoubeECalou ? -1 : 1;

    if (sabotagem.tipoAcao === 'vazar' && sabotagem.denunciasConsecutivas >= 1) {
      demitido = true;
    }

    if (sabotagem.tipoAcao === 'atrapalhar' && sabotagem.denunciasConsecutivas >= 2) {
      demitido = true;
    }
  }

  return { sabotador, area, demitido };
}

export function computeEmpresaScore(data, empresa) {
  const weights = data.weights;
  const smAvg = average(data.sm.filter((row) => row.empresa === empresa).map((row) => row.nota));
  const ownerAvg = average(data.owner.filter((row) => row.empresa === empresa).map((row) => row.notaGeral));
  const poAvg = average(data.po.filter((row) => row.empresa === empresa).map((row) => row.nota));
  const devAvg = average(data.dev.filter((row) => row.empresa === empresa).map((row) => row.notaTime));
  const buyerAvg = average(data.buyerProduct.filter((row) => row.empresa === empresa).map((row) => row.nota));

  const parts = [
    { key: 'Scrum Master', val: smAvg, w: weights.sm },
    { key: 'Owner', val: ownerAvg, w: weights.owner },
    { key: 'Product Owner', val: poAvg, w: weights.po },
    { key: 'Developers', val: devAvg, w: weights.dev },
    { key: 'Avaliação dos Compradores', val: buyerAvg, w: weights.buyer },
  ];

  let sumWeights = 0;
  let sumValues = 0;

  parts.forEach((part) => {
    if (part.val !== null) {
      sumWeights += Number(part.w) || 0;
      sumValues += part.val * (Number(part.w) || 0);
    }
  });

  const base = sumWeights > 0 ? sumValues / sumWeights : null;
  let ajuste = 0;

  const corrupcao = computeCorrupcaoPontos(data.corrupcao);
  const sabotagem = computeSabotagemPontos(data.sabotagem);

  if (data.corrupcao.empresaCorruptora === empresa) ajuste += corrupcao.corruptor;
  if (data.sabotagem.empresaSabotador === empresa) ajuste += sabotagem.sabotador + sabotagem.area;

  return {
    base,
    ajuste,
    final: base !== null ? base + ajuste : null,
    parts,
  };
}
