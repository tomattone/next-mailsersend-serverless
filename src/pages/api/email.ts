import { readFileSync } from 'fs'
import { NextApiRequest, NextApiResponse } from 'next'

import { Client } from '@nurodev/mailersend.ts'
import multiparty from 'multiparty'

import { EmailProps, SendEmailResponse } from '../../interfaces'

const { MAILERSEND_API_KEY } = process.env

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Error if method isnt POST
    if (req.method !== 'POST') {
      res.status(400).json({ status: 400, message: 'Not found' })
    }

    // Set-up multiparty
    const form = new multiparty.Form({
      uploadDir: './public/uploads/',
    })

    // Get post data
    const data: EmailProps = await new Promise((resolve, reject) => {
      form.parse(req, function (err, fields, files) {
        if (err) reject({ err })
        resolve({ fields, files })
      })
    })

    // Parse cc and bcc fields
    const cc = data?.fields?.cc ? [{ email: data?.fields?.cc[0] }] : []
    const bcc = data?.fields?.bcc ? [{ email: data?.fields?.bcc[0] }] : []

    // Set-up attachment
    const attach = data?.files?.attach
      ? [
          {
            content: readFileSync(data?.files?.attach[0].path).toString(
              'base64'
            ),
            filename: data?.files?.attach[0].originalFilename,
          },
        ]
      : []

    // Set-up mailersend
    const api = new Client(MAILERSEND_API_KEY || '')

    // Send e-mail :)
    const result: SendEmailResponse = await api.sendEmail({
      from: {
        email: data.fields.from[0],
        name: data.fields.as[0],
      },
      to: [{ email: data.fields.to[0] }],
      cc: cc,
      bcc: bcc,
      subject: data.fields.subject[0],
      html: data.fields.message[0],
      text: data.fields.message[0].replace(/(<([^>]+)>)/gi, ''),
      attachments: attach,
    })

    // Return success
    res.status(200).json(result)
  } catch (error: any) {
    // Return error :(
    res.status(error.status || 400).json(error)
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}
