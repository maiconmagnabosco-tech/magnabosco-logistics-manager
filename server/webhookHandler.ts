/**
 * Express server to handle Google Sheets webhooks
 * Run alongside the Vite dev server
 * 
 * Usage: ts-node server/webhookHandler.ts
 */

import express, { Request, Response } from 'express';
import cors from 'cors';
import { SyncWebhookPayload, parseSheetDataToZones } from '../services/googleSheetsService';

const app = express();
const PORT = process.env.PORT || 5000;
const API_KEY = process.env.REACT_APP_SHEETS_API_KEY || 'your-secure-api-key-here';

// Middleware
app.use(cors());
app.use(express.json());

// Store latest data for polling
let cachedSheetData: any[] = [];
let lastUpdateTimestamp = new Date().toISOString();

/**
 * Webhook endpoint for Google Apps Script to send updates
 */
app.post('/api/webhook/sheets-update', (req: Request, res: Response) => {
  try {
    // Verify API key
    const authHeader = req.headers.authorization;
    const apiKey = authHeader?.replace('Bearer ', '');

    if (apiKey !== API_KEY) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const payload: SyncWebhookPayload = req.body;

    // Validate payload
    if (!payload.data || !Array.isArray(payload.data)) {
      return res.status(400).json({ error: 'Invalid payload' });
    }

    // Cache the data
    cachedSheetData = payload.data;
    lastUpdateTimestamp = payload.timestamp;

    console.log(`✅ Received ${payload.data.length} rows from Google Sheets`);
    console.log(`   Timestamp: ${payload.timestamp}`);

    res.status(200).json({
      success: true,
      message: 'Data received and cached',
      rowsProcessed: payload.data.length
    });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * Polling endpoint for the React app to get latest sheet data
 */
app.get('/api/sync-sheets', (req: Request, res: Response) => {
  try {
    // Verify API key
    const authHeader = req.headers.authorization;
    const apiKey = authHeader?.replace('Bearer ', '');

    if (apiKey !== API_KEY) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    res.status(200).json({
      data: cachedSheetData,
      timestamp: lastUpdateTimestamp,
      sourceSheetId: process.env.REACT_APP_SHEETS_ID
    });
  } catch (error) {
    console.error('Sync error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * Test endpoint to verify server is running
 */
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    cachedRows: cachedSheetData.length,
    lastUpdate: lastUpdateTimestamp
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Webhook server running on http://localhost:${PORT}`);
  console.log(`📌 Google Sheets updates will be received at: http://localhost:${PORT}/api/webhook/sheets-update`);
  console.log(`🔐 API Key configured: ${API_KEY.substring(0, 10)}...`);
});
