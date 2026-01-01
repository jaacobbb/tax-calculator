interface Step4FilingDetailsProps {
  filingStatus: string;
  isDependent: boolean;
  isSpouseDependent: boolean;
  hasDigitalAssets: boolean;
  onIsDependentChange: (value: boolean) => void;
  onIsSpouseDependentChange: (value: boolean) => void;
  onHasDigitalAssetsChange: (value: boolean) => void;
  onNext: () => void;
}

export default function Step4FilingDetails({
  filingStatus,
  isDependent,
  isSpouseDependent,
  hasDigitalAssets,
  onIsDependentChange,
  onIsSpouseDependentChange,
  onHasDigitalAssetsChange,
  onNext,
}: Step4FilingDetailsProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const isMarriedJointly = filingStatus === 'MFJ';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-start">
          <input
            type="checkbox"
            id="isDependent"
            checked={isDependent}
            onChange={(e) => onIsDependentChange(e.target.checked)}
            className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="isDependent" className="ml-3 block text-sm font-medium text-gray-700">
            Can someone claim you as a dependent?
          </label>
        </div>

        {isMarriedJointly && (
          <div className="flex items-start">
            <input
              type="checkbox"
              id="isSpouseDependent"
              checked={isSpouseDependent}
              onChange={(e) => onIsSpouseDependentChange(e.target.checked)}
              className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="isSpouseDependent" className="ml-3 block text-sm font-medium text-gray-700">
              Can someone claim your spouse as a dependent?
            </label>
          </div>
        )}

        <div className="flex items-start">
          <input
            type="checkbox"
            id="hasDigitalAssets"
            checked={hasDigitalAssets}
            onChange={(e) => onHasDigitalAssetsChange(e.target.checked)}
            className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="hasDigitalAssets" className="ml-3 block text-sm font-medium text-gray-700">
            Did you receive, sell, exchange, or otherwise dispose of any digital assets (like cryptocurrency)?
          </label>
        </div>
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

