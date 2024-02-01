import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/companydb')
    .then(db => console.log('db is connected'))
    .catch(e => console.error('Error: ', e));