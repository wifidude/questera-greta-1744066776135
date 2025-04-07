import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import KanbanCard from '../components/KanbanCard';
import BinLabel from '../components/BinLabel';
import PrintSettings from '../components/PrintSettings';
import PrintPreview from '../components/PrintPreview';

export default function Preview() {
  const { state } = useLocation();
  const [selectedItems] = useState(state?.data || []);
  const [settings, setSettings] = useState({
    size: { width: 3, height: 4.5 }, // Updated default size
    showCustomFields: true,
    departmentColors: {
      'Hardware': '#EF8741',
      'Software': '#C1E0D7',
      'Electronics': '#262528'
    },
    binLabelQuantity: 1,
    showQROnLabel: true,
    showQuantityOnLabel: true,
    doubleSidedLabels: false,
    showEmptyFields: true // New setting to control empty field visibility
  });

  if (!selectedItems.length) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-onyx mb-4">No Data Available</h1>
        <p className="text-night-onyx">Please upload and map your data first.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-onyx">Preview & Print</h1>
        <PrintSettings settings={settings} onSettingsChange={setSettings} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-onyx">Sample Preview</h2>
          <div className="bg-light-gray p-4 rounded-lg space-y-4">
            <KanbanCard item={selectedItems[0]} settings={settings} />
            <BinLabel item={selectedItems[0]} settings={settings} side="front" />
            {settings.doubleSidedLabels && (
              <BinLabel item={selectedItems[0]} settings={settings} side="back" />
            )}
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-onyx">Print Layout</h2>
          <PrintPreview items={selectedItems} settings={settings} />
        </div>
      </div>
    </div>
  );
}