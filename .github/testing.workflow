workflow "New workflow" {
  on = "push"
  resolves = ["test:ci"]
}

action "test:ci" {
  uses = "actions/npm@e7aaefe"
  runs = "test:ci"
}
