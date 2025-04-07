export const defaultFieldMappings = {
  productName: '',
  partNumber: '',
  description: '',
  location: '',
  department: '',
  reorderPoint: '',
  reorderQuantity: '',
  unitCost: '',
  supplier: '',
  orderLink: '',
  customField1: '',
  customField2: ''
};

export const fieldLabels = {
  productName: 'Product Name',
  partNumber: 'Part Number',
  description: 'Description',
  location: 'Location',
  department: 'Department',
  reorderPoint: 'Reorder Point',
  reorderQuantity: 'Reorder Quantity',
  unitCost: 'Unit Cost',
  supplier: 'Supplier',
  orderLink: 'Order Link',
  customField1: 'Custom Field 1',
  customField2: 'Custom Field 2'
};

export const fieldSynonyms = {
  productName: ['product', 'item', 'name', 'product_name', 'item_name'],
  partNumber: ['part', 'number', 'sku', 'part_number', 'part_no', 'partno'],
  description: ['desc', 'details', 'item_description', 'product_description'],
  location: ['loc', 'place', 'position', 'storage', 'bin'],
  department: ['dept', 'area', 'section', 'division'],
  reorderPoint: ['reorder', 'minimum', 'min_qty', 'min_quantity', 'reorder_point'],
  reorderQuantity: ['quantity', 'qty', 'order_qty', 'order_quantity', 'reorder_qty'],
  unitCost: ['cost', 'price', 'unit_price', 'price_per_unit'],
  supplier: ['vendor', 'manufacturer', 'distributor', 'supplier_name'],
  orderLink: ['link', 'url', 'order_url', 'purchase_link'],
  customField1: ['custom1', 'extra1', 'additional1'],
  customField2: ['custom2', 'extra2', 'additional2']
};