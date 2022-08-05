import { Router } from 'express';
//import  execute  from './models';
const { Pool } = require('pg');

const pool = new Pool({
    host: '127.0.0.1',
    user: 'postgres',
    database: 'testdb',
    password: 'myPassword',
    port: 5432,
});

// const execute = async (query,values=null) => {
//   try {
//       await pool.connect();     // gets connection
//       if(values){
//          await pool.query(query,values);  // sends queries
//       }else {
//         const result =  await pool.query(query);  // sends queries
//         return result;
        
//       }
     
//       return true;
//   } catch (error) {
//       console.error(error.stack);
//       return false;
//   } finally {
//       await pool.end();         // closes connection
//   }
// };



const router = Router();

router.get('/', async (req, res) => {
  //const users = await req.context.models.User.findAll();
  const users = {
    "aa": "test"
  }
  // const checkuser = "select exists(select 1 from leaderboard  WHERE phone = '9787897897')"

  // execute(checkuser).then(result => {
  //   // Check user exist or not if exist update the score
  //   if (result && result.rows[0].exists) {
  //       console.log('get data',result.rows[0].exists);
  //       //res.send(result);

  //       const updateScore = " UPDATE leaderboard SET score = 15000 WHERE phone = '9787897897')"
  //       execute(updateScore).then(updateResult => {
  //         // Check user exist or not if exist update the score
  //         if (updateResult) {
  //           res.send(true);
  //         }
  //       })


  //   } else {
  //     // Insert new score 
  //     res.send(false);

  //     const checkuser = "select exists(select 1 from leaderboard  WHERE phone = '978789789700')"
  //   }

    try {
         await pool.connect();     // gets connection
      
        const checkuser = "select exists(select 1 from leaderboard  WHERE phone = '97878978971111')"
        const result =  await pool.query(checkuser);  // sends queries
        if (result && result.rows[0].exists) {
          console.log('get data',result.rows[0].exists);
          //res.send(result);
  
        const updateScore = "UPDATE leaderboard SET score = '15000' WHERE phone = '9787897897'"
        const updateScoreResult =  await pool.query(updateScore);  // sends queries
        if (updateScoreResult) {
          res.send(true);
        }

      } else {
        // Insert new score 
        //res.send(false);
        const text = 'INSERT INTO leaderboard(user_id, firstname,lastname,phone,score,created_on) VALUES($1,$2,$3,$4,$5,$6) RETURNING *'
        const values = [6, 'reshma','Patel',7377897898,1500,'2022-08-4 19:11:25-07']
        const updateScoreResult =  await pool.query(text,values);  // sends queries
        if (updateScoreResult) {
          res.send(true);
        }
        
      }
      return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    } finally {
        await pool.end();         // closes connection
    }



});
  

router.get('/getTopScore', async (req, res) => {

  try {
    
   await pool.connect();     // gets connection
   const topScoreUsers = "SELECT * from leaderboard  ORDER BY score desc LIMIT 75"
   const result =  await pool.query(topScoreUsers);  // sends queries
   if (result) {
     console.log('get data',result);
     //res.send(result);
     res.send(result.rows);
   } 
    return true;

  } catch (error) {
    console.error(error.stack);
    return false;
  } finally {
    await pool.end(); // closes connection
  } 
  });


  //return res.send(users);
//});

router.get('/:userId', async (req, res) => {
  // const user = await req.context.models.User.findByPk(
  //   req.params.userId,
  // );
 

  const user = {
    "aa": "test"
  }
  return res.send(user);
});

router.post("/addScore", async (req, res) => {
  
  // Validate request
  //  if (!req.body.score) {
  //   res.status(400).send({
  //     message: "Score can not be empty!"
  //   });
  //   return;
  // }
  
  const text = 'INSERT INTO leaderboard(user_id, firstname,lastname,phone,score,created_on) VALUES($1,$2,$3,$4,$5,$6) RETURNING *'
  const values = [5, 'raj','Patel',7877897898,200,'2022-08-4 19:11:25-07']

  execute(text,values).then(result => {
    if (result) {
        console.log('New record created');
        res.send(result);
    }
});

  // async/await
  // try {
  //   const res = await client.query(text, values)
  //   console.log(res.rows[0])
  //   // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
  // } catch (err) {
  //   console.log(err.stack)
  // }
    
  // Create a Tutorial
    // const tutorial = {
    //   title: req.body.title,
    //   description: req.body.description,
    //   published: req.body.published ? req.body.published : false
    // };

   // Save Tutorial in the database
    // Tutorial.create(tutorial)
    // .then(data => {
    //   res.send(data);
    // })
    // .catch(err => {
    //   res.status(500).send({
    //     message:
    //       err.message || "Some error occurred while creating the Tutorial."
    //   });
    // });


});

export default router;
