import axios from "axios";
import { Command } from "commander";

export const fetchTodos = async (numTodos, onlyEven) => {
  const todos = [];
  const requests = [];
  const limit = onlyEven ? numTodos * 2 : numTodos;

  for (let i = 1; i <= limit; i++) {
    if (onlyEven && i % 2 !== 0) continue;
    requests.push(axios.get(`https://jsonplaceholder.typicode.com/todos/${i}`));
  }

  try {
    const responses = await Promise.all(requests);
    responses.forEach((response) => {
      const { id, title, completed } = response.data;
      todos.push({ id, title, completed });
    });
  } catch (error) {
    console.error("Error fetching TODOs:", error);
  }

  return todos;
};

const printTodos = (todos) => {
  todos.forEach((todo) => {
    console.log(
      `ID: ${todo.id}, Title: ${todo.title}, Completed: ${todo.completed}`
    );
  });
};

const runCLI = () => {
  const program = new Command();

  program
    .version("1.0.0")
    .description("CLI tool to fetch and display TODOs")
    .option("-n, --num <number>", "number of TODOs to fetch", "20")
    .option("-e, --even", "fetch only even numbered TODOs")
    .action(async (options) => {
      const numTodos = parseInt(options.num, 10);
      const onlyEven = options.even || false;

      const todos = await fetchTodos(numTodos, onlyEven);
      printTodos(todos);
    });

  program.parse(process.argv);
};

if (import.meta.url === `file://${process.argv[1]}`) {
  runCLI();
}
