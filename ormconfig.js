module.exports = {
  type: "postgres",
  host: "172.23.0.3",
  port: 5432,
  username: "docker",
  password: "docker",
  database: "rentx",
  migrations: ["./src/database/migrations/*.ts"],
  cli: {
    migrationsDir: "./src/database/migrations",
  }
}
