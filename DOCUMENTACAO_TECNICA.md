# 📑 Documentação Técnica: Sistema de Gestão de Clínica

## Introdução

Este documento destina-se à equipa de desenvolvimento e manutenção do sistema **Gestão Clínica Estética**. O objetivo é fornecer uma visão detalhada da arquitetura, padrões de código e regras de negócio implementadas. Ele serve como o guia definitivo para entender como os diferentes módulos (Backend Laravel e Frontend React) interagem e como estender o sistema de forma sustentável.

A leitura deste guia é **obrigatória** para qualquer desenvolvedor que deseje contribuir para o projeto, garantindo a consistência e integridade do software proprietário.

## 1. Arquitetura do Sistema
Descreva como as duas tecnologias conversam.

*   **Backend**: Laravel 12 (API Restful / Monólito Híbrido).
*   **Frontend**: React 18 (Single Page Application - SPA) via Inertia.js 2.0.
*   **Comunicação**: Protocolo Inertia (XHR/JSON) que permite renderizar componentes React como views do Laravel, sem a necessidade de uma API REST tradicional separada para todas as interações.
*   **Autenticação**: Sessão Laravel Tradicional (Guard `web`), integrada via Sanctum/Inertia.

## 2. Estrutura de Pastas (Organização)
Defina onde cada lógica reside para manter a escalabilidade.

### Backend (Laravel)
*   **`app/Http/Controllers`**: Controladores principais que gerem a lógica de requisição e resposta (ex: `AgendamentoController`, `TratamentoController`). Retornam respostas `Inertia::render`.
*   **`app/Models`**: Definição das entidades Eloquent e relacionamentos com o banco de dados (ex: `Agendamento`, `Tratamento`, `User`).
*   **`app/Http/Requests`**: Validações de entrada de formulários (FormRequests) para garantir a integridade dos dados antes de chegarem ao controller.
*   **`routes/web.php`**: Definição de todas as rotas da aplicação, incluindo middleware de autenticação.

### Frontend (React/Inertia)
*   **`resources/js/Pages`**: Telas completas da aplicação (ex: `Agendamentos.jsx`, `Clientes.jsx`, `Dashboard.jsx`). Cada arquivo aqui corresponde a uma rota do Laravel.
*   **`resources/js/Components`**: Componentes reutilizáveis de interface (botões, modais, inputs, cards).
*   **`resources/js/Layouts`**: Layouts persistentes da aplicação (ex: Barra de navegação lateral/topo).
*   **`resources/js/app.jsx`**: Ponto de entrada da aplicação React e configuração do Inertia.

## 3. Padrões de Desenvolvimento
Estabeleça as regras para manter o código limpo.

*   **Nomenclatura**:
    *   JS/React: `camelCase` para variáveis e funções, `PascalCase` para componentes.
    *   PHP/Laravel: `snake_case` para colunas de banco de dados e variáveis, `PascalCase` para Classes.
*   **Tratamento de Erros**:
    *   Backend: Validação automática do Laravel redireciona com erros na `session`.
    *   Frontend: O hook `usePage().props.errors` do Inertia é usado para exibir mensagens de erro nos formulários.
*   **Estilos**:
    *   Framework: **Bootstrap 5.3**.
    *   Classes utilitárias para layout e espaçamento.
    *   CSS customizado em `resources/css/app.css` apenas para temas específicos (cores, cards personalizados).

## 4. Regras de Negócio (Lógica Funcional)
Nesta seção, descreve-se o funcionamento dos módulos:

*   **Módulo de Agenda (`AgendamentoController`)**:
    *   Permite agendar tratamentos para clientes.
    *   Validação de disponibilidade: Impede sobreposição de horários para o mesmo profissional/sala (lógica implícita ou futura).
    *   Gestão de Ausências: Profissionais podem registar ausências (estado 5) que bloqueiam a agenda.
*   **Módulo de Tratamentos (`TratamentoController`)**:
    *   Catálogo de serviços com nome, duração e preço.
    *   Cálculo de popularidade: O sistema analisa o histórico de agendamentos para destacar os tratamentos mais procurados na semana/mês.
*   **Módulo de Clientes (`UserController`)**:
    *   Cadastro completo com dados pessoais e clínicos.
    *   Histórico: Visualização de todos os agendamentos e tratamentos passados do cliente.

## 5. Guia de Endpoints (Rotas Principais)
Listagem das rotas principais definidas em `web.php`:

| Método | Rota | Controller | Descrição |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | - | Página de Login |
| `GET` | `/dashboard` | `DashboardController@index` | Visão geral e estatísticas |
| `GET` | `/clientes` | `UserController@index` | Lista de clientes |
| `POST` | `/storeUser` | `UserController@storeUser` | Criar novo cliente |
| `GET` | `/agendamentos` | `AgendamentoController@index` | Calendário de agendamentos |
| `POST` | `/agendamentos` | `AgendamentoController@store` | Criar agendamento/ausência |
| `GET` | `/tratamentos` | `TratamentoController@index` | Lista de tratamentos |
| `GET` | `/estoque` | `ProdutoController@index` | Gestão de inventário |

## 6. Conclusão

O sistema **Gestão Clínica Estética** foi projetado com uma arquitetura robusta e moderna, unindo a segurança e performance do **Laravel 12** com a interatividade do **React**. A escolha do **Inertia.js** permitiu o desenvolvimento de uma SPA (Single Page Application) sem a complexidade de gerir uma API REST separada, resultando num código mais limpo e de fácil manutenção.

Pontos fortes da arquitetura implementada:
*   **Escalabilidade**: A estrutura modular (Controllers, Models, Components) facilita a adição de novas funcionalidades, como módulos financeiros mais complexos ou integração com APIs externas.
*   **Performance**: O uso do Vite garante tempos de carregamento rápidos, e a gestão de estado eficiente no React proporciona uma experiência de uso fluida.
*   **Segurança**: Todas as entradas são validadas no backend (FormRequests) e o acesso é controlado via middleware de autenticação e sessões seguras do Laravel.

Este documento serve como referência técnica para garantir que futuras evoluções do sistema mantenham os padrões de qualidade e organização estabelecidos.
