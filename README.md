# Cat browser application

This project is a simple application that fetches a list of cat breeds and displays a set amount of sample images based on the selected breed. It is also able to display the details of a selected cat from the list.

## Project structure

- src - Application source code
  - view - Higher-level components or page components that represent different views or pages of the application
  - components - JSX elements that are reusable and application-specific
  - apis - Structures that contain fetch logic
  - types - Shared TypeScript types
  - contexts - Store context
  - providers - Custom context provider
  - routes - Contants used for route navigation

## Features

- **Cat list:** Displays a list of cat based on specific breed selected from dropdown.
- **Cat details:** Displays the detail of a selected cat from the list.

## Requirements

- Node.js (v14.0.0 or higher)
- npm

## Usage

1. Clone this repo
2. `npm install` to install dependencies

### Develop

1. `npm run dev` to run a local development server and view in the browser
2. Open your browser and visit http://localhost:5173 to view the application

### Test

1. `npm run test` to run unit tests

### Build

1. `npm run build` to build the application for production
