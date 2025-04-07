import Papa from 'papaparse';
import * as XLSX from 'xlsx';

export const parseSpreadsheet = async (file) => {
  const extension = file.name.split('.').pop().toLowerCase();
  
  if (extension === 'csv') {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        complete: (results) => resolve(results.data),
        error: (error) => reject(error)
      });
    });
  } else if (['xlsx', 'xls'].includes(extension)) {
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    return XLSX.utils.sheet_to_json(worksheet);
  }
  
  throw new Error('Unsupported file format');
};