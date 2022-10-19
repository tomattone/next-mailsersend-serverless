export type EmailProps = {
  fields: {
    to: string
    from: string
    as: string
    subject: string
    message: string
    cc?: string
    bcc?: string
    attach?: File
  }
  files: {
    attach: [
      {
        fieldName: string
        originalFilename: string
        path: string
        headers: {
          'content-disposition': string
          'content-type': string
        }
        size: number
      }
    ]
  }
}

export type SendEmailResponse =
  | {
      success: true
    }
  | {
      errors: Record<string, Array<string>>
      message: string
      success: false
      warning?: Array<{
        type: string
        warning: string
        recipients: Array<{
          email: string
          name: string
          reasons: Array<string>
        }>
      }>
    }
