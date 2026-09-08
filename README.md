# Client Action Plans — Startip

Planos de ação personalizados para clientes, com checklist compartilhada via Supabase.

## Setup

### 1. Criar repo no GitHub
```bash
gh repo create startipmkt-blip/client-action-plans --private
git remote add origin https://github.com/startipmkt-blip/client-action-plans.git
git push -u origin main
```

### 2. Conectar na Vercel
- Acesse [vercel.com/new](https://vercel.com/new)
- Importe o repositório `client-action-plans`
- Framework: **Other**
- Output directory: `.` (raiz)
- Deploy

### 3. Configurar Supabase
- Abra o SQL Editor no seu Supabase
- Execute o conteúdo de `supabase-setup.sql`
- Copie a **URL** e **anon key** do projeto
- Edite `lib/supabase.js` com as credenciais

### 4. Domínio (opcional)
- Na Vercel, vá em Settings > Domains
- Adicione ex: `planos.startip.com.br`

## Estrutura
```
clientes/
  mariah-ozonioterapia/
    index.html          ← Plano personalizado
  jose-chaveiro/
    index.html
  ...
lib/
  supabase.js           ← Integração com checklist
  copy-buttons.js       ← Botões de copiar mensagem
styles/
  base.css              ← Design system compartilhado
index.html              ← Página inicial (lista de clientes)
supabase-setup.sql      ← SQL para criar tabela no Supabase
```

## Novo cliente
Crie uma pasta em `clientes/nome-do-cliente/` com um `index.html` baseado no template existente.

## Links
Cada cliente acessa: `seudominio.com/clientes/nome-do-cliente/`
