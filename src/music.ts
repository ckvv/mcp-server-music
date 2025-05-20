import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { exec } from "node:child_process";

async function osascript(common: string) {
  return new Promise((res, rej) => {
    exec(`osascript -e '${common}'`, (error, stdout, stderr) => {
      if (error) {
        rej(error);
      } else {
        res(stdout);
      }
    });
  });
}

export const server = new McpServer({
  name: "music",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

server.tool(
  'get-music-list',
  '获取音乐列表',
  {
  }, async () => {
    const musics = await osascript(`tell application "Music" to get name of every track of playlist "资料库"`);
    return {
      content: [{
        type: 'text',
        text: `音乐列表:${musics}`,
      }]
    };
  });


server.tool(
  'play-music',
  '播放音乐',
  {
    name: z.string().describe('需要播放的音乐名称'),
  }, async ({ name }) => {
    await osascript(`tell application "Music" to play track "${name}"`);
    return {
      content: [{
        type: 'text',
        text: `已为您打开音乐:${name}`,
      }]
    };
  });

server.tool(
  'get-volume',
  '获取当前音量大小',
  {}, async () => {
    const volume = await osascript(`output volume of (get volume settings)`);
    return {
      content: [{
        type: 'text',
        text: `当前音量为:${volume}`,
      }]
    };
  });

server.tool(
  'set-volume',
  '设置音量大小',
  {
    volume: z.number().min(0).max(100).describe('需要设置的音量大小'),
  }, async ({ volume }) => {
    await osascript(`set volume output volume ${volume}`);
    return {
      content: [{
        type: 'text',
        text: `音量已调整到:${volume}`,
      }]
    };
  });
