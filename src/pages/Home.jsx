import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FileUpload from '../components/FileUpload';
import DataMapping from '../components/DataMapping';
import DataPreview from '../components/DataPreview';
import { downloadTemplate } from '../utils/templateGenerator';

export default function Home() {
  const [data, setData] = useState(null);
  const [mappedData, setMappedData] = useState(null);
  const navigate = useNavigate();

  const handleDataUpload = (parsedData) => {
    setData(parsedData);
  };

  const handleMapping = (mapped) => {
    setMappedData(mapped);
  };

  const handleContinue = () => {
    if (mappedData) {
      navigate('/preview', { state: { data: mappedData } });
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-onyx mb-6">
          Welcome to the Kanban Card Creator Tool
        </h1>
        <p className="text-lg text-night-onyx">
          Create professional Kanban cards and bin labels with our easy-to-use generator.
          Upload your inventory data and get perfectly formatted cards ready for print.
        </p>
      </div>

      <div className="bg-light-gray p-6 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-onyx">Upload Data</h2>
          <button
            onClick={downloadTemplate}
            className="text-orange-peel hover:underline"
          >
            Download Template
          </button>
        </div>
        <FileUpload onUpload={handleDataUpload} />
      </div>

      {data && (
        <div className="bg-light-gray p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-onyx mb-4">Map Data Fields</h2>
          <DataMapping data={data} onMapping={handleMapping} />
        </div>
      )}

      {mappedData && (
        <div className="space-y-4">
          <div className="bg-light-gray p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-onyx mb-4">Data Preview</h2>
            <DataPreview data={mappedData} />
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleContinue}
              className="px-6 py-2 bg-orange-peel text-pure-white rounded-full hover:bg-opacity-90 transition-colors"
            >
              Continue to Preview
            </button>
          </div>
        </div>
      )}
    </div>
  );
}