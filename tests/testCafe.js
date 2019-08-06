import { Selector } from "testcafe";

fixture`Getting Started`.page`http://localhost:3000`;

test("adds task", async t => {
  await t.typeText(".TaskInput", "John Smith").click(".AddTaskContainer");
  await t.typeText(".TaskInput", "Task 2").click(".AddTaskContainer");
  await t.typeText(".TaskInput", "Task 3").click(".AddTaskContainer");
  await t.typeText(".TaskInput", "Do Laundry").click(".AddTaskContainer");
  await t.typeText(".TaskInput", "Work out").click(".AddTaskContainer");
  const row = Selector(".Row");
  const count = await row.count;
  for (var i = 0; i < count; i++) {
    await t.click(".checkmark");
  }
});

test("Checks Tasks Off", async t => {
  // await t.hover(row);
});
