# Consumer workflow footprint

Date: 2026-09-08

## Maintainer observation

> A instalação instala apenas arquivos necessário? Meus projeto estão com esses ./templates e outros arquivos que não fazem sentido estarem no projeto

## Proposed recording

> Posso registrar em `knowledge/wiki/architecture/` a regra de que o instalador deve manter artefatos internos no pacote ou junto à skill que os usa, evitando espalhá-los na raiz dos produtos?

## Proposed correction

> Minha recomendação: retirar as cópias ociosas e manter ferramentas/templates internos junto às respectivas skills.
>
> A correção precisa atualizar os caminhos e limpar instalações anteriores pelo manifesto, preservando arquivos modificados.

## Maintainer confirmation

> Sim
