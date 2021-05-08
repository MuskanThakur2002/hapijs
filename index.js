
const hapi = require("hapi");
const app = new hapi.server({
  port: 9000,
  host: "localhost",
});

const  post =async ()=>{
    await app.start()
    console.log(app.info.uri)
}

process.on('unhandledRejection',(err)=>{
    console.log('not found')
    process.exit(1)
})
post()

app.route([
    {
        method:'GET',
        path:'/',
        handler:(req,h)=>{
            return 'Hallo World'
        }
    },
    {
        method:'GET',
        path:"/about",
        handler:(req,h)=>{
            return 'about us'
        }
    },
    {
        method:'GET',
        path:"/profile/{name}/{age?}",
        handler:(req,h)=>{
            const age = req.params.age ? req.params.age:0
            return `welcome ${req.params.name} : ${age}`

        }
    },    {
        method:'GET',
        path:"/profile/{name}/{age?}",
        handler:(req,h)=>{
            const age = req.params.age ? req.params.age:0
            return `welcome ${req.params.name} : ${age}`

        }
    }

])