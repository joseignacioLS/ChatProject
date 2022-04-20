import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local"
import { User } from "../models/User.mjs"
import bcrypt from "bcrypt"

passport.use(
  "registerS",
  new LocalStrategy(
    {
      usernameField: "user",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, user, password, done) => {
      try {
        const previousUser = await User.findOne({ user })
        if (previousUser) {
          const err = new Error("Register Error")
          return done(err)
        }
        const pwdHash = await bcrypt.hash(password, 10)

        const newUser = new User({
          user: user,
          nick: req.body.nick,
          password: pwdHash,
        })
        const savedUser = await newUser.save()

        savedUser.password = null

        done(null, savedUser)
      } catch (err) {
        return done(err)
      }
    }
  )
)

passport.use(
  "loginS",
  new LocalStrategy(
    {
      usernameField: 'user',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, user, password, done) => {
      try {
        const currentUser = await User.findOne({ user })

        if (!currentUser) {
          const err = new Error("Login error")
          return done(err)
        }

        const isValidPassword = await bcrypt.compare(
          password,
          currentUser.password
        )

        if (!isValidPassword) {
          const err = new Error("Login error")
          return done(err)
        }

        currentUser.password = null
        return done(null, currentUser)
      } catch (err) {
        return done(err)
      }
    }
  )
)

// Esta función usará el usuario de req.LogIn para registrar su id.
passport.serializeUser((user, done) => {
  return done(null, user._id)
})

// Esta función buscará un usuario dada su _id en la DB y populará req.user si existe
passport.deserializeUser(async (userId, done) => {
  try {
    const existingUser = await User.findById(userId)
    return done(null, existingUser)
  } catch (err) {
    return done(err)
  }
})
