export type EmailProps = {
  to: string
  from: string
  as: string
  subject: string
  message: string
  cc?: [string]
  bcc?: [string]
  attach?: File
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
