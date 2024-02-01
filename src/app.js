import express from 'express';
import morgan from 'morgan';
import{ createRoles } from './libs/initialSetup'

// routes

import productsRoutes from './routes/products.routes';
import authRoutes from './routes/auth.routes'
createRoles();

const app = express();

app.use(express.json());
app.use(morgan('dev'));



app.get('/',(req,res)=>{
    res.send("<h1>Hola</h1>")
    console.log('Welcome')
})

app.use(authRoutes);
app.use('/products',productsRoutes)

export default app;