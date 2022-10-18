import { Client } from '@nurodev/mailersend.ts'
import type { NextApiRequest, NextApiResponse } from 'next'

import { EmailProps, SendEmailResponse } from '../../services/interfaces'

const { MAILERSEND_TOKEN } = process.env

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Get post data
    const data: EmailProps = req.body

    // Transform arrays to recipient objects
    const cc: any = data.cc?.map((item) => new Object({ email: item }))
    const bcc: any = data.bcc?.map((item) => new Object({ email: item }))

    // Error if method isnt POST
    if (req.method !== 'POST') {
      res.status(400).json({ status: 400, message: 'Not found' })
    }

    const api = new Client(MAILERSEND_TOKEN || '')

    // Send e-mail :)
    const result: SendEmailResponse = await api.sendEmail({
      from: {
        email: data.from,
        name: data.as,
      },
      to: [{ email: data.to }],
      cc: cc,
      bcc: bcc,
      subject: data.subject,
      html: data.message,
      text: data.message.replace(/(<([^>]+)>)/gi, ''),
    })
    // Return success
    res.status(200).json(result)
  } catch (error: any) {
    // Return error :(
    res.status(error.status).json(error)
  }
}
