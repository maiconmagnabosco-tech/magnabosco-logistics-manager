import { OriginZone, RouteContract } from '../types';

export interface SheetRow {
  "Nº Circuito": string;
  "ORIGEM": string;
  "DESTINO": string;
  "META": number;
  "REALIZADO": number;
}

export interface SyncWebhookPayload {
  data: SheetRow[];
  timestamp: string;
  sourceSheetId: string;
}

/**
 * Parse Google Sheet data to OriginZone format
 * Groups routes by ORIGEM (origin city)
 */
export const parseSheetDataToZones = (sheetRows: SheetRow[]): OriginZone[] => {
  const zonesMap: Record<string, OriginZone> = {};

  sheetRows.forEach(row => {
    const origin = row["ORIGEM"].trim();
    const circuito = row["Nº Circuito"].trim();
    const destination = row["DESTINO"].trim();
    const meta = Number(row["META"]) || 0;
    const realizado = Number(row["REALIZADO"]) || 0;

    // Initialize zone if not exists
    if (!zonesMap[origin]) {
      zonesMap[origin] = {
        id: origin.toLowerCase().replace(/\s+/g, '-'),
        name: origin,
        programmer: 'Google Sheet',
        financialRevenue: 0,
        financialBonus: 0,
        routes: []
      };
    }

    // Add route to zone
    const route: RouteContract = {
      id: circuito,
      origin: origin,
      destination: destination,
      contractedVolume: meta,
      realizedVolume: realizado
    };

    zonesMap[origin].routes.push(route);
    
    // Calculate financial values based on realized volume
    const revenuePerUnit = 100; // Mock value - adjust as needed
    zonesMap[origin].financialRevenue += realizado * revenuePerUnit;
  });

  return Object.values(zonesMap);
};

/**
 * Fetch data from Google Sheets via webhook endpoint
 */
export const syncFromGoogleSheets = async (): Promise<OriginZone[]> => {
  try {
    const response = await fetch('/api/sync-sheets', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_SHEETS_API_KEY || ''}`
      }
    });

    if (!response.ok) {
      throw new Error(`Sync failed: ${response.statusText}`);
    }

    const payload: SyncWebhookPayload = await response.json();
    const zones = parseSheetDataToZones(payload.data);
    
    return zones;
  } catch (error) {
    console.error('Error syncing from Google Sheets:', error);
    throw error;
  }
};

/**
 * Setup real-time listener for Google Sheet changes
 * This will be called via Google Apps Script webhook
 */
export const setupGoogleSheetsListener = (
  onDataUpdate: (zones: OriginZone[], changedRoutes: RouteContract[]) => void
) => {
  // Polling interval: check every 30 seconds (adjustable)
  const POLL_INTERVAL = 30000;

  let lastSyncTimestamp = localStorage.getItem('lastSheetsSync') || new Date(0).toISOString();

  const pollSheets = async () => {
    try {
      const zones = await syncFromGoogleSheets();
      const newTimestamp = new Date().toISOString();
      
      // In a real scenario, backend would return only changed routes
      // For now, we pass all routes as "changed"
      const changedRoutes: RouteContract[] = [];
      zones.forEach(zone => {
        changedRoutes.push(...zone.routes);
      });

      onDataUpdate(zones, changedRoutes);
      localStorage.setItem('lastSheetsSync', newTimestamp);
    } catch (error) {
      console.error('Polling error:', error);
    }
  };

  // Initial sync
  pollSheets();

  // Setup polling
  const intervalId = setInterval(pollSheets, POLL_INTERVAL);

  // Return cleanup function
  return () => clearInterval(intervalId);
};
