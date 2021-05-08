const hapi = require("hapi");
const joi=require('joi')
const app = new hapi.server({
  port: 5000,
  host: "localhost",
});

const knex = require("knex")({
    client: "postgres",
    connection: {
      host: "localhost",
      user: "postgres",
      password: "muskan@123",
      database: "test",
    },
});
knex.schema.hasTable("test_det").then((exists) => {
if (!exists) {
    return knex.schema.createTable("test_det", (t) => {
    t.increments("id").primary();
    t.string("name", 100);
    t.string("hobby", 100);
    t.string("age", 100);
    });
  }
});
app.route([
    {   
        method:'POST',
        path:'/create',
        config:{
            validate:{
                payload:{
                    name:joi.string().required(),
                    hobby:joi.string().required(),
                    age:joi.string().required()
                }
            }
        },
        handler:(req,h)=>{
            h(req.payload)
        }
    },
    {
      method: "GET",
      path: "/all",
      handler: (req, h) => {
        return knex.select("*").from("test_det");
      }
    }
])

const  post =async ()=>{
    await app.start()
    console.log(app.info.uri)
} 
process.on('unhandledRejection',(err)=>{
    console.log('not found')
    process.exit(1)
})

post()
