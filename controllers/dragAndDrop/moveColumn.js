const { Column } = require("../../models/column");
const { HttpError } = require("../../helpers");

const moveColumn = async (req, res) => {
  const { boardId } = req.params;
  const data = req.body;
  if (!data) {
    throw HttpError(400, "Not body");
  }
  const result = await Column.find({ columnOwner: boardId });
  if (!result) {
    throw HttpError(404, "Not Found");
  }

  const changeColumn = result.map((column) => {
    const foundData = data.find((item) => column.id === item.id);
    if (foundData) {
      column.orderColumn = foundData.order;
    }
    return column;
  });

  res.status(200);
  res.json({
    code: 200,
    message: "Update position column ",
    data: changeColumn,
  });
};

module.exports = moveColumn;
// const arr = [
//   [
//     "columnID1",
//     "columnName1",
//     "columnOrder1 = 1",
//     [
//       ["taskID1", "Task 1 content", "blue", 1],
//       ["taskID2", "Task 2 content", "green", 2],
//       ["taskID3", "Task 3 content", "red", 3],
//     ],
//   ],
//   [
//     "columnID2",
//     "columnName2",
//     "columnOrder2=2",
//     [
//       ["taskID4", "Task 4 content", "yellow", 1],
//       ["taskID5", "Task 5 content", "purple", 2],
//     ],
//   ],
// ];
