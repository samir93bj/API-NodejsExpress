const nodemailer = require('nodemailer')
const { config } = require('../../config/config')

class EmailNotify {
  async sendMail (infoEmail) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: true,
      port: 465,
      auth: {
        user: config.emailUser,
        pass: config.dbPassword
      }
    })

    await transporter.sendMail(infoEmail)

    return 'Email sent successfully'
  }
}

module.exports = EmailNotify
