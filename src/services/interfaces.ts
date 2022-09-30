export type RequestProps = {
  to: string
  from: string
  as: string
  subject: string
  message: string
  cc?: [string]
  bcc?: [string]
  attach?: File
}
export type ResponseProps = {
  status: string
}
