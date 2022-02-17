# SwFilms

# Practices/conventions

https://frontendwiki.saritasa.rocks/pages/development/angular/practices.html#related-conventions

# Architecture

https://frontendwiki.saritasa.rocks/pages/development/angular/architecture.html

# Recommended tooling (VSCode)

- https://marketplace.visualstudio.com/items?itemName=Angular.ng-template
- https://marketplace.visualstudio.com/items?itemName=johnpapa.Angular2
- https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig
- https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
- https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console

# Folder structure

```
# Structure
project
└── src
    ├── app
    │   ├── features
    │   ├── core
    │   │   ├── interceptors
    │   │   ├── error-handlers
    │   │   ├── guards
    │   │   ├── models
    │   │   ├── services
    │   │   │   └── mappers
    │   │   │       └── dto
    │   │   └── utils
    │   └── shared
    │       ├── common-shared.module.ts
    │       ├── components
    │       ├── directives
    │       ├── animations
    │       ├── features
    │       └── pipes
    ├── assets
    └── theme
        └── elements
```
