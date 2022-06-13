require("dotenv").config()
const app = require("./server")

app.listen(process.env.PORT || 8080, () => {
    console.log(`app listening at port http://localhost:${process.env.PORT || 8080}`)
})