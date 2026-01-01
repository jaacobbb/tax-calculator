interface Step3Props {
  firstName: string;
  lastName: string;
  wages: string;
  federalTaxWithheld: string;
  totalTax: number | null;
  refundOrAmountOwed: number | null;
  onCalculate: () => void;
  onDownloadPDF: () => void;
}

const STANDARD_DEDUCTION = 13850;

export default function Step3({
  firstName,
  lastName,
  wages,
  federalTaxWithheld,
  totalTax,
  refundOrAmountOwed,
  onCalculate,
  onDownloadPDF,
}: Step3Props) {
  return (
    <div className="space-y-6">
      <div className="bg-gray-50 rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Tax Return Summary</h2>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="text-gray-700 font-medium">Name:</span>
            <span className="text-gray-900">{firstName} {lastName}</span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="text-gray-700 font-medium">Wages:</span>
            <span className="text-gray-900">
              ${parseFloat(wages || '0').toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="text-gray-700 font-medium">Federal Tax Withheld:</span>
            <span className="text-gray-900">
              ${parseFloat(federalTaxWithheld || '0').toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="text-gray-700 font-medium">Your Standard Deduction:</span>
            <span className="text-gray-900">
              ${STANDARD_DEDUCTION.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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

