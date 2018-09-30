The `app` folder is where you should create your files, assets, pages and
everything else that you need for your application.

In order for you to be able to keep Qards updated I advise you to resist the
temptation of modifying files outside of this directory. If you find something
that doesn't work or needs enhancemenets please head over to our 
[Issues](https://github.com/QardsJs/qards/issues) page and start a discussion.
If you have the time and kindness to make Qards better you can submit a pull
request with bug fixes or new features.

The `pages` directory is where you can create your pages. Qards is not a locked
blog and you can use it to create fully functional websites. You can create any
page you like, at any path, except for `/blog` which is reserved by an internal
page (`src/pages/blog.tsx`). There is an exact replica of that page in your
`app/pages/index.example.tsx` directory and it points to `/`. If you need a 
simple blog, you can leave it as it is but, if you want to create a website with 
a blog, you can play with the routes as you like (don't forget to rename it to 
`index.tsx`).
