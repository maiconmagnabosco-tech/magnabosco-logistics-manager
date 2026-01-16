#!/bin/bash
# Referência Rápida - Magnabosco Logistics Manager

# =============================================================================
# LOCALIZAÇÃO DO PROJETO
# =============================================================================

# Caminho:
# c:\Users\maicon John\Cockpit

# =============================================================================
# INICIALIZAÇÃO (Execute uma única vez)
# =============================================================================

# Instalar dependências
cd "c:\Users\maicon John\Cockpit"
npm install

# =============================================================================
# RODAR A APLICAÇÃO (Todos os dias)
# =============================================================================

# Terminal 1 - Webhook Server (deixe aberto)
cd "c:\Users\maicon John\Cockpit"
ts-node server/webhookHandler.ts

# Terminal 2 - React App (deixe aberto)
cd "c:\Users\maicon John\Cockpit"
npm run dev

# Depois abra no navegador:
# http://localhost:5173

# =============================================================================
# COMPILAR PARA PRODUÇÃO
# =============================================================================

npm run build

# Resultado em: dist/

# =============================================================================
# COMANDOS ÚTEIS
# =============================================================================

# Ver health status do servidor
curl http://localhost:5000/api/health

# Sincronizar dados manualmente (já feito automaticamente a cada 30s)
curl http://localhost:5000/api/sync-sheets \
  -H "Authorization: Bearer seu-api-key-aqui"

# Parar a aplicação
# Pressione: Ctrl + C (em ambos os terminais)

# =============================================================================
# VARIÁVEIS DE AMBIENTE (.env.local)
# =============================================================================

# REACT_APP_SHEETS_API_KEY=seu-api-key-super-secreto
# REACT_APP_SHEETS_ID=1h3onr9mXLIaj6sTqEzWeQ3bi2Ct62BeENGyUMIJrn-A
# REACT_APP_SHEETS_NAME=Dados
# REACT_APP_WEBHOOK_URL=http://localhost:5000/api/webhook/sheets-update
# REACT_APP_SYNC_INTERVAL=30000

# =============================================================================
# URLS IMPORTANTES
# =============================================================================

# Aplicação Local:
# http://localhost:5173

# Webhook Server:
# http://localhost:5000/api/health

# Google Sheet:
# https://docs.google.com/spreadsheets/d/1h3onr9mXLIaj6sTqEzWeQ3bi2Ct62BeENGyUMIJrn-A

# Google Apps Script Console:
# https://script.google.com/home/start

# =============================================================================
# ESTRUTURA DE ARQUIVOS
# =============================================================================

# Serviço de sincronização:
# services/googleSheetsService.ts

# Servidor de webhooks:
# server/webhookHandler.ts

# Script Google:
# google-apps-script.js

# Configuração:
# .env.local

# Aplicação principal:
# App.tsx

# =============================================================================
# DOCUMENTAÇÃO
# =============================================================================

# Comece aqui:
# COMECE_AQUI.md

# Guia rápido:
# QUICK_START.md

# Setup completo:
# GOOGLE_SHEETS_SETUP.md

# Visão técnica:
# INTEGRATION_SUMMARY.md

# Este arquivo:
# REFERENCE.sh

# =============================================================================
# TROUBLESHOOTING
# =============================================================================

# ts-node não encontrado?
npm install -g ts-node

# Porta 5000 já em uso?
# Use outra porta no servidor/webhookHandler.ts

# Dados não sincronizam?
# 1. Verifique se webhook está rodando (ts-node)
# 2. Veja se API key está correta em .env.local
# 3. Abra DevTools (F12) > Console para erros

# Componentes não encontrados?
# Verifique estrutura em components/

# =============================================================================
# DEPLOY EM PRODUÇÃO
# =============================================================================

# Heroku:
heroku create seu-app-name
heroku config:set REACT_APP_SHEETS_API_KEY=***
git push heroku main

# Vercel:
npm install -g vercel
vercel

# =============================================================================
# DADOS ESPERADOS NA PLANILHA
# =============================================================================

# Colunas:
# - Nº Circuito (ex: 001)
# - ORIGEM (ex: Goiás)
# - DESTINO (ex: São Paulo)
# - META (ex: 100)
# - REALIZADO (ex: 85)

# =============================================================================
# FLUXO DE ATUALIZAÇÃO
# =============================================================================

# Usuário edita Google Sheet
#         ↓
# Google Apps Script dispara
#         ↓
# Envia webhook para localhost:5000
#         ↓
# Servidor cacheia dados
#         ↓
# React App sincroniza (a cada 30s)
#         ↓
# Dashboard atualiza + Notificações exibem

# =============================================================================
# DICAS
# =============================================================================

# - Deixe os 2 terminais abertos enquanto trabalha
# - A sincronização é automática a cada 30 segundos
# - Verifique a conexão no ícone "Sincronizado" no header
# - Edições na planilha aparecem automaticamente na app
# - Não precisa recarregar a página

# =============================================================================
