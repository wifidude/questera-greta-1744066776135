import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUploadCloud } from 'react-icons/fi';
import { parseSpreadsheet } from '../services/spreadsheetService';

export default function FileUpload({ onUpload }) {
  const onDrop = useCallback(async (acceptedFiles) => {
    try {
      const file = acceptedFiles[0];
      const data = await parseSpreadsheet(file);
      onUpload(data);
    } catch (error) {
      console.error('Error parsing file:', error);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls']
    },
    multiple: false
  });

  return (
    <div
      {...getRootProps()}
      className={`border-4 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
        isDragActive ? 'border-orange-peel bg-orange-peel bg-opacity-10' : 'border-onyx'
      }`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center">
        <FiUploadCloud className="text-4xl mb-4 text-onyx" />
        <p className="text-lg text-onyx">
          {isDragActive ? "Drop your file here" : "Drag and drop your spreadsheet, or click to select"}
        </p>
        <p className="text-sm text-night-onyx mt-2">
          Supported formats: CSV, XLSX, XLS
        </p>
      </div>
    </div>
  );
}