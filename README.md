# Serverless Mail API

Sending emails with [Mailersend](https://www.mailersen📧d.com/) and [Next.js](https://nextjs.org/) (not spams 😅).
<br /><br />

# Set-up

Copy `.env.example` to `.env` and add your mailersend token. [Read more about the configuration](https://www.mailersend.com/help/managing-api-tokens).
<br /><br />

# How to use

```http
POST /email
```

| Param     | Type     | Required? | Description                 | Example                                       |
| :-------- | :------- | :-------- | :-------------------------- | :-------------------------------------------- |
| `to`      | `STRING` | yes       | Address to                  | `test@example.com`                            |
| `from`    | `STRING` | yes       | Address from                | `test@example.com`                            |
| `as`      | `STRING` | yes       | Send as                     | `Full name `                                  |
| `subject` | `STRING` | yes       | Message subject             | `Sending an e-mail to you`                    |
| `message` | `STRING` | yes       | Message body                | `<p>Body in HTML</p>`                         |
| `cc`      | `STRING` | no        | Carbon copy addresses       | `['copy1@example.com', 'copy2@example.com']`  |
| `bcc`     | `STRING` | no        | Blind carbon copy addresses | `['copy1@example.com', 'copy2@example.com']`' |
| `attach`  | `FILE`   | no        | Attachments files           | `file`                                        |
