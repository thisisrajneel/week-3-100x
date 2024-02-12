const app = require("express")()


// middleware
let numberOfRequests = 0
const calculateRequests = (req, res, next) => {
    numberOfRequests++
    next()
}

const userMiddleware = (req, res, next) => {
    const username = req.headers.username
    const password = req.headers.password
    
    if(username != 'rajneel' || password != 'pass') {
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

app.listen(3000, () => {
    console.log('running');
})