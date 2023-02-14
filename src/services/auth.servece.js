const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')

const UserService = require('./user.service')
const { config } = require('./../config/config')

const service = new UserService()

class AuthService {
  // GET USER - LOGIN
  async getUser (email, password) {
    const user = await service.findByEmail(email)

    if (!user) {
      throw boom.unauthorized()
    };

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      throw boom.unauthorized()
    };

    // Eliminamos el password del user obtenido
    delete user.dataValues.password

    return user
  }

  // FIRMAMOS Y BRINDAMOS TOKEN A RESPECTIVO USER
  singToken (user) {
    const jwtConfig = {
      expiresIn: 60 * 60
    }

    const payload = {
      sub: user.id,
      role: user.role
    }

    const token = jwt.sign(payload, config.JWT_SECRET, jwtConfig)

    return { user, token }
  }

  // LINK - RESETEAR CLAVE
  async sendRecovery (email) {
    const jwtConfig = {
      expiresIn: '15min'
    }

    const user = await service.findByEmail(email)

    if (!user) {
      throw boom.unauthorized()
    };

    const payload = { sub: user.id }
    const token = jwt.sign(payload, config.JWT_SECRET, jwtConfig)
    const link = `http://myfrontend.com/recovery?token=${token}`

    await service.update(user.id, { recoveryToken: token })

    const mail = {
      from: config.emailUser,
      to: `${user.email}`,
      subject: 'Email para recuperar contraseña',
      html: `<b>Ingresa a este link para recuperar contraseña: ${link}</b>`
    }

    const rta = await this.sendMail(mail)
    return rta
  }

  // CHANGE PASSWORD
  async changePassword (token, newPassword) {
    try {
      const payload = jwt.verify(token, config.JWT_SECRET)

      const user = await service.findOne(payload.sub)

      if (user.recoveryToken !== token) {
        throw boom.unauthorized('Token incorrecto')
      }

      const hash = await bcrypt.hash(newPassword, 10)
      await service.update(user.id, { recoveryToken: null, password: hash })

      return { message: 'password changed' }
    } catch (err) {
      throw boom.unauthorized()
    }
  }

  // Servicio de Mails
  async sendMail (infoEmail) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: true, // true for 465, false for other ports
      port: 465,
      auth: {
        user: config.emailUser,
        pass: config.emailPassword
      }
    })

    // send mail with defined transport object
    await transporter.sendMail(infoEmail)

    return 'Email sent subject'
  }
}

module.exports = AuthService
