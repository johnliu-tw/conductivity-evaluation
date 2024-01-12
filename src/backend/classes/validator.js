// Data validation function
function isValidGrid(grid) {
  if (!Array.isArray(grid) || grid.length === 0) {
      return false;
  }

  const rows = grid.length;
  const cols = grid[0].length;

  for (let row of grid) {
      if (row.length !== cols || !/^[01]+$/.test(row)) {
          return false;
      }
  }

  return true;
}

module.exports = {isValidGrid};