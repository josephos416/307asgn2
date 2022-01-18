const express = require('express');
const app = express();
const port = 5000;





const users = {
   users_list :
   [
      {
         id : 'xyz789',
         name : 'Charlie',
         job: 'Janitor',
      },
      {
         id : 'abc123',
         name: 'Mac',
         job: 'Bouncer',
      },
      {
         id : 'ppp222',
         name: 'Mac',
         job: 'Professor',
      },
      {
         id: 'yat999',
         name: 'Dee',
         job: 'Aspring actress',
      },
      {
         id: 'zap555',
         name: 'Dennis',
         job: 'Bartender',
      }


   ]
}






const cors = require('cors');
app.use(cors());


app.use(express.json());




app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if (name != undefined && job != undefined){
        let result = findUserByJobAndName(name, job);
        result = {users_list: result};
        res.send(result);
    }
    else if (name != undefined){
      let result = findUserByName(name, job);
      result = {users_list: result};
      res.send(result);
    }
    else{
        res.send(users);
    }
});

const findUserByName = (name) => {
    return users['users_list'].filter( (user) => user['name'] === name);
}

const findUserByJobAndName = (name, job) => {
    return users['users_list'].filter( (user) => user['name'] === name).filter( (user) => user['job'] === job);
  }


function findUserById(id) {
    return users['users_list'].find( (user) => user['id'] === id); // or line below
    //return users['users_list'].filter( (user) => user['id'] === id);
}
app.post('/users', (req, res) => {
    const userToAdd = req.body;
    const name = req.name;
    userToAdd['id'] = makeid(5);
    addUserWID(userToAdd);
    res.status(201).send(userToAdd).end;




});


function makeid(length){
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
   }
   return result;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function addUserWID(user){
    users['users_list'].push(user);
}


app.delete('/users/:id', (req, res) =>{
  const id = req.params['id']; //or req.params.id
  let result = findUserById(id);
  if (result === undefined || result.length == 0)
      res.status(404).send('Resource not found.');
  else {
      removeUser(users['users_list'].indexOf(result)  );
      res.status(204).end();
  }
});

function removeUser(index){
   users['users_list'].splice(index, 1);
}


function addUser(user){
    users['users_list'].push(user);
}
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
