import React, { useRef } from 'react';
import { PdfDocument } from '../types';

interface PdfManagerProps {
  documents: PdfDocument[];
  onUpload: (files: FileList) => void;
  onDelete: (ids: string[]) => void;
  onToggleSelect: (id: string) => void;
  onSelectAll: (select: boolean) => void;
}

const PdfManager: React.FC<PdfManagerProps> = ({
  documents,
  onUpload,
  onDelete,
  onToggleSelect,
  onSelectAll,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onUpload(e.target.files);
    }
  };

  const selectedDocs = documents.filter((d) => d.selected);

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-white mb-8">PDF Manager</h1>

      <div className="bg-piano-800/50 border border-piano-700 rounded-lg p-8 mb-8 text-center">
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileSelect}
          className="hidden"
          multiple
          accept=".pdf"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-6 rounded"
        >
          Upload PDFs
        </button>
      </div>

      {documents.length > 0 && (
        <div className="bg-piano-800/50 border border-piano-700 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-piano-900/50 border-b border-piano-700">
              <tr>
                <th className="p-4 text-left">
                  <input
                    type="checkbox"
                    checked={documents.length > 0 && selectedDocs.length === documents.length}
                    onChange={(e) => onSelectAll(e.target.checked)}
                  />
                </th>
                <th className="p-4 text-left text-piano-muted">File</th>
                <th className="p-4 text-left text-piano-muted">Origin</th>
                <th className="p-4 text-left text-piano-muted">Destination</th>
                <th className="p-4 text-left text-piano-muted">Status</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr key={doc.id} className="border-b border-piano-700/50 hover:bg-piano-700/20">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={doc.selected}
                      onChange={() => onToggleSelect(doc.id)}
                    />
                  </td>
                  <td className="p-4 text-white">{doc.fileName}</td>
                  <td className="p-4 text-piano-muted">{doc.extractedOriginCity}</td>
                  <td className="p-4 text-piano-muted">{doc.extractedDestination}</td>
                  <td className="p-4">
                    {doc.isDuplicate ? (
                      <span className="text-yellow-500 text-xs">Duplicate</span>
                    ) : (
                      <span className="text-green-500 text-xs">Valid</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {selectedDocs.length > 0 && (
            <div className="bg-piano-900/50 border-t border-piano-700 p-4">
              <button
                onClick={() => onDelete(selectedDocs.map((d) => d.id))}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete Selected
              </button>
            </div>
          )}
        </div>
      )}

      {documents.length === 0 && (
        <div className="text-center text-piano-600 py-12">
          <p>No PDFs uploaded yet. Click the upload button to get started.</p>
        </div>
      )}
    </div>
  );
};

export default PdfManager;
