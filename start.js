module.exports = async (kernel) => {
  const run = [{
    "method": "shell.run",
    "params": {
      "path": "app",
      "venv": "env",
      "message": "python -m demos.magnet_app",
      "on": [{ "event": "/http:\/\/[0-9.:]+/", "done": true }]
    }
  }, {
    "method": "local.set",
    "params": {
      "url": "{{input.event[0]}}"
    }
  }]
//  if (kernel.gpu !== 'nvidia') {
    run[0].params.env = {
      "IGNORE_MEMORY_EFFICIENT": "1"
    }
//  }
  return {
    daemon: true,
    run
  }
}
