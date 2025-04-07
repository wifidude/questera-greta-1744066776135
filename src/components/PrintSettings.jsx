import { useState } from 'react';
import { FiSettings } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function PrintSettings({ settings, onSettingsChange }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-onyx text-pure-white rounded-full hover:bg-opacity-90"
      >
        <FiSettings className="w-4 h-4" />
        <span>Settings</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 mt-2 w-80 bg-pure-white rounded-lg shadow-lg z-10"
          >
            <div className="p-4 space-y-4">
              <div>
                <h3 className="font-medium text-onyx mb-2">Card Size (inches)</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-night-onyx">Width</label>
                    <input
                      type="number"
                      value={settings.size.width}
                      onChange={(e) => onSettingsChange({
                        ...settings,
                        size: {
                          ...settings.size,
                          width: parseFloat(e.target.value) || 0
                        }
                      })}
                      step="0.1"
                      className="w-full p-1 border-2 border-onyx rounded"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-night-onyx">Height</label>
                    <input
                      type="number"
                      value={settings.size.height}
                      onChange={(e) => onSettingsChange({
                        ...settings,
                        size: {
                          ...settings.size,
                          height: parseFloat(e.target.value) || 0
                        }
                      })}
                      step="0.1"
                      className="w-full p-1 border-2 border-onyx rounded"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-onyx mb-2">Label Settings</h3>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={settings.showQROnLabel}
                      onChange={(e) => onSettingsChange({
                        ...settings,
                        showQROnLabel: e.target.checked
                      })}
                      className="form-checkbox"
                    />
                    <span className="text-sm text-night-onyx">Show QR Code</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={settings.showQuantityOnLabel}
                      onChange={(e) => onSettingsChange({
                        ...settings,
                        showQuantityOnLabel: e.target.checked
                      })}
                      className="form-checkbox"
                    />
                    <span className="text-sm text-night-onyx">Show Quantity</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={settings.doubleSidedLabels}
                      onChange={(e) => onSettingsChange({
                        ...settings,
                        doubleSidedLabels: e.target.checked
                      })}
                      className="form-checkbox"
                    />
                    <span className="text-sm text-night-onyx">Double-sided Labels</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={settings.showEmptyFields}
                      onChange={(e) => onSettingsChange({
                        ...settings,
                        showEmptyFields: e.target.checked
                      })}
                      className="form-checkbox"
                    />
                    <span className="text-sm text-night-onyx">Show Empty Fields</span>
                  </label>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-onyx mb-2">Bin Label Quantity</h3>
                <input
                  type="number"
                  value={settings.binLabelQuantity}
                  onChange={(e) => onSettingsChange({
                    ...settings,
                    binLabelQuantity: parseInt(e.target.value) || 1
                  })}
                  min="1"
                  max="10"
                  className="w-full p-1 border-2 border-onyx rounded"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}