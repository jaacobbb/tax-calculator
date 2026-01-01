interface Step6SummaryProps {
  filingStatus: string;
  primaryFirstName: string;
  primaryLastName: string;
  spouseFirstName: string;
  spouseLastName: string;
  primaryWages: string;
  primaryFederalTaxWithheld: string;
  spouseWages: string;
  spouseFederalTaxWithheld: string;
  totalTax: number | null;
  refundOrAmountOwed: number | null;
  onCalculate: () => void;
  onDownloadPDF: () => void;
}

const STANDARD_DEDUCTION = 13850;
const STANDARD_DEDUCTION_MFJ = 27700; // 2023 Married Filing Jointly standard deduction

export default function Step6Summary({
  filingStatus,
  primaryFirstName,
  primaryLastName,
  spouseFirstName,
  spouseLastName,
  primaryWages,
  primaryFederalTaxWithheld,
  spouseWages,
  spouseFederalTaxWithheld,
  totalTax,
  refundOrAmountOwed,
  onCalculate,
  onDownloadPDF,
}: Step6SummaryProps) {
  const isMarriedJointly = filingStatus === 'MFJ';
  const standardDeduction = isMarriedJointly ? STANDARD_DEDUCTION_MFJ : STANDARD_DEDUCTION;
  
  const totalWages = isMarriedJointly
    ? parseFloat(primaryWages || '0') + parseFloat(spouseWages || '0')
    : parseFloat(primaryWages || '0');
  
  const totalFederalTaxWithheld = isMarriedJointly
    ? parseFloat(primaryFederalTaxWithheld || '0') + parseFloat(spouseFederalTaxWithheld || '0')
    : parseFloat(primaryFederalTaxWithheld || '0');

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Tax Return Summary</h2>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="text-gray-700 font-medium">Filing Status:</span>
            <span className="text-gray-900">
              {filingStatus === 'SINGLE' && 'Single'}
              {filingStatus === 'MFJ' && 'Married Filing Jointly'}
              {filingStatus === 'MFS' && 'Married Filing Separately'}
            </span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="text-gray-700 font-medium">Name:</span>
            <span className="text-gray-900">
              {primaryFirstName} {primaryLastName}
              {isMarriedJointly && spouseFirstName && ` & ${spouseFirstName} ${spouseLastName}`}
            </span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="text-gray-700 font-medium">Total Wages:</span>
            <span className="text-gray-900">
              ${totalWages.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="text-gray-700 font-medium">Total Federal Tax Withheld:</span>
            <span className="text-gray-900">
              ${totalFederalTaxWithheld.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="text-gray-700 font-medium">Standard Deduction:</span>
            <span className="text-gray-900">
              ${standardDeduction.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>

          {totalTax !== null && (
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-700 font-medium">Total Tax:</span>
              <span className="text-gray-900">
                ${totalTax.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          )}

          <div className="flex justify-between items-center py-2 pt-4">
            <span className="text-gray-700 font-medium">
              {refundOrAmountOwed !== null
                ? refundOrAmountOwed >= 0
                  ? 'Estimated Refund:'
                  : 'Estimated Tax Owed:'
                : 'Your Estimated Refund/Amount Owed:'}
            </span>
            <span className={`font-semibold ${
              refundOrAmountOwed !== null && refundOrAmountOwed < 0
                ? 'text-red-600'
                : refundOrAmountOwed !== null && refundOrAmountOwed > 0
                ? 'text-green-600'
                : 'text-gray-900'
            }`}>
              {refundOrAmountOwed !== null
                ? `$${Math.abs(refundOrAmountOwed).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                : '$0.00'}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <button
          type="button"
          onClick={onCalculate}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium"
        >
          Calculate
        </button>

        <button
          type="button"
          onClick={onDownloadPDF}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 font-medium"
        >
          Download PDF for Mailing
        </button>
      </div>
    </div>
  );
}

