function verifyGSTNumber(gstNumber: string): boolean {
    // Remove any spaces and convert to uppercase
    const cleanedGSTNumber: string = gstNumber.replace(/\s+/g, '').toUpperCase();
  
    // GST number should be exactly 15 characters long
    if (cleanedGSTNumber.length !== 15) {
      return false;
    }
  
    // Check the format of GST number using regex
    const gstRegex: RegExp = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;
    if (!gstRegex.test(cleanedGSTNumber)) {
      return false;
    }
  
    // Check the checksum digit
    const checksumDigit: string = cleanedGSTNumber[14];
    const gstWithoutChecksum: string = cleanedGSTNumber.substring(0, 14);
    const checksum: string = calculateChecksum(gstWithoutChecksum);
    if (checksum !== checksumDigit) {
      return false;
    }
  
    return true;
  }
  
  function calculateChecksum(gstWithoutChecksum: string): string {
    const GST_CUTOFF: number = 35; // ASCII value of 'Z'
    const GST_FACTOR: number = 36; // Number of possible characters (0-9, A-Z)
  
    let weightedSum: number = 0;
    for (let i = 0; i < gstWithoutChecksum.length; i++) {
      let charValue: number = parseInt(gstWithoutChecksum[i], GST_FACTOR);
      weightedSum += charValue * (i % 2 === 0 ? 1 : 2);
    }
  
    let checksumValue: number = (GST_CUTOFF - (weightedSum % GST_CUTOFF)) % GST_FACTOR;
    if (checksumValue >= 10) {
      return String.fromCharCode(checksumValue + 55); // Convert 10-35 to A-Z
    } else {
      return String(checksumValue);
    }
  }
  
  // Example usage:
  const gstNumber: string = '22ABCDE1234F1Z5';
  console.log(verifyGSTNumber(gstNumber)); // Output: true
  