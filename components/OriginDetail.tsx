import React from 'react';
import { OriginZone } from '../types';

interface OriginDetailProps {
  zone: OriginZone;
}

const OriginDetail: React.FC<OriginDetailProps> = ({ zone }) => {
  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-white mb-8">{zone.name}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-piano-800/50 border border-piano-700 rounded-lg p-6">
          <p className="text-piano-muted mb-2">Programmer</p>
          <p className="text-2xl font-bold text-cyan-400">{zone.programmer}</p>
        </div>
        <div className="bg-piano-800/50 border border-piano-700 rounded-lg p-6">
          <p className="text-piano-muted mb-2">Financial Revenue</p>
          <p className="text-2xl font-bold text-green-400">
            R$ {zone.financialRevenue.toLocaleString('pt-BR')}
          </p>
        </div>
      </div>

      <div className="bg-piano-800/50 border border-piano-700 rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4">Routes</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-piano-700">
                <th className="text-left p-3 text-piano-muted">Circuit</th>
                <th className="text-left p-3 text-piano-muted">Destination</th>
                <th className="text-left p-3 text-piano-muted">Contract</th>
                <th className="text-left p-3 text-piano-muted">Realized</th>
              </tr>
            </thead>
            <tbody>
              {zone.routes.map((route) => (
                <tr key={route.id} className="border-b border-piano-700/50 hover:bg-piano-700/20">
                  <td className="p-3 text-white">{route.id}</td>
                  <td className="p-3 text-piano-muted">{route.destination}</td>
                  <td className="p-3 text-white">{route.contractedVolume}</td>
                  <td className="p-3 text-cyan-400">{route.realizedVolume}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OriginDetail;
