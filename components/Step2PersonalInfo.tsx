interface Step2PersonalInfoProps {
  filingStatus: string;
  primaryFirstName: string;
  primaryLastName: string;
  primarySsn: string;
  spouseFirstName: string;
  spouseLastName: string;
  spouseSsn: string;
  onPrimaryFirstNameChange: (value: string) => void;
  onPrimaryLastNameChange: (value: string) => void;
  onPrimarySsnChange: (value: string) => void;
  onSpouseFirstNameChange: (value: string) => void;
  onSpouseLastNameChange: (value: string) => void;
  onSpouseSsnChange: (value: string) => void;
  onNext: () => void;
}

export default function Step2PersonalInfo({
  filingStatus,
  primaryFirstName,
  primaryLastName,
  primarySsn,
  spouseFirstName,
  spouseLastName,
  spouseSsn,
  onPrimaryFirstNameChange,
  onPrimaryLastNameChange,
  onPrimarySsnChange,
  onSpouseFirstNameChange,
  onSpouseLastNameChange,
  onSpouseSsnChange,
  onNext,
}: Step2PersonalInfoProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const isMarried = filingStatus === 'MFJ' || filingStatus === 'MFS';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Your Information</h3>
        <div>
          <label htmlFor="primaryFirstName" className="block text-sm font-medium text-gray-700 mb-2">
            Your First Name
          </label>
          <input
            type="text"
            id="primaryFirstName"
            value={primaryFirstName}
            onChange={(e) => onPrimaryFirstNameChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="primaryLastName" className="block text-sm font-medium text-gray-700 mb-2">
            Your Last Name
          </label>
          <input
            type="text"
            id="primaryLastName"
            value={primaryLastName}
            onChange={(e) => onPrimaryLastNameChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="primarySsn" className="block text-sm font-medium text-gray-700 mb-2">
            Your Social Security Number
          </label>
          <input
            type="text"
            id="primarySsn"
            value={primarySsn}
            onChange={(e) => onPrimarySsnChange(e.target.value)}
            placeholder="XXX-XX-XXXX"
            pattern="\d{3}-?\d{2}-?\d{4}"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
      </div>

      {isMarried && (
        <div className="space-y-4 pt-4 border-t border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Spouse Information</h3>
          <div>
            <label htmlFor="spouseFirstName" className="block text-sm font-medium text-gray-700 mb-2">
              Spouse&apos;s First Name
            </label>
            <input
              type="text"
              id="spouseFirstName"
              value={spouseFirstName}
              onChange={(e) => onSpouseFirstNameChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required={isMarried}
            />
          </div>

          <div>
            <label htmlFor="spouseLastName" className="block text-sm font-medium text-gray-700 mb-2">
              Spouse&apos;s Last Name
            </label>
            <input
              type="text"
              id="spouseLastName"
              value={spouseLastName}
              onChange={(e) => onSpouseLastNameChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required={isMarried}
            />
          </div>

          <div>
            <label htmlFor="spouseSsn" className="block text-sm font-medium text-gray-700 mb-2">
              Spouse&apos;s Social Security Number
            </label>
            <input
              type="text"
              id="spouseSsn"
              value={spouseSsn}
              onChange={(e) => onSpouseSsnChange(e.target.value)}
              placeholder="XXX-XX-XXXX"
              pattern="\d{3}-?\d{2}-?\d{4}"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required={isMarried}
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

