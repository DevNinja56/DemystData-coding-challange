import { expect } from "chai";
import axios from "axios";
import sinon from "sinon";
import { fetchTodos } from "../index.mjs";

describe("fetchTodos", () => {
  // Test case: should fetch 20 even numbered TODOs
  it("should fetch 20 even numbered TODOs", async () => {
    // Stub the axios.get method to return a mock response
    const stub = sinon
      .stub(axios, "get")
      .resolves({ data: { id: 2, title: "Test TODO", completed: false } });

    // Call the fetchTodos function and await the result
    const todos = await fetchTodos(20, true);

    // Assert that the returned todos array has a length of 20
    expect(todos).to.have.lengthOf(20);

    // Assert that each todo's id is even
    todos.forEach((todo) => {
      expect(todo.id % 2).to.equal(0);
    });

    // Restore the original behavior of axios.get
    stub.restore();
  });
});
