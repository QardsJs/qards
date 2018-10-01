# qards
Qards is a blogging platform focused on performance and on closing the gap 
between content publishers and developers: https://qards.io

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](
https://app.netlify.com/start/deploy?repository=https://github.com/QardsJs/qards)

## Notice!

Qards has not yet been officially released. Even though the code has been
public all this time I am still working on breaking changes. You can deploy
it but be advised that certain things might not work at all.

## Installation

There's nothing to install and you can get started right away by clicking on
the "deploy to Netlify" button above.

### Admin interface

Qards is using Netlify CMS to create content. For now, this is the only source
of content. We have a separate branch with Contentful code but it was put on
hold until some features become available on their side.

Netlify CMS will remain the default "manager" of content because it's free
and operates by integrating with Gihub. This means that you can run your
website completely free and also benefit from a versioned system.

After installing, make sure to invite yourself by navigating to the identity
tab. You can try setting up external auth provider such as Github or Google
but I didn't have any luck making that work. It's something I have to solve
and there's an issue created if you want to track it.

To be able to persist your changes on Github you will also need to enable
`Git Gateway` by navigating to `Settings > Services`. This way, non-Github
users can create and manage content inside Netlify CMS.

Once everything is configured, you can navigate to the url assigned to you
by Netlify and append `/admin/` to it. You can login using your credentials.

### How to update

Since we're updating a lot of code quite frequently I advise you to avoid
modifying core code (unless you want to part free from Qards of course) so
you can upgrade to latest versions easily.

I advise you to fork this repo and then add a new remote to it where you
will pull updates from:

`git remote add upstream https://github.com/QardsJs/qards`

This way you can push custom code into your own repo and still be able to
update Qards by issuing:

`git pull upstream master` which will create a merge between your current
code and what we have in our own repo. You can then push changes into your 
own repo with `git push origin master`

#### Where to create custom pages/code/components?

I added a special directory for creating pages and other custom code at 
`src/app`. Custom pages can be added inside `src/app/pages` where you will
find an example page. Rename that from `index.example.tsx` to `index.tsx`
to have the root `/` url path enabled. Our main page does not point to `/`
because we don't want to reserve that route as I'm sure you will appreciate
being in control of it. The Qards main route sits at `/blog`.

Inside `src/app` you can create your components, pages and whatever else
you need to bring your app to production.

## I want to customize Qards and still be able to update

That's easier said than done at this moment. My goal is to give you more
tools to customize rather than being forced to change core code and not
be able to upgrade because of that. If you feel like something is wrong
or should behave differently please open a pull request and we can take
it from there. Making Qards more adaptable and configurable is my priority
and this is the only way forward because I want projects to be able to
upgrade to latest code without too many issues.