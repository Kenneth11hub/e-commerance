const User = require("../models/Users"),
  Attendances = require("../models/Attendances");
(generateToken = require("../config/generateToken")),
  (bcrypt = require("bcryptjs")),
  (jwt = require("jsonwebtoken")),
  (fs = require("fs"));
const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const encrypt = async password => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
const transporter = nodemailer.createTransport({
  port: process.env.EMAIL_PORT,
  host: process.env.EMAIL_HOST,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
let readHTMLFile = (path, cb) => {
  fs.readFile(path, { encoding: "utf-8" }, (err, html) => {
    if (err) {
      throw err;
    } else {
      cb(null, html);
    }
  });
};

// entity/login
exports.login = (req, res) => {
  const { email, password } = req.query;

  User.find({ $or: [{ email }, { mobile: email }] })
    .then(async users => {
      const user = users[0];
      if (user) {
        if (await user.matchPassword(password)) {
          if (user.deletedAt) {
            res.json({ error: "Your account has been banned!" });
          } else {
            readHTMLFile("./templates/mail/code.html", (err, html) => {
              let template = handlebars.compile(html);
              let replacements = {
                code: generateToken(user._id),
                message: "Here is your Verification Link",
                username: email,
                appName: process.env.APP_NAME,
              };
              let htmlToSend = template(replacements);
              let msg = {
                from: `${process.env.APP_NAME} Team <${process.env.EMAIL_USER}>`,
                to: email,
                html: htmlToSend,
              };
              transporter
                .sendMail(msg)

                .catch(err => () => {
                  return res.json({ message: err });
                });
            });
            res.json({ user, token: generateToken(user._id) });
          }
        } else {
          res.json({ error: "Password is incorrect!" });
        }
      } else {
        res.json({ error: "Account is not in our database!" });
      }
    })
    .catch(error => res.status(400).json({ error: error.message }));
};

// entity/validateRefresh
exports.validateRefresh = (req, res) => {
  const { token } = req.query;

  if (token) {
    if (token.startsWith("QTracy")) {
      jwt.verify(
        token.split(" ")[1],
        process.env.JWT_SECRET,
        async (err, response) => {
          if (err) {
            res.json({ error: err.message });
          } else {
            const user = await User.findById(response.id);
            if (user) {
              res.json(user);
            } else {
              res.json({ error: "Invalid account!" });
            }
          }
        }
      );
    } else {
      res.json({ error: "Invalid key!" });
    }
  } else {
    res.json({ error: "Invalid parameters!" });
  }
};
// entity/validateEmail
exports.validateEmail = (req, res) => {
  const { token } = req.params;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, response) => {
      if (err) {
        res.json({ error: err.message });
      } else {
        const user = await User.findById(response.id);
        if (user) {
          res.json(user.role.name);
        } else {
          res.json({ error: "Invalid account!" });
        }
      }
    });
  } else {
    res.json({ error: "Invalid parameters!" });
  }
};

// entity/save
exports.save = (req, res) =>
  User.create(req.body)
    .then(user => res.json(user))
    .catch(error => res.status(400).json({ error: error.message }));

// entity/changepassword
exports.changePassword = (req, res) => {
  const { email, password, oldPassword } = req.body;

  User.findOne({ email })
    .then(async user => {
      if (user && (await user.matchPassword(oldPassword))) {
        if (user.deletedAt) {
          res.json({ expired: "Your account has been banned" });
        } else {
          let newPassword = await encrypt(password);
          User.findByIdAndUpdate(user._id, { password: newPassword }).then(
            user => {
              res.json(user);
            }
          );
        }
      } else {
        res.json({ error: "E-mail and Password does not match." });
      }
    })
    .catch(error => res.status(400).json({ error: error.message }));
};

exports.file = (req, res) => {
  const { path, base64, name } = req.body;
  let url = `./assets/${path}`;
  if (!fs.existsSync(url)) {
    fs.mkdirSync(url, { recursive: true });
  }
  try {
    let filename = `${url}/${name}`;
    fs.writeFileSync(filename, base64, "base64");
    return res
      .status(200)
      .json({ success: true, message: "Successfully Uploaded." });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
