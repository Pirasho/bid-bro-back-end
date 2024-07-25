import mongoose from "mongoose";
import bcrypt from "bcryptjs";



// User schema and model
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
  });
  
  userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();
  
    try {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
      return next();
    } catch (error) {
      return next(error);
    }
  });
  
  const User = mongoose.model('User', userSchema);

  export default User;