import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const {Schema, model} = mongoose;

interface IRegister {
  fullname: string,
  email: string,
  password: string,
};

const registerSchema = new Schema({
  fullname: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  
}, {collection: 'users'});

registerSchema.pre('save', function (this: IRegister, next: () => void) {
  if (this.password.length < 6) throw new Error('Password should greter then 6');
  
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(this.password, salt);
  
  this.password = hashPassword;
  next();
});

const Register = model<IRegister>('Register', registerSchema);

// TEST
// const andri = new Register({
//   fullname: 'Andri MAMANG',
//   email: 'mamang@gmail.com',
//   password: '123456'
// });
// async function run(){
//   try{
//     await andri.save();
//   }catch(error) {
//     console.log(error);
//   }
// }
// run();
export {Register};