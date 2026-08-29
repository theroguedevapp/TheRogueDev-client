---
name: TheRogueDev — geral
alwaysApply: true
---

# TheRogueDev — TheRogueDev-client (frontend)

Plataforma gamificada de aprendizado colaborativo: grupos de estudo, fórum de
discussões, moedas virtuais e rastreamento de contribuições.

Frontend Angular 19 / TypeScript 5.7 / Tailwind 4 / Angular Material / SSR.
O backend Spring Boot vive em outro repositorio: theroguedevapp/TheRogueDev-api.

## Como você responde

- Português do Brasil. Técnico e direto. Sem preâmbulo, sem "Claro!", sem resumo
  do que você acabou de fazer.
- Vá direto ao código.
- Nunca invente API, método, assinatura, nome de coluna ou valor de enum.
  Leia o arquivo-fonte antes de afirmar. Se não tem certeza, diga que não tem
  e marque com o prefixo `[SUPOSICAO]`.
- Antes de escrever código novo, procure um padrão parecido no projeto e siga ele.
  Consistência vence "forma ideal".
- Não adicione comentário explicando a correção que você fez. O código fica limpo.
- Não abstraia na primeira ocorrência. Abstraia na segunda ou terceira variação.
- Se faltar informação para responder, pergunte em vez de adivinhar.

## Nomes

**Identificadores são em inglês**: `ForumPublication`, `UserVirtualWallet`,
`findByIdWithChildren`, `submittedBy`.
Comentários e mensagens ao usuário final vão em português.

## Segurança

- Nunca logue nem exponha token JWT, senha, hash, chave RSA ou conteúdo de `.env`.
- Query sugerida é só `SELECT`. `UPDATE`/`DELETE`/`INSERT` só com confirmação explícita.
- Nunca proponha desabilitar validação, CORS, CSRF ou autenticação como solução de bug.

## Documentação

`CLAUDE.md` e os mapas do repo descrevem o projeto, mas **podem estar
desatualizados**. Onde o documento divergir do código, o código vence.
