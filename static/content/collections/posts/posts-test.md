---
title: Welcome to Qards - a blogging platform for professionals
created_at: 2018-09-22T04:59:50.021Z
tags:
  - Qards
  - Release
categories: Release
meta:
  description: >-
    Qards is a blogging platform for professionals that differentiates itself by
    utilizing sets of "smart cards", closing the gap between publishers and
    developers
  keywords: 'qards, blogging platform, developers, blog, free, fast blog, pwa'
hero:
  alt: ' Qards - a blogging platform for professionals'
  image: /images/uploads/andrew-ridley-76547-unsplash.jpg
excerpt: >-
  Qards is a blogging platform for professionals that differentiates itself by
  utilizing sets of "smart cards", closing the gap between publishers and
  developers
---
{"widget":"qards-section-heading","config":"eyJ0aXRsZSI6IldoeSBhbm90aGVyIGJsb2dnaW5nIHNvZnR3YXJlPyIsInN1YnRpdGxlIjoiUWFyZHMgaXMgYSBiaXQgZGlmZmVyZW50IHRoYW4gb3RoZXIgYmxvZ2dpbmcgcGxhdGZvcm1zIn0="}

Blogs, in general, are quite static. Content gets published and that's it. Very little interaction is expected from the visitor besides a small subscribe to some mailing list or a comment to express opinions. There is no login box, signup, user session or anything like that. Blogs are supposed to attract readers that can be piped to another service...or not.

{"widget":"qards-section-heading","config":"eyJzdWJ0aXRsZSI6IiIsInRpdGxlIjoiUWFyZHMgaXMgZGlmZmVyZW50In0="}

With Qards, the gap between publishers and developers is reduced to a minimum. Every bit of content (even a paragraph like this one) can be customized by the publishing team.

Do you want to show a warning message in the middle of your text? An image gallery or a video? Your favourite soundcloud songs nicely wrapped and presented? A pie chart? Bar chart? A data table that is filterable, sortable or...searchable? Everything without having to embed third party code that never seems to accomodate with your design? Look no further because Qards does all of that, and so much more.

For a full list of widgets that we currently support please navigate to our next post: List of supported cards.

{"widget":"qards-section-heading","config":"eyJ0aXRsZSI6IlFhcmRzIGlzIGZhc3QifQ=="}

A platform that is supposed to rank well in search engines has to be fast and well optimised. Qards makes use of the latest technologies and recommendations from specialists in order to be fast, crawler friendly and user friendly.

There is no database involved which reduces the time it takes to render a page, any page. Everything compiles down to static files (HTML, CSS and Javascript) and served from a CDN.

{"widget":"qards-section-heading","config":"eyJ0aXRsZSI6IlFhcmRzIGlzIGVhc3ksIG9uIHRoZSBwb2NrZXQifQ=="}

You don't need a web server to create a new blog, you don't need a database or servers. Actually...you don't need to spend a single dime in order to have a super-fast, well oprimised and (https) secure blog that can handle any traffic without a sweat.

Thanks to external tools like Contentful and Netlify, everything can be up and running in minutes, with ssl, CDN and all the things that used to take hours and hours not long ago.

{"widget":"qards-section-heading","config":"eyJ0aXRsZSI6IlFhcmRzIGRvZXMgYSBsb3Qgb3V0IG9mIHRoZSBib3giLCJzdWJ0aXRsZSI6IldpdGggdGhlIHJpc2sgb2YgYmVpbmcgYSBiaXQgb3BpbmlvbmF0ZWQsIFFhcmRzIHRha2VzIGEgbG90IG9mIChvYnZpb3VzKSBkZWNpc2lvbnMifQ=="}

Some things are obvious and should not require your input. There's absolutely no excuse for not having a blog with mobile-first design that looks good and stays readable on all devices. There is also no excuse for a platform to not utilise proper caching techniques or remain readable even when offline.

These are just a few of the features that come with Qards by default, inside its core. Many other (questionable) optimisations and enhancements can be added by the use of plugins.

{"widget":"qards-section-heading","config":"eyJ0aXRsZSI6IldoYXQncyB0aGUgdGVjaG5vbG9neSBiZWhpbmQgUWFyZHM/Iiwic3VidGl0bGUiOiJMb3RzIG9mIEphdmFzY3JpcHQgKFR5cGVzY3JpcHQpIHdpdGggR2F0c2J5IGFuZCBSZWFjdCJ9"}

Qards breaks free of databases and servers. It is a static site based on Gatsby which means it's super fast and editable down to the smallest details. You can have a powerful blog that handles any amounts of traffic without a sweat…without spending a dime and without having to worry about setting up a database, a web server or getting hacked.

Gatsby is a fast static site generator written in Javascript and using React to create the pages and posts. We picked Gatsby because it features a very active community with a positive attitude. Since both Qards and Gatsby are react apps at their core, everything is extremely hackable and easy to configure.

Content is created using Contentful and hosting can be done just about anywhere you can upload html files. I recommend netlify for the simplicity of things and zero costs.

{"widget":"qards-section-heading","config":"eyJ0aXRsZSI6IldoYXQgaXMgdGhlIGN1cnJlbnQgc3RhdHVzIG9mIFFhcmRzPyIsInN1YnRpdGxlIjoiU29tZXdoYXQgZnVuY3Rpb25hbCBidXQgc3RpbGwgbm90IHJlYWR5IGZvciBhbiBhbHBoYSJ9"}

To put it short: not even an alpha release. This blog is powered by Qards but I'm still in a very early stage; something more like a proof of concept than a release.

I have a lot of todo's to take care of before releasing something to the public. The code is all over the place right now and it needs a lot of cleaning and testing.

**If you want to get notified about any updates or code releases make sure you subscribe to the newsletter (there's a subscribe form on this page, maybe two).**

{"widget":"qards-section-heading","config":"eyJ0aXRsZSI6IldoYXQgaXMgb24gdGhlIHRvZG8gbGlzdD8ifQ=="}

The list is pretty long but here are the most important aspects that I want to tackle and get right from the start:

* I need to create a card that allows you to display a TODO list. Funny right?
* Integrate search through Algolia or some other third party (maybe local with Lunr)
* a darker theme that can be toggled on and off
* I need a way of letting developers change the design and theme of their blog and still be able to upgrade to future versions without too many issues. That's a separation that I haven't had the time to contemplate on and I'm unsure how to achieve.
* I need to setup some sort of testing but not too soon because I'm still at a stage when I delete code just because I figured out easier methods and I hate deleting tests to be honest.
* The current way of creating and updating content is hard. Contentful is grouping children in such a way that makes no sense to a publisher working with Qards. Everything is displayed in an unnatural way and even I have problems creating posts. I might create a small admin for generating content but then....what's the purpose of contentful since that same admin could generate some static files that would allow us to completely brake free of third parties (I like json; do you?).
* Have a talk with a SEO specialist and address the most important things that a blog must have and Qards doesn't. I'm an old school and SEO is still my number one concern (besides content of course).
* Allow developers to create their own cards and add them through the plugin system
* A plugin system (doh)

{"widget":"qards-section-heading","config":"eyJ0aXRsZSI6IkNhcmRzIHRoYXQgSSBwbGFuIG9uIGFkZGluZyBhcyBwYXJ0IG9mIHRoZSBjb3JlIiwic3VidGl0bGUiOiJXaGlsZSB0aGUgcGxhdGZvcm0gc3VwcG9ydHMgYWRkaW5nIHlvdXIgb3duIGNhcmRzLCB0aGVzZSBhcmUgdGhlIG9uZXMgdGhhdCBJIHBsYW4gb24gbWFraW5nIHBhcnQgb2YgdGhlIGNvcmUifQ=="}

The cards represent the whole idea behind this platform so they're important to me. In theory, a publisher should have enough cards to express and shape his content as desired. It's like Bootstrap...but for content creators.



* photo image/gallery with slider and preview (modal)
* audio player with support for multiple files
* video player
* quote with support for an image background
* code blocks
* reveal sets - like an accordion
* todo list
* notification messages that stand out from the content (info, warning etc.)
* codesandbox/codemirror embed
* lists that support multiple options
* charts (bars, lines, pies etc)
* data tables (sortable, searchable) with static source of content or remote
* allow the creation of popovers/tooltips inside paragraphs (hovering on a target word for example)
* divider of content that can contain a horizontal bar or not
* progressbar that can take local data or remote
* giphy/unsplash integration (we sure love our cats and memes don't we?)
* github issues list embed (not sure about this one but seems like a neat idea)

... i will keep adding to this list once I get new ideas
