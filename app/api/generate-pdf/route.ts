import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Extract user data from request body
    const {
      firstName,
      lastName,
      ssn,
      filingStatus,
      wages,
      federalTaxWithheld,
    } = body;

    // Validate required fields
    if (!firstName || !lastName || !ssn || wages === undefined || federalTaxWithheld === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Load the blank Form 1040 PDF from the file system
    const pdfPath = join(process.cwd(), 'forms', 'f1040.pdf');
    const pdfBytes = await readFile(pdfPath);
    
    // Load the PDF document
    const pdfDoc = await PDFDocument.load(pdfBytes);
    
    // Get the form from the PDF document
    const form = pdfDoc.getForm();
    
    // Fill in the form fields with user data
    // Name fields
    const firstNameField = form.getTextField('f1_22');
    firstNameField.setText(firstName);
    
    const lastNameField = form.getTextField('f1_23');
    lastNameField.setText(lastName);
    
    // SSN - typically split into 3 parts or single field
    // Adjust field names based on actual PDF structure
    const ssnField = form.getTextField('f1_04');
    ssnField.setText(ssn.replace(/-/g, '')); // Remove dashes if present
    
    // Wages (Line 1 on Form 1040)
    const wagesField = form.getTextField('f1_07');
    wagesField.setText(wages.toString());
    
    // Federal tax withheld (Line 25c on Form 1040)
    const federalTaxWithheldField = form.getTextField('f1_25c');
    federalTaxWithheldField.setText(federalTaxWithheld.toString());
    
    // Filing status - if it's a checkbox or radio button
    // Adjust based on actual field type in the PDF
    if (filingStatus === 'SINGLE') {
      try {
        const filingStatusField = form.getCheckBox('c1_01');
        filingStatusField.check();
      } catch (e) {
        // If it's a text field instead, adjust accordingly
        console.log('Filing status field might be a different type');
      }
    }
    
    // Save the modified PDF into a Uint8Array
    const filledPdfBytes = await pdfDoc.save();
    
    // Return the PDF as response with proper headers
    return new NextResponse(filledPdfBytes.buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="tax-return-2024.pdf"',
      },
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

