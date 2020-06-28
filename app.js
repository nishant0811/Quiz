//jshint esversion:6
const express = require("express");
const bp = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

let name;
let answerss;
let result=[]
let result2=[]
let question=[
  {question : "functional megaspore in an angiosperm develops into an" , options : ["endosperm"," embryo sac","embryo","ovule"], Answer : 2, id:1},
{question : "Attractants and rewards are required for " , options : ["entomophily ","hydrophily","cleistogamy","anemophily"], Answer : 1, id:2},
{question : "Double fertiisation is exhibited by" , options : ["algae","fungi","angiosperms","gymnosperms"], Answer :3 , id:3 },
{question : "The coconut water from tender coconut represents " , options : ["Free nuclear proembryo","free nuclear endosperm","endocarp","fleshy mesocarp"], Answer : 2 , id:4 },
{question : "Seed formation without fertilisation in flowering plants invloves the process of " , options : ["somatic hybridisation","apomixis","sporulation","budding"], Answer : 2 , id:5},
{question : "Proximal end of the filament of stamen is attached to the " , options : ["Placenta","thalamus or petal","anther","connective "], Answer : 3 , id:6},
{question : "In angiosperms, microsporogenesis and megasporogenesis" , options : ["Involve meiosis","occurs in ovule","occurs in anther","form gaetes without further division"], Answer : 1 , id:7},
{question : "Which one of the following fruit is parthenocarpic" , options : ["Jack Fruit","Banana","Brinjal","Apple"], Answer : 2 , id:8},
{question : "function of filiform apparatus is to" , options : ["recognize the suitable pollen at stigma","stimulate division of generative cell","produce nectar","guide the entery of pollen tube"], Answer : 4 , id:9},
{question : "Perisperm differ from endosperm in " , options : ["being a diploid tissue","its formation by fusion of secondary nucleus with several sperms","being a haploid tissue","having no reserve food"], Answer : 1 , id:10},
{question : "Which of the following depicts the correct pathway of transport of sperm" , options : ["Rete testis --> Efferent ductules --> Epididymis --> Vas deferens","Rete testis -->  Epididymis --> Efferent ductules --> Vas deferens","Rete testile --> Vas deferens --> Efferent ductules --> Epididymus","Efferent ductules --> Rete testis --> Vas deferens --> Epidymis"], Answer : 1 , id:11},
{question : "fertilisation in humans is practically feasible only if " , options : ["The ovum and sperms are transported simultaneously to ampullary-isthmic junction of the cervix","The sperm is transported into crevix within 48 hours of release of ovum in uterus","the sperm are transported into vagina just after the release of ovum in fallopian tube","THe ovum and sperms are transported simultaneously to ampullary-isthmic junction of the fallopian tube"], Answer : 4 , id:12},
{question : "In human females , meiosis-II is not completed until " , options : ["uterine implantation","birth","puberty","fertilisation"], Answer : 4 , id:13},
{question : "The Foetal ejection reflex in humans triggers the release of " , options : ["oxytocin from foetal pituitary","Human chronic gonadotropin(hCG) from placenta","human placental lactogen (hPL) from placenta","oxytocin from meternal pituitary"], Answer : 4 , id:14},
{question : "The testes in humans are situated outside the abdominal cavity inside a pouch called scrotum. The purpose served is for" , options : ["maintaining the scrotal temperature lower than the internal body","escaping any possible compression by the visceral organs","providing more space for the growth of Epididymis","providing a secondary sexual feature for exhibiting male sex"], Answer : 1 , id:15},
{question : "Vasa efferentia are the ductules leading from   " , options : ["testicular lobules to rete testis","rete testis to vas deferens","vas deference to Epididymis","Epididymis to urethra"], Answer : 2 , id:16},
{question : "Seminal plasma in human males is rich in " , options : ["fructose and calcium ","glucose and calcium","DNA and testosterone","ribose and potassium"], Answer : 1 , id:17},
{question : "The part of fallopian tube closest to the ovary is" , options : ["isthmus ","infundibulum","cervix","ampulla"], Answer : 2 , id:18},
{question : "The correct sequence of spermatogenetic stages leading to the formation of sperms in a mature human testis is" , options : ["spermatogonia-spermatocyte-spermatid-sperms","spermatid-spermatocyte-spermatogonia-sperms","spermatogonia-spermatid-spermatocyte-sperm","spermatocyte-spermatogonia-spermatid-sperms"], Answer : 1 , id:19},
{question : "The middle piece of the sperm contains" , options : ["porteins","mitochondria","centriole","nucleus"], Answer : 2 , id:20},

]


let quest=
  [
  {
id: 1,
type: 1,
title: "My G Link",
dis: "",
url: "https://www.google.com/",
thumb: "",
state: 1,
user_id: 9,
order: 1,
videourl: ""
},
{
id: 2,
type: 2,
title: "My G Link",
dis: "",
url: "https://www.google.com/",
thumb: "",
state: 1,
user_id: 9,
order: 2,
videourl: ""
},
{
id: 3,
type: 2,
title: "My Video Link",
dis: "",
url: "https://www.google.com/",
thumb: "",
state: 1,
user_id: 9,
order: 3,
videourl: "https://www.youtube.com/"
}
];
const app = express();

let count =0;

app.set('view engine', 'ejs');

app.use(bp.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/",function(req,res){
  console.log(count++);
  res.render("home");
});
app.post("/",function(req,res){
  name= req.body.name +' '+req.body.section+' '+req.body.rollnum;
  name = _.kebabCase(name);
  res.redirect("/quiz/"+name);
})
app.get("/quiz/:name",function(req,res){
res.render("quiz",{question : question, d : req.params.name});

})

app.post("/quiz/:name",function(req,res){
  let count = 0
  let flag = 0
  let anss =[];
  let f= req.body
  for (const[key,value] of Object.entries(f)){
    anss.push(value);
    for(let i = 0 ; i <question.length; i++ ){
      if(question[i].Answer == value && question[i].id == key ){
        count+=1;
        break;
      }
    }
  }
  result.push({name : req.params.name, marks : count , ans : anss });



  for (let j=0; j<result2.length;j++)
  {
    if(result2[j].name === req.params.name){
      flag=1;
      break;
    }
  }
  if(flag == 0){
    result2.push({name : req.params.name, marks : count , ans : anss });
  }
  flag=0;
  count=0;
  res.redirect("/thanks/"+req.params.name);
})

app.get("/thanks/:name",function(req,res){
  res.render("thanks.ejs");
})

app.get("/res34@1",function(req,res){
  res.render("results.ejs",{res : result})
})
app.get("/res34@2",function(req,res){
  res.render("results2.ejs",{res : result2})
})






app.get("/sort",function(req,res){
  res.render("sort",{question : quest});
})

app.post("/sort",function(req,res){
  const k=[];
  const ids = req.body.ids;
  console.log(ids);
  for(let i=0;i<ids.length;i++){
    k.push(quest[ids[i]-1]);
  }
    quest = k;

      for(let i=0;i<ids.length;i++){
        quest[i].id = i+1;
  }
  console.log(quest);

});
















app.listen(3000,function()
{
  console.log("Server up and running on port 3000");
})
