const Article = require('./../models/article')
var express = require('express');
const router = express.Router()

router.get('/new', (req, res)=> {
    res.render('articles/new', {article: Article()} );
});

router.get('/edit/:id', async (req,res)=> {
    const article = await Article.findById(req.params.id)
    res.render('articles/edit', {article : article} );
});

router.get('/:id', async (req, res)=> {
    const article = await Article.findById(req.params.id)
    if(article==null) res.redirect('/')
    res.render('articles/show', {article: article});
});

//routes for saving the articles//
router.post('/', (req, res, next)=>{
    req.article = new Article()
    next() 
}, saveArticleAndRedirect('new'));

router.put('/:id', async (req, res, next)=>{
    req.article = await Article.findById(req.params.id)
    next()
}, saveArticleAndRedirect('edit'));

router.delete('/:id', async (req, res)=> {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
});


function saveArticleAndRedirect(path){
    return async (req, res)=>{
        let article = req.article
        article.title = req.body.title
        article.description = req.body.description
        article.markdown = req.body.markdown

        try {
            article = await article.save()
            res.redirect(`/articles/${article.id}`)
        }
        catch(e){
            res.render(`articles/${path}`, {article:article})
        }
    }
}
module.exports = router;
