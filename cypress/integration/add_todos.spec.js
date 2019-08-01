import Input from "../../src/components/taskInput/view";

describe("My First Test", function() {
  it("adds task", function() {
    cy.visit("http://localhost:3000/");

    cy.get(".TaskInput")
      .type("Go Shopping{enter}")
      .type("Do Laundry{enter}")
      .type("Go to work{enter}")
      .type("Take kids to soccer game{enter}")
      .type("Pubg{enter}")
      .type("Eat dinner{enter}")
      .type("Clean the house");

    cy.get(".AddTaskContainer").click();
  });

  it("checks off tasks", () => {
    cy.get(".MainContainer > div").each((e, i) => {
      if (e[0].className === "Row" && i > 2) {
        cy.get(".MainContainer > div")
          .eq(i)
          .find(".checkContainer")
          .find(".checkmark")
          .click({ force: true });
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
