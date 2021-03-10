const app = require('./app');

app.set('PORT', process.env.PORT || 8080);

const server = app.listen(app.get('PORT'), () => {
    console.log(`Listening on ${server.address().port}`);
});