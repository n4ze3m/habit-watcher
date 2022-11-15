-- create habbit table with id, name, created_at, updated_at
CREATE TABLE IF NOT EXISTS habbit (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(255) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
-- create habbit_log table with id, habbit_id, created_at, updated_at
CREATE TABLE IF NOT EXISTS habbit_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  habbit_id INTEGER NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (habbit_id) REFERENCES habbit (id)
);
