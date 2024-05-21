import { Command } from "commander";
import axios from "axios";

// This function fetches todos from an API based on the provided parameters
export const fetchTodos = async (numTodos, onlyEven) => {
  const todos = [];
  const requests = [];
  const limit = onlyEven ? numTodos * 2 : numTodos;

  for (let i = 1; i <= limit; i++) {
    // Skip odd numbers if onlyEven is true
    if (onlyEven && i % 2 !== 0) continue;
    requests.push(axios.get(`https://jsonplaceholder.typicode.com/todos/${i}`));
  }

  try {
    // Send all the HTTP requests and wait for the responses
    const responses = await Promise.all(requests);

    // Process the responses and extract the relevant data
    responses.forEach((response) => {
      const { id, title, completed } = response.data;
      todos.push({ id, title, completed });
    });
  } catch (error) {
    console.error("Error fetching TODOs:", error);
  }

  return todos;
};

// This function prints the details of each todo to the console
const printTodos = (todos) => {
  todos.forEach((todo) => {
    console.log(
      `ID: ${todo.id}, Title: ${todo.title}, Completed: ${todo.completed}`
    );
  });
};

// This function sets up the command-line interface using the commander library
const runCLI = () => {
  const program = new Command();

  // Configure the program options and actions
  program
    .version("1.0.0")
    .description("CLI tool to fetch and display TODOs")
    .option("-n, --num <number>", "number of TODOs to fetch", "20")
    .option("-e, --even", "fetch only even numbered TODOs")
    .action(async (options) => {
      const numTodos = parseInt(options.num, 10);
      const onlyEven = options.even || false;
      const todos = await fetchTodos(numTodos, onlyEven);
      printTodos(todos); // Print the fetched todos
    });

  program.parse(process.argv); // Parse the command-line arguments
};

// Check if the script is being run directly
// If it is, call the runCLI function to start the command-line interface
if (import.meta.url === `file://${process.argv[1]}`) {
  runCLI();
}
