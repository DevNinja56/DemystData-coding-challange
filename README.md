# TODO CLI

A command-line tool to fetch and display TODOs from the JSONPlaceholder API. This tool fetches the first 20 even-numbered TODOs and outputs their titles and completion status.

## Features

- Fetches TODOs from the JSONPlaceholder API
- Filters TODOs based on specified options
- Supports fetching a custom number of TODOs
- Can fetch only even-numbered TODOs
- Dockerized for easy deployment and usage

## Installation

1. Clone the repository:

   ```bash
   git clone <your-repo-url>
   cd todo-cli
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

### Running Locally

To run the CLI tool locally:

```bash
node index.mjs [options]
```

### Options

- `-n, --num <number>` : Number of TODOs to fetch (default: 20)
- `-e, --even` : Fetch only even-numbered TODOs

## Running with Docker

### Prerequisites

Ensure you have Docker and Docker Compose installed on your system.

- [Get Docker](https://docs.docker.com/get-docker/)
- [Install Docker Compose](https://docs.docker.com/compose/install/)

### Using Docker Compose

To start the Docker Container:

```bash
docker-compose up
```

To stop the Docker Container:

```bash
docker-compose down
```

## License

This project is licensed under the [MIT License](LICENSE).
