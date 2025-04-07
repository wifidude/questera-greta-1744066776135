import { useState, useEffect, useCallback } from 'react';
import { defaultFieldMappings, fieldLabels, fieldSynonyms } from '../utils/constants';

export default function DataMapping({ data, onMapping }) {
  const [mappings, setMappings] = useState(defaultFieldMappings);
  const [autoMapped, setAutoMapped] = useState(false);

  const findMatchingHeader = useCallback((field, headers) => {
    // First try exact match with field label
    const exactMatch = headers.find(
      header => header.toLowerCase() === fieldLabels[field].toLowerCase()
    );
    if (exactMatch) return exactMatch;

    // Then try matching with field name
    const fieldMatch = headers.find(
      header => header.toLowerCase() === field.toLowerCase()
    );
    if (fieldMatch) return fieldMatch;

    // Then try matching with synonyms
    const synonymMatch = headers.find(header => 
      fieldSynonyms[field].some(synonym => 
        header.toLowerCase().includes(synonym.toLowerCase())
      )
    );
    if (synonymMatch) return synonymMatch;

    // Finally try partial matches
    return headers.find(header =>
      header.toLowerCase().includes(field.toLowerCase()) ||
      field.toLowerCase().includes(header.toLowerCase())
    );
  }, []);

  const mapData = useCallback((sourceData, fieldMappings) => {
    return sourceData.map(row => {
      const mappedRow = { ...defaultFieldMappings }; // Start with default empty values
      Object.entries(fieldMappings).forEach(([field, header]) => {
        if (header) {
          mappedRow[field] = row[header] || '';
        }
      });
      // Add example image URL if no product image is provided
      if (!mappedRow.imageUrl) {
        mappedRow.imageUrl = "https://d3v0px0pttie1i.cloudfront.net/uploads/branding/logo/e51dfbdc-ab14-4b23-94e8-b9e5eda640d4/425ec81c.png";
      }
      return mappedRow;
    });
  }, []);

  useEffect(() => {
    if (data && data.length > 0 && !autoMapped) {
      const headers = Object.keys(data[0]);
      const newMappings = { ...defaultFieldMappings };
      
      Object.keys(defaultFieldMappings).forEach(field => {
        const matchingHeader = findMatchingHeader(field, headers);
        if (matchingHeader) {
          newMappings[field] = matchingHeader;
        }
      });

      setMappings(newMappings);
      setAutoMapped(true);
      onMapping(mapData(data, newMappings));
    }
  }, [data, autoMapped, onMapping, mapData, findMatchingHeader]);

  const handleMappingChange = useCallback((field, value) => {
    setMappings(prev => {
      const newMappings = { ...prev, [field]: value };
      onMapping(mapData(data, newMappings));
      return newMappings;
    });
  }, [data, onMapping, mapData]);

  const availableFields = data && data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Object.entries(mappings).map(([field, value]) => (
        <div key={field} className="space-y-2">
          <label className="block text-sm font-medium text-onyx">
            {fieldLabels[field]}
          </label>
          <select
            value={value}
            onChange={(e) => handleMappingChange(field, e.target.value)}
            className="w-full p-2 border-2 border-onyx rounded-md bg-pure-white"
          >
            <option value="">Select field</option>
            {availableFields.map(header => (
              <option key={header} value={header}>
                {header}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}