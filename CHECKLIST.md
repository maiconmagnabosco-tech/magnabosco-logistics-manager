# ✅ CHECKLIST DE VERIFICAÇÃO

## 🔍 Verificar se Tudo Está Pronto

### Terminal 1 - Webhook Server
```powershell
cd "c:\Users\maicon John\Cockpit"
ts-node server/webhookHandler.ts
```

**Esperado:**
```
🚀 Webhook server running on http://localhost:5000
📌 Google Sheets updates will be received at: http://localhost:5000/api/webhook/sheets-update
```

✅ Se vir isso → **Webhook OK**

---

### Terminal 2 - React App
```powershell
cd "c:\Users\maicon John\Cockpit"
npm run dev
```

**Esperado:**
```
VITE v6.2.0  ready in 123 ms
➜  Local:   http://localhost:5173/
```

✅ Se vir isso → **App OK**

---

### Navegador - Acessar App
```
http://localhost:5173
```

**Esperado:**
- Tela de login aparece
- Header com ícone de status (🟢 Sincronizado ou similar)
- Notificações funcionam

✅ Se vir isso → **Frontend OK**

---

### Health Check
```
http://localhost:5000/api/health
```

**Esperado:**
```json
{
  "status": "healthy",
  "timestamp": "2026-01-16T...",
  "cachedRows": 0,
  "lastUpdate": "..."
}
```

✅ Se vir isso → **Backend OK**

---

## 🧪 Teste Funcional

### Passo 1: Abra a Planilha
```
https://docs.google.com/spreadsheets/d/1h3onr9mXLIaj6sTqEzWeQ3bi2Ct62BeENGyUMIJrn-A
```

### Passo 2: Edite um Valor
Na célula "REALIZADO", mude um valor de:
```
ANTES: 50
DEPOIS: 75
```

### Passo 3: Observe a App
Aguarde até 30 segundos...

**Esperado:**
- ✅ Status muda para "🟢 Sincronizado"
- ✅ Notificação aparece
- ✅ Dashboard atualiza com novo valor

✅ Se vir isso → **Integração FUNCIONANDO!**

---

## 🐛 Se Algo Não Funcionar

### ❌ Terminal 1 dá erro "ts-node not found"
```powershell
npm install -g ts-node
```

### ❌ Porta 5000 já está em uso
Mude em `server/webhookHandler.ts`:
```typescript
const PORT = process.env.PORT || 3000; // Use 3000 em vez de 5000
```

### ❌ Componentes não encontrados
```powershell
rm -r node_modules
npm install
```

### ❌ App não sincroniza
1. Verifique se webhook está rodando
2. Abra DevTools (F12) > Console
3. Procure erros vermelhos
4. Veja se `.env.local` tem API_KEY

### ❌ CORS error
O servidor Express já tem CORS configurado. Se erro persistir:

Verifique [GOOGLE_SHEETS_SETUP.md#troubleshooting](./GOOGLE_SHEETS_SETUP.md#troubleshooting)

---

## 📊 Checklist Final

- [ ] Webhook server rodando na porta 5000
- [ ] React app rodando na porta 5173
- [ ] App carrega sem erros
- [ ] Status de sincronização aparece no header
- [ ] Edição na planilha sincroniza com app
- [ ] Notificações aparecem
- [ ] DevTools (F12) não mostra erros vermelhos
- [ ] Health check retorna status "healthy"

**Se todos estiverem ✅ → Tudo funciona!**

---

## 🎯 Próximas Fases

### ✅ Fase 1: Teste Local (AGORA)
Você está aqui! Verifique o checklist acima.

### 🔄 Fase 2: Setup Completo (PRÓXIMA)
Leia [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md)

### 🚀 Fase 3: Deploy em Produção (DEPOIS)
Heroku ou Vercel quando estiver pronto.

---

## 📞 Precisa de Ajuda?

1. **Verifique a documentação:**
   - [COMECE_AQUI.md](./COMECE_AQUI.md) - Guia passo a passo
   - [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md) - Setup completo
   - [REFERENCE.sh](./REFERENCE.sh) - Todos os comandos

2. **Abra o console do navegador:**
   - F12 → Console → Procure erros vermelhos

3. **Verifique health status:**
   - http://localhost:5000/api/health

4. **Veja os logs dos terminais:**
   - Erros aparecem nos terminais onde você rodou `ts-node` e `npm run dev`

---

**Tudo pronto? Sucesso! 🎉**
