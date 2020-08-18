const timeAgo= require('node-time-ago')
// require('html-template-tag')
//console.log('inside postList ==> ', list[1])
module.exports = list => `<!DOCTYPE html>
<html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" type="text/css" href="/style.css" />
  </head>
  <body>
    <div class="new-list">
      <header><img src="/logo.png"/>Wizard News</header>
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
    </div>
  </body>
</html>`;  