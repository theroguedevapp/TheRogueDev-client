# TheRogueDev — Frontend Map

## Stack

| Layer | Tech |
|---|---|
| Language | TypeScript 5.7.2 |
| Framework | Angular 19.2.0 |
| Build | Angular CLI 19.2.15 |
| Package Manager | npm |
| Styling | Tailwind CSS 4.1.13 + Angular Material 19.2.19 |
| Icons | Font Awesome Free 7.1.0 |
| HTTP | Angular HttpClient |
| SSR | Angular Universal + Express |
| Testes | Karma + Jasmine |

## Entry Points

| Arquivo | Função |
|---|---|
| `src/main.ts` | Bootstrap da aplicação (client) |
| `src/main.server.ts` | Bootstrap SSR |
| `src/server.ts` | Servidor Express para SSR |
| `src/app/app.config.ts` | Configuração Angular (providers) |
| `src/app/app.routes.ts` | Definição de rotas |

## Estrutura de Pastas

```
src/app/
├── app.component.ts/.html/.css     # Root component (router-outlet + header + footer)
├── app.config.ts                   # Providers: Router, HttpClient, Hydration
├── app.routes.ts                   # Rotas da aplicação
├── component/                      # Componentes reutilizáveis
│   ├── header/                     # Navbar + menu do usuário + logout
│   └── footer/                     # Footer estático
├── pages/                          # Componentes de página (um por rota)
│   ├── home/                       # Landing page (pública)
│   ├── login/                      # Formulário login + OAuth2 Google
│   ├── register/                   # Formulário de cadastro
│   └── user-profile/               # Perfil do usuário (rota protegida)
├── services/
│   ├── base/
│   │   └── base-api.service.ts     # Classe abstrata para HTTP (GET, POST, PUT, PATCH, DELETE)
│   ├── auth/
│   │   └── auth.service.ts         # Login, logout, validação de token
│   └── user/
│       └── user.service.ts         # Dados e atualização do perfil
├── guards/
│   └── auth.guard.ts               # Protege rotas autenticadas, redireciona se não autenticado
├── interfaces/
│   └── user/
│       └── user.interface.ts       # Modelo de dados do usuário
└── enviroments/
    ├── enviroment.ts               # Dev: apiUrl = http://localhost:8080/api
    ├── enviroment-prod.ts          # Prod: URL do backend em produção
    └── enviroment.build.ts         # Build-time env
```

## Rotas

| Path | Componente | Guard |
|---|---|---|
| `/` | `HomeComponent` | — |
| `/login` | `LoginComponent` | — |
| `/register` | `RegisterComponent` | — |
| `/user` | `UserProfileComponent` | `authGuard` |

## Serviços

### `BaseApiService` (abstrato)
- Métodos: `get()`, `post()`, `put()`, `patch()`, `delete()`
- Query string builder interno
- Verifica se está rodando no browser (SSR safety)
- Retorna `Observable<T>` com RxJS

### `AuthService`
- `login(email, password)` → POST `/api/v1/auth/login`
- `logout()` → POST `/api/v1/auth/logout`
- `validate()` → GET `/api/v1/auth/validate`
- JWT recebido e enviado via cookie HTTP-only (automático pelo browser)

### `UserService`
- `getProfile()` → GET `/api/v1/user-profiles/`
- `updateProfile(data)` → PUT/PATCH `/api/v1/user-profiles/`

## Tema Visual

**Tailwind Custom Colors** (`tailwind.config.js`):

| Nome | Hex | Uso |
|---|---|---|
| `primary-color` | `#171F27` | Background principal (dark blue) |
| `secondary-color` | `#1E2933` | Sidebar / cards |
| `emerald` | `#2EC0AD` | Accent / CTA |
| `lg-grey` | `#ACB8A3` | Texto secundário |
| `deep-dark` | `#0E141B` | Background mais escuro |
| `smooth-white` | `#F5F7F8` | Texto claro / backgrounds claros |
| `soft-black` | `#333` | Texto padrão |

**Material Theme:** Azure Blue

## Scripts

```bash
npm start           # ng serve → http://localhost:4200
npm run build       # Build produção → dist/the-rogue-dev-client
npm run watch       # Build contínuo (dev)
npm test            # Testes com Karma
npm run serve:ssr   # Produção com SSR
```

## Configuração Angular (app.config.ts)

```typescript
provideZoneChangeDetection({ eventCoalescing: true })
provideRouter(routes)
provideClientHydration(withEventReplay())  // SSR hydration
provideHttpClient()
```

## Convenções do Projeto

- **Standalone components** (Angular 19, sem NgModules)
- Um componente por página na pasta `pages/`
- Componentes reutilizáveis em `component/`
- Toda chamada HTTP passa pelo `BaseApiService`
- Autenticação via cookie HTTP-only (sem localStorage para token)
- Arquivos de ambiente em `enviroments/` (typo intencional no projeto)
- Spec files `.spec.ts` para todos componentes e serviços
- SSR habilitado — verificar `isPlatformBrowser()` para código client-only

## Comunicação com o Backend

- Base URL (dev): `http://localhost:8080/api`
- Autenticação: cookie HTTP-only com JWT (enviado automaticamente)
- CORS configurado no backend para aceitar `http://localhost:4200`
- Google OAuth2: redireciona para backend → `{backendUrl}/login/oauth2/code/google`

## Build Output

- Dev output: `dist/the-rogue-dev-client/`
- Budget: 500KB initial (warning), 1MB (error)
- Produção: otimização, hash de assets, lazy loading
