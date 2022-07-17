import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// const uri = 'mongodb+srv://cluster0.zikks.mongodb.net/?retryWrites=true&w=majority';
const {Schema, model} = mongoose;

// interface ILogin {
//   user: string,
//   pass: string,
//   dbName: string
// }

interface IRegister {
  fullname: string,
  email: string,
  password: string,
};


// connect(uri, <ILogin>{
//   user: 'yadbro',
//   pass: 'Ganteng321',
//   dbName: 'mgi_Yadi-Apriyadi'
// })
// .then(() => console.log('Successfully Connected'))
// .catch(() => console.log('There is problem with your connection'));

const registerSchema = new Schema({
  fullname: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  
}, {collection: 'users'});

registerSchema.pre('save', function (this: IRegister, next: () => void) {
  const emailIsRegistered =  Register.findOne({email: this.email});
  // emailIsRegistered.then(() => {throw new Error('The email is registered')});
  
  if (emailIsRegistered !== null) throw new Error('The email is registered');
  
  if (this.password.length < 6) throw new Error('Password should greter then 6');
  
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(this.password, salt);
  
  this.password = hashPassword;
  next();
});

const Register = model<IRegister>('Register', registerSchema);

// const yadi = new User({
//   fullname: 'Yadi Apriyadi',
//   email: 'yadi@gmail.com',
//   password: '1234'
// });
// .then(()=>console.log('berhasil'))
// .catch((err)=>console.log(err));
// async function run(){
//   try{
//     await yadi.save();
//   }catch(error) {
//     console.log(error);
//   }
// }
// run();
export {Register};