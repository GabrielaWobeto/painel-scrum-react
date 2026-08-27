# Painel de Avaliação — Simulação Scrum Competitiva

O objetivo do nosso projeto foi migrar o painel de avaliação da Simulação Scrum Competitiva, que originalmente rodava em HTML, CSS e JavaScript puro, para o React. A gente manteve todas as telas e regras que já funcionavam no sistema antigo, só que agora com o código organizado em componentes para ficar mais fácil de manter.

## Tecnologias que usamos

React + Vite

JavaScript e CSS

LocalStorage para salvar os dados

SheetJS (XLSX) para ler planilhas


## Funcionalidades do sistema

Configura a turma, data, empresas, equipes e os pesos das notas.

Cadastra os alunos, define os papéis de cada um e aceita importação por planilha do Excel (.xlsx / .xls).

Mostra a escalação dos times usando as imagens originais fornecidas para os setores e fabricantes.

Permite avaliar Scrum Master, Product Owner, Stakeholders, Developers, compradores e a entrega dos produtos.

Aplica os descontos/regras de corrupção e sabotagem.

Calcula a nota final de cada empresa automaticamente.

Permite ajustar o tamanho da fonte da tela para facilitar a visualização.


## Como os dados são salvos

Os dados ficam gravados diretamente no LocalStorage do navegador. O sistema salva sozinho a cada mudança importante, então é possível atualizar a página ou fechar o navegador sem problemas.

O sistema também possui um botão de salvamento manual e a opção de exportar tudo em um arquivo .json. O arquivo JSON também pode ser carregado posteriormente para restaurar o estado de aplicação

## Estrutura das pastas

O projeto foi dividido em diversos componentes para não deixar a lógica misturada com a parte visual:

src/
├── components/
│   ├── common/
│   ├── tabs/
│   ├── Header.jsx
│   └── Tabs.jsx
├── context/
│   └── AppContext.jsx
├── data/
│   ├── constants.js
│   └── initialData.js
├── styles/
│   └── global.css
├── utils/
│   ├── scoring.js
│   └── storage.js
├── App.jsx
└── main.jsx

Para rodar o projeto será necessário o Node.js já instalado no seu computador.

1. Baixe o projeto e entre na pasta



git clone <LINK_DO_REPOSITORIO>
cd <NOME_DA_PASTA>

2. Instale as dependências



npm install

3. Inicie o projeto



npm run dev

O terminal irá mostrar o endereço local para o projeto abrir no navegador.

Para gerar os arquivos finais de produção, basta usar o comando:

npm run build
