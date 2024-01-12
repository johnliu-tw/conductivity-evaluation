const EXISTENCE_RESPONSE = 'YES';
const NON_EXISTENCE_RESPONSE = 'NO';

class ConductivityChecker {
  constructor(grid) {
    this.grid = grid;
    this.rows = grid.length;
    this.cols = grid[0].length;
    this.visited = new Set();
    this.path = [];
  }

  checkConductivity() {
    for (let i = 0; i < this.cols; i++) {
      if (this.dfs(0, i, [])) {
        return { result: EXISTENCE_RESPONSE, path: this.path };
      }
    }
    return { result: NON_EXISTENCE_RESPONSE, path: [] };
  }

  dfs(x, y, currentPath) {
    if (this.isInvalid(x, y)) return false;
    if (x === this.rows - 1) { // Reached the bottom
      this.path = [...currentPath, [x, y]];
      return true;
    }
    this.visited.add(`${x},${y}`);

    const directions = [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]];
    for (let [nextX, nextY] of directions) {
      if (this.dfs(nextX, nextY, [...currentPath, [x, y]])) {
        return true;
      }
    }

    return false;
  }

  isInvalid(x, y) {
    return x < 0 || x >= this.rows || y < 0 || y >= this.cols ||
           this.visited.has(`${x},${y}`) || this.grid[x][y] === '0';
  }
}

module.exports = ConductivityChecker;
