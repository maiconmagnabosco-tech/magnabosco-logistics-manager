import React, { useState } from 'react';
import { OriginZone } from '../types';

interface ImportViewProps {
  currentZones: OriginZone[];
  onProcessData: (zones: OriginZone[]) => void;
}

const ImportView: React.FC<ImportViewProps> = ({ onProcessData }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file');
      return;
    }

    // Mock processing - in real app, would parse Excel/CSV
    const mockZones: OriginZone[] = [
      {
        id: 'mock-1',
        name: 'Sample Zone',
        programmer: 'Imported',
        financialRevenue: 1000,
        financialBonus: 100,
        routes: [
          {
            id: '001',
            origin: 'Sample Zone',
            destination: 'Test City',
            contractedVolume: 100,
            realizedVolume: 85,
          },
        ],
      },
    ];

    onProcessData(mockZones);
    setFile(null);
    alert('File imported successfully!');
  };

  return (
    <div className="w-full max-w-2xl">
      <h1 className="text-3xl font-bold text-white mb-8">Import Data</h1>

      <div className="bg-piano-800/50 border border-piano-700 rounded-lg p-8">
        <div className="border-2 border-dashed border-piano-700 rounded-lg p-8 text-center">
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            id="file-input"
            accept=".xlsx,.xls,.csv"
          />
          <label htmlFor="file-input" className="cursor-pointer block">
            <p className="text-piano-muted mb-4">
              {file ? file.name : 'Drag and drop your file here, or click to select'}
            </p>
            <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded">
              Choose File
            </button>
          </label>
        </div>

        <button
          onClick={handleUpload}
          disabled={!file}
          className="w-full mt-6 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white font-bold py-3 px-4 rounded"
        >
          Import
        </button>
      </div>
    </div>
  );
};

export default ImportView;
