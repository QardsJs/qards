---
title: Qards vs other platforms
created_at: 2018-09-27T18:29:30.261Z
tags:
  - Qards
  - Wordpress
authors: Romeo Mihalcea
categories: Qards
meta:
  description: In this post we compare Qards with other blogging platforms
  keywords: 'qards, wordpress, ghost, blogging, blog platform, free blog'
isPage: false
isFeatured: false
hero:
  alt: Qards vs other platforms
  image: /images/uploads/neonbrand-428982-unsplash.jpg
excerpt: In this post we compare Qards with other blogging platforms
---
{"widget":"qards-section-heading","config":"eyJ0aXRsZSI6IlFhcmRzIHZzIFdvcmRwcmVzcyIsInN1YnRpdGxlIjoiRmFzdGVyLCBsaWdodGVyLCBjaGVhcGVyIGFuZCBtb3JlIHNlY3VyZSIsInR5cGUiOiJwcmltYXJ5In0="}

Everyone likes to bash on Wordpress nowadays and I'm no exception. Don't get me wrong because I'm not a hater. I know Wordpress since it was released and I'm aware that it powers millions of websites. That's a fantastic achievement by the most popular piece of software of our days. Milions of dollars have been made and continue to be made by offering professional services related to Wordpress.

But...(Nothing Someone Says Before The Word But Really Counts - Game of Thrones fan)

1. **It is too popular** for its own good; new features and technologies are very hard to implement due to the large user base that rely on certain themes and plugins that only work with specific versions.
2. **It is aimed at the masses** trying to please everybody
3. **It is constantly targeted by hackers** so you're forced to install updates very often making it a pain to maintain.
4. **It needs a web server** and a database to work which costs money and makes it harder for some people to start blogging. A $5 DigitalOcean droplet won't really cut it since you will need to install a database instance, a web server and also care about the space where you keep your static files. A busy blog can get expensive very fast.
5. **It is slower**. That webserver needs to route requests to a PHP script which interrogates a database regarding the requested data which replies with a data that must be injected into a template...you get my point - all these steps are eating valuable time before the user can see the content.
6. **It generates a lot of junk content** - whenever you type in that WYSIWYG editor, HTML gets generated and saved to the database. Pressing ENTER multiple times create empty paragraphs for example `<p></p>`. You don't write spans, divs, ps and all those elements, they are generated and persisted to the database. That makes it very hard to migrate or alter your content. It's not hard for Wordpresss but, if you want to pull your content and start using markdown for example, it 's difficult.
7. **Reddit kiss of death**? Miss popularity overnight? Your server goes down. If you're not constantly monitoring resources, that downtime might last for hours.

{"widget":"qards-section-heading","config":"eyJ0aXRsZSI6IlFhcmRzIGlzIGZhc3RlciIsInN1YnRpdGxlIjoiV2F5IGZhc3RlciBhY3R1YWxseSIsInR5cGUiOiJwcmltYXJ5In0="}

Qards compiles down to HTML, CSS, Javascript which can be placed on any web server or CDN out there. Nothing needs to be interpreted by a programming language before being sent to the visitor. These are all static files that are sent immediately after being accessed.

{"widget":"image","config":"eyJzcmMiOiIvaW1hZ2VzL3VwbG9hZHMvc2NyZWVuc2hvdF9mcm9tXzIwMTgtMDktMDdfMDMtMzItMjAtMS0ucG5nIiwiYWx0IjoiUWFyZHMgdnMgV29yZHByZXNzIHNwZWVkIiwibGF5b3V0IjoiZnVsbC13aWR0aCJ9"}

Ask any expert you like and they will all reply with the same line: every second counts; for SEO, for user experience, user retention etc.

{"widget":"qards-section-heading","config":"eyJ0aXRsZSI6IlFhcmRzIGlzIGNoZWFwZXIiLCJzdWJ0aXRsZSI6IkNoZWFwZXIgaXMgdGhlIHdyb25nIHdvcmQ7IFFhcmRzIGlzIGZyZWUgLSBmcmVlIHRvIHVzZSBhbmQgZnJlZSB0byBob3N0IiwidHlwZSI6InByaW1hcnkifQ=="}

Since all your content is just HTML, CSS and Javascript you're free to server Qards from anywhere you like. Take [Netlify](https://www.netlify.com/) for example. With a simple \`netlify deploy\` comand, your content goes up, goes live and gets served from a Content Delivery Network at zero costs. It doesn't matter if your blog gets hit by a million visitors in one day, you're still operating at zero costs. Not to mention that they also provide you with a free SSL.

{"widget":"qards-section-heading","config":"eyJzdWJ0aXRsZSI6IlNtYXJ0IGNhcmRzLCByaWNoIGNvbnRlbnQsIHdpZGdldHMsIGhvd2V2ZXIgeW91IHdhbnQgdG8gY2FsbCBpdCIsInR5cGUiOiJzZWNvbmRhcnkiLCJ0aXRsZSI6IlFhcmRzIHN1cHBvcnRzIHJpY2ggY29udGVudCJ9"}

This is the most important aspect and the one thing that led me to develop this software. For far too long we had no control and no synergy between the needs of the developer and the content publisher.

The actual content served as this dark entity that sat in the middle of both worlds and didn't play nicely with anybody. The developer could alter the theme and overall presentation of the site while the publisher would try to present information, constrained by the tools at hand which are very few and limited. The platform itself generates its own HTML that is not controlled by anybody.

Want to add some charts? Tough luck! Maybe you can find an external tool or plugin that allows you to do it but does it integrate well with the rest of your site? You could take a screenshot of said chart and post that instead but does it present the information in the same way? It loses events, tooltips and everything that makes a chart to be engaging.

Charts, galleries, maps, audios, videos, data tables, table of contents and so much more. With Qards, everything is a widget, one that receives directives and configurations. The content comes with configuration that allows Qards to render everything as intended by the publisher. Developers can add new, custom widgets and create models that can be used by the publishers.

Here's one such audio widget where, as a publisher, I only entered a soundcloud link and a title. Qards did the rest putting together a player with controls.

{"widget":"qards-audio","config":"eyJpdGVtcyI6W3sidXJsIjoiaHR0cHM6Ly9zb3VuZGNsb3VkLmNvbS9wb2xvLXBhbi9sYS1mb3JldC1kZS1zaGFyZWdvb2Qtc2hhcmluZ3MtY2FyaW5nLXBvbG9wYW4tcmVtaXgiLCJ0aXRsZSI6IkxhIGZvcmV0IGRlIFNoYXJlZ29vZCAocG9sbyZwYW4ncyBzaGFyaW5nIGlzIGNhcmluZyByZW1peCkiLCJzdWJ0aXRsZSI6IkF3ZXNvbWUgdHJhY2sgdG8gYnJlYWsgc2V0cyB3aGVuIERqJ2luZyIsInNyYyI6Ii9pbWFnZXMvdXBsb2Fkcy9hcnR3b3Jrcy0wMDAxMDEyMDg1NjktNnF0MWI1LXQ1MDB4NTAwLmpwZyJ9XX0="}

{"widget":"qards-section-heading","config":"eyJ0aXRsZSI6IlFhcmRzIGlzIHNhZmVyIiwic3VidGl0bGUiOiJMZXNzIHRoaW5ncyB0byB3b3JyeSBhYm91dCIsInR5cGUiOiJwcmltYXJ5In0="}

There's no web server or database behind it; just plain HTML, CSS and Javascript files. You don't have to worry about SQL injections, open ports or software exploits.

Forget about downtimes, waking up in the night to solve incidents or costly hosting bills and start focusing on what matters.

{"widget":"qards-section-heading","config":"eyJ0aXRsZSI6IlFhcmRzIGZvbGxvd3MgdGhlIEphbVN0YWNrIHByaW5jaXBsZSIsInN1YnRpdGxlIjoiTW9kZXJuIHdlYiBkZXZlbG9wbWVudCBhcmNoaXRlY3R1cmUgYmFzZWQgb24gY2xpZW50LXNpZGUgSmF2YVNjcmlwdCwgcmV1c2FibGUgQVBJcywgYW5kIHByZWJ1aWx0IE1hcmt1cCIsInR5cGUiOiJwcmltYXJ5In0="}

Qards is based on [GatsbyJs](https://www.gatsbyjs.com/) which follows the JamStack principle. Everything is compiled and generated before being sent into production. All communications and server-side processes are being done using APIs accessed over HTTP.

Your entire application runs on the client making it extremely easy to be deployed and served. On top of that, Qards is also a progressive web app making use of service workers, it still works when offline and it handles everything needed by a modern web app such as manifest file, touch icons for various devices or favicon.
