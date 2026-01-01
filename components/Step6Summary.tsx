interface Step6SummaryProps {
  filingStatus: string;
  primaryFirstName: string;
  primaryLastName: string;
  primarySsn: string;
  spouseFirstName: string;
  spouseLastName: string;
  spouseSsn: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  primaryWages: string;
  primaryFederalTaxWithheld: string;
  spouseWages: string;
  spouseFederalTaxWithheld: string;
  totalTax: number | null;
  refundOrAmountOwed: number | null;
  onCalculate: () => void;
}

const STANDARD_DEDUCTION = 13850;
const STANDARD_DEDUCTION_MFJ = 27700; // 2023 Married Filing Jointly standard deduction

export default function Step6Summary({
  filingStatus,
  primaryFirstName,
  primaryLastName,
  primarySsn,
  spouseFirstName,
  spouseLastName,
  spouseSsn,
  streetAddress,
  city,
  state,
  zipCode,
  primaryWages,
  primaryFederalTaxWithheld,
  spouseWages,
  spouseFederalTaxWithheld,
  totalTax,
  refundOrAmountOwed,
  onCalculate,
}: Step6SummaryProps) {
  const isMarried = filingStatus === 'MFJ' || filingStatus === 'MFS';
  const isMarriedJointly = filingStatus === 'MFJ';
  const standardDeduction = isMarriedJointly ? STANDARD_DEDUCTION_MFJ : STANDARD_DEDUCTION;
  
  const primaryWagesNum = parseFloat(primaryWages || '0');
  const spouseWagesNum = parseFloat(spouseWages || '0');
  const totalWages = isMarriedJointly
    ? primaryWagesNum + spouseWagesNum
    : primaryWagesNum;
  
  const primaryTaxWithheldNum = parseFloat(primaryFederalTaxWithheld || '0');
  const spouseTaxWithheldNum = parseFloat(spouseFederalTaxWithheld || '0');
  const totalFederalTaxWithheld = isMarriedJointly
    ? primaryTaxWithheldNum + spouseTaxWithheldNum
    : primaryTaxWithheldNum;

  const fullAddress = `${streetAddress}, ${city}, ${state} ${zipCode}`.trim();

  return (
    <div className="space-y-6">
      {/* Section 1: Personal Information */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-300">
          Personal Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div>
              <dt className="text-sm font-medium text-gray-500">Filing Status</dt>
              <dd className="mt-1 text-base text-gray-900">
                {filingStatus === 'SINGLE' && 'Single'}
                {filingStatus === 'MFJ' && 'Married Filing Jointly'}
                {filingStatus === 'MFS' && 'Married Filing Separately'}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">Your Name</dt>
              <dd className="mt-1 text-base text-gray-900">
                {primaryFirstName} {primaryLastName}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">Your SSN</dt>
              <dd className="mt-1 text-base text-gray-900">{primarySsn}</dd>
            </div>
          </div>

          {isMarried && (
            <div className="space-y-3">
              <div>
                <dt className="text-sm font-medium text-gray-500">Spouse&apos;s Name</dt>
                <dd className="mt-1 text-base text-gray-900">
                  {spouseFirstName} {spouseLastName}
                </dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500">Spouse&apos;s SSN</dt>
                <dd className="mt-1 text-base text-gray-900">{spouseSsn}</dd>
              </div>
            </div>
          )}

          <div className={isMarried ? 'md:col-span-2' : ''}>
            <dt className="text-sm font-medium text-gray-500">Home Address</dt>
            <dd className="mt-1 text-base text-gray-900">{fullAddress || 'Not provided'}</dd>
          </div>
        </div>
      </div>

      {/* Section 2: Income Summary */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-300">
          Income Summary
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div>
              <dt className="text-sm font-medium text-gray-500">Your Wages</dt>
              <dd className="mt-1 text-base text-gray-900">
                ${primaryWagesNum.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">Your Federal Tax Withheld</dt>
              <dd className="mt-1 text-base text-gray-900">
                ${primaryTaxWithheldNum.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </dd>
            </div>
          </div>

          {isMarriedJointly && (
            <div className="space-y-3">
              <div>
                <dt className="text-sm font-medium text-gray-500">Spouse&apos;s Wages</dt>
                <dd className="mt-1 text-base text-gray-900">
                  ${spouseWagesNum.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500">Spouse&apos;s Federal Tax Withheld</dt>
                <dd className="mt-1 text-base text-gray-900">
                  ${spouseTaxWithheldNum.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </dd>
              </div>
            </div>
          )}

          <div className={isMarriedJointly ? 'md:col-span-2' : ''}>
            <dt className="text-sm font-medium text-gray-500">Total Combined Wages</dt>
            <dd className="mt-1 text-lg font-semibold text-gray-900">
              ${totalWages.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </dd>
          </div>
        </div>
      </div>

      {/* Final Calculation Result */}
      {refundOrAmountOwed !== null && (
        <div className={`bg-white border-2 rounded-lg p-8 ${
          refundOrAmountOwed >= 0 ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'
        }`}>
          <div className="text-center">
            <h2 className={`text-2xl font-bold mb-2 ${
              refundOrAmountOwed >= 0 ? 'text-green-700' : 'text-red-700'
            }`}>
              {refundOrAmountOwed >= 0 ? 'Estimated Refund' : 'Estimated Tax Owed'}
            </h2>
            <div className={`text-4xl font-bold ${
              refundOrAmountOwed >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {refundOrAmountOwed >= 0 ? '+' : '-'}
              ${Math.abs(refundOrAmountOwed).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
        </div>
      )}

      {/* Calculate Button */}
      <button
        type="button"
        onClick={onCalculate}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium text-lg"
      >
        Calculate
      </button>
    </div>
  );
}
