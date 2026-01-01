interface Step5IncomeProps {
  filingStatus: string;
  primaryWages: string;
  primaryFederalTaxWithheld: string;
  spouseWages: string;
  spouseFederalTaxWithheld: string;
  onPrimaryWagesChange: (value: string) => void;
  onPrimaryFederalTaxWithheldChange: (value: string) => void;
  onSpouseWagesChange: (value: string) => void;
  onSpouseFederalTaxWithheldChange: (value: string) => void;
  onNext: () => void;
}

export default function Step5Income({
  filingStatus,
  primaryWages,
  primaryFederalTaxWithheld,
  spouseWages,
  spouseFederalTaxWithheld,
  onPrimaryWagesChange,
  onPrimaryFederalTaxWithheldChange,
  onSpouseWagesChange,
  onSpouseFederalTaxWithheldChange,
  onNext,
}: Step5IncomeProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const isMarriedJointly = filingStatus === 'MFJ';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Your Income</h3>
        <div>
          <label htmlFor="primaryWages" className="block text-sm font-medium text-gray-700 mb-2">
            Your Wages (from W-2 Box 1)
          </label>
          <input
            type="number"
            id="primaryWages"
            value={primaryWages}
            onChange={(e) => onPrimaryWagesChange(e.target.value)}
            step="0.01"
            min="0"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="primaryFederalTaxWithheld" className="block text-sm font-medium text-gray-700 mb-2">
            Your Federal Tax Withheld (from W-2 Box 2)
          </label>
          <input
            type="number"
            id="primaryFederalTaxWithheld"
            value={primaryFederalTaxWithheld}
            onChange={(e) => onPrimaryFederalTaxWithheldChange(e.target.value)}
            step="0.01"
            min="0"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
      </div>

      {isMarriedJointly && (
        <div className="space-y-4 pt-4 border-t border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Spouse&apos;s Income</h3>
          <div>
            <label htmlFor="spouseWages" className="block text-sm font-medium text-gray-700 mb-2">
              Your Spouse&apos;s Wages (from W-2 Box 1)
            </label>
            <input
              type="number"
              id="spouseWages"
              value={spouseWages}
              onChange={(e) => onSpouseWagesChange(e.target.value)}
              step="0.01"
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required={isMarriedJointly}
            />
          </div>

          <div>
            <label htmlFor="spouseFederalTaxWithheld" className="block text-sm font-medium text-gray-700 mb-2">
              Your Spouse&apos;s Federal Tax Withheld (from W-2 Box 2)
            </label>
            <input
              type="number"
              id="spouseFederalTaxWithheld"
              value={spouseFederalTaxWithheld}
              onChange={(e) => onSpouseFederalTaxWithheldChange(e.target.value)}
              step="0.01"
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required={isMarriedJointly}
            />
          </div>
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium"
      >
        Next
      </button>
    </form>
  );
}

