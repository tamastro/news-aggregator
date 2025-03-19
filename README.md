# News Aggregator

A news aggregator application built with React, featuring best practices for code organization, maintainability, and scalability.

## Features

- **Responsive Design:** Optimized for various devices.
- **State Management:** Using Context API for managing application state.
- **Routing:** Using React Router for navigation.
- **Styling:** Using styled-components for CSS-in-JS.
- **Testing:** Using Jest and React Testing Library for unit and integration tests.
- **API Handling:** Fetching news articles from NewsAPI.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/news-aggregator.git
   cd news-aggregator
   ```
2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a .env file in the root directory.
   Add your NewsAPI key:

   ```bash
   REACT_APP_NEWS_API_KEY=your_news_api_key
   ```

4. Running the Application

   Start the development server:

   ```bash
   npm start
   ```

   Open your browser and navigate to http://localhost:3000.

Building for Production

1. Build the application:

```bash
npm run build
```

The build files will be located in the build directory.

Running with Docker

1.  Build the Docker image:

```bash
docker build -t news-aggregator .
```

2.  Run the Docker container:

```bash
docker run -p 3000:3000 news-aggregator
```

3.  Open your browser and navigate to http://localhost:3000.

## Testing

Run the tests using Jest and React Testing Library:

```bash
npm test
```
