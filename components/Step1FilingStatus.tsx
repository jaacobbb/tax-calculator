interface Step1FilingStatusProps {
  filingStatus: string;
  onFilingStatusChange: (value: string) => void;
  onNext: () => void;
}

export default function Step1FilingStatus({
  filingStatus,
  onFilingStatusChange,
  onNext,
}: Step1FilingStatusProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (filingStatus) {
      onNext();
    }
  };

  const filingOptions = [
    { value: 'SINGLE', label: 'Single' },
    { value: 'MFJ', label: 'Married filing jointly' },
    { value: 'MFS', label: 'Married filing separately' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          How are you planning to file?
        </label>
        <div className="space-y-3">
          {filingOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onFilingStatusChange(option.value)}
              className={`w-full text-left px-4 py-3 border-2 rounded-md transition-colors ${
                filingStatus === option.value
                  ? 'border-blue-600 bg-blue-50 text-blue-900'
                  : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={!filingStatus}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </form>
  );
}

