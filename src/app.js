const path = require('path')
const express = require('express')
const request = require('request')
const hbs = require('hbs')
const app = express()

const staticDir = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
const url = 'http://dummy.restapiexample.com/api/v1/employees'

app.use(express.static(staticDir))
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, resp) => {
    resp.render('index', {
        title: 'This is index page...',
        author: 'Hari'
    })
})

app.get('/help', (req, resp) => {
    resp.render('help', {
        title: 'This is help page...',
        author: 'Sniki'
    })
})

app.get('/employee', (req, resp) => {
   getEmployees((result) => {
       var jsonData = JSON.parse(JSON.stringify(result))
       console.log(jsonData[0])
       resp.render('employee', {
           result: JSON.stringify(jsonData[0]),
           author: 'Nani'
       })
   })
})

app.get('*', (req, resp) => {
    resp.render('error', {
        title: 'This is error page...',
        author: 'Aadya'
    })
})
 function getEmployees(done) {
    request({url,json: true}, (err, resp) => {
        if (err) {
            console.log('Error has occured' + err)
        } else {
            const data = resp.body.data
            if (data) {
                data.forEach(e => {
                    const jsonData = JSON.parse(JSON.stringify(e))
                    console.log(jsonData.employee_name)
                })
            }
            done(data)
        }
    })
}
app.listen(3000, () => {
    console.log('app is up and running....')
})