# Neos Advisors website

The public site at https://neosadvisors.com. Static files: open `index.html` on any web server; there is no build
step and nothing to install. `vercel.json` sets the security headers and the redirect from www to the main
address. A push to `main` deploys to production on Vercel.

The site is edited in the Neos Advisors Dropbox (`06_Branding/Website`): the source folder is rebuilt into the
launch copy by `_tools/production/build-live.js`, and that launch copy is what this repository holds. Make
changes there, rebuild, and copy the result here, so that the repository and the site always match.
