const createError = require("http-errors");
require("./database/connection");
const bodyParser = require("body-parser");
const express = require("express");

const { query } = require("./database/connection");

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.get("/employees", async(req,res) => {
try {
    const sqlQuery = `SELECT * FROM employee`;
    const data = await query(sqlQuery);
    if(!data.length){
       res.send("Data not found");
       return;
    }
    res.json(data).send("data fetched successfully");
} catch (error) {
    res.status(createError.InternalServerError)
}
  
});

app.post("/add-employee", async (request, response) => {
  console.log("request", request.body);
  var { emp_firstName, emp_lastName, emp_phoneNumber, emp_email } =
    request.body;
  console.log("emp_firstName", emp_firstName);
  try {
    const sqlQuery = `INSERT INTO employee (emp_firstName,emp_lastName,emp_phoneNumber,emp_email) VALUES (?,?,?,?)`;
    const row = await query(sqlQuery, [
      emp_firstName,
      emp_lastName,
      emp_phoneNumber,
      emp_email,
    ]);
    console.log("row", row);
    if (row.affectedRows !== 1) {
      response.status(createError.BadRequest);
      return;
    }
    response.status(200).send("Employee added successfully");
  } catch (error) {
    console.log("error", error);
    response.send(createError.InternalServerError);
  }
});

app.listen(3000, () => {
  console.log("server is running on" + 3000);
});
