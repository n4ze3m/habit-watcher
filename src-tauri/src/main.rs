#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
use tauri_plugin_sql::{Migration, MigrationKind, TauriSql};

fn main() {
    tauri::Builder::default()
        .plugin(TauriSql::default().add_migrations(
            "sqlite:hw.db",
            vec![Migration {
                version: 1,
                description: "Initial migration",
                kind: MigrationKind::Up,
                sql: include_str!("../migrations/1.sql"),
            }],
        ))
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
