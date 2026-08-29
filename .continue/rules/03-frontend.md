---
name: TheRogueDev — frontend (Angular 19)
description: Convenções do TheRogueDev-client. Angular 19 standalone, TypeScript, Tailwind 4, Material, SSR.
globs: "**/*.{ts,html,css,scss,json}"
---

# Frontend — TheRogueDev-client

Angular 19 **standalone** — não existe NgModule. Componente novo nasce
`standalone: true` com `imports: []` próprio.

```
src/app/
├── pages/        # um componente por rota
├── component/    # reutilizáveis (header, footer)
├── services/     # base/, auth/, user/
├── guards/       # authGuard
├── interfaces/   # tipos de domínio
└── enviroments/  # SIM, com esse typo. É o nome real da pasta.
```

## SSR — a pegadinha que mais quebra aqui

A app roda com Angular Universal + Express. Todo código que toca `window`,
`document`, `localStorage` ou dispara HTTP **precisa** ser guardado:

```ts
constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
if (!isPlatformBrowser(this.platformId)) { return of(null); }
```

Esquecer isso não quebra o `ng serve` — quebra o build SSR e a hidratação.

## HTTP

- `BaseApiService<T>` (abstrata, em `services/base/`) expõe `get/post/put/patch/delete`
  protegidos, monta query string e já trata SSR + erro. **Service novo deve estendê-la.**
- Estado atual: `AuthService` **não** estende `BaseApiService` — usa `HttpClient` direto
  com `BehaviorSubject` para o usuário logado. É legado; não replique em service novo,
  e não descreva o projeto como se tudo passasse pela base.
- Base URL vem de `ENVIRONMENT.apiUrl` (`enviroments/enviroment.ts`) = `http://localhost:8080/api`.
  O caminho passado ao service já começa em `/v1/...`. Nunca hardcode host.
- JWT viaja em **cookie HTTP-only**. Não leia, não grave e não guarde token em
  `localStorage` — o browser manda sozinho.

## Estilo

- Tailwind 4 + Angular Material (tema Azure Blue). Prefira utilitário Tailwind a CSS solto.
- Cores do tema, use o nome — não o hex: `primary-color` `#171F27`, `secondary-color` `#1E2933`,
  `emerald` `#2EC0AD` (accent/CTA), `lg-grey` `#ACB8A3`, `deep-dark` `#0E141B`,
  `smooth-white` `#F5F7F8`, `soft-black` `#333`.
- Ícones: Font Awesome Free 7.

## Convenções

- Rota nova entra em `app.routes.ts`; se for autenticada, com `canActivate: [authGuard]`.
- RxJS: retorne `Observable`, componha com `pipe`. Faça `unsubscribe` (ou `takeUntilDestroyed`)
  em subscription manual dentro de componente.
- Tipos de domínio em `interfaces/`. Evite `any` em assinatura pública.
- Existe `.spec.ts` para os componentes e services (Karma + Jasmine). Arquivo novo
  acompanha spec, mesmo que mínimo.
- Budget de build: 500 KB inicial (warning) / 1 MB (erro). Dependência pesada precisa
  de justificativa.
