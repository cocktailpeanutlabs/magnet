module.exports = async (kernel) => {
  let cmd = "pip install torch==2.3.1 torchvision==0.18.1 torchaudio==2.3.1 --index-url https://download.pytorch.org/whl/cpu"
  if (kernel.platform === 'darwin') {
    if (kernel.arch === "arm64") {
      cmd = "uv pip install torch torchaudio torchvision"
    } else {
      cmd = "uv pip install torch==2.1.2 torchaudio==2.1.2"
    }
  } else {
    if (kernel.gpu === 'nvidia') {
      if (kernel.gpu_model && / 50.+/.test(kernel.gpu_model)) {
        cmd = "uv pip install --pre torch torchvision torchaudio --index-url https://download.pytorch.org/whl/nightly/cu128"
      } else {
        cmd = "pip install torch==2.3.1 torchvision==0.18.1 torchaudio==2.3.1 xformers --index-url https://download.pytorch.org/whl/cu121"
      }
    } else if (kernel.gpu === 'amd') {
      cmd = "pip install torch==2.3.1 torchvision==0.18.1 torchaudio==2.3.1 --index-url https://download.pytorch.org/whl/rocm6.0"
    } 
  }
  return {
    "run": [{
      "method": "shell.run",
      "params": {
        //"message": "git clone https://github.com/candywrap/audiocraft app"
        "message": "git clone -b magnet_xformers_0_0_22_fix https://github.com/peanutcocktail/audiocraft app"
      }
    }, {
      "method": "shell.run",
      "params": {
        "venv": "env",
        "path": "app",
        "message": [
          cmd,
          "pip install -e .",
        ]
      }
    }, {
      "method": "notify",
      "params": {
        "html": "Click the 'start' tab to get started!"
      }
    }]
  }
}
