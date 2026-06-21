# ROBOT UPRISING — Unity Game Portfolio

로봇 대소동(ROBOT UPRISING) Unity 게임 포트폴리오 사이트입니다.
글래스모피즘 디자인 · 브라우저 인게임 플레이 · 발표자료/보고서 열람.

## 폴더 구조
```
portfolio/
├── index.html              포트폴리오 메인 페이지
├── 서버로 열기.bat          더블클릭하면 로컬 서버 + 브라우저 자동 실행
├── assets/
│   ├── style.css           글래스모피즘 스타일
│   ├── main.js             상호작용(게임 실행, 갤러리, 문서 뷰어)
│   └── shots/              스크린샷
├── game/                   Unity WebGL 빌드 (브라우저 인게임 실행)
├── docs/
│   ├── RobotUprising_Final.pdf     발표자료(PDF 변환본)
│   └── Unity_MCP_Report.html       MCP 보고서(HTML 변환본)
├── RobotUprising_Final.pptx        발표자료 원본
└── Unity MCP 사용 보고서.docx       보고서 원본
```

## 로컬에서 실행 (게임까지 동작)
WebGL 게임은 보안 정책상 **웹서버를 통해야만** 실행됩니다.
`index.html`을 더블클릭하면 페이지는 보이지만 게임은 로딩되지 않습니다.

가장 쉬운 방법:
- **`서버로 열기.bat` 더블클릭** → 브라우저에서 `http://localhost:8000` 자동 오픈

수동 실행:
```
cd portfolio
py -m http.server 8000
# 브라우저에서 http://localhost:8000
```

## 웹에 배포 (공개 URL 만들기)
이 `portfolio` 폴더 전체를 정적 호스팅에 업로드하면 됩니다.
- GitHub Pages / Netlify / Vercel 등 어디든 OK
- WebGL 빌드는 Gzip + Decompression Fallback 설정이라 서버 헤더 설정 없이 바로 동작합니다.

## 유튜브 영상 추가
`index.html`의 영상 섹션에서 `data-yt="REPLACE_VIDEO_ID_1"` 부분의
값을 실제 유튜브 영상 ID로 바꾸면 자동으로 임베드됩니다.
예: `https://youtu.be/abc123XYZ` → `data-yt="abc123XYZ"`

기술: Unity 6000.3 · C# · URP 2D · WebGL
