Painel de Avaliação — Simulação Scrum Competitiva

Este projeto foi desenvolvido para a atividade de Desenvolvimento Web com o objetivo de migrar o Painel de Avaliação da Simulação Scrum Competitiva para React.

O sistema original funcionava utilizando HTML, CSS e JavaScript puro. Durante o desenvolvimento, mantivemos as funcionalidades e regras do painel original, mas reorganizamos o código utilizando componentes React para deixar o projeto mais dividido, legível e fácil de manter.

Além da migração para React, o projeto também possui salvamento automático dos dados no navegador, importação de alunos por planilha e possibilidade de salvar e carregar os dados em arquivos JSON.

Sobre o projeto

O painel é utilizado para organizar e acompanhar uma simulação de Scrum realizada em sala de aula.

Através dele é possível:

configurar as empresas e os times;
distribuir os alunos entre os diferentes papéis;
visualizar a escalação;
avaliar os participantes durante as Sprints;
registrar a avaliação dos compradores;
aplicar as regras de corrupção e sabotagem;
calcular automaticamente o resultado final de cada empresa;
salvar e recuperar os dados preenchidos.

A proposta do trabalho não foi criar um sistema diferente do original, mas fazer a migração do sistema existente para React, preservando suas regras e funcionalidades.

Tecnologias utilizadas
React

O React foi utilizado para construir a interface e separar as diferentes partes do sistema em componentes.

Na versão original, grande parte da lógica estava concentrada em um único arquivo JavaScript. Na versão atual, as telas e responsabilidades foram separadas para facilitar a leitura e a manutenção.

Vite

O Vite é utilizado como ambiente de desenvolvimento do projeto.

Ele é responsável por iniciar o servidor local durante o desenvolvimento e também por gerar a versão final do sistema para publicação.

JavaScript

O JavaScript é utilizado em toda a lógica da aplicação, incluindo:

manipulação dos dados;
alteração das avaliações;
regras da simulação;
cálculo das notas;
salvamento;
carregamento de arquivos;
importação de alunos.
CSS

O CSS é responsável pela aparência do painel, incluindo:

cores;
tabelas;
botões;
abas;
cartões;
organização das equipes;
responsividade.

A aparência do painel original foi mantida como referência durante a migração.

LocalStorage

O LocalStorage do navegador é utilizado para realizar o salvamento automático.

Sempre que uma alteração importante é feita, os dados atuais são armazenados no navegador.

Assim, atualizar a página não faz com que todo o trabalho preenchido seja perdido.

SheetJS / XLSX

A biblioteca XLSX é utilizada para ler planilhas do Excel.

Ela permite importar listas de alunos através de arquivos:

.xlsx

ou

.xls

Como o projeto foi organizado

Durante a migração, procuramos separar as responsabilidades do sistema em diferentes arquivos.

A estrutura principal da pasta src ficou organizada da seguinte maneira:

src/
├── components/
│   ├── common/
│   ├── tabs/
│   ├── Header.jsx
│   └── Tabs.jsx
│
├── context/
│   └── AppContext.jsx
│
├── data/
│   ├── constants.js
│   └── initialData.js
│
├── styles/
│   └── global.css
│
├── utils/
│   ├── scoring.js
│   └── storage.js
│
├── App.jsx
└── main.jsx
components

Contém os componentes responsáveis pela interface.

Cada uma das principais abas do sistema possui seu próprio componente, evitando concentrar toda a aplicação no App.jsx.

components/tabs

Contém as telas principais do painel, como:

Configuração;
Alunos;
Escalação;
Scrum Master;
Owner;
Product Owner;
Developers;
Compradores;
Corrupção e Sabotagem;
Resultado Final.
context

O AppContext é responsável pelo estado principal da aplicação.

Ele permite que os diferentes componentes utilizem os mesmos dados e funções sem precisar passar todas as informações manualmente de um componente para outro.

data

Contém informações e valores utilizados pelo sistema, como:

papéis;
empresas;
compradores;
Sprints;
lista inicial de alunos;
estrutura inicial dos dados.
utils

Contém funções auxiliares que não precisam ficar diretamente dentro dos componentes.

Nessa pasta estão, por exemplo:

cálculos das notas;
regras de pontuação;
salvamento;
carregamento;
exportação dos dados.
styles

Contém os estilos globais utilizados no painel.

Como usar o site

O painel foi pensado para ser utilizado seguindo a ordem das abas exibidas na parte superior da página.

1. Configuração

A primeira etapa é acessar a aba Configuração.

Nela podem ser informados:

turma;
data da simulação;
nome da Empresa A;
nome da Empresa B;
nome do time de Caça;
nome do time de Transporte.

Os nomes das empresas já vêm preenchidos inicialmente como:

Maverick Aviation

e

SkyForge Ind. Aeronáutica

Os nomes podem ser alterados.

Quando o nome de uma empresa é modificado, as outras partes do sistema também são atualizadas para utilizar o novo nome.

Pesos da nota final

Na mesma aba também podem ser configurados os pesos utilizados no cálculo do resultado.

Existem pesos para:

Scrum Master;
Owner;
Product Owner;
Developers;
Avaliação dos Compradores.

Esses valores são utilizados posteriormente na aba Resultado Final.

2. Alunos

A aba Alunos é utilizada para organizar todos os participantes da simulação.

O sistema já possui uma lista inicial de alunos.

Para cada aluno é possível selecionar um papel.

Os papéis disponíveis são:

Scrum Master;
Owner/Stakeholder;
Product Owner;
Developer;
Comprador - Governo;
Comprador - Militar;
Comprador - Setor Privado.

Dependendo do papel selecionado, o sistema também solicita a empresa e o time.

Product Owners e Developers podem ser associados ao time de:

Caça;
Transporte.
Pesquisa

Na parte superior da lista existe um campo de pesquisa.

Ao digitar parte do nome de um aluno, a tabela é filtrada automaticamente.

Resumo das vagas

A tela também apresenta um resumo mostrando quantas vagas já foram preenchidas em cada função.

Isso ajuda a verificar se os papéis foram distribuídos corretamente.

3. Importar uma lista de alunos

Na própria aba Alunos existe a opção de importar uma nova lista.

O sistema aceita arquivos:

.xlsx
.xls

Depois de selecionar a planilha, o painel procura os nomes presentes no arquivo e permite substituir a lista atual.

A planilha utilizada como referência também está disponível dentro do projeto em:

public/data/alunos.xlsx
4. Escalação

Depois de distribuir os papéis, a aba Escalação permite visualizar como as empresas ficaram organizadas.

A tela apresenta:

empresa;
Scrum Master;
Owner;
time de Caça;
time de Transporte;
Product Owners;
Developers;
compradores.

As imagens fornecidas junto com o painel original foram mantidas e são utilizadas nessa tela.

Elas estão armazenadas em:

public/images/
Avaliações

Durante a simulação, as abas seguintes podem ser utilizadas para registrar as avaliações de cada Sprint.

5. Scrum Master

A aba Scrum Master permite avaliar o Scrum Master de cada empresa.

Os critérios incluem:

condução correta dos eventos;
remoção de impedimentos;
ajuda na melhoria do time entre as Sprints;
nota de 1 a 5;
observações.
6. Owner / Stakeholder

A aba Owner é utilizada para avaliar o desempenho do Stakeholder ou Owner.

Os critérios incluem:

comunicação com a equipe;
negociação com os compradores;
alinhamento com Scrum Master e Product Owner;
nota geral;
observações.

A avaliação do desempenho do Owner é separada das regras de corrupção.

7. Product Owner

A aba Product Owner contém avaliações para os times de Caça e Transporte de cada empresa.

São avaliados critérios como:

clareza dos requisitos;
acompanhamento dos testes;
realização da reunião de priorização;
nota;
observações.
8. Developers

A aba Developers é utilizada para avaliar o desempenho de cada equipe.

Os critérios incluem:

qualidade do produto;
cumprimento do processo;
colaboração;
nota do time;
destaque individual.

O campo de destaque individual pode ser utilizado para registrar alguma participação que tenha chamado atenção durante a Sprint.

Compradores

O painel possui duas formas diferentes de avaliação relacionadas aos compradores.

9. Compradores — Papel

A aba Compradores (Papel) avalia o desempenho do aluno que está exercendo o papel de comprador.

Os compradores são:

Governo;
Militar;
Setor Privado.

Os critérios incluem:

aplicação do checklist;
coerência das decisões;
feedback nas Reviews;
nota;
observações.
10. Compradores — Produto

A aba Compradores (Produto) é utilizada para registrar a avaliação feita sobre os produtos das empresas.

São avaliados itens como:

padrão técnico;
padrão visual;
prazo;
comunicação com o Owner;
sinal;
decisão;
nota.

As avaliações seguem a divisão prevista na simulação:

Governo: avalia Caça e Transporte.

Militar: avalia Caça.

Setor Privado: avalia Transporte.

Corrupção e Sabotagem
11. Corrupção

Na aba Corrupção & Sabotagem podem ser registrados os acontecimentos relacionados às regras especiais da atividade.

Na parte de corrupção podem ser informados:

empresa do corruptor;
primeira descoberta;
comprador envolvido;
segunda descoberta;
comprador envolvido novamente.

As penalidades correspondentes são calculadas automaticamente pelo sistema.

12. Sabotagem

Na mesma tela também existem as configurações relacionadas ao sabotador.

É possível informar:

empresa do sabotador;
time;
tipo de ação;
se foi descoberto;
quantidade de denúncias;
se os integrantes da área sabiam e permaneceram calados.

O sistema calcula automaticamente:

pontos do sabotador;
pontos da área;
situação de demissão.
Resultado Final

A aba Resultado Final reúne as avaliações registradas nas outras telas.

O resultado utiliza as médias de:

Scrum Master;
Owner;
Product Owner;
Developers;
Compradores.

Essas médias são combinadas de acordo com os pesos definidos na aba Configuração.

Depois também são aplicados os ajustes relacionados à corrupção e sabotagem.

O painel apresenta a pontuação de cada empresa e o detalhamento das médias utilizadas no cálculo.

Como os dados são salvos

O painel possui salvamento automático e também permite gerar um arquivo de backup.

Salvamento automático

As alterações importantes realizadas no sistema são armazenadas no LocalStorage do navegador.

Isso significa que, ao atualizar a página, as informações continuam disponíveis naquele navegador.

Esse salvamento é feito automaticamente durante o uso do sistema.

Salvar dados manualmente

Na parte superior da página existe um botão para salvar os dados manualmente.

Essa opção também permite gerar uma cópia das informações preenchidas.

Exportar JSON

Os dados da simulação podem ser salvos em um arquivo com extensão:

.json

Esse arquivo contém as informações preenchidas no painel, incluindo configurações, alunos, avaliações e regras especiais.

O JSON funciona como um backup e pode ser guardado para continuar o trabalho posteriormente.

Carregar JSON

Também é possível carregar um arquivo JSON criado anteriormente.

Depois de selecionar o arquivo, o painel restaura os dados que estavam salvos.

Isso permite, por exemplo, continuar a avaliação em outro computador.

Controle do tamanho da fonte

Na parte superior do painel existem três botões:

A−
A
A+

A− diminui o tamanho da fonte.

A restaura o tamanho padrão.

A+ aumenta o tamanho da fonte.

Esse recurso é útil principalmente quando o painel é projetado durante a simulação.

Como baixar o projeto

O projeto está disponível no GitHub:

https://github.com/GabrielaWobeto/painel-scrum-react

Existem duas formas de baixar.

Opção 1 — Baixar como ZIP

Essa é a forma mais simples e não exige utilizar Git.

Acesse o repositório no GitHub.

Clique no botão verde:

Code

Depois selecione:

Download ZIP

Após o download, localize o arquivo no computador.

Clique com o botão direito sobre ele e escolha:

Extrair Tudo

Depois abra a pasta extraída.

Como fazer o site funcionar no computador

Para executar o projeto é necessário ter o Node.js instalado.

O Node.js também instala o npm, que é utilizado para baixar as dependências do projeto e iniciar a aplicação.

1. Instalar o Node.js

Caso o computador ainda não possua Node.js, ele deve ser instalado antes de executar o projeto.

Depois da instalação, é possível verificar se funcionou abrindo o Prompt de Comando ou terminal e digitando:

node -v

Depois:

npm -v

Se os dois comandos mostrarem números de versão, a instalação foi concluída.

2. Abrir a pasta do projeto

Depois de baixar e extrair o projeto, abra a pasta:

painel-scrum-react

Ela deve conter arquivos como:

src
public
package.json
package-lock.json
vite.config.js
README.md
3. Abrir o terminal na pasta

No Visual Studio Code, abra a pasta do projeto.

Depois acesse:

Terminal → Novo Terminal

O terminal deverá estar dentro da pasta painel-scrum-react.

4. Instalar as dependências

Digite:

npm install

O npm irá ler o arquivo package.json e baixar automaticamente todas as dependências necessárias.

Esse processo também cria a pasta:

node_modules

A pasta node_modules não é enviada para o GitHub porque pode ser criada novamente executando npm install.

5. Iniciar o site

Depois que a instalação terminar, execute:

npm run dev

O Vite irá iniciar o servidor.

O terminal deverá mostrar um endereço parecido com:

http://localhost:5173/

Abra esse endereço no navegador.

Se a porta 5173 já estiver sendo utilizada, pode aparecer outro número, por exemplo:

http://localhost:5174/

Nesse caso, basta utilizar o endereço mostrado pelo terminal.

Enquanto o site estiver sendo utilizado, o terminal que executou npm run dev deve permanecer aberto.

A utilização do sistema pode ser feita seguindo a ordem das abas disponíveis no menu superior.

---

## 1. Configuração

A primeira aba é a de **Configuração**.

Nela, devem ser preenchidas as informações gerais da simulação:

- Turma;
- Data;
- Nome da Empresa A;
- Nome da Empresa B;
- Nome do time de Caça de cada empresa;
- Nome do time de Transporte de cada empresa.

Os nomes das empresas e dos times já vêm preenchidos inicialmente, mas podem ser alterados.

Ao alterar o nome de uma empresa, o sistema atualiza automaticamente as referências dessa empresa nas outras abas.

Na mesma tela também é possível configurar os pesos utilizados no cálculo da nota final.

Os pesos disponíveis são:

- Scrum Master;
- Owner;
- Product Owner;
- Developers;
- Avaliação dos Compradores.

Esses valores influenciam diretamente o cálculo mostrado na aba **Resultado Final**.

---

## 2. Alunos

A aba **Alunos** é utilizada para organizar os participantes da simulação.

A lista de alunos já vem carregada no sistema.

Para cada aluno, é possível selecionar um papel.

Os papéis disponíveis são:

- Scrum Master;
- Owner/Stakeholder;
- Product Owner;
- Developer;
- Comprador - Governo;
- Comprador - Militar;
- Comprador - Setor Privado.

Dependendo do papel selecionado, também será necessário escolher a empresa e o time do aluno.

Os Product Owners e Developers podem ser associados aos times:

- Caça;
- Transporte.

Na parte superior da tela existe um campo de busca que permite localizar rapidamente um aluno pelo nome.

A aba também apresenta um resumo das vagas preenchidas em cada empresa, facilitando a conferência da distribuição dos papéis.

---

## 3. Importação da lista de alunos

Na parte inferior da aba **Alunos** existe a opção de importar uma nova lista de estudantes.

O sistema aceita arquivos nos formatos:

```text.xlsx.xls
