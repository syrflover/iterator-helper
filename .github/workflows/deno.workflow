workflow "Test" {
  on = "push"
  resolves = ["Run test"]
}

action "Run test" {
  uses = "denolib/deno-action@0.20.0"
  args = "test --config tsconfig.test.json test/**/*.test.ts test/**/**/*.test.ts test/**/**/**/*.test.ts --allow-net"
}
