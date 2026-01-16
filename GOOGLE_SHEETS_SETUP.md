# 🔗 Configuração: Integração Google Sheets

## 📋 Visão Geral
Este documento descreve como configurar a integração automática entre o **Google Sheets** e a aplicação **Magnabosco Logistics Manager**.

**Planilha**: https://docs.google.com/spreadsheets/d/1h3onr9mXLIaj6sTqEzWeQ3bi2Ct62BeENGyUMIJrn-A

**Estrutura esperada**:
- `Nº Circuito` - ID único do circuito
- `ORIGEM` - Cidade/Zona de origem
- `DESTINO` - Cidade de destino
- `META` - Volume contratado
- `REALIZADO` - Volume realizado

---

## ⚙️ Passo 1: Configurar Google Apps Script

### 1.1 Criar Script no Google Sheet

1. Abra a planilha: https://docs.google.com/spreadsheets/d/1h3onr9mXLIaj6sTqEzWeQ3bi2Ct62BeENGyUMIJrn-A
2. Clique em **Extensões** > **Apps Script**
3. Delete o código padrão
4. Copie todo o conteúdo de [google-apps-script.js](./google-apps-script.js)
5. Cole no editor do Apps Script
6. **Salve** o projeto (Ctrl+S)

### 1.2 Configurar Variáveis
No Apps Script, edite essas variáveis (linhas 1-10):

```javascript
const SHEET_ID = '1h3onr9mXLIaj6sTqEzWeQ3bi2Ct62BeENGyUMIJrn-A'; // ✅ Correto
const SHEET_NAME = 'Dados'; // Mude se sua aba tiver outro nome
const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbybO2Dv7GQCT0eypzDxO-dE9dyGr44opBDRreOCBzsHffItBF5yyzL1y6yCUon0Xxs/exec'; // 🔄 Substituir
const API_KEY = 'your-secure-api-key'; // 🔐 Substituir
```

### 1.3 Implantar como Web App

1. No Apps Script, clique em **Deploy** (canto superior direito)
2. Clique em **New Deployment** (símbolo +)
3. Selecione tipo: **Web app**
4. Preencha:
   - **Execute as**: Sua conta Google
   - **Who has access**: Anyone
5. Clique **Deploy**
6. Copie a URL gerada (será como `https://script.google.com/macros/s/{SCRIPT_ID}/usercache`)

---

## 🚀 Passo 2: Configurar Backend Webhook

### 2.1 Instalar Dependências

```bash
cd c:\Users\maicon\ John\Cockpit
npm install
```

### 2.2 Configurar Variáveis de Ambiente

Edite `.env.local`:

```env
REACT_APP_SHEETS_API_KEY=seu-api-key-super-secreto-aqui
REACT_APP_SHEETS_ID=1h3onr9mXLIaj6sTqEzWeQ3bi2Ct62BeENGyUMIJrn-A
REACT_APP_SHEETS_NAME=Dados
REACT_APP_WEBHOOK_URL=http://localhost:5000/api/webhook/sheets-update
REACT_APP_SYNC_INTERVAL=30000
```

### 2.3 Iniciar Webhook Server

Em um terminal separado:

```bash
cd c:\Users\maicon\ John\Cockpit
ts-node server/webhookHandler.ts
```

Você verá:
```
🚀 Webhook server running on http://localhost:5000
📌 Google Sheets updates will be received at: http://localhost:5000/api/webhook/sheets-update
```

### 2.4 Atualizar URL no Google Apps Script

De volta no Google Apps Script, edite:

```javascript
const WEBHOOK_URL = 'http://localhost:5000/api/webhook/sheets-update'; // Para testes locais
// OU
const WEBHOOK_URL = 'https://seu-dominio.com/api/webhook/sheets-update'; // Para produção
```

---

## 💻 Passo 3: Rodar a Aplicação

Em outro terminal:

```bash
cd c:\Users\maicon\ John\Cockpit
npm run dev
```

A aplicação abrirá em: **http://localhost:5173**

---

## 🔄 Passo 4: Configurar Disparador Automático (Triggers)

No Google Apps Script:

1. Clique em **Triggers** (relógio ⏰ na esquerda)
2. Clique **+ Create new trigger**
3. Configure:
   - **Function**: `onSheetChange`
   - **Deployment**: `Head`
   - **Event source**: `From spreadsheet`
   - **Event type**: `On change`
4. Clique **Save**

Agora a função será chamada automaticamente quando a planilha mudar!

---

## 📱 Fluxo de Funcionamento

```
┌─────────────────────────────────────┐
│   Google Sheets (Planilha)          │
│  Usuário adiciona/edita dados       │
└──────────────┬──────────────────────┘
               │
               ↓ (Trigger: onChange)
┌─────────────────────────────────────┐
│   Google Apps Script                │
│  - Detecta mudança                  │
│  - Coleta dados da planilha         │
│  - Envia via webhook                │
└──────────────┬──────────────────────┘
               │
               ↓ (POST request)
┌─────────────────────────────────────┐
│   Webhook Server (Node.js)          │
│  - Recebe dados                     │
│  - Valida API key                   │
│  - Cacheia dados                    │
└──────────────┬──────────────────────┘
               │
               ↓ (Polling)
┌─────────────────────────────────────┐
│   React App                         │
│  - Sincroniza a cada 30s            │
│  - Atualiza estado                  │
│  - Mostra notificações              │
└─────────────────────────────────────┘
```

---

## 🧪 Teste Manual

1. **Abra dois navegadores**:
   - Aba 1: Aplicação (http://localhost:5173)
   - Aba 2: Google Sheet (link da planilha)

2. **Na planilha**, adicione uma nova linha:
   ```
   Nº Circuito: 001
   ORIGEM: Goiás
   DESTINO: São Paulo
   META: 100
   REALIZADO: 85
   ```

3. **Na aplicação**:
   - Você verá um ícone verde "✅ Sincronizado" no header
   - Uma notificação aparecerá com os dados
   - Os dados aparecerão na dashboard

---

## 🔐 Segurança

- **API Key**: Mude `your-secure-api-key` para algo aleatório e seguro
- **WEBHOOK_URL**: Em produção, use HTTPS
- **Nunca** compartilhe a API Key publicamente
- Configure CORS apropriadamente no backend

---

## 🚀 Produção (Vercel / Heroku)

### Opção 1: Vercel (Recomendado)

```bash
npm install -g vercel
vercel
```

Variáveis de ambiente na Vercel:
```
REACT_APP_SHEETS_API_KEY=***
REACT_APP_WEBHOOK_URL=https://seu-projeto.vercel.app/api/webhook/sheets-update
```

### Opção 2: Heroku

```bash
heroku create seu-app-name
heroku config:set REACT_APP_SHEETS_API_KEY=***
git push heroku main
```

---

## 📞 Troubleshooting

### ❌ "Webhook failed to connect"
- Verifique se `ts-node server/webhookHandler.ts` está rodando
- Confirme a URL no Google Apps Script

### ❌ "Unauthorized (401)"
- Confira se a API Key está igual em `.env.local` e no Google Apps Script

### ❌ "Sheet not found"
- Verifique `SHEET_NAME` no Apps Script
- A aba deve existir exatamente com esse nome

### ❌ Dados não aparecem
- Abra DevTools (F12) > Network
- Procure requisições para `/api/sync-sheets`
- Confirme que retorna status 200

---

## 📚 Arquivos Relacionados

- [googleSheetsService.ts](./services/googleSheetsService.ts) - Serviço de sincronização
- [google-apps-script.js](./google-apps-script.js) - Script no Google Sheets
- [webhookHandler.ts](./server/webhookHandler.ts) - Servidor Node.js
- [.env.local](./.env.local) - Variáveis de ambiente

---

**Pronto! 🎉 Sua integração está configurada!**
