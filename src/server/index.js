require("dotenv").config()
const app = require("./server")

app.listen(process.env.PORT || 8080, () => {
    console.log(`app started listening at port ${process.env.PORT || 8080}`)
})