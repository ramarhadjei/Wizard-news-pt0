const express = require("express");
const morgan = require("morgan");
const postBank = require("./postBank");
const postContent = require('./postContent');
const timeAgo= require('node-time-ago')

const PORT = 1337
const app = express();

app.use(morgan('dev'));
app.use(express.static('public'));
//console.log('port number', PORT)
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.get("/", (req, res) => {
  const posts = postBank.list();
  const html = `<!DOCTYPE html>
  <html>
    <head>
      <title>Wizard News</title>
      <header><img src="/logo.png"/>Wizard News</header>      
    </head>
    <body>
      ${posts.map(list=> `
      <div class='new-item'>
        <p>
          <span class="news-position"> ${list.id} .</span> 
          <a href=posts/${list.id}>${list.title}</a>
          <small>(by ${list.name}) </small>
        </p>
        <small class="news-info">
          ${list.upvotes} upvotes | ${timeAgo(list.date)}
        </small>
      </div>`
      ).join('')}
    </body>
  </html>`

// send response
  res.send(html);
})


/*
app.get('/posts', (req, res) => {
  const list = postBank.list();
//  console.log('i am here==> ',list)
  res.send(postList(list))
})
// send response
*/
app.get('/posts/:id', (req, res,next) => {
  const post = postBank.find(req.params.id);
  if (!post.id) {
    next(new error(404))
  } else {
    res.send(postContent(post))
  }
})

app.use(function (err, req, res, next) {
  console.log(err.message)
  if (err.message === 404) {
    res.status(404).send('404 not found')
  }else {
    res.status(500).send('Internal server error')
  }
})
 
app.listen(PORT,() => {
  console.log(`listening on port ${PORT}`) ;
});


