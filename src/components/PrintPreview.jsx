import { useState } from 'react';
import { FiPrinter, FiDownload } from 'react-icons/fi';
import { generatePDF } from '../services/pdfGenerator';
import KanbanCard from './KanbanCard';
import BinLabel from './BinLabel';

export default function PrintPreview({ items, settings }) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    try {
      setIsGenerating(true);
      const doc = await generatePDF(items, settings);
      const filename = `kanban-cards-${new Date().getTime()}.pdf`;
      doc.save(filename);
    } catch (error) {
      console.error('PDF generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div>
      <div className="mb-4 flex justify-end space-x-4">
        <button
          onClick={handlePrint}
          className="flex items-center space-x-2 px-6 py-2 bg-onyx text-pure-white rounded-full hover:bg-opacity-90"
        >
          <FiPrinter className="w-4 h-4" />
          <span>Print</span>
        </button>
        <button
          onClick={handleDownloadPDF}
          disabled={isGenerating}
          className="flex items-center space-x-2 px-6 py-2 bg-orange-peel text-pure-white rounded-full hover:bg-opacity-90 disabled:opacity-50"
        >
          <FiDownload className="w-4 h-4" />
          <span>{isGenerating ? 'Generating...' : 'Download PDF'}</span>
        </button>
      </div>

      <div className="grid gap-4 print:gap-0">
        {items.map((item, index) => (
          <div key={index} className="print:break-inside-avoid space-y-4">
            <KanbanCard item={item} settings={settings} />
            {Array.from({ length: settings.binLabelQuantity }).map((_, i) => (
              <div key={i} className="space-y-4">
                <BinLabel item={item} settings={settings} side="front" />
                {settings.doubleSidedLabels && (
                  <BinLabel item={item} settings={settings} side="back" />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}