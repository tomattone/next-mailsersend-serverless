import type { NextApiRequest, NextApiResponse } from 'next'
import { RequestProps, ResponseProps } from '../../services/interfaces'

const Recipient = require('mailersend').Recipient
const EmailParams = require('mailersend').EmailParams
const MailerSend = require('mailersend')

const { MAILERSEND_TOKEN } = process.env

const mailersend = new MailerSend({
  api_key: MAILERSEND_TOKEN,
})

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseProps>
) {
  const data: RequestProps = req.body
  const recipients = [new Recipient(data.to)]

  const emailParams = new EmailParams()
    .setFrom(data.from)
    .setFromName(data.as)
    .setRecipients(recipients)
    .setReplyTo(data.from)
    .setReplyToName(data.as)
    .setSubject(data.subject)
    .setHtml(data.message)
    .setText(data.message.replace(/(<([^>]+)>)/gi, ''))

  mailersend.send(emailParams)

  res.status(200).json({ status: 'Email successfully sent' })
}
