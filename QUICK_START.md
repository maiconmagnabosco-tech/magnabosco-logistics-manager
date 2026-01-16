# 🚀 Guia Rápido - Iniciar Aplicação

## 📍 Localização do Projeto
```
c:\Users\maicon John\Cockpit
```

## 🎯 Iniciar Localmente (3 passos)

### 1️⃣ Terminal 1 - Webhook Server
```powershell
cd "c:\Users\maicon John\Cockpit"
ts-node server/webhookHandler.ts
```

Esperado:
```
🚀 Webhook server running on http://localhost:5000
```

### 2️⃣ Terminal 2 - Aplicação
```powershell
cd "c:\Users\maicon John\Cockpit"
npm run dev
```

Esperado:
```
VITE v6.2.0  ready in 123 ms

➜  Local:   http://localhost:5173/
```

### 3️⃣ Abra no Navegador
```
http://localhost:5173
```

---

## 📊 Acessar Planilha Integrada
```
https://docs.google.com/spreadsheets/d/1h3onr9mXLIaj6sTqEzWeQ3bi2Ct62BeENGyUMIJrn-A
```

---

## 🔧 Configuração Completa
Para configurar a integração com Google Sheets:

👉 Leia: [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md)

---

## 📁 Estrutura de Arquivos Criados

```
Cockpit/
├── server/
│   └── webhookHandler.ts          ← Servidor para webhooks
├── services/
│   └── googleSheetsService.ts     ← Lógica de sincronização
├── google-apps-script.js          ← Script para Google Sheets
├── GOOGLE_SHEETS_SETUP.md         ← Guia de configuração
├── .env.local                     ← Variáveis de ambiente
├── App.tsx                        ← Atualizado com sincronização
└── package.json                   ← Dependências atualizadas
```

---

## ⚡ Checklist de Configuração

- [ ] Dependências instaladas: `npm install`
- [ ] `.env.local` configurado com API_KEY segura
- [ ] Google Apps Script implantado na planilha
- [ ] Webhook URL atualizada no Apps Script
- [ ] Disparador automático (trigger) criado no Apps Script
- [ ] Webhook Server rodando na porta 5000
- [ ] Aplicação rodando na porta 5173

---

## 💡 Próximas Etapas

1. **Teste Local**: Edite a planilha e veja as notificações em tempo real
2. **Deploy**: Implante em Vercel/Heroku (veja GOOGLE_SHEETS_SETUP.md)
3. **Customização**: Ajuste as regras de sincronização conforme necessário

---

**Dúvidas?** Veja troubleshooting em [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md#troubleshooting)
