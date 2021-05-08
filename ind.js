const hapi = require("hapi");
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
        handler: (req,h)=>{
        return knex("test_det").insert({
            name:req.payload.name,
            hobby:req.payload.hobby,
            age:req.payload.age
        }).then((data)=>{
          console.log(data)
          return "created"
        }).catch((err)=>{
          console.log(err)
        })
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
