# TierForge
A Tier List Community Web App

## Overview
TierForge is a web application that allows users to create, manage, and share tier lists. Users can create tier lists for various topics, categorize items, and collaborate with others in the community.

## Features
- Create, read, update, and delete tier lists.
- User-friendly interface for managing tier lists.
- Ability to categorize items within tier lists.

## Project Structure
```
TierForge
├── src
│   ├── controllers        # Contains controllers for handling requests
│   │   └── tierListController.ts
│   ├── models             # Contains data models and interfaces
│   │   └── tierListModel.ts
│   ├── routes             # Contains route definitions
│   │   └── tierListRoutes.ts
│   ├── services           # Contains business logic and data handling
│   │   └── tierListService.ts
│   ├── app.ts             # Entry point of the application
│   └── types              # Contains TypeScript types and interfaces
│       └── index.ts
├── package.json           # npm configuration file
├── tsconfig.json          # TypeScript configuration file
└── README.md              # Project documentation
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd TierForge
   ```
3. Install dependencies:
   ```
   npm install
   ```

## Usage
To start the application, run:
```
npm start
```
The application will be available at `http://localhost:3000`.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.