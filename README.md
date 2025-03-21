# News Aggregator

A news aggregator application built with React.

## Features

- **Responsive Design:** Optimized for various devices.
- **State Management:** Using Context API for managing application state.
- **Routing:** Using React Router for navigation.
- **API Handling:** Fetching news articles using react query from 3 different news sources.

## Getting Started

### Prerequisites

- Node.js 20 and docker installed on your machine.

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

3. Running the Application

   Start the development server:

   ```bash
   npm run dev
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
