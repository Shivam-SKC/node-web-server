const express = require('express');
const hbs = require('hbs');
const { text } = require('express');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');


app.set('view engine', hbs);

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('unable to append file');
        }
    });
    next();
})

hbs.registerHelper('getCurrentyear', () => {
    return new Date().getFullYear()
})
hbs.registerHelper('screamit', (text) => {
    return text.toUpperCase();
})
app.get('/', (req, res) => {
    res.send('Hello express');
})

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// })

app.get('/index', (req, res) => {
    res.render('index.hbs',
        {
            pageTitle: 'index page',
            welcomeMesg: 'welcome to the index page'
        })
})
app.get('/about', (req, res) => {
    res.render('about.hbs',
        {
            pageTitle: 'About page',
        })
})

app.listen(port, () => {
    console.log(`server is on the port ${port}`);
});
