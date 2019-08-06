import Input from "../../src/components/taskInput/view";
import * as keyCodes from "./keycodes.js";

describe("My First Test", function() {
  it("adds task", function() {
    cy.visit("http://localhost:3000/");

    cy.get(".TaskInput")
      .type("Go Shopping{enter}")
      .type("Do Laundry{enter}")
      .type("Go to work{enter}")
      .type("Take kids to soccer game{enter}")
      .type("Pubg{enter}");

    cy.get(".AddTaskContainer").click();
  });

  it("checks off tasks", () => {
    cy.get(".MainContainer > div").each((e, i) => {
      if (e[0].className === "Row" && i % 2 !== 0) {
        cy.get(".MainContainer > div")
          .eq(i)
          .find(".checkContainer")
          .find(".checkmark")
          .click({ force: true });
      }
    });
  });

  it("Drag and drop checked tasks", () => {
    cy.get(".MainContainer > div").each((e, i) => {
      if (i < 4) {
        cy.get("[data-react-beautiful-dnd-drag-handle]")
          .eq(i)
          .as(`${i}`);
      }
    });

    cy.get(".MainContainer > div").each((e, i) => {
      var upOrDown = Math.random() >= 0.5;
      if (i < 4) {
        cy.get(`@${i}`)
          .focus()
          .trigger("keydown", { keyCode: keyCodes.space })
          .trigger("keydown", {
            keyCode: upOrDown ? keyCodes.arrowDown : keyCodes.arrowUp,
            force: true
          })
          .wait(1000)
          .trigger("keydown", { keyCode: keyCodes.space, force: true });
      }
    });
  });

  it("Deletes completed tasks", () => {
    let tasksToTrash = [];
    cy.get(".MainContainer > div")
      .each((e, i) => {
        if (e[0].className === "Row") {
          const checked = e.find(".checkContainer").children()[1];
          if (window.getComputedStyle(checked, ":after").display !== "none") {
            tasksToTrash.push(e.find(".checkContainer > .TrashCan"));
          }
        }
      })
      .then(() => {
        tasksToTrash.reverse();
        console.log(tasksToTrash);
        for (let j in tasksToTrash) {
          tasksToTrash[j].click();
        }
      });
  });
});
