# 🎯 PASSO A PASSO - Iniciar o Projeto

## Caminho do Projeto
```
c:\Users\maicon John\Cockpit
```

---

## ✅ PASSO 1: Preparar o Ambiente (Execute UMA VEZ)

### 1.1 Abra PowerShell como Administrador

Tecla Windows + X → PowerShell Admin

### 1.2 Instale as dependências

```powershell
cd "c:\Users\maicon John\Cockpit"
npm install
```

Espere terminar (pode levar alguns minutos).

---

## 🚀 PASSO 2: Iniciar a Aplicação (TODOS OS DIAS)

### 2.1 Abra 2 PowerShells

**PowerShell #1** - Webhook Server
```powershell
cd "c:\Users\maicon John\Cockpit"
ts-node server/webhookHandler.ts
```

Você verá:
```
🚀 Webhook server running on http://localhost:5000
```

**NÃO FECHE ESTA JANELA** - deixe rodando.

---

**PowerShell #2** - Aplicação React
```powershell
cd "c:\Users\maicon John\Cockpit"
npm run dev
```

Você verá:
```
VITE v6.2.0  ready in 123 ms
➜  Local:   http://localhost:5173/
```

---

### 2.2 Abra no Navegador

Clique neste link ou copie na barra de endereço:
```
http://localhost:5173
```

**Pronto! A aplicação está rodando! 🎉**

---

## 📊 PASSO 3: Testar a Integração

### 3.1 Abra a Planilha Google Sheets

Link:
```
https://docs.google.com/spreadsheets/d/1h3onr9mXLIaj6sTqEzWeQ3bi2Ct62BeENGyUMIJrn-A
```

### 3.2 Edite um Dado Qualquer

Exemplo: Na célula "REALIZADO", mude um valor de 50 para 75

### 3.3 Observe a Aplicação

Você verá:
- ✅ Status muda para "🟢 Sincronizado"
- 📬 Nova notificação aparece
- 📊 Dados atualizam na dashboard

---

## 🔴 SE ALGO DER ERRO

### Erro: "ts-node not found"
```powershell
npm install -g ts-node
```

### Erro: "Port 5000 already in use"
Use porta diferente:
```powershell
$env:PORT = 3000
ts-node server/webhookHandler.ts
```

### Erro: "Cannot find module"
Reinstale:
```powershell
rm -r node_modules
npm install
```

### App não conecta ao Google Sheets
1. Verifique se webhook está rodando (PowerShell #1)
2. Abra: http://localhost:5000/api/health
3. Deve retornar `{"status": "healthy", ...}`

---

## 📝 CONFIGURAÇÃO COMPLETA (Opcional)

Para configurar a integração **completa** com Google Apps Script:

👉 Leia: [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md)

---

## ⏹️ Como Parar

### Parar a aplicação
Na janela do PowerShell: **Ctrl + C**

### Parar o webhook
Na outra janela do PowerShell: **Ctrl + C**

---

## 📱 Resumo Rápido

```
┌─────────────────────────────────────────────────┐
│ INICIAR APLICAÇÃO (2 JANELAS)                   │
├─────────────────────────────────────────────────┤
│ Janela 1: ts-node server/webhookHandler.ts      │
│ Janela 2: npm run dev                           │
│                                                 │
│ Depois: Abra http://localhost:5173 no navegador│
└─────────────────────────────────────────────────┘
```

---

## 🎓 Próximas Etapas (Quando Estiver Pronto)

1. **Setup Completo**: GOOGLE_SHEETS_SETUP.md
2. **Deploy**: Heroku ou Vercel (para acessar de qualquer lugar)
3. **Customização**: Adicionar mais recursos conforme necessário

---

**Dúvidas?** Veja os outros arquivos README:
- 📄 QUICK_START.md
- 📄 GOOGLE_SHEETS_SETUP.md
- 📄 INTEGRATION_SUMMARY.md

**Bom trabalho! 💪**
