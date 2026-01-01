interface Step2Props {
  wages: string;
  federalTaxWithheld: string;
  onWagesChange: (value: string) => void;
  onFederalTaxWithheldChange: (value: string) => void;
  onNext: () => void;
}

export default function Step2({
  wages,
  federalTaxWithheld,
  onWagesChange,
  onFederalTaxWithheldChange,
  onNext,
}: Step2Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="wages" className="block text-sm font-medium text-gray-700 mb-2">
          Wages (from W-2 Box 1)
        </label>
        <input
          type="number"
          id="wages"
          value={wages}
          onChange={(e) => onWagesChange(e.target.value)}
          step="0.01"
          min="0"
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="federalTaxWithheld" className="block text-sm font-medium text-gray-700 mb-2">
          Federal Tax Withheld (from W-2 Box 2)
        </label>
        <input
          type="number"
          id="federalTaxWithheld"
          value={federalTaxWithheld}
          onChange={(e) => onFederalTaxWithheldChange(e.target.value)}
          step="0.01"
          min="0"
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium"
      >
        Next
      </button>
    </form>
  );
}

