// Document processing service for OCR and data extraction
export interface ProcessedDocument {
  id: string
  fileName: string
  extractedData: {
    income?: {
      employmentIncome?: number
      cppContributions?: number
      eiPremiums?: number
      incomeTaxWithheld?: number
      interestIncome?: number
      dividendIncome?: number
      pensions?: number
    }
    personalInfo?: {
      firstName?: string
      lastName?: string
      sin?: string
    }
    confidence: number // 0-100
  }
  processingStatus: 'pending' | 'processing' | 'completed' | 'failed'
  errorMessage?: string
}

export interface DocumentValidationResult {
  isValid: boolean
  documentType: 'T4' | 'T4A' | 'T5' | 'T3' | 'OTHER'
  issues: string[]
  recommendations: string[]
}

// Mock OCR processing service
export class DocumentProcessingService {
  private static instance: DocumentProcessingService

  static getInstance(): DocumentProcessingService {
    if (!DocumentProcessingService.instance) {
      DocumentProcessingService.instance = new DocumentProcessingService()
    }
    return DocumentProcessingService.instance
  }

  // Process document with OCR
  async processDocument(file: File): Promise<ProcessedDocument> {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000))

    const documentId = `doc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Mock OCR results based on filename
    const mockResults = this.generateMockOCRResults(file.name)

    return {
      id: documentId,
      fileName: file.name,
      extractedData: mockResults,
      processingStatus: 'completed'
    }
  }

  // Validate document
  async validateDocument(file: File): Promise<DocumentValidationResult> {
    const issues: string[] = []
    const recommendations: string[] = []

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      issues.push('File size exceeds 10MB limit')
    }

    // Check file type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png']
    if (!allowedTypes.includes(file.type)) {
      issues.push('Unsupported file type. Please use PDF, JPG, or PNG.')
    }

    // Determine document type from filename
    const fileName = file.name.toLowerCase()
    let documentType: DocumentValidationResult['documentType'] = 'OTHER'

    if (fileName.includes('t4') && !fileName.includes('t4a')) {
      documentType = 'T4'
      recommendations.push('Ensure all boxes are clearly visible')
    } else if (fileName.includes('t4a')) {
      documentType = 'T4A'
      recommendations.push('Verify pension and annuity amounts')
    } else if (fileName.includes('t5')) {
      documentType = 'T5'
      recommendations.push('Check investment income details')
    } else if (fileName.includes('t3')) {
      documentType = 'T3'
      recommendations.push('Confirm trust income information')
    }

    // Quality checks
    if (file.size < 10000) {
      issues.push('File appears to be too small - may be corrupted or low quality')
    }

    return {
      isValid: issues.length === 0,
      documentType,
      issues,
      recommendations
    }
  }

  // Batch process multiple documents
  async processDocuments(files: File[]): Promise<ProcessedDocument[]> {
    const results: ProcessedDocument[] = []

    for (const file of files) {
      try {
        const result = await this.processDocument(file)
        results.push(result)
      } catch (error) {
        results.push({
          id: `error_${Date.now()}`,
          fileName: file.name,
          extractedData: { confidence: 0 },
          processingStatus: 'failed',
          errorMessage: 'Processing failed'
        })
      }
    }

    return results
  }

  // Extract data from T4 form
  private extractT4Data(text: string): ProcessedDocument['extractedData'] {
    // Mock extraction logic
    const income = Math.floor(Math.random() * 100000) + 30000
    const cpp = Math.floor(income * 0.0525)
    const ei = Math.floor(Math.min(income, 61000) * 0.0163)
    const tax = Math.floor(income * 0.15)

    return {
      income: {
        employmentIncome: income,
        cppContributions: cpp,
        eiPremiums: ei,
        incomeTaxWithheld: tax
      },
      confidence: 85 + Math.random() * 10
    }
  }

  // Extract data from T5 form
  private extractT5Data(text: string): ProcessedDocument['extractedData'] {
    // Mock extraction logic
    const interest = Math.floor(Math.random() * 5000)
    const dividends = Math.floor(Math.random() * 10000)

    return {
      income: {
        interestIncome: interest,
        dividendIncome: dividends
      },
      confidence: 80 + Math.random() * 15
    }
  }

  // Generate mock OCR results based on filename
  private generateMockOCRResults(fileName: string): ProcessedDocument['extractedData'] {
    const lowerName = fileName.toLowerCase()

    if (lowerName.includes('t4') && !lowerName.includes('t4a')) {
      return this.extractT4Data('')
    } else if (lowerName.includes('t5')) {
      return this.extractT5Data('')
    } else if (lowerName.includes('t4a')) {
      return {
        income: {
          pensions: Math.floor(Math.random() * 30000) + 10000
        },
        confidence: 75 + Math.random() * 20
      }
    } else {
      return {
        confidence: 60 + Math.random() * 20
      }
    }
  }

  // Get processing status
  getProcessingStatus(documentId: string): 'pending' | 'processing' | 'completed' | 'failed' {
    // In a real implementation, this would check a database or cache
    return 'completed'
  }

  // Retry failed processing
  async retryProcessing(documentId: string): Promise<ProcessedDocument | null> {
    // Mock retry logic
    await new Promise(resolve => setTimeout(resolve, 1000))
    return null // Would return updated document in real implementation
  }
}

// Utility functions for document handling
export const documentUtils = {
  // Format file size
  formatFileSize: (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  },

  // Get file type from extension
  getFileType: (fileName: string): string => {
    const extension = fileName.split('.').pop()?.toLowerCase()
    switch (extension) {
      case 'pdf':
        return 'PDF Document'
      case 'jpg':
      case 'jpeg':
        return 'JPEG Image'
      case 'png':
        return 'PNG Image'
      default:
        return 'Unknown'
    }
  },

  // Validate file before upload
  validateFileForUpload: (file: File): { valid: boolean; errors: string[] } => {
    const errors: string[] = []
    const maxSize = 10 * 1024 * 1024 // 10MB
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png']

    if (file.size > maxSize) {
      errors.push('File size must be less than 10MB')
    }

    if (!allowedTypes.includes(file.type)) {
      errors.push('File type must be PDF, JPG, or PNG')
    }

    return {
      valid: errors.length === 0,
      errors
    }
  }
}