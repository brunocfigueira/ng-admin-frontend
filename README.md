# ng-admin-frontend

## Description

This project is a frontend application developed with Angular 19 and Angular Material 19, designed to provide an administrative interface for the functionalities of a corporate system.

## Requirements

- Node.js (recommended version: 16 or higher)
- Angular CLI (compatible version: 19.x)

## Installation

To install the project dependencies, run the following command in the project root:

```sh
npm install
```

## Running the Project

To start the development server, use the following command:

```sh
npm start
```

The application will be available at `http://localhost:4200/`.

## Build

To generate the production version, use:

```sh
npm run build
```

The compiled files will be located in the `dist/ng-admin-frontend` folder.

## Testing

To run unit tests:

```sh
npm test
```

## Project Structure

The project structure is organized as follows:

```
src/
├── app/
│   ├── constants/          # Contains system constant definitions
│   ├── documentation/      # Usage examples of the resources
│   ├── services/           # Service classes
│   ├── shared-components/  # Commonly used components
│   ├── use-cases/          # Use cases to be developed
│   ├── utils/              # Utility classes and structures
│
├── environments/           # Configuration for different environments (DSV, HMG, PRD)
├── locale/                 # Translations for different languages
```

## Localization (Internationalization - i18n)

The project supports multiple languages. The translation files are located in `src/locale/`.

To compile the Portuguese version, use:

```sh
ng serve --configuration=pt
```

## Technologies Used

- Angular 19
- Angular Material 19
- RxJS
- Moment.js
- Chart.js
- SCSS for styling

## Contact
Technical manager: Bruno César Figueira
Email: brunocfigueirati@gmail.com
