# code-commenting
Simple examples of creating self-sustaining docs for react component and SASS styles through code commenting

## Setup

### sassdoc
1. `cd sassdoc/`
2. `npm install`
3. `gulp`

This will then generate the SASS along with an instance of [sassdoc](http://sassdoc.com/). It will also start up a local server using [Browser sync](https://www.browsersync.io/). You can view the docs at `http://localhost:3000/sassdoc` and the styles being documented can be seen in action at `http://localhost:3000`

#### Updating the docs
The Browser sync instance also contains a watch file, so every time a sass file is changed, the changes will be injected into the page, and the sassdoc files will be regenerated; you update your docs just by saving your files!

### react-docgen
1. `cd react-docgen`
2. `yarn`
3. `npm run start`

The base of the app is made using [create-react-app](https://github.com/facebookincubator/create-react-app	), and is used to simply display the use of [react-docgen](https://github.com/reactjs/react-docgen). When you run `npm start`, it will boot up the react app (complete with live reload) and a gulp file I have added in parallel. This means that if you change any react component, both the app and the docs will be updated and the page will be reloaded.

## Raising problems
If you run into an issues with the project, please feel free to create a new issue.
