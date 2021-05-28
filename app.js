var express = require('express');
const articleRouter = require('./routes/articles')
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Article = require('./models/article');
const app = express();
const PORT = 3030

const connection = ()=>{
    mongoose.connect('mongodb+srv://keisha1712:keisha@2005@cluster0.kq4gc.mongodb.net/blogapp?retryWrites=true&w=majority' , {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log('connected to database(mongodb)');
};
connection();

//setting u view engine//
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));

//routes//
app.get('/', async (req, res)=>{
    const articles = await Article.find().sort({createdAt: 'desc'})
    res.render('articles/index', {articles : articles} )
});

app.use('/articles', articleRouter);


//listening port//
app.listen(PORT, ()=> {
    console.log(`server is running on http://localhost:${PORT}`);
});

