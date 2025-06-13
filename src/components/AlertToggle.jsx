import React, { useState } from 'react';

const AlertToggle = () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="bg-white p-4 rounded shadow mb-6 flex items-center justify-between">
      <div>
        <h2 className="text-lg font-semibold">📱 SMS Alerts</h2>
        <p className="text-sm text-gray-600">Toggle alerts for new site availability.</p>
      </div>
      <button
        onClick={() => setEnabled(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          enabled ? 'bg-green-600' : 'bg-gray-300'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
};

export default AlertToggle;
