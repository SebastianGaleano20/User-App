import http from "node:http";
import dotenv from "dotenv";
import fs, { read } from "node:fs";
dotenv.config();

const port = process.env.PORT;

const readDb = () => {
  const usersBuffer = fs.readFileSync("./src/database/users.json");
  const usersParsed = JSON.parse(usersBuffer);
  return usersParsed;
};

const serverHTTP = http.createServer((req, res) => {
  const users = readDb();
  if (req.method === "GET" && req.url === "/") {
    const responseServer = {
      status: 200,
      app: "http-users",
      routes: {
        index: "/",
        getProducts: "/user",
        addProducts: "/user",
      },
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(responseServer));
  } else if(req.method === "GET" && req.url === "/user"){
    const user = readDb();
   res.writeHead(200,{"Content-Type": "application/json" });
   res.end(JSON.stringify(user)); 
  }else if(req.method === "POST" && req.url === "/user"){
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });
   req.on("end",()=>{
    const newUser = JSON.parse(body);
    users.push(newUser);

    fs.writeFileSync("./src/database/user.json", JSON.stringify(users));
   })
   res.end("New user registred")
  }else{
    res.writeHead(404,{"Content-Type": "text-plain"});
    res.end("Error 404 Not-Found");
  }
});

serverHTTP.listen(port, () => {
  console.log(`Listening on http://localhost:${port}/`);
});
