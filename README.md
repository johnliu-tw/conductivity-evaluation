# Conductivity Checker

The Conductivity Checker is a simple web application designed to evaluate the existence of a conductive path within a given grid from top to bottom.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following software installed:

- [Node.js](https://nodejs.org/en/), should be >= v18.17.0
- [npm](https://www.npmjs.com/) (usually installed with Node.js), should be >= 9.6.7

### Install and execute the application
#### Step 1
Install the necessary dependencies:

```bash
npm install
```

#### Step 2
Create `.env` file or clone `.env.sample` file

#### Step 3
Next, you'll need to bundle the front-end JavaScript using Browserify. This step is crucial to compile the client-side script so that it's compatible with web browsers. Run the following command:

```bash
npm install -g browserify
```

Then, execute the browserify
```bash
browserify src/frontend/script.js -o public/bundled.js
```

#### Step 4
To start the application, run the following command in the project directory:
```bash
npm start
```

This command will launch a server locally. Access the application through your browser at http://localhost:3000 or the port you set in the `.env`.

## Usage Instructions
### Inputting Grid Data
Users can input grid data into the system in the following ways:

#### Manual Input:
Directly enter the grid data into the text area. Each line represents a row in the grid, and each character represents the state of that cell (1 for conductive, 0 for non-conductive). For example:

```yaml
1110
1100
1101
1001
```

#### File Upload:
Click the 'Upload File' button and choose a .txt file containing grid data. The file format should match the manual input format.

### Generating a Random Grid
Users can generate a random N x N grid by clicking the 'Generate Random Example' button. The system will prompt for the size of the grid.

### Evaluating the Conductive Path
After inputting or generating a grid, click the 'Check Conductivity' button to evaluate whether there is a conductive path from the top to the bottom. The result will be displayed below.