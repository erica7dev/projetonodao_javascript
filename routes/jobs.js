const express = require('express');
const router = express.Router();
//model
const Job = require('../model/Job');

//routes
router.get('/test', (req, res) => {
  res.send('Exit!');
})

//envio
router.get('/add', (req, res) => {
  res.render('add');
})

//descricao 
router.get('/view/:id', (req, res) => Job.findOne({
  where: {id: req.params.id}
}).then(job => {

  res.render('view', {
    job
  });

}).catch(err => console.log(err)));

//add job
router.post('/add', (req, res) => {
  let {title, salary, company, description, email, new_job} = req.body;

  //inserindo
  Job.create({
    title,
    description,
    salary,
    company,
    email,
    new_job
  }).then(() => res.redirect('/'))
    .catch(err => console.log(err));
});

module.exports = router