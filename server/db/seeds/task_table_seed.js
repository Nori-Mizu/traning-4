/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("task_table").del();
  await knex("task_table").insert([
    {
      id: 1,
      task: "アイディアだし",
      assignee: "岸田",
      due_date: "2023/6/7",
      completed: false,
      created_at: new Date().toISOString(),
    },
    {
      id: 2,
      task: "テーマ決定",
      assignee: "麻生",
      due_date: "2023/7/7",
      completed: true,
      created_at: new Date().toISOString(),
    },
    {
      id: 3,
      task: "詳細計画立案",
      assignee: "岸田",
      due_date: "2023/8/8",
      completed: false,
      created_at: new Date().toISOString(),
    },
  ]);
};
