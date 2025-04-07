import { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

export default function BinLabel({ item, settings, side = 'front' }) {
  const qrCodeRef = useRef(null);

  useEffect(() => {
    if (item.orderLink && qrCodeRef.current) {
      QRCode.toCanvas(qrCodeRef.current, item.orderLink, {
        width: 60,
        margin: 0,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
    }
  }, [item.orderLink]);

  return (
    <div className="relative">
      <div className="relative w-[3in] h-[1in] bg-white rounded-lg overflow-hidden">
        {/* Left blue border */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600"></div>
        
        <div className="p-2">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-black">
                {item.productName || 'Product Name'}
              </h3>
              <p className="text-sm text-gray-500 uppercase">
                {item.partNumber || 'PART NUMBER'}
              </p>
            </div>
            {settings.showQROnLabel && (
              <div>
                <canvas ref={qrCodeRef} />
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Label size indicator */}
      <div className="absolute -bottom-4 left-0 right-0 text-center">
        <p className="text-xs text-gray-400">Bin / Shelf Label: 3" x 1"</p>
      </div>
    </div>
  );
}