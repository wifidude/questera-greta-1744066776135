export const downloadTemplate = () => {
  const headers = [
    'Product Name',
    'Part Number',
    'Description',
    'Location',
    'Department',
    'Reorder Point',
    'Reorder Quantity',
    'Unit Cost',
    'Supplier',
    'Order Link',
    'Custom Field 1',
    'Custom Field 2'
  ];

  const sampleData = [
    'Example Product',
    'ABC-123',
    'High-quality widget for industrial use',
    'Warehouse A-12',
    'Hardware',
    '10',
    '50',
    '29.99',
    'Acme Supplies',
    'https://example.com/order/ABC-123',
    'In Stock',
    'Priority: High'
  ];

  const csvContent = headers.join(',') + '\n' + sampleData.join(',') + '\n';
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'kanban_template.csv';
  link.click();
  URL.revokeObjectURL(link.href);
};