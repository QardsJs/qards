Netlify CMS adds paths in it's frontmatter (and anywhere else it deals with
markdown) relative to its `media_folder`. The problem is that gatsby does not
recognize those images and will fail to create and transform images for display.

We're trying here to transform, on-the-fly, all the paths we can find before
they reach gatsby.