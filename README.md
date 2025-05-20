@ckvv/mcp-server-music

## 概述

`@ckvv/mcp-server-music` 功能是一个 `Model Context Protocol` 服务器用于在 `Mac` 系统管理音乐播放。


### Tools

- 获取音乐列表
- 播放音乐
- 获取当前音量大小
- 设置音量大小

## Configuration

### NPX

```js
{
  "mcpServers": {
    "music": {
      "command": "npx",
      "args": [
        "-y",
        "@ckvv/mcp-server-music",
      ]
    }
  }
}
```
