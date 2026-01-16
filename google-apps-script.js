/**
 * Google Apps Script for Magnabosco Logistics Manager
 * Deploy as Web App: https://script.google.com/macros/d/{SCRIPT_ID}/usercache
 * 
 * This script monitors changes in the Google Sheet and sends updates to the web app
 */

// Configuration
const SHEET_ID = '1h3onr9mXLIaj6sTqEzWeQ3bi2Ct62BeENGyUMIJrn-A';
const SHEET_NAME = 'Dados'; // Change to your sheet name if different
const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbybO2Dv7GQCT0eypzDxO-dE9dyGr44opBDRreOCBzsHffItBF5yyzL1y6yCUon0Xxs/exec'; // Replace with your endpoint
const API_KEY = 'your-secure-api-key'; // Replace with your API key

/**
 * Get all data from the sheet in the correct format
 */
function getSheetData() {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
  if (!sheet) {
    return { error: 'Sheet not found' };
  }

  const range = sheet.getDataRange();
  const values = range.getValues();
  const headers = values[0];

  // Convert to array of objects
  const data = values.slice(1).map(row => {
    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = row[index];
    });
    return obj;
  });

  return data;
}

/**
 * Send data to the web app webhook
 */
function sendWebhookUpdate(data) {
  const payload = {
    data: data,
    timestamp: new Date().toISOString(),
    sourceSheetId: SHEET_ID
  };

  const options = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'X-Webhook-Secret': API_KEY
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  try {
    const response = UrlFetchApp.fetch(WEBHOOK_URL, options);
    Logger.log('Webhook response: ' + response.getContentText());
    return response.getResponseCode();
  } catch (error) {
    Logger.log('Webhook error: ' + error.toString());
    return false;
  }
}

/**
 * Trigger: Manual sync button (add to sheet UI)
 */
function manualSync() {
  const data = getSheetData();
  if (data.error) {
    Logger.log(data.error);
    return;
  }
  const result = sendWebhookUpdate(data);
  SpreadsheetApp.getUi().alert('Sincronização iniciada! Status: ' + result);
}

/**
 * Trigger: On Change (install via Triggers)
 * Right-click sheet > More > Set up notifications or use Extensions > Apps Script > Triggers
 */
function onSheetChange(e) {
  Logger.log('Sheet change detected: ' + JSON.stringify(e));
  
  // Send update to webhook
  const data = getSheetData();
  if (!data.error) {
    sendWebhookUpdate(data);
  }
}

/**
 * Deploy as Web App endpoint for testing
 */
function doGet(e) {
  return HtmlService.createHtmlOutput('<h2>Magnabosco - Sheet Sync</h2><p>Service running...</p>');
}

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  
  // Verify API key
  if (data.apiKey !== API_KEY) {
    return ContentService.createTextOutput(JSON.stringify({ error: 'Unauthorized' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  // Handle sync request
  const sheetData = getSheetData();
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    data: sheetData,
    timestamp: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Create custom menu in Google Sheet
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Magnabosco')
    .addItem('🔄 Sincronizar Agora', 'manualSync')
    .addItem('⚙️ Configurar Webhooks', 'showConfig')
    .addToUi();
}

function showConfig() {
  const html = HtmlService.createHtmlOutput(`
    <style>
      body { font-family: Arial; padding: 15px; }
      .config-item { margin: 10px 0; }
      .code { background: #f5f5f5; padding: 10px; border-radius: 5px; font-family: monospace; }
      button { background: #4285f4; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; }
    </style>
    <h3>⚙️ Configuração de Webhooks</h3>
    <div class="config-item">
      <strong>Script ID:</strong><br>
      <div class="code" id="scriptId">Carregando...</div>
    </div>
    <div class="config-item">
      <strong>Webhook URL:</strong><br>
      <div class="code">${WEBHOOK_URL}</div>
    </div>
    <div class="config-item">
      <strong>API Key:</strong><br>
      <div class="code">${API_KEY}</div>
    </div>
    <p><button onclick="google.script.host.close()">Fechar</button></p>
    <script>
      document.getElementById('scriptId').textContent = ScriptApp.getScriptId();
    </script>
  `);
  
  SpreadsheetApp.getUi().showModalDialog(html, 'Configuração');
}
