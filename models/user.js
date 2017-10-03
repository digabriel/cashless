const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const randomString = require("randomstring");
const moment = require("moment");

const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});

UserSchema.statics.auth = function (email, password) {
  const User = this;

  return new Promise(async (resolve, reject) => {
    // Search user with this e-mail
    const user = await User.findOne({ email: email });
    if (!user) {
      return reject("Wrong e-mail or password");
    }

    // Compare passwords
    const sign = await bcrypt.compare(password, user.password);
    if (!sign) {
      return reject("Wrong e-mail or password");
    }
    
    // Generate tokens
    const at = await jwt.sign({user_id : user._id}, process.env.JWT_SECRET, {expiresIn : "1d"})
    const rt = randomString.generate(100);
    const ed = moment().add(1, "day");

    const auth = {
      "access-token" : at,
      "refresh-token" : rt,
      "expiration_date" : ed
    };

    resolve(auth);
  });
};

UserSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", UserSchema);
