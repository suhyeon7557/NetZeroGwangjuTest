This is a Next.js project.

## 개발 서버 실행

```bash
npm run dev
```

열기: http://localhost:3000

정책 대시보드 페이지: http://localhost:3000/policy

## MCP: GitHub 연결

1) 패키지 설치 완료: `@modelcontextprotocol/server-github`

2) 실행

```bash
set GITHUB_TOKEN=ghp_xxx && npx -y @modelcontextprotocol/server-github
```

또는 `package.json` 스크립트 사용:

```bash
set GITHUB_TOKEN=ghp_xxx && npm run mcp:github
```

3) Cursor 등 MCP 클라이언트 설정 예시

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "ghp_***",
        "GITHUB_REPOS": "suhyeon7557/NetZeroGwangjuTest"
      }
    }
  }
}
```

권장 스코프(읽기 전용 시작): `contents:read`, `metadata:read`, `issues:read`, `pull_requests:read`.
