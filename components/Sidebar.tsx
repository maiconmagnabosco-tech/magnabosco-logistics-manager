import React from 'react';
import { AppView, OriginZone } from '../types';

interface SidebarProps {
  zones: OriginZone[];
  currentView: AppView;
  selectedZoneId: string | null;
  onNavigate: (view: AppView, zoneId?: string) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  zones,
  currentView,
  selectedZoneId,
  onNavigate,
  onLogout,
}) => {
  return (
    <aside className="w-64 bg-black border-r border-piano-800 p-6 overflow-y-auto h-screen">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-cyan-400">Cockpit</h2>
      </div>

      <nav className="space-y-2">
        <button
          onClick={() => onNavigate(AppView.OVERVIEW)}
          className={`w-full text-left p-3 rounded transition-colors ${
            currentView === AppView.OVERVIEW
              ? 'bg-cyan-900/50 text-cyan-400'
              : 'text-piano-muted hover:bg-piano-800/50'
          }`}
        >
          Overview
        </button>

        <button
          onClick={() => onNavigate(AppView.IMPORT)}
          className={`w-full text-left p-3 rounded transition-colors ${
            currentView === AppView.IMPORT
              ? 'bg-cyan-900/50 text-cyan-400'
              : 'text-piano-muted hover:bg-piano-800/50'
          }`}
        >
          Import
        </button>

        <button
          onClick={() => onNavigate(AppView.PDF_UPLOAD)}
          className={`w-full text-left p-3 rounded transition-colors ${
            currentView === AppView.PDF_UPLOAD
              ? 'bg-cyan-900/50 text-cyan-400'
              : 'text-piano-muted hover:bg-piano-800/50'
          }`}
        >
          PDFs
        </button>
      </nav>

      <div className="mt-8 pt-8 border-t border-piano-800">
        <h3 className="text-xs font-bold text-piano-600 mb-4">ZONES</h3>
        <div className="space-y-1">
          {zones.map((zone) => (
            <button
              key={zone.id}
              onClick={() => onNavigate(AppView.ZONE_DETAIL, zone.id)}
              className={`w-full text-left p-2 text-sm rounded transition-colors ${
                selectedZoneId === zone.id
                  ? 'bg-cyan-900/50 text-cyan-400'
                  : 'text-piano-muted hover:bg-piano-800/50'
              }`}
            >
              {zone.name}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onLogout}
        className="w-full mt-auto pt-8 text-left p-3 text-red-500 hover:bg-red-900/20 rounded transition-colors"
      >
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
