import React, { useState } from "react";
import { toast } from "react-toastify";
import { FiBell, FiPercent } from "react-icons/fi";

const DiscountThreshold = ({ threshold, setThreshold }) => {
  const [localThreshold, setLocalThreshold] = useState(threshold || 20);

  const handleSet = () => {
    setThreshold(localThreshold);
    toast.info("You will be notified when the item has that discount.", {
      icon: <FiBell />,
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6 max-w-md mx-auto border border-gray-200">
      <h2 className="text-lg font-semibold mb-2 flex items-center gap-2 text-gray-700">
        <FiPercent />
        Set Discount Percentage
      </h2>

      <div className="flex items-center gap-4">
        <input
          type="number"
          value={localThreshold}
          onChange={(e) => setLocalThreshold(parseInt(e.target.value))}
          className="border px-3 py-1 rounded w-20 text-center"
          min={0}
          max={100}
        />
        <button
          onClick={handleSet}
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
        >
          Set
        </button>
      </div>
    </div>
  );
};

export default DiscountThreshold;
