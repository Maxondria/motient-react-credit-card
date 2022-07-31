# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Quick Notes


### Know pitfalls


** It is important to note that currently, the codebase has zero coverage. Not tests have been written yet, as should be the case.

** Some code is not clean enough, it could use a little refactoring to make it better.

** There are libraries that could be used to simplify the codebase further, for example a form library could help so much.

** We could set up linters, and pre-commit hooks to ensure a consistent code structure.

### Architecture

The main App component in `src/components/App` registers the app's routes.

It does this by immediately navigating the user to the `/add-card` route which renders the `<CreditCard />` component.

This component provides state (card context) to all it's children.

The `<CardForm />` utilises the `render` prop pattern to render the `<CardPreview />` component, providing it with `card` state values.

The reason for this, is that the form component becomes the only place we update state from, and we can then just pass it around to the card preview for mere display purposes.

Below is the directory structure of the app.

```markdown
├── components
│   └── App
│       └── index.js
├── containers
│   └── CreditCard
│       ├── components
│       │   ├── CardForm
│       │   │   ├── components
│       │   │   │   └── Error
│       │   │   │       └── index.js
│       │   │   ├── index.js
│       │   │   └── utils.js
│       │   └── CardPreview
│       │       └── index.js
│       └── index.js
├── index.js
├── reportWebVitals.js
├── setupTests.js
├── store
│   └── index.js
├── styles
│   ├── _base.scss
│   ├── _card.scss
│   ├── _form.scss
│   ├── _transitions.scss
│   └── index.scss
└── utils
    └── calendar.js
```

This structure was chosen because it is relatively easy to scale.

- `components` (top level) keeps components that can be shared and reused across the app, together with the main `App` component eg. Buttons, Inputs, Banners etc. These can the be reused in different containers, and container child components

- The main `App` component could also go into containers but I felt like it reads better if in the main `index.js` (entry file) of the `src` directory, we imported the`App` component from a "components" directory.

- `containers` are components that represent a full page (sort of). These normally compose multiple smaller components to represent a page.

- Each container component has it's own `components` directory, it's own utils directory, hooks, etc. This makes it easy, if in future we want to share these components across repositories and different projects. We can easily package them and distribute them.

- Styling is done centrally for now in the `src/styles` directory but this doesn't scale well. What should happen should be, moving each component's styles to that specific component's directory so it is isolated in case we want package the component.