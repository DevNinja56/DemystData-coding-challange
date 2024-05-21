import { expect } from "chai";
import axios from "axios";
import sinon from "sinon";
import { fetchTodos } from "../index.mjs";

describe("fetchTodos", () => {
  it("should fetch 20 even numbered TODOs", async () => {
    const stub = sinon
      .stub(axios, "get")
      .resolves({ data: { id: 2, title: "Test TODO", completed: false } });

    const todos = await fetchTodos(20, true);

    expect(todos).to.have.lengthOf(20);
    todos.forEach((todo) => {
      expect(todo.id % 2).to.equal(0);
    });

    stub.restore();
  });
});
