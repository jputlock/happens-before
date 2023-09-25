import * as express from 'express';

const app = express();
const port = parseInt(process.env.PORT ?? '8080');

app.listen(port, () => console.log(`Server launched on port ${port}`));

// Expose the public/ directory to clients
app.use(express.static('public/'));
