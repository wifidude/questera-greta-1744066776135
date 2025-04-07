import { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

export default function KanbanCard({ item, settings }) {
  const qrCodeRef = useRef(null);

  useEffect(() => {
    if (item.orderLink && qrCodeRef.current) {
      QRCode.toCanvas(qrCodeRef.current, item.orderLink, {
        width: 80,
        margin: 0,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
    }
  }, [item.orderLink]);

  return (
    <div className="relative w-[3in] h-[4.5in] bg-white rounded-lg overflow-hidden">
      {/* Left blue border */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600"></div>
      
      <div className="p-4">
        {/* Title */}
        <div className="text-center mb-4">
          <p className="text-base">KANBAN CARD FRONT</p>
        </div>

        {/* Header section */}
        <div className="flex justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-black">
              {item.productName || 'Product Name'}
            </h2>
            <p className="text-gray-500 text-sm uppercase">
              {item.partNumber || 'PART NUMBER'}
            </p>
          </div>
          <div className="text-center">
            <canvas ref={qrCodeRef} />
            <p className="text-xs text-gray-500">Order link</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-700 mb-6">
          {item.description || 'Product Description Product Description Description Product Description'}
        </p>

        {/* Info boxes - 2x2 grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-100 p-3 rounded">
            <p className="font-medium">Reorder Point</p>
            <p className="text-xl font-bold text-gray-800">{item.reorderPoint || '0'}</p>
          </div>
          <div className="bg-gray-100 p-3 rounded">
            <p className="font-medium">Reorder QTY</p>
            <p className="text-xl font-bold text-blue-500">{item.reorderQuantity || '0'}</p>
          </div>
          <div className="bg-gray-100 p-3 rounded">
            <p className="font-medium">Location</p>
            <p className="text-gray-700">{item.location || 'Location'}</p>
          </div>
          <div className="bg-gray-100 p-3 rounded">
            <p className="font-medium">Unit Cost</p>
            <p className="text-gray-700">${item.unitCost || '1.20'}</p>
          </div>
          <div className="bg-gray-100 p-3 rounded">
            <p className="font-medium">Department</p>
            <p className="text-gray-700">{item.department || 'Hardware'}</p>
          </div>
          <div className="bg-gray-100 p-3 rounded">
            <p className="font-medium">Supplier</p>
            <p className="text-gray-700">{item.supplier || 'Amazon'}</p>
          </div>
        </div>

        {/* Custom fields and logo */}
        <div className="mt-4 space-y-2">
          <div className="border border-dashed border-gray-300 rounded p-2 text-center">
            <p className="text-sm text-gray-500">+ Customizable Field 1</p>
          </div>
          <div className="border border-dashed border-gray-300 rounded p-2 text-center">
            <p className="text-sm text-gray-500">+ Customizable Field 2</p>
          </div>
          <div className="flex justify-between items-end">
            <div className="border border-dashed border-gray-300 rounded px-2 py-1">
              <p className="text-sm text-gray-500">+Logo</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">Rev. Date: 4/6/2025</p>
            </div>
          </div>
        </div>

        {/* Card size indicator */}
        <div className="absolute bottom-1 left-0 right-0 text-center">
          <p className="text-xs text-gray-400">Kanban Card 3" x 4.5"</p>
        </div>
      </div>
    </div>
  );
}