import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';


// typage typescript
interface IUser extends Document {
  username: string;
  password: string;
  isConnected: boolean;
  comparePassword: (password: string) => Promise<boolean>;
  getUserId: () => string;
  getUserByHisId: () => Promise<string | null>;
  getAllConnectedUsers: () => boolean;
}

const UserSchema: Schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isConnected: {
    type: Boolean,
    default: false,
  }
});

UserSchema.methods.comparePassword = function(password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
}

UserSchema.methods.getUserId = function(): string {
  return this._id;
};

UserSchema.methods.getUserByHisId = async function(): Promise<string | null> {
  try {
    // methode findById
    const user = await User.findById(this._id);
    // return user, sinon null
    return user ? user.username : null;
  } catch (error) {
    // gestion error
    console.error('couille in the potage', error);
    return null;
  }
};

UserSchema.methods.getAllConnectedUsers = async function() {
  try {
    const connectedUsers = await this.find({isConnected: true});
  } catch (error) {
    console.error('couille in the potage 2', error);
    throw error;
  }
}


UserSchema.pre<IUser>('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    this.password = await bcrypt.hash(this.password, 12)
  }
  next();
})

// Création du user model
const User = mongoose.model<IUser>('User', UserSchema);

export default User;
