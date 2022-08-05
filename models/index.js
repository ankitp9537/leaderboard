
const { Client } = require('pg');

const client = new Client({
    host: '127.0.0.1',
    user: 'postgres',
    database: 'testdb',
    password: 'myPassword',
    port: 5432,
});

const execute = async (query,values=null) => {
    try {
        await client.connect();     // gets connection
        if(values){
            await client.query(query,values);  // sends queries
        }else {
            await client.query(query);  // sends queries
        }
       
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    } finally {
        await client.end();         // closes connection
    }
};

const text = `
      CREATE TABLE IF NOT EXISTS "leaderboard" (
        "id" SERIAL,
        "user_id" INT NOT NULL,
	    "firstname" VARCHAR(50) NOT NULL,
        "lastname" VARCHAR(50) NULL,
	    "phone" VARCHAR(20) UNIQUE NOT NULL,
        "score" INT NOT NULL,
	    "created_on" TIMESTAMP NOT NULL,
	    PRIMARY KEY ("id")
    );`;

execute(text).then(result => {
    if (result) {
        console.log('Table created');
    }
});


// const sequelize = new Sequelize(
//   process.env.DATABASE,
//   process.env.DATABASE_USER,
//   process.env.DATABASE_PASSWORD,
//   {
//     dialect: 'postgres',
//   },
// );


export default { execute };

