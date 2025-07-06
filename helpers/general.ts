import path = require("path");

export function getStoragePath(index: number): string {
  return `./playwright/.auth/user${index}.json`;
}
