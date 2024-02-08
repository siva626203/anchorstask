const mongoose=require('mongoose')
const Connection=()=>{
    try {
        mongoose.connect(
          "mongodb+srv://siva1234:1234@cluster0.o6fb4cc.mongodb.net/?retryWrites=true&w=majority"
        )
        console.log("Connection success")
    } catch (error) {
        console.log(error)
    }
}
export default Connection