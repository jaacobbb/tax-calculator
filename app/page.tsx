'use client';

import { useState } from 'react';
import Stepper from '@/components/Stepper';
import Step1FilingStatus from '@/components/Step1FilingStatus';
import Step2PersonalInfo from '@/components/Step2PersonalInfo';
import Step3Address from '@/components/Step3Address';
import Step4FilingDetails from '@/components/Step4FilingDetails';
import Step5Income from '@/components/Step5Income';
import Step6Summary from '@/components/Step6Summary';
import FormSelector from '@/components/FormSelector';
import { calculateSimpleReturn } from '@/lib/taxCalculator';

const TOTAL_STEPS = 6;

export default function Home() {
  // Form selection
  const [currentForm, setCurrentForm] = useState('FEDERAL_1040');

  // Step 1: Filing Status
  const [filingStatus, setFilingStatus] = useState('');

  // Step 2: Personal Information
  const [primaryFirstName, setPrimaryFirstName] = useState('');
  const [primaryLastName, setPrimaryLastName] = useState('');
  const [primarySsn, setPrimarySsn] = useState('');
  const [spouseFirstName, setSpouseFirstName] = useState('');
  const [spouseLastName, setSpouseLastName] = useState('');
  const [spouseSsn, setSpouseSsn] = useState('');

  // Step 3: Address
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');

  // Step 4: Filing Details
  const [isDependent, setIsDependent] = useState(false);
  const [isSpouseDependent, setIsSpouseDependent] = useState(false);
  const [hasDigitalAssets, setHasDigitalAssets] = useState(false);

  // Step 5: Income
  const [primaryWages, setPrimaryWages] = useState('');
  const [primaryFederalTaxWithheld, setPrimaryFederalTaxWithheld] = useState('');
  const [spouseWages, setSpouseWages] = useState('');
  const [spouseFederalTaxWithheld, setSpouseFederalTaxWithheld] = useState('');

  // Calculation results
  const [totalTax, setTotalTax] = useState<number | null>(null);
  const [refundOrAmountOwed, setRefundOrAmountOwed] = useState<number | null>(null);

  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleCalculate = () => {
    const primaryWagesNum = parseFloat(primaryWages);
    const primaryFederalTaxWithheldNum = parseFloat(primaryFederalTaxWithheld);

    if (isNaN(primaryWagesNum) || isNaN(primaryFederalTaxWithheldNum)) {
      return;
    }

    // For now, use single taxpayer calculation
    // TODO: Update tax calculator to handle married filing statuses
    let totalWages = primaryWagesNum;
    let totalFederalTaxWithheld = primaryFederalTaxWithheldNum;

    if (filingStatus === 'MFJ') {
      const spouseWagesNum = parseFloat(spouseWages);
      const spouseFederalTaxWithheldNum = parseFloat(spouseFederalTaxWithheld);
      if (!isNaN(spouseWagesNum)) {
        totalWages += spouseWagesNum;
      }
      if (!isNaN(spouseFederalTaxWithheldNum)) {
        totalFederalTaxWithheld += spouseFederalTaxWithheldNum;
      }
    }

    // Use single calculation for now - this will need to be updated
    // to support married filing statuses properly
    const result = calculateSimpleReturn({
      wages: totalWages,
      federalTaxWithheld: totalFederalTaxWithheld,
    });

    setTotalTax(result.totalTax);
    setRefundOrAmountOwed(result.refundOrAmountOwed);
  };

  // Helper functions to convert between form format and display format
  const formatFormForDisplay = (form: string): string => {
    if (form === 'FEDERAL_1040') return 'Federal 1040';
    if (form === 'MARYLAND_502') return 'Maryland 502';
    return form;
  };

  const convertDisplayToForm = (display: string): string => {
    if (display === 'Federal 1040') return 'FEDERAL_1040';
    if (display === 'Maryland 502') return 'MARYLAND_502';
    return display;
  };

  const handleFormSelect = (selectedDisplay: string) => {
    const formValue = convertDisplayToForm(selectedDisplay);
    setCurrentForm(formValue);
  };


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Bar */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Tax Calculator</h1>
          <div className="w-48">
            <FormSelector
              options={['Federal 1040', 'Maryland 502']}
              selectedOption={formatFormForDisplay(currentForm)}
              onSelect={handleFormSelect}
            />
          </div>
        </div>
      </header>

      {currentForm === 'FEDERAL_1040' && (
        <>
          <Stepper currentStep={currentStep} totalSteps={TOTAL_STEPS} />
          
          <main className="max-w-2xl mx-auto px-6 py-12">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-8">Tax Return Information</h1>
              
              {currentStep === 1 && (
            <Step1FilingStatus
              filingStatus={filingStatus}
              onFilingStatusChange={setFilingStatus}
              onNext={handleNext}
            />
          )}

          {currentStep === 2 && (
            <Step2PersonalInfo
              filingStatus={filingStatus}
              primaryFirstName={primaryFirstName}
              primaryLastName={primaryLastName}
              primarySsn={primarySsn}
              spouseFirstName={spouseFirstName}
              spouseLastName={spouseLastName}
              spouseSsn={spouseSsn}
              onPrimaryFirstNameChange={setPrimaryFirstName}
              onPrimaryLastNameChange={setPrimaryLastName}
              onPrimarySsnChange={setPrimarySsn}
              onSpouseFirstNameChange={setSpouseFirstName}
              onSpouseLastNameChange={setSpouseLastName}
              onSpouseSsnChange={setSpouseSsn}
              onNext={handleNext}
            />
          )}

          {currentStep === 3 && (
            <Step3Address
              streetAddress={streetAddress}
              city={city}
              state={state}
              zipCode={zipCode}
              onStreetAddressChange={setStreetAddress}
              onCityChange={setCity}
              onStateChange={setState}
              onZipCodeChange={setZipCode}
              onNext={handleNext}
            />
          )}

          {currentStep === 4 && (
            <Step4FilingDetails
              filingStatus={filingStatus}
              isDependent={isDependent}
              isSpouseDependent={isSpouseDependent}
              hasDigitalAssets={hasDigitalAssets}
              onIsDependentChange={setIsDependent}
              onIsSpouseDependentChange={setIsSpouseDependent}
              onHasDigitalAssetsChange={setHasDigitalAssets}
              onNext={handleNext}
            />
          )}

          {currentStep === 5 && (
            <Step5Income
              filingStatus={filingStatus}
              primaryWages={primaryWages}
              primaryFederalTaxWithheld={primaryFederalTaxWithheld}
              spouseWages={spouseWages}
              spouseFederalTaxWithheld={spouseFederalTaxWithheld}
              onPrimaryWagesChange={setPrimaryWages}
              onPrimaryFederalTaxWithheldChange={setPrimaryFederalTaxWithheld}
              onSpouseWagesChange={setSpouseWages}
              onSpouseFederalTaxWithheldChange={setSpouseFederalTaxWithheld}
              onNext={handleNext}
            />
          )}

          {currentStep === 6 && (
            <Step6Summary
              filingStatus={filingStatus}
              primaryFirstName={primaryFirstName}
              primaryLastName={primaryLastName}
              primarySsn={primarySsn}
              spouseFirstName={spouseFirstName}
              spouseLastName={spouseLastName}
              spouseSsn={spouseSsn}
              streetAddress={streetAddress}
              city={city}
              state={state}
              zipCode={zipCode}
              primaryWages={primaryWages}
              primaryFederalTaxWithheld={primaryFederalTaxWithheld}
              spouseWages={spouseWages}
              spouseFederalTaxWithheld={spouseFederalTaxWithheld}
              totalTax={totalTax}
              refundOrAmountOwed={refundOrAmountOwed}
              onCalculate={handleCalculate}
            />
          )}
        </div>
      </main>
        </>
      )}

      {currentForm === 'MARYLAND_502' && (
        <main className="max-w-2xl mx-auto px-6 py-12">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Maryland Resident Income Tax Return (Form 502)</h1>
            <p className="text-gray-700">
              The interview for the Maryland state tax return is coming soon. Based on your federal return, we will automatically carry over your relevant information to simplify this process.
            </p>
          </div>
        </main>
      )}
    </div>
  );
}
