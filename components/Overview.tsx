import React from 'react';
import { OriginZone } from '../types';

interface OverviewProps {
  zones: OriginZone[];
}

const Overview: React.FC<OverviewProps> = ({ zones }) => {
  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-white mb-8">Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {zones.map((zone) => (
          <div key={zone.id} className="bg-piano-800/50 border border-piano-700 rounded-lg p-6">
            <h3 className="text-lg font-bold text-cyan-400 mb-4">{zone.name}</h3>
            <div className="space-y-2 text-sm text-piano-muted">
              <p>Routes: {zone.routes.length}</p>
              <p>Programmer: {zone.programmer}</p>
              <p>Revenue: R$ {zone.financialRevenue.toLocaleString('pt-BR')}</p>
            </div>
          </div>
        ))}
      </div>

      {zones.length === 0 && (
        <div className="text-center text-piano-600 py-12">
          <p>No zones available. Import data to get started.</p>
        </div>
      )}
    </div>
  );
};

export default Overview;
