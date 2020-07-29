# Replicador de banco de dados
>
> Este projeto foi realizado na matéria de Tópicos Especiais I, do curso de Ciência da Computação / UNESC.
> O intuito do projeto, é replicar os dados de um banco pré definido (origem) para outro banco de dados (destino/backup).

## Pré-requisitos

Para rodar o progama na sua máquina, são necessárias as seguintes configurações/instalações:
> - **Node** com versão igual a 11.10.1 - [Node Donwload](https://nodejs.org/pt-br/download/)
> - **Npm** com versão superior ou igual que 6.7.0 - [Npm Download](https://www.npmjs.com/package/download)
> - **Yarn** com versão superior ou igual que 1.22.0 [Yarn Download](https://classic.yarnpkg.com/en/docs/install/)
> - **Gulp** com versão CLI superior ou igual que 2.3.0 [Gulp Documentation ](https://gulpjs.com/)
> - **MySQL Workbench** com versão superior ou igual que 8.0 [MySQL Workbench Download](https://dev.mysql.com/downloads/workbench/)

## Instalação

> Clone esse projeto em seu computador com o comando:
> ```
> 	git clone https://github.com/gugaburigo29/replicador-banco-dados.git
> ```
> Acesse a pasta api do projeto pelo seu terminal:
> ```
> 	cd replicador-banco-dados/api
> ```
> Já na pasta da api em seu terminal, digite o seguinte comando:
> ```
> 	yarn install
> ```
> Agora acesse a pasta client do projeto pelo seu terminal:
> ```
> 	cd ../client
> ```
> Já na pasta client em seu terminal, digite o seguinte comando:
> ```
> 	yarn install
> ```
> Agora basta pegar o banco de dados de origem e de destino na patas "dumps", e criar os databases no MySQL Workbench:
> ```
> 	cd replicador-banco-dados/dumps
> ```

## Execução
>
> Após ter configurado o projeto e ter aguardado a instalação das dependencias de desenvolvimento, é necessário dar um start no back-end e no front-end como segue:
>
> Primeiramente deve-se garantir que o servidor do banco de dados, neste caso o servidor do MySQL  esteja ligado.
> 
> Após dar um start no servidor do banco de dados, acesse a pasta client do projeto pelo seu terminal:
> ```
> 	cd replicador-banco-dados/client
> ```
> Após acessar a pasta, execute o seguinte comando:
> ```
> 	yarn start
> ```
> Abra outro terminal, e acesse a pasta api do projeto pelo seu terminal:
> ```
> 	cd ../api
> ```
> Após acessar a pasta, execute os seguintes comandos:
> ```
> 	gulp
> 	yarn start
> ```
> A aplicação estará disponível para visualização em seu navegador, caso isso não aconteça automaticamente abre o navegador no seguinte endereço: http://localhost:3000/

## Funcionalidades

> Este projeto visa a funcionalidade de ser:
>
> - Replicador de um banco de dados pré definido;
> - Automatizar as replicações, após o tempo estabelecido do processo;

## Autores

> - **Luis Gustavo Búrigo Alexandre** - Software Developer - [Github](https://github.com/gugaburigo29)
> - **Vinicius Spada Melo** - Software Developer - [Github](https://github.com/ViniciussMelo)

<div align="center" style="width: 100%">
  <img alt="Logo" title="#logo" src=".assets/video_replicador_banco.gif">
</div>
