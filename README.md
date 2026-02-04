# Gestão Clínica Estética

> **Sistema Proprietário de Gestão de Clínica**
>
> Este software é confidencial e destinado ao uso exclusivo da clínica.

## Sobre o Projeto
O sistema **Gestão Clínica Estética** é uma solução completa para administração de clínicas de estética, focada na otimização do fluxo de trabalho e na experiência do cliente.

### Módulos Principais
- **Dashboard**: Visão geral do desempenho da clínica com indicadores chave (KPIs).
- **Agenda Inteligente**: Gestão de marcações, controlo de ausências e listagem diária/semanal.
- **Gestão de Clientes**: Fichas completas de pacientes, histórico de tratamentos e anamnese.
- **Catálogo de Tratamentos**: Gestão de serviços, preços e análise de popularidade.
- **Controlo de Stock**: Gestão de produtos e inventário (Módulo Estoque).

## Documentação Completa
Para detalhes técnicos aprofundados sobre a arquitetura e desenvolvimento, consulte:
*   [📄 Documentação Técnica](./DOCUMENTACAO_TECNICA.md)
*   [🔧 Guia de Contribuição Interna](./CONTRIBUTING.md)

## Requisitos do Sistema
Para rodar este projeto localmente, você precisará de:
*   **PHP**: 8.2
*   **Node.js**: 18+ e NPM
*   **Composer**
*   **MySQL** 

## Instalação (Ambiente de Desenvolvimento)

Siga estes passos para configurar o projeto na sua máquina:

1.  **Clonar o Repositório**
    ```bash
    git clone <url-do-repositorio>
    cd gestao-clinica-estetica
    ```

2.  **Instalar Dependências de Backend**
    ```bash
    composer install
    ```

3.  **Instalar Dependências de Frontend**
    ```bash
    npm install
    ```

4.  **Configurar Variáveis de Ambiente**
    Faça uma cópia do arquivo de exemplo e configure o banco de dados:
    ```bash
    cp .env.example .env
    ```
    Edite o arquivo `.env` e ajuste as credenciais do banco:
    ```ini
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=clinica_estetica
    DB_USERNAME=root
    DB_PASSWORD=
    ```

5.  **Gerar Chave da Aplicação**
    ```bash
    php artisan key:generate
    ```

6.  **Executar Migrações do Banco de Dados**
    ```bash
    php artisan migrate
    ```

7.  **Compilar Assets e Rodar o Servidor**
    Para desenvolvimento, utilize o comando que inicia tudo (Servidor Laravel, Vite e Queue):
    ```bash
    composer run dev
    ```
    Acesse a aplicação em: `http://localhost:8000` (ou a porta indicada no terminal).

## Solução de Problemas Comuns

### Erro de Extensões PHP
Se encontrar erros como "extensão não encontrada", verifique o seu `php.ini` e garanta que as seguintes linhas **não** têm `;` no início:
```ini
extension=fileinfo
extension=gd
extension=pdo_mysql
extension=openssl
extension=mbstring
```

### Página em Branco ou Erro 500
1. Verifique se o arquivo `.env` existe e tem a `APP_KEY` gerada.
2. Dê permissões de escrita nas pastas de storage:
    ```bash
    chmod -R 775 storage bootstrap/cache
    ```

---
© 2024 Gestão Clínica Estética. Todos os direitos reservados.
