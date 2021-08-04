// const btn = document.querySelector(".add-btn")
var remove = document.querySelectorAll('.remove')
var table = document.querySelector(".table")
var isCompleted = document.querySelector('.isCompleted')
var items = document.querySelectorAll('.items')
var list = document.querySelectorAll('.list')
var lessons = document.getElementById('txt')
// const Lessons = require('../models/lessonsModel')

fetch( "../data/lessons.json")
.then(res => res.json())
.then(console.log(res));


// txt.forEach(function(el) {

// })

// let nodes = langs.map(lang => {
//     let li = document.createElement('a');
//     li.textContent = lang;
//     return li;
// });
// txt.append(nodes)

items.forEach(function(el){
  el.addEventListener('click', function () {
    el.classList.add('isCompleted')
  })
});


remove.forEach(function(el){
  el.addEventListener('click', function (){
    el.classList.remove('isCompleted')
})
})