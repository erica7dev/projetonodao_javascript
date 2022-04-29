const express = require("express");
const app = express();
const path = require("path");
const exphbs = require("express-handlebars");
const db = require('./db/connection');
const Job = require('./model/Job');
const Sequelize  = require('sequelize');
const Op = Sequelize.Op; //consulta mais complexa do sequelize


const PORT = 3000;

//body parser
app.use(express.urlencoded({ extended: false }));


//resgatando dados do db e jogando na view
app.get('/', (req, res) => {
  
  let search = req.query.job;
  let query = '%' + search + '%'; //oplike, se digitar ph = php... w - wordpress...
//se não tiver busca, mostre tudo
  if(!search) {
    Job.findAll({order: [
      ['createdAt', 'DESC']
    ]})
    .then(jobs => {
  
      res.render('index', {
        jobs
      });
  
    })
    .catch(err => console.log(err));
  } else {
    Job.findAll({ //job da consulta
      where: {title: {[Op.like]: query}},
      order: [
        ['createdAt', 'DESC']
    ]})
    .then(jobs => {
      console.log(search);
      console.log(search);
  
      res.render('index', {
        jobs, search
      });
  
    })
    .catch(err => console.log(err));
  }

  
})

//static
app.use(express.static(path.join(__dirname, 'public')));


//routes
app.use('/jobs', require('./routes/jobs'));

// db connection
db
  .authenticate()
  .then(() => {
    console.log("Conectou ao banco com sucesso");
  })
  .catch(err => {
    console.log("Ocorreu um erro ao conectar", err);
  });


  //view engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.listen(PORT, function () {
  console.log(`It's ok! Port:${PORT}`);
});

