const mongoose=require('mongoose')
const ClientSchema = mongoose.Schema({
  Name: { type: String, required: true },
  Mail: { type: String, required: true },
  URLS: [{ long: String, short: String, Click: { type: Number, default: 0 } }],
});
var Users:any;
try {
     Users = mongoose.model("Clients",ClientSchema);
} catch (error) {
     Users=mongoose.model("Clients")
}
export default Users
