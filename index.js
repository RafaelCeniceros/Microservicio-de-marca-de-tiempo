// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/:date', function(req, res) {
  let dateInput = req.params.date;

  // Si no se proporciona ninguna fecha, usamos la fecha y hora actuales
  if (!dateInput) {
    dateInput = new Date().getTime(); // Obtiene la hora actual en milisegundos
  }

  // Si dateInput es un número, lo tratamos como un timestamp en segundos
  if (!isNaN(dateInput)) {
    const dateInMilliseconds = parseInt(dateInput); // Convertimos el timestamp a milisegundos
    const utcDateString = new Date(dateInMilliseconds).toUTCString(); // Convertimos el timestamp a una cadena de fecha UTC

    res.json({ unix: dateInMilliseconds, utc: utcDateString });
  } else {
    const unixTimestamp = new Date(dateInput).getTime(); // Obtiene la marca de tiempo Unix en milisegundos

    // Verifica si la fecha de entrada es válida
    if (!isNaN(unixTimestamp)) {
      const utcDateString = new Date(unixTimestamp).toUTCString(); // Convertimos el timestamp a una cadena de fecha UTC

      res.json({ unix: unixTimestamp, utc: utcDateString });
    } else {
      res.json({ error: "Invalid Date" });
    }
  }
});

app.get('/api/', function(req, res) {
  // Obtener la hora actual en milisegundos y convertirla a una cadena de fecha UTC
  const currentUnixTimestamp = new Date().getTime();
  const currentUtcDateString = new Date(currentUnixTimestamp).toUTCString();

  // Enviar la respuesta con la hora actual en formato JSON
  res.json({ unix: currentUnixTimestamp, utc: currentUtcDateString });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
