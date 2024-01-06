import express from "express";
import cors from "cors";
const crypto = require('crypto');

const PORT = 8080;
const app = express();
const database = { data: "Hello World", checksum : 0 };
//Assuming that this is a backup database that is stored in cloud
const backupDatabase =  Object.create(database);

app.use(cors());
app.use(express.json());

// Routes
app.get("/restoreBackup", (req, res) => {
    backupDatabase.checksum = checksum(backupDatabase.data);
    res.json(backupDatabase);
});

app.get("/", (req, res) => {
  database.checksum = checksum(database.data);
  backupData(database.data);
  res.json(database);
});

app.post("/", (req, res) => {
  database.data = req.body.data;
  database.checksum = checksum(req.body.data);
  backupData(req.body.data);
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

function backupData(data: String) {
  backupDatabase.data = data;
  backupDatabase.checksum = checksum(data);
}

//Hashing the data to ensure the integrity of the data
function checksum(data: String) {
  return crypto.createHash('sha256').update(data).digest('hex');;
}