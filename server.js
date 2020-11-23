var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
var nodemailer = require('nodemailer');
var passwordHash = require('password-hash');
app = express();
app.use(express.json());

app.use(serveStatic(__dirname + "/dist"));
var port = process.env.PORT || 5000;
app.listen(port);
console.log('server started ' + port);
var connection;
var mysql = require('mysql')

// Register Patient WEB Begin
app.post('/api/registerPatient', function (req, response) {
  response.send("Register");
  insertpeople(req.body.server_namePatient, req.body.server_agePatient, req.body.server_phonePatient, req.body.server_mailPatient, req.body.server_passwordPatient);
});

function insertpeople(server_namePatient, server_agePatient, server_phonePatient, server_mailPatient, server_passwordPatient) {
  var hashPass = passwordHash.generate(server_passwordPatient);
  console.log(hashPass);
  var save_result
  connection.query("INSERT INTO patients(patients_name, patients_age, patients_phone,patients_mail,patients_password) VALUES('" + server_namePatient + "','" + server_agePatient + "','" + server_phonePatient + "','" + server_mailPatient +"','"+ hashPass + "')", function (err, result2) {
    if (err) throw err
    save_result = result2;
    console.log('The solution is1: ', result2)
  })

}
// Register Patient WEB End 

// Register Medical Check WEB Begin
app.post('/api/registerMedicalData', function (req, response) {
  response.send("RegisterH");
  insertMedicalData(req.body.server_name, req.body.server_age, req.body.server_phone, req.body.server_pulse, req.body.server_saturationO2,req.body.server_diseases);
});

function insertMedicalData(server_name, server_age, server_phone, server_pulse, server_saturationO2,server_diseases) {
  var save_result_medical
  connection.query("INSERT INTO history(history_name, history_age, history_phone,history_pulse,history_oxygen,history_diseases) VALUES('" + server_name + "','" + server_age + "','" + server_phone + "','" + server_pulse +"','"+ server_saturationO2 +  "','"+ server_diseases + "')", function (err, result_medical) {
    if (err) throw err
    save_result_medical = result_medical;
    console.log('The solution is1: ', result_medical)
  })

}
// Register Medical Check WEB End 



// Login Patient Medical Check WEB Begin
app.post('/api/loginPatient', function (req, response) {
  var save_result
  connection.query("SELECT * from patients WHERE patients_mail='" + req.body.server_mailPatient + "'", function (err, rows, result2) {
    if (err) throw err
    save_result = result2;

    console.log(rows.length);
    if (rows.length == 1) { //verify personel ID
      var hashedPassword = passwordHash.generate(req.body.server_passwordPatient);
      console.log(hashedPassword);
      console.log(rows[0].patients_password);
      console.log(req.body.server_passwordPatient);

      if (rows[0].patients_mail == req.body.server_mailPatient && (passwordHash.verify(req.body.server_passwordPatient, rows[0].patients_password))) { //verify user and pass
        console.log(rows[0].patients_mail);
        console.log(rows[0].patients_password);
        userDataPatient = {}; //object
        userDataPatient.name = rows[0].patients_name;
        userDataPatient.age=rows[0].patients_age;
        userDataPatient.phone = rows[0].patients_phone;
        userDataPatient.mail = rows[0].patients_mail; //save data in obj userData
        userDataPatient.password = rows[0].patients_password;
       
        console.log("True");
        response.send(userDataPatient);
      }
      else {
        response.send("Username or password invalid!")
      }
    }
    else {
      console.log("False");
      response.send("Doesn't exist!");
    }
  })

});
app.get('/api/loginData', (request, result) => {

  result.status(200).send({
    data: "test"
  })
})
// Login Patient Medical Check WEB End

// Login Doctor Medical Check WEB Begin
app.post('/api/loginDoctor', function (req, response) {
  var save_result
  connection.query("SELECT * from doctors WHERE doctors_persID ='" + req.body.server_persIdDoctor + "'", function (err, rows, result2) { // efectiv comanda utilizata pe baza de date
    if (err) throw err
    save_result = result2;

    console.log(rows.length);
    if (rows.length == 1) { //verify personel ID
      console.log(rows[0].doctors_password);
      console.log(req.body.server_passwordDoctors);
      console.log(rows[0].doctors_mail);
      console.log(req.body.server_mailDoctors);
      if ((rows[0].doctors_mail == req.body.server_mailDoctors) && (req.body.server_passwordDoctors== rows[0].doctors_password)) { //verify mail  and pass
        userDataDoc = {}; //object
        userDataDoc.name = rows[0].doctors_name;
        userDataDoc.mail = rows[0].doctors_mail; //save data in obj userData
        userDataDoc.persID= rows[0].doctors_persID;
        userDataDoc.password = rows[0].doctors_password;
        response.send(userDataDoc);
        console.log("True");
        console.log(userDataDoc.persIDDoctor);
        console.log(rows[0].doctors_name)
        
      }
      else {
        response.send("Username or password invalid!")
      }
    }
    else {
      console.log("False");
      response.send("Doesn't exist!");
    }
  })

});
app.get('/api/loginData', (request, result) => {

  result.status(200).send({
    data: "test"
  })
})
// Login Doctor Medical Check WEB End

// Contact WEB Begin

function sendMail(name, mail, mesaj) {
  //create transport as SMTP with gmail service
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'medicalcheck.application',
      pass: 'medicalparola'
    }
  });
  var mailOptions = {
    from: name,
    to: 'cristinafotonea@gmail.com',
    subject: mail,
    text: mesaj,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    }
    else {
      console.log('Email:' + info.response);
    }
  });
}
app.post('/api/mailcontacts', function (req, response) {
  response.send("Oki doki");
  sendMail(req.body.name, req.body.mail, req.body.mesaj);
});
// Contact WEB End

//History Patient WEB Begin
app.post('/api/getHistoryPatient', function (req, response) {
  var save_resultcrash
  connection.query("SELECT * from history", function (err, rows, resultcarcrash) {
    if (err) throw err
    save_resultcrash = resultcarcrash;
    response.send(rows);
  })

});

//History Patient WEB End
//List Patients WEB Begin
app.post('/api/getPatientsList', function (req, response) {
  var save_resultcrash
  connection.query("SELECT * from patients", function (err, rows, resultcarcrash) { 
    if (err) throw err
    save_resultcrash = resultcarcrash;
    console.log("List Patients ");
    response.send(rows);
  })

});

//List Patients WEB End






function handleDisconnect() {
  connection = mysql.createConnection({
    host: 'eu-cdbr-west-03.cleardb.net',
    user: 'bdbf67a3efdb8a',
    password: '0c36a25b',
    database: 'heroku_d7cc3eb93a568fd'
  }) // Recreate the connection, since
  // the old one cannot be reused.

  connection.connect(function (err) {              // The server is either down
    if (err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
  // If you're also serving http, display a 503 error.
  connection.on('error', function (err) {
    console.log("Restarting DB connection...")
    if (err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}

handleDisconnect();