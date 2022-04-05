import app from './app.js';
import * as http from 'http';


async function start() { 
const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);
const server = http.createServer(app);
server.listen(port, () => {
    console.info(`Server started on port ${port}.`)
});
}



start()



