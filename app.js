const app = require("express")()
const { z } = require("zod")

// middleware
let numberOfRequests = 0
const calculateRequests = (req, res, next) => {
    numberOfRequests++
    next()
}

const userMiddleware = (req, res, next) => {
    let usernameSchema = z.string()
    username = req.headers.username
    let passwordSchema = z.string().min(4)
    password = req.headers.password

    
    if(!(usernameSchema.safeParse(username) && username == 'rajneel') || !(passwordSchema.safeParse(password) && password == 'pass')) {
        res.status(403).json({
            msg: "user doesn't exist"
        })
    } else {
        next()
    }
}

const kidneyMiddleware = (req, res, next) => {
    const kidneyId = req.query.kidneyId
    
    if(!(kidneyId==1 || kidneyId==2)) {
        res.status(411).json({
            msg: "something wrong with inputs"
        })
    } else {
        next()
    }
}

app.use(calculateRequests, userMiddleware, kidneyMiddleware)

app.get('/health-checkup', (req,res) => {
    
    res.json({
        msg: "your kidney is fine"
    })
})

app.get('/numberOfRequests', (req, res) => {
    res.json({
        numberOfRequests: numberOfRequests
    })
})

//global catches
app.use((err, req, res, next) => {
    res.json({
        msg: "sorry something is up with the server"
    })
})

app.listen(3000, () => {
    console.log('running');
})