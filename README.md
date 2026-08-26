# Painel de Avaliação — Simulação Scrum Competitiva (React)

Portabilidade para React do painel original em HTML/CSS/JavaScript usado na Simulação Scrum Competitiva.

## Funcionalidades

- Configuração de turma, data, empresas, times e pesos da nota.
- Lista de alunos com atribuição de papéis, empresa e time.
- Importação de lista de alunos via Excel (`.xlsx`/`.xls`).
- Escalação visual com as imagens originais fornecidas.
- Avaliação de Scrum Master, Owner, Product Owner e Developers.
- Avaliação dos compradores por papel e por produto.
- Regras automáticas de corrupção e sabotagem.
- Resultado final com média ponderada e ajustes automáticos.
- Controle de tamanho da fonte.
- Salvamento automático no `localStorage` a cada alteração relevante.
- Botão de salvamento manual no `localStorage`.
- Exportação e importação de backup em JSON.
- Recuperação automática dos dados ao reabrir o navegador.

## Requisitos

- Node.js 20.19+ ou 22.12+.
- npm.

## Instalação

No terminal, dentro da pasta do projeto:

```bash
npm install
```

## Rodar localmente

```bash
npm run dev
```

Abra o endereço informado pelo Vite no terminal (normalmente `http://localhost:5173`).

## Gerar versão de produção

```bash
npm run build
```

A pasta gerada será `dist/`. Ela não deve ser versionada no GitHub.

## Testar a versão de produção

```bash
npm run preview
```

## Persistência dos dados

O estado completo do painel é gravado no `localStorage` do navegador de duas formas:

1. Automaticamente, após alterações no painel.
2. Manualmente, pelo botão **Salvar agora**.

Também é possível exportar um arquivo JSON como backup e carregá-lo novamente depois.

## Lista de alunos

A lista original está pré-carregada no código e a planilha original foi mantida em:

`public/data/alunos.xlsx`

Na aba **Alunos**, é possível importar outra planilha Excel usando a mesma lógica do sistema original.

## Imagens originais

As imagens fornecidas com o sistema original foram mantidas em `public/images/` e são usadas na aba **Escalação**.

## Estrutura principal

```text
src/
├── components/
│   ├── common/
│   └── tabs/
├── context/
├── data/
├── styles/
├── utils/
├── App.jsx
└── main.jsx
```

## Netlify

O repositório contém `netlify.toml` com:

- comando de build: `npm run build`
- pasta publicada: `dist`

No Netlify, basta conectar o repositório GitHub e fazer o deploy.

## Git

O `.gitignore` já impede o versionamento de `node_modules`, `dist`, arquivos de ambiente e arquivos temporários.

Nunca envie `node_modules/` ou `dist/` para o repositório.
