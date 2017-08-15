const http = require('http');
const express = require('express');
const app = express();
const os = require('os');
const server = http.createServer(app);

let counter=0;
let PORT =  5000;


app.get('/', (req, res)=> res.send('counter: '+(counter++)+' pid:'+process.pid));
app.get('/info', (req, res)=>{
  res.json({
    cpus: os.cpus(),
    arch: os.arch(),
    freemem: os.freemem(),
    hostname: os.hostname(),
    networks: os.networkInterfaces(),
    avg: os.loadavg(),
    pid: process.pid
  });
});

app.get('/break', (req, res)=> {
  while(true);
});

[...process.argv].forEach(ar=> {
  if(ar.indexOf('--port')>-1){
    const parts = ar.split('=');
    PORT = parts.length ==2 ? parts[1] : PORT;
  }
});

server.listen(PORT, (err)=>{
  console.log(` listen on *:${PORT}`)
});
