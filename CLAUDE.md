# TheRogueDev Client — Instruções para Claude Code

## Sobre

Frontend da plataforma **TheRogueDev** — plataforma gamificada de aprendizado colaborativo (Angular 19, TypeScript, Tailwind CSS, SSR).

Leia `FRONTEND.md` para o mapeamento completo do projeto antes de qualquer desenvolvimento.

## Stack

| Layer | Tech |
|---|---|
| Framework | Angular 19.2.0 (Standalone Components) |
| Linguagem | TypeScript 5.7.2 |
| Estilo | Tailwind CSS 4.1.13 + Angular Material 19.2.19 (tema Azure Blue) |
| SSR | Angular Universal + Express |
| HTTP | Angular HttpClient via `BaseApiService` |
| Ícones | Font Awesome Free 7.1.0 |
| Testes | Karma + Jasmine |

## Estrutura Principal

```
src/app/
├── component/        # Componentes reutilizáveis (header, footer)
├── pages/            # Um componente por rota (home, login, register, user-profile)
├── services/
│   ├── base/         # BaseApiService — toda chamada HTTP passa aqui
│   ├── auth/         # AuthService (login, logout, validate)
│   └── user/         # UserService (perfil)
├── guards/           # authGuard — protege rotas autenticadas
├── interfaces/       # Modelos TypeScript (user.interface.ts)
└── enviroments/      # Dev / prod / build (typo "enviroments" é intencional)
```

## Rotas

| Path | Componente | Protegida |
|---|---|---|
| `/` | HomeComponent | Não |
| `/login` | LoginComponent | Não |
| `/register` | RegisterComponent | Não |
| `/user` | UserProfileComponent | Sim (`authGuard`) |

## Convenções Obrigatórias

- **Standalone components** — não usar NgModules
- Toda chamada HTTP via `BaseApiService` (nunca `HttpClient` diretamente nos componentes)
- Autenticação por **cookie HTTP-only** — não usar `localStorage` para token
- Para código client-only, verificar `isPlatformBrowser()` (SSR ativo)
- Novos componentes de página → `pages/<nome>/`
- Novos componentes reutilizáveis → `component/<nome>/`
- Novos serviços → `services/<domínio>/`
- Novas interfaces → `interfaces/<domínio>/`
- Criar spec file `.spec.ts` junto com cada componente/serviço

## Tema de Cores (Tailwind)

```
primary-color:    #171F27  (background principal — dark blue)
secondary-color:  #1E2933  (sidebar, cards)
emerald:          #2EC0AD  (accent, CTAs)
lg-grey:          #ACB8A3  (texto secundário)
deep-dark:        #0E141B  (background mais escuro)
smooth-white:     #F5F7F8  (texto claro, fundos claros)
soft-black:       #333     (texto padrão)
```

## Backend

- URL (dev): `http://localhost:8080/api`
- Autenticação: JWT via cookie HTTP-only (enviado automaticamente pelo browser)
- CORS: backend aceita `http://localhost:4200`
- OAuth2 Google: redireciona para o backend

## Scripts

```bash
npm start           # Dev server → http://localhost:4200
npm run build       # Build produção → dist/the-rogue-dev-client/
npm test            # Testes Karma
npm run serve:ssr   # Serve com SSR
```
