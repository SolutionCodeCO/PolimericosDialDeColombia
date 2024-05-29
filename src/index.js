const express = require ('express')
const morgan = require ('morgan')
const {engine} = require ('express-handlebars')
const path = require ('path')

// inicializacion
const app= express()

// config
app.set('port', process.env.PORT || 4000)
app.set('views', path.join(__dirname, 'views'))

app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'Layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars'),

}))
app.set('view engine', '.hbs')

// middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// variables globales
app.use((req, res, next)=>{
    next()
})

// rutas
app.use(require('./routes'))
app.use(require('./routes/cursos'))
app.use(require('./routes/autenticacion'))
app.use(require('./routes/usuario'))
app.use(require('./routes/administrador'))


// archivos publicos
app.use(express.static(path.join(__dirname, 'public')))

// iniciar el servidor
app.listen(app.get('port'), ()=>{
    console.log(">>>> SERVIDOR CORRIENDO EN EL PUERTO:", app.get("port"));
})