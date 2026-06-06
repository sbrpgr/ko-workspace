const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const TOOL_ORIGIN = "https://ko-workspace.com";
const BRAND_NAME = "코워크스페이스";
const BRAND_NAME_EN = "ko-workspace";
const BRAND_DISPLAY_NAME = `${BRAND_NAME} (${BRAND_NAME_EN})`;
const BRAND_DESCRIPTION =
  "코워크스페이스(ko-workspace)는 로그인 없이 브라우저에서 바로 실행되는 텍스트, 이미지, PDF, 자막, 음성, 영상 업무 도구 모음입니다.";
const SUPPORT_EMAIL = "dayway.ict@gmail.com";
const SUPPORT_CONTACT_MESSAGE = `문제가 계속되면 ${SUPPORT_EMAIL}으로 연락해 주세요.`;
const SUPPORT_ERROR_PATTERNS = [
  /오류/,
  /실패/,
  /못했습니다/,
  /완료하지 못/,
  /만들지 못/,
  /읽지 못/,
  /불러오지 못/,
  /찾지 못/,
  /시작하지 못/,
  /지원하지 않습니다/,
  /미지원/,
  /허용하지 않았습니다/,
  /허용해야/,
  /차단되었습니다/,
  /차단되어/,
];

const TOOL_DEFS = [
  {
    id: "voice-to-text",
    path: "/tools/voice-to-text/",
    category: "\uC74C\uC131",
    title: "음성으로 텍스트 쓰기",
    summary:
      "마이크로 말한 내용을 실시간으로 받아 적고, 일반 대본·유튜브 영상·발표문·회의 요약 형식으로 정리합니다.",
    seoTitle: "음성으로 텍스트 쓰기 | 한국어 받아쓰기 도구",
    seoDescription:
      "브라우저에서 한국어 음성을 텍스트로 받아 적고 대본 형식으로 정리하는 도구입니다. 로그인 없이 바로 실행됩니다.",
    keywords: ["STT", "한국어", "회의", "대본"],
    guide: [
      { title: "마이크 허용", text: "브라우저 권한 창이 뜨면 마이크 사용을 허용합니다." },
      { title: "녹음 시작", text: "말한 내용이 실시간으로 음성 텍스트 영역에 누적됩니다." },
      { title: "형식 선택", text: "일반 대본, 유튜브 영상, 발표문, 회의 요약 중 하나를 고릅니다." },
      { title: "결과 저장", text: "정리된 결과를 복사하거나 TXT 파일로 바로 저장합니다." },
    ],
  },
  {
    id: "audio-file-transcription",
    path: "/tools/audio-file-transcription/",
    category: "\uC74C\uC131",
    title: "녹음 파일 텍스트 변환",
    beta: true,
    summary:
      "휴대폰 녹음 파일을 브라우저 안에서 불러와 Whisper 기반 모델로 저장 없는 검토용 텍스트 초안을 만듭니다.",
    seoTitle: "녹음 파일 텍스트 변환 | 휴대폰 녹음 STT 도구",
    seoDescription:
      "휴대폰 녹음 파일을 서버 업로드 없이 브라우저에서 텍스트 초안으로 변환하는 도구입니다. 짧은 한국어 녹음 파일을 검토용으로 받아 적습니다.",
    keywords: ["녹음 파일", "STT", "휴대폰 녹음", "Whisper"],
    guide: [
      { title: "파일 선택", text: "m4a, mp3, wav 같은 짧은 녹음 파일을 선택하거나 업로드 영역에 끌어다 놓습니다." },
      { title: "모델 준비", text: "브라우저가 Transformers.js와 Whisper 모델을 처음 한 번 내려받아 로컬 캐시에 준비합니다." },
      { title: "텍스트 변환", text: "파일은 서버로 보내지 않고 브라우저 안에서 구간별로 분석해 검토용 초안을 만듭니다." },
      { title: "결과 확인", text: "변환된 텍스트를 사람이 다시 읽고, 문장 끝 기준 줄바꿈을 적용한 뒤 복사하거나 TXT 파일로 저장합니다." },
    ],
  },
  {
    id: "audio-editor",
    path: "/tools/audio-editor/",
    category: "\uC74C\uC131",
    title: "녹음 파일 간편 편집기",
    summary:
      "휴대폰 녹음 파일을 브라우저에서 열어 파형을 보며 선택 구간을 자르고, 붙이고, 음량을 조절해 WAV 파일로 저장합니다.",
    seoTitle: "녹음 파일 자르기·붙이기 | 휴대폰 녹음 편집 도구",
    seoDescription:
      "휴대폰 녹음 파일을 서버 업로드 없이 브라우저에서 열어 파형을 보며 구간 삭제, 붙이기, 음량 조절, 실행 취소 후 WAV로 저장하는 무료 오디오 편집 도구입니다.",
    keywords: ["녹음 파일 편집", "오디오 자르기", "m4a 자르기", "휴대폰 녹음"],
    guide: [
      { title: "녹음 파일 선택", text: "iPhone 음성 메모나 Android 녹음 앱에서 저장한 m4a, aac, mp3, wav 파일을 선택합니다." },
      { title: "파형에서 구간 선택", text: "파형을 드래그해 삭제하거나 복사할 구간을 지정하고, 클릭으로 붙여넣을 위치를 잡습니다." },
      { title: "간단 편집", text: "선택 구간 삭제, 선택만 남기기, 복사한 구간 붙이기, 선택 또는 전체 음량 조절을 적용합니다." },
      { title: "WAV 저장", text: "편집 결과를 브라우저에서 WAV 파일로 만들어 다운로드합니다. 원본 파일은 서버로 업로드하지 않습니다." },
    ],
  },
  {
    id: "webcam-recorder",
    path: "/tools/webcam-recorder/",
    category: "영상",
    title: "웹캠 녹화기",
    summary:
      "카메라와 마이크를 브라우저에서 바로 녹화하고, 좌우반전·필터·배경 흐림·사용자 배경 이미지를 적용해 WebM 파일로 저장합니다.",
    seoTitle: "웹캠 녹화기 | 브라우저 카메라 녹화",
    seoDescription:
      "설치 없이 브라우저에서 웹캠과 마이크를 녹화하고 좌우반전, 필터, 배경 흐림, 사용자 배경 이미지를 적용해 WebM으로 저장합니다.",
    keywords: ["웹캠", "녹화", "WebM", "배경 흐림"],
    guide: [
      { title: "카메라 허용", text: "브라우저 권한 창에서 카메라와 필요한 경우 마이크 사용을 허용합니다." },
      { title: "화면 조정", text: "좌우반전, 밝기, 대비, 채도, 필터, 배경 흐림이나 배경 이미지를 미리보기에서 확인하며 맞춥니다." },
      { title: "녹화 시작", text: "기본 WebM 형식으로 녹화하며, 지원되는 Chrome 환경에서는 MP4도 선택할 수 있습니다." },
      { title: "파일 저장", text: "녹화가 끝나면 결과 영상을 확인하고 PC에 바로 다운로드합니다." },
    ],
  },
  {
    id: "ai-text-cleaner",
    path: "/tools/ai-text-cleaner/",
    category: "텍스트",
    title: "AI 복붙 서식 정리",
    summary:
      "ChatGPT, Claude, Gemini 같은 AI 답변을 붙여넣었을 때 남는 별표, 제목, 링크, 코드블록, 과한 줄바꿈을 문서용 텍스트로 정리합니다.",
    seoTitle: "AI 복붙 서식 정리 | ChatGPT 마크다운 제거",
    seoDescription:
      "AI 답변 복사 후 붙는 별표, 제목, 링크, 코드블록, 줄바꿈을 브라우저에서 정리하는 무료 도구입니다.",
    keywords: ["ChatGPT", "마크다운", "별표", "서식"],
    guide: [
      { title: "AI 답변 붙여넣기", text: "복사한 답변, 블로그 초안, 메일 문안을 원문 영역에 넣습니다." },
      { title: "문서 목적 선택", text: "일반 텍스트, 문서용, 블로그용, 표 정리처럼 붙여넣을 곳에 맞는 모드를 고릅니다." },
      { title: "서식 제거 범위 조정", text: "별표, 제목 기호, 코드블록, 링크, 빈 줄 정리 옵션을 필요한 만큼만 켭니다." },
      { title: "결과 확인", text: "정리된 문장을 확인한 뒤 한글, 워드, 메일, 메신저에 바로 붙여넣습니다." },
    ],
  },
  {
    id: "ai-table-converter",
    path: "/tools/ai-table-converter/",
    category: "텍스트",
    title: "AI 표 복붙 변환기",
    summary:
      "AI 답변에 섞인 마크다운 표를 찾아 Word, 한글, Google Docs, Excel, Sheets에 붙여넣기 좋은 표로 변환합니다.",
    seoTitle: "AI 표 복붙 변환기 | ChatGPT 표 엑셀·워드 붙여넣기",
    seoDescription:
      "ChatGPT, Claude, Gemini가 만든 마크다운 표를 브라우저에서 문서용 표, 엑셀용 TSV, CSV로 변환하는 무료 도구입니다.",
    keywords: ["ChatGPT 표", "마크다운 표", "엑셀 붙여넣기", "문서 표"],
    guide: [
      { title: "AI 답변 붙여넣기", text: "표 앞뒤 설명 문구가 포함된 ChatGPT, Claude, Gemini 답변을 그대로 넣습니다." },
      { title: "표 인식", text: "마크다운 표, 파이프 표, TSV, CSV 형태를 찾아 표 데이터만 분리합니다." },
      { title: "서식 제거 선택", text: "셀 안의 별표, 링크, 코드, HTML 같은 마크다운 흔적을 제거할지 고릅니다." },
      { title: "붙여넣기", text: "문서용 표 복사, 엑셀용 복사, CSV 복사 또는 다운로드 중 필요한 방식을 선택합니다." },
    ],
  },
  {
    id: "csv-excel-converter",
    path: "/tools/csv-excel-converter/",
    category: "텍스트",
    title: "CSV 엑셀 변환기",
    summary:
      "CSV와 TSV 파일을 XLSX 엑셀 파일로 바꾸고, XLSX 시트를 CSV로 내보냅니다. 여러 파일을 브라우저에서 일괄 변환합니다.",
    seoTitle: "CSV 엑셀 변환기 | CSV XLSX 변환 일괄 처리",
    seoDescription:
      "CSV, TSV 파일을 XLSX 엑셀 파일로 변환하고 XLSX 시트를 CSV로 내보내는 무료 브라우저 도구입니다. 한글 CSV, CP949, 앞자리 0 보존, 여러 파일 일괄 변환을 지원합니다.",
    keywords: ["CSV 엑셀 변환", "CSV XLSX 변환", "엑셀 CSV 변환", "CP949 CSV", "일괄 변환"],
    guide: [
      { title: "파일 선택", text: "CSV, TSV, XLSX 파일을 하나 이상 선택하거나 업로드 영역에 끌어다 놓습니다." },
      { title: "변환 방향", text: "CSV/TSV는 XLSX로, XLSX는 CSV로 자동 변환합니다. CSV 인코딩과 구분자는 필요하면 직접 지정합니다." },
      { title: "실무 옵션", text: "전화번호, 우편번호, 사번처럼 앞자리 0이 중요한 값은 텍스트로 보존할 수 있습니다." },
      { title: "결과 저장", text: "파일별 결과를 확인한 뒤 개별 다운로드하거나 여러 결과를 ZIP으로 한 번에 내려받습니다." },
    ],
  },
  {
    id: "character-counter",
    path: "/tools/character-counter/",
    category: "텍스트",
    title: "글자수 세기",
    summary:
      "공백 포함/제외 글자수, 단어 수, 줄 수, 문단 수, 바이트 수, 예상 읽기 시간을 바로 확인합니다.",
    seoTitle: "글자수 세기 | 공백 제외 글자수 계산",
    seoDescription:
      "텍스트를 붙여넣으면 글자수, 공백 제외 글자수, 단어 수, 바이트 수, 예상 읽기 시간을 바로 계산합니다.",
    keywords: ["글자수", "공백 제외", "바이트", "분량"],
    guide: [
      { title: "텍스트 입력", text: "자기소개서, 과제, 블로그 원고, 상품 설명처럼 분량을 확인할 글을 붙여넣습니다." },
      { title: "기준별 확인", text: "공백 포함/제외 글자수, 단어 수, 줄 수, 바이트 수를 동시에 확인합니다." },
      { title: "제출 조건 점검", text: "공고나 플랫폼에서 요구하는 글자수 기준에 맞는지 빠르게 비교합니다." },
    ],
  },
  {
    id: "line-break-cleaner",
    path: "/tools/line-break-cleaner/",
    category: "텍스트",
    title: "줄바꿈·공백 정리",
    summary:
      "문장 중간 줄바꿈을 문단 단위로 정리하고, 앞뒤 공백과 과한 빈 줄을 깔끔하게 맞춥니다.",
    seoTitle: "줄바꿈 제거 | 문단 정리 도구",
    seoDescription:
      "복사한 글의 줄바꿈과 공백을 정리해 문서, 메일, 게시글에 붙여넣기 좋은 형태로 바꿉니다.",
    keywords: ["줄바꿈", "문단", "공백", "텍스트 정리"],
    guide: [
      { title: "입력", text: "복사한 기사, PDF 본문, 메신저 대화, 회의 메모를 붙여넣습니다." },
      { title: "옵션 선택", text: "문장 줄바꿈 합치기, 빈 줄 정리, 공백 압축 같은 옵션을 켭니다." },
      { title: "출력 확인", text: "정리된 문단을 복사해 바로 문서에 옮깁니다." },
    ],
  },
  {
    id: "markdown-editor",
    path: "/tools/markdown-editor/",
    category: "텍스트",
    title: "마크다운 편집기",
    summary:
      "서식 없는 텍스트를 제목, 굵게, 목록, 인용, 링크 같은 마크다운 문법으로 빠르게 편집하고 미리보기로 확인합니다.",
    seoTitle: "마크다운 편집기 | 온라인 Markdown 작성 도구",
    seoDescription:
      "브라우저에서 마크다운 문서를 작성하고 미리보기, 복사, 저장까지 할 수 있는 무료 온라인 편집기입니다.",
    keywords: ["마크다운", "Markdown", "문서 작성", "편집기"],
    guide: [
      { title: "내용 입력", text: "서식 없는 텍스트나 초안 문장을 붙여넣습니다." },
      { title: "문법 적용", text: "제목, 굵게, 목록, 인용, 코드, 링크 버튼으로 마크다운 형식을 빠르게 넣습니다." },
      { title: "미리보기 확인", text: "오른쪽 미리보기에서 문서 형태를 확인하고 복사하거나 MD 파일로 저장합니다." },
    ],
  },
  {
    id: "markdown-viewer",
    path: "/tools/markdown-viewer/",
    category: "텍스트",
    title: "MD 파일 뷰어",
    summary:
      "MD, Markdown, TXT 파일을 브라우저에서 열어 넓고 읽기 좋은 화면으로 보고, 글자 크기와 줄 간격을 조절합니다.",
    seoTitle: "MD 파일 뷰어 | Markdown 파일 읽기 도구",
    seoDescription:
      "MD와 Markdown 파일을 서버 업로드 없이 브라우저에서 열어 목차와 문서 화면으로 읽고, 글자 크기와 줄 간격을 조절하는 무료 뷰어입니다.",
    keywords: ["MD 파일 뷰어", "Markdown 뷰어", "마크다운 파일 열기", "README 보기"],
    guide: [
      { title: "파일 선택", text: ".md, .markdown, .txt 파일을 선택하거나 업로드 영역에 끌어다 놓습니다." },
      { title: "문서 화면 조절", text: "글자 크기, 줄 간격, 테마를 문서 성격과 화면 크기에 맞게 조절합니다." },
      { title: "목차와 원문 확인", text: "제목 기반 목차로 이동하거나 원문 보기·분할 보기로 마크다운 원문을 함께 확인합니다." },
      { title: "필요한 내용 복사", text: "원문 또는 마크다운 기호를 정리한 텍스트를 브라우저에서 바로 복사합니다." },
    ],
  },
  {
    id: "text-extractor",
    path: "/tools/text-extractor/",
    category: "텍스트",
    title: "이메일·URL·전화번호 추출기",
    summary:
      "비정형 텍스트에서 이메일 주소, 링크, 전화번호만 골라내어 항목별로 복사할 수 있게 정리합니다.",
    seoTitle: "이메일 URL 전화번호 추출기 | 텍스트 데이터 정리",
    seoDescription:
      "긴 문서나 복사한 텍스트에서 이메일, URL, 전화번호만 추출해 업무용 목록으로 정리합니다.",
    keywords: ["이메일", "URL", "전화번호", "추출"],
    guide: [
      { title: "원문 붙여넣기", text: "메일 본문, 공지문, 문의 내역, CRM 메모를 넣습니다." },
      { title: "항목별 분리", text: "이메일, 링크, 전화번호가 자동으로 각각의 목록으로 정리됩니다." },
      { title: "개별 복사", text: "필요한 항목만 골라 바로 복사해 후속 작업에 사용합니다." },
    ],
  },
  {
    id: "duplicate-line-remover",
    path: "/tools/duplicate-line-remover/",
    category: "텍스트",
    title: "중복 줄 제거",
    summary:
      "리스트, 키워드, 메일 목록, URL 목록에서 중복된 줄을 제거하고 결과 수를 바로 확인합니다.",
    seoTitle: "중복 줄 제거 | 목록 정리 도구",
    seoDescription:
      "줄 단위 목록에서 중복 항목을 제거하고 정리된 결과를 복사할 수 있는 브라우저 도구입니다.",
    keywords: ["중복", "줄 제거", "목록", "정리"],
    guide: [
      { title: "목록 입력", text: "한 줄에 하나씩 정리된 항목 목록을 붙여넣습니다." },
      { title: "기준 선택", text: "대소문자 구분, 공백 정리, 정렬 옵션을 선택합니다." },
      { title: "결과 활용", text: "중복이 제거된 목록을 복사하거나 저장합니다." },
    ],
  },
  {
    id: "find-replace",
    path: "/tools/find-replace/",
    category: "텍스트",
    title: "찾기 및 바꾸기",
    summary:
      "긴 텍스트에서 특정 단어나 패턴을 한 번에 찾아 다른 값으로 교체합니다.",
    seoTitle: "찾기 및 바꾸기 | 문자열 일괄 변경",
    seoDescription:
      "문서, 메일, 자막, 텍스트 목록에서 특정 단어나 패턴을 일괄 치환하는 브라우저 도구입니다.",
    keywords: ["찾기 바꾸기", "치환", "문자열", "일괄 변경"],
    guide: [
      { title: "원문 입력", text: "수정할 텍스트를 붙여넣습니다." },
      { title: "검색 조건 설정", text: "찾을 값, 바꿀 값, 대소문자 구분, 정규식 사용 여부를 고릅니다." },
      { title: "치환 결과 확인", text: "바뀐 항목 수와 결과 텍스트를 확인한 뒤 복사합니다." },
    ],
  },
  {
    id: "case-converter",
    path: "/tools/case-converter/",
    category: "텍스트",
    title: "대소문자 변환",
    summary:
      "영문 텍스트를 소문자, 대문자, 제목형, camelCase, snake_case, kebab-case로 빠르게 변환합니다.",
    seoTitle: "대소문자 변환 | camelCase snake_case 변환기",
    seoDescription:
      "영문 문장과 키워드를 다양한 케이스 형식으로 변환하는 브라우저용 텍스트 도구입니다.",
    keywords: ["camelCase", "snake_case", "대문자", "소문자"],
    guide: [
      { title: "영문 입력", text: "문장, 파일명, 키워드, 태그를 붙여넣습니다." },
      { title: "형식 선택", text: "원하는 케이스 모드를 눌러 즉시 결과를 확인합니다." },
      { title: "바로 복사", text: "개발, 마케팅, 파일명 정리 작업에 바로 활용합니다." },
    ],
  },
  {
    id: "text-diff",
    path: "/tools/text-diff/",
    category: "텍스트",
    title: "텍스트 비교기",
    summary:
      "두 텍스트를 줄 단위로 비교해 추가·삭제된 내용을 눈에 띄게 확인합니다.",
    seoTitle: "텍스트 비교기 | 문서 변경사항 비교",
    seoDescription:
      "수정 전후 문서를 줄 단위로 비교해 변경된 부분을 시각적으로 보여주는 브라우저 도구입니다.",
    keywords: ["비교", "diff", "변경사항", "문서"],
    guide: [
      { title: "두 버전 입력", text: "수정 전 텍스트와 수정 후 텍스트를 각각 붙여넣습니다." },
      { title: "비교 실행", text: "줄 단위 차이를 추가, 삭제, 유지 상태로 나눠 보여줍니다." },
      { title: "검토", text: "보고서, 자막, 계약 문구, 프롬프트 수정 이력을 빠르게 확인합니다." },
    ],
  },
  {
    id: "qr-code-generator",
    path: "/tools/qr-code-generator/",
    category: "이미지",
    title: "QR 코드 생성기",
    summary:
      "URL, 일반 텍스트, Wi-Fi 접속 정보를 QR 코드로 만들고 SVG, PNG, JPG 형식으로 저장합니다.",
    seoTitle: "QR 코드 생성기 | URL 텍스트 Wi-Fi QR 만들기",
    seoDescription:
      "브라우저에서 URL, 텍스트, Wi-Fi 정보를 QR 코드로 만들고 바로 다운로드하는 무료 도구입니다.",
    keywords: ["QR", "URL", "Wi-Fi", "생성"],
    guide: [
      { title: "형식 선택", text: "URL, 텍스트, Wi-Fi 정보 중 하나를 고릅니다." },
      { title: "디자인 조정", text: "파일명, 색상, 배경, 모양, 크기, 저장 형식을 간단히 선택합니다." },
      { title: "생성 및 저장", text: "미리보기에서 QR을 확인하고 SVG, PNG, JPG 중 필요한 형식으로 저장합니다." },
    ],
  },
  {
    id: "qr-link-extractor",
    path: "/tools/qr-link-extractor/",
    category: "이미지",
    title: "QR 링크 추출기",
    summary:
      "QR 코드 이미지나 스크린샷을 브라우저에서 읽어 URL과 원문 텍스트를 추출합니다.",
    seoTitle: "QR 링크 추출기 | QR 이미지 URL 읽기",
    seoDescription:
      "QR 코드 이미지와 스크린샷에서 URL과 텍스트를 브라우저 안에서 추출하는 무료 도구입니다.",
    keywords: ["QR 읽기", "QR 링크", "QR 스캔", "URL 추출"],
    guide: [
      { title: "이미지 선택", text: "QR 코드가 보이는 이미지나 스크린샷을 업로드하거나 붙여넣습니다." },
      { title: "브라우저에서 판독", text: "이미지를 서버에 올리지 않고 브라우저 안에서 QR 내용을 읽습니다." },
      { title: "링크 확인", text: "URL이면 복사하거나 새 탭으로 열고, URL이 아니면 원문 텍스트로 확인합니다." },
    ],
  },
  {
    id: "screenshot-saver",
    path: "/tools/screenshot-saver/",
    category: "이미지",
    title: "스샷 저장기",
    summary:
      "Win+Shift+S로 캡처한 화면 영역을 Ctrl+V로 붙여넣으면 브라우저에서 바로 이미지 파일로 저장합니다.",
    seoTitle: "스샷 저장기 | 캡처 붙여넣기 즉시 저장",
    seoDescription:
      "Windows 11의 Win+Shift+S 캡처 이미지를 Ctrl+V로 붙여넣고 PNG, JPG, WEBP 이미지로 바로 다운로드하는 무료 브라우저 도구입니다.",
    keywords: ["스크린샷 저장", "캡처 저장", "Win Shift S", "붙여넣기 이미지"],
    guide: [
      { title: "영역 캡처", text: "Windows에서 Win+Shift+S를 누르고 저장할 화면 영역을 드래그합니다." },
      { title: "붙여넣기", text: "도구 화면에서 Ctrl+V를 누르면 클립보드의 스크린샷 이미지를 읽습니다." },
      { title: "즉시 저장", text: "기본값으로 붙여넣는 즉시 PNG 파일을 다운로드하고 미리보기를 표시합니다." },
      { title: "필요 시 형식 변경", text: "JPG나 WEBP가 필요하면 출력 형식을 바꾼 뒤 수동 저장합니다." },
    ],
  },
  {
    id: "image-resizer",
    path: "/tools/image-resizer/",
    category: "이미지",
    title: "이미지 크기 조절",
    summary:
      "사진과 이미지를 원하는 픽셀 크기로 맞추고 비율을 유지한 채 저장합니다.",
    seoTitle: "이미지 크기 조절 | 사진 리사이즈",
    seoDescription:
      "브라우저에서 이미지 크기를 픽셀 단위로 조절하고 결과 이미지를 바로 저장합니다.",
    keywords: ["리사이즈", "사진", "픽셀", "크기"],
    guide: [
      { title: "이미지 업로드", text: "JPG, PNG, WEBP 이미지를 선택하거나 업로드 영역에 끌어다 놓습니다." },
      { title: "가로세로 지정", text: "원하는 크기를 입력하고 비율 유지 여부를 고릅니다." },
      { title: "미리보기 저장", text: "결과 이미지를 확인한 뒤 저장합니다." },
    ],
  },
  {
    id: "image-converter",
    path: "/tools/image-converter/",
    category: "이미지",
    title: "이미지 형식 변환",
    summary:
      "JPG, PNG, WEBP 사이에서 이미지를 변환하고 브라우저에서 바로 내려받습니다.",
    seoTitle: "이미지 형식 변환 | JPG PNG WEBP 변환",
    seoDescription:
      "JPG, PNG, WEBP 이미지를 원하는 형식으로 브라우저에서 변환하는 무료 도구입니다.",
    keywords: ["JPG", "PNG", "WEBP", "변환"],
    guide: [
      { title: "원본 선택", text: "변환할 이미지를 선택하거나 업로드 영역에 끌어다 놓습니다." },
      { title: "형식 지정", text: "대상 형식과 품질 값을 선택합니다." },
      { title: "변환 저장", text: "미리보기와 파일 크기를 확인하고 결과 파일을 저장합니다." },
    ],
  },
  {
    id: "image-compressor",
    path: "/tools/image-compressor/",
    category: "이미지",
    title: "이미지 용량 압축",
    summary:
      "이미지 품질과 최대 너비를 조절해 업로드용 저용량 이미지로 압축합니다.",
    seoTitle: "이미지 압축 | 사진 용량 줄이기",
    seoDescription:
      "브라우저에서 JPG, PNG, WEBP 이미지 용량을 줄이고 압축 결과를 바로 내려받는 도구입니다.",
    keywords: ["압축", "용량", "사진", "업로드"],
    guide: [
      { title: "이미지 업로드", text: "메일 첨부, 웹 업로드, 제출용으로 줄일 이미지를 선택하거나 업로드 영역에 끌어다 놓습니다." },
      { title: "용량과 품질 조정", text: "품질과 최대 너비를 조절하면서 파일 크기 변화를 확인합니다." },
      { title: "압축본 저장", text: "원본은 그대로 두고 브라우저에서 생성된 압축 이미지만 내려받습니다." },
    ],
  },
  {
    id: "exif-metadata-remover",
    path: "/tools/exif-metadata-remover/",
    category: "이미지",
    title: "EXIF 메타데이터 제거",
    summary:
      "사진 파일에 남아 있는 위치정보, 촬영 기기, 편집 정보 같은 메타데이터를 브라우저 안에서 제거합니다.",
    seoTitle: "EXIF 메타데이터 제거 | 사진 위치정보 삭제",
    seoDescription:
      "JPG, PNG, WEBP 이미지의 EXIF, XMP, IPTC 같은 개인정보성 메타데이터를 서버 업로드 없이 브라우저에서 제거하는 무료 도구입니다.",
    keywords: ["EXIF 제거", "메타데이터 삭제", "사진 위치정보", "개인정보 보호"],
    guide: [
      { title: "사진 선택", text: "JPG, PNG, WEBP 이미지를 선택하거나 업로드 영역에 끌어다 놓습니다." },
      { title: "메타데이터 확인", text: "파일 안에서 감지된 EXIF, XMP, IPTC, 텍스트 메타데이터 항목을 확인합니다." },
      { title: "제거 실행", text: "브라우저 안에서 개인정보성 메타데이터 청크를 제거하고 결과 파일을 준비합니다." },
      { title: "결과 저장", text: "정리된 이미지를 내려받아 블로그, 메신저, 제출 자료에 사용합니다." },
    ],
  },
  {
    id: "pdf-merge",
    path: "/tools/pdf-merge/",
    category: "PDF",
    title: "PDF 합치기",
    summary:
      "여러 PDF 파일을 업로드 순서대로 하나의 PDF 파일로 결합합니다.",
    seoTitle: "PDF 합치기 | 여러 PDF 병합",
    seoDescription:
      "브라우저에서 여러 PDF 파일을 하나로 병합하는 무료 도구입니다. 업로드 파일은 서버에 저장하지 않습니다.",
    keywords: ["PDF", "병합", "합치기", "문서"],
    guide: [
      { title: "PDF 선택", text: "견적서, 계약서, 첨부자료처럼 하나로 묶을 PDF 파일을 선택하거나 업로드 영역에 끌어다 놓습니다." },
      { title: "순서 확인", text: "업로드된 파일 순서를 확인한 뒤 병합을 실행합니다." },
      { title: "결과 저장", text: "브라우저 안에서 만들어진 병합 PDF를 바로 내려받습니다." },
    ],
  },
  {
    id: "pdf-split",
    path: "/tools/pdf-split/",
    category: "PDF",
    title: "PDF 분할",
    summary:
      "한 개의 PDF를 페이지 수 기준으로 여러 파일로 나누어 내려받습니다.",
    seoTitle: "PDF 분할 | 페이지 단위 나누기",
    seoDescription:
      "브라우저에서 PDF를 페이지 수 기준으로 여러 파일로 분할하는 도구입니다.",
    keywords: ["PDF", "분할", "나누기", "페이지"],
    guide: [
      { title: "파일 업로드", text: "분할할 PDF 파일 한 개를 선택하거나 업로드 영역에 끌어다 놓습니다." },
      { title: "기준 입력", text: "몇 페이지마다 새 파일을 만들지 지정합니다." },
      { title: "순차 다운로드", text: "분할된 PDF가 브라우저 다운로드로 순차 저장됩니다." },
    ],
  },
  {
    id: "pdf-extract-pages",
    path: "/tools/pdf-extract-pages/",
    category: "PDF",
    title: "PDF 페이지 추출",
    summary:
      "원하는 페이지 범위를 입력해 필요한 페이지들만 새 PDF로 뽑아냅니다.",
    seoTitle: "PDF 페이지 추출 | 특정 페이지만 저장",
    seoDescription:
      "PDF에서 필요한 페이지 범위만 추출해 별도 파일로 저장하는 브라우저 도구입니다.",
    keywords: ["PDF", "추출", "범위", "특정 페이지"],
    guide: [
      { title: "파일 선택", text: "원본 PDF를 선택하거나 업로드 영역에 끌어다 놓습니다." },
      { title: "범위 입력", text: "예: 1-3,5,9 같은 형식으로 추출할 페이지를 입력합니다." },
      { title: "새 파일 저장", text: "선택한 페이지로 구성된 새 PDF를 저장합니다." },
    ],
  },
  {
    id: "image-to-pdf",
    path: "/tools/image-to-pdf/",
    category: "PDF",
    title: "이미지 PDF 변환",
    summary:
      "여러 장의 JPG, PNG, WEBP 이미지를 순서대로 묶어 하나의 PDF 문서로 만듭니다.",
    seoTitle: "이미지 PDF 변환 | JPG PNG를 PDF로 만들기",
    seoDescription:
      "브라우저에서 이미지 여러 장을 PDF로 변환하는 무료 도구입니다.",
    keywords: ["JPG PDF", "PNG PDF", "사진", "문서"],
    guide: [
      { title: "이미지 업로드", text: "PDF로 묶을 이미지를 여러 장 선택하거나 업로드 영역에 끌어다 놓습니다." },
      { title: "순서 확인", text: "선택한 순서대로 페이지가 만들어집니다." },
      { title: "PDF 생성", text: "결과 PDF를 브라우저에서 바로 내려받습니다." },
    ],
  },
  {
    id: "pdf-to-image",
    path: "/tools/pdf-to-image/",
    category: "PDF",
    title: "PDF 이미지 변환",
    summary:
      "PDF 각 페이지를 PNG 이미지로 렌더링해 미리 보고 개별 다운로드합니다.",
    seoTitle: "PDF 이미지 변환 | PDF를 PNG로 저장",
    seoDescription:
      "브라우저에서 PDF 페이지를 이미지로 렌더링하고 PNG 파일로 저장하는 도구입니다.",
    keywords: ["PDF PNG", "PDF 이미지", "렌더링", "페이지"],
    guide: [
      { title: "PDF 업로드", text: "이미지로 바꿀 PDF를 선택하거나 업로드 영역에 끌어다 놓습니다." },
      { title: "배율 조정", text: "렌더링 배율을 조정해 선명도를 맞춥니다." },
      { title: "페이지별 저장", text: "페이지마다 생성된 PNG를 원하는 것만 저장합니다." },
    ],
  },
  {
    id: "srt-cleaner",
    path: "/tools/srt-cleaner/",
    category: "자막",
    title: "SRT 자막 정리",
    summary:
      "SRT 자막 번호를 다시 매기고 과한 공백, 빈 줄, 줄바꿈을 정리해 안정적인 형식으로 맞춥니다.",
    seoTitle: "SRT 자막 정리 | 자막 포맷 정리",
    seoDescription:
      "SRT 자막 번호, 공백, 문장 줄바꿈을 정리하는 브라우저용 자막 도구입니다.",
    keywords: ["SRT", "자막", "정리", "번호"],
    guide: [
      { title: "자막 불러오기", text: "SRT 파일을 열거나 텍스트를 붙여넣습니다." },
      { title: "정리 실행", text: "번호를 다시 매기고 빈 줄, 공백, 불필요한 줄바꿈을 정리합니다." },
      { title: "저장", text: "정리된 SRT를 복사하거나 파일로 저장합니다." },
    ],
  },
  {
    id: "subtitle-converter",
    path: "/tools/subtitle-converter/",
    category: "자막",
    title: "SRT ↔ VTT 변환",
    summary:
      "SRT 자막과 VTT 자막을 상호 변환해 유튜브, 웹 플레이어, 편집툴에 맞게 저장합니다.",
    seoTitle: "SRT VTT 변환 | 자막 포맷 변환",
    seoDescription:
      "SRT 자막과 VTT 자막을 브라우저에서 서로 변환하는 무료 자막 도구입니다.",
    keywords: ["SRT", "VTT", "변환", "자막 포맷"],
    guide: [
      { title: "원본 입력", text: "SRT 또는 VTT 파일을 선택하거나 본문을 붙여넣습니다." },
      { title: "대상 형식 선택", text: "SRT 또는 VTT 중 원하는 출력 형식을 고릅니다." },
      { title: "결과 저장", text: "변환된 자막을 복사하거나 내려받습니다." },
    ],
  },
  {
    id: "subtitle-timing",
    path: "/tools/subtitle-timing/",
    category: "자막",
    title: "자막 시간 보정",
    summary:
      "전체 자막 시간을 초 단위로 앞당기거나 늦춰 싱크 밀림을 한 번에 수정합니다.",
    seoTitle: "자막 시간 보정 | SRT VTT 싱크 조절",
    seoDescription:
      "SRT와 VTT 자막의 전체 시간을 초 단위로 이동해 싱크를 맞추는 브라우저 도구입니다.",
    keywords: ["자막", "싱크", "시간 보정", "SRT"],
    guide: [
      { title: "자막 입력", text: "SRT 또는 VTT 자막을 불러옵니다." },
      { title: "시간 이동값 설정", text: "플러스나 마이너스 초 값을 입력합니다." },
      { title: "결과 확인", text: "보정된 자막을 확인하고 파일로 저장합니다." },
    ],
  },
];

const LOCALE_CONFIGS = {
  ko: {
    id: "ko",
    pathPrefix: "",
    htmlLang: "ko",
    languageCode: "ko-KR",
    numberLocale: "ko-KR",
    brandName: BRAND_NAME,
    brandDescription: BRAND_DESCRIPTION,
    allCategoryLabel: "\uC804\uCCB4",
    categoryOrder: ["\uC804\uCCB4", "\uC74C\uC131", "영상", "\uD14D\uC2A4\uD2B8", "\uC774\uBBF8\uC9C0", "PDF", "\uC790\uB9C9"],
  },
  en: {
    id: "en",
    pathPrefix: "/en",
    htmlLang: "en",
    languageCode: "en-US",
    numberLocale: "en-US",
    brandName: "ko-workspace",
    brandDescription:
      "ko-workspace is a collection of browser-based text, image, PDF, subtitle, audio, and video tools that run without sign-up.",
    allCategoryLabel: "All",
    categoryOrder: ["All", "Audio", "Video", "Text", "Image", "PDF", "Subtitles"],
  },
  ja: {
    id: "ja",
    pathPrefix: "/ja",
    htmlLang: "ja",
    languageCode: "ja-JP",
    numberLocale: "ja-JP",
    brandName: "ko-workspace",
    brandDescription:
      "ko-workspaceは、登録なしで使えるブラウザ処理中心のテキスト、画像、PDF、字幕、音声、動画ツール集です。",
    allCategoryLabel: "すべて",
    categoryOrder: ["すべて", "音声", "動画", "テキスト", "画像", "PDF", "字幕"],
  },
  zh: {
    id: "zh",
    pathPrefix: "/zh",
    htmlLang: "zh-Hans",
    languageCode: "zh-CN",
    numberLocale: "zh-CN",
    brandName: "ko-workspace",
    brandDescription:
      "ko-workspace 是一组无需注册、以浏览器本地处理为中心的文本、图片、PDF、字幕、音频和视频工具。",
    allCategoryLabel: "全部",
    categoryOrder: ["全部", "音频", "视频", "文本", "图片", "PDF", "字幕"],
  },
};
const SUPPORTED_LOCALES = Object.keys(LOCALE_CONFIGS);
const CATEGORY_LABELS_BY_LOCALE = {
  en: {
    "\uC74C\uC131": "Audio",
    영상: "Video",
    "\uD14D\uC2A4\uD2B8": "Text",
    이미지: "Image",
    PDF: "PDF",
    자막: "Subtitles",
  },
  ja: {
    "\uC74C\uC131": "音声",
    영상: "動画",
    "\uD14D\uC2A4\uD2B8": "テキスト",
    이미지: "画像",
    PDF: "PDF",
    자막: "字幕",
  },
  zh: {
    "\uC74C\uC131": "音频",
    영상: "视频",
    "\uD14D\uC2A4\uD2B8": "文本",
    이미지: "图片",
    PDF: "PDF",
    자막: "字幕",
  },
};

const APP_LOCALE = detectAppLocale();
const ACTIVE_LOCALE_CONFIG = LOCALE_CONFIGS[APP_LOCALE] || LOCALE_CONFIGS.ko;
const IS_ENGLISH_LOCALE = APP_LOCALE === "en";
const IS_KOREAN_LOCALE = APP_LOCALE === "ko";
const BRAND_NAME_LOCALIZED = ACTIVE_LOCALE_CONFIG.brandName;
const BRAND_DESCRIPTION_LOCALIZED = ACTIVE_LOCALE_CONFIG.brandDescription;
const ALL_CATEGORY_LABEL = ACTIVE_LOCALE_CONFIG.allCategoryLabel;
const CATEGORY_LABELS_ACTIVE = CATEGORY_LABELS_BY_LOCALE[APP_LOCALE] || {};
const CATEGORY_ORDER = ACTIVE_LOCALE_CONFIG.categoryOrder;
const UI_TEXT = {
  ko: {
    freeTool: "무료 온라인 도구",
    noSearchResult: "검색 조건에 맞는 도구가 없습니다.",
    searchPlaceholder: "찾는 도구 검색",
    searchLabel: "찾는 도구 검색",
    privacy: "개인정보",
    terms: "이용약관",
    quickFlow: "사용 흐름",
    directoryLabel: "도구 목록",
    categoryTools: "카테고리별 도구",
    categorySeoSuffix: "를 브라우저에서 바로 사용하세요",
    detailSummary: "사용 시나리오",
    help: "도움말",
    scenarioCheckLabel: "확인할 점",
    fallbackNotConnected: "이 도구는 아직 연결되지 않았습니다.",
    fallbackExample1: (title) => `${title}로 반복되는 업무 자료를 브라우저에서 바로 정리합니다.`,
    fallbackExample2: (title) => `${title} 결과를 복사하거나 필요한 파일로 저장해 다음 작업에 사용합니다.`,
    freeQuestion: (title) => `${title}는 무료로 사용할 수 있나요?`,
    freeAnswer: (title) => `네. ${title}는 로그인 없이 무료로 사용할 수 있는 코워크스페이스의 브라우저 기반 업무 도구입니다.`,
    privacyQuestion: (title) => `${title}에서 입력한 내용은 저장되나요?`,
    privacyAnswer:
      "아니요. 도구의 작업 데이터는 코워크스페이스 자체 서버에 저장하지 않고 브라우저 안에서 처리하도록 설계되어 있습니다. 단, Google Analytics와 AdSense 같은 외부 서비스는 정책에 따라 쿠키나 광고 식별자를 사용할 수 있습니다.",
    useQuestion: (title) => `${title}는 어떤 작업에 활용하면 좋나요?`,
    defaultFaqQuestion: (title) => `${title}는 어떤 상황에서 사용하면 좋나요?`,
    otherTools: "다른 도구",
    openToolLabel: (title) => `${title} 열기`,
    bookmarkTitle: "즐겨찾기 추가",
    bookmarkAria: "즐겨찾기 추가 안내",
    bookmarkToast: (shortcut) => `브라우저 즐겨찾기는 ${shortcut}로 추가할 수 있습니다.`,
    servicePrinciples: "서비스 원칙 보기",
    selectionCopy: "선택한 문장 복사",
    selectionCopied: "선택한 내용을 복사했습니다.",
    betaLabel: "(베타)",
    previousTools: "이전 도구 보기",
    nextTools: "다음 도구 보기",
  },
  en: {
    freeTool: "Free Online Tool",
    noSearchResult: "No tools match your search.",
    searchPlaceholder: "Search tools",
    searchLabel: "Search tools",
    privacy: "Privacy",
    terms: "Terms",
    quickFlow: "Quick Flow",
    directoryLabel: "Tool Directory",
    categoryTools: "Tools by Category",
    categorySeoSuffix: " you can use in your browser",
    detailSummary: "Usage Scenarios",
    help: "Help",
    scenarioCheckLabel: "Check",
    fallbackNotConnected: "This tool is not connected yet.",
    fallbackExample1: (title) => `Use ${title} to handle repeat work directly in your browser.`,
    fallbackExample2: (title) => `Copy the result or download the output file for your next step.`,
    freeQuestion: (title) => `Is ${title} free to use?`,
    freeAnswer: (title) => `Yes. ${title} is a free browser-based ko-workspace tool that works without sign-up.`,
    privacyQuestion: (title) => `Does ${title} store my input?`,
    privacyAnswer:
      "No. Tool work data is designed to stay in your browser and is not stored on the ko-workspace application server. Google Analytics and AdSense may use cookies or advertising identifiers under their own policies.",
    useQuestion: (title) => `What can I use ${title} for?`,
    defaultFaqQuestion: (title) => `When should I use ${title}?`,
    otherTools: "Other Tools",
    openToolLabel: (title) => `Open ${title}`,
    bookmarkTitle: "Add bookmark",
    bookmarkAria: "How to add this page to bookmarks",
    bookmarkToast: (shortcut) => `Use ${shortcut} to bookmark this page in your browser.`,
    servicePrinciples: "View service principles",
    selectionCopy: "Copy selected text",
    selectionCopied: "Selected text copied.",
    betaLabel: "(Beta)",
    previousTools: "Previous tools",
    nextTools: "Next tools",
  },
  ja: {
    freeTool: "無料オンラインツール",
    noSearchResult: "検索条件に一致するツールがありません。",
    searchPlaceholder: "ツールを検索",
    searchLabel: "ツールを検索",
    privacy: "プライバシー",
    terms: "利用規約",
    quickFlow: "使い方",
    directoryLabel: "ツール一覧",
    categoryTools: "カテゴリ別ツール",
    categorySeoSuffix: "をブラウザでそのまま使えます",
    detailSummary: "利用シナリオ",
    help: "ヘルプ",
    scenarioCheckLabel: "確認ポイント",
    fallbackNotConnected: "このツールはまだ接続されていません。",
    fallbackExample1: (title) => `${title}で繰り返し作業をブラウザ内で処理できます。`,
    fallbackExample2: (title) => `${title}の結果をコピーするか、必要なファイルとして保存できます。`,
    freeQuestion: (title) => `${title}は無料で使えますか？`,
    freeAnswer: (title) => `はい。${title}は登録なしで使える無料のブラウザベースのko-workspaceツールです。`,
    privacyQuestion: (title) => `${title}は入力内容を保存しますか？`,
    privacyAnswer:
      "いいえ。ツールの作業データはブラウザ内で処理され、ko-workspaceのアプリケーションサーバーには保存されません。Google AnalyticsやAdSenseは各ポリシーに基づいてCookieや広告識別子を使用する場合があります。",
    useQuestion: (title) => `${title}はどんな作業に使えますか？`,
    defaultFaqQuestion: (title) => `${title}はどんな場面で使うと便利ですか？`,
    otherTools: "ほかのツール",
    openToolLabel: (title) => `${title}を開く`,
    bookmarkTitle: "ブックマークに追加",
    bookmarkAria: "ブックマーク追加の案内",
    bookmarkToast: (shortcut) => `ブラウザのブックマークは${shortcut}で追加できます。`,
    servicePrinciples: "サービス方針を見る",
    selectionCopy: "選択したテキストをコピー",
    selectionCopied: "選択した内容をコピーしました。",
    betaLabel: "(ベータ)",
    previousTools: "前のツール",
    nextTools: "次のツール",
  },
  zh: {
    freeTool: "免费在线工具",
    noSearchResult: "没有符合搜索条件的工具。",
    searchPlaceholder: "搜索工具",
    searchLabel: "搜索工具",
    privacy: "隐私",
    terms: "条款",
    quickFlow: "使用流程",
    directoryLabel: "工具目录",
    categoryTools: "按类别查看工具",
    categorySeoSuffix: "，可直接在浏览器中使用",
    detailSummary: "使用场景",
    help: "帮助",
    scenarioCheckLabel: "注意",
    fallbackNotConnected: "此工具尚未连接。",
    fallbackExample1: (title) => `使用 ${title} 可直接在浏览器中处理重复工作。`,
    fallbackExample2: (title) => `复制 ${title} 的结果，或下载输出文件用于下一步。`,
    freeQuestion: (title) => `${title} 可以免费使用吗？`,
    freeAnswer: (title) => `可以。${title} 是 ko-workspace 提供的免费浏览器工具，无需注册。`,
    privacyQuestion: (title) => `${title} 会保存我的输入吗？`,
    privacyAnswer:
      "不会。工具工作数据设计为留在浏览器中处理，不会保存到 ko-workspace 应用服务器。Google Analytics 和 AdSense 可能会按各自政策使用 Cookie 或广告标识符。",
    useQuestion: (title) => `${title} 适合哪些工作？`,
    defaultFaqQuestion: (title) => `什么时候适合使用 ${title}？`,
    otherTools: "其他工具",
    openToolLabel: (title) => `打开 ${title}`,
    bookmarkTitle: "添加书签",
    bookmarkAria: "如何将此页面添加到书签",
    bookmarkToast: (shortcut) => `可使用 ${shortcut} 将此页面加入浏览器书签。`,
    servicePrinciples: "查看服务原则",
    selectionCopy: "复制选中的文本",
    selectionCopied: "已复制选中的文本。",
    betaLabel: "(测试版)",
    previousTools: "上一组工具",
    nextTools: "下一组工具",
  },
};
const TOOL_DEFS_EN_OVERRIDES = {
  "voice-to-text": {
    title: "Speech to Text",
    summary: "Dictate English speech in your browser and turn it into draft scripts, meeting notes, or presentation text.",
    seoTitle: "Speech to Text | English Dictation Tool",
    seoDescription: "Use your browser microphone to dictate English speech and organize the transcript without installing software.",
    keywords: ["speech to text", "English dictation", "meeting notes", "script"],
    guide: [
      { title: "Allow microphone", text: "Grant microphone permission when your browser asks." },
      { title: "Start dictation", text: "Your speech appears in the transcript area as you talk." },
      { title: "Choose a format", text: "Turn the transcript into a general script, YouTube script, presentation, or meeting note." },
      { title: "Copy or save", text: "Copy the cleaned result or download it as a TXT file." },
    ],
  },
  "audio-file-transcription": {
    title: "Audio File Transcription",
    summary: "Turn short phone recordings into review drafts in your browser with an on-demand Whisper model.",
    seoTitle: "Audio File Transcription | Browser STT for Phone Recordings",
    seoDescription: "Transcribe short m4a, mp3, wav, and aac recordings in your browser without uploading them to the application server.",
    keywords: ["audio transcription", "phone recording", "speech to text", "m4a transcription"],
    guide: [
      { title: "Choose a recording", text: "Select a short m4a, mp3, wav, or aac recording." },
      { title: "Prepare the model", text: "The browser downloads the speech model only when you run this tool." },
      { title: "Transcribe locally", text: "The recording is decoded in the browser and processed as a review draft." },
      { title: "Review the draft", text: "Check the transcript manually, apply sentence breaks, then copy or save it." },
    ],
  },
  "audio-editor": {
    title: "Audio Trimmer & Joiner",
    summary: "Open common phone recordings, view the waveform, cut or paste selected ranges, adjust volume, and export WAV.",
    seoTitle: "Online Audio Trimmer & Joiner | Edit Phone Recordings",
    seoDescription: "Edit m4a, aac, mp3, and wav phone recordings in your browser with waveform selection, cut, paste, undo, volume control, and WAV export.",
    keywords: ["audio trimmer", "m4a cutter", "phone recording editor", "audio joiner"],
    guide: [
      { title: "Choose a recording", text: "Select a common phone recording such as m4a, aac, mp3, or wav." },
      { title: "Select on waveform", text: "Drag across the waveform to select the part you want to cut, keep, copy, or play." },
      { title: "Edit quickly", text: "Delete, keep, copy, paste, undo, redo, or adjust volume for the selected range." },
      { title: "Export WAV", text: "Download the edited audio as a WAV file. The recording is not uploaded to the application server." },
    ],
  },
  "webcam-recorder": {
    title: "Webcam Recorder",
    summary: "Record your camera and microphone in the browser with mirror, filters, background blur, and local WebM export.",
    seoTitle: "Webcam Recorder | Browser Camera Recording",
    seoDescription: "Record webcam video with optional microphone, mirror, filters, brightness controls, and background effects directly in your browser.",
    keywords: ["webcam recorder", "camera recording", "WebM", "background blur"],
    guide: [
      { title: "Allow camera", text: "Grant camera and optional microphone permission." },
      { title: "Adjust preview", text: "Set mirror, brightness, contrast, saturation, filters, or background effects." },
      { title: "Record", text: "Record as WebM by default, with MP4 where your browser supports it." },
      { title: "Save", text: "Preview the recording and download the file locally." },
    ],
  },
  "ai-text-cleaner": {
    title: "AI Paste Cleaner",
    summary: "Clean Markdown marks, headings, links, code blocks, and extra line breaks from copied AI answers.",
    seoTitle: "AI Paste Cleaner | Remove ChatGPT Markdown",
    seoDescription: "Clean pasted ChatGPT, Claude, or Gemini answers for documents, email, blogs, and messengers.",
    keywords: ["ChatGPT", "Markdown cleaner", "AI text", "paste cleanup"],
    guide: [
      { title: "Paste AI text", text: "Paste an AI answer, draft, email, or blog copy." },
      { title: "Pick a purpose", text: "Choose plain text, document, blog, or table-friendly cleanup." },
      { title: "Adjust cleanup", text: "Remove bold marks, heading markers, code blocks, links, and extra blank lines as needed." },
      { title: "Use the result", text: "Copy the cleaned text into your document, email, or editor." },
    ],
  },
  "ai-table-converter": {
    title: "AI Table Converter",
    summary: "Convert Markdown, pipe, TSV, or CSV tables from AI answers into document tables, spreadsheet TSV, and CSV.",
    seoTitle: "AI Table Converter | Copy ChatGPT Tables to Excel or Word",
    seoDescription: "Turn AI-generated Markdown tables into document-copy HTML, spreadsheet TSV, and CSV directly in the browser.",
    keywords: ["ChatGPT table", "Markdown table", "Excel paste", "Word table"],
    guide: [
      { title: "Paste the answer", text: "Paste the full AI answer, including text before or after the table." },
      { title: "Detect table", text: "Find Markdown, pipe, TSV, or CSV tables inside the answer." },
      { title: "Clean cell marks", text: "Choose whether to remove Markdown marks, links, code, or HTML from cells." },
      { title: "Copy or save", text: "Copy as a document table, TSV for spreadsheets, CSV text, or download CSV." },
    ],
  },
  "csv-excel-converter": {
    title: "CSV Excel Converter",
    summary: "Convert CSV and TSV files to XLSX, or export XLSX sheets to CSV, with browser-side batch processing.",
    seoTitle: "CSV Excel Converter | CSV to XLSX and XLSX to CSV",
    seoDescription: "Convert CSV, TSV, and XLSX files in the browser with encoding options, delimiter detection, batch output, and ZIP download.",
    keywords: ["CSV to Excel", "CSV to XLSX", "XLSX to CSV", "batch converter"],
    guide: [
      { title: "Choose files", text: "Select one or more CSV, TSV, or XLSX files." },
      { title: "Pick direction", text: "CSV/TSV files become XLSX, while XLSX sheets can be exported as CSV." },
      { title: "Set options", text: "Adjust encoding, delimiter, empty rows, and text preservation for IDs or phone numbers." },
      { title: "Download", text: "Save each output file or download multiple results as a ZIP." },
    ],
  },
  "character-counter": {
    title: "Character Counter",
    summary: "Count characters with and without spaces, words, lines, paragraphs, bytes, and estimated reading time.",
    seoTitle: "Character Counter | Count Characters, Words, and Bytes",
    seoDescription: "Paste text to count characters, characters without spaces, words, lines, bytes, and estimated reading time.",
    keywords: ["character counter", "word count", "byte count", "text length"],
    guide: [
      { title: "Paste text", text: "Add an essay, assignment, blog draft, product copy, or message." },
      { title: "Check counts", text: "Review characters with spaces, without spaces, words, lines, bytes, and reading time." },
      { title: "Compare limits", text: "Use the numbers to match submission or platform limits." },
    ],
  },
  "line-break-cleaner": {
    title: "Line Break Cleaner",
    summary: "Clean awkward line breaks, trim extra spaces, and normalize paragraphs from copied text.",
    seoTitle: "Line Break Cleaner | Remove Unwanted Line Breaks",
    seoDescription: "Clean line breaks and spaces from copied text so it is easier to paste into documents, email, or posts.",
    keywords: ["line break cleaner", "remove line breaks", "paragraph cleanup", "text cleaner"],
    guide: [
      { title: "Paste text", text: "Paste text copied from PDFs, web pages, messengers, or email." },
      { title: "Choose cleanup", text: "Join wrapped lines, collapse blanks, trim spaces, or keep paragraph breaks." },
      { title: "Copy output", text: "Copy the cleaned paragraph text into your next document." },
    ],
  },
  "markdown-editor": {
    title: "Markdown Editor",
    summary: "Write Markdown with quick formatting controls, live preview, copy, and MD download.",
    seoTitle: "Markdown Editor | Online Markdown Writing Tool",
    seoDescription: "Write Markdown in your browser with preview, quick syntax buttons, copy, and MD file download.",
    keywords: ["Markdown editor", "online Markdown", "README editor", "MD writer"],
    guide: [
      { title: "Write or paste", text: "Start with plain text or a draft." },
      { title: "Format", text: "Use buttons for headings, bold, lists, quotes, code, links, and tables." },
      { title: "Preview and save", text: "Check the preview, copy the Markdown, or download an MD file." },
    ],
  },
  "markdown-viewer": {
    title: "MD File Viewer",
    summary: "Open MD, Markdown, and TXT files in the browser with a spacious document view, table of contents, and adjustable reading size.",
    seoTitle: "MD File Viewer | Read Markdown Files Online",
    seoDescription: "Open MD and Markdown files in your browser without uploading them to the application server, then adjust font size, line height, and theme.",
    keywords: ["MD viewer", "Markdown viewer", "read Markdown file", "README viewer"],
    guide: [
      { title: "Choose a file", text: "Select or drop an .md, .markdown, or .txt file." },
      { title: "Adjust document", text: "Set the font size, line height, and theme for the document." },
      { title: "Use the outline", text: "Jump through headings or switch between preview, split, and source views." },
      { title: "Copy text", text: "Copy the Markdown source or a plain-text version from the browser." },
    ],
  },
  "text-extractor": {
    title: "Email, URL & Phone Extractor",
    summary: "Extract emails, URLs, and phone numbers from unstructured text and copy each list separately.",
    seoTitle: "Email URL Phone Extractor | Text Data Cleanup",
    seoDescription: "Extract email addresses, links, and phone numbers from long text directly in your browser.",
    keywords: ["email extractor", "URL extractor", "phone extractor", "contact list"],
    guide: [
      { title: "Paste source text", text: "Add email bodies, notices, inquiry logs, or CRM notes." },
      { title: "Extract contacts", text: "The tool separates emails, URLs, and phone numbers." },
      { title: "Copy lists", text: "Copy only the list you need for follow-up work." },
    ],
  },
  "duplicate-line-remover": {
    title: "Duplicate Line Remover",
    summary: "Remove repeated lines from lists while optionally trimming spaces, ignoring case, and sorting results.",
    seoTitle: "Duplicate Line Remover | Clean Text Lists",
    seoDescription: "Remove duplicate lines from text lists in your browser with trim, case, empty line, and sort options.",
    keywords: ["duplicate remover", "remove duplicate lines", "list cleaner", "unique lines"],
    guide: [
      { title: "Paste list", text: "Add emails, URLs, keywords, IDs, or any line-based list." },
      { title: "Set matching", text: "Choose trimming, case sensitivity, empty line handling, and sorting." },
      { title: "Use unique list", text: "Copy or download the cleaned list." },
    ],
  },
  "find-replace": {
    title: "Find and Replace",
    summary: "Find text or patterns and replace them in one pass with optional case, whole-word, and regex settings.",
    seoTitle: "Find and Replace | Online Text Replacement Tool",
    seoDescription: "Replace repeated words, phrases, dates, or patterns in text directly in your browser.",
    keywords: ["find and replace", "text replacement", "regex replace", "bulk edit"],
    guide: [
      { title: "Paste text", text: "Add the document or note you want to edit." },
      { title: "Enter terms", text: "Set the text to find and the replacement text." },
      { title: "Apply options", text: "Use case sensitivity, whole-word matching, or regex when needed." },
      { title: "Copy result", text: "Review replacement count and copy the edited text." },
    ],
  },
  "case-converter": {
    title: "Case Converter",
    summary: "Convert text between uppercase, lowercase, title case, sentence case, camelCase, snake_case, and kebab-case.",
    seoTitle: "Case Converter | Uppercase, Lowercase, camelCase, snake_case",
    seoDescription: "Convert words, titles, filenames, or variable names between common case formats in your browser.",
    keywords: ["case converter", "camelCase", "snake_case", "kebab-case"],
    guide: [
      { title: "Enter text", text: "Paste words, titles, filenames, tags, or identifiers." },
      { title: "Choose format", text: "Pick uppercase, lowercase, title case, camelCase, snake_case, kebab-case, and more." },
      { title: "Copy output", text: "Use the converted text in code, files, or documents." },
    ],
  },
  "text-diff": {
    title: "Text Diff Checker",
    summary: "Compare two text blocks line by line and highlight added, removed, and unchanged lines.",
    seoTitle: "Text Diff Checker | Compare Two Text Blocks",
    seoDescription: "Compare two versions of text in your browser and see line-level additions and removals.",
    keywords: ["text diff", "compare text", "line diff", "document comparison"],
    guide: [
      { title: "Paste original", text: "Add the earlier version on the left." },
      { title: "Paste changed text", text: "Add the newer version on the right." },
      { title: "Review differences", text: "Check added, removed, and unchanged lines." },
    ],
  },
  "qr-code-generator": {
    title: "QR Code Generator",
    summary: "Create QR codes for URLs, text, and Wi-Fi details with simple style controls and SVG, PNG, or JPG export.",
    seoTitle: "QR Code Generator | Create URL, Text, and Wi-Fi QR Codes",
    seoDescription: "Generate QR codes in your browser and download them as SVG, PNG, or JPG.",
    keywords: ["QR code generator", "URL QR", "Wi-Fi QR", "SVG QR"],
    guide: [
      { title: "Enter content", text: "Add a URL, text, or Wi-Fi connection details." },
      { title: "Adjust style", text: "Choose colors, module shape, size, and output format." },
      { title: "Check and save", text: "Preview the QR code and download SVG, PNG, or JPG." },
    ],
  },
  "qr-link-extractor": {
    title: "QR Link Extractor",
    summary: "Read a QR image or screenshot in your browser and show the extracted URL or original payload.",
    seoTitle: "QR Link Extractor | Read QR Codes from Images",
    seoDescription: "Upload or drop a QR code image to read its URL or text payload before opening it.",
    keywords: ["QR reader", "QR link extractor", "read QR image", "QR decoder"],
    guide: [
      { title: "Choose image", text: "Select a QR image or screenshot." },
      { title: "Decode", text: "The browser reads the QR code locally." },
      { title: "Review URL", text: "Check the extracted URL or text before opening anything." },
    ],
  },
  "screenshot-saver": {
    title: "Screenshot Saver",
    summary: "Paste a Win+Shift+S screenshot and immediately download it as an image file from the browser.",
    seoTitle: "Screenshot Saver | Paste and Download Screen Captures",
    seoDescription: "Paste Windows 11 screen captures from the clipboard and instantly save them as PNG, JPG, or WEBP images in your browser.",
    keywords: ["screenshot saver", "paste screenshot", "Win Shift S", "clipboard image"],
    guide: [
      { title: "Capture area", text: "Use Win+Shift+S and drag the screen area you want to save." },
      { title: "Paste", text: "Press Ctrl+V on this tool page to read the screenshot from the clipboard." },
      { title: "Save instantly", text: "By default, the pasted capture downloads as a PNG immediately." },
      { title: "Change format", text: "Switch to JPG or WEBP when you need a different output format." },
    ],
  },
  "image-resizer": {
    title: "Image Resizer",
    summary: "Resize images by width, height, or percentage while keeping the result in your browser.",
    seoTitle: "Image Resizer | Resize Photos Online",
    seoDescription: "Resize images in your browser by pixel size or percentage and download the result.",
    keywords: ["image resizer", "resize photo", "pixel size", "browser image tool"],
    guide: [
      { title: "Choose image", text: "Select a photo, screenshot, or upload image." },
      { title: "Set size", text: "Enter width, height, or percentage while preserving ratio if needed." },
      { title: "Download", text: "Preview and save the resized image." },
    ],
  },
  "image-converter": {
    title: "Image Converter",
    summary: "Convert images between JPG, PNG, and WEBP in your browser.",
    seoTitle: "Image Converter | JPG PNG WEBP Converter",
    seoDescription: "Convert supported images to JPG, PNG, or WEBP locally in your browser.",
    keywords: ["image converter", "JPG to PNG", "PNG to WEBP", "WEBP converter"],
    guide: [
      { title: "Choose image", text: "Select the image you want to convert." },
      { title: "Pick format", text: "Choose JPG, PNG, or WEBP output." },
      { title: "Save", text: "Preview the converted image and download it." },
    ],
  },
  "image-compressor": {
    title: "Image Compressor",
    summary: "Reduce image file size with quality and width controls before downloading the compressed result.",
    seoTitle: "Image Compressor | Compress JPG PNG WEBP",
    seoDescription: "Compress images in your browser with quality and size controls for upload, email, or web use.",
    keywords: ["image compressor", "compress JPG", "reduce image size", "WEBP compression"],
    guide: [
      { title: "Choose image", text: "Select a photo or upload image." },
      { title: "Set quality", text: "Adjust quality and optional maximum width." },
      { title: "Download", text: "Save the compressed image after checking the result size." },
    ],
  },
  "exif-metadata-remover": {
    title: "EXIF Metadata Remover",
    summary: "Remove EXIF, XMP, IPTC, comments, and text metadata from JPG, PNG, and WEBP images locally.",
    seoTitle: "EXIF Metadata Remover | Remove Photo Location Data",
    seoDescription: "Remove privacy-sensitive image metadata such as GPS, camera, XMP, and comments in your browser.",
    keywords: ["EXIF remover", "metadata remover", "remove GPS", "photo privacy"],
    guide: [
      { title: "Choose image", text: "Select a JPG, PNG, or WEBP image." },
      { title: "Remove metadata", text: "The browser strips supported metadata blocks locally." },
      { title: "Download clean file", text: "Save the cleaned image and verify it before sharing." },
    ],
  },
  "pdf-merge": {
    title: "Merge PDF",
    summary: "Combine multiple PDF files into one document in your browser.",
    seoTitle: "Merge PDF | Combine PDF Files Online",
    seoDescription: "Merge multiple PDF files into a single PDF directly in your browser.",
    keywords: ["merge PDF", "combine PDF", "PDF joiner", "browser PDF"],
    guide: [
      { title: "Choose PDFs", text: "Select two or more PDF files." },
      { title: "Set order", text: "Arrange files in the order you want." },
      { title: "Merge and save", text: "Create one PDF and download it locally." },
    ],
  },
  "pdf-split": {
    title: "Split PDF",
    summary: "Split a PDF into separate files by page or page range in your browser.",
    seoTitle: "Split PDF | Separate PDF Pages Online",
    seoDescription: "Split a PDF by page or page range without uploading it to the application server.",
    keywords: ["split PDF", "PDF separator", "extract PDF pages", "browser PDF"],
    guide: [
      { title: "Choose PDF", text: "Select the PDF you want to split." },
      { title: "Pick split mode", text: "Split by every page or by a page interval." },
      { title: "Download parts", text: "Save each PDF part locally." },
    ],
  },
  "pdf-extract-pages": {
    title: "Extract PDF Pages",
    summary: "Extract selected pages or ranges from a PDF and save them as a new PDF.",
    seoTitle: "Extract PDF Pages | Save Selected PDF Pages",
    seoDescription: "Choose page ranges from a PDF and create a new PDF in your browser.",
    keywords: ["extract PDF pages", "PDF page range", "save PDF pages", "PDF tool"],
    guide: [
      { title: "Choose PDF", text: "Select a PDF file." },
      { title: "Enter pages", text: "Type page numbers or ranges such as 1-3, 5, 8." },
      { title: "Save result", text: "Download a new PDF containing only the selected pages." },
    ],
  },
  "image-to-pdf": {
    title: "Images to PDF",
    summary: "Turn multiple images into a single PDF document in your browser.",
    seoTitle: "Images to PDF | Convert JPG PNG to PDF",
    seoDescription: "Combine JPG, PNG, and other supported images into a PDF locally in your browser.",
    keywords: ["image to PDF", "JPG to PDF", "PNG to PDF", "photo PDF"],
    guide: [
      { title: "Choose images", text: "Select one or more images." },
      { title: "Order pages", text: "Arrange image order for the PDF." },
      { title: "Download PDF", text: "Create and save the PDF document." },
    ],
  },
  "pdf-to-image": {
    title: "PDF to Image",
    summary: "Render PDF pages as PNG images and download selected pages or all pages.",
    seoTitle: "PDF to Image | Convert PDF Pages to PNG",
    seoDescription: "Convert PDF pages to PNG images in your browser and download individual pages or all pages.",
    keywords: ["PDF to image", "PDF to PNG", "PDF page image", "document preview"],
    guide: [
      { title: "Choose PDF", text: "Select the PDF you want to render." },
      { title: "Preview pages", text: "Render pages as images in the browser." },
      { title: "Download images", text: "Save selected pages or all pages as PNG files." },
    ],
  },
  "srt-cleaner": {
    title: "SRT Cleaner",
    summary: "Clean SRT subtitle numbering, timing blocks, spacing, and repeated formatting issues.",
    seoTitle: "SRT Cleaner | Fix Subtitle Formatting",
    seoDescription: "Clean and renumber SRT subtitle files in your browser before editing or uploading.",
    keywords: ["SRT cleaner", "subtitle cleanup", "renumber SRT", "subtitle formatting"],
    guide: [
      { title: "Paste or load SRT", text: "Add subtitle text or choose a subtitle file." },
      { title: "Clean format", text: "Renumber cues, trim spacing, and normalize structure." },
      { title: "Save subtitle", text: "Copy or download the cleaned SRT." },
    ],
  },
  "subtitle-converter": {
    title: "SRT VTT Converter",
    summary: "Convert subtitles between SRT and VTT formats in your browser.",
    seoTitle: "SRT to VTT Converter | Subtitle Format Converter",
    seoDescription: "Convert SRT subtitles to VTT or VTT subtitles to SRT without uploading them to the application server.",
    keywords: ["SRT to VTT", "VTT to SRT", "subtitle converter", "caption format"],
    guide: [
      { title: "Add subtitle", text: "Paste subtitle text or choose a file." },
      { title: "Pick format", text: "Choose SRT or VTT as the output format." },
      { title: "Download", text: "Copy or save the converted subtitle file." },
    ],
  },
  "subtitle-timing": {
    title: "Subtitle Timing Shifter",
    summary: "Move all SRT or VTT subtitle timings forward or backward by a chosen number of seconds.",
    seoTitle: "Subtitle Timing Shifter | Adjust SRT VTT Sync",
    seoDescription: "Shift SRT or VTT subtitle timings by seconds to fix subtitle sync in your browser.",
    keywords: ["subtitle timing", "SRT sync", "VTT sync", "caption offset"],
    guide: [
      { title: "Add subtitle", text: "Paste SRT or VTT text or load a subtitle file." },
      { title: "Set offset", text: "Enter a positive or negative second value." },
      { title: "Save adjusted file", text: "Check the shifted timings and download the subtitle." },
    ],
  },
};
const TOOL_DEFS_LOCALIZED_COPY = {
  ja: {
    "voice-to-text": {
      title: "音声入力テキスト化",
      summary: "ブラウザのマイクで日本語の音声を入力し、下書きや議事メモに整えます。",
      keywords: ["音声入力", "音声 テキスト化", "文字起こし", "議事メモ"],
    },
    "audio-file-transcription": {
      title: "録音ファイル文字起こし",
      summary: "短い録音ファイルをブラウザ内で読み込み、確認用の文字起こし下書きを作ります。",
      keywords: ["録音 文字起こし", "m4a 文字起こし", "音声ファイル", "ブラウザSTT"],
    },
    "audio-editor": {
      title: "録音ファイル簡易編集",
      summary: "スマートフォン録音の波形を見ながら切り取り、貼り付け、音量調整を行いWAVで保存します。",
      keywords: ["音声 カット", "録音 編集", "m4a カット", "波形編集"],
    },
    "webcam-recorder": {
      title: "Webカメラ録画",
      summary: "カメラとマイクをブラウザで録画し、ミラー、フィルター、背景効果を調整できます。",
      keywords: ["Webカメラ録画", "ブラウザ録画", "カメラ録画", "WebM"],
    },
    "ai-text-cleaner": {
      title: "AI文章貼り付け整形",
      summary: "AI回答に残るMarkdown記号、見出し記号、リンク、余分な改行を文書向けに整えます。",
      keywords: ["ChatGPT 整形", "Markdown削除", "AI文章", "貼り付け整形"],
    },
    "ai-table-converter": {
      title: "AI表変換ツール",
      summary: "AI回答内のMarkdown表、TSV、CSVを文書やスプレッドシートに貼り付けやすく変換します。",
      keywords: ["ChatGPT 表", "Markdown表", "Excel貼り付け", "表変換"],
    },
    "csv-excel-converter": {
      title: "CSV Excel変換",
      summary: "CSV、TSV、XLSXファイルをブラウザで相互変換し、複数結果をまとめて保存できます。",
      keywords: ["CSV Excel変換", "CSV XLSX", "XLSX CSV", "文字コード"],
    },
    "character-counter": {
      title: "文字数カウンター",
      summary: "文字数、空白なし文字数、単語数、行数、バイト数、読了時間をすばやく確認します。",
      keywords: ["文字数カウント", "文字数", "バイト数", "単語数"],
    },
    "line-break-cleaner": {
      title: "改行・空白整形",
      summary: "不自然な改行や連続スペースを整え、貼り付けたテキストを読みやすい段落にします。",
      keywords: ["改行削除", "空白整形", "テキスト整形", "段落整形"],
    },
    "markdown-editor": {
      title: "Markdownエディター",
      summary: "Markdown文書をブラウザで編集し、プレビューやコピー、保存に使えます。",
      keywords: ["Markdownエディター", "README編集", "Markdownプレビュー", "文書作成"],
    },
    "markdown-viewer": {
      title: "MDファイルビューア",
      summary: "MD、Markdown、TXTファイルをブラウザで開き、読みやすい表示やアウトラインで確認できます。",
      keywords: ["MDビューア", "Markdownビューア", "README表示", "Markdownファイル"],
    },
    "text-extractor": {
      title: "メール・URL・電話番号抽出",
      summary: "貼り付けた文章からメールアドレス、URL、電話番号だけを抽出してコピーできます。",
      keywords: ["メール抽出", "URL抽出", "電話番号抽出", "テキスト抽出"],
    },
    "duplicate-line-remover": {
      title: "重複行削除",
      summary: "リストやメモから重複した行を削除し、必要に応じて順序や空白を整理します。",
      keywords: ["重複行削除", "リスト整理", "重複テキスト", "行整理"],
    },
    "find-replace": {
      title: "検索と置換",
      summary: "テキスト内の単語や文字列を一括で検索し、まとめて置換できます。",
      keywords: ["検索置換", "文字列置換", "テキスト編集", "一括置換"],
    },
    "case-converter": {
      title: "大文字小文字変換",
      summary: "英字テキスト、ファイル名、ラベルを大文字、小文字、camelCase、snake_caseなどへ変換します。",
      keywords: ["大文字小文字変換", "camelCase", "snake_case", "kebab-case"],
    },
    "text-diff": {
      title: "テキスト差分チェック",
      summary: "2つのテキストを行単位で比較し、追加、削除、変更箇所を確認できます。",
      keywords: ["テキスト比較", "差分チェック", "文書比較", "行差分"],
    },
    "qr-code-generator": {
      title: "QRコード作成",
      summary: "URL、テキスト、Wi-Fi情報のQRコードを作り、SVG、PNG、JPGで保存できます。",
      keywords: ["QRコード作成", "URL QR", "Wi-Fi QR", "QR保存"],
    },
    "qr-link-extractor": {
      title: "QRリンク読み取り",
      summary: "QR画像やスクリーンショットをブラウザで読み取り、URLや元のテキストを確認できます。",
      keywords: ["QR読み取り", "QRデコード", "QRリンク", "画像QR"],
    },
    "screenshot-saver": {
      title: "スクリーンショット保存",
      summary: "Win+Shift+Sでキャプチャした画像を貼り付けると、ブラウザからすぐ画像ファイルとして保存します。",
      keywords: ["スクリーンショット保存", "貼り付け画像", "Win Shift S", "クリップボード画像"],
    },
    "image-resizer": {
      title: "画像サイズ変更",
      summary: "画像の幅、高さ、比率を指定してリサイズし、ブラウザ内で結果を保存します。",
      keywords: ["画像リサイズ", "写真サイズ変更", "画像サイズ", "ブラウザ画像"],
    },
    "image-converter": {
      title: "画像形式変換",
      summary: "JPG、PNG、WEBPなど対応形式の画像をブラウザ内で変換します。",
      keywords: ["画像変換", "JPG PNG", "WEBP変換", "画像形式"],
    },
    "image-compressor": {
      title: "画像圧縮",
      summary: "品質や幅を調整して画像容量を小さくし、アップロードやメール向けに保存します。",
      keywords: ["画像圧縮", "写真容量削減", "JPG圧縮", "WEBP圧縮"],
    },
    "exif-metadata-remover": {
      title: "EXIFメタデータ削除",
      summary: "JPG、PNG、WEBP画像からEXIF、GPS、XMP、コメントなどのメタデータを削除します。",
      keywords: ["EXIF削除", "メタデータ削除", "GPS削除", "写真プライバシー"],
    },
    "pdf-merge": {
      title: "PDF結合",
      summary: "複数のPDFファイルをブラウザ内で1つのPDF文書にまとめます。",
      keywords: ["PDF結合", "PDFマージ", "PDFまとめる", "無料PDF"],
    },
    "pdf-split": {
      title: "PDF分割",
      summary: "PDFをページ単位や範囲ごとに分割し、必要なファイルとして保存します。",
      keywords: ["PDF分割", "PDFページ分割", "PDF切り分け", "PDF保存"],
    },
    "pdf-extract-pages": {
      title: "PDFページ抽出",
      summary: "PDFから必要なページ範囲だけを抽出して、新しいPDFとして保存します。",
      keywords: ["PDFページ抽出", "PDF一部保存", "PDFページ", "PDF編集"],
    },
    "image-to-pdf": {
      title: "画像をPDFに変換",
      summary: "JPGやPNGなどの画像を並べて、ブラウザ内でPDF文書に変換します。",
      keywords: ["画像 PDF変換", "JPG PDF", "写真PDF", "画像からPDF"],
    },
    "pdf-to-image": {
      title: "PDFを画像に変換",
      summary: "PDFページをJPGやPNG画像としてレンダリングし、まとめて保存できます。",
      keywords: ["PDF 画像変換", "PDF JPG", "PDF PNG", "PDFページ画像"],
    },
    "srt-cleaner": {
      title: "SRT字幕整形",
      summary: "SRT字幕の番号、空行、余分な改行を整え、安定した形式にします。",
      keywords: ["SRT整形", "字幕整形", "SRT修正", "字幕番号"],
    },
    "subtitle-converter": {
      title: "SRT VTT変換",
      summary: "SRT字幕とVTT字幕をブラウザ内で相互変換し、動画編集や配信に使いやすくします。",
      keywords: ["SRT VTT変換", "字幕変換", "VTT SRT", "字幕フォーマット"],
    },
    "subtitle-timing": {
      title: "字幕タイミング補正",
      summary: "SRTやVTT字幕の時間を秒単位で前後にずらし、同期のズレをまとめて補正します。",
      keywords: ["字幕タイミング", "SRT同期", "字幕時間補正", "字幕ずらし"],
    },
  },
  zh: {
    "voice-to-text": {
      title: "语音转文字",
      summary: "使用浏览器麦克风输入中文语音，并整理成草稿、会议记录或演讲文本。",
      keywords: ["语音转文字", "语音输入", "听写", "会议记录"],
    },
    "audio-file-transcription": {
      title: "录音文件转文字",
      summary: "在浏览器中处理短录音文件，生成便于人工校对的文字草稿。",
      keywords: ["录音转文字", "音频转文字", "m4a转文字", "浏览器STT"],
    },
    "audio-editor": {
      title: "录音文件简易编辑器",
      summary: "查看手机录音波形，剪切、粘贴、调节音量，并导出为WAV文件。",
      keywords: ["音频剪切", "录音编辑", "m4a剪切", "波形编辑"],
    },
    "webcam-recorder": {
      title: "网页摄像头录制器",
      summary: "在浏览器中录制摄像头和麦克风，支持镜像、滤镜和背景效果。",
      keywords: ["摄像头录制", "浏览器录屏", "相机录制", "WebM"],
    },
    "ai-text-cleaner": {
      title: "AI文本粘贴清理",
      summary: "清理AI回答中的Markdown符号、标题标记、链接和多余换行，便于粘贴到文档。",
      keywords: ["ChatGPT清理", "Markdown清理", "AI文本", "粘贴整理"],
    },
    "ai-table-converter": {
      title: "AI表格转换器",
      summary: "将AI回答中的Markdown表格、TSV或CSV转换为适合文档和电子表格粘贴的格式。",
      keywords: ["ChatGPT表格", "Markdown表格", "Excel粘贴", "表格转换"],
    },
    "csv-excel-converter": {
      title: "CSV Excel转换器",
      summary: "在浏览器中转换CSV、TSV和XLSX文件，并可将多个结果打包下载。",
      keywords: ["CSV转Excel", "CSV XLSX", "XLSX CSV", "批量转换"],
    },
    "character-counter": {
      title: "字数统计",
      summary: "统计字符数、去空格字符数、词数、行数、字节数和预计阅读时间。",
      keywords: ["字数统计", "字符计数", "字节数", "词数"],
    },
    "line-break-cleaner": {
      title: "换行和空格清理",
      summary: "整理异常换行、连续空格和段落，让粘贴文本更易读。",
      keywords: ["删除换行", "空格清理", "文本整理", "段落整理"],
    },
    "markdown-editor": {
      title: "Markdown编辑器",
      summary: "在浏览器中编写、预览、复制和保存Markdown文档。",
      keywords: ["Markdown编辑器", "README编辑", "Markdown预览", "文档编写"],
    },
    "markdown-viewer": {
      title: "MD文件查看器",
      summary: "本地打开MD、Markdown和TXT文件，用舒适阅读视图和大纲检查内容。",
      keywords: ["MD查看器", "Markdown查看器", "README查看", "Markdown文件"],
    },
    "text-extractor": {
      title: "邮箱、URL和电话号码提取器",
      summary: "从粘贴文本中提取邮箱、URL和电话号码，并按类型复制。",
      keywords: ["邮箱提取", "URL提取", "电话号码提取", "文本提取"],
    },
    "duplicate-line-remover": {
      title: "重复行删除",
      summary: "从列表或笔记中删除重复行，并可整理空行和顺序。",
      keywords: ["删除重复行", "列表整理", "重复文本", "行处理"],
    },
    "find-replace": {
      title: "查找和替换",
      summary: "批量查找并替换文本中的单词或字符串。",
      keywords: ["查找替换", "字符串替换", "文本编辑", "批量替换"],
    },
    "case-converter": {
      title: "大小写转换",
      summary: "将英文文本、文件名或标签转换为大写、小写、camelCase、snake_case等格式。",
      keywords: ["大小写转换", "camelCase", "snake_case", "kebab-case"],
    },
    "text-diff": {
      title: "文本差异比较",
      summary: "逐行比较两段文本，突出新增、删除和未变化的行。",
      keywords: ["文本比较", "差异比较", "文档比较", "行差异"],
    },
    "qr-code-generator": {
      title: "二维码生成器",
      summary: "为URL、文本或Wi-Fi信息生成二维码，并导出为SVG、PNG或JPG。",
      keywords: ["二维码生成", "URL二维码", "Wi-Fi二维码", "二维码下载"],
    },
    "qr-link-extractor": {
      title: "二维码链接提取器",
      summary: "在浏览器中读取二维码图片或截图，查看提取出的URL或原始内容。",
      keywords: ["二维码读取", "二维码解码", "二维码链接", "图片二维码"],
    },
    "screenshot-saver": {
      title: "截图保存器",
      summary: "粘贴 Win+Shift+S 截图后，直接在浏览器中下载为图片文件。",
      keywords: ["截图保存", "粘贴截图", "Win Shift S", "剪贴板图片"],
    },
    "image-resizer": {
      title: "图片尺寸调整",
      summary: "按宽度、高度或比例调整图片尺寸，并在浏览器中保存结果。",
      keywords: ["图片尺寸调整", "图片缩放", "照片尺寸", "浏览器图片工具"],
    },
    "image-converter": {
      title: "图片格式转换",
      summary: "在浏览器中将支持的图片转换为JPG、PNG或WEBP。",
      keywords: ["图片转换", "JPG PNG", "WEBP转换", "图片格式"],
    },
    "image-compressor": {
      title: "图片压缩",
      summary: "通过质量和宽度控制减小图片体积，适合上传、邮件和网页使用。",
      keywords: ["图片压缩", "照片压缩", "JPG压缩", "WEBP压缩"],
    },
    "exif-metadata-remover": {
      title: "EXIF元数据删除",
      summary: "从JPG、PNG和WEBP图片中删除EXIF、GPS、XMP、注释等元数据。",
      keywords: ["EXIF删除", "元数据删除", "GPS删除", "照片隐私"],
    },
    "pdf-merge": {
      title: "PDF合并",
      summary: "在浏览器中将多个PDF文件合并为一个文档。",
      keywords: ["PDF合并", "合并PDF", "PDF拼接", "免费PDF"],
    },
    "pdf-split": {
      title: "PDF拆分",
      summary: "按页数或范围拆分PDF，并保存为需要的文件。",
      keywords: ["PDF拆分", "PDF分页", "PDF切分", "PDF保存"],
    },
    "pdf-extract-pages": {
      title: "PDF页面提取",
      summary: "从PDF中提取指定页面范围，并保存为新的PDF文件。",
      keywords: ["PDF页面提取", "PDF部分保存", "PDF页面", "PDF编辑"],
    },
    "image-to-pdf": {
      title: "图片转PDF",
      summary: "将JPG、PNG等图片按顺序合成为PDF文档。",
      keywords: ["图片转PDF", "JPG转PDF", "照片PDF", "图片合成PDF"],
    },
    "pdf-to-image": {
      title: "PDF转图片",
      summary: "将PDF页面渲染为JPG或PNG图片，并可批量保存。",
      keywords: ["PDF转图片", "PDF转JPG", "PDF转PNG", "PDF页面图片"],
    },
    "srt-cleaner": {
      title: "SRT字幕清理",
      summary: "整理SRT字幕编号、空行和多余换行，使格式更稳定。",
      keywords: ["SRT清理", "字幕整理", "SRT修复", "字幕编号"],
    },
    "subtitle-converter": {
      title: "SRT VTT转换",
      summary: "在浏览器中互相转换SRT和VTT字幕格式，便于视频编辑和网页播放。",
      keywords: ["SRT VTT转换", "字幕转换", "VTT SRT", "字幕格式"],
    },
    "subtitle-timing": {
      title: "字幕时间校正",
      summary: "按秒整体前移或后移SRT、VTT字幕时间，修正同步偏差。",
      keywords: ["字幕时间", "SRT同步", "字幕校正", "字幕偏移"],
    },
  },
};
const LOCALIZED_TOOL_SEO_SUFFIX = {
  ja: "ブラウザで使える無料ツール",
  zh: "免费浏览器工具",
};
const LOCALIZED_TOOL_DESCRIPTION_SUFFIX = {
  ja: "登録なしで使え、作業データは可能な限りブラウザ内で処理します。",
  zh: "无需注册即可使用，工作数据会尽可能在浏览器中处理。",
};
const LOCALIZED_GUIDE_STEPS = {
  ja: [
    { title: "入力を追加", text: "テキストや対応ファイルをブラウザで開きます。" },
    { title: "オプションを選択", text: "必要な設定だけを選んで処理を実行します。" },
    { title: "結果を確認", text: "結果を確認してコピーまたはダウンロードします。" },
  ],
  zh: [
    { title: "添加输入", text: "在浏览器中粘贴文本或选择支持的文件。" },
    { title: "选择选项", text: "只设置当前任务需要的选项，然后运行处理。" },
    { title: "检查结果", text: "确认结果后复制或下载输出。" },
  ],
};
const LOCALIZED_TOOL_SCENARIO_LINES = {
  ja: {
    "voice-to-text": [
      "朝会や1on1で話した内容をその場で下書きにし、あとから議事メモとして整えます。",
      "大学のゼミ、勉強会、社内説明の要点を聞きながらメモ化し、共有前に人の目で確認します。",
      "ブログや動画台本のアイデアを声で出して、自然な文章に直すための素材にします。",
    ],
    "audio-file-transcription": [
      "スマートフォンで録った打ち合わせ音声を、議事録作成前の確認用テキストにします。",
      "取材メモや講義録音を一度文字に起こし、聞き直す箇所を見つけやすくします。",
      "家族やチーム内の音声メモを共有用に整える前のたたき台として使います。",
    ],
    "audio-editor": [
      "iPhoneのボイスメモやAndroid録音から、前後の無音や言い直し部分を切り取ります。",
      "研修音声やインタビュー録音の必要な部分だけを残し、確認しやすい長さに整えます。",
      "小さく録れた区間だけ音量を上げ、社内共有前の聞き取りやすさを調整します。",
    ],
    "webcam-recorder": [
      "社内研修の短い説明動画や操作案内を、ブラウザだけで録画して共有用に保存します。",
      "オンライン面談や自己紹介動画の練習を録り、表情や声の聞こえ方を確認します。",
      "背景ぼかしや明るさを整えて、急ぎの提出動画を落ち着いた見た目にします。",
    ],
    "ai-text-cleaner": [
      "AIの回答を稟議書、メール、社内Wikiに貼る前に、余分な記号や見出しを整えます。",
      "ChatGPTの箇条書きをそのまま送らず、SlackやTeamsで読みやすい文章に直します。",
      "ブログ下書きや提案文のMarkdown記号を外し、日本語文書として自然に読める形にします。",
    ],
    "ai-table-converter": [
      "AIが作った比較表を、ExcelやGoogleスプレッドシートに崩れにくい形で貼り付けます。",
      "見積り比較、採用候補リスト、調査表などを文書用の表として整えます。",
      "説明文ごと貼り付けたAI回答から表だけを取り出し、会議資料に転記します。",
    ],
    "csv-excel-converter": [
      "社内システムから出したCSVを、文字化けを確認しながらXLSXに変換します。",
      "勤怠、売上、アンケートの複数CSVをまとめて処理し、Excelで確認しやすくします。",
      "取引先指定のCSV形式に合わせて、XLSXのシートをCSVとして書き出します。",
    ],
    "character-counter": [
      "エントリーシート、志望動機、レポートの文字数を提出前に確認します。",
      "Xや広告文、商品説明など、短い文章の長さをすばやく調整します。",
      "日本語と英数字が混ざる原稿で、文字数、行数、バイト数をまとめて確認します。",
    ],
    "line-break-cleaner": [
      "PDF資料からコピーした文章の不自然な改行を、メールに貼りやすい段落へ直します。",
      "Webページやチャットから拾ったメモの余分な空白を削り、読みやすくします。",
      "社内通知や案内文を共有前に整え、改行のばらつきを減らします。",
    ],
    "markdown-editor": [
      "README、社内手順書、勉強会メモをMarkdownで書きながら表示を確認します。",
      "Qiitaや社内Wikiに載せる下書きを、見出し、リスト、表つきで整理します。",
      "会議メモをその場でMarkdown化し、あとからコピーしてナレッジに残します。",
    ],
    "markdown-viewer": [
      "受け取ったREADMEやリリースノートを、エディターを開かずに読みやすい表示で確認します。",
      "長い社内ドキュメントを目次で移動しながら、必要な箇所だけ拾い読みします。",
      "プレビューと原文を並べて、Markdownの崩れや表の見え方を確認します。",
    ],
    "text-extractor": [
      "問い合わせメールやイベント申込リストから、メールアドレスと電話番号だけを抜き出します。",
      "長い案内文に散らばったURLを一覧化し、共有前にリンク先を確認します。",
      "営業メモや顧客対応ログから、次に連絡すべき情報だけを整理します。",
    ],
    "duplicate-line-remover": [
      "メール配信リスト、URL一覧、キーワード候補から重複行を取り除きます。",
      "スプレッドシートに貼る前に、行ごとの名簿やタグをすっきり整えます。",
      "大文字小文字や前後スペースの違いを見ながら、同じ内容の混在を減らします。",
    ],
    "find-replace": [
      "資料内のサービス名、部署名、日付表記をまとめて差し替えます。",
      "字幕や議事メモに残った同じ誤字を、公開前に一括で修正します。",
      "テンプレート文面の担当者名や連絡先を、送付先に合わせて置き換えます。",
    ],
    "case-converter": [
      "英語のファイル名やタグを、snake_caseやkebab-caseへそろえます。",
      "資料タイトルや見出しの英字表記を、大文字小文字のルールに合わせます。",
      "開発メモの変数名候補をcamelCaseやPascalCaseに変換します。",
    ],
    "text-diff": [
      "規約文、見積書の文面、社内通知の修正前後を行単位で確認します。",
      "レビュー後にどこが変わったかを、送信前にざっと把握します。",
      "字幕やプロンプトの微修正を比較し、意図しない削除がないか見ます。",
    ],
    "qr-code-generator": [
      "セミナー案内、アンケート、地図リンクをQRコードにしてチラシや掲示物に載せます。",
      "店舗や会議室のWi-Fi情報をQR化し、来客が入力しやすい形にします。",
      "名刺や配布資料に合わせて、PNGやSVGでQRを保存します。",
    ],
    "qr-link-extractor": [
      "ポスターや名刺のQRを開く前に、実際のURLをブラウザ内で確認します。",
      "スクリーンショット内のQRを読み取り、共有してよいリンクかを先に見ます。",
      "Wi-FiやテキストQRの中身を、自動で開かずに原文として確認します。",
    ],
    "screenshot-saver": [
      "Win+Shift+Sで選択した画面範囲を貼り付け、ペイントを開かずにPNGとして保存します。",
      "チャット、メール、問い合わせ、手順書に添付するスクリーンショットをすぐファイル化します。",
      "自動ダウンロードが制限された場合も、プレビュー後に手動で保存できます。",
    ],
    "image-resizer": [
      "応募フォーム、学校提出、社内システムの画像サイズ制限に合わせてリサイズします。",
      "ブログやECの商品画像を、縦横比を保ったまま見やすい大きさに整えます。",
      "チャット添付前にスクリーンショットを軽くし、相手が開きやすいサイズにします。",
    ],
    "image-converter": [
      "PNGのスクリーンショットをJPGに変えて、メールやフォームへ添付しやすくします。",
      "Web掲載用にWEBPへ変換し、ページの重さを抑えます。",
      "受け取った画像形式を、提出先が受け付ける形式へそろえます。",
    ],
    "image-compressor": [
      "自治体、学校、採用フォームの容量制限に合わせて写真を圧縮します。",
      "ECの商品写真やブログ画像を、画質を見ながら軽くします。",
      "メール添付前に画像サイズを下げ、送信エラーや読み込み待ちを減らします。",
    ],
    "exif-metadata-remover": [
      "SNSやブログに写真を載せる前に、位置情報や撮影機種の情報を削除します。",
      "取引先へ送る画像から、編集ソフト名や内部コメントなど余計な情報を外します。",
      "自宅や学校で撮った写真を共有する前に、公開してよい状態か確認します。",
    ],
    "pdf-merge": [
      "請求書、見積書、添付資料を提出順に並べ、1つのPDFにまとめます。",
      "申請書類やスキャン資料をひとまとめにし、メール添付しやすくします。",
      "会議資料の本編と別紙を結合し、参加者が開くファイル数を減らします。",
    ],
    "pdf-split": [
      "長い資料集から章ごとにPDFを分け、必要な相手だけに共有します。",
      "スキャンした複数書類をページ単位で切り分け、案件ごとのファイルにします。",
      "提出前に不要ページを分離し、確認しやすいPDFにします。",
    ],
    "pdf-extract-pages": [
      "契約書や報告書から、確認が必要なページだけを抜き出して共有します。",
      "資料集の一部だけを会議前に渡し、相手が見る範囲を絞ります。",
      "スキャンPDFから必要ページを選び、新しい提出用ファイルにします。",
    ],
    "image-to-pdf": [
      "領収書、ホワイトボード写真、スマホで撮った資料を1つのPDFにまとめます。",
      "学校や会社へ提出する画像資料を、ページ順のあるPDFとして整えます。",
      "複数のスクリーンショットをPDF化し、確認依頼しやすい形にします。",
    ],
    "pdf-to-image": [
      "PDFの一部ページを画像にして、チャットやスライドへ貼り付けます。",
      "資料の表紙や図をPNG化し、サムネイルやプレビューに使います。",
      "印刷前にページの見え方を画像として確認します。",
    ],
    "srt-cleaner": [
      "番号がずれたSRT字幕を整え、動画編集ソフトに読み込みやすくします。",
      "自動字幕の余分な空行や崩れた改行を、公開前に直します。",
      "翻訳字幕を受け取ったあと、基本構造だけ先に安定させます。",
    ],
    "subtitle-converter": [
      "YouTube用のSRTを、Web掲載向けのVTTへ変換します。",
      "編集ソフトやプレイヤーの指定形式に合わせて、字幕ファイルを作り直します。",
      "字幕本文を貼り付けて、必要な形式で保存し直します。",
    ],
    "subtitle-timing": [
      "動画を書き出したあとに字幕が少し早い、遅いと感じたとき全体を補正します。",
      "SRTやVTTの時間を秒単位でずらし、ナレーションとの同期を合わせます。",
      "冒頭に追加した映像分だけ、字幕全体をまとめて後ろへ送ります。",
    ],
  },
  zh: {
    "voice-to-text": [
      "把晨会、复盘会或一对一沟通中的口头内容先记成草稿，再整理成会议纪要。",
      "听讲座、线上课程或产品说明时，边听边生成要点，方便之后人工校对。",
      "用说话的方式先记录公众号文章、短视频脚本或工作汇报的想法。",
    ],
    "audio-file-transcription": [
      "把手机录下的会议、访谈或培训音频转成可校对的文字草稿。",
      "整理课堂录音、客户沟通录音或调研素材时，先通过文字快速定位重点。",
      "把短录音转成文本后，再人工修改成纪要、问答稿或内容提纲。",
    ],
    "audio-editor": [
      "剪掉手机录音开头和结尾的空白、杂音或试麦片段。",
      "保留访谈、培训或会议录音中的关键段落，方便发给同事确认。",
      "把声音偏小的部分单独调高，再导出为更容易播放的WAV文件。",
    ],
    "webcam-recorder": [
      "录制内部培训、产品演示或操作说明的小视频，不必先安装剪辑软件。",
      "面试、自我介绍或线上汇报前，先录一版检查画面和声音。",
      "用镜像、亮度和背景效果把临时录制的视频调整得更清爽。",
    ],
    "ai-text-cleaner": [
      "把AI回答粘到飞书、企业微信、WPS或邮件前，先去掉多余Markdown符号。",
      "将AI生成的提纲整理成适合发给同事阅读的自然中文段落。",
      "把公众号草稿、报告摘要或客服话术中的星号、标题标记和链接格式清理干净。",
    ],
    "ai-table-converter": [
      "把AI生成的竞品对比表、报价表或调研表整理成可粘贴到Excel的格式。",
      "从一整段AI回答里识别表格，再复制到WPS、飞书多维表格或文档中。",
      "把Markdown表格转成CSV或TSV，方便交给后续系统或同事继续处理。",
    ],
    "csv-excel-converter": [
      "把后台导出的CSV转换成XLSX，先确认中文不乱码再发给同事。",
      "批量处理订单、报名表、问卷结果等CSV文件，并打包下载结果。",
      "将Excel工作表另存为CSV，适配财务、运营或内部系统导入要求。",
    ],
    "character-counter": [
      "检查简历自我评价、申请材料、报告摘要是否符合字数限制。",
      "调整小红书笔记、公众号标题、广告文案或短信内容的长度。",
      "在中英文混排文本中同时查看字符数、字节数和预计阅读时间。",
    ],
    "line-break-cleaner": [
      "把PDF、网页或聊天记录中复制出的断行文字整理成自然段落。",
      "发送邮件、飞书消息或企业微信通知前，减少多余空行和空格。",
      "把公告、客服回复或资料摘录整理成更适合阅读和转发的格式。",
    ],
    "markdown-editor": [
      "编写README、接口说明、学习笔记或团队知识库内容时同步预览效果。",
      "把会议记录整理成带标题、列表和表格的Markdown文档。",
      "在发布到技术社区或内部文档前，检查排版是否清楚。",
    ],
    "markdown-viewer": [
      "打开同事发来的README、更新日志或技术说明，不必启动完整编辑器。",
      "阅读较长的Markdown文档时，通过目录快速跳到需要的章节。",
      "并排查看原文和预览，确认表格、标题和列表没有错位。",
    ],
    "text-extractor": [
      "从客户邮件、报名名单或客服记录中提取邮箱、链接和电话号码。",
      "把公告或聊天记录里散落的URL整理成列表，方便逐个检查。",
      "从销售线索或活动反馈文本中提取下一步跟进所需的联系方式。",
    ],
    "duplicate-line-remover": [
      "清理手机号、邮箱、关键词或链接列表中的重复项。",
      "把要导入表格或CRM的名单先去重，减少后续人工检查。",
      "在合并多份名单后，按行整理空白和大小写差异。",
    ],
    "find-replace": [
      "批量替换文档中的产品名、活动名、负责人或日期格式。",
      "修改字幕、客服话术或公告中的重复错别字。",
      "根据不同客户或渠道，把模板里的称呼和联系方式一次性换好。",
    ],
    "case-converter": [
      "把英文文件名、接口字段或标签统一成snake_case、camelCase或kebab-case。",
      "调整英文标题、SKU、变量名的大小写规则，减少手动改错。",
      "为开发文档或数据字段快速生成统一命名。",
    ],
    "text-diff": [
      "比较合同条款、公告文案或需求说明的修改前后差异。",
      "在提交前确认同事改了哪些行，避免漏看删除内容。",
      "对比字幕、提示词或客服话术的两个版本，快速定位变化。",
    ],
    "qr-code-generator": [
      "把活动报名、问卷、地图或资料链接生成二维码，放到海报和群公告里。",
      "为办公室、门店或会议室Wi-Fi生成二维码，减少手动输入。",
      "按物料需要导出PNG、JPG或SVG，用在名片、展架或说明页中。",
    ],
    "qr-link-extractor": [
      "打开二维码前先看真实链接，判断是否适合转发或访问。",
      "从海报、截图或群图片里的二维码提取URL，避免手动识别。",
      "读取Wi-Fi、文本或联系方式二维码内容，但不自动跳转。",
    ],
    "screenshot-saver": [
      "用 Win+Shift+S 选取屏幕区域后直接粘贴，无需打开画图即可保存为 PNG。",
      "把复制的截图快速变成文件，方便发到聊天、邮件、工单或文档中。",
      "如果浏览器限制自动下载，也可以在预览后手动保存。",
    ],
    "image-resizer": [
      "按报名系统、政务表单、学校或公司系统的尺寸要求调整图片。",
      "处理电商商品图、公众号封面或头像时，保持比例并控制大小。",
      "发送聊天附件前，把截图压到更适合打开和预览的尺寸。",
    ],
    "image-converter": [
      "把PNG截图转成JPG，便于邮件、表单或后台上传。",
      "将图片转成WEBP，用于网页或内容平台以减小体积。",
      "把收到的图片转换成对方系统支持的格式。",
    ],
    "image-compressor": [
      "在上传证件照、商品图或申请材料前，把图片压到容量限制以内。",
      "给公众号、官网或电商页面准备图片时，在清晰度和体积之间找平衡。",
      "邮件发送多张图片前先压缩，减少发送失败和加载等待。",
    ],
    "exif-metadata-remover": [
      "把照片发到朋友圈、群聊或公众号前，先删除位置和设备信息。",
      "给客户或合作方发送图片时，去掉软件、作者或内部备注等隐藏信息。",
      "分享家庭、学校或门店照片前，确认不带不必要的隐私元数据。",
    ],
    "pdf-merge": [
      "把合同、报价单、营业执照或附件按顺序合成一个PDF。",
      "整理报销、投标、入职或学校申请材料时，减少对方打开的文件数量。",
      "把扫描件和补充说明合并后，再通过邮件或系统提交。",
    ],
    "pdf-split": [
      "把一份很长的资料按章节拆开，只发给相关负责人。",
      "将连续扫描的多份文件按页拆成不同PDF。",
      "提交前把不需要的页面分离出来，方便重新整理材料。",
    ],
    "pdf-extract-pages": [
      "从合同、报告或课件中只提取需要确认的几页给同事。",
      "把资料包中的关键页面单独保存，便于会前快速发送。",
      "从扫描PDF中选出指定页，生成新的提交文件。",
    ],
    "image-to-pdf": [
      "把发票、收据、截图或白板照片按顺序合成一份PDF。",
      "将多张申请材料图片整理成学校、公司或平台更容易接收的PDF。",
      "把手机拍下的纸质资料合成一个文件，方便归档和转发。",
    ],
    "pdf-to-image": [
      "把PDF中的某一页转成图片，放进PPT、聊天或公众号素材里。",
      "把封面、图表或流程页导出为PNG，用作预览图。",
      "在发送前以图片方式查看页面效果，确认内容没有错位。",
    ],
    "srt-cleaner": [
      "整理自动字幕导出的SRT编号、空行和断句问题。",
      "上传视频平台前，先把字幕格式修到更稳定的状态。",
      "收到翻译字幕后，先清理基本结构再继续校对。",
    ],
    "subtitle-converter": [
      "把剪辑软件导出的SRT转成网页播放器需要的VTT。",
      "根据视频平台、课程系统或播放器要求转换字幕格式。",
      "直接粘贴字幕文本，生成下一步需要的SRT或VTT文件。",
    ],
    "subtitle-timing": [
      "视频重新剪掉片头后，把整份字幕统一往前或往后移动。",
      "字幕比人声快或慢几秒时，整体调整同步时间。",
      "给课程、访谈或短视频校字幕时，快速修正全片偏移。",
    ],
  },
};

function buildLocalizedToolOverrides(locale) {
  const copySet = TOOL_DEFS_LOCALIZED_COPY[locale] || {};
  const seoSuffix = LOCALIZED_TOOL_SEO_SUFFIX[locale] || "";
  const descriptionSuffix = LOCALIZED_TOOL_DESCRIPTION_SUFFIX[locale] || "";
  return Object.fromEntries(
    Object.entries(copySet).map(([id, copy]) => [
      id,
      {
        ...copy,
        seoTitle: `${copy.title} | ${seoSuffix}`,
        seoDescription: `${copy.summary} ${descriptionSuffix}`.trim(),
        scenarioLines: LOCALIZED_TOOL_SCENARIO_LINES[locale]?.[id],
        guide: LOCALIZED_GUIDE_STEPS[locale],
      },
    ])
  );
}
const TOOL_DEFS_LOCALE_OVERRIDES = {
  en: TOOL_DEFS_EN_OVERRIDES,
  ja: buildLocalizedToolOverrides("ja"),
  zh: buildLocalizedToolOverrides("zh"),
};
const TOOL_VISUALS_EN = {
  "voice-to-text": { icon: "\uD83C\uDFA4", tone: "red", copy: "Dictate speech into text in your browser." },
  "audio-file-transcription": { icon: "\uD83C\uDF99\uFE0F", tone: "red", copy: "Create a review draft from a phone recording." },
  "audio-editor": { icon: "\u2702", tone: "cyan", copy: "Trim and join phone recordings with a waveform." },
  "webcam-recorder": { icon: "\uD83C\uDFA5", tone: "orange", copy: "Record camera and microphone locally." },
  "ai-text-cleaner": { icon: "\u2728", tone: "violet", copy: "Clean AI answer formatting for documents." },
  "ai-table-converter": { icon: "\u25A4", tone: "green", copy: "Convert AI tables for documents and spreadsheets." },
  "csv-excel-converter": { icon: "XL", tone: "emerald", copy: "Convert CSV, TSV, and XLSX files in the browser." },
  "markdown-viewer": { icon: "MD", tone: "blue", copy: "Read Markdown files with adjustable layout." },
  "screenshot-saver": { icon: "\u2399", tone: "teal", copy: "Paste a screen capture and save it instantly." },
};
const TOOL_SCENARIO_LINES_EN = {
  "voice-to-text": [
    "Turn a weekly standup or one-on-one conversation into a rough note while the discussion is still happening.",
    "Dictate a presentation script slide by slide, then rewrite the captured draft into a cleaner speaking script.",
    "Capture video ideas, tutorial intros, or quick status updates by speaking first instead of starting from a blank page.",
  ],
  "audio-file-transcription": [
    "Convert a short phone meeting recording into a text draft before writing minutes or action items.",
    "Search a lecture, interview, or training recording by text so you can jump back to the parts that need review.",
    "Create a first-pass transcript from a voice memo, then manually polish names, numbers, and sensitive details.",
  ],
  "audio-editor": [
    "Trim silence, test phrases, and room noise from the beginning or end of a phone voice memo.",
    "Keep only the useful section of an interview, training clip, or meeting recording before sharing it with a teammate.",
    "Raise the volume on a quiet selected range without making the entire recording louder.",
  ],
  "webcam-recorder": [
    "Record a short training update, product walkthrough, or operations notice directly from the browser.",
    "Practice an interview answer or self-introduction video and review your framing, pace, and audio before submitting.",
    "Apply mirror, brightness, and background effects when you need a cleaner quick recording without editing software.",
  ],
  "ai-text-cleaner": [
    "Remove Markdown marks, heading hashes, and extra separators from an AI answer before pasting it into email.",
    "Clean a report draft generated by ChatGPT so it reads like normal document text in Word or Google Docs.",
    "Compress overly spaced AI output into a message-friendly format for Slack, Teams, or a customer reply.",
  ],
  "ai-table-converter": [
    "Move an AI-generated comparison table into Excel or Google Sheets without rebuilding each row by hand.",
    "Extract the table from a full AI answer that also contains explanations, caveats, and summary text.",
    "Copy a document-ready table into Word, Google Docs, or a proposal when plain text pipes would break the layout.",
  ],
  "csv-excel-converter": [
    "Turn a downloaded CSV report into XLSX while preserving phone numbers, postal codes, and ID values as text.",
    "Batch-convert survey, order, or attendance exports and download the results as individual files or a ZIP.",
    "Export one sheet or every sheet in an XLSX file as CSV for a finance, operations, or admin upload workflow.",
  ],
  "character-counter": [
    "Check whether an application answer, profile bio, or assignment fits a strict character limit before submission.",
    "Tune ad copy, push notifications, product descriptions, or social captions to a shorter target length.",
    "Review characters, bytes, lines, words, and reading time for a summary that needs to stay concise.",
  ],
  "line-break-cleaner": [
    "Fix awkward line breaks after copying text from a PDF, research report, invoice, or web page.",
    "Reduce extra blank lines and spacing before sending copied text in email, chat, or a ticket reply.",
    "Rebuild announcement or instruction text into cleaner paragraphs before handing it to another team.",
  ],
  "markdown-editor": [
    "Draft a README, release note, checklist, or internal runbook with headings, lists, tables, and code blocks.",
    "Convert meeting notes into Markdown sections for a wiki, GitHub issue, or project handoff.",
    "Structure a blog post or technical note before moving it into a full publishing tool.",
  ],
  "markdown-viewer": [
    "Open README, changelog, documentation, or exported note files without uploading them to the application server.",
    "Use the spacious document view and outline to review long Markdown files before copying or sharing text.",
    "Switch to split view when you need to compare the rendered document with the original Markdown source.",
  ],
  "text-extractor": [
    "Pull email addresses and phone numbers out of customer notes, inquiry messages, or registration text.",
    "Collect every URL scattered through an announcement, chat export, or research note before checking links.",
    "Separate contact details from a sales or support log so the next follow-up list is easier to build.",
  ],
  "duplicate-line-remover": [
    "Deduplicate an email list before importing it into a mailing tool or spreadsheet.",
    "Merge keyword, tag, SKU, or URL lists from multiple sources while keeping only unique lines.",
    "Clean participant names or IDs after several teams send overlapping lists.",
  ],
  "find-replace": [
    "Replace a product name, department name, or campaign label throughout a long draft in one pass.",
    "Update dates, owners, or contact details in a reusable message template before sending it.",
    "Fix a repeated typo in subtitles, transcripts, notes, or support macros without editing every occurrence manually.",
  ],
  "case-converter": [
    "Convert titles or labels into snake_case, kebab-case, camelCase, or PascalCase for files and data fields.",
    "Normalize English headings, SKU labels, or tag names to a consistent capitalization style.",
    "Prepare variable-name candidates from plain words while writing documentation or implementation notes.",
  ],
  "text-diff": [
    "Compare contract clauses, policy text, or approval copy before and after a revision.",
    "Check what a teammate changed in an announcement, prompt, or report summary before you approve it.",
    "Review small edits in subtitles, scripts, or customer-response text so accidental deletions stand out.",
  ],
  "qr-code-generator": [
    "Create a QR code for an event form, survey, map, or landing page to place on printed material.",
    "Generate a guest Wi-Fi QR for an office, meeting room, classroom, or storefront.",
    "Export a QR as SVG, PNG, or JPG for a business card, poster, product label, or handout.",
  ],
  "qr-link-extractor": [
    "Read the real URL inside a QR image before opening or forwarding it.",
    "Extract a QR link from a screenshot, poster photo, or shared image without scanning it with another phone.",
    "Inspect Wi-Fi, email, contact, or plain-text QR contents as text instead of launching them automatically.",
  ],
  "screenshot-saver": [
    "Capture a selected Windows screen area with Win+Shift+S, paste it, and save the PNG without opening Paint or Photos.",
    "Turn a copied screen capture into a file before attaching it to email, chat, support tickets, or documentation.",
    "Keep screenshot saving local in the browser, with a preview and manual save fallback when automatic download is blocked.",
  ],
  "image-resizer": [
    "Resize a profile photo, application attachment, or scanned image to the exact pixel dimensions a form requires.",
    "Prepare product thumbnails or blog images at a consistent width while preserving aspect ratio.",
    "Shrink screenshots before sending them in chat so the important details remain readable.",
  ],
  "image-converter": [
    "Convert a PNG screenshot to JPG when a form, email, or admin page rejects the original format.",
    "Prepare WEBP images for web publishing when you want lighter page assets.",
    "Change received images into a format accepted by the next system without installing a desktop converter.",
  ],
  "image-compressor": [
    "Reduce a photo below a school, hiring, government, or support-form upload size limit.",
    "Compress product, blog, or documentation images while watching the quality tradeoff.",
    "Make several field photos easier to email or upload by lowering file size before sharing.",
  ],
  "exif-metadata-remover": [
    "Remove GPS, camera, and timestamp metadata before publishing a phone photo online.",
    "Strip editor names, comments, and hidden metadata from images before sending them to a client.",
    "Check family, school, office, or field photos for unnecessary private metadata before sharing.",
  ],
  "pdf-merge": [
    "Combine a quote, contract, certificate, and supporting attachments into one ordered PDF packet.",
    "Bundle reimbursement, onboarding, application, or school documents so the recipient opens one file.",
    "Merge meeting handouts and appendices before distributing the final pack to participants.",
  ],
  "pdf-split": [
    "Split a long handbook, proposal, or training deck into chapter-sized PDFs for different recipients.",
    "Separate a batch-scanned PDF into individual files for each receipt, form, or case.",
    "Break a large PDF into smaller upload chunks when a portal has file-size limits.",
  ],
  "pdf-extract-pages": [
    "Pull only the pages that need legal, finance, or manager review from a longer document.",
    "Create a short PDF with the cover, summary, conclusion, or selected charts from a report.",
    "Extract required pages from a scanned packet before submitting only the necessary evidence.",
  ],
  "image-to-pdf": [
    "Combine receipt photos, whiteboard shots, or document scans into a single PDF for submission.",
    "Turn multiple screenshots into an ordered PDF that is easier to review than separate image files.",
    "Prepare photo-based application materials as one document when a portal expects PDF uploads.",
  ],
  "pdf-to-image": [
    "Render a PDF cover or key page as an image for a thumbnail, chat preview, or slide.",
    "Share one important PDF page as PNG when the recipient does not need the full document.",
    "Turn charts, forms, or layout pages from a PDF into images for a presentation or content draft.",
  ],
  "srt-cleaner": [
    "Renumber and normalize an auto-generated SRT file before uploading it to a video platform.",
    "Stabilize subtitle spacing and cue structure after receiving a translated caption file.",
    "Clean SRT formatting before importing subtitles into an editor or review workflow.",
  ],
  "subtitle-converter": [
    "Convert SRT captions to VTT for an HTML5 player, course page, or web video embed.",
    "Turn VTT captions back into SRT for a video editor or platform that requires SRT.",
    "Paste subtitle text and download the format needed for the next publishing step.",
  ],
  "subtitle-timing": [
    "Shift all captions later after adding an intro, bumper, or title card to the video.",
    "Move subtitles forward or backward when the entire file is consistently early or late.",
    "Reuse captions after trimming the start of a lecture, interview, or short video by applying a single offset.",
  ],
};
function detectAppLocale() {
  const bodyLocale = document.body?.dataset?.locale || "";
  const documentLang = document.documentElement?.lang || "";
  const pathname = window.location?.pathname || "";
  if (SUPPORTED_LOCALES.includes(bodyLocale)) return bodyLocale;
  if (/^en\b/i.test(documentLang)) return "en";
  if (/^ja\b/i.test(documentLang)) return "ja";
  if (/^zh\b/i.test(documentLang)) return "zh";
  const localePrefix = pathname.match(/^\/(en|ja|zh)(?:\/|$)/);
  return localePrefix?.[1] || "ko";
}

function t(key, ...args) {
  const value = UI_TEXT[APP_LOCALE]?.[key] ?? UI_TEXT.ko[key] ?? "";
  return typeof value === "function" ? value(...args) : value;
}

function localizeToolDef(tool, override = {}, locale = APP_LOCALE) {
  const config = LOCALE_CONFIGS[locale] || LOCALE_CONFIGS.ko;
  return {
    ...tool,
    ...override,
    path: `${config.pathPrefix}${tool.path}`,
    category: CATEGORY_LABELS_BY_LOCALE[locale]?.[tool.category] || tool.category,
    guide: override.guide || tool.guide,
    keywords: override.keywords || tool.keywords,
  };
}

const TOOL_DEFS_ACTIVE = IS_KOREAN_LOCALE
  ? TOOL_DEFS
  : TOOL_DEFS.map((tool) => localizeToolDef(tool, TOOL_DEFS_LOCALE_OVERRIDES[APP_LOCALE]?.[tool.id], APP_LOCALE));
const TOOL_MAP = Object.fromEntries(TOOL_DEFS_ACTIVE.map((tool) => [tool.id, tool]));
const TOOL_VISUALS = {
  "voice-to-text": { icon: "\uD83C\uDFA4", tone: "red", copy: "\ub9d0\ud558\uba74 \ubc14\ub85c \ud14d\uc2a4\ud2b8\ub85c \ubc1b\uc544 \uc801\uc2b5\ub2c8\ub2e4." },
  "audio-file-transcription": { icon: "\uD83C\uDF99\uFE0F", tone: "red", copy: "\ud734\ub300\ud3f0 \ub179\uc74c \ud30c\uc77c\uc744 \ud14d\uc2a4\ud2b8 \ucd08\uc548\uc73c\ub85c \ubcc0\ud658\ud569\ub2c8\ub2e4." },
  "audio-editor": { icon: "\u2702", tone: "cyan", copy: "\ud734\ub300\ud3f0 \ub179\uc74c \ud30c\uc77c\uc744 \ud30c\ud615\uc744 \ubcf4\uba70 \uc790\ub974\uace0 \ubd99\uc785\ub2c8\ub2e4." },
  "webcam-recorder": { icon: "\uD83C\uDFA5", tone: "orange", copy: "\uc6f9\ucea0\uacfc \ub9c8\uc774\ud06c\ub97c \ud544\ud130\ub97c \uc801\uc6a9\ud574 \ub179\ud654\ud569\ub2c8\ub2e4." },
  "ai-text-cleaner": { icon: "\u2728", tone: "violet", copy: "AI \ub2f5\ubcc0\uc758 \ubcc4\ud45c\uc640 \ub9c8\ud06c\ub2e4\uc6b4\uc744 \uc815\ub9ac\ud569\ub2c8\ub2e4." },
  "ai-table-converter": { icon: "\u25A4", tone: "green", copy: "AI \ud45c\ub97c \ubb38\uc11c\uc640 \uc5d1\uc140\uc5d0 \ubd99\uc5ec\ub123\uae30 \uc88b\uac8c \ubcc0\ud658\ud569\ub2c8\ub2e4." },
  "csv-excel-converter": { icon: "XL", tone: "emerald", copy: "CSV, TSV, XLSX 파일을 서로 변환하고 여러 결과를 묶어 저장합니다." },
  "character-counter": { icon: "\uD83D\uDD22", tone: "blue", copy: "\uacf5\ubc31 \ud3ec\ud568\uacfc \uc81c\uc678 \uae00\uc790\uc218\ub97c \uacc4\uc0b0\ud569\ub2c8\ub2e4." },
  "line-break-cleaner": { icon: "\u21B5", tone: "cyan", copy: "\uc904\ubc14\uafc8\uacfc \uacf5\ubc31\uc744 \ubb38\ub2e8\uc73c\ub85c \uc815\ub9ac\ud569\ub2c8\ub2e4." },
  "markdown-editor": { icon: "MD", tone: "indigo", copy: "\uc77c\ubc18 \ud14d\uc2a4\ud2b8\ub97c \ub9c8\ud06c\ub2e4\uc6b4 \ubb38\uc11c\ub85c \ud3b8\uc9d1\ud569\ub2c8\ub2e4." },
  "markdown-viewer": { icon: "MD", tone: "blue", copy: "MD 파일을 넓고 읽기 좋은 화면으로 확인합니다." },
  "text-extractor": { icon: "@", tone: "green", copy: "\uc774\uba54\uc77c, URL, \uc804\ud654\ubc88\ud638\ub9cc \ube60\ub974\uac8c \ucd94\ucd9c\ud569\ub2c8\ub2e4." },
  "duplicate-line-remover": { icon: "\u29C9", tone: "slate", copy: "\ubaa9\ub85d\uc5d0\uc11c \uc911\ubcf5\ub41c \uc904\uc744 \uc81c\uac70\ud569\ub2c8\ub2e4." },
  "find-replace": { icon: "\uD83D\uDD0E", tone: "amber", copy: "\ubb38\uc11c \uc548\uc758 \ub2e8\uc5b4\ub97c \ud55c \ubc88\uc5d0 \ubc14\uafc9\ub2c8\ub2e4." },
  "case-converter": { icon: "Aa", tone: "indigo", copy: "\ub300\uc18c\ubb38\uc790\uc640 camelCase \ud615\uc2dd\uc744 \ubcc0\ud658\ud569\ub2c8\ub2e4." },
  "text-diff": { icon: "\u2260", tone: "purple", copy: "\ub450 \ud14d\uc2a4\ud2b8\uc758 \ubcc0\uacbd\uc810\uc744 \ube44\uad50\ud569\ub2c8\ub2e4." },
  "qr-code-generator": { icon: "\u25A6", tone: "emerald", copy: "URL, \ud14d\uc2a4\ud2b8, Wi-Fi QR\uc744 \ub9cc\ub4ed\ub2c8\ub2e4." },
  "qr-link-extractor": { icon: "\u25A3", tone: "teal", copy: "QR \uc774\ubbf8\uc9c0\uc5d0\uc11c \ub9c1\ud06c\uc640 \uc6d0\ubb38\uc744 \uc77d\uc2b5\ub2c8\ub2e4." },
  "screenshot-saver": { icon: "\u2399", tone: "teal", copy: "Win+Shift+S \ucea1\ucc98\ub97c \ubd99\uc5ec\ub123\uc73c\uba74 \uc989\uc2dc \uc800\uc7a5\ud569\ub2c8\ub2e4." },
  "image-resizer": { icon: "\u2194", tone: "orange", copy: "\uc0ac\uc9c4 \ud06c\uae30\ub97c \ud53d\uc140\uc774\ub098 \ube44\uc728\ub85c \uc870\uc808\ud569\ub2c8\ub2e4." },
  "image-converter": { icon: "\uD83D\uDDBC\uFE0F", tone: "pink", copy: "JPG, PNG, WEBP \ud615\uc2dd\uc744 \ubcc0\ud658\ud569\ub2c8\ub2e4." },
  "image-compressor": { icon: "\uD83D\uDDDC\uFE0F", tone: "yellow", copy: "\uc5c5\ub85c\ub4dc\uc6a9 \uc774\ubbf8\uc9c0 \uc6a9\ub7c9\uc744 \uc904\uc785\ub2c8\ub2e4." },
  "exif-metadata-remover": { icon: "EX", tone: "emerald", copy: "\uc0ac\uc9c4\uc758 EXIF, XMP, IPTC \uba54\ud0c0\ub370\uc774\ud130\ub97c \uc81c\uac70\ud569\ub2c8\ub2e4." },
  "pdf-merge": { icon: "\uD83D\uDCCE", tone: "red", copy: "\uc5ec\ub7ec PDF\ub97c \ud558\ub098\uc758 \ubb38\uc11c\ub85c \ud569\uce69\ub2c8\ub2e4." },
  "pdf-split": { icon: "\u2702", tone: "blue", copy: "PDF\ub97c \ud398\uc774\uc9c0 \ub2e8\uc704\ub85c \ub098\ub215\ub2c8\ub2e4." },
  "pdf-extract-pages": { icon: "\uD83D\uDCC4", tone: "teal", copy: "\ud544\uc694\ud55c PDF \ud398\uc774\uc9c0\ub9cc \ucd94\ucd9c\ud569\ub2c8\ub2e4." },
  "image-to-pdf": { icon: "\uD83E\uDDFE", tone: "orange", copy: "\uc774\ubbf8\uc9c0\ub97c PDF \ubb38\uc11c\ub85c \ubcc0\ud658\ud569\ub2c8\ub2e4." },
  "pdf-to-image": { icon: "\uD83C\uDFDE\uFE0F", tone: "green", copy: "PDF \ud398\uc774\uc9c0\ub97c \uc774\ubbf8\uc9c0\ub85c \uc800\uc7a5\ud569\ub2c8\ub2e4." },
  "srt-cleaner": { icon: "\uD83C\uDFAC", tone: "slate", copy: "SRT \uc790\ub9c9 \ubc88\ud638\uc640 \ud615\uc2dd\uc744 \uc815\ub9ac\ud569\ub2c8\ub2e4." },
  "subtitle-converter": { icon: "\uD83D\uDD01", tone: "violet", copy: "SRT\uc640 VTT \uc790\ub9c9 \ud3ec\ub9f7\uc744 \ubcc0\ud658\ud569\ub2c8\ub2e4." },
  "subtitle-timing": { icon: "\u23F1\uFE0F", tone: "cyan", copy: "\uc790\ub9c9 \uc2f1\ud06c\ub97c \uc55e\ub4a4\ub85c \uc77c\uad04 \ubcf4\uc815\ud569\ub2c8\ub2e4." },
};

const TOOL_SCENARIOS = {
  "voice-to-text": [
    {
      title: "회의 발언을 현장에서 받아 적을 때",
      body:
        "주간회의나 1:1 면담 중 마이크를 켜 두고 발언 흐름을 텍스트 초안으로 남깁니다. 끝난 뒤 자동 정리 결과를 보면서 결정 사항, 담당자, 날짜만 사람이 다시 확인하면 회의록 시작점이 빨라집니다.",
      check: "Chrome 또는 Edge의 마이크 권한을 먼저 허용하고, 고유명사와 숫자는 회의 직후 원문과 대조하세요.",
    },
    {
      title: "발표 대본을 말로 먼저 풀어낼 때",
      body:
        "슬라이드 순서대로 설명을 말하면서 자연스러운 구어체 대본을 만듭니다. 처음부터 문장으로 쓰기 막힐 때 말로 초안을 만들고, 복사한 뒤 문어체로 다듬는 흐름에 잘 맞습니다.",
      check: "대본용 결과는 말버릇과 반복 표현을 남길 수 있으니 최종 공유 전 문장 호흡을 정리하세요.",
    },
    {
      title: "영상 아이디어를 빠르게 메모할 때",
      body:
        "유튜브 쇼츠, 강의 도입부, 안내 멘트를 떠오르는 대로 말해 초안을 확보합니다. 키보드로 정리하기 전 아이디어를 놓치지 않는 용도라서, 짧게 여러 번 녹음하듯 사용하는 편이 효율적입니다.",
      check: "브라우저 음성 인식은 네트워크와 기기 상태에 영향을 받을 수 있어 중요한 문장은 다시 읽어 확인하세요.",
    },
  ],
  "audio-file-transcription": [
    {
      title: "휴대폰 회의 녹음을 회의록 초안으로 만들 때",
      body:
        "m4a나 mp3로 남은 짧은 회의 녹음을 브라우저에서 읽어 검토용 텍스트로 바꿉니다. 전체를 다시 듣기 전에 발언 주제와 논의 순서를 먼저 훑고, 필요한 구간만 원본 녹음으로 재확인할 수 있습니다.",
      check: "첫 사용 시 모델 파일을 내려받을 수 있고, 결과는 사람이 검수해야 하는 초안으로 다루세요.",
    },
    {
      title: "강의와 교육 녹음에서 핵심 구간을 찾을 때",
      body:
        "교육 담당자가 녹음 파일을 전부 재생하지 않고도 주요 용어, 과제 안내, 질의응답 위치를 텍스트로 탐색합니다. 긴 정리문을 만들기보다 검토할 지점을 찾는 색인처럼 쓰면 부담이 줄어듭니다.",
      check: "배경 소음, 여러 명의 겹친 발화, 먼 마이크 녹음은 정확도가 떨어질 수 있습니다.",
    },
    {
      title: "인터뷰 녹취를 문서화하기 전 밑그림이 필요할 때",
      body:
        "짧은 인터뷰나 상담 녹음에서 질문과 답변 흐름을 먼저 텍스트로 꺼냅니다. 그대로 제출하기보다 인용 가능한 문장, 확인이 필요한 표현, 개인정보 삭제 지점을 표시하는 준비 단계에 적합합니다.",
      check: "녹음 파일과 변환 결과는 코워크스페이스 자체 서버에 저장하지 않지만, 민감한 내용은 공유 전 반드시 익명화하세요.",
    },
  ],
  "audio-editor": [
    {
      title: "음성 메모의 앞뒤 공백을 잘라낼 때",
      body:
        "iPhone 음성 메모나 Android 녹음 파일에서 시작 전 대기음, 마이크 테스트, 끝부분 잡음을 파형을 보며 제거합니다. 필요한 구간만 남긴 뒤 WAV로 저장해 공유용 녹음을 더 짧고 또렷하게 만듭니다.",
      check: "브라우저가 읽을 수 있는 m4a, aac, mp3, wav를 우선 사용하고 원본은 따로 보관하세요.",
    },
    {
      title: "회의 녹음 중 핵심 발언만 따로 떼어낼 때",
      body:
        "긴 회의 녹음에서 결정 발언이나 안내 멘트만 선택해 복사하고 다른 위치에 붙입니다. 파형 확대와 가로 스크롤을 이용하면 긴 파일에서도 선택 시작점과 끝점을 더 정교하게 잡을 수 있습니다.",
      check: "선택 구간을 삭제하거나 붙이기 전 재생으로 위치를 확인하고, 실수하면 실행 취소를 사용하세요.",
    },
    {
      title: "작게 녹음된 구간만 볼륨을 올릴 때",
      body:
        "인터뷰 중 한 사람의 목소리가 작게 들어간 부분을 선택해 음량을 조절합니다. 전체 파일을 키우지 않고 필요한 구간만 손보면 배경 소음이 과하게 커지는 문제를 줄일 수 있습니다.",
      check: "음량을 크게 올리면 왜곡이 생길 수 있으므로 저장 전 해당 구간을 다시 들어보세요.",
    },
  ],
  "webcam-recorder": [
    {
      title: "사내 안내 영상을 급하게 녹화할 때",
      body:
        "설치형 녹화 프로그램 없이 브라우저에서 카메라와 마이크를 켜고 짧은 사용법 안내나 교육 공지를 녹화합니다. 밝기, 대비, 배경 흐림을 조절해 임시 녹화라도 화면 인상을 안정적으로 맞출 수 있습니다.",
      check: "녹화 전 저장 형식 지원 여부와 마이크 입력 레벨을 짧게 테스트하세요.",
    },
    {
      title: "면접과 자기소개 영상을 연습할 때",
      body:
        "자기소개나 발표 리허설을 여러 번 녹화해 표정, 시선, 말 속도를 확인합니다. 거울 모드와 필터를 켜고 끄며 실제 제출 화면에 가까운 조건을 만들어 볼 수 있습니다.",
      check: "브라우저 권한 차단 상태에서는 카메라가 열리지 않으니 주소창 권한 설정을 확인하세요.",
    },
    {
      title: "온라인 수업용 짧은 설명 클립을 만들 때",
      body:
        "강사가 과제 안내, 실습 절차, 보충 설명을 몇 분짜리 영상으로 기록합니다. 별도 편집 없이 결과 파일을 저장해 학습관리시스템이나 메신저에 올리는 가벼운 제작 흐름에 맞습니다.",
      check: "긴 녹화는 브라우저 메모리와 저장 공간의 영향을 받으므로 중요한 영상은 짧게 나누어 촬영하세요.",
    },
  ],
  "ai-text-cleaner": [
    {
      title: "AI 답변을 메일 본문으로 옮기기 전",
      body:
        "ChatGPT 답변에 남은 별표, 제목 기호, 코드블록 표시를 걷어내고 업무 메일에 붙여도 어색하지 않은 문장 형태로 정리합니다. 복사한 답변을 그대로 보낼 때 생기는 기계적인 흔적을 줄이는 데 초점을 둡니다.",
      check: "서식은 정리되지만 사실관계는 검증하지 않으므로 이름, 금액, 일정은 원문 기준으로 확인하세요.",
    },
    {
      title: "보고서 초안의 마크다운 흔적을 지울 때",
      body:
        "AI가 만든 보고서 개요에서 ### 제목, 굵게 표시, 링크 표기를 제거해 한글 문서나 사내 위키에 맞는 깨끗한 텍스트로 바꿉니다. 문단 간 빈 줄도 조절해 붙여넣은 뒤 다시 손볼 양을 줄입니다.",
      check: "표 데이터까지 정교하게 옮겨야 한다면 AI 표 변환 도구를 함께 쓰는 편이 좋습니다.",
    },
    {
      title: "메신저 공유용으로 문장을 짧게 다듬을 때",
      body:
        "긴 AI 답변을 Slack, Teams, 카카오워크 같은 메신저에 붙이기 전에 과한 구분선과 빈 줄을 줄입니다. 팀원이 모바일에서 읽을 때 끊기지 않도록 단락을 압축하는 용도에 맞습니다.",
      check: "원문 의미를 바꾸는 요약 도구가 아니므로 필요한 삭제와 표현 수정은 직접 확인하세요.",
    },
  ],
  "ai-table-converter": [
    {
      title: "AI가 만든 비교표를 엑셀로 옮길 때",
      body:
        "제품 비교, 견적 비교, 후보자 평가표처럼 AI 답변 안에 들어 있는 마크다운 표를 셀 단위 TSV나 CSV로 바꿉니다. 표 앞뒤 설명까지 같이 붙여넣어도 표 영역을 골라낼 수 있어 복사 실수를 줄입니다.",
      check: "셀 안 줄바꿈과 쉼표가 있는 데이터는 변환 후 엑셀에서 열 구분이 맞는지 확인하세요.",
    },
    {
      title: "문서에 바로 붙는 표가 필요할 때",
      body:
        "Word, 한글, Google Docs에 넣을 표를 HTML 형태로 복사해 문서용 표 구조를 유지합니다. 단순 텍스트 표가 무너지는 보고서, 제안서, 회의자료 제작에 적합합니다.",
      check: "붙여넣는 프로그램의 표 처리 방식에 따라 폭과 테두리는 따로 조정해야 할 수 있습니다.",
    },
    {
      title: "AI 답변 속 표만 분리해 검토할 때",
      body:
        "설명 문단, 결론, 표가 섞인 답변에서 실제 데이터 부분만 분리합니다. 자료 조사 결과를 스프레드시트로 옮기기 전에 열 이름과 행 수를 빠르게 확인하는 준비 단계로 쓸 수 있습니다.",
      check: "AI가 만든 표 자체의 수치와 출처는 도구가 보증하지 않으므로 원자료 검증이 필요합니다.",
    },
  ],
  "csv-excel-converter": [
    {
      title: "공공기관이나 사내 시스템 CSV가 깨질 때",
      body:
        "CP949나 UTF-8 CSV를 브라우저에서 읽어 XLSX로 바꾸며 한글 깨짐을 줄입니다. 전화번호, 우편번호, 사번처럼 앞자리 0이 중요한 값도 텍스트로 보존해 엑셀에서 자동 숫자 변환되는 문제를 막습니다.",
      check: "원본 파일은 서버로 올리지 않지만, 변환 후 첫 행과 주요 식별자 열은 직접 열어 확인하세요.",
    },
    {
      title: "여러 설문 결과 파일을 한 번에 정리할 때",
      body:
        "행사 신청, 만족도 조사, 주문 내역처럼 여러 CSV와 TSV를 동시에 선택해 각각 XLSX 결과로 저장합니다. 파일이 많으면 개별 다운로드 대신 ZIP으로 묶어 후속 정리 시간을 줄일 수 있습니다.",
      check: "각 파일의 구분자와 인코딩이 다를 수 있으니 변환 로그와 결과 미리보기를 함께 확인하세요.",
    },
    {
      title: "엑셀 시트를 업로드용 CSV로 다시 만들 때",
      body:
        "XLSX의 첫 시트만 내보내거나 전체 시트를 각각 CSV로 저장해 ERP, 쇼핑몰, 내부 관리자 페이지 업로드 양식에 맞춥니다. 시트별 결과가 필요할 때 반복 저장 작업을 줄여줍니다.",
      check: "업로드 대상 시스템이 요구하는 열 순서, 날짜 형식, 문자 인코딩은 별도로 맞춰야 합니다.",
    },
  ],
  "character-counter": [
    {
      title: "자기소개서 제한 글자수를 맞출 때",
      body:
        "공백 포함과 공백 제외 글자수를 동시에 보며 문항별 분량을 조정합니다. 문장을 줄였는데도 제출 기준을 넘는지, 반대로 너무 짧아 보이지 않는지 빠르게 확인할 수 있습니다.",
      check: "플랫폼마다 줄바꿈과 공백 계산 방식이 다를 수 있어 최종 제출 화면에서도 한 번 더 확인하세요.",
    },
    {
      title: "광고 문구와 SNS 문장을 다듬을 때",
      body:
        "짧은 제목, 문자 메시지, 앱 푸시, 상품 설명의 길이를 보면서 핵심 단어를 남깁니다. 바이트 수와 줄 수를 함께 확인하면 모바일 화면에서 지나치게 길어지는 표현을 줄이기 쉽습니다.",
      check: "한글, 이모지, 특수문자는 서비스마다 표시 폭이 달라 실제 미리보기와 함께 보세요.",
    },
    {
      title: "보고서 요약문의 읽기 부담을 볼 때",
      body:
        "글자수뿐 아니라 단어 수, 줄 수, 예상 읽기 시간을 확인해 회의 전 공유할 요약문 길이를 조절합니다. 짧아야 하는 공지와 충분히 설명해야 하는 보고서의 분량 차이를 잡는 데 유용합니다.",
      check: "읽기 시간은 평균적인 추정치이므로 전문 용어나 표가 많은 글은 실제 체감 시간이 달라질 수 있습니다.",
    },
  ],
  "line-break-cleaner": [
    {
      title: "PDF에서 복사한 글이 줄마다 끊길 때",
      body:
        "자료집이나 판례, 연구보고서에서 복사한 텍스트의 어색한 줄바꿈을 문단 형태로 합칩니다. 문장 중간마다 줄이 바뀌어 메일이나 문서에 붙이기 어려운 상황을 빠르게 정리합니다.",
      check: "제목, 목록, 표처럼 줄바꿈 자체가 의미 있는 부분은 결과를 보며 필요한 곳을 다시 나누세요.",
    },
    {
      title: "메신저와 메일에 붙일 문장을 정돈할 때",
      body:
        "복사 과정에서 생긴 여러 칸 공백, 과한 빈 줄, 들쭉날쭉한 문단을 줄입니다. 모바일 메신저로 공유할 때 화면을 불필요하게 길게 차지하는 문제를 줄이는 데 좋습니다.",
      check: "공백을 줄이면 원래 의도한 들여쓰기나 시 코드 정렬도 사라질 수 있습니다.",
    },
    {
      title: "마침표 기준으로 안내문 호흡을 다시 잡을 때",
      body:
        "공지문이나 안내문을 문장 단위로 보기 좋게 재배치합니다. 긴 문단을 읽기 쉬운 줄로 나누거나, 반대로 잘못 들어간 줄바꿈을 합쳐 공유용 문장으로 정리할 수 있습니다.",
      check: "약어, 숫자 소수점, URL 주변의 마침표는 자동 판단이 어려우니 결과를 훑어보세요.",
    },
  ],
  "markdown-editor": [
    {
      title: "README와 작업 절차서를 바로 작성할 때",
      body:
        "제목, 목록, 체크리스트, 코드블록을 넣어 프로젝트 README나 배포 절차 문서를 브라우저에서 정리합니다. 미리보기를 보며 구조를 잡을 수 있어 문서 뼈대를 빠르게 만들기 좋습니다.",
      check: "민감한 토큰이나 내부 URL을 적은 문서는 복사와 공유 전에 반드시 제거하세요.",
    },
    {
      title: "회의 메모를 사내 위키용으로 바꿀 때",
      body:
        "회의 중 적은 일반 텍스트를 안건, 결정 사항, 할 일 목록이 있는 마크다운 문서로 정리합니다. 나중에 Notion, GitHub, 사내 위키에 붙여도 제목 계층이 살아 있게 만드는 데 초점을 둡니다.",
      check: "위키마다 지원하는 마크다운 문법이 조금씩 다르므로 표와 체크박스는 붙여넣은 뒤 확인하세요.",
    },
    {
      title: "블로그 초안의 구조를 먼저 잡을 때",
      body:
        "긴 글을 쓰기 전 H2, H3, 목록, 인용문으로 흐름을 세우고 미리보기로 읽는 리듬을 확인합니다. 별도 편집기를 열지 않고도 초안을 복사하거나 저장해 다음 작성 단계로 넘길 수 있습니다.",
      check: "이미지 업로드나 원격 저장 기능이 아니라 텍스트 중심 초안 편집기로 사용하세요.",
    },
  ],
  "markdown-viewer": [
    {
      title: "받은 README를 편집기 없이 읽을 때",
      body:
        "MD, Markdown, TXT 파일을 브라우저에서 열어 넓은 문서 화면으로 확인합니다. 개발 도구를 열기 어려운 PC에서도 릴리스 노트, 설치 설명, 업무 메모를 읽는 데 적합합니다.",
      check: "파일 내용은 브라우저에서 읽고, 원시 HTML과 스크립트는 실행하지 않도록 처리합니다.",
    },
    {
      title: "긴 마크다운 문서를 목차로 훑을 때",
      body:
        "제목 아웃라인을 이용해 필요한 섹션으로 이동하고 글자 크기와 줄 간격을 조절합니다. 긴 매뉴얼이나 교육자료를 처음부터 끝까지 스크롤하지 않고 필요한 부분만 찾기 좋습니다.",
      check: "목차는 문서 안의 제목 구조에 따라 만들어지므로 제목 문법이 깨진 파일은 수동 확인이 필요합니다.",
    },
    {
      title: "원문과 미리보기를 나란히 비교할 때",
      body:
        "분할 보기로 마크다운 원본과 렌더링 결과를 함께 보며 표, 목록, 코드블록이 의도대로 보이는지 확인합니다. 배포 전 문서 검수나 동료가 보낸 파일 확인에 유용합니다.",
      check: "보기 도구이므로 원문 수정이 필요하면 팝아웃 편집 공간이나 별도 편집기로 이어가세요.",
    },
  ],
  "text-extractor": [
    {
      title: "문의 메일에서 연락처만 모을 때",
      body:
        "고객 문의, 참가 신청, 상담 메모에 섞인 이메일 주소와 전화번호를 항목별로 뽑아냅니다. 본문을 일일이 훑지 않고 후속 연락에 필요한 정보만 복사할 수 있습니다.",
      check: "추출 결과에 포함된 개인정보는 목적에 맞게 보관 기간과 공유 대상을 제한하세요.",
    },
    {
      title: "공지문 안의 URL을 한 번에 검토할 때",
      body:
        "긴 안내문, 보도자료, 채팅 로그에서 흩어진 링크를 목록으로 정리합니다. 링크를 공유하기 전 중복, 오타, 잘못된 도메인이 있는지 빠르게 확인할 수 있습니다.",
      check: "도구는 링크를 자동으로 열지 않으므로 의심스러운 URL은 새 탭으로 열기 전 주소를 먼저 보세요.",
    },
    {
      title: "고객 대응 로그에서 다음 행동 정보를 찾을 때",
      body:
        "상담 기록이나 영업 메모에서 연락 가능한 이메일, 전화번호, 웹주소를 분리해 다음 팔로업 목록을 만듭니다. 비정형 텍스트를 복사해도 항목별로 정리되어 업무 전달이 쉬워집니다.",
      check: "국가별 전화번호나 특수한 내선 표기는 일부 누락될 수 있어 원문과 대조하세요.",
    },
  ],
  "duplicate-line-remover": [
    {
      title: "메일 발송 목록의 중복을 제거할 때",
      body:
        "여러 신청서와 스프레드시트에서 합친 이메일 목록을 줄 단위로 정리합니다. 같은 주소가 여러 번 들어가 발송이 반복되거나 수신자 수가 부풀어 보이는 문제를 줄입니다.",
      check: "대소문자 무시와 앞뒤 공백 정리 옵션을 적용하면 실제 같은 주소를 더 잘 잡을 수 있습니다.",
    },
    {
      title: "키워드와 태그 후보를 합칠 때",
      body:
        "블로그 키워드, 상품 태그, 광고 소재 문구를 여러 출처에서 모은 뒤 중복 줄을 제거합니다. 원래 순서를 유지하거나 정렬해 검토 방식에 맞게 목록을 만들 수 있습니다.",
      check: "비슷하지만 다른 표현까지 자동 병합하지는 않으므로 동의어 정리는 별도 판단이 필요합니다.",
    },
    {
      title: "참석자 명단을 취합한 뒤 정리할 때",
      body:
        "부서별로 받은 참가자 이름이나 사번 목록을 합친 뒤 같은 줄을 제거합니다. 스프레드시트에 붙이기 전 빈 줄과 중복을 줄이면 확인 작업이 훨씬 단순해집니다.",
      check: "동명이인처럼 같은 이름이 다른 사람을 뜻할 수 있는 자료는 사번이나 이메일 기준으로 확인하세요.",
    },
  ],
  "find-replace": [
    {
      title: "문서 속 제품명과 조직명을 한꺼번에 바꿀 때",
      body:
        "제안서, 공지문, 매뉴얼에 반복되는 서비스명이나 부서명을 한 번에 치환합니다. 여러 문단을 눈으로 찾는 대신 변경 전후를 확인하며 빠르게 맞출 수 있습니다.",
      check: "부분 일치로 엉뚱한 단어까지 바뀌지 않도록 대소문자와 단어 경계를 확인하세요.",
    },
    {
      title: "템플릿의 날짜와 담당자를 교체할 때",
      body:
        "매주 반복해서 보내는 안내문에서 날짜, 담당자, 연락처만 바꿉니다. 원문을 복사해 넣고 치환 결과를 바로 확인하면 빠뜨린 자리표시자를 줄일 수 있습니다.",
      check: "개인 이름과 연락처를 바꿀 때는 이전 수신자 정보가 남지 않았는지 최종 본문을 훑으세요.",
    },
    {
      title: "자막이나 녹취록의 반복 오타를 고칠 때",
      body:
        "STT 결과나 자막 파일에 반복해서 나온 잘못된 고유명사, 띄어쓰기, 표기법을 일괄 수정합니다. 긴 텍스트에서 같은 실수를 여러 번 고치는 시간을 줄이는 데 적합합니다.",
      check: "문맥에 따라 일부만 바꿔야 하는 단어는 전체 치환보다 미리 찾기 결과를 검토하세요.",
    },
  ],
  "case-converter": [
    {
      title: "파일명과 URL 슬러그를 통일할 때",
      body:
        "영문 제목이나 키워드를 snake_case, kebab-case, camelCase로 바꿔 파일명과 URL 규칙에 맞춥니다. 블로그 파일, 데이터 파일, 프런트엔드 라우트 이름을 일관되게 만드는 데 편합니다.",
      check: "한글과 특수문자는 기대한 대로 변환되지 않을 수 있어 결과 파일명은 직접 확인하세요.",
    },
    {
      title: "개발 문서의 필드명을 정리할 때",
      body:
        "API 응답 필드, 스키마 후보, 변수명 아이디어를 여러 케이스로 바꿔 팀 규칙에 맞는 형태를 고릅니다. 직접 타이핑하다 생기는 대문자 누락과 구분자 실수를 줄일 수 있습니다.",
      check: "보안 토큰이나 실제 비밀번호 같은 민감한 값은 변환 입력으로 넣지 마세요.",
    },
    {
      title: "영문 제목의 대소문자 스타일을 맞출 때",
      body:
        "뉴스레터 제목, 보고서 소제목, 상품 옵션명을 대문자, 소문자, 제목형으로 변환합니다. 여러 문구를 같은 스타일로 맞춰야 할 때 수작업보다 빠르게 정리됩니다.",
      check: "브랜드 표기처럼 일부러 대문자를 유지해야 하는 단어는 변환 후 다시 확인하세요.",
    },
  ],
  "text-diff": [
    {
      title: "계약 문구의 수정 전후를 비교할 때",
      body:
        "상대방이 보낸 계약서 조항, 약관, 안내문에서 어떤 줄이 추가되고 삭제됐는지 확인합니다. 전체 문서를 다시 읽기 전에 실제로 달라진 부분을 먼저 잡을 수 있습니다.",
      check: "법률 판단 도구가 아니므로 중요한 계약은 변경 지점을 확인한 뒤 전문가 검토를 받으세요.",
    },
    {
      title: "공지문 리뷰 반영 여부를 볼 때",
      body:
        "팀원이 수정한 공지문이나 보도자료를 원본과 나란히 비교합니다. 삭제된 문장, 새로 들어간 표현, 그대로 남은 부분을 줄 단위로 보여 검수 시간을 줄입니다.",
      check: "줄바꿈 위치가 다르면 실제 내용 변화보다 차이가 크게 보일 수 있어 먼저 문단 정리를 맞추세요.",
    },
    {
      title: "프롬프트와 자막의 미세 변경을 확인할 때",
      body:
        "AI 프롬프트, SRT 자막, 스크립트의 버전 차이를 비교해 의도하지 않은 삭제가 없는지 봅니다. 짧은 변경이라도 결과 품질에 영향을 주는 문장을 놓치지 않도록 돕습니다.",
      check: "단어 단위 비교가 필요한 긴 문장은 줄 단위 결과를 기준으로 다시 원문을 대조하세요.",
    },
  ],
  "qr-code-generator": [
    {
      title: "행사 신청 링크를 인쇄물에 넣을 때",
      body:
        "세미나 신청 폼, 만족도 조사, 지도 링크를 QR 코드로 만들어 포스터나 안내문에 배치합니다. SVG, PNG, JPG 중 제작물에 맞는 형식으로 저장할 수 있습니다.",
      check: "인쇄 전 실제 휴대폰 카메라로 스캔해 여백과 색상 대비가 충분한지 확인하세요.",
    },
    {
      title: "매장과 회의실 Wi-Fi 접속을 쉽게 만들 때",
      body:
        "방문객이 SSID와 비밀번호를 직접 입력하지 않도록 Wi-Fi 정보를 QR로 만듭니다. 회의실, 매장 카운터, 게스트 네트워크 안내문에 붙이면 문의를 줄일 수 있습니다.",
      check: "Wi-Fi 비밀번호가 들어간 QR은 공개 범위와 게시 위치를 신중히 정하세요.",
    },
    {
      title: "명함이나 제품 카드에 링크를 넣을 때",
      body:
        "포트폴리오, 예약 페이지, 제품 설명서 링크를 작은 QR로 만들어 명함이나 라벨에 넣습니다. 색상과 모듈 모양을 조정하되 스캔 안정성을 해치지 않도록 균형을 잡습니다.",
      check: "너무 작은 크기나 낮은 대비는 인식률을 떨어뜨리므로 최종 출력 크기로 테스트하세요.",
    },
  ],
  "qr-link-extractor": [
    {
      title: "QR을 열기 전에 실제 주소를 확인할 때",
      body:
        "포스터나 안내문에 있는 QR 이미지를 바로 열지 않고 브라우저 안에서 원문 URL을 먼저 확인합니다. 낯선 QR이 어디로 연결되는지 보고 나서 복사하거나 새 탭으로 열 수 있습니다.",
      check: "도구는 자동 접속하지 않지만, 의심스러운 단축 URL은 보안 검토 후 접근하세요.",
    },
    {
      title: "스크린샷 속 QR 링크를 텍스트로 꺼낼 때",
      body:
        "채팅방에 공유된 캡처 이미지나 온라인 안내 화면의 QR을 읽어 링크를 복사합니다. 화면을 다른 휴대폰으로 다시 찍는 번거로움 없이 이미지 파일만으로 내용을 확인할 수 있습니다.",
      check: "흐리거나 기울어진 QR은 인식이 어려울 수 있어 가능하면 원본 해상도 이미지를 사용하세요.",
    },
    {
      title: "Wi-Fi나 일반 텍스트 QR 내용을 확인할 때",
      body:
        "URL이 아닌 Wi-Fi 접속 정보, 이메일, 단순 텍스트 QR도 원문으로 확인합니다. 어떤 데이터가 들어 있는지 알 수 있어 공유 가능한 내용인지 판단하기 쉽습니다.",
      check: "개인 연락처나 비밀번호가 포함된 QR 원문은 필요한 사람에게만 전달하세요.",
    },
  ],
  "screenshot-saver": [
    {
      title: "Win+Shift+S 캡처를 바로 파일로 남길 때",
      body:
        "Windows 11에서 화면 일부를 캡처한 뒤 그림판이나 사진 앱을 열지 않고, 도구 화면에 Ctrl+V만 눌러 PNG 파일로 바로 저장합니다. 문의 화면, 오류 메시지, 설정 화면을 빠르게 파일화할 때 적합합니다.",
      check: "붙여넣기 즉시 저장 옵션이 켜져 있으면 클립보드 이미지가 바로 다운로드됩니다.",
    },
    {
      title: "메일과 메신저에 첨부할 스샷을 만들 때",
      body:
        "캡처한 영역을 파일로 저장해 이메일, 업무 메신저, 고객 문의, 이슈 트래커에 첨부합니다. 임시 캡처를 한 번 더 편집 앱에 붙여넣고 저장하는 단계를 줄일 수 있습니다.",
      check: "캡처 영역 안에 개인정보나 내부 URL이 보이지 않는지 저장 전 미리보기를 확인하세요.",
    },
    {
      title: "자동 저장이 막힌 브라우저에서 다시 저장할 때",
      body:
        "브라우저가 자동 다운로드를 제한하더라도 붙여넣은 스크린샷은 미리보기와 수동 저장 버튼으로 남습니다. 필요한 경우 JPG나 WEBP 형식으로 바꿔 다시 내려받을 수 있습니다.",
      check: "JPG로 저장하면 투명 배경은 흰색으로 합쳐질 수 있습니다.",
    },
  ],
  "image-resizer": [
    {
      title: "지원서와 공공 서식의 이미지 규격을 맞출 때",
      body:
        "증명사진, 첨부 이미지, 서류 스캔본을 지정된 가로세로 픽셀에 맞춰 조절합니다. 비율 유지 옵션을 쓰면 얼굴이나 문서가 찌그러지는 문제를 줄일 수 있습니다.",
      check: "제출처가 요구하는 해상도, 용량, 파일 형식 조건을 함께 확인하세요.",
    },
    {
      title: "상품 썸네일을 같은 크기로 맞출 때",
      body:
        "쇼핑몰 상품 이미지나 블로그 대표 이미지를 일정한 폭과 비율로 정리합니다. 여러 이미지의 표시 크기가 달라 페이지가 어수선해 보이는 문제를 줄일 수 있습니다.",
      check: "작은 원본을 크게 늘리면 선명도가 떨어지므로 원본 해상도를 먼저 확인하세요.",
    },
    {
      title: "스크린샷을 공유하기 좋은 크기로 줄일 때",
      body:
        "오류 화면, 설정 화면, 안내 캡처를 메신저나 메일에 보내기 전에 적당한 크기로 낮춥니다. 상대가 모바일에서도 빠르게 열어볼 수 있도록 용량과 화면 폭을 함께 줄입니다.",
      check: "개인정보가 보이는 영역은 크기 조절 전에 잘라내거나 가려서 공유하세요.",
    },
  ],
  "image-converter": [
    {
      title: "PNG 스크린샷을 JPG로 가볍게 바꿀 때",
      body:
        "화면 캡처나 문서 이미지를 JPG로 변환해 메일 첨부와 폼 업로드를 쉽게 합니다. 투명 배경이 필요 없는 스크린샷이라면 용량을 줄이면서 호환성을 확보하기 좋습니다.",
      check: "투명 배경이 중요한 이미지는 JPG로 바꾸면 배경이 사라질 수 있으니 PNG를 유지하세요.",
    },
    {
      title: "웹 페이지용 WEBP 이미지를 준비할 때",
      body:
        "블로그, 랜딩 페이지, 상품 상세에 올릴 이미지를 WEBP로 바꿔 페이지 무게를 줄입니다. 브라우저에서 바로 결과를 만들기 때문에 간단한 웹 최적화 작업에 적합합니다.",
      check: "업로드 대상 서비스가 WEBP를 지원하는지 확인하고, 필요하면 JPG나 PNG도 함께 준비하세요.",
    },
    {
      title: "제출처가 받는 형식으로 이미지를 맞출 때",
      body:
        "받은 이미지가 시스템에서 거부될 때 JPG, PNG, WEBP 중 허용되는 형식으로 변환합니다. 별도 설치 없이 여러 형식 요구가 섞인 제출 업무를 처리할 수 있습니다.",
      check: "형식 변환은 이미지 안의 개인정보를 제거하지 않으므로 EXIF 제거가 필요하면 별도 도구를 사용하세요.",
    },
  ],
  "image-compressor": [
    {
      title: "업로드 용량 제한에 걸린 사진을 줄일 때",
      body:
        "학교, 공공기관, 채용 사이트가 요구하는 용량 제한에 맞춰 사진 품질과 최대 너비를 조절합니다. 원본을 서버로 보내지 않고 결과 용량을 보며 여러 번 조정할 수 있습니다.",
      check: "압축을 강하게 하면 작은 글씨와 문서 가장자리가 흐려질 수 있어 제출 전 확대해 보세요.",
    },
    {
      title: "상품 이미지와 블로그 삽입 이미지를 가볍게 만들 때",
      body:
        "상품 사진, 리뷰 이미지, 본문 삽입 이미지를 적당한 화질로 줄여 페이지 로딩 부담을 낮춥니다. 너무 큰 원본을 그대로 올릴 때 생기는 느린 표시 문제를 줄이는 작업에 맞습니다.",
      check: "대표 이미지처럼 품질이 중요한 파일은 압축률을 낮게 시작해 비교하세요.",
    },
    {
      title: "여러 장의 사진을 메일로 보내기 전",
      body:
        "현장 사진이나 행사 기록 이미지를 한꺼번에 보내기 전에 용량을 줄입니다. 받는 사람이 모바일 환경에서도 빨리 열 수 있게 만들고, 첨부 제한으로 반송되는 일을 줄입니다.",
      check: "압축 결과 파일명과 순서가 필요한 업무라면 다운로드 후 폴더에서 다시 확인하세요.",
    },
  ],
  "exif-metadata-remover": [
    {
      title: "사진을 블로그나 SNS에 올리기 전",
      body:
        "휴대폰 사진에 남을 수 있는 GPS 위치, 촬영 기기, 시간 같은 메타데이터를 제거합니다. 이미지 내용은 그대로 두고 파일 내부 정보만 줄여 공개 공유 전 부담을 낮춥니다.",
      check: "메타데이터 제거가 사진 속 얼굴, 차량 번호, 문서 내용까지 가려주지는 않습니다.",
    },
    {
      title: "거래처에 보낼 이미지의 숨은 정보를 정리할 때",
      body:
        "편집 프로그램 이름, 작성자, 내부 설명, 코멘트 같은 업무상 불필요한 정보를 제거합니다. 제안서 첨부 이미지나 검수용 캡처를 외부로 보낼 때 유용합니다.",
      check: "결과 파일을 다시 저장하는 과정에서 일부 프로그램이 새 메타데이터를 넣을 수 있으니 최종본도 확인하세요.",
    },
    {
      title: "학교나 가족 사진을 공유하기 전",
      body:
        "자택, 학교, 행사 장소가 추정될 수 있는 사진을 공유하기 전에 EXIF와 위치 정보를 제거합니다. 파일을 서버에 업로드하지 않고 브라우저 안에서 처리해 가벼운 사전 점검이 가능합니다.",
      check: "위치가 사진 배경 자체에 드러나는 경우에는 메타데이터 제거만으로 충분하지 않습니다.",
    },
  ],
  "pdf-merge": [
    {
      title: "견적서와 계약 첨부를 한 파일로 묶을 때",
      body:
        "견적서, 계약서, 사업자등록증, 별도 첨부자료를 제출 순서대로 배치해 하나의 PDF로 합칩니다. 상대가 여러 파일을 따로 열지 않아도 되도록 제출 꾸러미를 정리할 때 적합합니다.",
      check: "병합 전 파일 순서를 확인하고, 큰 PDF는 브라우저 메모리 상태에 따라 시간이 걸릴 수 있습니다.",
    },
    {
      title: "스캔한 영수증과 증빙 자료를 정리할 때",
      body:
        "여러 영수증, 거래명세서, 확인서를 하나의 PDF로 묶어 회계나 행정 시스템에 올립니다. 파일명과 순서를 정해 두면 나중에 누락 여부를 확인하기 쉽습니다.",
      check: "민감한 주민번호, 계좌번호, 서명 이미지가 있는 페이지는 병합 전 가림 처리를 검토하세요.",
    },
    {
      title: "회의자료 본문과 별첨을 하나로 배포할 때",
      body:
        "회의 안건지, 참고자료, 별첨 표를 하나의 PDF로 합쳐 참석자에게 전달합니다. 열어야 하는 파일 수를 줄여 회의 시작 전 자료 확인 흐름을 단순하게 만듭니다.",
      check: "페이지 번호나 목차가 원래 문서 기준일 수 있으므로 배포 전 첫 페이지부터 빠르게 넘겨보세요.",
    },
  ],
  "pdf-split": [
    {
      title: "긴 자료집을 장별 PDF로 나눌 때",
      body:
        "교육자료나 제안서처럼 긴 PDF를 일정 페이지 단위나 범위로 분할합니다. 필요한 장만 담당자에게 보내거나, 파일 크기 제한이 있는 시스템에 나누어 올릴 때 편합니다.",
      check: "목차와 실제 페이지 번호가 다를 수 있으므로 입력 범위를 PDF 페이지 기준으로 확인하세요.",
    },
    {
      title: "연속 스캔한 여러 문서를 따로 저장할 때",
      body:
        "복합기에서 한 번에 스캔된 신청서, 영수증, 확인서를 페이지 단위로 나눕니다. 각 문서가 별도 파일이어야 하는 제출 업무에서 후처리 시간을 줄일 수 있습니다.",
      check: "양면 스캔이나 빈 페이지가 섞인 경우 분할 결과에 빈 파일이 들어가지 않았는지 확인하세요.",
    },
    {
      title: "업로드 제한에 맞춰 PDF를 쪼갤 때",
      body:
        "한 파일로 올리기에는 큰 PDF를 여러 묶음으로 분할합니다. 첨부 제한을 넘는 보고서나 자료집을 시스템 요구 크기에 맞게 나누는 실무 흐름에 맞습니다.",
      check: "분할은 용량을 줄이는 압축과 다르므로 각 결과 파일 크기는 다운로드 후 확인하세요.",
    },
  ],
  "pdf-extract-pages": [
    {
      title: "계약서 중 확인할 조항 페이지만 보낼 때",
      body:
        "전체 계약서를 공유하지 않고 검토가 필요한 페이지 범위만 새 PDF로 추출합니다. 외부 문의나 내부 검토 요청에서 보는 범위를 좁혀 커뮤니케이션을 단순하게 만듭니다.",
      check: "추출 페이지에 필요한 앞뒤 맥락과 별첨 참조가 빠지지 않았는지 확인하세요.",
    },
    {
      title: "보고서에서 요약과 결론만 따로 만들 때",
      body:
        "긴 보고서의 표지, 요약, 결론, 특정 표가 있는 페이지만 골라 공유용 PDF를 만듭니다. 바쁜 의사결정자가 먼저 볼 부분을 분리할 때 적합합니다.",
      check: "페이지 범위는 1-3,5,9처럼 입력할 수 있지만 중복과 누락은 결과 미리보기로 확인하세요.",
    },
    {
      title: "스캔본에서 필요한 증빙 페이지만 뽑을 때",
      body:
        "여러 서류가 섞인 스캔 PDF에서 제출 대상 페이지만 선택해 새 파일로 저장합니다. 전체 개인정보가 들어 있는 묶음을 그대로 보내지 않고 필요한 부분만 분리할 수 있습니다.",
      check: "추출한 PDF에도 민감 정보가 남아 있을 수 있으므로 제출 전 페이지별로 확인하세요.",
    },
  ],
  "image-to-pdf": [
    {
      title: "영수증과 사진 증빙을 PDF로 묶을 때",
      body:
        "휴대폰으로 찍은 영수증, 현장 사진, 확인서를 순서대로 PDF 페이지로 만듭니다. 이미지 여러 장을 따로 보내기보다 하나의 문서로 제출해야 할 때 편합니다.",
      check: "사진 방향과 페이지 순서를 만들기 전에 확인하면 결과 PDF를 다시 만드는 일을 줄일 수 있습니다.",
    },
    {
      title: "화이트보드와 캡처 이미지를 회의 기록으로 만들 때",
      body:
        "회의 중 찍은 화이트보드, 화면 캡처, 메모 사진을 하나의 PDF로 정리합니다. 회의 후 공유할 때 날짜와 안건 순서대로 묶으면 자료 흐름이 분명해집니다.",
      check: "흐린 사진이나 잘린 모서리는 PDF로 묶어도 읽기 어려우니 원본 품질을 먼저 확인하세요.",
    },
    {
      title: "지원 서류 이미지를 제출용 문서로 바꿀 때",
      body:
        "신분 확인 자료, 자격증, 신청서 사진을 PDF 형식으로 요구하는 곳에 맞춰 변환합니다. 여러 이미지 파일을 하나씩 올릴 수 없는 제출 폼에서 유용합니다.",
      check: "제출처가 요구하는 PDF 용량 제한과 컬러/흑백 조건은 별도로 확인하세요.",
    },
  ],
  "pdf-to-image": [
    {
      title: "PDF 표지와 핵심 페이지를 썸네일로 만들 때",
      body:
        "보고서 표지, 행사 안내문, 제품 소개서 첫 페이지를 PNG 이미지로 렌더링합니다. 웹 게시글, 메신저 공유, 자료 목록 썸네일을 만들 때 바로 사용할 수 있습니다.",
      check: "저작권이나 개인정보가 있는 문서는 이미지로 변환해도 공유 범위 제한이 그대로 필요합니다.",
    },
    {
      title: "문서 한 페이지를 채팅방에 빠르게 공유할 때",
      body:
        "PDF 전체를 보내기보다 확인이 필요한 한 페이지를 이미지로 저장해 대화 중 바로 보여줍니다. 상대가 PDF 뷰어를 열지 않아도 핵심 페이지를 빠르게 볼 수 있습니다.",
      check: "작은 글씨가 있는 페이지는 이미지 해상도와 확대 가능 여부를 확인하세요.",
    },
    {
      title: "슬라이드나 발표 자료에 PDF 일부를 넣을 때",
      body:
        "PDF 안의 도표, 공정표, 서식 페이지를 이미지로 바꿔 프레젠테이션에 삽입합니다. 캡처보다 페이지 경계가 깔끔하고 반복 작업을 줄일 수 있습니다.",
      check: "변환 이미지는 편집 가능한 텍스트가 아니므로 원문 수정은 PDF 원본에서 처리하세요.",
    },
  ],
  "srt-cleaner": [
    {
      title: "자동 자막의 번호와 공백이 꼬였을 때",
      body:
        "음성 인식 도구나 편집 프로그램에서 나온 SRT의 번호, 빈 줄, 시간 블록을 안정적인 구조로 정리합니다. 업로드 전 기본 형식 오류를 줄여 영상 플랫폼에서 거부되는 일을 예방합니다.",
      check: "자막 내용의 오탈자와 번역 품질은 자동으로 고치지 않으므로 텍스트 검수는 별도로 하세요.",
    },
    {
      title: "번역받은 자막 파일을 편집 전에 다듬을 때",
      body:
        "외부에서 받은 SRT에 불규칙한 줄바꿈이나 누락된 번호가 있을 때 먼저 정리합니다. 이후 싱크 조정이나 번역 검수를 하기 전 파일 구조를 안정화하는 준비 단계로 적합합니다.",
      check: "시간 코드 자체가 잘못된 경우에는 정리 후에도 영상과 맞지 않을 수 있습니다.",
    },
    {
      title: "영상 편집툴에 넣기 전 기본 구조를 맞출 때",
      body:
        "Premiere, DaVinci Resolve, YouTube Studio 등에 넣을 SRT를 불필요한 공백 없이 정리합니다. 같은 자막 파일을 여러 도구에서 쓰기 전에 호환성을 높이는 데 도움이 됩니다.",
      check: "편집툴마다 지원하는 줄 길이와 인코딩이 다를 수 있어 불러오기 테스트를 해보세요.",
    },
  ],
  "subtitle-converter": [
    {
      title: "YouTube용 SRT를 웹 플레이어용 VTT로 바꿀 때",
      body:
        "SRT 자막을 WebVTT 형식으로 변환해 웹 페이지나 HTML5 플레이어에서 사용할 수 있게 만듭니다. 시간 정보와 본문을 유지하면서 플랫폼 요구 형식에 맞춥니다.",
      check: "VTT에 필요한 헤더와 시간 구분은 변환되지만, 스타일 확장 문법은 별도 확인이 필요합니다.",
    },
    {
      title: "웹 자막 VTT를 편집툴용 SRT로 돌릴 때",
      body:
        "웹에서 쓰던 VTT 자막을 SRT로 바꿔 영상 편집툴이나 업로드 시스템에 맞춥니다. 포맷만 달라서 다시 작성하기 번거로운 자막 작업을 줄여줍니다.",
      check: "위치, 스타일, 주석 같은 VTT 전용 정보는 SRT로 옮길 때 제한될 수 있습니다.",
    },
    {
      title: "붙여넣은 자막 텍스트를 파일로 저장할 때",
      body:
        "파일이 없어도 자막 텍스트를 붙여넣고 필요한 형식으로 다운로드합니다. 간단한 수정 후 바로 배포 형식을 만들고 싶은 상황에 맞습니다.",
      check: "시간 코드 형식이 크게 깨진 원문은 먼저 SRT 정리 도구로 구조를 맞추는 편이 좋습니다.",
    },
  ],
  "subtitle-timing": [
    {
      title: "인트로를 추가해 자막이 전체적으로 밀렸을 때",
      body:
        "영상 앞에 로고나 인트로를 추가한 뒤 자막이 늦게 맞는 경우 전체 시간을 같은 초만큼 뒤로 보냅니다. 모든 블록을 손으로 수정하지 않고 한 번에 오프셋을 적용합니다.",
      check: "오프셋 값은 초 단위로 입력하므로 영상 편집 타임라인에서 실제 차이를 먼저 재보세요.",
    },
    {
      title: "자막이 음성보다 빠르거나 늦을 때",
      body:
        "SRT나 VTT 자막 전체가 영상보다 몇 초 앞서거나 뒤처질 때 일괄 보정합니다. 싱크가 일정하게 어긋난 파일이라면 빠르게 맞출 수 있습니다.",
      check: "중간부터 점점 어긋나는 드리프트 문제는 단일 오프셋만으로 해결되지 않을 수 있습니다.",
    },
    {
      title: "편집 후 잘라낸 구간만큼 시간을 당길 때",
      body:
        "영상 앞부분을 잘라낸 뒤 자막 시간을 전체적으로 앞으로 당깁니다. 강의, 인터뷰, 짧은 홍보 영상에서 편집 전 자막을 다시 활용할 때 유용합니다.",
      check: "시간을 앞으로 당길 때 0초보다 이른 자막이 생기지 않는지 결과를 확인하세요.",
    },
  ],
};

const TOOL_USE_EXAMPLES = {
  "voice-to-text": [
    "회의 중 말한 내용을 바로 받아 적고 회의록 초안으로 정리합니다.",
    "강의, 발표, 유튜브 영상의 대본 초안을 빠르게 작성합니다.",
  ],
  "audio-file-transcription": [
    "휴대폰으로 녹음한 회의, 강의, 인터뷰 파일을 검토용 텍스트 초안으로 변환합니다.",
    "m4a, mp3, wav 같은 짧은 녹음 파일을 서버 업로드 없이 브라우저 안에서 처리합니다.",
    "변환 결과를 복사하거나 TXT 파일로 저장한 뒤 사람이 다시 읽으며 회의록이나 콘텐츠 초안으로 다듬습니다.",
  ],
  "audio-editor": [
    "휴대폰 음성 메모나 Android 녹음 파일에서 앞뒤 불필요한 구간을 잘라냅니다.",
    "파형을 보며 필요한 구간을 복사해 다른 위치에 붙이고, 실수하면 실행 취소로 되돌립니다.",
    "작게 녹음된 구간만 선택해 음량을 올린 뒤 WAV 파일로 저장합니다.",
  ],
  "webcam-recorder": [
    "웹캠 발표 영상이나 교육 안내 영상을 브라우저에서 바로 녹화합니다.",
    "면접 연습, 자기소개 영상, 온라인 제출용 녹화 파일을 만듭니다.",
  ],
  "ai-text-cleaner": [
    "AI 답변을 메일이나 한글 문서에 붙여넣기 전에 별표와 마크다운을 정리합니다.",
    "블로그 초안, 보고서 초안, 메신저 공유용 텍스트를 깔끔하게 바꿉니다.",
    "표 형태의 마크다운을 스프레드시트에 붙여넣기 좋은 형태로 정리합니다.",
  ],
  "ai-table-converter": [
    "AI 답변 앞뒤 설명 문구까지 그대로 붙여넣고 표 데이터만 자동으로 골라냅니다.",
    "마크다운 표를 Word, 한글, Google Docs에 붙는 문서용 표로 복사합니다.",
    "Excel과 Google Sheets에 셀 단위로 붙여넣기 좋은 TSV와 CSV를 함께 만듭니다.",
  ],
  "csv-excel-converter": [
    "한글 CSV를 CP949 또는 UTF-8로 읽어 XLSX 엑셀 파일로 변환합니다.",
    "여러 CSV·TSV 파일을 한 번에 올리고 결과 XLSX를 개별 또는 ZIP으로 저장합니다.",
    "XLSX 파일의 첫 시트 또는 전체 시트를 CSV로 내보내 후속 시스템 업로드에 사용합니다.",
  ],
  "character-counter": [
    "자기소개서, 과제, 블로그 원고의 공백 포함/제외 글자수를 확인합니다.",
    "SNS 문구, 광고 문안, 보고서 요약문의 분량을 빠르게 점검합니다.",
    "채용 공고나 플랫폼 제출 기준에 맞춰 바이트 수와 읽기 시간을 함께 확인합니다.",
  ],
  "line-break-cleaner": [
    "PDF나 웹페이지에서 복사한 글의 어색한 줄바꿈을 문단 형태로 정리합니다.",
    "메신저나 메일에 붙여넣기 좋은 형태로 공백과 빈 줄을 줄입니다.",
  ],
  "markdown-editor": [
    "일반 텍스트 초안을 제목, 목록, 표가 있는 마크다운 문서로 정리합니다.",
    "README, 업무 메모, 블로그 초안을 미리보며 작성합니다.",
  ],
  "markdown-viewer": [
    "README, 릴리스 노트, 업무 메모처럼 긴 MD 파일을 넓은 문서 화면으로 확인합니다.",
    "글자 크기와 줄 간격을 조절해 노트북과 큰 모니터에서 모두 읽기 좋게 맞춥니다.",
    "목차로 제목 사이를 이동하고, 필요한 경우 원문과 미리보기를 나란히 비교합니다.",
  ],
  "text-extractor": [
    "문의 메일, 고객 메모, 공지문에서 이메일 주소와 전화번호만 뽑아냅니다.",
    "긴 문서 안의 URL 목록을 정리해 공유하거나 검토합니다.",
  ],
  "duplicate-line-remover": [
    "키워드 목록, 이메일 목록, URL 목록에서 중복 항목을 제거합니다.",
    "스프레드시트에 붙여넣기 전 리스트 데이터를 정리합니다.",
  ],
  "find-replace": [
    "문서 전체에서 제품명, 담당자명, 날짜 표현을 한 번에 바꿉니다.",
    "자막이나 메모의 반복 오타를 빠르게 일괄 수정합니다.",
  ],
  "case-converter": [
    "파일명, 변수명, 태그를 camelCase, snake_case, kebab-case로 바꿉니다.",
    "영문 제목이나 문장을 대문자, 소문자, 제목형으로 정리합니다.",
  ],
  "text-diff": [
    "계약 문구, 보고서, 안내문 수정 전후 차이를 줄 단위로 확인합니다.",
    "프롬프트나 자막의 변경된 부분을 빠르게 검토합니다.",
  ],
  "qr-code-generator": [
    "행사 안내 URL, 설문 링크, 지도 링크를 QR 코드로 만들어 배포합니다.",
    "사무실 또는 매장 Wi-Fi 접속 정보를 QR 코드로 정리합니다.",
    "포스터, 안내문, 명함에 넣을 QR을 PNG, JPG, SVG 중 필요한 형식으로 저장합니다.",
  ],
  "qr-link-extractor": [
    "QR 코드 이미지나 캡처 화면에 들어 있는 링크를 브라우저에서 바로 확인합니다.",
    "인쇄물, 포스터, 명함에 있는 QR을 열기 전에 실제 URL을 먼저 점검합니다.",
    "URL이 아닌 Wi-Fi, 이메일, 일반 텍스트 QR도 원문 내용으로 확인합니다.",
  ],
  "screenshot-saver": [
    "Win+Shift+S로 캡처한 화면 영역을 Ctrl+V로 붙여넣자마자 PNG 파일로 저장합니다.",
    "오류 화면이나 설정 화면을 그림판 없이 바로 파일로 만들어 메일이나 메신저에 첨부합니다.",
    "자동 다운로드가 제한되면 미리보기에서 같은 이미지를 다시 수동 저장합니다.",
  ],
  "image-resizer": [
    "블로그, 쇼핑몰, 지원서 업로드 기준에 맞게 이미지 크기를 줄입니다.",
    "썸네일이나 첨부 이미지의 가로세로 비율을 유지하며 조정합니다.",
  ],
  "image-converter": [
    "PNG 이미지를 JPG 또는 WEBP로 바꿔 웹 업로드에 맞춥니다.",
    "브라우저에서 지원되는 이미지 형식으로 빠르게 변환합니다.",
  ],
  "image-compressor": [
    "메일 첨부, 사이트 업로드, 공공기관 제출용 이미지 용량을 줄입니다.",
    "원본을 서버에 올리지 않고 브라우저에서 압축 결과를 확인합니다.",
    "쇼핑몰 상품 이미지나 블로그 삽입 이미지를 적당한 품질과 크기로 줄입니다.",
  ],
  "exif-metadata-remover": [
    "블로그나 메신저에 사진을 공유하기 전에 GPS 위치정보와 촬영 기기 정보를 제거합니다.",
    "업무 제출용 이미지에서 편집 프로그램, 작성자, 설명 같은 숨은 메타데이터를 정리합니다.",
    "서버 업로드 없이 브라우저에서 파일 내부의 EXIF, XMP, IPTC 항목을 제거합니다.",
  ],
  "pdf-merge": [
    "여러 견적서, 계약서, 첨부문서를 하나의 PDF로 합칩니다.",
    "제출용 파일을 순서대로 묶어 하나의 문서로 정리합니다.",
    "스캔본과 별도 첨부자료를 한 파일로 묶어 이메일이나 업무 시스템에 제출합니다.",
  ],
  "pdf-split": [
    "긴 PDF를 페이지 단위로 나누어 필요한 부분만 별도 파일로 만듭니다.",
    "스캔본이나 자료집을 일정 페이지 간격으로 분할합니다.",
  ],
  "pdf-extract-pages": [
    "PDF에서 필요한 페이지 범위만 골라 별도 문서로 저장합니다.",
    "자료집, 계약서, 보고서에서 공유할 부분만 추출합니다.",
  ],
  "image-to-pdf": [
    "여러 장의 사진, 스캔 이미지, 캡처 이미지를 하나의 PDF로 묶습니다.",
    "제출용 이미지 자료를 PDF 문서 형태로 정리합니다.",
  ],
  "pdf-to-image": [
    "PDF 페이지를 PNG 이미지로 바꿔 썸네일이나 미리보기 자료로 사용합니다.",
    "문서 일부를 이미지로 저장해 메신저나 프레젠테이션에 넣습니다.",
  ],
  "srt-cleaner": [
    "번호가 꼬이거나 공백이 많은 SRT 자막을 안정적인 형식으로 정리합니다.",
    "영상 편집 전에 자막 파일의 기본 구조를 빠르게 다듬습니다.",
  ],
  "subtitle-converter": [
    "YouTube, 플레이어, 편집툴에 맞춰 SRT와 VTT 자막 형식을 바꿉니다.",
    "자막 텍스트를 붙여넣고 필요한 포맷으로 바로 저장합니다.",
  ],
  "subtitle-timing": [
    "영상보다 자막이 빠르거나 늦을 때 전체 싱크를 한 번에 보정합니다.",
    "초 단위 오프셋을 적용해 SRT/VTT 자막 시간을 일괄 수정합니다.",
  ],
};

const TOOL_EXTRA_FAQS = {
  "voice-to-text": {
    question: "음성 인식이 계속 끊길 때는 어떻게 하나요?",
    answer: "Chrome 또는 Edge에서 HTTPS 주소로 접속하고, 브라우저의 마이크 권한이 허용되어 있는지 확인하세요. 브라우저가 음성 인식을 중단하면 도구가 재연결을 시도합니다.",
  },
  "audio-file-transcription": {
    question: "녹음 파일이 서버로 업로드되나요?",
    answer: "아니요. 선택한 녹음 파일은 브라우저 안에서 처리합니다. 다만 처음 사용할 때 Transformers.js와 Whisper 모델 파일을 외부 CDN과 Hugging Face에서 내려받을 수 있으며, 긴 파일은 기기 성능에 따라 오래 걸릴 수 있습니다.",
  },
  "audio-editor": {
    question: "휴대폰 녹음 파일을 그대로 편집할 수 있나요?",
    answer: "iPhone 음성 메모와 Android 녹음 앱에서 흔한 m4a, aac, mp3, wav 파일을 브라우저가 읽을 수 있으면 서버 업로드 없이 파형 편집을 할 수 있습니다. 편집 결과는 호환성이 안정적인 WAV 파일로 저장합니다.",
  },
  "webcam-recorder": {
    question: "녹화 파일은 어떤 형식으로 저장되나요?",
    answer: "기본은 WebM이며, 브라우저가 지원하는 환경에서는 MP4 옵션도 선택할 수 있습니다. 배경 효과와 사용자 배경 이미지는 브라우저에서 처리됩니다.",
  },
  "ai-text-cleaner": {
    question: "AI 답변의 별표나 제목 표시를 제거할 수 있나요?",
    answer: "네. `**굵게**`, `### 제목`, 코드블록, 링크 표기, 과한 빈 줄을 목적에 맞게 정리할 수 있습니다. 원문을 직접 서버에 저장하지 않고 브라우저 안에서 처리합니다.",
  },
  "ai-table-converter": {
    question: "표 앞뒤 설명 문구가 있어도 표만 변환할 수 있나요?",
    answer: "네. AI 답변 전체를 붙여넣어도 마크다운 표, 파이프 표, TSV, CSV 형태를 찾아 표 데이터만 분리합니다. 셀 안의 별표, 링크, 코드 같은 서식 흔적 제거 여부도 선택할 수 있습니다.",
  },
  "csv-excel-converter": {
    question: "CSV 파일을 올리면 서버로 전송되나요?",
    answer: "아니요. 선택한 CSV, TSV, XLSX 파일은 브라우저에서 읽고 변환합니다. 변환 라이브러리 파일은 CDN에서 내려받지만 사용자가 올린 파일명, 내용, 결과 데이터는 분석 이벤트나 자체 서버로 보내지 않습니다.",
  },
  "character-counter": {
    question: "공백 제외 글자수도 계산되나요?",
    answer: "네. 공백 포함 글자수와 공백 제외 글자수, 단어 수, 줄 수, 바이트 수를 함께 보여줍니다. 자기소개서, 과제, 블로그 원고처럼 제출 기준이 있는 글을 점검할 때 유용합니다.",
  },
  "line-break-cleaner": {
    question: "마침표 기준으로 문장을 정리할 수 있나요?",
    answer: "문장 중간 줄바꿈을 합치고 문단 단위로 정리할 수 있습니다. 마침표 뒤 줄바꿈이 필요한 경우 옵션을 조정해 문장 흐름에 맞게 사용할 수 있습니다.",
  },
  "markdown-editor": {
    question: "빈 문서에서도 버튼만 눌러 마크다운을 작성할 수 있나요?",
    answer: "네. 제목, 목록, 체크리스트, 표, 코드블록 같은 기본 문법을 버튼으로 넣고 바로 편집할 수 있습니다.",
  },
  "markdown-viewer": {
    question: "MD 파일 안의 HTML도 그대로 실행되나요?",
    answer: "아니요. 원문은 브라우저에서만 읽고, 마크다운 미리보기는 HTML을 escape한 뒤 렌더링합니다. 파일 안의 스크립트나 원시 HTML을 실행하지 않습니다.",
  },
  "text-extractor": {
    question: "이메일, URL, 전화번호를 따로 복사할 수 있나요?",
    answer: "네. 비정형 텍스트에서 항목별로 추출해 필요한 목록만 복사할 수 있도록 정리합니다.",
  },
  "duplicate-line-remover": {
    question: "대소문자나 앞뒤 공백이 다른 중복도 정리되나요?",
    answer: "옵션을 사용하면 앞뒤 공백을 정리하고 대소문자 기준을 맞춰 중복 줄을 제거할 수 있습니다.",
  },
  "find-replace": {
    question: "여러 번 반복되는 단어를 한 번에 바꿀 수 있나요?",
    answer: "네. 찾을 값과 바꿀 값을 입력하면 문서 안의 일치 항목을 일괄 치환할 수 있습니다.",
  },
  "case-converter": {
    question: "camelCase나 snake_case도 만들 수 있나요?",
    answer: "네. 영문 문장이나 키워드를 camelCase, snake_case, kebab-case 등 업무와 개발에 자주 쓰는 형태로 변환할 수 있습니다.",
  },
  "text-diff": {
    question: "두 문서의 수정된 부분만 확인할 수 있나요?",
    answer: "두 텍스트를 줄 단위로 비교해 추가, 삭제, 유지된 부분을 시각적으로 나누어 보여줍니다.",
  },
  "qr-code-generator": {
    question: "QR 코드를 PNG나 JPG로 저장할 수 있나요?",
    answer: "네. URL, 일반 텍스트, Wi-Fi 정보를 QR 코드로 만들고 SVG, PNG, JPG 형식으로 저장할 수 있습니다. 인식 안정성을 위해 최소 여백과 색상 대비를 유지합니다.",
  },
  "qr-link-extractor": {
    question: "QR 이미지를 서버에 업로드하나요?",
    answer: "아니요. 선택한 이미지는 브라우저 안에서만 읽고 QR 내용도 자동으로 열지 않습니다. 추출된 링크는 사용자가 직접 복사하거나 새 탭으로 열 수 있습니다.",
  },
  "screenshot-saver": {
    question: "Win+Shift+S 캡처가 바로 저장되나요?",
    answer: "네. Windows에서 Win+Shift+S로 영역을 캡처한 뒤 이 도구에 Ctrl+V로 붙여넣으면 기본값으로 PNG 파일을 즉시 다운로드합니다. 이미지는 브라우저 안에서만 처리하고 서버로 업로드하지 않습니다.",
  },
  "image-resizer": {
    question: "비율을 유지하면서 이미지 크기를 바꿀 수 있나요?",
    answer: "네. 가로세로 비율 유지 옵션으로 이미지가 찌그러지지 않게 크기를 조정할 수 있습니다.",
  },
  "image-converter": {
    question: "JPG, PNG, WEBP 사이 변환이 가능한가요?",
    answer: "브라우저가 지원하는 범위에서 JPG, PNG, WEBP 형식으로 변환할 수 있습니다.",
  },
  "image-compressor": {
    question: "압축하면 화질을 조정할 수 있나요?",
    answer: "네. 품질과 최대 너비를 조정해 용량과 화질의 균형을 맞출 수 있습니다. 결과 이미지는 브라우저에서 생성되며 원본 파일은 자체 서버에 저장하지 않습니다.",
  },
  "exif-metadata-remover": {
    question: "사진 위치정보가 서버로 업로드되나요?",
    answer: "아니요. JPG, PNG, WEBP 파일을 브라우저 안에서 읽고 개인정보성 메타데이터 청크를 제거합니다. 결과 파일을 내려받기 전까지 이미지와 메타데이터는 자체 서버로 전송되지 않습니다.",
  },
  "pdf-merge": {
    question: "PDF 파일은 서버로 업로드되나요?",
    answer: "아니요. 선택한 PDF는 브라우저에서 합쳐지며 코워크스페이스 자체 서버에 저장하지 않습니다. 파일 크기가 큰 경우에는 브라우저 메모리 상태에 따라 처리 속도가 달라질 수 있습니다.",
  },
  "pdf-split": {
    question: "몇 페이지마다 PDF를 나눌 수 있나요?",
    answer: "페이지 묶음 기준을 입력해 원하는 간격으로 PDF를 여러 파일로 분할할 수 있습니다.",
  },
  "pdf-extract-pages": {
    question: "1-3,5,9 같은 페이지 범위 입력이 가능한가요?",
    answer: "네. 필요한 페이지 범위를 입력해 해당 페이지만 새 PDF로 추출할 수 있습니다.",
  },
  "image-to-pdf": {
    question: "여러 이미지를 하나의 PDF로 만들 수 있나요?",
    answer: "네. 여러 장의 이미지를 선택한 순서대로 PDF 페이지로 묶을 수 있습니다.",
  },
  "pdf-to-image": {
    question: "PDF 페이지를 이미지로 저장할 수 있나요?",
    answer: "네. PDF 페이지를 브라우저에서 렌더링한 뒤 PNG 이미지로 저장할 수 있습니다.",
  },
  "srt-cleaner": {
    question: "SRT 번호를 다시 정리할 수 있나요?",
    answer: "네. 자막 블록 번호를 다시 매기고 과한 공백과 줄바꿈을 정리할 수 있습니다.",
  },
  "subtitle-converter": {
    question: "SRT와 VTT를 서로 변환할 수 있나요?",
    answer: "네. SRT를 VTT로, VTT를 SRT로 변환해 영상 플랫폼이나 플레이어에 맞게 사용할 수 있습니다.",
  },
  "subtitle-timing": {
    question: "전체 자막 시간을 한 번에 밀 수 있나요?",
    answer: "네. 초 단위 값을 입력해 전체 자막 시간을 앞이나 뒤로 일괄 보정할 수 있습니다.",
  },
};

function getToolVisual(tool) {
  if (!IS_KOREAN_LOCALE) {
    const localizedVisual = (APP_LOCALE === "en" ? TOOL_VISUALS_EN : {})[tool.id] || {};
    const baseVisual = TOOL_VISUALS[tool.id] || {};
    return {
      icon: localizedVisual.icon || baseVisual.icon || tool.title.slice(0, 1),
      tone: localizedVisual.tone || baseVisual.tone || "slate",
      copy: localizedVisual.copy || tool.summary,
    };
  }
  return TOOL_VISUALS[tool.id] || {
    icon: tool.title.slice(0, 1),
    tone: "slate",
    copy: tool.summary,
  };
}

function getToolScenarios(tool) {
  if (IS_KOREAN_LOCALE && TOOL_SCENARIOS[tool.id]) {
    return TOOL_SCENARIOS[tool.id];
  }

  const localizedLines =
    APP_LOCALE === "en" ? TOOL_SCENARIO_LINES_EN[tool.id] : tool.scenarioLines || LOCALIZED_TOOL_SCENARIO_LINES[APP_LOCALE]?.[tool.id];
  if (localizedLines?.length) {
    return buildScenarioCardsFromLines(tool, localizedLines);
  }

  if (tool.guide?.length) {
    return tool.guide.map((step) => ({
      title: step.title,
      body: step.text,
      check: "",
    }));
  }

  return buildScenarioCardsFromLines(tool, [t("fallbackExample1", tool.title), t("fallbackExample2", tool.title)]);
}

function buildScenarioCardsFromLines(tool, lines) {
  return lines.map((line, index) => ({
    title: buildScenarioTitle(line, index),
    body: line,
    check: "",
  }));
}

function buildScenarioTitle(line, index) {
  const firstSentence = line.split(/[.!?。！？]/)[0]?.trim() || line.trim();
  const maxLength = APP_LOCALE === "en" ? 64 : 32;
  if (firstSentence.length <= maxLength) return firstSentence;
  return `${firstSentence.slice(0, maxLength - 1)}...`;
}

const ENGLISH_WORKSPACE_TEXT = {
  "녹음 파일 간편 편집기": "Audio Trimmer & Joiner",
  "휴대폰 녹음 파일을 서버 업로드 없이 브라우저에서 열고, 파형을 보며 구간을 자르고 붙인 뒤 WAV 파일로 저장합니다.":
    "Open a phone recording in your browser, edit ranges on the waveform, and save the result as a WAV file without uploading it to the application server.",
  "파일 없음": "No file",
  "선택 없음": "No selection",
  "WAV 저장": "Save WAV",
  "휴대폰 녹음 파일 선택": "Choose phone recording",
  "iPhone 음성 메모와 Android 녹음 앱에서 흔한 m4a, aac, mp3, wav 파일을 우선 지원합니다. 파일은 코워크스페이스 서버로 업로드하지 않고, 브라우저가 읽을 수 있는 경우에만 편집합니다.":
    "Common m4a, aac, mp3, and wav files from iPhone Voice Memos and Android recorder apps are the support target. Files are not uploaded to the ko-workspace server, and editing is available when the browser can decode the format.",
  "파형 편집": "Waveform Editing",
  "파일을 선택하면 파형이 표시됩니다. 파형을 드래그해 구간을 선택하고, 클릭하면 붙여넣을 위치가 이동합니다.":
    "Choose a file to show the waveform. Drag on the waveform to select a range, or click to move the paste/playhead position.",
  "녹음 파일 파형": "Recording waveform",
  "재생 위치 0:00": "Playhead 0:00",
  "선택 구간 없음": "No selected range",
  "전체 재생": "Play All",
  "선택 재생": "Play Selection",
  "정지": "Stop",
  "간편 편집": "Quick Edit",
  "선택 구간을 만들면 삭제, 복사, 음량 조절을 적용할 수 있습니다.":
    "Create a selected range to delete, copy, paste, or adjust volume.",
  "선택 삭제": "Delete Selection",
  "선택만 남기기": "Keep Selection",
  "선택 복사": "Copy Selection",
  "붙이기": "Paste",
  "음량 조절": "Volume",
  "선택 구간이 있으면 선택 구간에만, 없으면 전체 녹음에 적용합니다.":
    "Applies to the selected range when one exists, otherwise to the full recording.",
  "음량 적용": "Apply Volume",
  "실행 취소": "Undo",
  "다시 실행": "Redo",
  "브라우저 기반 간편 편집입니다.": "This is a browser-based quick editor.",
  "편집 중 원본 녹음과 결과 파일은 서버로 보내지지 않습니다. 다만 긴 휴대폰 녹음은 기기 메모리와 브라우저 코덱 지원에 따라 열리지 않을 수 있고, 결과 저장은 호환성이 안정적인 WAV 형식으로 제공합니다.":
    "The original recording and edited result are not sent to the application server while editing. Very long recordings may still depend on device memory and browser codec support, and output is saved as WAV for compatibility.",
  "처음 상태로": "Reset",
  "파일 읽는 중": "Reading file",
  "휴대폰 녹음 파일을 브라우저에서 디코딩하고 있습니다.": "Decoding the phone recording in the browser.",
  "편집 준비": "Ready to edit",
  "파형을 드래그해 구간을 선택하거나, 클릭해 붙여넣을 위치를 지정하세요.":
    "Drag on the waveform to select a range, or click to set the paste position.",
  "읽기 실패": "Read failed",
  "브라우저가 이 휴대폰 녹음 형식을 읽지 못했습니다. m4a, aac, mp3, wav 형식이더라도 기기와 코덱에 따라 Chrome 또는 Edge에서 다시 시도해야 할 수 있습니다.":
    "The browser could not read this phone recording format. Even m4a, aac, mp3, or wav files may need Chrome or Edge depending on the device and codec.",
  "선택 구간을 삭제했습니다.": "Deleted the selected range.",
  "선택 구간만 남겼습니다.": "Kept only the selected range.",
  "복사한 구간을 붙였습니다.": "Pasted the copied range.",
  "이전 편집 상태로 되돌렸습니다.": "Returned to the previous edit state.",
  "되돌린 편집을 다시 적용했습니다.": "Reapplied the reverted edit.",
  "처음 불러온 상태로 되돌렸습니다.": "Restored the initially loaded state.",
  "현재 브라우저는 오디오 재생 편집을 지원하지 않습니다.": "This browser does not support audio playback editing.",
  "편집 결과를 WAV 파일로 저장했습니다.": "Saved the edited result as a WAV file.",
  "녹음 파일을 선택하면 파형이 표시됩니다.": "Choose a recording to show the waveform.",
  "편집할 녹음 파일을 선택해 주세요.": "Choose a recording to edit.",
  "현재 브라우저는 녹음 파일 편집에 필요한 오디오 디코딩을 지원하지 않습니다.":
    "This browser does not support the audio decoding required for recording editing.",
  "녹음 파일에서 편집할 수 있는 오디오 데이터를 찾지 못했습니다.": "No editable audio data was found in the recording.",
  "브라우저가 이 녹음 파일을 편집용 파형으로 변환하지 못했습니다.":
    "The browser could not convert this recording into an editable waveform.",
  "길이 확인 불가": "Duration unavailable",
  "서버 업로드 없이 브라우저에서 처리합니다.": "Processed in the browser without application-server upload.",
  "녹음 파일 텍스트 변환": "Audio File Transcription",
  "녹음 파일": "Audio file",
  "파일 선택": "Choose File",
  "텍스트 변환": "Transcribe",
  "변환 중...": "Transcribing...",
  "모델 대기": "Model ready",
  "변환 중": "Transcribing",
  "완료": "Done",
  "오류": "Error",
  "파일을 선택해 주세요.": "Choose a file.",
  "파일을 불러오는 중입니다.": "Loading file.",
  "결과": "Result",
  "결과 복사": "Copy Result",
  "TXT 저장": "Save TXT",
  "문장 줄바꿈 적용": "Apply sentence breaks",
  "한국어 우선": "Prefer Korean",
  "자동 감지": "Auto detect",
  "입력": "Input",
  "출력": "Output",
  "원문": "Original",
  "복사": "Copy",
  "저장": "Save",
  "다운로드": "Download",
  "초기화": "Reset",
  "삭제": "Delete",
  "적용": "Apply",
  "변환": "Convert",
  "실행": "Run",
  "정리": "Clean",
  "추출": "Extract",
  "만들기": "Create",
  "파일": "File",
  "옵션": "Options",
  "미리보기": "Preview",
  "상태": "Status",
  "선택": "Selection",
  "전체": "All",
  "이미지 선택": "Choose Image",
  "PDF 선택": "Choose PDF",
  "자막 입력": "Subtitle Input",
  "자막 변환": "Convert Subtitles",
  "자막 정리": "Clean Subtitles",
  "시간 보정": "Shift Timing",
  "QR 만들기": "Create QR",
  "QR 읽기": "Read QR",
  "이미지 압축": "Compress Image",
  "이미지 변환": "Convert Image",
  "이미지 크기 조절": "Resize Image",
  "메타데이터 제거": "Remove Metadata",
  "PDF 합치기": "Merge PDF",
  "PDF 분할": "Split PDF",
  "PDF 페이지 추출": "Extract PDF Pages",
  "이미지 PDF 변환": "Images to PDF",
  "PDF 이미지 변환": "PDF to Image",
  "마크다운 입력": "Markdown Input",
  "마크다운 서식": "Markdown Formatting",
  "마크다운 복사": "Copy Markdown",
  "일반 텍스트 복사": "Copy Plain Text",
  "글자수 세기": "Character Counter",
  "줄바꿈·공백 정리": "Line Break Cleaner",
  "중복 줄 제거": "Duplicate Line Remover",
  "찾기 및 바꾸기": "Find and Replace",
  "대소문자 변환": "Case Converter",
  "텍스트 비교기": "Text Diff Checker",
  "이메일·URL·전화번호 추출기": "Email, URL & Phone Extractor",
  "AI 복붙 서식 정리": "AI Paste Cleaner",
  "AI 표 복붙 변환기": "AI Table Converter",
  "CSV 엑셀 변환기": "CSV Excel Converter",
  "웹캠 녹화기": "Webcam Recorder",
  "카메라 연결": "Connect Camera",
  "카메라 다시 연결": "Reconnect Camera",
  "카메라 권한 요청": "Request Camera Permission",
  "권한 다시 요청": "Request Permission Again",
  "권한 재확인": "Check Permission Again",
  "카메라 중지": "Stop Camera",
  "녹화 시작": "Start Recording",
  "일시정지": "Pause",
  "다시 시작": "Resume",
  "녹화 중지": "Stop Recording",
  "영상 저장": "Save Video",
};

const WORKSPACE_COMMON_TEXT = [
  [
    `문제가 계속되면 ${SUPPORT_EMAIL}으로 연락해 주세요.`,
    {
      en: `If the problem continues, contact ${SUPPORT_EMAIL}.`,
      ja: `問題が続く場合は ${SUPPORT_EMAIL} までご連絡ください。`,
      zh: `如果问题仍然存在，请联系 ${SUPPORT_EMAIL}。`,
    },
  ],
  ["파일 없음", { en: "No file", ja: "ファイルなし", zh: "无文件" }],
  ["선택 없음", { en: "No selection", ja: "未選択", zh: "未选择" }],
  ["파일 선택", { en: "Choose file", ja: "ファイルを選択", zh: "选择文件" }],
  ["파일 열기", { en: "Open file", ja: "ファイルを開く", zh: "打开文件" }],
  ["파일 저장", { en: "Save file", ja: "ファイルを保存", zh: "保存文件" }],
  ["파일 확인", { en: "File check", ja: "ファイル確認", zh: "文件检查" }],
  ["파일 선택 또는 끌어다 놓기", { en: "Choose or drop a file", ja: "ファイルを選択またはドロップ", zh: "选择文件或拖放到此处" }],
  ["선택 파일", { en: "Selected file", ja: "選択中のファイル", zh: "已选文件" }],
  ["선택한 파일이 없습니다.", { en: "No file selected.", ja: "ファイルが選択されていません。", zh: "尚未选择文件。" }],
  ["지원하지 않는 파일 형식입니다. 파일 형식을 확인해 주세요.", { en: "Unsupported file format. Check the file type.", ja: "対応していないファイル形式です。形式を確認してください。", zh: "不支持的文件格式，请检查文件类型。" }],
  ["이 브라우저에서는 드래그 업로드를 지원하지 않습니다. 파일 선택 버튼을 사용해 주세요.", { en: "This browser does not support drag upload. Use the file picker.", ja: "このブラウザではドラッグアップロードに対応していません。ファイル選択ボタンを使用してください。", zh: "此浏览器不支持拖放上传，请使用文件选择按钮。" }],
  ["파일명", { en: "File name", ja: "ファイル名", zh: "文件名" }],
  ["파일명 접두어", { en: "File name prefix", ja: "ファイル名の接頭辞", zh: "文件名前缀" }],
  ["저장 파일명", { en: "Save file name", ja: "保存ファイル名", zh: "保存文件名" }],
  ["저장 형식", { en: "Save format", ja: "保存形式", zh: "保存格式" }],
  ["결과", { en: "Result", ja: "結果", zh: "结果" }],
  ["결과 복사", { en: "Copy result", ja: "結果をコピー", zh: "复制结果" }],
  ["결과 지우기", { en: "Clear result", ja: "結果を消去", zh: "清除结果" }],
  ["결과 파일", { en: "Result file", ja: "結果ファイル", zh: "结果文件" }],
  ["입력", { en: "Input", ja: "入力", zh: "输入" }],
  ["출력", { en: "Output", ja: "出力", zh: "输出" }],
  ["원문", { en: "Original", ja: "原文", zh: "原文" }],
  ["원본", { en: "Original", ja: "元データ", zh: "原始" }],
  ["원문 입력", { en: "Original text", ja: "原文入力", zh: "原文输入" }],
  ["미리보기", { en: "Preview", ja: "プレビュー", zh: "预览" }],
  ["상태", { en: "Status", ja: "状態", zh: "状态" }],
  ["옵션", { en: "Options", ja: "オプション", zh: "选项" }],
  ["형식", { en: "Format", ja: "形式", zh: "格式" }],
  ["대상 형식", { en: "Target format", ja: "変換先形式", zh: "目标格式" }],
  ["원본 형식", { en: "Source format", ja: "元の形式", zh: "原始格式" }],
  ["출력 형식", { en: "Output format", ja: "出力形式", zh: "输出格式" }],
  ["변환 형식", { en: "Conversion format", ja: "変換形式", zh: "转换格式" }],
  ["저장", { en: "Save", ja: "保存", zh: "保存" }],
  ["복사", { en: "Copy", ja: "コピー", zh: "复制" }],
  ["브라우저에서 복사를 허용하지 않았습니다.", { en: "The browser did not allow copying.", ja: "ブラウザがコピーを許可しませんでした。", zh: "浏览器未允许复制。" }],
  ["복사할 텍스트가 없습니다.", { en: "There is no text to copy.", ja: "コピーするテキストがありません。", zh: "没有可复制的文本。" }],
  ["입력 텍스트를 복사했습니다.", { en: "Input text copied.", ja: "入力テキストをコピーしました。", zh: "已复制输入文本。" }],
  ["먼저 정리 결과를 만들어 주세요.", { en: "Create a cleaned result first.", ja: "先に整えた結果を作成してください。", zh: "请先生成清理结果。" }],
  ["먼저 결과를 만들어 주세요.", { en: "Create a result first.", ja: "先に結果を作成してください。", zh: "请先生成结果。" }],
  ["먼저 치환 결과를 만들어 주세요.", { en: "Create a replacement result first.", ja: "先に置換結果を作成してください。", zh: "请先生成替换结果。" }],
  ["먼저 변환 결과를 만들어 주세요.", { en: "Create a converted result first.", ja: "先に変換結果を作成してください。", zh: "请先生成转换结果。" }],
  ["먼저 보정 결과를 만들어 주세요.", { en: "Create an adjusted result first.", ja: "先に補正結果を作成してください。", zh: "请先生成校正结果。" }],
  ["복사할 결과가 없습니다.", { en: "There is no result to copy.", ja: "コピーする結果がありません。", zh: "没有可复制的结果。" }],
  ["복사할 내용 없습니다.", { en: "There is no content to copy.", ja: "コピーする内容がありません。", zh: "没有可复制的内容。" }],
  ["복사할 내용이 없습니다.", { en: "There is no content to copy.", ja: "コピーする内容がありません。", zh: "没有可复制的内容。" }],
  ["정리 결과를 복사했습니다.", { en: "Cleaned result copied.", ja: "整えた結果をコピーしました。", zh: "已复制清理结果。" }],
  ["추출 결과를 복사했습니다.", { en: "Extracted result copied.", ja: "抽出結果をコピーしました。", zh: "已复制提取结果。" }],
  ["변환 결과를 복사했습니다.", { en: "Converted result copied.", ja: "変換結果をコピーしました。", zh: "已复制转换结果。" }],
  ["일반 텍스트를 복사했습니다.", { en: "Plain text copied.", ja: "プレーンテキストをコピーしました。", zh: "已复制纯文本。" }],
  ["마크다운을 복사했습니다.", { en: "Markdown copied.", ja: "Markdownをコピーしました。", zh: "已复制 Markdown。" }],
  ["치환 결과를 복사했습니다.", { en: "Replacement result copied.", ja: "置換結果をコピーしました。", zh: "已复制替换结果。" }],
  ["클립보드에 복사했습니다.", { en: "Copied to the clipboard.", ja: "クリップボードにコピーしました。", zh: "已复制到剪贴板。" }],
  ["QR 결과를 복사했습니다.", { en: "QR result copied.", ja: "QRの結果をコピーしました。", zh: "已复制二维码结果。" }],
  ["QR에서 URL을 찾았습니다. 주소를 확인한 뒤 열거나 복사하세요.", { en: "Found a URL in the QR code. Check the address, then open or copy it.", ja: "QRコードからURLを見つけました。アドレスを確認してから開くかコピーしてください。", zh: "已在二维码中找到 URL。请确认地址后再打开或复制。" }],
  ["정리된 SRT를 복사했습니다.", { en: "Cleaned SRT copied.", ja: "整えたSRTをコピーしました。", zh: "已复制整理后的 SRT。" }],
  ["보정된 자막을 복사했습니다.", { en: "Adjusted subtitles copied.", ja: "調整した字幕をコピーしました。", zh: "已复制校正后的字幕。" }],
  ["마크다운 원문을 복사했습니다.", { en: "Markdown source copied.", ja: "Markdown原文をコピーしました。", zh: "已复制 Markdown 原文。" }],
  ["다운로드", { en: "Download", ja: "ダウンロード", zh: "下载" }],
  ["초기화", { en: "Reset", ja: "リセット", zh: "重置" }],
  ["삭제", { en: "Delete", ja: "削除", zh: "删除" }],
  ["적용", { en: "Apply", ja: "適用", zh: "应用" }],
  ["변환", { en: "Convert", ja: "変換", zh: "转换" }],
  ["실행", { en: "Run", ja: "実行", zh: "运行" }],
  ["정리", { en: "Clean", ja: "整える", zh: "清理" }],
  ["추출", { en: "Extract", ja: "抽出", zh: "提取" }],
  ["만들기", { en: "Create", ja: "作成", zh: "生成" }],
  ["선택", { en: "Selection", ja: "選択", zh: "选择" }],
  ["전체", { en: "All", ja: "すべて", zh: "全部" }],
  ["목록", { en: "list", ja: "一覧", zh: "列表" }],
  ["열기", { en: "Open", ja: "開く", zh: "打开" }],
  ["하기", { en: "", ja: "", zh: "" }],
  ["브라우저", { en: "Browser", ja: "ブラウザ", zh: "浏览器" }],
  ["대기", { en: "Ready", ja: "待機中", zh: "待机" }],
  ["완료", { en: "Done", ja: "完了", zh: "完成" }],
  ["오류", { en: "Error", ja: "エラー", zh: "错误" }],
  ["품질", { en: "Quality", ja: "品質", zh: "质量" }],
  ["영어", { en: "English", ja: "英語", zh: "英语" }],
  ["일본어", { en: "Japanese", ja: "日本語", zh: "日语" }],
  ["중국어", { en: "Chinese", ja: "中国語", zh: "中文" }],
  ["한국어 우선", { en: "Prefer Korean", ja: "韓国語優先", zh: "优先韩语" }],
  ["자동 감지", { en: "Auto detect", ja: "自動検出", zh: "自动检测" }],
  ["인식 언어", { en: "Recognition language", ja: "認識言語", zh: "识别语言" }],
  ["정확도 우선", { en: "Accuracy first", ja: "精度優先", zh: "优先准确度" }],
  [
    "정확도 우선은 더 큰 브라우저 모델을 사용해 ARS 안내, 공식 문구, 작은 발화를 더 잘 살리도록 시도합니다. 처음 실행할 때 모델 다운로드가 더 오래 걸릴 수 있습니다.",
    {
      en: "Accuracy-first mode uses a larger browser model to better preserve ARS prompts, formal wording, and quieter speech. The first model download can take longer.",
      ja: "精度優先では大きめのブラウザ用モデルを使い、案内音声や定型文、小さな声をできるだけ拾います。初回はモデルのダウンロードに時間がかかることがあります。",
      zh: "优先准确度会使用更大的浏览器模型，尽量保留语音提示、正式表述和较轻的说话声。首次下载模型可能需要更久。",
    },
  ],
  ["녹음 파일 텍스트 변환", { en: "Audio file transcription", ja: "録音ファイルの文字起こし", zh: "录音文件转文字" }],
  ["녹음 파일 텍스트 변환 열기", { en: "Open audio file transcription", ja: "録音ファイルの文字起こしを開く", zh: "打开录音转文字" }],
  ["녹음 파일", { en: "Audio file", ja: "録音ファイル", zh: "录音文件" }],
  ["서버 업로드 없이 브라우저 처리합니다.", { en: "Processed in the browser without server upload.", ja: "サーバーへアップロードせず、ブラウザ内で処理します。", zh: "不上传服务器，直接在浏览器中处理。" }],
  ["서버 업로드 없이 브라우저에서 처리합니다.", { en: "Processed in the browser without server upload.", ja: "サーバーへアップロードせず、ブラウザ内で処理します。", zh: "不上传服务器，直接在浏览器中处理。" }],
  ["텍스트 변환", { en: "Transcribe", ja: "文字起こし", zh: "转写" }],
  ["변환 중...", { en: "Transcribing...", ja: "変換中...", zh: "正在转换..." }],
  ["모델 대기", { en: "Model ready", ja: "モデル待機中", zh: "模型待机" }],
  ["변환 중", { en: "Transcribing", ja: "変換中", zh: "转换中" }],
  ["파일을 선택해 주세요.", { en: "Choose a file.", ja: "ファイルを選択してください。", zh: "请选择文件。" }],
  ["파일을 불러오는 중입니다.", { en: "Loading file.", ja: "ファイルを読み込んでいます。", zh: "正在读取文件。" }],
  ["문장 끝 기준 줄바꿈", { en: "Break lines at sentence endings", ja: "文末で改行", zh: "按句末换行" }],
  ["파일 준비", { en: "File ready", ja: "ファイル準備完了", zh: "文件已就绪" }],
  ["파일 확인 중", { en: "Checking file", ja: "ファイル確認中", zh: "正在检查文件" }],
  ["모델 준비 중", { en: "Preparing model", ja: "モデル準備中", zh: "正在准备模型" }],
  ["전처리 중", { en: "Preprocessing", ja: "前処理中", zh: "正在预处理" }],
  [
    "녹음 파일을 저장하지 않는 브라우저 변환 기능입니다. 파일을 서버에 업로드하지 않고 브라우저 안에서 처리하므로 작업 시간이 오래 걸리거나 인식 품질이 좋지 않을 수 있는 베타 버전입니다.",
    {
      en: "This browser transcription beta does not store recordings. Files are processed in your browser without server upload, so processing may take longer and recognition quality can vary.",
      ja: "録音を保存しないブラウザ内文字起こしベータです。ファイルはサーバーへアップロードせず端末内で処理するため、時間がかかったり認識精度が安定しない場合があります。",
      zh: "这是不保存录音的浏览器转写测试版。文件不会上传服务器，而是在浏览器内处理，因此可能耗时较长，识别质量也可能不稳定。",
    },
  ],
  [
    "m4a, mp3, wav, aac, webm, ogg 형식을 지원합니다. 파일은 코워크스페이스 서버로 업로드하지 않고 브라우저 안에서 처리합니다. 비저장 방식이라 전문 서버형 음성 인식보다 품질이 좋지 않을 수 있습니다.",
    {
      en: "Supports m4a, mp3, wav, aac, webm, and ogg. Files are processed in the browser and are not uploaded to the ko-workspace server. Because this is a no-storage browser workflow, quality may be lower than specialist server STT.",
      ja: "m4a、mp3、wav、aac、webm、ogg に対応します。ファイルはコーワークスペースのサーバーへアップロードせず、ブラウザ内で処理します。保存しない方式のため、専用サーバー型の音声認識より精度が落ちる場合があります。",
      zh: "支持 m4a、mp3、wav、aac、webm、ogg。文件不会上传到 ko-workspace 服务器，而是在浏览器内处理。由于是不保存的浏览器方式，效果可能不如专业服务器语音识别。",
    },
  ],
  [
    "5분 이하의 짧은 녹음 파일부터 테스트해 주세요.",
    {
      en: "Start with a short recording under 5 minutes.",
      ja: "まずは5分以内の短い録音でお試しください。",
      zh: "建议先用 5 分钟以内的短录音测试。",
    },
  ],
  [
    "변환된 텍스트 초안이 여기에 표시됩니다. 중요한 내용은 반드시 사람이 다시 확인해 주세요.",
    {
      en: "The draft transcript appears here. Always have a person review important content.",
      ja: "文字起こしの下書きがここに表示されます。重要な内容は必ず人が確認してください。",
      zh: "转写草稿会显示在这里。重要内容请务必人工复核。",
    },
  ],
  [
    "브라우저 안에서만 처리하는 베타 기능이라 전문 서버형 STT보다 품질이 낮을 수 있습니다.",
    {
      en: "This browser-only beta may be less accurate than specialist server STT.",
      ja: "ブラウザ内だけで処理するベータ機能のため、専用サーバー型STTより精度が低い場合があります。",
      zh: "这是仅在浏览器内处理的测试版，准确度可能低于专业服务器 STT。",
    },
  ],
  [
    "비저장 브라우저 변환 베타입니다.",
    {
      en: "No-storage browser transcription beta.",
      ja: "保存しないブラウザ文字起こしベータです。",
      zh: "不保存的浏览器转写测试版。",
    },
  ],
  [
    "녹음 내용은 서버로 업로드하지 않지만, 모델 파일은 외부 CDN과 Hugging Face에서 내려받습니다. 정확도 우선은 더 큰 브라우저 모델을 사용하므로 첫 실행이 느릴 수 있고, 개인 녹음 파일을 플랫폼 서버에 남기지 않는 대신 긴 회의나 통화 녹음에서는 여전히 누락·오인식이 생길 수 있습니다. 중요한 내용은 반드시 사람이 다시 확인해 주세요.",
    {
      en: "Your recording is not uploaded to the application server, but model files are downloaded from external CDN and Hugging Face. Accuracy-first mode uses a larger browser model, so the first run can be slow. Private recordings are not stored on the platform server, but long meetings or calls may still contain omissions or misrecognitions. Always review important content.",
      ja: "録音内容はサーバーへアップロードしませんが、モデルファイルは外部CDNとHugging Faceから取得します。精度優先では大きめのブラウザモデルを使うため初回実行が遅くなる場合があります。個人の録音をプラットフォームのサーバーに残さない一方、長い会議や通話では抜けや誤認識が起こることがあります。重要な内容は必ず確認してください。",
      zh: "录音内容不会上传到服务器，但模型文件会从外部 CDN 和 Hugging Face 下载。优先准确度会使用较大的浏览器模型，首次运行可能较慢。平台服务器不会保存个人录音，但长会议或通话仍可能出现漏识别或误识别。重要内容请务必复核。",
    },
  ],
  ["복사할 변환 결과가 없습니다.", { en: "There is no transcript to copy.", ja: "コピーする変換結果がありません。", zh: "没有可复制的转写结果。" }],
  ["저장할 변환 결과가 없습니다.", { en: "There is no transcript to save.", ja: "保存する変換結果がありません。", zh: "没有可保存的转写结果。" }],
  ["녹음 파일 간편 편집기", { en: "Audio trimmer and joiner", ja: "録音ファイル簡易編集", zh: "录音文件简易编辑器" }],
  ["녹음 파일 간편 편집기 열기", { en: "Open audio trimmer and joiner", ja: "録音ファイル簡易編集を開く", zh: "打开录音编辑器" }],
  ["휴대폰 녹음 파일 선택", { en: "Choose phone recording", ja: "スマホ録音ファイルを選択", zh: "选择手机录音文件" }],
  ["녹음 파일 파형", { en: "Recording waveform", ja: "録音波形", zh: "录音波形" }],
  ["녹음 파일 파형 스크롤 영역", { en: "Recording waveform scroll area", ja: "録音波形のスクロール領域", zh: "录音波形滚动区域" }],
  ["파형 편집", { en: "Waveform editing", ja: "波形編集", zh: "波形编辑" }],
  ["재생 위치 0:00", { en: "Playhead 0:00", ja: "再生位置 0:00", zh: "播放位置 0:00" }],
  ["선택 구간 없음", { en: "No selected range", ja: "選択範囲なし", zh: "未选择区间" }],
  ["선택 구간 없음 · 전체 0:00", { en: "No selection · Total 0:00", ja: "選択範囲なし · 全体 0:00", zh: "未选择区间 · 总时长 0:00" }],
  ["전체 재생", { en: "Play all", ja: "全体を再生", zh: "播放全部" }],
  ["선택 재생", { en: "Play selection", ja: "選択範囲を再生", zh: "播放所选区间" }],
  ["정지", { en: "Stop", ja: "停止", zh: "停止" }],
  ["간편 편집", { en: "Quick edit", ja: "かんたん編集", zh: "快速编辑" }],
  ["선택 삭제", { en: "Delete selection", ja: "選択範囲を削除", zh: "删除所选区间" }],
  ["선택만 남기기", { en: "Keep selection only", ja: "選択範囲だけ残す", zh: "仅保留所选区间" }],
  ["선택 복사", { en: "Copy selection", ja: "選択範囲をコピー", zh: "复制所选区间" }],
  ["붙이기", { en: "Paste", ja: "貼り付け", zh: "粘贴" }],
  ["음량 조절", { en: "Volume", ja: "音量調整", zh: "音量调整" }],
  ["음량 적용", { en: "Apply volume", ja: "音量を適用", zh: "应用音量" }],
  ["실행 취소", { en: "Undo", ja: "元に戻す", zh: "撤销" }],
  ["다시 실행", { en: "Redo", ja: "やり直す", zh: "重做" }],
  ["처음 상태로", { en: "Reset to start", ja: "最初の状態へ", zh: "恢复初始状态" }],
  ["확대 100%", { en: "Zoom 100%", ja: "ズーム 100%", zh: "缩放 100%" }],
  [
    "휴대폰 녹음 파일을 서버 업로드 없이 브라우저에서 열고, 파형을 보며 구간을 자르고 붙인 뒤 WAV 파일로 저장합니다.",
    {
      en: "Open a phone recording in your browser, edit ranges on the waveform, and save the result as a WAV file without server upload.",
      ja: "スマホの録音をサーバーへアップロードせずブラウザで開き、波形を見ながら区間を切り貼りしてWAVで保存します。",
      zh: "无需上传服务器，直接在浏览器中打开手机录音，按波形剪切、粘贴区间后保存为 WAV 文件。",
    },
  ],
  [
    "iPhone 음성 메모와 Android 녹음 앱에서 흔한 m4a, aac, mp3, wav 파일을 우선 지원합니다. 파일은 코워크스페이스 서버로 업로드하지 않고, 브라우저가 읽을 수 있는 경우에만 편집합니다.",
    {
      en: "Targets common m4a, aac, mp3, and wav files from iPhone Voice Memos and Android recorder apps. Files are not uploaded to the ko-workspace server, and editing works when your browser can decode them.",
      ja: "iPhoneボイスメモやAndroid録音アプリで一般的な m4a、aac、mp3、wav を優先して対応します。ファイルはコーワークスペースのサーバーへアップロードせず、ブラウザで読み込める場合に編集できます。",
      zh: "优先支持 iPhone 语音备忘录和 Android 录音应用常见的 m4a、aac、mp3、wav。文件不会上传到 ko-workspace 服务器，只有浏览器可解码时才能编辑。",
    },
  ],
  [
    "파일을 선택하면 파형이 표시됩니다. 파형을 드래그해 구간을 선택하고, 클릭하면 붙여넣을 위치가 이동합니다. 마우스 휠로 확대/축소하고, 가로 스크롤로 긴 녹음을 이동할 수 있습니다.",
    {
      en: "Choose a file to show the waveform. Drag to select a range, click to move the paste point, use the mouse wheel to zoom, and scroll horizontally through long recordings.",
      ja: "ファイルを選ぶと波形が表示されます。ドラッグで範囲を選択し、クリックで貼り付け位置を移動できます。マウスホイールで拡大縮小し、横スクロールで長い録音を移動できます。",
      zh: "选择文件后会显示波形。拖动可选择区间，点击可移动粘贴位置。可用鼠标滚轮缩放，并横向滚动查看长录音。",
    },
  ],
  [
    "선택 구간을 만들면 삭제, 복사, 음량 조절을 적용할 수 있습니다.",
    {
      en: "Select a range to delete, copy, paste, or adjust volume.",
      ja: "範囲を選択すると、削除、コピー、貼り付け、音量調整ができます。",
      zh: "选择区间后，可以删除、复制、粘贴或调整音量。",
    },
  ],
  [
    "선택 구간이 있으면 선택 구간에만, 없으면 전체 녹음에 적용합니다.",
    {
      en: "Applies to the selected range when one exists, otherwise to the full recording.",
      ja: "選択範囲がある場合はその範囲だけに、ない場合は録音全体に適用します。",
      zh: "如有选区则仅应用到选区，否则应用到整段录音。",
    },
  ],
  [
    "브라우저 기반 간편 편집입니다.",
    {
      en: "Browser-based quick editing.",
      ja: "ブラウザだけで使える簡易編集です。",
      zh: "基于浏览器的快速编辑。",
    },
  ],
  [
    "편집 중 원본 녹음과 결과 파일은 서버로 보내지지 않습니다. 다만 긴 휴대폰 녹음은 기기 메모리와 브라우저 코덱 지원에 따라 열리지 않을 수 있고, 결과 저장은 호환성이 안정적인 WAV 형식으로 제공합니다.",
    {
      en: "The original recording and edited result are not sent to the server. Very long recordings may still depend on device memory and browser codec support, and results are saved as broadly compatible WAV files.",
      ja: "編集中、元の録音と結果ファイルはサーバーへ送信されません。ただし長い録音は端末メモリやブラウザのコーデック対応によって開けない場合があり、保存形式は互換性の高いWAVです。",
      zh: "编辑过程中，原始录音和结果文件不会发送到服务器。但较长录音可能受设备内存和浏览器编解码支持影响，结果会以兼容性较高的 WAV 保存。",
    },
  ],
  ["파일 읽는 중", { en: "Reading file", ja: "ファイル読み込み中", zh: "正在读取文件" }],
  ["편집 준비", { en: "Ready to edit", ja: "編集準備完了", zh: "已准备编辑" }],
  ["읽기 실패", { en: "Read failed", ja: "読み込み失敗", zh: "读取失败" }],
  ["불러옴", { en: "Loaded", ja: "読み込み済み", zh: "已加载" }],
  ["선택 구간을 삭제했습니다.", { en: "Deleted the selected range.", ja: "選択範囲を削除しました。", zh: "已删除所选区间。" }],
  ["선택 구간만 남겼습니다.", { en: "Kept only the selected range.", ja: "選択範囲だけを残しました。", zh: "已仅保留所选区间。" }],
  ["복사한 구간을 붙였습니다.", { en: "Pasted the copied range.", ja: "コピーした範囲を貼り付けました。", zh: "已粘贴复制的区间。" }],
  ["구간 선택됨", { en: "Range selected", ja: "範囲を選択中", zh: "已选择区间" }],
  ["편집 결과를 WAV 파일로 저장했습니다.", { en: "Saved the edited audio as a WAV file.", ja: "編集結果をWAVファイルとして保存しました。", zh: "已将编辑结果保存为 WAV 文件。" }],
  ["카메라", { en: "Camera", ja: "カメラ", zh: "摄像头" }],
  ["마이크", { en: "Microphone", ja: "マイク", zh: "麦克风" }],
  ["웹캠 녹화", { en: "Webcam recording", ja: "Webカメラ録画", zh: "摄像头录制" }],
  ["웹캠 녹화기", { en: "Webcam recorder", ja: "Webカメラ録画", zh: "摄像头录制器" }],
  ["웹캠 녹화기 열기", { en: "Open webcam recorder", ja: "Webカメラ録画を開く", zh: "打开摄像头录制器" }],
  ["카메라 권한이 필요합니다", { en: "Camera permission is required", ja: "カメラ権限が必要です", zh: "需要摄像头权限" }],
  ["카메라 권한 허용됨", { en: "Camera permission allowed", ja: "カメラ権限を許可済み", zh: "摄像头权限已允许" }],
  ["카메라 연결됨", { en: "Camera connected", ja: "カメラ接続済み", zh: "摄像头已连接" }],
  ["현재 카메라가 연결되어 있습니다.", { en: "The camera is currently connected.", ja: "現在カメラが接続されています。", zh: "摄像头当前已连接。" }],
  ["권한 필요", { en: "Permission required", ja: "権限が必要です", zh: "需要权限" }],
  ["권한 허용됨", { en: "Permission allowed", ja: "権限を許可済み", zh: "权限已允许" }],
  ["권한 차단됨", { en: "Permission blocked", ja: "権限がブロックされています", zh: "权限已被阻止" }],
  ["브라우저에서 권한이 차단되어 있습니다", { en: "Permission is blocked in the browser", ja: "ブラウザで権限がブロックされています", zh: "权限已在浏览器中被阻止" }],
  ["권한 요청 창이 뜨지 않으면 직접 허용 방법을 눌러 사이트 설정에서 카메라 권한을 허용해 주세요.", { en: "If the prompt does not appear, use the manual steps to allow camera access in site settings.", ja: "ダイアログが出ない場合は、手動の手順でサイト設定からカメラ権限を許可してください。", zh: "如果没有出现提示，请按手动步骤在网站设置中允许摄像头权限。" }],
  ["카메라 권한 요청", { en: "Request camera permission", ja: "カメラ権限をリクエスト", zh: "请求摄像头权限" }],
  ["직접 허용 방법", { en: "How to allow manually", ja: "手動で許可する方法", zh: "手动允许的方法" }],
  ["권한 창이 뜨지 않을 때", { en: "If the permission prompt does not appear", ja: "権限ダイアログが出ないとき", zh: "如果权限弹窗没有出现" }],
  ["권한 요청 버튼을 누르면 브라우저 권한 창이 열립니다.", { en: "Press the permission button to open the browser permission prompt.", ja: "権限ボタンを押すとブラウザの許可ダイアログが開きます。", zh: "点击权限按钮后，浏览器会打开权限提示。" }],
  ["허용됨", { en: "allowed", ja: "許可済み", zh: "已允许" }],
  ["차단됨", { en: "blocked", ja: "ブロック中", zh: "已阻止" }],
  ["요청 전", { en: "not requested", ja: "未リクエスト", zh: "尚未请求" }],
  ["마이크 미포함", { en: "Microphone not included", ja: "マイクなし", zh: "不包含麦克风" }],
  [
    "권한 요청 버튼을 누르면 브라우저 권한 창이 열립니다. 카메라 요청 전, 마이크 요청 전.",
    {
      en: "Press the permission button to open the browser permission prompt before using the camera or microphone.",
      ja: "権限ボタンを押すと、カメラやマイクを使う前にブラウザの許可ダイアログが開きます。",
      zh: "点击权限按钮后，浏览器会在使用摄像头或麦克风前显示权限提示。",
    },
  ],
  ["주소창 왼쪽의 자물쇠 또는 사이트 설정 아이콘을 누릅니다.", { en: "Click the lock or site settings icon at the left of the address bar.", ja: "アドレスバー左側の鍵またはサイト設定アイコンを押します。", zh: "点击地址栏左侧的锁形或网站设置图标。" }],
  ["카메라와 필요한 경우 마이크를 허용으로 변경합니다.", { en: "Allow the camera and, if needed, the microphone.", ja: "カメラと必要に応じてマイクを許可に変更します。", zh: "将摄像头以及需要时的麦克风改为允许。" }],
  ["페이지를 새로고침한 뒤 권한 요청 버튼을 다시 누릅니다.", { en: "Refresh the page, then press the permission button again.", ja: "ページを再読み込みしてから、権限ボタンをもう一度押します。", zh: "刷新页面后，再次点击权限按钮。" }],
  ["카메라 연결", { en: "Connect camera", ja: "カメラ接続", zh: "连接摄像头" }],
  ["카메라 끄기", { en: "Turn camera off", ja: "カメラをオフ", zh: "关闭摄像头" }],
  ["녹화 시작", { en: "Start recording", ja: "録画開始", zh: "开始录制" }],
  ["녹화 종료", { en: "Stop recording", ja: "録画終了", zh: "停止录制" }],
  ["녹화 중", { en: "Recording", ja: "録画中", zh: "录制中" }],
  ["녹화 완료", { en: "Recording complete", ja: "録画完了", zh: "录制完成" }],
  ["일시정지", { en: "Pause", ja: "一時停止", zh: "暂停" }],
  ["다시 시작", { en: "Resume", ja: "再開", zh: "继续" }],
  ["영상 저장", { en: "Save video", ja: "動画を保存", zh: "保存视频" }],
  ["카메라 미리보기", { en: "Camera preview", ja: "カメラプレビュー", zh: "摄像头预览" }],
  ["녹화 파일", { en: "Recording file", ja: "録画ファイル", zh: "录制文件" }],
  ["녹화 전", { en: "Before recording", ja: "録画前", zh: "录制前" }],
  ["00:00 · 녹화 전 · WEBM", { en: "00:00 · Ready · WEBM", ja: "00:00 · 録画前 · WEBM", zh: "00:00 · 未录制 · WEBM" }],
  ["영상은 서버로 업로드되지 않고 브라우저에서 바로 녹화됩니다.", { en: "Video is recorded directly in the browser and is not uploaded to the server.", ja: "動画はサーバーへアップロードせず、ブラウザ内で録画します。", zh: "视频会直接在浏览器中录制，不会上传服务器。" }],
  ["카메라를 켜면 미리보기가 표시됩니다.", { en: "Turn on the camera to show the preview.", ja: "カメラをオンにするとプレビューが表示されます。", zh: "打开摄像头后会显示预览。" }],
  ["권한 허용 후 선택 가능", { en: "Available after permission is allowed", ja: "権限を許可すると選択できます", zh: "授权后可选择" }],
  ["해상도", { en: "Resolution", ja: "解像度", zh: "分辨率" }],
  ["가벼운 480p", { en: "Light 480p", ja: "軽量 480p", zh: "轻量 480p" }],
  ["기본", { en: "Default", ja: "標準", zh: "默认" }],
  ["WebM 자동", { en: "WebM auto", ja: "WebM 自動", zh: "WebM 自动" }],
  ["WebM VP9 (권장)", { en: "WebM VP9 (recommended)", ja: "WebM VP9（推奨）", zh: "WebM VP9（推荐）" }],
  ["MP4 자동 (실험적)", { en: "MP4 auto (experimental)", ja: "MP4 自動（実験的）", zh: "MP4 自动（实验性）" }],
  ["마이크 포함", { en: "Include microphone", ja: "マイクを含める", zh: "包含麦克风" }],
  ["좌우반전 적용", { en: "Mirror", ja: "左右反転", zh: "镜像" }],
  ["필터", { en: "Filter", ja: "フィルター", zh: "滤镜" }],
  ["밝고 선명하게", { en: "Bright and clear", ja: "明るくくっきり", zh: "明亮清晰" }],
  ["따뜻한 톤", { en: "Warm tone", ja: "暖かいトーン", zh: "暖色调" }],
  ["차가운 톤", { en: "Cool tone", ja: "クールトーン", zh: "冷色调" }],
  ["흑백", { en: "Black and white", ja: "白黒", zh: "黑白" }],
  ["시네마틱", { en: "Cinematic", ja: "シネマティック", zh: "电影感" }],
  ["부드럽게", { en: "Soft", ja: "やわらかく", zh: "柔和" }],
  ["밝기", { en: "Brightness", ja: "明るさ", zh: "亮度" }],
  ["대비", { en: "Contrast", ja: "コントラスト", zh: "对比度" }],
  ["채도", { en: "Saturation", ja: "彩度", zh: "饱和度" }],
  ["배경 효과", { en: "Background effects", ja: "背景効果", zh: "背景效果" }],
  ["효과", { en: "Effect", ja: "効果", zh: "效果" }],
  ["사용 안 함", { en: "Off", ja: "使用しない", zh: "不使用" }],
  ["배경 흐리게", { en: "Blur background", ja: "背景をぼかす", zh: "虚化背景" }],
  ["단색 배경", { en: "Solid background", ja: "単色背景", zh: "纯色背景" }],
  ["이미지 배경", { en: "Image background", ja: "画像背景", zh: "图片背景" }],
  ["흐림", { en: "Blur", ja: "ぼかし", zh: "模糊" }],
  ["배경색", { en: "Background color", ja: "背景色", zh: "背景色" }],
  ["배경 이미지 선택", { en: "Choose background image", ja: "背景画像を選択", zh: "选择背景图片" }],
  ["배경 이미지 드래그 업로드", { en: "Drop a background image", ja: "背景画像をドラッグしてアップロード", zh: "拖放上传背景图片" }],
  ["이미지 지우기", { en: "Clear image", ja: "画像を消去", zh: "清除图片" }],
  ["AI 복붙 서식 정리", { en: "AI paste cleaner", ja: "AI貼り付け整形", zh: "AI 粘贴格式清理" }],
  ["AI 복붙 서식 정리 열기", { en: "Open AI paste cleaner", ja: "AI貼り付け整形を開く", zh: "打开 AI 粘贴清理" }],
  ["AI 답변 원문", { en: "Original AI answer", ja: "AI回答の原文", zh: "AI 回答原文" }],
  ["AI 답변, 블로그 본문, 문서 초안을 그대로 붙여넣습니다.", { en: "Paste an AI answer, blog draft, or document draft as-is.", ja: "AI回答、ブログ本文、文書の下書きをそのまま貼り付けます。", zh: "直接粘贴 AI 回答、博客正文或文档草稿。" }],
  ["정리 모드", { en: "Cleaning mode", ja: "整形モード", zh: "清理模式" }],
  ["일반 텍스트", { en: "Plain text", ja: "プレーンテキスト", zh: "纯文本" }],
  ["문서용", { en: "For documents", ja: "文書向け", zh: "文档用" }],
  ["블로그 초안", { en: "Blog draft", ja: "ブログ下書き", zh: "博客草稿" }],
  ["표 정리", { en: "Table cleanup", ja: "表の整形", zh: "表格清理" }],
  ["링크 처리", { en: "Link handling", ja: "リンク処理", zh: "链接处理" }],
  ["원본 유지", { en: "Keep original", ja: "原文を保持", zh: "保留原文" }],
  ["링크 텍스트만", { en: "Text only", ja: "リンク文字だけ", zh: "仅保留链接文字" }],
  ["URL만", { en: "URL only", ja: "URLだけ", zh: "仅 URL" }],
  ["제목 기호 제거", { en: "Remove heading markers", ja: "見出し記号を削除", zh: "移除标题符号" }],
  ["강조 기호 제거", { en: "Remove emphasis marks", ja: "強調記号を削除", zh: "移除强调符号" }],
  ["코드블록 기호 제거", { en: "Remove code block marks", ja: "コードブロック記号を削除", zh: "移除代码块符号" }],
  ["HTML 태그 제거", { en: "Remove HTML tags", ja: "HTMLタグを削除", zh: "移除 HTML 标签" }],
  ["빈 줄 압축", { en: "Collapse blank lines", ja: "空行を圧縮", zh: "压缩空行" }],
  ["군더더기 말 정리", { en: "Remove filler words", ja: "余分な言い回しを整理", zh: "清理口头赘词" }],
  ["정리하기", { en: "Clean", ja: "整える", zh: "清理" }],
  ["정리 결과", { en: "Cleaned result", ja: "整形結果", zh: "清理结果" }],
  ["정리 결과가 여기에 표시됩니다.", { en: "The cleaned result appears here.", ja: "整形結果がここに表示されます。", zh: "清理结果会显示在这里。" }],
  ["여기에 정리할 텍스트를 붙여넣으세요.", { en: "Paste text to clean here.", ja: "整えたいテキストをここに貼り付けます。", zh: "在这里粘贴要清理的文本。" }],
  ["AI 표 복붙 변환기", { en: "AI table converter", ja: "AI表貼り付け変換", zh: "AI 表格粘贴转换器" }],
  ["AI 표 복붙 변환기 열기", { en: "Open AI table converter", ja: "AI表貼り付け変換を開く", zh: "打开 AI 表格转换器" }],
  ["AI 표 변환", { en: "AI table conversion", ja: "AI表変換", zh: "AI 表格转换" }],
  ["AI 표를 문서와 엑셀에 붙여넣기 좋게 변환합니다.", { en: "Convert AI tables so they paste cleanly into documents and spreadsheets.", ja: "AIの表を文書やExcelに貼り付けやすい形に変換します。", zh: "将 AI 表格转换为适合粘贴到文档和 Excel 的格式。" }],
  ["표 앞뒤 설명 문구까지 그대로 붙여넣으면 표 영역만 찾아 변환합니다.", { en: "Paste the surrounding explanation too; the tool finds the table area.", ja: "表の前後の説明もそのまま貼り付けると、表部分だけを検出して変換します。", zh: "可连同表格前后的说明一起粘贴，工具会识别表格区域。" }],
  ["예시 넣기", { en: "Insert example", ja: "例を挿入", zh: "插入示例" }],
  ["인식한 표", { en: "Detected table", ja: "検出した表", zh: "识别到的表格" }],
  ["셀 안 마크다운 서식 제거", { en: "Remove Markdown inside cells", ja: "セル内のMarkdown装飾を削除", zh: "移除单元格内 Markdown 格式" }],
  ["셀 안 줄바꿈·공백 정리", { en: "Clean cell line breaks and spaces", ja: "セル内の改行・空白を整理", zh: "清理单元格换行和空格" }],
  ["셀 앞뒤 공백 정리", { en: "Trim cell spaces", ja: "セル前後の空白を削除", zh: "清理单元格首尾空格" }],
  ["빈 열 제거", { en: "Remove empty columns", ja: "空列を削除", zh: "移除空列" }],
  ["문서용 표 복사", { en: "Copy for document", ja: "文書用にコピー", zh: "复制为文档表格" }],
  ["엑셀용 복사", { en: "Copy for spreadsheet", ja: "Excel用にコピー", zh: "复制为表格数据" }],
  ["엑셀용 TSV", { en: "Spreadsheet TSV", ja: "Excel用TSV", zh: "表格 TSV" }],
  ["CSV 복사", { en: "Copy CSV", ja: "CSVをコピー", zh: "复制 CSV" }],
  ["CSV 다운로드", { en: "Download CSV", ja: "CSVをダウンロード", zh: "下载 CSV" }],
  ["표 미리보기", { en: "Table preview", ja: "表プレビュー", zh: "表格预览" }],
  ["표 만들기", { en: "Create table", ja: "表を作成", zh: "生成表格" }],
  ["표 만들기 전입니다", { en: "No table yet", ja: "まだ表はありません", zh: "尚未生成表格" }],
  ["아직 인식한 표가 없습니다.", { en: "No table has been detected yet.", ja: "まだ表が検出されていません。", zh: "尚未识别到表格。" }],
  ["AI 답변을 붙여넣고 표 만들기를 누르면 미리보기가 표시됩니다.", { en: "Paste an AI answer and create a table to preview it.", ja: "AI回答を貼り付けて表を作成すると、プレビューが表示されます。", zh: "粘贴 AI 回答并生成表格后，会显示预览。" }],
  ["Excel, Google Sheets에 셀 단위로 붙여넣기 좋습니다.", { en: "Designed to paste cell-by-cell into Excel or Google Sheets.", ja: "ExcelやGoogleスプレッドシートにセル単位で貼り付けやすい形式です。", zh: "适合按单元格粘贴到 Excel 或 Google Sheets。" }],
  ["쉼표 구분 파일이나 다른 도구로 옮길 때 사용합니다.", { en: "Use this for comma-separated files or other tools.", ja: "カンマ区切りファイルや他ツールに移すときに使います。", zh: "适合导出为逗号分隔文件或转到其他工具。" }],
  ["CSV 엑셀 변환기", { en: "CSV Excel converter", ja: "CSV Excel変換", zh: "CSV Excel 转换器" }],
  ["CSV 엑셀 변환기 열기", { en: "Open CSV Excel converter", ja: "CSV Excel変換を開く", zh: "打开 CSV Excel 转换器" }],
  ["CSV 엑셀 변환", { en: "CSV Excel conversion", ja: "CSV Excel変換", zh: "CSV Excel 转换" }],
  ["CSV·TSV·XLSX 파일", { en: "CSV, TSV, XLSX files", ja: "CSV・TSV・XLSXファイル", zh: "CSV、TSV、XLSX 文件" }],
  ["CSV, TSV, XLSX 파일을 서로 변환하고 여러 결과를 묶어 저장합니다.", { en: "Convert CSV, TSV, and XLSX files and save multiple results together.", ja: "CSV、TSV、XLSXを相互変換し、複数の結果をまとめて保存します。", zh: "互相转换 CSV、TSV、XLSX，并可打包保存多个结果。" }],
  ["여러 파일을 선택하면 CSV/TSV는 XLSX로, XLSX는 CSV로 브라우저 안에서 변환합니다.", { en: "Select multiple files: CSV/TSV converts to XLSX, and XLSX converts to CSV in the browser.", ja: "複数ファイルを選ぶと、CSV/TSVはXLSXへ、XLSXはCSVへブラウザ内で変換します。", zh: "选择多个文件后，CSV/TSV 会转为 XLSX，XLSX 会在浏览器内转为 CSV。" }],
  ["파일로 선택", { en: "Select by file", ja: "ファイルで選択", zh: "按文件选择" }],
  ["CSV, TSV, XLSX 파일을 여러 개 선택할 수 있습니다. 구형 XLS는 첫 버전에서 제외했습니다.", { en: "You can choose multiple CSV, TSV, and XLSX files. Legacy XLS is not included in this first version.", ja: "CSV、TSV、XLSXを複数選択できます。古いXLS形式は初期版では対象外です。", zh: "可以选择多个 CSV、TSV、XLSX 文件。旧版 XLS 暂不包含在首版中。" }],
  ["CSV 읽기 인코딩", { en: "CSV encoding", ja: "CSV読み込みエンコーディング", zh: "CSV 读取编码" }],
  ["CSV 구분자", { en: "CSV delimiter", ja: "CSV区切り文字", zh: "CSV 分隔符" }],
  ["쉼표", { en: "Comma", ja: "カンマ", zh: "逗号" }],
  ["탭", { en: "Tab", ja: "タブ", zh: "制表符" }],
  ["세미콜론", { en: "Semicolon", ja: "セミコロン", zh: "分号" }],
  ["XLSX 시트", { en: "XLSX sheets", ja: "XLSXシート", zh: "XLSX 工作表" }],
  ["첫 시트만 CSV", { en: "First sheet only", ja: "最初のシートのみCSV", zh: "仅第一个工作表 CSV" }],
  ["모든 시트를 각각 CSV", { en: "Each sheet as CSV", ja: "各シートをCSV", zh: "每个工作表分别 CSV" }],
  ["CSV 저장 방식", { en: "CSV save mode", ja: "CSV保存方法", zh: "CSV 保存方式" }],
  ["앞자리 0·긴 숫자·날짜를 텍스트로 보존", { en: "Preserve leading zeros, long numbers, and dates as text", ja: "先頭ゼロ・長い数字・日付をテキストとして保持", zh: "将前导 0、长数字和日期保留为文本" }],
  ["빈 행 제거", { en: "Remove empty rows", ja: "空行を削除", zh: "移除空行" }],
  ["아직 변환한 결과가 없습니다.", { en: "No conversion result yet.", ja: "まだ変換結果はありません。", zh: "尚无转换结果。" }],
  ["변환 후 첫 결과의 앞부분을 보여줍니다.", { en: "The beginning of the first result appears after conversion.", ja: "変換後、最初の結果の先頭を表示します。", zh: "转换后会显示第一个结果的开头。" }],
  ["CSV나 엑셀 파일을 선택하고 변환하면 첫 8행을 확인할 수 있습니다.", { en: "Choose a CSV or Excel file and convert it to preview the first 8 rows.", ja: "CSVまたはExcelファイルを選んで変換すると、先頭8行を確認できます。", zh: "选择 CSV 或 Excel 文件并转换后，可预览前 8 行。" }],
  ["전체 ZIP 저장", { en: "Save all as ZIP", ja: "まとめてZIP保存", zh: "全部保存为 ZIP" }],
  ["CSV 결과", { en: "CSV result", ja: "CSV結果", zh: "CSV 结果" }],
  ["글자수 세기", { en: "Character counter", ja: "文字数カウント", zh: "字数统计" }],
  ["글자수 세기 열기", { en: "Open character counter", ja: "文字数カウントを開く", zh: "打开字数统计" }],
  ["텍스트 입력", { en: "Text input", ja: "テキスト入力", zh: "文本输入" }],
  ["입력 즉시 글자수, 단어 수, 바이트 수, 예상 읽기 시간이 계산됩니다.", { en: "Character count, word count, byte count, and estimated reading time update as you type.", ja: "入力すると文字数、単語数、バイト数、想定読了時間がすぐ計算されます。", zh: "输入后会立即计算字数、词数、字节数和预计阅读时间。" }],
  ["글자수를 확인할 텍스트를 붙여넣으세요.", { en: "Paste text to count.", ja: "文字数を確認したいテキストを貼り付けてください。", zh: "粘贴要统计字数的文本。" }],
  ["공백 포함", { en: "With spaces", ja: "空白込み", zh: "含空格" }],
  ["공백 제외", { en: "Without spaces", ja: "空白除外", zh: "不含空格" }],
  ["단어 수", { en: "Words", ja: "単語数", zh: "词数" }],
  ["줄 수", { en: "Lines", ja: "行数", zh: "行数" }],
  ["문단 수", { en: "Paragraphs", ja: "段落数", zh: "段落数" }],
  ["바이트", { en: "Bytes", ja: "バイト", zh: "字节" }],
  ["예상 읽기 시간", { en: "Estimated reading time", ja: "想定読了時間", zh: "预计阅读时间" }],
  ["예상 말하기 시간", { en: "Estimated speaking time", ja: "想定読み上げ時間", zh: "预计朗读时间" }],
  ["문장 수", { en: "Sentences", ja: "文数", zh: "句数" }],
  ["줄바꿈·공백 정리", { en: "Line break and spacing cleaner", ja: "改行・空白整理", zh: "换行与空格清理" }],
  ["줄바꿈·공백 정리 열기", { en: "Open line break cleaner", ja: "改行・空白整理を開く", zh: "打开换行空格清理" }],
  ["줄이 강제로 끊긴 텍스트를 붙여넣습니다.", { en: "Paste text with forced line breaks.", ja: "途中で改行されたテキストを貼り付けます。", zh: "粘贴被强制换行的文本。" }],
  ["문장 줄바꿈 합치기", { en: "Merge sentence line breaks", ja: "文中改行を結合", zh: "合并句中换行" }],
  ["빈 줄 2개로 정리", { en: "Use two blank lines", ja: "空行2つに整理", zh: "整理为两个空行" }],
  ["과한 공백 압축", { en: "Collapse extra spaces", ja: "余分な空白を圧縮", zh: "压缩多余空格" }],
  ["마침표 기준 줄바꿈", { en: "Break at periods", ja: "句点で改行", zh: "按句号换行" }],
  ["줄 앞뒤 공백 제거", { en: "Trim each line", ja: "行頭・行末の空白を削除", zh: "清理每行首尾空格" }],
  ["빈 줄 제외", { en: "Ignore blank lines", ja: "空行を除外", zh: "排除空行" }],
  ["여기에 원문을 붙여넣으세요.", { en: "Paste the original text here.", ja: "原文をここに貼り付けます。", zh: "在这里粘贴原文。" }],
  ["마크다운 편집기", { en: "Markdown editor", ja: "Markdownエディター", zh: "Markdown 编辑器" }],
  ["마크다운 편집기 열기", { en: "Open Markdown editor", ja: "Markdownエディターを開く", zh: "打开 Markdown 编辑器" }],
  ["마크다운 입력", { en: "Markdown input", ja: "Markdown入力", zh: "Markdown 输入" }],
  ["마크다운 서식", { en: "Markdown formatting", ja: "Markdown書式", zh: "Markdown 格式" }],
  ["빈 문서에서도 버튼을 눌러 제목, 목록, 표, 코드 블록을 바로 작성합니다.", { en: "Use the buttons to add headings, lists, tables, and code blocks even in a blank document.", ja: "空の文書でもボタンで見出し、リスト、表、コードブロックをすぐ作成できます。", zh: "即使是空文档，也可用按钮快速创建标题、列表、表格和代码块。" }],
  ["# 제목 문서를 작성하거나 일반 텍스트를 붙여넣으세요.", { en: "# Title\n\nWrite a document or paste plain text.", ja: "# タイトル\n\n文書を書くか、プレーンテキストを貼り付けます。", zh: "# 标题\n\n编写文档或粘贴纯文本。" }],
  ["큰 제목", { en: "Large heading", ja: "大見出し", zh: "大标题" }],
  ["중간 제목", { en: "Medium heading", ja: "中見出し", zh: "中标题" }],
  ["작은 제목", { en: "Small heading", ja: "小見出し", zh: "小标题" }],
  ["강조", { en: "Emphasis", ja: "強調", zh: "强调" }],
  ["굵게", { en: "Bold", ja: "太字", zh: "加粗" }],
  ["기울임", { en: "Italic", ja: "斜体", zh: "斜体" }],
  ["취소선", { en: "Strikethrough", ja: "取り消し線", zh: "删除线" }],
  ["인라인 코드", { en: "Inline code", ja: "インラインコード", zh: "行内代码" }],
  ["글머리 기호", { en: "Bulleted list", ja: "箇条書き", zh: "项目符号列表" }],
  ["번호 목록", { en: "Numbered list", ja: "番号付きリスト", zh: "编号列表" }],
  ["체크 목록", { en: "Checklist", ja: "チェックリスト", zh: "清单" }],
  ["인용", { en: "Quote", ja: "引用", zh: "引用" }],
  ["삽입", { en: "Insert", ja: "挿入", zh: "插入" }],
  ["코드", { en: "Code", ja: "コード", zh: "代码" }],
  ["코드 블록", { en: "Code block", ja: "コードブロック", zh: "代码块" }],
  ["구분선", { en: "Divider", ja: "区切り線", zh: "分隔线" }],
  ["마크다운을 입력하면 미리보기가 여기에 표시됩니다.", { en: "The preview appears here when you enter Markdown.", ja: "Markdownを入力すると、ここにプレビューが表示されます。", zh: "输入 Markdown 后，预览会显示在这里。" }],
  ["MD 복사", { en: "Copy MD", ja: "MDをコピー", zh: "复制 MD" }],
  ["텍스트 복사", { en: "Copy text", ja: "テキストをコピー", zh: "复制文本" }],
  ["MD 저장", { en: "Save MD", ja: "MDを保存", zh: "保存 MD" }],
  ["MD 파일 뷰어", { en: "MD file viewer", ja: "MDファイルビューア", zh: "MD 文件查看器" }],
  ["MD 파일 뷰어 열기", { en: "Open MD file viewer", ja: "MDファイルビューアを開く", zh: "打开 MD 文件查看器" }],
  ["MD 파일 열기", { en: "Open MD file", ja: "MDファイルを開く", zh: "打开 MD 文件" }],
  ["파일은 브라우저에서만 읽습니다. MD 안의 원시 HTML은 실행하지 않고 안전하게 표시합니다.", { en: "Files are read only in your browser. Raw HTML inside MD is escaped and shown safely.", ja: "ファイルはブラウザ内だけで読み込みます。MD内の生HTMLは実行せず、安全に表示します。", zh: "文件只在浏览器中读取。MD 中的原始 HTML 不会执行，会安全显示。" }],
  ["MD 파일 선택 또는 드래그", { en: "Choose or drop an MD file", ja: "MDファイルを選択またはドロップ", zh: "选择或拖放 MD 文件" }],
  [".md, .markdown, .txt 파일 · 최대 8MB 권장", { en: ".md, .markdown, .txt files · up to 8 MB recommended", ja: ".md、.markdown、.txt ファイル · 8MBまで推奨", zh: ".md、.markdown、.txt 文件 · 建议 8MB 以内" }],
  ["문서 내용", { en: "Document", ja: "文書内容", zh: "文档内容" }],
  ["아직 파일을 열지 않았습니다", { en: "No file opened yet", ja: "まだファイルを開いていません", zh: "尚未打开文件" }],
  ["마크다운 파일을 선택하면 문서 내용이 여기에 표시됩니다.", { en: "Choose a Markdown file to show the document here.", ja: "Markdownファイルを選択すると、文書内容がここに表示されます。", zh: "选择 Markdown 文件后，文档内容会显示在这里。" }],
  ["목차", { en: "Outline", ja: "目次", zh: "目录" }],
  ["파일을 열면 제목 목록이 표시됩니다.", { en: "Headings appear here after opening a file.", ja: "ファイルを開くと見出し一覧が表示されます。", zh: "打开文件后会显示标题列表。" }],
  ["보기", { en: "View", ja: "表示", zh: "视图" }],
  ["분할", { en: "Split", ja: "分割", zh: "分栏" }],
  ["테마", { en: "Theme", ja: "テーマ", zh: "主题" }],
  ["밝게", { en: "Light", ja: "ライト", zh: "明亮" }],
  ["종이", { en: "Paper", ja: "紙", zh: "纸张" }],
  ["어둡게", { en: "Dark", ja: "ダーク", zh: "深色" }],
  ["글자", { en: "Font", ja: "文字", zh: "字体" }],
  ["줄간격", { en: "Line spacing", ja: "行間", zh: "行距" }],
  ["새창에서 보기/편집", { en: "Open window/edit", ja: "別ウィンドウで表示・編集", zh: "新窗口查看/编辑" }],
  ["이메일·URL·전화번호 추출기", { en: "Email, URL, and phone extractor", ja: "メール・URL・電話番号抽出", zh: "邮箱、URL、电话号码提取器" }],
  ["이메일·URL·전화번호 추출기 열기", { en: "Open email, URL, and phone extractor", ja: "メール・URL・電話番号抽出を開く", zh: "打开邮箱 URL 电话提取器" }],
  ["이메일, URL, 전화번호가 섞인 텍스트를 그대로 붙여넣습니다.", { en: "Paste text that contains emails, URLs, and phone numbers.", ja: "メール、URL、電話番号が混ざったテキストをそのまま貼り付けます。", zh: "直接粘贴包含邮箱、URL 和电话号码的文本。" }],
  ["여기에 긴 문서나 공지문을 붙여넣으세요.", { en: "Paste a long document or notice here.", ja: "長い文書やお知らせ文をここに貼り付けます。", zh: "在这里粘贴长文档或公告。" }],
  ["이메일", { en: "Email", ja: "メール", zh: "邮箱" }],
  ["링크", { en: "Links", ja: "リンク", zh: "链接" }],
  ["전화번호", { en: "Phone numbers", ja: "電話番号", zh: "电话号码" }],
  ["이메일 추출 결과", { en: "Extracted emails", ja: "抽出したメール", zh: "提取的邮箱" }],
  ["URL 추출 결과", { en: "Extracted URLs", ja: "抽出したURL", zh: "提取的 URL" }],
  ["전화번호 추출 결과", { en: "Extracted phone numbers", ja: "抽出した電話番号", zh: "提取的电话号码" }],
  ["중복 줄 제거", { en: "Duplicate line remover", ja: "重複行削除", zh: "重复行删除" }],
  ["중복 줄 제거 열기", { en: "Open duplicate line remover", ja: "重複行削除を開く", zh: "打开重复行删除" }],
  ["한 줄에 하나씩 정리된 목록을 붙여넣습니다.", { en: "Paste a list with one item per line.", ja: "1行に1項目のリストを貼り付けます。", zh: "粘贴每行一个条目的列表。" }],
  ["중복 줄이 포함된 목록을 입력하세요.", { en: "Enter a list that contains duplicate lines.", ja: "重複行を含むリストを入力してください。", zh: "请输入包含重复行的列表。" }],
  ["처리 방식", { en: "Processing", ja: "処理方法", zh: "处理方式" }],
  ["대소문자 구분", { en: "Case sensitive", ja: "大文字・小文字を区別", zh: "区分大小写" }],
  ["원본 유지", { en: "Keep original order", ja: "元の順序を維持", zh: "保持原顺序" }],
  ["가나다/알파벳 정렬", { en: "Sort alphabetically", ja: "五十音・アルファベット順", zh: "按字母/拼音排序" }],
  ["중복 제거", { en: "Remove duplicates", ja: "重複を削除", zh: "去重" }],
  ["중복 제거 결과", { en: "Deduplicated result", ja: "重複削除結果", zh: "去重结果" }],
  ["찾기 및 바꾸기", { en: "Find and replace", ja: "検索と置換", zh: "查找与替换" }],
  ["찾기 및 바꾸기 열기", { en: "Open find and replace", ja: "検索と置換を開く", zh: "打开查找替换" }],
  ["치환할 본문을 붙여넣고 바꿀 규칙을 설정합니다.", { en: "Paste the text to edit and set the replacement rule.", ja: "置換する本文を貼り付け、置換ルールを設定します。", zh: "粘贴要替换的正文并设置替换规则。" }],
  ["수정할 텍스트를 입력하세요.", { en: "Enter text to edit.", ja: "編集するテキストを入力してください。", zh: "请输入要编辑的文本。" }],
  ["찾을 값", { en: "Find", ja: "検索語", zh: "查找内容" }],
  ["바꿀 값", { en: "Replace with", ja: "置換後", zh: "替换为" }],
  ["정규식 사용", { en: "Use regular expression", ja: "正規表現を使う", zh: "使用正则表达式" }],
  ["치환 전입니다.", { en: "No replacement yet.", ja: "まだ置換していません。", zh: "尚未替换。" }],
  ["치환 결과", { en: "Replacement result", ja: "置換結果", zh: "替换结果" }],
  ["대소문자 변환", { en: "Case converter", ja: "大文字・小文字変換", zh: "大小写转换" }],
  ["대소문자 변환 열기", { en: "Open case converter", ja: "大文字・小文字変換を開く", zh: "打开大小写转换" }],
  ["영문 텍스트, 태그, 파일명, 라벨을 입력합니다.", { en: "Enter English text, tags, file names, or labels.", ja: "英語テキスト、タグ、ファイル名、ラベルを入力します。", zh: "输入英文文本、标签、文件名或标注。" }],
  ["예: user profile summary", { en: "e.g. user profile summary", ja: "例: user profile summary", zh: "例如：user profile summary" }],
  ["영문 단어 단위", { en: "English word units", ja: "英単語単位", zh: "英文单词单位" }],
  ["선택한 케이스 형식 결과", { en: "Selected case result", ja: "選択したケース形式の結果", zh: "所选大小写格式结果" }],
  ["텍스트 비교기", { en: "Text diff checker", ja: "テキスト比較", zh: "文本对比器" }],
  ["텍스트 비교기 열기", { en: "Open text diff checker", ja: "テキスト比較を開く", zh: "打开文本对比器" }],
  ["비교할 첫 번째 텍스트", { en: "First text to compare", ja: "比較する1つ目のテキスト", zh: "要比较的第一段文本" }],
  ["비교할 두 번째 텍스트", { en: "Second text to compare", ja: "比較する2つ目のテキスト", zh: "要比较的第二段文本" }],
  ["이전 버전", { en: "Previous version", ja: "旧バージョン", zh: "旧版本" }],
  ["새 버전", { en: "New version", ja: "新バージョン", zh: "新版本" }],
  ["이전 버전 보기", { en: "View previous version", ja: "旧バージョンを見る", zh: "查看旧版本" }],
  ["새 버전 보기", { en: "View new version", ja: "新バージョンを見る", zh: "查看新版本" }],
  ["비교하기", { en: "Compare", ja: "比較", zh: "对比" }],
  ["줄 단위로 차이를 보여줍니다.", { en: "Shows differences line by line.", ja: "行単位で差分を表示します。", zh: "按行显示差异。" }],
  ["QR 코드 생성기", { en: "QR code generator", ja: "QRコード生成", zh: "二维码生成器" }],
  ["QR 코드 생성기 열기", { en: "Open QR code generator", ja: "QRコード生成を開く", zh: "打开二维码生成器" }],
  ["QR 만들기", { en: "Create QR", ja: "QRを作成", zh: "生成二维码" }],
  ["QR 코드", { en: "QR code", ja: "QRコード", zh: "二维码" }],
  ["QR에 넣을 텍스트", { en: "Text for the QR", ja: "QRに入れるテキスト", zh: "二维码内容" }],
  ["텍스트 - URL", { en: "Text or URL", ja: "テキスト・URL", zh: "文本 / URL" }],
  ["색상", { en: "Colors", ja: "色", zh: "颜色" }],
  ["배경", { en: "Background", ja: "背景", zh: "背景" }],
  ["모양", { en: "Shape", ja: "形状", zh: "形状" }],
  ["기본 사각형", { en: "Square", ja: "標準の四角", zh: "标准方块" }],
  ["둥근 모듈", { en: "Rounded modules", ja: "角丸モジュール", zh: "圆角模块" }],
  ["점형 모듈", { en: "Dot modules", ja: "ドットモジュール", zh: "圆点模块" }],
  ["크기", { en: "Size", ja: "サイズ", zh: "尺寸" }],
  ["색 대비와 여백을 유지해 QR 인식률을 우선합니다.", { en: "Keeps contrast and quiet-zone margin to prioritize QR scan reliability.", ja: "色のコントラストと余白を保ち、QRの読み取りやすさを優先します。", zh: "保持颜色对比和留白，优先保证二维码识别率。" }],
  ["QR 생성 전입니다.", { en: "No QR generated yet.", ja: "まだQRを生成していません。", zh: "尚未生成二维码。" }],
  ["QR 링크 추출기", { en: "QR link extractor", ja: "QRリンク抽出", zh: "二维码链接提取器" }],
  ["QR 링크 추출기 열기", { en: "Open QR link extractor", ja: "QRリンク抽出を開く", zh: "打开二维码链接提取器" }],
  ["QR 이미지에서 링크와 원문을 읽습니다.", { en: "Read links and raw text from a QR image.", ja: "QR画像からリンクと原文を読み取ります。", zh: "从二维码图片中读取链接和原文。" }],
  ["스크린샷 붙여넣기", { en: "Paste screenshot", ja: "スクリーンショット貼り付け", zh: "粘贴截图" }],
  ["Win+Shift+S로 QR 영역을 캡처한 뒤 여기에 Ctrl+V", { en: "Capture the QR area with Win+Shift+S, then press Ctrl+V here.", ja: "Win+Shift+SでQR部分を切り取り、ここでCtrl+Vします。", zh: "用 Win+Shift+S 截取二维码区域后，在这里按 Ctrl+V。" }],
  ["저장된 QR 이미지나 스크린샷 파일을 선택하거나 이 영역에 끌어다 놓습니다.", { en: "Choose or drop a saved QR image or screenshot.", ja: "保存したQR画像やスクリーンショットを選択またはドロップします。", zh: "选择或拖放保存的二维码图片或截图。" }],
  ["QR 원문이 여기에 표시됩니다.", { en: "Raw QR text appears here.", ja: "QRの原文がここに表示されます。", zh: "二维码原文会显示在这里。" }],
  ["URL이 감지되면 여기에 표시됩니다.", { en: "Detected URLs appear here.", ja: "URLが検出されるとここに表示されます。", zh: "检测到 URL 后会显示在这里。" }],
  ["안전을 위해 QR 링크는 자동으로 열지 않습니다. 주소를 확인한 뒤 직접 열어 주세요.", { en: "For safety, QR links do not open automatically. Check the address before opening it yourself.", ja: "安全のためQRリンクは自動で開きません。アドレスを確認してから手動で開いてください。", zh: "为安全起见，二维码链接不会自动打开。请确认地址后手动打开。" }],
  ["링크 열기", { en: "Open link", ja: "リンクを開く", zh: "打开链接" }],
  ["아직 읽은 QR이 없습니다.", { en: "No QR has been read yet.", ja: "まだQRを読み取っていません。", zh: "尚未读取二维码。" }],
  ["이미지 크기 조절", { en: "Image resizer", ja: "画像サイズ変更", zh: "图片尺寸调整" }],
  ["이미지 크기 조절 열기", { en: "Open image resizer", ja: "画像サイズ変更を開く", zh: "打开图片尺寸调整" }],
  ["사진 크기를 픽셀이나 비율로 조절합니다.", { en: "Resize photos by pixels or ratio.", ja: "写真サイズをピクセルや比率で調整します。", zh: "按像素或比例调整图片尺寸。" }],
  ["사진 파일 선택", { en: "Choose photo file", ja: "写真ファイルを選択", zh: "选择照片文件" }],
  ["이미지를 선택하면 원본 크기를 불러옵니다.", { en: "Choose an image to load its original size.", ja: "画像を選ぶと元サイズを読み込みます。", zh: "选择图片后会读取原始尺寸。" }],
  ["가로", { en: "Width", ja: "幅", zh: "宽度" }],
  ["세로", { en: "Height", ja: "高さ", zh: "高度" }],
  ["원본 비율 유지", { en: "Keep original ratio", ja: "元の比率を維持", zh: "保持原始比例" }],
  ["최대 너비", { en: "Max width", ja: "最大幅", zh: "最大宽度" }],
  ["크기 적용", { en: "Apply size", ja: "サイズを適用", zh: "应用尺寸" }],
  ["이미지 저장", { en: "Save image", ja: "画像を保存", zh: "保存图片" }],
  ["이미지 업로드", { en: "Image upload", ja: "画像アップロード", zh: "图片上传" }],
  ["이미지 미리보기", { en: "Image preview", ja: "画像プレビュー", zh: "图片预览" }],
  ["현재 브라우저가 표시할 수 있는 이미지 기준으로 보여줍니다.", { en: "Preview uses the image format this browser can display.", ja: "現在のブラウザで表示できる画像としてプレビューします。", zh: "预览基于当前浏览器可显示的图片格式。" }],
  ["JPG, PNG, WEBP 이미지를 선택하거나 이 영역에 끌어다 놓으세요.", { en: "Choose or drop JPG, PNG, or WEBP images here.", ja: "JPG、PNG、WEBP画像を選択またはここへドロップします。", zh: "选择 JPG、PNG、WEBP 图片或拖放到此区域。" }],
  ["이미지 형식 변환", { en: "Image format converter", ja: "画像形式変換", zh: "图片格式转换" }],
  ["이미지 형식 변환 열기", { en: "Open image format converter", ja: "画像形式変換を開く", zh: "打开图片格式转换" }],
  ["원본 이미지를 선택하거나 이 영역에 끌어다 놓은 뒤 변환 형식을 고릅니다.", { en: "Choose or drop an image, then pick the output format.", ja: "元画像を選択またはドロップしてから、変換形式を選びます。", zh: "选择或拖放原图后，选择转换格式。" }],
  ["JPG, PNG, WEBP 형식을 변환합니다.", { en: "Convert JPG, PNG, and WEBP formats.", ja: "JPG、PNG、WEBP形式を変換します。", zh: "转换 JPG、PNG、WEBP 格式。" }],
  ["이미지 압축", { en: "Image compression", ja: "画像圧縮", zh: "图片压缩" }],
  ["이미지 용량 압축", { en: "Image compressor", ja: "画像容量圧縮", zh: "图片压缩器" }],
  ["이미지 용량 압축 열기", { en: "Open image compressor", ja: "画像容量圧縮を開く", zh: "打开图片压缩器" }],
  ["업로드용으로 줄일 이미지를 선택하거나 이 영역에 끌어다 놓으세요.", { en: "Choose or drop images to reduce for upload.", ja: "アップロード用に軽くしたい画像を選択またはドロップします。", zh: "选择或拖放要压缩用于上传的图片。" }],
  ["업로드용 이미지 용량을 줄입니다.", { en: "Reduce image size for uploads.", ja: "アップロード向けに画像容量を減らします。", zh: "压缩用于上传的图片体积。" }],
  ["압축 전입니다.", { en: "Not compressed yet.", ja: "まだ圧縮していません。", zh: "尚未压缩。" }],
  ["압축하기", { en: "Compress", ja: "圧縮", zh: "压缩" }],
  ["압축 결과", { en: "Compression result", ja: "圧縮結果", zh: "压缩结果" }],
  ["정리된 이미지 저장", { en: "Save cleaned image", ja: "整理済み画像を保存", zh: "保存清理后的图片" }],
  ["EXIF 메타데이터 제거", { en: "EXIF metadata remover", ja: "EXIFメタデータ削除", zh: "EXIF 元数据移除" }],
  ["EXIF 메타데이터 제거 열기", { en: "Open EXIF metadata remover", ja: "EXIFメタデータ削除を開く", zh: "打开 EXIF 元数据移除" }],
  ["메타데이터", { en: "Metadata", ja: "メタデータ", zh: "元数据" }],
  ["파일 크기", { en: "File size", ja: "ファイルサイズ", zh: "文件大小" }],
  ["정리 완료", { en: "Cleaned", ja: "整理完了", zh: "清理完成" }],
  ["사진을 선택하면 감지 가능한 메타데이터 항목을 확인합니다.", { en: "Choose a photo to inspect detectable metadata.", ja: "写真を選ぶと検出可能なメタデータ項目を確認します。", zh: "选择照片后可查看可检测的元数据项。" }],
  ["사진의 EXIF, XMP, IPTC 메타데이터를 제거합니다.", { en: "Remove EXIF, XMP, and IPTC metadata from photos.", ja: "写真のEXIF、XMP、IPTCメタデータを削除します。", zh: "移除照片中的 EXIF、XMP、IPTC 元数据。" }],
  ["메타데이터 제거", { en: "Remove metadata", ja: "メタデータを削除", zh: "移除元数据" }],
  ["PDF 합치기", { en: "Merge PDF", ja: "PDF結合", zh: "合并 PDF" }],
  ["PDF 합치기 열기", { en: "Open Merge PDF", ja: "PDF結合を開く", zh: "打开合并 PDF" }],
  ["PDF 여러 개 선택", { en: "Choose multiple PDFs", ja: "PDFを複数選択", zh: "选择多个 PDF" }],
  ["PDF 파일을 선택하거나 이 영역에 끌어다 놓으면 선택한 순서대로 병합됩니다.", { en: "Choose or drop PDFs here; they merge in the selected order.", ja: "PDFを選択またはドロップすると、選択した順に結合します。", zh: "选择或拖放 PDF 后，会按选择顺序合并。" }],
  ["PDF 라이브러리를 필요한 순간에만 불러옵니다.", { en: "PDF libraries load only when needed.", ja: "PDFライブラリは必要なタイミングでのみ読み込みます。", zh: "PDF 库仅在需要时加载。" }],
  ["여러 PDF를 하나의 문서로 합칩니다.", { en: "Combine multiple PDFs into one document.", ja: "複数のPDFを1つの文書に結合します。", zh: "将多个 PDF 合并为一个文档。" }],
  ["PDF 분할", { en: "Split PDF", ja: "PDF分割", zh: "拆分 PDF" }],
  ["PDF 분할 열기", { en: "Open Split PDF", ja: "PDF分割を開く", zh: "打开拆分 PDF" }],
  ["파일당 페이지 수", { en: "Pages per file", ja: "1ファイルあたりのページ数", zh: "每个文件页数" }],
  ["PDF 파일을 선택하거나 이 영역에 끌어다 놓은 뒤 페이지 수 기준으로 나눕니다.", { en: "Choose or drop a PDF, then split it by pages per file.", ja: "PDFを選択またはドロップし、ページ数単位で分割します。", zh: "选择或拖放 PDF 后，按每个文件页数拆分。" }],
  ["분할된 PDF는 브라우저 다운로드로 순차 저장됩니다.", { en: "Split PDFs are downloaded sequentially by the browser.", ja: "分割したPDFはブラウザから順番にダウンロードされます。", zh: "拆分后的 PDF 会由浏览器依次下载。" }],
  ["PDF를 페이지 단위로 나눕니다.", { en: "Split a PDF by page groups.", ja: "PDFをページ単位で分割します。", zh: "按页拆分 PDF。" }],
  ["PDF 페이지 추출", { en: "Extract PDF pages", ja: "PDFページ抽出", zh: "提取 PDF 页面" }],
  ["PDF 페이지 추출 열기", { en: "Open Extract PDF Pages", ja: "PDFページ抽出を開く", zh: "打开提取 PDF 页面" }],
  ["페이지 범위", { en: "Page range", ja: "ページ範囲", zh: "页面范围" }],
  ["PDF 파일을 선택하거나 이 영역에 끌어다 놓은 뒤 예: 1-3,5,8 형식으로 필요한 페이지를 추출합니다.", { en: "Choose or drop a PDF, then extract pages using ranges such as 1-3,5,8.", ja: "PDFを選択またはドロップし、1-3,5,8 のような形式で必要なページを抽出します。", zh: "选择或拖放 PDF 后，使用 1-3,5,8 等范围提取所需页面。" }],
  ["원본 페이지 순서를 유지한 새 PDF를 만듭니다.", { en: "Creates a new PDF while preserving the original page order.", ja: "元のページ順を維持して新しいPDFを作成します。", zh: "生成保持原始页面顺序的新 PDF。" }],
  ["필요한 PDF 페이지만 추출합니다.", { en: "Extract only the PDF pages you need.", ja: "必要なPDFページだけを抽出します。", zh: "只提取需要的 PDF 页面。" }],
  ["페이지 추출", { en: "Extract pages", ja: "ページ抽出", zh: "提取页面" }],
  ["이미지 PDF 변환", { en: "Images to PDF", ja: "画像をPDFに変換", zh: "图片转 PDF" }],
  ["이미지 PDF 변환 열기", { en: "Open Images to PDF", ja: "画像PDF変換を開く", zh: "打开图片转 PDF" }],
  ["이미지 여러 장 선택", { en: "Choose multiple images", ja: "画像を複数選択", zh: "选择多张图片" }],
  ["이미지를 선택하거나 이 영역에 끌어다 놓으면 선택한 순서대로 PDF 페이지를 만듭니다.", { en: "Choose or drop images here; PDF pages are created in the selected order.", ja: "画像を選択またはドロップすると、選択した順にPDFページを作成します。", zh: "选择或拖放图片后，会按选择顺序生成 PDF 页面。" }],
  ["이미지 업로드 후 PDF 생성 버튼을 누르세요.", { en: "Upload images, then press Create PDF.", ja: "画像をアップロードしてからPDF作成ボタンを押してください。", zh: "上传图片后点击生成 PDF。" }],
  ["이미지를 PDF 문서로 변환합니다.", { en: "Convert images into a PDF document.", ja: "画像をPDF文書に変換します。", zh: "将图片转换为 PDF 文档。" }],
  ["PDF 만들기", { en: "Create PDF", ja: "PDFを作成", zh: "生成 PDF" }],
  ["PDF 이미지 변환", { en: "PDF to image", ja: "PDFを画像に変換", zh: "PDF 转图片" }],
  ["PDF 이미지 변환 열기", { en: "Open PDF to image", ja: "PDF画像変換を開く", zh: "打开 PDF 转图片" }],
  ["PDF 파일을 선택하거나 이 영역에 끌어다 놓으면 페이지를 PNG로 렌더링합니다.", { en: "Choose or drop a PDF to render pages as PNG images.", ja: "PDFを選択またはドロップすると、ページをPNG画像としてレンダリングします。", zh: "选择或拖放 PDF 后，会将页面渲染为 PNG 图片。" }],
  ["렌더링 배율", { en: "Render scale", ja: "レンダリング倍率", zh: "渲染倍率" }],
  ["페이지 렌더링", { en: "Render pages", ja: "ページをレンダリング", zh: "渲染页面" }],
  ["전체 다운로드", { en: "Download all", ja: "すべてダウンロード", zh: "全部下载" }],
  ["페이지 수가 많으면 렌더링에 시간이 걸릴 수 있습니다.", { en: "Rendering can take time for PDFs with many pages.", ja: "ページ数が多いPDFはレンダリングに時間がかかることがあります。", zh: "页数较多时，渲染可能需要一些时间。" }],
  ["PDF 페이지를 이미지로 저장합니다.", { en: "Save PDF pages as images.", ja: "PDFページを画像として保存します。", zh: "将 PDF 页面保存为图片。" }],
  ["SRT 자막 정리", { en: "SRT cleaner", ja: "SRT字幕整形", zh: "SRT 字幕清理" }],
  ["SRT 자막 정리 열기", { en: "Open SRT cleaner", ja: "SRT字幕整形を開く", zh: "打开 SRT 字幕清理" }],
  ["원본 SRT", { en: "Original SRT", ja: "元のSRT", zh: "原始 SRT" }],
  ["SRT 자막 파일 드래그 업로드", { en: "Drop an SRT subtitle file", ja: "SRT字幕ファイルをドロップ", zh: "拖放 SRT 字幕文件" }],
  ["SRT 자막을 붙여넣으세요.", { en: "Paste SRT subtitles.", ja: "SRT字幕を貼り付けてください。", zh: "请粘贴 SRT 字幕。" }],
  ["줄 앞뒤 공백 제거", { en: "Trim line spaces", ja: "行頭・行末の空白を削除", zh: "清理每行首尾空格" }],
  ["문장 사이 공백 압축", { en: "Collapse spaces between sentences", ja: "文間の空白を圧縮", zh: "压缩句间空格" }],
  ["번호 다시 매기기", { en: "Renumber subtitles", ja: "番号を振り直す", zh: "重新编号" }],
  ["SRT 정리", { en: "Clean SRT", ja: "SRTを整える", zh: "清理 SRT" }],
  ["SRT 저장", { en: "Save SRT", ja: "SRTを保存", zh: "保存 SRT" }],
  ["SRT 구조가 깨진 일부 자막은 사람이 한번 더 확인하는 것이 좋습니다.", { en: "Some subtitles with broken SRT structure should be reviewed manually.", ja: "SRT構造が崩れた字幕は、人がもう一度確認することをおすすめします。", zh: "部分结构损坏的 SRT 字幕建议人工复核。" }],
  ["정리된 SRT", { en: "Cleaned SRT", ja: "整形済みSRT", zh: "清理后的 SRT" }],
  ["SRT ↔ VTT 변환", { en: "SRT ↔ VTT converter", ja: "SRT ↔ VTT変換", zh: "SRT ↔ VTT 转换" }],
  ["SRT ↔ VTT 변환 열기", { en: "Open SRT ↔ VTT converter", ja: "SRT ↔ VTT変換を開く", zh: "打开 SRT ↔ VTT 转换" }],
  ["원본 자막", { en: "Original subtitles", ja: "元の字幕", zh: "原始字幕" }],
  ["SRT 또는 VTT 자막 파일 드래그 업로드", { en: "Drop an SRT or VTT subtitle file", ja: "SRTまたはVTT字幕ファイルをドロップ", zh: "拖放 SRT 或 VTT 字幕文件" }],
  ["SRT 또는 VTT 자막을 붙여넣으세요.", { en: "Paste SRT or VTT subtitles.", ja: "SRTまたはVTT字幕を貼り付けてください。", zh: "请粘贴 SRT 或 VTT 字幕。" }],
  ["기본적인 SRT, VTT 구조를 기준으로 변환합니다.", { en: "Converts based on standard SRT and VTT structure.", ja: "基本的なSRT/VTT構造を基準に変換します。", zh: "按常见 SRT、VTT 结构进行转换。" }],
  ["형식 변환", { en: "Convert format", ja: "形式を変換", zh: "转换格式" }],
  ["자막 시간 보정", { en: "Subtitle timing shifter", ja: "字幕タイミング補正", zh: "字幕时间校正" }],
  ["자막 시간 보정 열기", { en: "Open subtitle timing shifter", ja: "字幕タイミング補正を開く", zh: "打开字幕时间校正" }],
  ["이동 초", { en: "Seconds to shift", ja: "移動秒数", zh: "移动秒数" }],
  ["음수 값을 넣으면 자막을 앞으로 당기고, 양수 값을 넣으면 뒤로 미룹니다.", { en: "Use a negative value to move subtitles earlier, or a positive value to delay them.", ja: "負の値を入れると字幕を前へ、正の値を入れると後ろへずらします。", zh: "输入负数可提前字幕，输入正数可延后字幕。" }],
  ["시간 보정", { en: "Shift timing", ja: "時間を補正", zh: "校正时间" }],
  ["보정 결과", { en: "Shifted result", ja: "補正結果", zh: "校正结果" }],
  ["보정된 자막", { en: "Shifted subtitles", ja: "補正後の字幕", zh: "校正后的字幕" }],
  ["텍스트 업무 도구 목록", { en: "Text tools list", ja: "テキストツール一覧", zh: "文本工具列表" }],
  ["텍스트 업무 도구를 브라우저에서 바로 사용하세요", { en: "Use text tools directly in your browser", ja: "テキスト業務ツールをブラウザですぐ使えます", zh: "直接在浏览器中使用文本工具" }],
  ["이미지 업무 도구 목록", { en: "Image tools list", ja: "画像ツール一覧", zh: "图片工具列表" }],
  ["이미지 업무 도구를 브라우저에서 바로 사용하세요", { en: "Use image tools directly in your browser", ja: "画像業務ツールをブラウザですぐ使えます", zh: "直接在浏览器中使用图片工具" }],
  ["PDF 업무 도구 목록", { en: "PDF tools list", ja: "PDFツール一覧", zh: "PDF 工具列表" }],
  ["PDF 업무 도구를 브라우저에서 바로 사용하세요", { en: "Use PDF tools directly in your browser", ja: "PDF業務ツールをブラウザですぐ使えます", zh: "直接在浏览器中使用 PDF 工具" }],
  ["자막 업무 도구 목록", { en: "Subtitle tools list", ja: "字幕ツール一覧", zh: "字幕工具列表" }],
  ["자막 업무 도구를 브라우저에서 바로 사용하세요", { en: "Use subtitle tools directly in your browser", ja: "字幕業務ツールをブラウザですぐ使えます", zh: "直接在浏览器中使用字幕工具" }],
  ["음성·영상 업무 도구 목록", { en: "Audio and video tools list", ja: "音声・動画ツール一覧", zh: "音频和视频工具列表" }],
  ["음성·영상 업무 도구를 브라우저에서 바로 사용하세요", { en: "Use audio and video tools directly in your browser", ja: "音声・動画業務ツールをブラウザですぐ使えます", zh: "直接在浏览器中使用音频和视频工具" }],
  ["Text Tools 목록", { en: "Text tools list", ja: "テキストツール一覧", zh: "文本工具列表" }],
  ["Image Tools 목록", { en: "Image tools list", ja: "画像ツール一覧", zh: "图片工具列表" }],
  ["PDF Tools 목록", { en: "PDF tools list", ja: "PDFツール一覧", zh: "PDF 工具列表" }],
  ["Subtitle Tools 목록", { en: "Subtitle tools list", ja: "字幕ツール一覧", zh: "字幕工具列表" }],
  ["Audio & Video Tools 목록", { en: "Audio and video tools list", ja: "音声・動画ツール一覧", zh: "音频和视频工具列表" }],
  ["テキストツール 목록", { en: "Text tools list", ja: "テキストツール一覧", zh: "文本工具列表" }],
  ["画像ツール 목록", { en: "Image tools list", ja: "画像ツール一覧", zh: "图片工具列表" }],
  ["PDFツール 목록", { en: "PDF tools list", ja: "PDFツール一覧", zh: "PDF 工具列表" }],
  ["字幕ツール 목록", { en: "Subtitle tools list", ja: "字幕ツール一覧", zh: "字幕工具列表" }],
  ["音声・動画ツール 목록", { en: "Audio and video tools list", ja: "音声・動画ツール一覧", zh: "音频和视频工具列表" }],
  ["文本工具 목록", { en: "Text tools list", ja: "テキストツール一覧", zh: "文本工具列表" }],
  ["图片工具 목록", { en: "Image tools list", ja: "画像ツール一覧", zh: "图片工具列表" }],
  ["PDF工具 목록", { en: "PDF tools list", ja: "PDFツール一覧", zh: "PDF 工具列表" }],
  ["字幕工具 목록", { en: "Subtitle tools list", ja: "字幕ツール一覧", zh: "字幕工具列表" }],
  ["音频和视频工具 목록", { en: "Audio and video tools list", ja: "音声・動画ツール一覧", zh: "音频和视频工具列表" }],
  ["표", { en: "Table", ja: "表", zh: "表格" }],
  ["현재 표", { en: "Current table", ja: "現在の表", zh: "当前表格" }],
  ["마크다운 표", { en: "Markdown table", ja: "Markdown表", zh: "Markdown 表格" }],
  ["행", { en: "Rows", ja: "行", zh: "行" }],
  ["열", { en: "Columns", ja: "列", zh: "列" }],
  ["내용", { en: "Content", ja: "内容", zh: "内容" }],
  ["제목", { en: "Title", ja: "タイトル", zh: "标题" }],
  ["텍스트", { en: "Text", ja: "テキスト", zh: "文本" }],
  ["0줄 입력", { en: "0 lines input", ja: "0行入力", zh: "0 行输入" }],
  ["# 제목\n\n문서를 작성하거나 일반 텍스트를 붙여넣으세요.", { en: "# Title\n\nWrite a document or paste plain text.", ja: "# タイトル\n\n文書を書くか、プレーンテキストを貼り付けます。", zh: "# 标题\n\n编写文档或粘贴纯文本。" }],
  ["모드를 선택하세요.", { en: "Choose a mode.", ja: "モードを選択してください。", zh: "请选择模式。" }],
  ["브라우저 자동", { en: "Browser auto", ja: "ブラウザ自動", zh: "浏览器自动" }],
  ["기본은 WebM입니다. 이 브라우저에서는 MP4 직접 녹화도 선택할 수 있습니다.", { en: "WebM is the default. This browser can also record directly as MP4.", ja: "標準はWebMです。このブラウザではMP4での直接録画も選択できます。", zh: "默认使用 WebM。此浏览器也可选择直接录制 MP4。" }],
  ["효과를 켜면 브라우저에서만 배경을 분리합니다.", { en: "When enabled, the background is separated only in the browser.", ja: "効果をオンにすると、背景分離はブラウザ内だけで行われます。", zh: "开启效果后，背景分离仅在浏览器内完成。" }],
  ["녹화를 완료하면 파일 정보가 표시됩니다.", { en: "File details appear after recording finishes.", ja: "録画が完了するとファイル情報が表示されます。", zh: "录制完成后会显示文件信息。" }],
  ["이 브라우저에서는 웹캠 녹화를 지원하지 않습니다.", { en: "This browser does not support webcam recording.", ja: "このブラウザはWebカメラ録画に対応していません。", zh: "此浏览器不支持摄像头录制。" }],
  ["마이크 권한 없이 카메라만 연결했습니다. 마이크가 필요하면 브라우저 설정에서 허용해 주세요.", { en: "Camera connected without microphone permission. Allow microphone access in browser settings if you need audio.", ja: "マイク権限なしでカメラのみ接続しました。音声が必要な場合はブラウザ設定でマイクを許可してください。", zh: "已在没有麦克风权限的情况下连接摄像头。如需声音，请在浏览器设置中允许麦克风。" }],
  ["녹화 종료 후 카메라를 끌 수 있습니다.", { en: "You can turn off the camera after stopping the recording.", ja: "録画を終了してからカメラをオフにできます。", zh: "录制结束后可以关闭摄像头。" }],
  ["이미지 파일을 선택해 주세요.", { en: "Choose an image file.", ja: "画像ファイルを選択してください。", zh: "请选择图片文件。" }],
  ["배경 이미지를 불러오지 못했습니다.", { en: "Could not load the background image.", ja: "背景画像を読み込めませんでした。", zh: "无法加载背景图片。" }],
  ["먼저 카메라를 켜 주세요.", { en: "Turn on the camera first.", ja: "先にカメラをオンにしてください。", zh: "请先打开摄像头。" }],
  ["이 브라우저에서는 선택한 형식으로 녹화할 수 없습니다.", { en: "This browser cannot record in the selected format.", ja: "このブラウザでは選択した形式で録画できません。", zh: "此浏览器无法使用所选格式录制。" }],
  ["녹화된 데이터가 없습니다.", { en: "There is no recorded data.", ja: "録画データがありません。", zh: "没有录制数据。" }],
  ["저장할 녹화 파일이 없습니다.", { en: "There is no recording to save.", ja: "保存する録画ファイルがありません。", zh: "没有可保存的录制文件。" }],
  ["현재 브라우저는 오디오 재생 편집을 지원하지 않습니다.", { en: "This browser does not support audio playback editing.", ja: "このブラウザは音声再生編集に対応していません。", zh: "此浏览器不支持音频播放编辑。" }],
  ["입력 내용은 브라우저 안에서만 파싱합니다. 문서용 복사는 가능한 경우 HTML 표와 텍스트 표를 함께 클립보드에 넣습니다.", { en: "Input is parsed only in the browser. Document copy adds both HTML and text table formats to the clipboard when possible.", ja: "入力内容はブラウザ内だけで解析します。文書用コピーでは、可能な場合HTML表とテキスト表を一緒にクリップボードへ入れます。", zh: "输入内容仅在浏览器内解析。文档复制会在可用时同时把 HTML 表格和文本表格放入剪贴板。" }],
  ["표 형식을 확인해 주세요.", { en: "Check the table format.", ja: "表の形式を確認してください。", zh: "请检查表格格式。" }],
  ["먼저 표를 만들어 주세요.", { en: "Create a table first.", ja: "先に表を作成してください。", zh: "请先生成表格。" }],
  ["문서용 표를 복사했습니다.", { en: "Document table copied.", ja: "文書用の表をコピーしました。", zh: "已复制文档用表格。" }],
  ["문서용 복사가 제한되어 엑셀용 표를 복사했습니다.", { en: "Document copy was restricted, so the spreadsheet table was copied instead.", ja: "文書用コピーが制限されたため、表計算用の表をコピーしました。", zh: "文档复制受限，已改为复制电子表格用表格。" }],
  ["엑셀용 표를 복사했습니다.", { en: "Spreadsheet table copied.", ja: "表計算用の表をコピーしました。", zh: "已复制电子表格用表格。" }],
  ["CSV를 복사했습니다.", { en: "CSV copied.", ja: "CSVをコピーしました。", zh: "已复制 CSV。" }],
  ["변환 가능한 CSV, TSV, XLSX 파일을 선택해 주세요.", { en: "Choose a CSV, TSV, or XLSX file that can be converted.", ja: "変換できるCSV、TSV、XLSXファイルを選択してください。", zh: "请选择可转换的 CSV、TSV 或 XLSX 文件。" }],
  ["스프레드시트 변환에 실패했습니다.", { en: "Spreadsheet conversion failed.", ja: "スプレッドシートの変換に失敗しました。", zh: "电子表格转换失败。" }],
  ["ZIP 파일 생성에 실패했습니다.", { en: "Could not create the ZIP file.", ja: "ZIPファイルを作成できませんでした。", zh: "无法生成 ZIP 文件。" }],
  ["찾을 값을 입력해 주세요.", { en: "Enter the value to find.", ja: "検索する値を入力してください。", zh: "请输入要查找的内容。" }],
  ["복사할 마크다운이 없습니다.", { en: "There is no Markdown to copy.", ja: "コピーするMarkdownがありません。", zh: "没有可复制的 Markdown。" }],
  ["저장할 마크다운이 없습니다.", { en: "There is no Markdown to save.", ja: "保存するMarkdownがありません。", zh: "没有可保存的 Markdown。" }],
  ["선택한 파일은 자체 서버로 업로드되지 않습니다. 변환 라이브러리만 필요할 때 CDN에서 불러옵니다.", { en: "Selected files are not uploaded to our server. Conversion libraries are loaded from a CDN only when needed.", ja: "選択したファイルは自社サーバーへアップロードされません。変換ライブラリは必要な時だけCDNから読み込みます。", zh: "所选文件不会上传到本站服务器。仅在需要时从 CDN 加载转换库。" }],
  ["링크는 텍스트만 남기기", { en: "Keep link text only", ja: "リンクは文字だけ残す", zh: "链接仅保留文本" }],
  ["위 붙여넣기 칸에 스크린샷 이미지를 붙여넣으면 브라우저 안에서만 QR 내용을 읽습니다.", { en: "Paste a screenshot above to read QR content only in the browser.", ja: "上の貼り付け欄にスクリーンショット画像を貼ると、QR内容をブラウザ内だけで読み取ります。", zh: "把截图粘贴到上方区域后，只会在浏览器内读取二维码内容。" }],
  ["스샷 저장기", { en: "Screenshot saver", ja: "スクリーンショット保存", zh: "截图保存器" }],
  ["스샷 저장기 열기", { en: "Open screenshot saver", ja: "スクリーンショット保存を開く", zh: "打开截图保存器" }],
  ["스크린샷 붙여넣기", { en: "Paste screenshot", ja: "スクリーンショットを貼り付け", zh: "粘贴截图" }],
  ["Win+Shift+S로 영역 캡처 후 이 칸에 Ctrl+V", { en: "Capture an area with Win+Shift+S, then press Ctrl+V here", ja: "Win+Shift+Sで範囲をキャプチャしてからここでCtrl+V", zh: "用 Win+Shift+S 截取区域后，在此按 Ctrl+V" }],
  ["저장된 스크린샷 파일을 선택하거나 이 영역에 끌어다 놓습니다.", { en: "Choose a saved screenshot file or drop it here.", ja: "保存済みのスクリーンショットを選択するか、この領域へドロップします。", zh: "选择已保存的截图文件，或拖放到此区域。" }],
  ["저장 위치", { en: "Save location", ja: "保存先", zh: "保存位置" }],
  ["저장 위치 설정", { en: "Set save location", ja: "保存先を設定", zh: "设置保存位置" }],
  ["저장 위치 해제", { en: "Clear save location", ja: "保存先を解除", zh: "清除保存位置" }],
  ["저장 위치 바꾸기", { en: "Change save location", ja: "保存先を変更", zh: "更改保存位置" }],
  ["저장 위치를 설정하면 이후 붙여넣기 이미지를 같은 폴더에 자동 저장합니다.", { en: "Set a save location to automatically save future pasted images to the same folder.", ja: "保存先を設定すると、以後貼り付けた画像を同じフォルダーに自動保存します。", zh: "设置保存位置后，之后粘贴的图片会自动保存到同一文件夹。" }],
  ["이 브라우저는 저장 위치 고정을 지원하지 않습니다.", { en: "This browser does not support fixed save locations.", ja: "このブラウザは保存先の固定に対応していません。", zh: "此浏览器不支持固定保存位置。" }],
  ["이 브라우저는 저장 위치 고정을 지원하지 않아 기본 다운로드로 저장합니다.", { en: "This browser does not support fixed save locations, so files use the default download flow.", ja: "このブラウザは保存先の固定に対応していないため、通常のダウンロードで保存します。", zh: "此浏览器不支持固定保存位置，因此会使用默认下载流程保存。" }],
  ["저장 위치 권한이 필요합니다.", { en: "Save location permission is required.", ja: "保存先の権限が必要です。", zh: "需要保存位置权限。" }],
  ["저장 위치 권한이 필요합니다. 저장 위치 설정을 다시 눌러 허용해 주세요.", { en: "Save location permission is required. Press Set save location again and allow access.", ja: "保存先の権限が必要です。もう一度保存先を設定して許可してください。", zh: "需要保存位置权限。请再次点击设置保存位置并允许访问。" }],
  ["저장 위치 권한이 필요합니다. 저장 위치 바꾸기를 눌러 다시 허용해 주세요.", { en: "Save location permission is required. Press Change save location and allow access again.", ja: "保存先の権限が必要です。保存先を変更してもう一度許可してください。", zh: "需要保存位置权限。请点击更改保存位置并重新允许访问。" }],
  ["저장 위치 바꾸기를 눌러 다시 허용해 주세요.", { en: "Press Change save location and allow access again.", ja: "保存先を変更してもう一度許可してください。", zh: "请点击更改保存位置并重新允许访问。" }],
  ["저장 위치를 설정했습니다.", { en: "Save location set.", ja: "保存先を設定しました。", zh: "已设置保存位置。" }],
  ["저장 위치를 설정하지 못했습니다.", { en: "Could not set the save location.", ja: "保存先を設定できませんでした。", zh: "无法设置保存位置。" }],
  ["저장 위치를 설정하지 못했습니다. 브라우저 권한을 확인해 주세요.", { en: "Could not set the save location. Check browser permissions.", ja: "保存先を設定できませんでした。ブラウザの権限を確認してください。", zh: "无法设置保存位置。请检查浏览器权限。" }],
  ["저장 위치 설정 완료", { en: "Save location set", ja: "保存先設定完了", zh: "保存位置设置完成" }],
  ["현재 저장 위치", { en: "Current save location", ja: "現在の保存先", zh: "当前保存位置" }],
  ["저장 위치 권한 확인 필요", { en: "Save location permission check needed", ja: "保存先の権限確認が必要", zh: "需要检查保存位置权限" }],
  ["저장 위치 정보를 불러오지 못했습니다. 필요하면 다시 설정해 주세요.", { en: "Could not load save location info. Set it again if needed.", ja: "保存先情報を読み込めませんでした。必要に応じて再設定してください。", zh: "无法读取保存位置信息。如有需要请重新设置。" }],
  ["저장 위치를 해제했습니다.", { en: "Save location cleared.", ja: "保存先を解除しました。", zh: "已清除保存位置。" }],
  ["저장 위치를 해제했습니다. 이후 저장은 브라우저 다운로드로 처리됩니다.", { en: "Save location cleared. Future saves will use browser downloads.", ja: "保存先を解除しました。以後はブラウザのダウンロードで保存します。", zh: "已清除保存位置。之后将使用浏览器下载保存。" }],
  ["지정 폴더에 저장하지 못해 브라우저 다운로드로 저장했습니다.", { en: "Could not save to the chosen folder, so the browser download flow was used.", ja: "指定フォルダーに保存できなかったため、ブラウザのダウンロードで保存しました。", zh: "无法保存到指定文件夹，已改用浏览器下载保存。" }],
  ["지정 폴더 권한을 사용할 수 없어 브라우저 다운로드로 저장했습니다.", { en: "The chosen folder permission was unavailable, so the browser download flow was used.", ja: "指定フォルダーの権限を使用できなかったため、ブラウザのダウンロードで保存しました。", zh: "无法使用指定文件夹权限，已改用浏览器下载保存。" }],
  ["자동 저장을 시도했습니다. 저장 위치를 설정하면 지정 폴더에 바로 저장됩니다.", { en: "Tried automatic saving. Set a save location to write directly to that folder.", ja: "自動保存を試しました。保存先を設定すると指定フォルダーへ直接保存します。", zh: "已尝试自动保存。设置保存位置后会直接写入该文件夹。" }],
  ["저장 완료", { en: "Save complete", ja: "保存完了", zh: "保存完成" }],
  ["붙여넣으면 즉시 저장", { en: "Save immediately after paste", ja: "貼り付けたらすぐ保存", zh: "粘贴后立即保存" }],
  ["스크린샷 저장", { en: "Save screenshot", ja: "スクリーンショットを保存", zh: "保存截图" }],
  ["다시 저장", { en: "Save again", ja: "もう一度保存", zh: "再次保存" }],
  ["붙여넣은 이미지 지우기", { en: "Clear pasted image", ja: "貼り付け画像を消去", zh: "清除粘贴的图片" }],
  ["Ctrl+V 대기", { en: "Waiting for Ctrl+V", ja: "Ctrl+V待機中", zh: "等待 Ctrl+V" }],
  ["스크린샷 미리보기", { en: "Screenshot preview", ja: "スクリーンショットプレビュー", zh: "截图预览" }],
  ["아직 붙여넣은 스크린샷이 없습니다.", { en: "No pasted screenshot yet.", ja: "まだ貼り付けたスクリーンショットはありません。", zh: "尚未粘贴截图。" }],
  ["Win+Shift+S로 캡처한 뒤 Ctrl+V를 누르면 PNG로 바로 저장합니다.", { en: "Capture with Win+Shift+S, then press Ctrl+V to save as PNG immediately.", ja: "Win+Shift+Sでキャプチャし、Ctrl+VでPNGとしてすぐ保存します。", zh: "使用 Win+Shift+S 截图后按 Ctrl+V，即可立即保存为 PNG。" }],
  ["클립보드 이미지는 서버로 업로드하지 않고 브라우저 안에서만 처리합니다.", { en: "Clipboard images are processed only in the browser and are not uploaded to the server.", ja: "クリップボード画像はサーバーへアップロードせず、ブラウザ内だけで処理します。", zh: "剪贴板图片只在浏览器中处理，不会上传到服务器。" }],
  ["붙여넣은 이미지", { en: "Pasted image", ja: "貼り付け画像", zh: "已粘贴图片" }],
  ["붙여넣은 이미지를 처리하는 중입니다.", { en: "Processing the pasted image.", ja: "貼り付け画像を処理しています。", zh: "正在处理粘贴的图片。" }],
  ["스샷을 불러오는 중입니다.", { en: "Loading screenshot.", ja: "スクリーンショットを読み込んでいます。", zh: "正在读取截图。" }],
  ["다시 저장을 누르면 파일로 저장합니다.", { en: "Press Save again to download the file.", ja: "もう一度保存を押すとファイルとして保存します。", zh: "点击再次保存即可下载文件。" }],
  ["미리보기를 표시하지 못했지만 원본 PNG 저장은 시도했습니다.", { en: "Preview failed, but the original PNG save was attempted.", ja: "プレビューは表示できませんでしたが、元のPNG保存は試しました。", zh: "预览显示失败，但已尝试保存原始 PNG。" }],
  ["이미지 파일만 사용할 수 있습니다.", { en: "Only image files can be used.", ja: "画像ファイルのみ使用できます。", zh: "只能使用图片文件。" }],
  ["클립보드에 이미지가 없습니다. Win+Shift+S로 영역을 캡처한 뒤 다시 붙여넣어 주세요.", { en: "There is no image on the clipboard. Capture an area with Win+Shift+S, then paste again.", ja: "クリップボードに画像がありません。Win+Shift+Sで範囲をキャプチャしてからもう一度貼り付けてください。", zh: "剪贴板中没有图片。请用 Win+Shift+S 截取区域后重新粘贴。" }],
  ["클립보드 이미지를 불러오지 못했습니다. 다시 캡처해 붙여넣어 주세요.", { en: "Could not load the clipboard image. Capture it again and paste once more.", ja: "クリップボード画像を読み込めませんでした。もう一度キャプチャして貼り付けてください。", zh: "无法读取剪贴板图片。请重新截图后再次粘贴。" }],
  ["저장할 스크린샷이 없습니다.", { en: "There is no screenshot to save.", ja: "保存するスクリーンショットがありません。", zh: "没有可保存的截图。" }],
  ["스샷을 불러오지 못했습니다.", { en: "Could not load the screenshot.", ja: "スクリーンショットを読み込めませんでした。", zh: "无法读取截图。" }],
  ["스샷 저장을 완료하지 못했습니다.", { en: "Could not save the screenshot.", ja: "スクリーンショットを保存できませんでした。", zh: "无法保存截图。" }],
  ["스샷을 저장했습니다.", { en: "Screenshot saved.", ja: "スクリーンショットを保存しました。", zh: "截图已保存。" }],
  ["자동 저장을 시도했습니다. 다운로드가 보이지 않으면 다시 저장을 눌러 주세요.", { en: "Tried automatic saving. If no download appears, press Save again.", ja: "自動保存を試しました。ダウンロードが見えない場合はもう一度保存を押してください。", zh: "已尝试自动保存。如果没有看到下载，请点击再次保存。" }],
  ["이미지 내용은 서버로 전송되지 않습니다. 결과는 브라우저 안에서 만들어집니다.", { en: "Image content is not sent to the server. Results are created in the browser.", ja: "画像内容はサーバーへ送信されません。結果はブラウザ内で作成されます。", zh: "图片内容不会发送到服务器。结果会在浏览器内生成。" }],
  ["먼저 이미지를 선택해 주세요.", { en: "Choose an image first.", ja: "先に画像を選択してください。", zh: "请先选择图片。" }],
  ["먼저 압축 결과를 만들어 주세요.", { en: "Create a compressed result first.", ja: "先に圧縮結果を作成してください。", zh: "请先生成压缩结果。" }],
  ["먼저 JPG, PNG, WEBP 이미지를 선택해 주세요.", { en: "Choose a JPG, PNG, or WEBP image first.", ja: "先にJPG、PNG、WEBP画像を選択してください。", zh: "请先选择 JPG、PNG 或 WEBP 图片。" }],
  ["메타데이터 제거를 완료하지 못했습니다. 다른 이미지 파일로 다시 시도해 주세요.", { en: "Could not remove metadata. Try again with another image file.", ja: "メタデータを削除できませんでした。別の画像ファイルで再試行してください。", zh: "未能完成元数据清理，请换一张图片重试。" }],
  ["먼저 메타데이터 제거를 실행해 주세요.", { en: "Run metadata removal first.", ja: "先にメタデータ削除を実行してください。", zh: "请先执行元数据清理。" }],
  ["현재는 JPG, PNG, WEBP 이미지 파일만 지원합니다.", { en: "Currently only JPG, PNG, and WEBP image files are supported.", ja: "現在はJPG、PNG、WEBP画像ファイルのみ対応しています。", zh: "目前仅支持 JPG、PNG 和 WEBP 图片文件。" }],
  ["병합하려면 PDF 두 개 이상이 필요합니다.", { en: "Choose at least two PDFs to merge.", ja: "結合するにはPDFが2つ以上必要です。", zh: "合并需要至少两个 PDF。" }],
  ["PDF 병합을 완료하지 못했습니다. 파일 형식과 브라우저 상태를 확인해 주세요.", { en: "Could not complete PDF merge. Check the file format and browser state.", ja: "PDF結合を完了できませんでした。ファイル形式とブラウザの状態を確認してください。", zh: "未能完成 PDF 合并，请检查文件格式和浏览器状态。" }],
  ["분할할 PDF를 선택해 주세요.", { en: "Choose a PDF to split.", ja: "分割するPDFを選択してください。", zh: "请选择要拆分的 PDF。" }],
  ["PDF 분할을 완료하지 못했습니다. 파일 형식과 브라우저 상태를 확인해 주세요.", { en: "Could not complete PDF split. Check the file format and browser state.", ja: "PDF分割を完了できませんでした。ファイル形式とブラウザの状態を確認してください。", zh: "未能完成 PDF 拆分，请检查文件格式和浏览器状态。" }],
  ["PDF를 선택해 주세요.", { en: "Choose a PDF.", ja: "PDFを選択してください。", zh: "请选择 PDF。" }],
  ["유효한 페이지 범위를 입력해 주세요.", { en: "Enter a valid page range.", ja: "有効なページ範囲を入力してください。", zh: "请输入有效的页码范围。" }],
  ["PDF 페이지 추출을 완료하지 못했습니다.", { en: "Could not extract PDF pages.", ja: "PDFページを抽出できませんでした。", zh: "未能提取 PDF 页面。" }],
  ["이미지를 먼저 선택해 주세요.", { en: "Choose images first.", ja: "先に画像を選択してください。", zh: "请先选择图片。" }],
  ["이미지 PDF 변환을 완료하지 못했습니다.", { en: "Could not convert images to PDF.", ja: "画像のPDF変換を完了できませんでした。", zh: "未能将图片转换为 PDF。" }],
  ["PDF 이미지를 만들지 못했습니다. 다른 PDF로 다시 시도해 주세요.", { en: "Could not create PDF images. Try again with another PDF.", ja: "PDF画像を作成できませんでした。別のPDFで再試行してください。", zh: "无法生成 PDF 图片，请换一个 PDF 重试。" }],
  ["먼저 PDF 페이지를 렌더링해 주세요.", { en: "Render the PDF pages first.", ja: "先にPDFページをレンダリングしてください。", zh: "请先渲染 PDF 页面。" }],
  ["원본 형식과 대상 형식을 다시 확인해 주세요.", { en: "Check the source and target formats again.", ja: "元の形式と変換先形式をもう一度確認してください。", zh: "请重新检查源格式和目标格式。" }],
  ["SRT 또는 VTT 형식을 확인할 수 없습니다.", { en: "Could not detect an SRT or VTT format.", ja: "SRTまたはVTT形式を判定できません。", zh: "无法识别 SRT 或 VTT 格式。" }],
  ["원본 목록", { en: "Original list", ja: "元のリスト", zh: "原始列表" }],
  ["변환 전입니다.", { en: "No conversion yet.", ja: "まだ変換していません。", zh: "尚未转换。" }],
  ["변환 준비 중입니다.", { en: "Ready to convert.", ja: "変換準備完了です。", zh: "已准备转换。" }],
  ["변환 결과가 여기에 표시됩니다.", { en: "Conversion results appear here.", ja: "変換結果がここに表示されます。", zh: "转换结果会显示在这里。" }],
  ["QR 읽기", { en: "Read QR", ja: "QRを読み取る", zh: "读取二维码" }],
  ["QR에 넣을 내용을 입력해 주세요.", { en: "Enter content for the QR code.", ja: "QRコードに入れる内容を入力してください。", zh: "请输入二维码内容。" }],
  ["인식 안정성을 위해 어두운 색상과 밝은 배경으로 조정했습니다.", { en: "Adjusted to a dark color on a light background for more reliable scanning.", ja: "読み取りやすくするため、濃い色と明るい背景に調整しました。", zh: "已调整为深色前景和浅色背景，以提升识别稳定性。" }],
  ["QR을 생성하지 못했습니다. 내용을 줄이거나 잠시 후 다시 시도해 주세요.", { en: "Could not create the QR code. Shorten the content or try again later.", ja: "QRコードを作成できませんでした。内容を短くするか、少ししてから再試行してください。", zh: "无法生成二维码。请缩短内容或稍后重试。" }],
  ["먼저 QR 코드를 만들어 주세요.", { en: "Create a QR code first.", ja: "先にQRコードを作成してください。", zh: "请先生成二维码。" }],
  ["QR 파일을 저장하지 못했습니다. 다시 시도해 주세요.", { en: "Could not save the QR file. Try again.", ja: "QRファイルを保存できませんでした。再試行してください。", zh: "无法保存二维码文件，请重试。" }],
  ["QR 이미지 파일을 넣어 주세요.", { en: "Add a QR image file.", ja: "QR画像ファイルを追加してください。", zh: "请添加二维码图片文件。" }],
  ["먼저 QR 이미지 파일을 선택해 주세요.", { en: "Choose a QR image file first.", ja: "先にQR画像ファイルを選択してください。", zh: "请先选择二维码图片文件。" }],
  ["복사할 QR 결과가 없습니다.", { en: "There is no QR result to copy.", ja: "コピーするQR結果がありません。", zh: "没有可复制的二维码结果。" }],
  ["이미지 파일만 읽을 수 있습니다.", { en: "Only image files can be read.", ja: "画像ファイルのみ読み取れます。", zh: "只能读取图片文件。" }],
  ["QR 이미지를 읽지 못했습니다.", { en: "Could not read the QR image.", ja: "QR画像を読み取れませんでした。", zh: "无法读取二维码图片。" }],
  ["클립보드에 이미지가 없습니다.", { en: "There is no image on the clipboard.", ja: "クリップボードに画像がありません。", zh: "剪贴板中没有图片。" }],
  ["QR을 읽지 못했습니다.", { en: "Could not read the QR code.", ja: "QRコードを読み取れませんでした。", zh: "无法读取二维码。" }],
  ["예: 구버전 문구", { en: "e.g. old wording", ja: "例: 旧版の文言", zh: "例如：旧版文案" }],
  ["예: 새 문구", { en: "e.g. new wording", ja: "例: 新しい文言", zh: "例如：新版文案" }],
  [
    "예: 아래는 비교표입니다. | 항목 | 장점 | 단점 | | --- | --- | --- | | A안 | 빠름 | 비용 높음 | | B안 | 저렴 | 시간이 걸림 | 필요하면 이 표를 문서에 붙여넣어 주세요.",
    {
      en: "Example: Below is a comparison table. | Item | Pros | Cons | | --- | --- | --- | | Option A | Fast | Higher cost | | Option B | Affordable | Takes time | Paste this table into a document if needed.",
      ja: "例: 以下は比較表です。| 項目 | 良い点 | 注意点 | | --- | --- | --- | | A案 | 速い | 費用が高い | | B案 | 安い | 時間がかかる | 必要に応じてこの表を文書に貼り付けてください。",
      zh: "示例：下面是对比表。| 项目 | 优点 | 缺点 | | --- | --- | --- | | A方案 | 快 | 成本高 | | B方案 | 便宜 | 需要时间 | 可按需将此表粘贴到文档中。",
    },
  ],
  [
    "예: 아래는 비교표입니다.\n\n| 항목 | 장점 | 단점 |\n| --- | --- | --- |\n| A안 | 빠름 | 비용 높음 |\n| B안 | 저렴 | 시간이 걸림 |\n\n필요하면 이 표를 문서에 붙여넣어 주세요.",
    {
      en: "Example: Below is a comparison table.\n\n| Item | Pros | Cons |\n| --- | --- | --- |\n| Option A | Fast | Higher cost |\n| Option B | Affordable | Takes time |\n\nPaste this table into a document if needed.",
      ja: "例: 以下は比較表です。\n\n| 項目 | 良い点 | 注意点 |\n| --- | --- | --- |\n| A案 | 速い | 費用が高い |\n| B案 | 安い | 時間がかかる |\n\n必要に応じてこの表を文書に貼り付けてください。",
      zh: "示例：下面是对比表。\n\n| 项目 | 优点 | 缺点 |\n| --- | --- | --- |\n| A方案 | 快 | 成本高 |\n| B方案 | 便宜 | 需要时间 |\n\n可按需将此表粘贴到文档中。",
    },
  ],
];

function buildWorkspaceLocaleText(locale) {
  return Object.fromEntries(
    WORKSPACE_COMMON_TEXT.map(([source, copy]) => [source, copy?.[locale]]).filter(([, target]) => typeof target === "string")
  );
}

const WORKSPACE_TEXT_BY_LOCALE = {
  en: { ...ENGLISH_WORKSPACE_TEXT, ...buildWorkspaceLocaleText("en") },
  ja: buildWorkspaceLocaleText("ja"),
  zh: buildWorkspaceLocaleText("zh"),
};
let localizedWorkspaceObserver = null;

function localizeEnglishWorkspace(container) {
  localizeWorkspace(container);
}

function localizeWorkspace(container) {
  if (IS_KOREAN_LOCALE || !container || typeof MutationObserver === "undefined") return;
  translateWorkspaceTree(container);
  localizedWorkspaceObserver?.disconnect();
  localizedWorkspaceObserver = new MutationObserver(() => {
    localizedWorkspaceObserver.disconnect();
    translateWorkspaceTree(container);
    localizedWorkspaceObserver.observe(container, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ["aria-label", "placeholder", "title"],
    });
  });
  localizedWorkspaceObserver.observe(container, {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true,
    attributeFilter: ["aria-label", "placeholder", "title"],
  });
}

function translateWorkspaceTree(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || ["SCRIPT", "STYLE", "TEXTAREA"].includes(parent.tagName)) {
        return NodeFilter.FILTER_REJECT;
      }
      return /[가-힣]/.test(node.nodeValue || "") ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    },
  });

  const textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);
  textNodes.forEach((node) => {
    const translated = translateWorkspaceText(node.nodeValue);
    if (translated !== node.nodeValue) node.nodeValue = translated;
  });

  root.querySelectorAll("[aria-label], [placeholder], [title]").forEach((node) => {
    ["aria-label", "placeholder", "title"].forEach((attribute) => {
      const value = node.getAttribute(attribute);
      if (!value || !/[가-힣]/.test(value)) return;
      const translated = translateWorkspaceText(value);
      if (translated !== value) node.setAttribute(attribute, translated);
    });
  });
}

function translateWorkspaceText(value) {
  const text = String(value || "");
  const leading = text.match(/^\s*/)?.[0] || "";
  const trailing = text.match(/\s*$/)?.[0] || "";
  const compact = text.trim();
  if (!compact) return text;
  const localeText = WORKSPACE_TEXT_BY_LOCALE[APP_LOCALE] || {};
  const exact = localeText[compact];
  if (exact) return `${leading}${exact}${trailing}`;

  const dynamic = translateWorkspaceDynamicText(compact);
  let next = dynamic !== compact ? dynamic : compact;
  for (const [source, target] of Object.entries(localeText).sort((left, right) => right[0].length - left[0].length)) {
    if (source.length < 2 || !next.includes(source)) continue;
    next = next.split(source).join(target);
  }
  next = cleanupLocalizedWorkspaceText(next);
  return next !== compact ? `${leading}${next}${trailing}` : text;
}

function translateWorkspaceDynamicText(text) {
  if (IS_KOREAN_LOCALE) return text;
  const copy = {
    en: {
      char: "chars",
      line: "lines",
      item: "items",
      minute: "min",
      second: "sec",
      playhead: "Playhead",
      noSelectionTotal: "No selection · Total",
      selection: "Selection",
      duration: "Duration",
      size: "Size",
      type: "Type",
      zoom: "Zoom",
      camera: "Camera",
      table: (count) => `Table ${count}`,
      nth: (count) => `#${count}`,
      row: (count) => `${count} rows`,
      column: (count) => `${count} columns`,
      copiedRange: (range) => `Copied the selected ${range} range as an edit segment.`,
      volume: (scope, value) => `${scope === "선택 구간" ? "Selected range" : "Full recording"} volume set to ${value}%.`,
      prepared: (time, size, channels) => `${time} · ${size} · Prepared ${channels}-channel recording as a mono editing waveform.`,
      results: (count) => `${count} results created.`,
      changed: (count) => `${count} items changed.`,
      betaLimit: (limit) => `This beta currently supports recordings up to ${limit}.`,
      fileTooLarge: (limit) => `The file is too large. Try again with a phone recording up to ${limit}.`,
      transcriptionDone: "Transcription finished. Preprocessing kept the conversation flow and checked the volume. This is a review draft, so check important content again.",
      spreadsheetResults: (count) => `${count} result file ready.`,
      previewStart: "preview of the first rows",
      duplicateSummary: (total, removed, kept) => `${removed} of ${total} lines removed · ${kept} lines kept`,
      caseMode: (mode) => `${mode} mode result`,
      diffSummary: (kept, removed, added) => `${kept} kept · ${removed} removed · ${added} added`,
      qrCreated: "QR created. You can save it as SVG, PNG, or JPG.",
      conversionPreviewReady: "Conversion preview ready.",
      compressionSummary: (original, result, size) => `Original ${original} → result ${result} · ${size}`,
      metadataCleaned: (label, detail) => `Cleaned · ${label} removed · ${detail}`,
      mergeDone: (count) => `Merged ${count} files into one PDF.`,
      pagesExtracted: (count) => `Extracted ${count} pages.`,
      imagesPdfDone: (count) => `Created a PDF from ${count} images.`,
      pagesRendered: (count) => `Rendered ${count} pages.`,
      pageLabel: (count) => `Page ${count}`,
      subtitleShifted: (type, offset) => `${type} subtitles shifted by ${offset} sec.`,
      aboutMinutes: (count) => `about ${count} min`,
    },
    ja: {
      char: "文字",
      line: "行",
      item: "件",
      minute: "分",
      second: "秒",
      playhead: "再生位置",
      noSelectionTotal: "選択範囲なし · 全体",
      selection: "選択",
      duration: "長さ",
      size: "サイズ",
      type: "形式",
      zoom: "ズーム",
      camera: "カメラ",
      table: (count) => `表${count}`,
      nth: (count) => `${count}番目`,
      row: (count) => `${count}行`,
      column: (count) => `${count}列`,
      copiedRange: (range) => `選択した${range}の範囲を編集用にコピーしました。`,
      volume: (scope, value) => `${scope === "선택 구간" ? "選択範囲" : "録音全体"}の音量を${value}%にしました。`,
      prepared: (time, size, channels) => `${time} · ${size} · ${channels}チャンネル録音をモノラル編集波形として準備しました。`,
      results: (count) => `${count}件の結果を作成しました。`,
      changed: (count) => `${count}件を変更しました。`,
      betaLimit: (limit) => `現在のベータ版は${limit}以下の録音ファイルに対応しています。`,
      fileTooLarge: (limit) => `ファイルが大きすぎます。${limit}以下のスマホ録音でお試しください。`,
      transcriptionDone: "文字起こしが完了しました。前処理で会話の流れを保ち、音量を確認しました。確認用の下書きなので、重要な内容はもう一度確認してください。",
      spreadsheetResults: (count) => `${count}件の結果ファイルを準備しました。`,
      previewStart: "先頭部分のプレビュー",
      duplicateSummary: (total, removed, kept) => `${total}行中${removed}行を削除 · ${kept}行を保持`,
      caseMode: (mode) => `${mode}モードの結果`,
      diffSummary: (kept, removed, added) => `保持${kept}行 · 削除${removed}行 · 追加${added}行`,
      qrCreated: "QRを生成しました。SVG、PNG、JPGで保存できます。",
      conversionPreviewReady: "変換プレビューを準備しました。",
      compressionSummary: (original, result, size) => `元 ${original} → 結果 ${result} · ${size}`,
      metadataCleaned: (label, detail) => `整理完了 · ${label}を削除 · ${detail}`,
      mergeDone: (count) => `${count}件のPDFを1つに結合しました。`,
      pagesExtracted: (count) => `${count}ページを抽出しました。`,
      imagesPdfDone: (count) => `${count}枚の画像をPDFにまとめました。`,
      pagesRendered: (count) => `${count}ページをレンダリングしました。`,
      pageLabel: (count) => `${count}ページ`,
      subtitleShifted: (type, offset) => `${type}字幕を${offset}秒移動しました。`,
      aboutMinutes: (count) => `約${count}分`,
    },
    zh: {
      char: "字",
      line: "行",
      item: "项",
      minute: "分钟",
      second: "秒",
      playhead: "播放位置",
      noSelectionTotal: "未选择区间 · 总时长",
      selection: "选择",
      duration: "时长",
      size: "大小",
      type: "格式",
      zoom: "缩放",
      camera: "摄像头",
      table: (count) => `表格 ${count}`,
      nth: (count) => `第 ${count} 个`,
      row: (count) => `${count} 行`,
      column: (count) => `${count} 列`,
      copiedRange: (range) => `已将所选 ${range} 区间复制为编辑片段。`,
      volume: (scope, value) => `${scope === "선택 구간" ? "所选区间" : "整段录音"}音量已调整为 ${value}%。`,
      prepared: (time, size, channels) => `${time} · ${size} · 已将 ${channels} 声道录音准备为单声道编辑波形。`,
      results: (count) => `已生成 ${count} 个结果。`,
      changed: (count) => `已更改 ${count} 项。`,
      betaLimit: (limit) => `当前测试版支持 ${limit} 以内的录音文件。`,
      fileTooLarge: (limit) => `文件过大。请使用 ${limit} 以内的手机录音重试。`,
      transcriptionDone: "转写已完成。预处理已保留对话流并检查音量。这是供复核的草稿，重要内容请再次确认。",
      spreadsheetResults: (count) => `已准备 ${count} 个结果文件。`,
      previewStart: "前几行预览",
      duplicateSummary: (total, removed, kept) => `共 ${total} 行，已删除 ${removed} 行 · 保留 ${kept} 行`,
      caseMode: (mode) => `${mode} 模式结果`,
      diffSummary: (kept, removed, added) => `保留 ${kept} 行 · 删除 ${removed} 行 · 新增 ${added} 行`,
      qrCreated: "二维码已生成，可保存为 SVG、PNG 或 JPG。",
      conversionPreviewReady: "转换预览已准备好。",
      compressionSummary: (original, result, size) => `原始 ${original} → 结果 ${result} · ${size}`,
      metadataCleaned: (label, detail) => `清理完成 · 已移除${label} · ${detail}`,
      mergeDone: (count) => `已将 ${count} 个 PDF 文件合并为一个文件。`,
      pagesExtracted: (count) => `已提取 ${count} 页。`,
      imagesPdfDone: (count) => `已将 ${count} 张图片合并为 PDF。`,
      pagesRendered: (count) => `已渲染 ${count} 页。`,
      pageLabel: (count) => `第 ${count} 页`,
      subtitleShifted: (type, offset) => `${type} 字幕已移动 ${offset} 秒。`,
      aboutMinutes: (count) => `约 ${count} 分钟`,
    },
  }[APP_LOCALE];
  if (!copy) return text;
  return text
    .replace(/^재생 위치\s+/, `${copy.playhead} `)
    .replace(/^선택 구간 없음 · 전체\s+/, `${copy.noSelectionTotal} `)
    .replace(/^선택\s+/, `${copy.selection} `)
    .replace(/^길이\s+/, `${copy.duration} `)
    .replace(/^크기\s+/, `${copy.size} `)
    .replace(/^형식\s+/, `${copy.type} `)
    .replace(/^확대\s+/, `${copy.zoom} `)
    .replace(/(\d+)개 결과를 만들었습니다\./g, (_, count) => copy.results(count))
    .replace(/(\d+)개 항목이 변경되었습니다\./g, (_, count) => copy.changed(count))
    .replace(/^변환이 끝났습니다\. 전처리 완료: 대화 흐름을 유지하고 볼륨만 확인했습니다\. 결과는 검토용 초안이므로 중요한 내용은 다시 확인해 주세요\.$/g, copy.transcriptionDone)
    .replace(/(\d+)개 결과가 준비되었습니다\./g, (_, count) => copy.spreadsheetResults(count))
    .replace(/앞부분 미리보기/g, copy.previewStart)
    .replace(/(\d+)줄 중 (\d+)줄 제거 · (\d+)줄 유지/g, (_, total, removed, kept) => copy.duplicateSummary(total, removed, kept))
    .replace(/([^·\n]+?) 모드 결과/g, (_, mode) => copy.caseMode(mode.trim()))
    .replace(/유지 (\d+)줄 · 삭제 (\d+)줄 · 추가 (\d+)줄/g, (_, kept, removed, added) => copy.diffSummary(kept, removed, added))
    .replace(/QR 생성이 완료되었습니다\. SVG, PNG, JPG로 저장할 수 있습니다\./g, copy.qrCreated)
    .replace(/변환 미리보기를 준비했습니다\./g, copy.conversionPreviewReady)
    .replace(/원본 ([^→]+) → 결과 ([^·]+) · ([0-9]+ x [0-9]+)/g, (_, original, result, size) => copy.compressionSummary(original.trim(), result.trim(), size))
    .replace(/정리 완료 · ([^·]+) 제거 · (.+)$/g, (_, label, detail) => copy.metadataCleaned(label.trim(), detail.trim()))
    .replace(/병합 완료 · (\d+)개 파일을 하나로 묶었습니다\./g, (_, count) => copy.mergeDone(count))
    .replace(/(\d+)페이지를 추출했습니다\./g, (_, count) => copy.pagesExtracted(count))
    .replace(/(\d+)장 이미지를 PDF로 묶었습니다\./g, (_, count) => copy.imagesPdfDone(count))
    .replace(/(\d+)페이지 렌더링이 완료되었습니다\./g, (_, count) => copy.pagesRendered(count))
    .replace(/(\d+)페이지/g, (_, count) => copy.pageLabel(count))
    .replace(/([A-Z]+) 자막을 ([0-9.]+)초 이동했습니다\./g, (_, type, offset) => copy.subtitleShifted(type, offset))
    .replace(/약\s+(\d+)분/g, (_, count) => copy.aboutMinutes(count))
    .replace(/표 (\d+)/g, (_, count) => copy.table(count))
    .replace(/(\d+)번째/g, (_, count) => copy.nth(count))
    .replace(/(\d+)행/g, (_, count) => copy.row(count))
    .replace(/(\d+)열/g, (_, count) => copy.column(count))
    .replace(/(\d+)자/g, `$1 ${copy.char}`)
    .replace(/(\d+)줄/g, `$1 ${copy.line}`)
    .replace(/(\d+)개/g, `$1 ${copy.item}`)
    .replace(/(\d+)분/g, `$1 ${copy.minute}`)
    .replace(/(\d+)초/g, `$1 ${copy.second}`)
    .replace(/현재 베타 버전은 ([^ ]+) 이하 녹음 파일부터 지원합니다\./g, (_, limit) => copy.betaLimit(limit))
    .replace(/파일이 너무 큽니다\. ([^ ]+) 이하의 휴대폰 녹음 파일로 다시 시도해 주세요\./g, (_, limit) => copy.fileTooLarge(limit))
    .replace(/선택 구간 ([^)]+)을 편집 조각으로 복사했습니다\./g, (_, range) => copy.copiedRange(range))
    .replace(/(선택 구간|전체 녹음) 음량을 (\d+)%로 조절했습니다\./g, (_, scope, value) => copy.volume(scope, value))
    .replace(/([0-9:]+) · ([^·]+) · (\d+)채널 녹음을 모노 편집 파형으로 준비했습니다\./g, (_, time, size, channels) => copy.prepared(time, size, channels))
    .replace(/카메라 (\d+)/g, `${copy.camera} $1`);
}

function cleanupLocalizedWorkspaceText(text) {
  if (IS_KOREAN_LOCALE || !/[가-힣]/.test(text)) return text;
  const suffixPattern = /(을|를|은|는|이|가|로|으로|에|에서|에게|와|과|도|만|부터|까지|처럼|보다|마다|조차|마저)(?=\s|$|[.,!?。！？])/g;
  return text
    .replace(/([A-Za-z0-9)％%]+)(을|를|은|는|이|가|로|으로|에|에서|와|과|도|만|부터|까지)(?=\s|$|[.,!?。！？])/g, "$1")
    .replace(suffixPattern, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

const ANALYTICS_CONTROL_EVENTS = {
  startBtn: { event: "permission_request", action: "voice_start" },
  transcribeAudioBtn: { event: "tool_run", action: "transcribe_audio" },
  requestCameraPermissionBtn: { event: "permission_request", action: "camera_permission" },
  startCameraBtn: { event: "permission_request", action: "camera_start" },
  startRecordingBtn: { event: "tool_run", action: "record_start" },
  makeScriptBtn: { event: "tool_run", action: "make_script" },
  cleanBtn: { event: "tool_run", action: "clean" },
  runBtn: { event: "tool_run", action: "run" },
  extractBtn: { event: "tool_run", action: "extract" },
  makeBtn: { event: "tool_run", action: "make" },
  convertBtn: { event: "tool_run", action: "convert" },
  convertSpreadsheetBtn: { event: "tool_run", action: "convert_spreadsheet" },
  compressBtn: { event: "tool_run", action: "compress" },
  mergeBtn: { event: "tool_run", action: "merge" },
  splitBtn: { event: "tool_run", action: "split" },
  renderBtn: { event: "tool_run", action: "render" },
  shiftBtn: { event: "tool_run", action: "shift" },
  copyBtn: { event: "result_copy", action: "copy" },
  copyMarkdownBtn: { event: "result_copy", action: "copy_markdown" },
  copyPlainBtn: { event: "result_copy", action: "copy_plain" },
  downloadBtn: { event: "file_download", action: "download" },
  downloadZipBtn: { event: "file_download", action: "download_zip" },
  downloadTranscriptBtn: { event: "file_download", action: "download_transcript" },
  downloadAllBtn: { event: "file_download", action: "download_all" },
  downloadVideoBtn: { event: "file_download", action: "download_video" },
  downloadMarkdownBtn: { event: "file_download", action: "download_markdown" },
};

const HOME_CATEGORY_META = {
  "\uC74C\uC131": {
    label: "Core",
    description: "가장 자주 쓰는 입력 도구입니다.",
  },
  영상: {
    label: "Video",
    description: "카메라 녹화와 영상 작업을 브라우저에서 처리합니다.",
  },
  텍스트: {
    label: "Text",
    description: "복사한 글, AI 답변, 업무 메모를 빠르게 정리합니다.",
  },
  이미지: {
    label: "Image",
    description: "이미지 변환과 용량 조절 작업을 브라우저에서 처리합니다.",
  },
  PDF: {
    label: "PDF",
    description: "문서 병합, 분할, 페이지 추출 같은 기본 PDF 작업입니다.",
  },
  자막: {
    label: "Sub",
    description: "SRT와 VTT 자막을 정리하고 시간 싱크를 보정합니다.",
  },
};

const CATEGORY_PAGE_DEFS = [
  {
    id: "text",
    path: "/tools/text/",
    title: "텍스트 업무 도구",
    eyebrow: "Text Tools",
    description:
      "AI 표 복붙 변환, CSV 엑셀 변환, 마크다운 작성·보기, 글자수 세기, 줄바꿈 정리, 추출기처럼 매일 쓰는 텍스트·데이터 작업을 브라우저에서 바로 처리합니다.",
    metaDescription:
      "코워크스페이스 텍스트 업무 도구 모음입니다. AI 표 복붙 변환, CSV 엑셀 변환, 마크다운 편집기, MD 파일 뷰어, 글자수 세기, 줄바꿈 정리, 이메일·URL·전화번호 추출 등을 무료로 사용할 수 있습니다.",
    keywords: ["AI 표 변환", "CSV 엑셀 변환", "MD 파일 뷰어", "마크다운 편집기", "텍스트 정리"],
    categories: ["텍스트"],
    guide: [
      { title: "도구 선택", text: "정리, 계산, 추출, 비교처럼 필요한 텍스트 작업을 고릅니다." },
      { title: "내용 입력", text: "텍스트를 붙여넣고 필요한 옵션을 선택합니다." },
      { title: "결과 활용", text: "정리된 결과를 복사하거나 문서 작업에 바로 붙여넣습니다." },
    ],
  },
  {
    id: "pdf",
    path: "/tools/pdf/",
    title: "PDF 업무 도구",
    eyebrow: "PDF Tools",
    description: "PDF 합치기, 분할, 페이지 추출, 이미지 변환처럼 자주 쓰는 문서 작업을 설치 없이 처리합니다.",
    metaDescription:
      "코워크스페이스 PDF 업무 도구 모음입니다. PDF 합치기, PDF 분할, 페이지 추출, 이미지 PDF 변환을 브라우저에서 무료로 사용할 수 있습니다.",
    keywords: ["PDF 합치기", "PDF 분할", "PDF 페이지 추출", "PDF 변환"],
    categories: ["PDF"],
    guide: [
      { title: "파일 선택", text: "처리할 PDF나 이미지를 선택하거나 업로드 영역에 끌어다 놓습니다." },
      { title: "옵션 설정", text: "합치기, 분할 기준, 페이지 범위, 변환 형식을 지정합니다." },
      { title: "파일 저장", text: "완성된 결과 파일을 PC에 다운로드합니다." },
    ],
  },
  {
    id: "image",
    path: "/tools/image/",
    title: "이미지 업무 도구",
    eyebrow: "Image Tools",
    description: "스샷 저장, 이미지 크기 조절, 형식 변환, 용량 압축, EXIF 제거, QR 생성 작업을 브라우저 안에서 빠르게 처리합니다.",
    metaDescription:
      "코워크스페이스 이미지 업무 도구 모음입니다. 스샷 저장, 이미지 크기 조절, JPG PNG WEBP 변환, 이미지 압축, EXIF 메타데이터 제거, QR 코드 생성과 QR 링크 추출을 무료로 사용할 수 있습니다.",
    keywords: ["스샷 저장", "이미지 크기 조절", "이미지 변환", "이미지 압축", "EXIF 제거", "QR 코드"],
    categories: ["이미지"],
    guide: [
      { title: "이미지 선택", text: "사진, 캡처, 웹 업로드용 이미지를 선택하거나 스크린샷을 붙여넣습니다." },
      { title: "작업 적용", text: "스샷 저장, 크기, 형식, 품질, EXIF 제거, QR 생성 또는 QR 판독을 업무 목적에 맞게 처리합니다." },
      { title: "결과 다운로드", text: "브라우저에서 처리된 결과물을 바로 저장합니다." },
    ],
  },
  {
    id: "subtitle",
    path: "/tools/subtitle/",
    title: "자막 업무 도구",
    eyebrow: "Subtitle Tools",
    description: "SRT 자막 정리, SRT/VTT 변환, 자막 시간 보정을 영상 작업 흐름에 맞게 처리합니다.",
    metaDescription:
      "코워크스페이스 자막 업무 도구 모음입니다. SRT 자막 정리, SRT VTT 변환, 자막 시간 보정을 브라우저에서 무료로 사용할 수 있습니다.",
    keywords: ["SRT 자막 정리", "SRT VTT 변환", "자막 시간 보정", "자막 싱크"],
    categories: ["자막"],
    guide: [
      { title: "자막 입력", text: "SRT 또는 VTT 자막 파일이나 텍스트를 입력합니다." },
      { title: "정리 또는 변환", text: "번호, 공백, 형식, 시간 오프셋을 목적에 맞게 조정합니다." },
      { title: "편집툴에 적용", text: "정리된 자막을 복사하거나 파일로 저장해 영상 작업에 사용합니다." },
    ],
  },
  {
    id: "voice-video",
    path: "/tools/voice-video/",
    title: "음성·영상 업무 도구",
    eyebrow: "Voice & Video Tools",
    description: "실시간 받아쓰기, 녹음 파일 텍스트 변환, 녹음 파일 간편 편집, 웹캠 녹화를 브라우저에서 바로 실행합니다.",
    metaDescription:
      "코워크스페이스 음성·영상 업무 도구 모음입니다. 음성으로 텍스트 쓰기, 녹음 파일 텍스트 변환, 녹음 파일 간편 편집, 웹캠 녹화기를 로그인 없이 브라우저에서 사용할 수 있습니다.",
    keywords: ["음성 텍스트 변환", "녹음 파일 텍스트 변환", "녹음 파일 편집", "웹캠 녹화", "브라우저 녹화"],
    categories: ["음성", "영상"],
    guide: [
      { title: "권한 허용", text: "마이크나 카메라가 필요한 도구에서 브라우저 권한을 허용합니다." },
      { title: "입력 또는 편집", text: "음성을 실시간으로 받아 적거나 녹음 파일을 변환·편집하고, 필요한 경우 웹캠 영상을 녹화합니다." },
      { title: "결과 저장", text: "작성된 텍스트, 편집된 오디오, 녹화 파일을 로컬 PC에 저장합니다." },
    ],
  },
];

const CATEGORY_PAGE_DEFS_EN = [
  {
    id: "text",
    path: "/en/tools/text/",
    title: "Text Tools",
    eyebrow: "Text Tools",
    description:
      "Clean, convert, count, read Markdown, extract, compare, and reshape everyday text or data directly in your browser.",
    metaDescription:
      "A browser-based text tools collection for AI paste cleanup, AI table conversion, CSV and Excel conversion, Markdown editing and viewing, character counting, line break cleanup, extraction, duplicate removal, find and replace, case conversion, and text diff checks.",
    keywords: ["AI table converter", "CSV Excel converter", "Markdown viewer", "text cleanup", "character counter"],
    categories: ["Text"],
    guide: [
      { title: "Choose a task", text: "Pick the text cleanup, conversion, counting, extraction, or comparison tool you need." },
      { title: "Paste or load input", text: "Add text or a supported file and choose only the options required for the job." },
      { title: "Use the result", text: "Copy the cleaned result or download the generated file from your browser." },
    ],
  },
  {
    id: "pdf",
    path: "/en/tools/pdf/",
    title: "PDF Tools",
    eyebrow: "PDF Tools",
    description: "Merge, split, extract, and convert common PDF work without installing a separate app.",
    metaDescription:
      "A browser-based PDF tools collection for merging PDFs, splitting PDFs, extracting selected pages, converting images to PDF, and rendering PDF pages as images.",
    keywords: ["merge PDF", "split PDF", "extract PDF pages", "image to PDF", "PDF to image"],
    categories: ["PDF"],
    guide: [
      { title: "Choose files", text: "Select the PDF or images you want to process." },
      { title: "Set options", text: "Choose page order, split interval, page ranges, or conversion output." },
      { title: "Download", text: "Save the generated PDF or image files locally." },
    ],
  },
  {
    id: "image",
    path: "/en/tools/image/",
    title: "Image Tools",
    eyebrow: "Image Tools",
    description:
      "Save pasted screenshots, resize, convert, compress, remove metadata, create QR codes, and read QR images in the browser.",
    metaDescription:
      "A browser-based image tools collection for saving pasted screenshots, resizing images, converting JPG PNG WEBP files, compressing images, removing EXIF metadata, generating QR codes, and extracting QR links.",
    keywords: ["screenshot saver", "image resizer", "image converter", "image compressor", "EXIF remover", "QR code"],
    categories: ["Image"],
    guide: [
      { title: "Choose an image", text: "Paste a screenshot or select a photo, upload image, or QR image." },
      { title: "Apply the task", text: "Save a screenshot, resize, convert, compress, strip metadata, generate QR, or read QR content." },
      { title: "Save the output", text: "Download the browser-generated result." },
    ],
  },
  {
    id: "subtitle",
    path: "/en/tools/subtitle/",
    title: "Subtitle Tools",
    eyebrow: "Subtitle Tools",
    description: "Clean SRT files, convert between SRT and VTT, and shift subtitle timing for video workflows.",
    metaDescription:
      "A browser-based subtitle tools collection for SRT cleanup, SRT VTT conversion, and subtitle timing shifts.",
    keywords: ["SRT cleaner", "SRT to VTT", "subtitle timing", "caption sync"],
    categories: ["Subtitles"],
    guide: [
      { title: "Add subtitles", text: "Paste SRT or VTT text, or load a subtitle file." },
      { title: "Clean or convert", text: "Fix numbering, normalize format, switch file type, or shift timings." },
      { title: "Use in editing", text: "Copy or download the subtitle file for your video tool." },
    ],
  },
  {
    id: "voice-video",
    path: "/en/tools/voice-video/",
    title: "Audio & Video Tools",
    eyebrow: "Audio & Video Tools",
    description:
      "Use dictation, audio file transcription, waveform audio editing, and webcam recording directly in the browser.",
    metaDescription:
      "A browser-based audio and video tools collection for speech to text, audio file transcription, audio trimming and joining, and webcam recording.",
    keywords: ["speech to text", "audio transcription", "audio trimmer", "webcam recorder", "browser recording"],
    categories: ["Audio", "Video"],
    guide: [
      { title: "Allow permissions", text: "Grant microphone or camera access only when the selected tool requires it." },
      { title: "Record or edit", text: "Dictate, transcribe an audio file, edit a recording waveform, or record webcam video." },
      { title: "Save locally", text: "Download text, edited audio, or recorded video from the browser." },
    ],
  },
];

const CATEGORY_PAGE_DEFS_JA = [
  {
    id: "text",
    path: "/ja/tools/text/",
    title: "テキストツール",
    eyebrow: "Text Tools",
    description: "AI文章の整形、表変換、CSV/Excel変換、Markdown編集、文字数確認、抽出、比較をブラウザで処理します。",
    metaDescription:
      "ko-workspaceの日本語テキストツール集です。AI貼り付け整形、AI表変換、CSV Excel変換、Markdown編集、MDビューア、文字数カウント、改行整形、抽出、差分確認をブラウザで使えます。",
    keywords: ["テキスト整形", "AI表変換", "CSV Excel変換", "Markdown", "文字数"],
    categories: ["テキスト"],
    guide: [
      { title: "作業を選ぶ", text: "整形、変換、カウント、抽出、比較から必要なツールを選びます。" },
      { title: "入力を追加", text: "テキストを貼り付けるか対応ファイルを選びます。" },
      { title: "結果を使う", text: "ブラウザで生成された結果をコピーまたは保存します。" },
    ],
  },
  {
    id: "pdf",
    path: "/ja/tools/pdf/",
    title: "PDFツール",
    eyebrow: "PDF Tools",
    description: "PDFの結合、分割、ページ抽出、画像変換をインストールなしで処理します。",
    metaDescription: "PDF結合、PDF分割、ページ抽出、画像からPDF、PDFから画像をブラウザで処理できる無料ツール集です。",
    keywords: ["PDF結合", "PDF分割", "PDFページ抽出", "PDF変換"],
    categories: ["PDF"],
    guide: [
      { title: "ファイルを選ぶ", text: "処理したいPDFや画像を選択します。" },
      { title: "設定する", text: "順序、ページ範囲、分割条件、出力形式を指定します。" },
      { title: "保存する", text: "生成されたPDFや画像をローカルに保存します。" },
    ],
  },
  {
    id: "image",
    path: "/ja/tools/image/",
    title: "画像ツール",
    eyebrow: "Image Tools",
    description: "スクリーンショット保存、画像サイズ変更、形式変換、圧縮、EXIF削除、QR作成と読み取りをブラウザ内で実行します。",
    metaDescription:
      "スクリーンショット保存、画像リサイズ、JPG PNG WEBP変換、画像圧縮、EXIFメタデータ削除、QRコード作成、QRリンク読み取りをブラウザで使えるツール集です。",
    keywords: ["スクリーンショット保存", "画像リサイズ", "画像変換", "画像圧縮", "EXIF削除", "QRコード"],
    categories: ["画像"],
    guide: [
      { title: "画像を選ぶ", text: "スクリーンショットを貼り付けるか、写真やQR画像を選択します。" },
      { title: "処理する", text: "スクリーンショット保存、サイズ、形式、品質、メタデータ、QR処理を選びます。" },
      { title: "保存する", text: "ブラウザで作成された結果をダウンロードします。" },
    ],
  },
  {
    id: "subtitle",
    path: "/ja/tools/subtitle/",
    title: "字幕ツール",
    eyebrow: "Subtitle Tools",
    description: "SRT整形、SRT/VTT変換、字幕タイミング補正を動画作業向けに処理します。",
    metaDescription: "SRT字幕整形、SRT VTT変換、字幕時間補正をブラウザで実行できる字幕ツール集です。",
    keywords: ["SRT整形", "SRT VTT変換", "字幕タイミング", "字幕同期"],
    categories: ["字幕"],
    guide: [
      { title: "字幕を追加", text: "SRTまたはVTTのテキストやファイルを追加します。" },
      { title: "整形・変換", text: "番号、形式、出力形式、時間補正を設定します。" },
      { title: "動画作業へ", text: "字幕ファイルをコピーまたは保存して使います。" },
    ],
  },
  {
    id: "voice-video",
    path: "/ja/tools/voice-video/",
    title: "音声・動画ツール",
    eyebrow: "Audio & Video Tools",
    description: "音声入力、録音ファイル文字起こし、波形編集、Webカメラ録画をブラウザで使えます。",
    metaDescription:
      "音声入力、録音ファイル文字起こし、録音編集、Webカメラ録画をブラウザで使える音声・動画ツール集です。",
    keywords: ["音声入力", "録音文字起こし", "音声編集", "Webカメラ録画"],
    categories: ["音声", "動画"],
    guide: [
      { title: "権限を許可", text: "必要なツールだけマイクやカメラ権限を許可します。" },
      { title: "録音・編集", text: "音声入力、文字起こし、音声編集、カメラ録画を実行します。" },
      { title: "保存する", text: "テキスト、編集音声、録画ファイルをローカルに保存します。" },
    ],
  },
];

const CATEGORY_PAGE_DEFS_ZH = [
  {
    id: "text",
    path: "/zh/tools/text/",
    title: "文本工具",
    eyebrow: "Text Tools",
    description: "在浏览器中清理、转换、统计、查看Markdown、提取和比较日常文本与数据。",
    metaDescription:
      "ko-workspace中文文本工具集合，支持AI文本清理、AI表格转换、CSV Excel转换、Markdown编辑和查看、字数统计、换行清理、信息提取、重复行删除和文本比较。",
    keywords: ["文本清理", "AI表格转换", "CSV Excel转换", "Markdown", "字数统计"],
    categories: ["文本"],
    guide: [
      { title: "选择任务", text: "选择清理、转换、统计、提取或比较工具。" },
      { title: "添加输入", text: "粘贴文本或选择支持的文件。" },
      { title: "使用结果", text: "复制整理后的结果，或下载生成的文件。" },
    ],
  },
  {
    id: "pdf",
    path: "/zh/tools/pdf/",
    title: "PDF工具",
    eyebrow: "PDF Tools",
    description: "无需安装应用即可合并、拆分、提取和转换常见PDF文件。",
    metaDescription: "浏览器PDF工具集合，支持PDF合并、PDF拆分、页面提取、图片转PDF和PDF转图片。",
    keywords: ["PDF合并", "PDF拆分", "PDF页面提取", "PDF转换"],
    categories: ["PDF"],
    guide: [
      { title: "选择文件", text: "选择要处理的PDF或图片。" },
      { title: "设置选项", text: "设置顺序、页码范围、拆分规则或输出格式。" },
      { title: "下载结果", text: "将生成的PDF或图片保存到本地。" },
    ],
  },
  {
    id: "image",
    path: "/zh/tools/image/",
    title: "图片工具",
    eyebrow: "Image Tools",
    description: "在浏览器中保存粘贴的截图、调整图片尺寸、转换格式、压缩、删除元数据、生成和读取二维码。",
    metaDescription:
      "浏览器图片工具集合，支持粘贴截图保存、图片尺寸调整、JPG PNG WEBP转换、图片压缩、EXIF元数据删除、二维码生成和二维码链接读取。",
    keywords: ["截图保存", "图片尺寸调整", "图片转换", "图片压缩", "EXIF删除", "二维码"],
    categories: ["图片"],
    guide: [
      { title: "选择图片", text: "粘贴截图，或选择照片、上传图片、二维码图片。" },
      { title: "执行处理", text: "保存截图、调整尺寸、转换格式、压缩、删除元数据或处理二维码。" },
      { title: "保存输出", text: "下载浏览器生成的结果。" },
    ],
  },
  {
    id: "subtitle",
    path: "/zh/tools/subtitle/",
    title: "字幕工具",
    eyebrow: "Subtitle Tools",
    description: "清理SRT字幕、转换SRT和VTT，并调整字幕时间同步。",
    metaDescription: "浏览器字幕工具集合，支持SRT清理、SRT VTT转换和字幕时间校正。",
    keywords: ["SRT清理", "SRT VTT转换", "字幕时间", "字幕同步"],
    categories: ["字幕"],
    guide: [
      { title: "添加字幕", text: "粘贴SRT或VTT文本，或选择字幕文件。" },
      { title: "清理或转换", text: "修复编号、标准化格式、转换类型或移动时间轴。" },
      { title: "用于视频", text: "复制或下载字幕文件用于视频工具。" },
    ],
  },
  {
    id: "voice-video",
    path: "/zh/tools/voice-video/",
    title: "音频和视频工具",
    eyebrow: "Audio & Video Tools",
    description: "直接在浏览器中使用语音输入、录音转文字、波形音频编辑和摄像头录制。",
    metaDescription: "浏览器音频和视频工具集合，支持语音转文字、录音转文字、音频剪切拼接和网页摄像头录制。",
    keywords: ["语音转文字", "录音转文字", "音频剪切", "摄像头录制"],
    categories: ["音频", "视频"],
    guide: [
      { title: "允许权限", text: "仅在所选工具需要时允许麦克风或摄像头权限。" },
      { title: "录制或编辑", text: "进行语音输入、录音转文字、音频编辑或摄像头录制。" },
      { title: "本地保存", text: "从浏览器下载文本、编辑后的音频或录制视频。" },
    ],
  },
];

const CATEGORY_PAGE_DEFS_BY_LOCALE = {
  en: CATEGORY_PAGE_DEFS_EN,
  ja: CATEGORY_PAGE_DEFS_JA,
  zh: CATEGORY_PAGE_DEFS_ZH,
};
const CATEGORY_PAGE_DEFS_ACTIVE = IS_KOREAN_LOCALE ? CATEGORY_PAGE_DEFS : CATEGORY_PAGE_DEFS_BY_LOCALE[APP_LOCALE] || CATEGORY_PAGE_DEFS;
const CATEGORY_PAGE_MAP = Object.fromEntries(CATEGORY_PAGE_DEFS_ACTIVE.map((page) => [page.id, page]));

const LIBRARIES = {
  qrcode: {
    global: "qrcode",
    src: "https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qrcode.min.js",
  },
  jsqr: {
    global: "jsQR",
    src: "https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.js",
  },
  pdfLib: {
    global: "PDFLib",
    src: "https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js",
  },
  pdfjs: {
    global: "pdfjsLib",
    type: "module",
    src: "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.min.mjs",
    worker: "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.worker.min.mjs",
  },
  xlsx: {
    global: "XLSX",
    type: "module",
    src: "https://cdn.sheetjs.com/xlsx-0.20.3/package/xlsx.mjs",
  },
  jszip: {
    global: "JSZip",
    src: "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js",
  },
  transformers: {
    global: "TransformersJS",
    type: "module",
    src: "https://cdn.jsdelivr.net/npm/@huggingface/transformers@4.1.0",
  },
};

const libraryCache = {};

const appState = {
  category: ALL_CATEGORY_LABEL,
  activeToolId: "",
  categoryPageId: "",
  quickOffset: 0,
  quickMotion: "",
  quickMotionTimerId: null,
  selectedText: "",
  dismissedSelectionText: "",
  selectionDismissedByPointer: false,
  lastPointer: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
  selectionPointerDown: null,
  selectionCheckTimerId: null,
};

const els = {
  heroEyebrow: document.querySelector("#heroEyebrow"),
  pageTitle: document.querySelector("#pageTitle"),
  pageDescription: document.querySelector("#pageDescription"),
  toolSearch: document.querySelector("#toolSearch"),
  categoryFilters: document.querySelector("#categoryFilters"),
  toolList: document.querySelector("#toolList"),
  toolOverview: document.querySelector("#toolOverview"),
  toolWorkspace: document.querySelector("#toolWorkspace"),
  toolGuideList: document.querySelector("#toolGuideList"),
  helpBtn: document.querySelector("#helpBtn"),
  helpDialog: document.querySelector("#helpDialog"),
  helpCloseBtn: document.querySelector("#helpCloseBtn"),
  selectionCopyBtn: document.querySelector("#selectionCopyBtn"),
};

function init() {
  applyLocaleChrome();
  bindGlobalEvents();
  renderCategoryFilters();
  renderSidebarTools();

  const activeTool = getActiveTool();
  const activeCategoryPage = getActiveCategoryPage();
  if (activeTool) {
    renderToolPage(activeTool);
  } else if (activeCategoryPage) {
    renderCategoryPage(activeCategoryPage);
  } else {
    renderHomePage();
  }

  initAdSlots();
  injectStructuredData(activeTool, activeCategoryPage);
}

function applyLocaleChrome() {
  document.documentElement.lang = ACTIVE_LOCALE_CONFIG.htmlLang;
  if (els.toolSearch) {
    els.toolSearch.placeholder = t("searchPlaceholder");
    els.toolSearch.setAttribute("aria-label", t("searchLabel"));
  }
  if (els.helpBtn) {
    els.helpBtn.setAttribute("aria-label", t("help"));
    els.helpBtn.title = t("help");
  }
  if (els.selectionCopyBtn) {
    els.selectionCopyBtn.textContent = t("selectionCopy");
  }
  document.querySelectorAll('[data-i18n="privacy"]').forEach((node) => {
    node.textContent = t("privacy");
  });
  document.querySelectorAll('[data-i18n="terms"]').forEach((node) => {
    node.textContent = t("terms");
  });
}

function getActiveTool() {
  const toolId = document.body.dataset.tool;
  return TOOL_MAP[toolId] || null;
}

function getActiveCategoryPage() {
  const categoryId = document.body.dataset.categoryPage;
  return CATEGORY_PAGE_MAP[categoryId] || null;
}

function bindGlobalEvents() {
  ensureBookmarkPromptButton();
  els.toolSearch.addEventListener("input", () => {
    renderSidebarTools();
    filterHomeToolCards();
  });
  if (els.helpBtn && els.helpDialog && els.helpCloseBtn) {
    els.helpBtn.addEventListener("click", openHelpDialog);
    els.helpCloseBtn.addEventListener("click", closeHelpDialog);
    els.helpDialog.addEventListener("click", closeHelpDialogFromBackdrop);
  }
  els.pageTitle.addEventListener("click", handlePageTitleReload);
  els.pageTitle.addEventListener("keydown", handlePageTitleReloadKeydown);

  els.selectionCopyBtn.addEventListener("pointerdown", (event) => event.preventDefault());
  els.selectionCopyBtn.addEventListener("click", copySelectedText);

  document.addEventListener("pointerdown", handleSelectionPointerDown, true);
  document.addEventListener("pointerup", handleSelectionPointerUp);
  document.addEventListener("selectionchange", queueSelectionCheck);
  document.addEventListener("keyup", handleSelectionKeyUp);
  document.addEventListener("mouseup", queueSelectionCheck);
  document.addEventListener("input", queueSelectionCheck, true);
  document.addEventListener("click", handleAnalyticsClick, true);
  window.addEventListener("scroll", hideSelectionCopyButton, true);
  window.addEventListener("resize", hideSelectionCopyButton);
  window.addEventListener("error", handleGlobalAppError);
  window.addEventListener("unhandledrejection", handleGlobalAppError);
}

function ensureBookmarkPromptButton() {
  const links = document.querySelector(".topbar-policy-links") || document.querySelector(".topbar-links");
  if (!links || links.querySelector(".topbar-favorite")) return;

  const button = document.createElement("button");
  button.className = "topbar-favorite";
  button.type = "button";
  button.setAttribute("aria-label", t("bookmarkAria"));
  button.title = t("bookmarkTitle");
  button.innerHTML = `<span aria-hidden="true">★</span><span>${escapeHtml(t("bookmarkTitle"))}</span>`;
  button.addEventListener("click", showBookmarkPrompt);
  links.appendChild(button);
}

function showBookmarkPrompt() {
  const isAppleDevice = /Mac|iPhone|iPad|iPod/i.test(navigator.platform || "");
  const shortcut = isAppleDevice ? "Cmd+D" : "Ctrl+D";
  trackBookmarkPromptOpen();
  showToast(t("bookmarkToast", shortcut));
}

function handlePageTitleReload() {
  if (!appState.activeToolId) return;
  window.location.reload();
}

function handlePageTitleReloadKeydown(event) {
  if (!appState.activeToolId || !["Enter", " "].includes(event.key)) return;
  event.preventDefault();
  window.location.reload();
}

function openHelpDialog() {
  if (typeof els.helpDialog.showModal === "function") {
    els.helpDialog.showModal();
    return;
  }

  els.helpDialog.setAttribute("open", "");
}

function closeHelpDialog() {
  if (typeof els.helpDialog.close === "function") {
    els.helpDialog.close();
    return;
  }

  els.helpDialog.removeAttribute("open");
}

function closeHelpDialogFromBackdrop(event) {
  if (event.target === els.helpDialog) {
    closeHelpDialog();
  }
}

function initAdSlots() {
  const adUnits = document.querySelectorAll(".ad-slot .adsbygoogle");
  if (adUnits.length === 0) return;

  window.adsbygoogle = window.adsbygoogle || [];
  adUnits.forEach(() => {
    try {
      window.adsbygoogle.push({});
    } catch (error) {
      // Ignore ad boot errors until real AdSense code is added.
    }
  });
}

function renderCategoryFilters() {
  els.categoryFilters.innerHTML = CATEGORY_ORDER.map((category) => {
    const activeClass = category === appState.category ? "is-active" : "";
    const count =
      category === ALL_CATEGORY_LABEL
        ? TOOL_DEFS_ACTIVE.length
        : TOOL_DEFS_ACTIVE.filter((tool) => tool.category === category).length;
    return `
      <button class="${activeClass}" type="button" data-category="${category}" aria-pressed="${category === appState.category}">
        <span>${category}</span>
        <small>${count}</small>
      </button>
    `;
  }).join("");

  els.categoryFilters.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      appState.category = button.dataset.category;
      renderCategoryFilters();
      renderSidebarTools();
    });
  });
}

function renderSidebarTools() {
  const query = (els.toolSearch.value || "").trim().toLowerCase();
  const activeTool = getActiveTool();
  const filtered = TOOL_DEFS_ACTIVE.filter((tool) => {
    if (appState.category !== ALL_CATEGORY_LABEL && tool.category !== appState.category) {
      return false;
    }

    if (!query) return true;
    const haystack = [tool.title, tool.summary, tool.category, tool.keywords.join(" ")]
      .join(" ")
      .toLowerCase();
    return haystack.includes(query);
  });

  if (filtered.length === 0) {
    els.toolList.innerHTML = `<div class="tool-note">${escapeHtml(t("noSearchResult"))}</div>`;
    return;
  }

  els.toolList.innerHTML = filtered
    .map((tool) => {
      const activeClass = activeTool && activeTool.id === tool.id ? "is-active" : "";
      const tags = tool.keywords
        .slice(0, 4)
        .map((keyword) => `<span>${escapeHtml(keyword)}</span>`)
        .join("");
      return `
        <a class="tool-link ${activeClass}" href="${tool.path}" data-category="${escapeHtml(tool.category)}">
          <div class="tool-link-head">
            <span class="tool-link-category">${escapeHtml(tool.category)}</span>
            <div class="tool-link-tags">${tags}</div>
          </div>
          <strong>${escapeHtml(tool.title)}</strong>
          <p>${escapeHtml(tool.summary)}</p>
        </a>
      `;
    })
    .join("");
}

function renderHomePage() {
  appState.activeToolId = "";
  appState.categoryPageId = "";
  setPageMode("home");
  const localizedHomeCopy = {
    en: {
      eyebrow: "Browser-based office utilities",
      title: BRAND_NAME_EN,
      description: "Run practical text, image, PDF, subtitle, audio, and video tools directly in your browser.",
      metaTitle: `${BRAND_NAME_EN} | Browser-based Office Tools`,
      path: "/en/",
    },
    ja: {
      eyebrow: "ブラウザ型業務ツール",
      title: BRAND_NAME_EN,
      description: "テキスト、画像、PDF、字幕、音声、動画の小さな作業をブラウザ内で処理します。",
      metaTitle: `${BRAND_NAME_EN} | ブラウザで使える業務ツール`,
      path: "/ja/",
    },
    zh: {
      eyebrow: "浏览器办公工具",
      title: BRAND_NAME_EN,
      description: "直接在浏览器中处理文本、图片、PDF、字幕、音频和视频的日常小任务。",
      metaTitle: `${BRAND_NAME_EN} | 浏览器办公工具`,
      path: "/zh/",
    },
  };
  const homeCopy = localizedHomeCopy[APP_LOCALE] || {
    eyebrow: BRAND_NAME_EN,
    title: BRAND_NAME,
    description: "반복 업무를 브라우저에서 처리하고 필요한 결과만 직접 저장하세요.",
    metaTitle: `${BRAND_NAME} | 브라우저 기반 업무 도구 (${BRAND_NAME_EN})`,
    path: "/",
  };
  setHeroCopy(homeCopy.eyebrow, homeCopy.title, homeCopy.description);

  setDocumentMeta({
    title: homeCopy.metaTitle,
    description: BRAND_DESCRIPTION_LOCALIZED,
    url: `${TOOL_ORIGIN}${homeCopy.path}`,
  });
  setPageTitleReloadState(null);

  els.toolOverview.innerHTML = `
    <div class="home-divider" aria-hidden="true"></div>
    ${renderHomeCategoryLinks()}
    <div class="home-divider home-divider-after-categories" aria-hidden="true"></div>
  `;

  els.toolWorkspace.innerHTML = `
    <section class="home-tool-section home-directory" aria-label="${escapeHtml(t("directoryLabel"))}">
      <div class="tool-launch-grid">
        ${TOOL_DEFS_ACTIVE.map((tool) => renderToolLaunchCard(tool)).join("")}
      </div>
    </section>
  `;

  filterHomeToolCards();
  renderGuideList([]);
  renderToolDetailAccordion(null);
  renderQuickToolDock(null);
}

function renderCategoryPage(categoryPage) {
  appState.activeToolId = "";
  appState.categoryPageId = categoryPage.id;
  setPageMode("category");
  setHeroCopy(categoryPage.eyebrow, categoryPage.title, categoryPage.description);
  setPageTitleReloadState(null);
  setDocumentMeta({
    title: `${categoryPage.title} | ${t("freeTool")} - ${BRAND_NAME_LOCALIZED}`,
    description: categoryPage.metaDescription,
    url: `${TOOL_ORIGIN}${categoryPage.path}`,
  });

  const tools = getCategoryPageTools(categoryPage);
  els.toolOverview.innerHTML = `
    <div class="category-overview">
      <div>
        <p class="eyebrow">${escapeHtml(categoryPage.eyebrow)}</p>
        <h2>${escapeHtml(categoryPage.title)}</h2>
        <p>${escapeHtml(categoryPage.description)}</p>
      </div>
    </div>
  `;

  els.toolWorkspace.innerHTML = `
    <section class="category-tool-section" aria-label="${escapeHtml(categoryPage.title)} 목록">
      <div class="tool-launch-grid">
        ${tools.map((tool) => renderToolLaunchCard(tool)).join("")}
      </div>
    </section>
    <section class="panel category-seo-panel">
      <h2>${escapeHtml(categoryPage.title)}${escapeHtml(t("categorySeoSuffix"))}</h2>
      <p>${escapeHtml(categoryPage.metaDescription)}</p>
      <div class="seo-keywords">
        ${categoryPage.keywords.map((keyword) => `<span>${escapeHtml(keyword)}</span>`).join("")}
      </div>
    </section>
  `;

  renderGuideList(categoryPage.guide);
  renderToolDetailAccordion(null);
  renderQuickToolDock(null);
  trackCategoryEvent("category_open", categoryPage);
  localizeEnglishWorkspace(els.toolWorkspace);
}

function renderToolPage(tool) {
  appState.activeToolId = tool.id;
  appState.categoryPageId = "";
  setPageMode("tool");
  setHeroCopy(t("freeTool"), tool.title, tool.summary);
  setPageTitleReloadState(tool.title);
  setDocumentMeta({
    title: `${tool.seoTitle} | ${BRAND_NAME_LOCALIZED}`,
    description: tool.seoDescription,
    url: `${TOOL_ORIGIN}${tool.path}`,
  });

  els.toolOverview.innerHTML = `
    <div class="overview-header">
      <p class="eyebrow">${escapeHtml(tool.category)}</p>
      <h2>${renderToolTitle(tool)}</h2>
      <p>${escapeHtml(tool.summary)}</p>
    </div>
    <div class="overview-meta">
      ${tool.keywords.map((keyword) => `<span class="mini-pill">${escapeHtml(keyword)}</span>`).join("")}
    </div>
  `;

  renderGuideList(tool.guide);
  renderToolDetailAccordion(tool);
  renderQuickToolDock(tool);
  trackToolEvent("tool_open", tool);

  const renderer = TOOL_RENDERERS[tool.id];
  if (!renderer) {
    els.toolWorkspace.innerHTML = `<div class="tool-note">${escapeHtml(t("fallbackNotConnected"))}</div>`;
    return;
  }

  renderer(els.toolWorkspace);
  bindUploadBoxDrops(els.toolWorkspace);
  localizeEnglishWorkspace(els.toolWorkspace);
}

function setPageMode(mode) {
  document.body.classList.toggle("home-mode", mode === "home");
  document.body.classList.toggle("tool-mode", mode === "tool");
  document.body.classList.toggle("category-mode", mode === "category");
}

function getCategoryPageTools(categoryPage) {
  const categorySet = new Set(categoryPage.categories);
  return TOOL_DEFS_ACTIVE.filter((tool) => categorySet.has(tool.category));
}

function renderHomeSections() {
  return `
    <section class="home-tool-section home-directory" aria-label="${escapeHtml(t("directoryLabel"))}">
      <div class="tool-launch-grid">
        ${TOOL_DEFS_ACTIVE.map((tool) => renderToolLaunchCard(tool)).join("")}
      </div>
    </section>
  `;
}

function renderHomeCategoryLinks() {
  return `
    <nav class="home-category-links" aria-label="${escapeHtml(t("categoryTools"))}">
      ${CATEGORY_PAGE_DEFS_ACTIVE.map(
        (page) => `
          <a href="${page.path}" data-category="${escapeHtml(page.categories[0] || ALL_CATEGORY_LABEL)}">
            <span>${escapeHtml(page.eyebrow)}</span>
            <strong>${escapeHtml(page.title)}</strong>
          </a>
        `
      ).join("")}
    </nav>
  `;
}

function renderToolLaunchCard(tool) {
  const visual = getToolVisual(tool);
  const searchText = [tool.title, tool.summary, visual.copy, ...tool.keywords].join(" ");

  return `
    <a class="tool-launch-card" href="${tool.path}" data-category="${escapeHtml(tool.category)}" data-tone="${escapeHtml(visual.tone)}" data-search="${escapeHtml(searchText)}" aria-label="${escapeHtml(t("openToolLabel", tool.title))}">
      <span class="tool-launch-icon" aria-hidden="true">${escapeHtml(visual.icon)}</span>
      <span class="tool-launch-body">
        <strong>${renderToolTitle(tool)}</strong>
        <span>${escapeHtml(visual.copy)}</span>
      </span>
      <span class="tool-launch-arrow" aria-hidden="true">&rsaquo;</span>
    </a>
  `;
}

function renderToolTitle(tool) {
  const title = escapeHtml(tool.title);
  return tool.beta
    ? `<span class="tool-title-with-beta">${title}<span class="tool-beta-label">${escapeHtml(t("betaLabel"))}</span></span>`
    : title;
}

function renderBetaToolTitle(title) {
  return `<span class="tool-title-with-beta">${escapeHtml(title)}<span class="tool-beta-label">${escapeHtml(t("betaLabel"))}</span></span>`;
}

function filterHomeToolCards() {
  const query = (els.toolSearch?.value || "").trim().toLowerCase();
  document.querySelectorAll(".home-directory .tool-launch-card").forEach((card) => {
    const text = (card.dataset.search || card.textContent || "").toLowerCase();
    card.hidden = query.length > 0 && !text.includes(query);
  });
}

function setHeroCopy(kicker, title, description) {
  els.heroEyebrow.textContent = kicker;
  els.pageTitle.textContent = title;
  els.pageDescription.textContent = description;
}

function setPageTitleReloadState(toolTitle) {
  const isToolPage = Boolean(toolTitle);
  els.pageTitle.classList.toggle("is-reloadable", isToolPage);
  if (isToolPage) {
    els.pageTitle.tabIndex = 0;
    els.pageTitle.setAttribute("role", "button");
    const label =
      APP_LOCALE === "en"
        ? `Start a new ${toolTitle} task`
        : APP_LOCALE === "ja"
          ? `${toolTitle}を最初から始める`
          : APP_LOCALE === "zh"
            ? `重新开始 ${toolTitle}`
            : `${toolTitle} 새 작업 시작`;
    els.pageTitle.setAttribute("aria-label", label);
    els.pageTitle.title =
      APP_LOCALE === "en" ? "Start new task" : APP_LOCALE === "ja" ? "最初から始める" : APP_LOCALE === "zh" ? "重新开始" : "새 작업 시작";
    return;
  }

  els.pageTitle.removeAttribute("tabindex");
  els.pageTitle.removeAttribute("role");
  els.pageTitle.removeAttribute("aria-label");
  els.pageTitle.removeAttribute("title");
}

function setDocumentMeta({ title, description, url }) {
  document.title = title;
  setMetaContent('meta[name="description"]', description);
  setMetaContent('meta[property="og:title"]', title);
  setMetaContent('meta[property="og:description"]', description);
  setMetaContent('meta[property="og:url"]', url);
  setMetaContent('meta[name="twitter:title"]', title);
  setMetaContent('meta[name="twitter:description"]', description);
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.href = url;
}

function setMetaContent(selector, value) {
  const node = document.querySelector(selector);
  if (node) {
    node.setAttribute("content", value);
  }
}

function renderGuideList(steps) {
  if (!els.toolGuideList) return;
  if (!steps || steps.length === 0) {
    els.toolGuideList.innerHTML = "";
    return;
  }
  els.toolGuideList.innerHTML = steps
    .map(
      (step) => `
        <li>
          <strong>${escapeHtml(step.title)}</strong>
          <span>${escapeHtml(step.text)}</span>
        </li>
      `
    )
    .join("");
}

function renderToolDetailAccordion(tool) {
  const guidePanel = els.toolGuideList?.closest(".guide-panel");
  if (!guidePanel) return;

  guidePanel.querySelector("#toolDetailAccordion")?.remove();
  if (!tool) return;

  const detail = buildToolDetailContent(tool);
  const wrapper = document.createElement("details");
  wrapper.id = "toolDetailAccordion";
  wrapper.className = "tool-detail-accordion";
  wrapper.innerHTML = `
    <summary>
      <span>${escapeHtml(t("detailSummary"))}</span>
      <small>${escapeHtml(t("help"))}</small>
    </summary>
    <div class="tool-detail-body">
      <div class="tool-scenario-list">
        ${detail.scenarios
          .map(
            (scenario) => `
              <article class="tool-scenario-card">
                <h3>${escapeHtml(scenario.title)}</h3>
                <p>${escapeHtml(scenario.body)}</p>
                ${scenario.check ? `<p class="tool-scenario-check"><strong>${escapeHtml(t("scenarioCheckLabel"))}</strong> ${escapeHtml(scenario.check)}</p>` : ""}
              </article>
            `
          )
          .join("")}
      </div>
    </div>
  `;

  wrapper.addEventListener("toggle", () => {
    if (wrapper.open) {
      trackToolEvent("tool_help_open", tool, { section: "usage_scenarios" });
    }
  });

  els.toolGuideList.insertAdjacentElement("afterend", wrapper);
}

function buildToolDetailContent(tool) {
  return {
    scenarios: getToolScenarios(tool),
  };
}

function injectStructuredData(tool, categoryPage = null) {
  document.querySelectorAll('script[data-schema="dynamic"]').forEach((node) => node.remove());
  clearLegacyFaqStructuredData();
  if (categoryPage) {
    injectCategoryStructuredData(categoryPage);
    return;
  }
  if (document.querySelector(tool ? 'script[data-schema="static-tool"]' : 'script[data-schema="static-site"]')) {
    return;
  }
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.dataset.schema = "dynamic";
  const localeHomePath = ACTIVE_LOCALE_CONFIG.pathPrefix ? `${ACTIVE_LOCALE_CONFIG.pathPrefix}/` : "/";

  if (!tool) {
    const categories = CATEGORY_ORDER.filter((category) => category !== ALL_CATEGORY_LABEL).map((category) => ({
      "@type": "ListItem",
      position: CATEGORY_ORDER.indexOf(category),
      name: category,
    }));
    script.textContent = JSON.stringify(
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${TOOL_ORIGIN}${localeHomePath}#website`,
        name: BRAND_NAME_LOCALIZED,
        alternateName: IS_KOREAN_LOCALE ? [BRAND_NAME_EN, BRAND_DISPLAY_NAME] : [BRAND_NAME, BRAND_DISPLAY_NAME],
        url: `${TOOL_ORIGIN}${localeHomePath}`,
        inLanguage: ACTIVE_LOCALE_CONFIG.languageCode,
        description: BRAND_DESCRIPTION_LOCALIZED,
        hasPart: {
          "@type": "ItemList",
          itemListElement: categories,
        },
      },
      null,
      2
    );
  } else {
    script.textContent = JSON.stringify(
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: `${tool.title} - ${BRAND_NAME_LOCALIZED}`,
        alternateName: `${tool.title} - ${BRAND_NAME_EN}`,
        url: `${TOOL_ORIGIN}${tool.path}`,
        applicationCategory: "BusinessApplication",
        browserRequirements: "Requires a modern browser with JavaScript enabled",
        inLanguage: ACTIVE_LOCALE_CONFIG.languageCode,
        description: tool.seoDescription || tool.summary,
        keywords: tool.keywords.join(", "),
        publisher: {
          "@type": "Organization",
          name: BRAND_NAME_LOCALIZED,
          url: `${TOOL_ORIGIN}${localeHomePath}`,
        },
        operatingSystem: "Any",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "KRW",
        },
      },
      null,
      2
    );
  }

  document.head.appendChild(script);
}

function injectCategoryStructuredData(categoryPage) {
  const tools = getCategoryPageTools(categoryPage);
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.dataset.schema = "dynamic";
  const localeHomePath = ACTIVE_LOCALE_CONFIG.pathPrefix ? `${ACTIVE_LOCALE_CONFIG.pathPrefix}/` : "/";
  script.textContent = JSON.stringify(
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CollectionPage",
          "@id": `${TOOL_ORIGIN}${categoryPage.path}#page`,
          name: `${categoryPage.title} - ${BRAND_NAME_LOCALIZED}`,
          url: `${TOOL_ORIGIN}${categoryPage.path}`,
          inLanguage: ACTIVE_LOCALE_CONFIG.languageCode,
          description: categoryPage.metaDescription,
          isPartOf: {
            "@id": `${TOOL_ORIGIN}${localeHomePath}#website`,
          },
          mainEntity: {
            "@type": "ItemList",
            itemListElement: tools.map((tool, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: tool.title,
              url: `${TOOL_ORIGIN}${tool.path}`,
            })),
          },
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${TOOL_ORIGIN}${categoryPage.path}#breadcrumb`,
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: BRAND_NAME_LOCALIZED,
              item: `${TOOL_ORIGIN}${localeHomePath}`,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: categoryPage.title,
              item: `${TOOL_ORIGIN}${categoryPage.path}`,
            },
          ],
        },
      ],
    },
    null,
    2
  );
  document.head.appendChild(script);
}

function clearLegacyFaqStructuredData() {
  document.querySelectorAll('script[data-schema="dynamic-faq"]').forEach((node) => node.remove());
}

function handleAnalyticsClick(event) {
  const control = event.target.closest("button");
  if (!control?.id) return;

  const config = ANALYTICS_CONTROL_EVENTS[control.id];
  if (!config) return;

  const tool = TOOL_MAP[appState.activeToolId] || getActiveTool();
  if (!tool) return;

  trackToolEvent(config.event, tool, {
    action: config.action,
    control_id: control.id,
    output_format: readSafeOutputFormat(control.id),
  });
}

function readSafeOutputFormat(controlId) {
  if (!/^download|^record|^convert|^make/.test(controlId)) return "";
  const formatSelect = document.querySelector(
    "#recordFormat, #outputFormat, #targetFormat, #subtitleFormat, #downloadFormat"
  );
  return formatSelect ? String(formatSelect.value || "").slice(0, 32) : "";
}

function trackToolEvent(eventName, tool, params = {}) {
  if (!tool || typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    tool_id: tool.id,
    tool_category: tool.category,
    action: sanitizeAnalyticsValue(params.action),
    control_id: sanitizeAnalyticsValue(params.control_id),
    section: sanitizeAnalyticsValue(params.section),
    output_format: sanitizeAnalyticsValue(params.output_format),
  });
}

function trackCategoryEvent(eventName, categoryPage) {
  if (!categoryPage || typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    category_page_id: categoryPage.id,
    category_page_title: categoryPage.title,
    tool_count: getCategoryPageTools(categoryPage).length,
  });
}

function trackBookmarkPromptOpen() {
  if (typeof window === "undefined") return;

  const tool = TOOL_MAP[appState.activeToolId] || getActiveTool();
  const categoryPage = CATEGORY_PAGE_MAP[appState.categoryPageId] || getActiveCategoryPage();

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(buildBookmarkPromptEvent(tool, categoryPage));
}

function buildBookmarkPromptEvent(tool = null, categoryPage = null) {
  const pageType = tool ? "tool" : categoryPage ? "category" : "home";
  return {
    event: "bookmark_prompt_open",
    page_locale: APP_LOCALE,
    page_type: pageType,
    tool_id: sanitizeAnalyticsValue(tool?.id),
    tool_category: sanitizeAnalyticsValue(tool?.category),
    category_page_id: sanitizeAnalyticsValue(categoryPage?.id),
    action: "open_prompt",
    control_id: "topbar_favorite",
  };
}

function sanitizeAnalyticsValue(value) {
  if (value === undefined || value === null) return "";
  return String(value).replace(/[^\w.-]/g, "_").slice(0, 64);
}

function trackToolError(tool, error, action = "unknown") {
  trackToolEvent("tool_error", tool, {
    action,
    control_id: error?.name || "error",
  });
}

const TOOL_RENDERERS = {
  "voice-to-text": renderVoiceTool,
  "audio-file-transcription": renderAudioFileTranscription,
  "audio-editor": renderAudioEditor,
  "webcam-recorder": renderWebcamRecorder,
  "ai-text-cleaner": renderAiTextCleaner,
  "ai-table-converter": renderAiTableConverter,
  "csv-excel-converter": renderCsvExcelConverter,
  "character-counter": renderCharacterCounter,
  "line-break-cleaner": renderLineBreakCleaner,
  "markdown-editor": renderMarkdownEditor,
  "markdown-viewer": renderMarkdownViewer,
  "text-extractor": renderTextExtractor,
  "duplicate-line-remover": renderDuplicateLineRemover,
  "find-replace": renderFindReplaceTool,
  "case-converter": renderCaseConverter,
  "text-diff": renderTextDiffTool,
  "qr-code-generator": renderQrGenerator,
  "qr-link-extractor": renderQrLinkExtractor,
  "screenshot-saver": renderScreenshotSaver,
  "image-resizer": renderImageResizer,
  "image-converter": renderImageConverter,
  "image-compressor": renderImageCompressor,
  "exif-metadata-remover": renderExifMetadataRemover,
  "pdf-merge": renderPdfMerge,
  "pdf-split": renderPdfSplit,
  "pdf-extract-pages": renderPdfExtractPages,
  "image-to-pdf": renderImageToPdf,
  "pdf-to-image": renderPdfToImage,
  "srt-cleaner": renderSrtCleaner,
  "subtitle-converter": renderSubtitleConverter,
  "subtitle-timing": renderSubtitleTiming,
};

const AUDIO_TRANSCRIPTION_MODEL_PROFILES = Object.freeze({
  quality: Object.freeze({
    id: "quality",
    model: "onnx-community/whisper-base",
    label: "정확도 우선",
    beamCount: 3,
    runtimeMode: "lightweight",
    hint:
      "정확도 우선은 더 큰 브라우저 모델을 사용해 ARS 안내, 공식 문구, 작은 발화를 더 잘 살리도록 시도합니다. 처음 실행할 때 모델 다운로드가 더 오래 걸릴 수 있습니다.",
  }),
});
const AUDIO_TRANSCRIPTION_MODEL_PROFILE_ALIASES = Object.freeze({});
const AUDIO_TRANSCRIPTION_DEFAULT_PROFILE = "quality";
const AUDIO_TRANSCRIPTION_WASM_BALANCED_DTYPE = Object.freeze({
  encoder_model: "q8",
  decoder_model_merged: "fp16",
});
const AUDIO_TRANSCRIPTION_HIGH_QUALITY_DTYPE = Object.freeze({
  encoder_model: "fp32",
  decoder_model_merged: "fp32",
});
const AUDIO_TRANSCRIPTION_MAX_SECONDS = 5 * 60;
const AUDIO_TRANSCRIPTION_MAX_BYTES = 80 * 1024 * 1024;
const AUDIO_PREPROCESS_TARGET_SAMPLE_RATE = 16000;
const AUDIO_PREPROCESS_FRAME_SECONDS = 0.05;
const AUDIO_PREPROCESS_EDGE_PADDING_SECONDS = 0.65;
const AUDIO_PREPROCESS_TARGET_RMS = 0.16;
const AUDIO_PREPROCESS_MAX_GAIN = 12;
const AUDIO_TRANSFORMERS_MODULE_URL = "https://cdn.jsdelivr.net/npm/@huggingface/transformers@4.1.0";
const AUDIO_EDITOR_MAX_BYTES = 180 * 1024 * 1024;
const AUDIO_EDITOR_UNDO_LIMIT = 10;
const AUDIO_EDITOR_WAVEFORM_POINTS = 24000;
const AUDIO_EDITOR_MIN_SELECTION_SECONDS = 0.03;
const AUDIO_EDITOR_MIN_ZOOM = 1;
const AUDIO_EDITOR_MAX_ZOOM = 16;
const AUDIO_EDITOR_ZOOM_STEP = 1.18;
const AUDIO_EDITOR_MAX_WAVEFORM_WIDTH = 24000;
const AUDIO_EDITOR_MAX_CANVAS_BACKING_WIDTH = 32760;
const MARKDOWN_VIEWER_MAX_BYTES = 8 * 1024 * 1024;
let audioTranscriptionWorker = null;
let audioTranscriptionWorkerUrl = "";
let audioTranscriptionWorkerRequestId = 0;
const audioTranscriptionWorkerRequests = new Map();

function renderAudioFileTranscription(container) {
  container.innerHTML = `
    <div class="tool-section audio-file-tool">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Local Audio STT</p>
          <h2>${renderBetaToolTitle(TOOL_MAP["audio-file-transcription"].title)}</h2>
          <p class="tool-note audio-tool-intro">녹음 파일을 저장하지 않는 브라우저 변환 기능입니다. 파일을 서버에 업로드하지 않고 브라우저 안에서 처리하므로 작업 시간이 오래 걸리거나 인식 품질이 좋지 않을 수 있는 베타 버전입니다.</p>
        </div>
        <div class="status-group" aria-live="polite">
          <span id="audioModelStatus" class="status-pill">모델 대기</span>
          <span id="audioFileStatus" class="status-pill">파일 없음</span>
        </div>
      </div>

      <div class="upload-box audio-upload-box">
        <label for="audioFile">휴대폰 녹음 파일 선택</label>
        <input id="audioFile" type="file" accept="audio/*,.m4a,.mp3,.wav,.aac,.webm,.ogg" />
        <p>m4a, mp3, wav, aac, webm, ogg 형식을 지원합니다. 파일은 코워크스페이스 서버로 업로드하지 않고 브라우저 안에서 처리합니다. 비저장 방식이라 전문 서버형 음성 인식보다 품질이 좋지 않을 수 있습니다.</p>
      </div>

      <div class="tool-grid">
        <article class="editor-card">
          <div class="section-heading">
            <div>
              <h2>파일 확인</h2>
              <p id="audioFileMeta" class="tool-note">5분 이하의 짧은 녹음 파일부터 테스트해 주세요.</p>
            </div>
          </div>
          <audio id="audioPreview" class="audio-preview" controls hidden></audio>
          <div class="field-grid compact-grid">
            <div class="field">
              <label for="audioLanguage">인식 언어</label>
              <select id="audioLanguage">
                <option value="ko" selected>한국어 우선</option>
                <option value="">자동 감지</option>
                <option value="en">영어</option>
                <option value="ja">일본어</option>
                <option value="zh">중국어</option>
              </select>
            </div>
          </div>
          <div class="action-row">
            <button id="transcribeAudioBtn" class="primary-action" type="button" disabled>텍스트 변환</button>
            <button id="clearAudioBtn" type="button">초기화</button>
          </div>
          <label class="check-item audio-break-option">
            <input id="audioSentenceBreaks" type="checkbox" checked />
            문장 끝 기준 줄바꿈
          </label>
          <div id="audioProcessingIndicator" class="audio-processing-indicator" hidden aria-live="polite">
            <span class="audio-processing-spinner" aria-hidden="true"></span>
            <span id="audioProcessingText">변환 준비 중입니다.</span>
          </div>
          <p id="audioRunMeta" class="tool-note">브라우저 안에서만 처리하는 베타 기능이라 전문 서버형 STT보다 품질이 낮을 수 있습니다.</p>
        </article>

        <article class="result-card">
          <div class="section-heading">
            <div>
              <h2>변환 결과</h2>
              <p id="audioOutputMeta" class="tool-note">0자</p>
            </div>
            <div class="action-row">
              <button id="copyBtn" type="button">복사</button>
              <button id="downloadTranscriptBtn" type="button">TXT 저장</button>
            </div>
          </div>
          <textarea id="audioTranscriptOutput" placeholder="변환된 텍스트 초안이 여기에 표시됩니다. 중요한 내용은 반드시 사람이 다시 확인해 주세요."></textarea>
        </article>
      </div>

      <article class="notice-card">
        <strong>비저장 브라우저 변환 베타입니다.</strong>
        <span>녹음 내용은 서버로 업로드하지 않지만, 모델 파일은 외부 CDN과 Hugging Face에서 내려받습니다. 정확도 우선은 더 큰 브라우저 모델을 사용하므로 첫 실행이 느릴 수 있고, 개인 녹음 파일을 플랫폼 서버에 남기지 않는 대신 긴 회의나 통화 녹음에서는 여전히 누락·오인식이 생길 수 있습니다. 중요한 내용은 반드시 사람이 다시 확인해 주세요.</span>
      </article>
    </div>
  `;

  const state = {
    file: null,
    metadata: null,
    previewUrl: "",
    rawTranscript: "",
    isRunning: false,
  };

  const nodes = {
    modelStatus: container.querySelector("#audioModelStatus"),
    fileStatus: container.querySelector("#audioFileStatus"),
    fileInput: container.querySelector("#audioFile"),
    fileMeta: container.querySelector("#audioFileMeta"),
    audioPreview: container.querySelector("#audioPreview"),
    language: container.querySelector("#audioLanguage"),
    sentenceBreaks: container.querySelector("#audioSentenceBreaks"),
    transcribeBtn: container.querySelector("#transcribeAudioBtn"),
    clearBtn: container.querySelector("#clearAudioBtn"),
    processingIndicator: container.querySelector("#audioProcessingIndicator"),
    processingText: container.querySelector("#audioProcessingText"),
    runMeta: container.querySelector("#audioRunMeta"),
    output: container.querySelector("#audioTranscriptOutput"),
    outputMeta: container.querySelector("#audioOutputMeta"),
    copyBtn: container.querySelector("#copyBtn"),
    downloadBtn: container.querySelector("#downloadTranscriptBtn"),
  };

  nodes.fileInput.addEventListener("change", () => handleAudioFileSelection());
  nodes.transcribeBtn.addEventListener("click", transcribeAudioFile);
  nodes.clearBtn.addEventListener("click", clearAudioTool);
  nodes.sentenceBreaks.addEventListener("change", renderAudioTranscriptOutput);
  nodes.output.addEventListener("input", () => {
    state.rawTranscript = nodes.output.value;
    updateOutputMeta();
  });
  nodes.copyBtn.addEventListener("click", async () => {
    const text = nodes.output.value.trim();
    if (!text) {
      showToast("복사할 변환 결과가 없습니다.");
      return;
    }
    await safeCopy(text, "변환 결과를 복사했습니다.");
  });
  nodes.downloadBtn.addEventListener("click", () => {
    const text = nodes.output.value.trim();
    if (!text) {
      showToast("저장할 변환 결과가 없습니다.");
      return;
    }
    downloadText(text, `녹음-텍스트-변환-${new Date().toISOString().slice(0, 10)}.txt`);
  });

  syncAudioButtons();
  updateAudioModelHint();
  updateOutputMeta();

  async function handleAudioFileSelection() {
    const file = nodes.fileInput.files?.[0];
    if (!file) {
      clearSelectedFile();
      return;
    }

    state.file = file;
    nodes.fileStatus.textContent = "파일 확인 중";
    nodes.fileMeta.textContent = "녹음 파일 정보를 확인하고 있습니다.";
    state.rawTranscript = "";
    nodes.output.value = "";
    updateOutputMeta();

    if (state.previewUrl) URL.revokeObjectURL(state.previewUrl);
    state.previewUrl = URL.createObjectURL(file);
    nodes.audioPreview.src = state.previewUrl;
    nodes.audioPreview.hidden = false;

    const metadata = await readAudioMetadata(file);
    state.metadata = metadata;
    nodes.fileStatus.textContent = "파일 준비";
    nodes.fileMeta.textContent = describeAudioFile(file, metadata);
    syncAudioButtons();
  }

  async function transcribeAudioFile() {
    if (!state.file || state.isRunning) return;
    const validation = validateAudioFile(state.file, state.metadata);
    if (validation) {
      showToast(validation);
      return;
    }

    state.isRunning = true;
    const profile = getAudioModelProfile(AUDIO_TRANSCRIPTION_DEFAULT_PROFILE);
    const runtimeMode = profile.runtimeMode || "lightweight";
    syncAudioButtons();
    nodes.modelStatus.textContent = "모델 준비 중";
    nodes.runMeta.textContent = `${profile.label} 모델과 음성 인식 파이프라인을 준비하고 있습니다.`;
    setAudioProcessing(true, `${profile.label} 모델 파일과 음성 인식 파이프라인을 준비하고 있습니다.`);
    state.rawTranscript = "";
    nodes.output.value = "";
    updateOutputMeta();

    let preparedAudio = null;
    try {
      nodes.modelStatus.textContent = "전처리 중";
      nodes.runMeta.textContent = "녹음 파일의 대화 흐름은 유지하면서 작은 목소리 볼륨을 브라우저 안에서 보정하고 있습니다.";
      setAudioProcessing(true, "대화 흐름을 유지하면서 작은 목소리 볼륨을 보정하고 있습니다.");
      preparedAudio = await prepareAudioInputForTranscription(state.file);

      nodes.modelStatus.textContent = "모델 준비 중";
      nodes.runMeta.textContent = preparedAudio.summary;
      setAudioProcessing(true, `${preparedAudio.summary} 모델을 준비하고 있습니다.`);
      const candidates = getAudioTranscriberCandidates(runtimeMode, false);
      const progressCallback = (progress) => {
        const label = formatModelProgress(progress);
        if (label) {
          nodes.modelStatus.textContent = label;
          setAudioProcessing(true, `${profile.label} ${label} · 처음 실행이면 다운로드 시간이 걸릴 수 있습니다.`);
        }
      };

      nodes.modelStatus.textContent = "변환 중";
      nodes.runMeta.textContent = "브라우저 백그라운드 작업에서 녹음 파일을 분석하고 있습니다. 창을 닫지 말아 주세요.";
      setAudioProcessing(true, "녹음 파일을 백그라운드에서 텍스트로 변환 중입니다. 창을 닫지 말아 주세요.");
      const options = {
        task: "transcribe",
        chunk_length_s: 20,
        stride_length_s: 4,
        return_timestamps: false,
        temperature: 0,
        condition_on_prev_tokens: false,
        compression_ratio_threshold: 2.4,
        logprob_threshold: -1.0,
        no_speech_threshold: 0.75,
        num_beams: profile.beamCount,
      };
      if (nodes.language.value) options.language = nodes.language.value;

      const result = await transcribeAudioInWorker({
        profile,
        candidates,
        audioData: preparedAudio.audioData,
        options,
        progressCallback,
      });
      state.rawTranscript = cleanAudioTranscriptDraft(formatAudioTranscriptionResult(result, false));
      renderAudioTranscriptOutput();
      nodes.modelStatus.textContent = "완료";
      nodes.runMeta.textContent = `변환이 끝났습니다. ${preparedAudio.summary} 결과는 검토용 초안이므로 중요한 내용은 다시 확인해 주세요.`;
      setAudioProcessing(false);
    } catch (error) {
      nodes.modelStatus.textContent = "오류";
      nodes.runMeta.textContent = formatUserNotice(formatAudioTranscriptionError(error));
      setAudioProcessing(false);
      trackToolError(TOOL_MAP["audio-file-transcription"], error, "transcribe_audio");
    } finally {
      preparedAudio?.cleanup?.();
      state.isRunning = false;
      syncAudioButtons();
    }
  }

  function clearAudioTool() {
    nodes.fileInput.value = "";
    state.rawTranscript = "";
    nodes.output.value = "";
    clearSelectedFile();
    nodes.modelStatus.textContent = "모델 대기";
    setAudioProcessing(false);
    updateAudioModelHint();
    updateOutputMeta();
  }

  function clearSelectedFile() {
    state.file = null;
    state.metadata = null;
    if (state.previewUrl) {
      URL.revokeObjectURL(state.previewUrl);
      state.previewUrl = "";
    }
    nodes.audioPreview.removeAttribute("src");
    nodes.audioPreview.hidden = true;
    nodes.fileStatus.textContent = "파일 없음";
    nodes.fileMeta.textContent = "5분 이하의 짧은 녹음 파일부터 테스트해 주세요.";
    syncAudioButtons();
  }

  function syncAudioButtons() {
    nodes.transcribeBtn.disabled = !state.file || state.isRunning;
    nodes.transcribeBtn.textContent = state.isRunning ? "변환 중..." : "텍스트 변환";
    nodes.clearBtn.disabled = state.isRunning;
    nodes.fileInput.disabled = state.isRunning;
    nodes.sentenceBreaks.disabled = state.isRunning;
  }

  function setAudioProcessing(active, text = "") {
    nodes.processingIndicator.hidden = !active;
    if (text) nodes.processingText.textContent = text;
  }

  function renderAudioTranscriptOutput() {
    nodes.output.value = nodes.sentenceBreaks.checked
      ? breakAudioTranscriptSentences(state.rawTranscript)
      : state.rawTranscript;
    updateOutputMeta();
  }

  function updateOutputMeta() {
    const chars = nodes.output.value.trim().length;
    nodes.outputMeta.textContent = `${chars.toLocaleString("ko-KR")}자`;
  }

  function updateAudioModelHint() {
    if (state.isRunning) return;
    const profile = getAudioModelProfile(AUDIO_TRANSCRIPTION_DEFAULT_PROFILE);
    nodes.runMeta.textContent = describeAudioProfile(profile);
  }
}

function renderAudioEditor(container) {
  container.innerHTML = `
    <div class="tool-section audio-editor-tool">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Local Audio Editor</p>
          <h2>녹음 파일 간편 편집기</h2>
          <p class="tool-note audio-tool-intro">휴대폰 녹음 파일을 서버 업로드 없이 브라우저에서 열고, 파형을 보며 구간을 자르고 붙인 뒤 WAV 파일로 저장합니다.</p>
        </div>
        <div class="status-group" aria-live="polite">
          <span id="audioEditFileStatus" class="status-pill">파일 없음</span>
          <span id="audioEditSelectionStatus" class="status-pill">선택 없음</span>
          <span class="status-pill">WAV 저장</span>
        </div>
      </div>

      <div class="upload-box audio-editor-upload-box">
        <label for="audioEditFile">휴대폰 녹음 파일 선택</label>
        <input id="audioEditFile" type="file" accept=".m4a,.aac,.mp3,.wav" />
        <p>iPhone 음성 메모와 Android 녹음 앱에서 흔한 m4a, aac, mp3, wav 파일을 우선 지원합니다. 파일은 코워크스페이스 서버로 업로드하지 않고, 브라우저가 읽을 수 있는 경우에만 편집합니다.</p>
      </div>

      <div class="tool-grid audio-editor-grid">
        <article class="editor-card audio-waveform-card">
          <div class="section-heading">
            <div>
              <h2>파형 편집</h2>
              <p id="audioEditMeta" class="tool-note">파일을 선택하면 파형이 표시됩니다. 파형을 드래그해 구간을 선택하고, 클릭하면 붙여넣을 위치가 이동합니다. 마우스 휠로 확대/축소하고, 가로 스크롤로 긴 녹음을 이동할 수 있습니다.</p>
            </div>
          </div>
          <div id="audioEditWaveformFrame" class="audio-waveform-frame" tabindex="0" aria-label="녹음 파일 파형 스크롤 영역">
            <canvas id="audioEditWaveform" class="audio-waveform-canvas" width="960" height="240" aria-label="녹음 파일 파형"></canvas>
          </div>
          <div class="audio-editor-readout" aria-live="polite">
            <span id="audioEditPlayhead">재생 위치 0:00</span>
            <span id="audioEditSelectionMeta">선택 구간 없음</span>
            <span id="audioEditZoomMeta">확대 100%</span>
          </div>
          <div class="action-row">
            <button id="audioEditPlayAllBtn" class="primary-action" type="button" disabled>전체 재생</button>
            <button id="audioEditPlaySelectionBtn" type="button" disabled>선택 재생</button>
            <button id="audioEditStopBtn" type="button" disabled>정지</button>
          </div>
        </article>

        <article class="editor-card audio-edit-actions-card">
          <div class="section-heading">
            <div>
              <h2>간편 편집</h2>
              <p id="audioEditStatus" class="tool-note">선택 구간을 만들면 삭제, 복사, 음량 조절을 적용할 수 있습니다.</p>
            </div>
          </div>

          <div class="action-row">
            <button id="audioEditDeleteBtn" type="button" disabled>선택 삭제</button>
            <button id="audioEditKeepBtn" type="button" disabled>선택만 남기기</button>
            <button id="audioEditCopyBtn" type="button" disabled>선택 복사</button>
            <button id="audioEditPasteBtn" type="button" disabled>붙이기</button>
          </div>

          <div class="field">
            <label for="audioEditVolume">음량 조절 <span id="audioEditVolumeLabel">100%</span></label>
            <input id="audioEditVolume" type="range" min="0" max="2" step="0.05" value="1" />
            <p class="tool-note">선택 구간이 있으면 선택 구간에만, 없으면 전체 녹음에 적용합니다.</p>
          </div>

          <div class="action-row">
            <button id="audioEditVolumeBtn" type="button" disabled>음량 적용</button>
            <button id="audioEditUndoBtn" type="button" disabled>실행 취소</button>
            <button id="audioEditRedoBtn" type="button" disabled>다시 실행</button>
          </div>

          <article class="notice-card">
            <strong>브라우저 기반 간편 편집입니다.</strong>
            <span>편집 중 원본 녹음과 결과 파일은 서버로 보내지지 않습니다. 다만 긴 휴대폰 녹음은 기기 메모리와 브라우저 코덱 지원에 따라 열리지 않을 수 있고, 결과 저장은 호환성이 안정적인 WAV 형식으로 제공합니다.</span>
          </article>

          <div class="action-row">
            <button id="audioEditDownloadBtn" class="primary-action" type="button" disabled>WAV 저장</button>
            <button id="audioEditResetBtn" type="button" disabled>처음 상태로</button>
          </div>
        </article>
      </div>
    </div>
  `;

  const state = {
    samples: null,
    originalSamples: null,
    sampleRate: 44100,
    peaks: null,
    zoom: AUDIO_EDITOR_MIN_ZOOM,
    selection: null,
    clipboard: null,
    playheadSeconds: 0,
    isPlaying: false,
    playbackStartedAt: 0,
    playbackEndSeconds: 0,
    source: null,
    playbackContext: null,
    animationId: 0,
    pointerStartSample: 0,
    undoStack: [],
    redoStack: [],
  };

  const nodes = {
    fileInput: container.querySelector("#audioEditFile"),
    fileStatus: container.querySelector("#audioEditFileStatus"),
    selectionStatus: container.querySelector("#audioEditSelectionStatus"),
    meta: container.querySelector("#audioEditMeta"),
    waveformFrame: container.querySelector("#audioEditWaveformFrame"),
    canvas: container.querySelector("#audioEditWaveform"),
    playhead: container.querySelector("#audioEditPlayhead"),
    selectionMeta: container.querySelector("#audioEditSelectionMeta"),
    zoomMeta: container.querySelector("#audioEditZoomMeta"),
    status: container.querySelector("#audioEditStatus"),
    playAllBtn: container.querySelector("#audioEditPlayAllBtn"),
    playSelectionBtn: container.querySelector("#audioEditPlaySelectionBtn"),
    stopBtn: container.querySelector("#audioEditStopBtn"),
    deleteBtn: container.querySelector("#audioEditDeleteBtn"),
    keepBtn: container.querySelector("#audioEditKeepBtn"),
    copyBtn: container.querySelector("#audioEditCopyBtn"),
    pasteBtn: container.querySelector("#audioEditPasteBtn"),
    volumeInput: container.querySelector("#audioEditVolume"),
    volumeLabel: container.querySelector("#audioEditVolumeLabel"),
    volumeBtn: container.querySelector("#audioEditVolumeBtn"),
    undoBtn: container.querySelector("#audioEditUndoBtn"),
    redoBtn: container.querySelector("#audioEditRedoBtn"),
    downloadBtn: container.querySelector("#audioEditDownloadBtn"),
    resetBtn: container.querySelector("#audioEditResetBtn"),
  };

  drawAudioEditorWaveform();
  updateAudioEditorUi();

  nodes.fileInput.addEventListener("change", async () => {
    const file = nodes.fileInput.files?.[0];
    if (!file) return;
    await loadAudioEditorFile(file);
  });

  nodes.canvas.addEventListener("pointerdown", handleWaveformPointerDown);
  nodes.canvas.addEventListener("wheel", handleWaveformWheel, { passive: false });
  nodes.playAllBtn.addEventListener("click", () => playAudioEditorRange(0, getAudioEditorDuration()));
  nodes.playSelectionBtn.addEventListener("click", () => {
    const range = getCurrentAudioSelectionRange();
    if (!range) return;
    playAudioEditorRange(range.startSample / state.sampleRate, range.endSample / state.sampleRate);
  });
  nodes.stopBtn.addEventListener("click", () => stopAudioEditorPlayback());
  nodes.deleteBtn.addEventListener("click", deleteSelectedAudio);
  nodes.keepBtn.addEventListener("click", keepSelectedAudio);
  nodes.copyBtn.addEventListener("click", copySelectedAudio);
  nodes.pasteBtn.addEventListener("click", pasteCopiedAudio);
  nodes.volumeInput.addEventListener("input", updateVolumeLabel);
  nodes.volumeBtn.addEventListener("click", applyAudioEditorVolume);
  nodes.undoBtn.addEventListener("click", undoAudioEdit);
  nodes.redoBtn.addEventListener("click", redoAudioEdit);
  nodes.downloadBtn.addEventListener("click", downloadEditedAudio);
  nodes.resetBtn.addEventListener("click", resetAudioEditor);
  document.addEventListener("keydown", handleAudioEditorKeyboard);
  window.addEventListener("resize", handleWaveformResize);

  async function loadAudioEditorFile(file) {
    stopAudioEditorPlayback();
    nodes.fileStatus.textContent = "파일 읽는 중";
    nodes.status.textContent = "휴대폰 녹음 파일을 브라우저에서 디코딩하고 있습니다.";
    try {
      const decoded = await decodeAudioFileForEditor(file);
      state.samples = decoded.samples;
      state.originalSamples = new Float32Array(decoded.samples);
      state.sampleRate = decoded.sampleRate;
      state.peaks = buildAudioWaveformPeaks(state.samples, AUDIO_EDITOR_WAVEFORM_POINTS);
      state.selection = null;
      state.clipboard = null;
      state.playheadSeconds = 0;
      resetAudioEditorViewport();
      state.undoStack = [];
      state.redoStack = [];
      nodes.meta.textContent = `${formatDuration(getAudioEditorDuration())} · ${formatBytes(file.size)} · ${decoded.channelCount}채널 녹음을 모노 편집 파형으로 준비했습니다.`;
      nodes.fileStatus.textContent = "편집 준비";
      nodes.status.textContent = "파형을 드래그해 구간을 선택하세요. 긴 녹음은 마우스 휠로 확대/축소하고 가로 스크롤로 이동할 수 있습니다.";
      drawAudioEditorWaveform();
      updateAudioEditorUi();
    } catch (error) {
      state.samples = null;
      state.originalSamples = null;
      state.peaks = null;
      state.selection = null;
      resetAudioEditorViewport();
      nodes.fileStatus.textContent = "읽기 실패";
      nodes.meta.textContent =
        "브라우저가 이 휴대폰 녹음 형식을 읽지 못했습니다. m4a, aac, mp3, wav 형식이더라도 기기와 코덱에 따라 Chrome 또는 Edge에서 다시 시도해야 할 수 있습니다.";
      nodes.status.textContent = error?.message || "녹음 파일을 읽지 못했습니다.";
      trackToolError(TOOL_MAP["audio-editor"], error, "load_audio_editor");
      drawAudioEditorWaveform();
      updateAudioEditorUi();
    }
  }

  function resetAudioEditorViewport() {
    state.zoom = AUDIO_EDITOR_MIN_ZOOM;
    nodes.canvas.style.width = "100%";
    if (nodes.waveformFrame) nodes.waveformFrame.scrollLeft = 0;
  }

  function handleWaveformWheel(event) {
    if (!state.samples?.length) return;
    event.preventDefault();
    if (event.shiftKey) {
      nodes.waveformFrame.scrollLeft += event.deltaY || event.deltaX;
      return;
    }
    const delta = Math.abs(event.deltaY) > 0 ? event.deltaY : event.deltaX;
    if (!delta) return;
    const zoomFactor = Math.pow(AUDIO_EDITOR_ZOOM_STEP, -delta / 100);
    setAudioEditorZoom(state.zoom * zoomFactor, event.clientX);
  }

  function setAudioEditorZoom(nextZoom, anchorClientX = null) {
    const frame = nodes.waveformFrame;
    const previousWidth = getAudioEditorWaveformWidth();
    const frameRect = frame.getBoundingClientRect();
    const anchorOffset = Number.isFinite(anchorClientX)
      ? clampNumber(anchorClientX - frameRect.left, 0, frame.clientWidth)
      : frame.clientWidth / 2;
    const anchorRatio = previousWidth > 0 ? clampNumber((frame.scrollLeft + anchorOffset) / previousWidth, 0, 1) : 0;
    const next = clampAudioEditorZoom(nextZoom);
    if (Math.abs(next - state.zoom) < 0.001) return;
    state.zoom = next;
    drawAudioEditorWaveform();
    const nextWidth = getAudioEditorWaveformWidth();
    frame.scrollLeft = clampNumber(anchorRatio * nextWidth - anchorOffset, 0, Math.max(0, nextWidth - frame.clientWidth));
    updateAudioEditorUi();
  }

  function handleWaveformResize() {
    const frame = nodes.waveformFrame;
    const previousWidth = getAudioEditorWaveformWidth();
    const centerRatio = previousWidth > 0 ? clampNumber((frame.scrollLeft + frame.clientWidth / 2) / previousWidth, 0, 1) : 0;
    state.zoom = clampAudioEditorZoom(state.zoom);
    drawAudioEditorWaveform();
    const nextWidth = getAudioEditorWaveformWidth();
    frame.scrollLeft = clampNumber(centerRatio * nextWidth - frame.clientWidth / 2, 0, Math.max(0, nextWidth - frame.clientWidth));
    updateAudioEditorUi();
  }

  function handleWaveformPointerDown(event) {
    if (!state.samples?.length) return;
    event.preventDefault();
    nodes.canvas.setPointerCapture?.(event.pointerId);
    const sample = getAudioEditorSampleFromPointer(event);
    state.pointerStartSample = sample;
    state.selection = { startSample: sample, endSample: sample };
    state.playheadSeconds = sample / state.sampleRate;
    drawAudioEditorWaveform();
    updateAudioEditorUi();

    const handlePointerMove = (moveEvent) => {
      const nextSample = getAudioEditorSampleFromPointer(moveEvent);
      state.selection = { startSample: state.pointerStartSample, endSample: nextSample };
      state.playheadSeconds = nextSample / state.sampleRate;
      drawAudioEditorWaveform();
      updateAudioEditorUi();
    };

    const handlePointerUp = (upEvent) => {
      nodes.canvas.releasePointerCapture?.(event.pointerId);
      nodes.canvas.removeEventListener("pointermove", handlePointerMove);
      nodes.canvas.removeEventListener("pointerup", handlePointerUp);
      nodes.canvas.removeEventListener("pointercancel", handlePointerUp);
      const endSample = getAudioEditorSampleFromPointer(upEvent);
      if (Math.abs(endSample - state.pointerStartSample) < Math.max(4, state.sampleRate * AUDIO_EDITOR_MIN_SELECTION_SECONDS)) {
        state.selection = null;
        state.playheadSeconds = endSample / state.sampleRate;
      } else {
        state.selection = { startSample: state.pointerStartSample, endSample };
      }
      drawAudioEditorWaveform();
      updateAudioEditorUi();
    };

    nodes.canvas.addEventListener("pointermove", handlePointerMove);
    nodes.canvas.addEventListener("pointerup", handlePointerUp);
    nodes.canvas.addEventListener("pointercancel", handlePointerUp);
  }

  function getAudioEditorSampleFromPointer(event) {
    const rect = nodes.canvas.getBoundingClientRect();
    const ratio = rect.width > 0 ? clampNumber((event.clientX - rect.left) / rect.width, 0, 1) : 0;
    return Math.round(ratio * (state.samples?.length || 0));
  }

  function getCurrentAudioSelectionRange() {
    return normalizeAudioEditRange(state.samples?.length || 0, state.selection?.startSample, state.selection?.endSample, state.sampleRate);
  }

  function deleteSelectedAudio() {
    const range = getCurrentAudioSelectionRange();
    if (!range) return;
    pushAudioEditorUndo();
    setAudioEditorSamples(deleteAudioRange(state.samples, range.startSample, range.endSample));
    state.selection = null;
    state.playheadSeconds = range.startSample / state.sampleRate;
    nodes.status.textContent = "선택 구간을 삭제했습니다.";
  }

  function keepSelectedAudio() {
    const range = getCurrentAudioSelectionRange();
    if (!range) return;
    pushAudioEditorUndo();
    setAudioEditorSamples(keepAudioRange(state.samples, range.startSample, range.endSample));
    state.selection = null;
    state.playheadSeconds = 0;
    nodes.status.textContent = "선택 구간만 남겼습니다.";
  }

  function copySelectedAudio() {
    const range = getCurrentAudioSelectionRange();
    if (!range) return;
    state.clipboard = state.samples.slice(range.startSample, range.endSample);
    nodes.status.textContent = `선택 구간 ${formatDuration(state.clipboard.length / state.sampleRate)}을 편집 조각으로 복사했습니다.`;
    updateAudioEditorUi();
  }

  function pasteCopiedAudio() {
    if (!state.samples?.length || !state.clipboard?.length) return;
    const range = getCurrentAudioSelectionRange();
    const insertSample = range ? range.startSample : Math.round(clampNumber(state.playheadSeconds, 0, getAudioEditorDuration()) * state.sampleRate);
    pushAudioEditorUndo();
    setAudioEditorSamples(insertAudioSegment(state.samples, insertSample, state.clipboard));
    state.selection = { startSample: insertSample, endSample: insertSample + state.clipboard.length };
    state.playheadSeconds = insertSample / state.sampleRate;
    nodes.status.textContent = "복사한 구간을 붙였습니다.";
  }

  function applyAudioEditorVolume() {
    if (!state.samples?.length) return;
    const gain = Number(nodes.volumeInput.value || 1);
    const range = getCurrentAudioSelectionRange() || {
      startSample: 0,
      endSample: state.samples.length,
    };
    pushAudioEditorUndo();
    setAudioEditorSamples(applyAudioGainRange(state.samples, range.startSample, range.endSample, gain));
    nodes.status.textContent = `${getCurrentAudioSelectionRange() ? "선택 구간" : "전체 녹음"} 음량을 ${Math.round(gain * 100)}%로 조절했습니다.`;
  }

  function undoAudioEdit() {
    if (!state.undoStack.length || !state.samples) return;
    stopAudioEditorPlayback();
    state.redoStack.push(state.samples);
    setAudioEditorSamples(state.undoStack.pop());
    state.selection = null;
    nodes.status.textContent = "이전 편집 상태로 되돌렸습니다.";
  }

  function redoAudioEdit() {
    if (!state.redoStack.length || !state.samples) return;
    stopAudioEditorPlayback();
    state.undoStack.push(state.samples);
    setAudioEditorSamples(state.redoStack.pop());
    state.selection = null;
    nodes.status.textContent = "되돌린 편집을 다시 적용했습니다.";
  }

  function resetAudioEditor() {
    if (!state.originalSamples?.length) return;
    stopAudioEditorPlayback();
    pushAudioEditorUndo();
    setAudioEditorSamples(new Float32Array(state.originalSamples));
    state.selection = null;
    state.playheadSeconds = 0;
    resetAudioEditorViewport();
    nodes.status.textContent = "처음 불러온 상태로 되돌렸습니다.";
    drawAudioEditorWaveform();
    updateAudioEditorUi();
  }

  function pushAudioEditorUndo() {
    if (!state.samples?.length) return;
    state.undoStack.push(state.samples);
    if (state.undoStack.length > AUDIO_EDITOR_UNDO_LIMIT) state.undoStack.shift();
    state.redoStack = [];
  }

  function setAudioEditorSamples(samples) {
    stopAudioEditorPlayback();
    state.samples = samples;
    state.peaks = buildAudioWaveformPeaks(samples, AUDIO_EDITOR_WAVEFORM_POINTS);
    state.playheadSeconds = clampNumber(state.playheadSeconds, 0, getAudioEditorDuration());
    drawAudioEditorWaveform();
    updateAudioEditorUi();
  }

  async function playAudioEditorRange(startSeconds, endSeconds) {
    if (!state.samples?.length) return;
    stopAudioEditorPlayback();
    const start = clampNumber(startSeconds, 0, getAudioEditorDuration());
    const end = clampNumber(endSeconds, start, getAudioEditorDuration());
    if (end - start <= 0.01) return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
      showToast("현재 브라우저는 오디오 재생 편집을 지원하지 않습니다.");
      return;
    }
    state.playbackContext = state.playbackContext || new AudioContextClass();
    if (state.playbackContext.state === "suspended") {
      await state.playbackContext.resume();
    }
    const buffer = state.playbackContext.createBuffer(1, state.samples.length, state.sampleRate);
    buffer.copyToChannel(state.samples, 0);
    const source = state.playbackContext.createBufferSource();
    source.buffer = buffer;
    source.connect(state.playbackContext.destination);
    state.source = source;
    state.isPlaying = true;
    state.playbackStartedAt = state.playbackContext.currentTime - start;
    state.playbackEndSeconds = end;
    state.playheadSeconds = start;
    ensureAudioEditorPlayheadVisible();
    source.onended = () => {
      if (state.source === source) {
        state.source = null;
        state.isPlaying = false;
        state.playheadSeconds = Math.min(state.playbackEndSeconds, getAudioEditorDuration());
        cancelAnimationFrame(state.animationId);
        drawAudioEditorWaveform();
        updateAudioEditorUi();
      }
    };
    source.start(0, start, end - start);
    tickAudioEditorPlayback();
    updateAudioEditorUi();
  }

  function handleAudioEditorKeyboard(event) {
    if (!state.samples?.length || !isAudioEditorSpaceKey(event) || shouldIgnoreAudioEditorShortcut(event)) return;
    event.preventDefault();
    if (state.isPlaying) {
      stopAudioEditorPlayback();
      return;
    }

    const range = getCurrentAudioSelectionRange();
    if (range) {
      playAudioEditorRange(range.startSample / state.sampleRate, range.endSample / state.sampleRate);
      return;
    }

    const duration = getAudioEditorDuration();
    const start = state.playheadSeconds >= duration - 0.05 ? 0 : state.playheadSeconds;
    playAudioEditorRange(start, duration);
  }

  function isAudioEditorSpaceKey(event) {
    return !event.repeat && (event.key === " " || event.key === "Spacebar" || event.code === "Space");
  }

  function shouldIgnoreAudioEditorShortcut(event) {
    if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey) return true;
    const target = event.target;
    if (!target || target === document.body) return false;
    if (target.closest?.("button, input, select, textarea, a, [contenteditable='true'], #pageTitle")) return true;
    return !container.contains(target) && target !== document.documentElement;
  }

  function tickAudioEditorPlayback() {
    if (!state.isPlaying || !state.playbackContext) return;
    state.playheadSeconds = clampNumber(state.playbackContext.currentTime - state.playbackStartedAt, 0, state.playbackEndSeconds);
    ensureAudioEditorPlayheadVisible();
    drawAudioEditorWaveform();
    updateAudioEditorUi();
    state.animationId = requestAnimationFrame(tickAudioEditorPlayback);
  }

  function stopAudioEditorPlayback() {
    if (state.isPlaying && state.playbackContext) {
      state.playheadSeconds = clampNumber(state.playbackContext.currentTime - state.playbackStartedAt, 0, state.playbackEndSeconds);
    }
    if (state.source) {
      const source = state.source;
      state.source = null;
      source.onended = null;
      try {
        source.stop();
      } catch {}
    }
    state.isPlaying = false;
    cancelAnimationFrame(state.animationId);
    drawAudioEditorWaveform();
    updateAudioEditorUi();
  }

  function downloadEditedAudio() {
    if (!state.samples?.length) return;
    const wav = encodePcm16Wav(state.samples, state.sampleRate);
    const timestamp = new Date().toISOString().slice(0, 19).replace(/[-:T]/g, "");
    downloadBlob(new Blob([wav], { type: "audio/wav" }), sanitizeFilename(`edited-recording-${timestamp}.wav`));
    nodes.status.textContent = "편집 결과를 WAV 파일로 저장했습니다.";
  }

  function updateVolumeLabel() {
    nodes.volumeLabel.textContent = `${Math.round(Number(nodes.volumeInput.value || 1) * 100)}%`;
  }

  function updateAudioEditorUi() {
    const hasAudio = Boolean(state.samples?.length);
    const range = getCurrentAudioSelectionRange();
    const duration = getAudioEditorDuration();
    nodes.playhead.textContent = `재생 위치 ${formatDuration(state.playheadSeconds)}`;
    nodes.selectionStatus.textContent = range ? "구간 선택됨" : "선택 없음";
    nodes.selectionMeta.textContent = range
      ? `선택 ${formatDuration(range.startSample / state.sampleRate)} - ${formatDuration(range.endSample / state.sampleRate)} (${formatDuration((range.endSample - range.startSample) / state.sampleRate)})`
      : `선택 구간 없음 · 전체 ${formatDuration(duration)}`;
    nodes.zoomMeta.textContent = `확대 ${Math.round((hasAudio ? state.zoom : AUDIO_EDITOR_MIN_ZOOM) * 100)}%`;
    nodes.playAllBtn.disabled = !hasAudio || state.isPlaying;
    nodes.playSelectionBtn.disabled = !hasAudio || !range || state.isPlaying;
    nodes.stopBtn.disabled = !state.isPlaying;
    nodes.deleteBtn.disabled = !hasAudio || !range;
    nodes.keepBtn.disabled = !hasAudio || !range;
    nodes.copyBtn.disabled = !hasAudio || !range;
    nodes.pasteBtn.disabled = !hasAudio || !state.clipboard?.length;
    nodes.volumeBtn.disabled = !hasAudio;
    nodes.undoBtn.disabled = state.undoStack.length === 0;
    nodes.redoBtn.disabled = state.redoStack.length === 0;
    nodes.downloadBtn.disabled = !hasAudio;
    nodes.resetBtn.disabled = !hasAudio || !state.originalSamples?.length;
    updateVolumeLabel();
  }

  function getAudioEditorDuration() {
    return state.samples?.length ? state.samples.length / state.sampleRate : 0;
  }

  function getAudioEditorViewportWidth() {
    const frameWidth = nodes.waveformFrame?.clientWidth || 0;
    const canvasWidth = nodes.canvas?.clientWidth || nodes.canvas?.width || 960;
    return Math.max(320, Math.floor(frameWidth || canvasWidth || 960));
  }

  function getAudioEditorMaxZoom() {
    const viewportWidth = getAudioEditorViewportWidth();
    return Math.max(AUDIO_EDITOR_MIN_ZOOM, Math.min(AUDIO_EDITOR_MAX_ZOOM, AUDIO_EDITOR_MAX_WAVEFORM_WIDTH / viewportWidth));
  }

  function clampAudioEditorZoom(zoom) {
    const value = Number.isFinite(zoom) ? zoom : AUDIO_EDITOR_MIN_ZOOM;
    return clampNumber(value, AUDIO_EDITOR_MIN_ZOOM, getAudioEditorMaxZoom());
  }

  function getAudioEditorWaveformWidth() {
    const viewportWidth = getAudioEditorViewportWidth();
    const zoom = state.samples?.length ? clampAudioEditorZoom(state.zoom) : AUDIO_EDITOR_MIN_ZOOM;
    return Math.max(viewportWidth, Math.round(viewportWidth * zoom));
  }

  function ensureAudioEditorPlayheadVisible() {
    if (!state.samples?.length || state.zoom <= AUDIO_EDITOR_MIN_ZOOM) return;
    const frame = nodes.waveformFrame;
    const waveformWidth = getAudioEditorWaveformWidth();
    const playheadX = durationToCanvasX(state.playheadSeconds, waveformWidth);
    const margin = Math.min(96, Math.max(32, frame.clientWidth * 0.12));
    const leftEdge = frame.scrollLeft + margin;
    const rightEdge = frame.scrollLeft + frame.clientWidth - margin;
    if (playheadX < leftEdge) {
      frame.scrollLeft = Math.max(0, playheadX - margin);
    } else if (playheadX > rightEdge) {
      frame.scrollLeft = Math.min(Math.max(0, waveformWidth - frame.clientWidth), playheadX - frame.clientWidth + margin);
    }
  }

  function drawAudioEditorWaveform() {
    const canvas = nodes.canvas;
    const context = canvas.getContext("2d");
    state.zoom = clampAudioEditorZoom(state.zoom);
    const width = getAudioEditorWaveformWidth();
    canvas.style.width = `${width}px`;
    const height = Math.max(160, Math.floor(canvas.clientHeight || 240));
    const ratio = Math.max(0.5, Math.min(window.devicePixelRatio || 1, AUDIO_EDITOR_MAX_CANVAS_BACKING_WIDTH / Math.max(1, width)));
    if (canvas.width !== Math.round(width * ratio) || canvas.height !== Math.round(height * ratio)) {
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
    }
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.clearRect(0, 0, width, height);
    context.fillStyle = "#f8fbff";
    context.fillRect(0, 0, width, height);
    context.strokeStyle = "#d8e2ef";
    context.lineWidth = 1;
    context.beginPath();
    context.moveTo(0, height / 2);
    context.lineTo(width, height / 2);
    context.stroke();

    if (!state.peaks?.length) {
      context.fillStyle = "#647084";
      context.font = "700 14px Malgun Gothic, sans-serif";
      context.textAlign = "center";
      context.fillText("녹음 파일을 선택하면 파형이 표시됩니다.", width / 2, height / 2 - 14);
      return;
    }

    const range = getCurrentAudioSelectionRange();
    if (range) {
      const startX = (range.startSample / state.samples.length) * width;
      const endX = (range.endSample / state.samples.length) * width;
      context.fillStyle = "rgba(36, 87, 214, 0.16)";
      context.fillRect(startX, 0, Math.max(1, endX - startX), height);
    }

    context.strokeStyle = "#2457d6";
    context.lineWidth = 1.5;
    context.beginPath();
    const pointCount = state.peaks.length / 2;
    for (let x = 0; x < width; x += 1) {
      const peakIndex = Math.min(pointCount - 1, Math.floor((x / Math.max(1, width - 1)) * pointCount));
      const min = state.peaks[peakIndex * 2];
      const max = state.peaks[peakIndex * 2 + 1];
      const y1 = height / 2 - max * (height * 0.42);
      const y2 = height / 2 - min * (height * 0.42);
      context.moveTo(x + 0.5, y1);
      context.lineTo(x + 0.5, y2);
    }
    context.stroke();

    const playheadX = durationToCanvasX(state.playheadSeconds, width);
    context.strokeStyle = "#d46d2f";
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(playheadX, 0);
    context.lineTo(playheadX, height);
    context.stroke();
  }

  function durationToCanvasX(seconds, width) {
    const duration = getAudioEditorDuration();
    return duration > 0 ? clampNumber(seconds / duration, 0, 1) * width : 0;
  }
}

async function decodeAudioFileForEditor(file) {
  if (!file) {
    throw new Error("편집할 녹음 파일을 선택해 주세요.");
  }
  if (file.size > AUDIO_EDITOR_MAX_BYTES) {
    throw new Error(`파일이 너무 큽니다. ${formatBytes(AUDIO_EDITOR_MAX_BYTES)} 이하의 휴대폰 녹음 파일로 다시 시도해 주세요.`);
  }

  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) {
    throw new Error("현재 브라우저는 녹음 파일 편집에 필요한 오디오 디코딩을 지원하지 않습니다.");
  }

  let context = null;
  try {
    const arrayBuffer = await file.arrayBuffer();
    context = new AudioContextClass();
    const audioBuffer = await context.decodeAudioData(arrayBuffer.slice(0));
    if (!audioBuffer.length) {
      throw new Error("녹음 파일에서 편집할 수 있는 오디오 데이터를 찾지 못했습니다.");
    }
    return {
      samples: extractMonoAudioPcm(audioBuffer),
      sampleRate: audioBuffer.sampleRate,
      channelCount: audioBuffer.numberOfChannels || 1,
      duration: audioBuffer.duration,
    };
  } catch (error) {
    throw new Error(error?.message || "브라우저가 이 녹음 파일을 편집용 파형으로 변환하지 못했습니다.");
  } finally {
    if (context?.close) {
      context.close().catch(() => {});
    }
  }
}

function readAudioMetadata(file) {
  return new Promise((resolve) => {
    const audio = document.createElement("audio");
    const url = URL.createObjectURL(file);
    let settled = false;

    const finish = (metadata) => {
      if (settled) return;
      settled = true;
      URL.revokeObjectURL(url);
      resolve(metadata);
    };

    audio.preload = "metadata";
    audio.onloadedmetadata = () => {
      finish({
        duration: Number.isFinite(audio.duration) ? audio.duration : 0,
      });
    };
    audio.onerror = () => finish({ duration: 0 });
    window.setTimeout(() => finish({ duration: 0 }), 7000);
    audio.src = url;
  });
}

function describeAudioFile(file, metadata) {
  const parts = [`크기 ${formatBytes(file.size)}`];
  if (metadata?.duration) {
    parts.unshift(`길이 ${formatDuration(metadata.duration)}`);
  } else {
    parts.unshift("길이 확인 불가");
  }
  if (file.type) parts.push(`형식 ${file.type}`);
  return `${parts.join(" · ")} · 서버 업로드 없이 브라우저에서 처리합니다.`;
}

async function prepareAudioInputForTranscription(file) {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) {
    throw new Error("현재 브라우저는 녹음 파일을 음성 인식용 파형으로 변환하는 기능을 지원하지 않습니다.");
  }

  let context = null;
  try {
    const arrayBuffer = await file.arrayBuffer();
    context = new AudioContextClass();
    const audioBuffer = await context.decodeAudioData(arrayBuffer.slice(0));
    const mono = extractMonoAudioPcm(audioBuffer);
    const processed = preprocessAudioPcm(mono, audioBuffer.sampleRate);
    if (!processed.samples.length) {
      throw new Error("녹음 파일에서 분석할 수 있는 음성 구간을 찾지 못했습니다.");
    }
    const audioData =
      processed.samples.byteOffset === 0 && processed.samples.byteLength === processed.samples.buffer.byteLength
        ? processed.samples
        : new Float32Array(processed.samples);
    return {
      audioData,
      stats: processed.stats,
      summary: formatAudioPreprocessSummary(processed.stats),
      cleanup: () => {},
    };
  } catch {
    throw new Error("브라우저가 이 녹음 파일을 음성 인식용 파형으로 변환하지 못했습니다. 다른 형식의 짧은 녹음 파일로 다시 시도해 주세요.");
  } finally {
    if (context?.close) {
      context.close().catch(() => {});
    }
  }
}

function transcribeAudioInWorker({ profile, candidates, audioData, options, progressCallback }) {
  if (!window.Worker) {
    return Promise.reject(new Error("브라우저가 백그라운드 음성 인식 작업을 지원하지 않습니다."));
  }
  if (!audioData?.buffer?.byteLength || !(audioData instanceof Float32Array)) {
    return Promise.reject(new Error("녹음 파일의 파형 데이터를 음성 인식 작업으로 전달하지 못했습니다."));
  }

  const worker = getAudioTranscriptionWorker();
  const requestId = `${Date.now()}-${(audioTranscriptionWorkerRequestId += 1)}`;
  return new Promise((resolve, reject) => {
    audioTranscriptionWorkerRequests.set(requestId, { resolve, reject, progressCallback });
    try {
      worker.postMessage(
        {
          id: requestId,
          type: "transcribe",
          profile: {
            model: profile.model,
            label: profile.label,
          },
          candidates,
          audioData,
          options,
        },
        [audioData.buffer]
      );
    } catch (error) {
      audioTranscriptionWorkerRequests.delete(requestId);
      reject(error);
    }
  });
}

function getAudioTranscriptionWorker() {
  if (audioTranscriptionWorker) return audioTranscriptionWorker;

  const source = createAudioTranscriptionWorkerSource();
  const blob = new Blob([source], { type: "text/javascript" });
  audioTranscriptionWorkerUrl = URL.createObjectURL(blob);
  audioTranscriptionWorker = new Worker(audioTranscriptionWorkerUrl, { type: "module" });
  audioTranscriptionWorker.addEventListener("message", handleAudioTranscriptionWorkerMessage);
  audioTranscriptionWorker.addEventListener("error", handleAudioTranscriptionWorkerFailure);
  audioTranscriptionWorker.addEventListener("messageerror", handleAudioTranscriptionWorkerFailure);
  return audioTranscriptionWorker;
}

function handleAudioTranscriptionWorkerMessage(event) {
  const message = event.data || {};
  const request = audioTranscriptionWorkerRequests.get(message.id);
  if (!request) return;

  if (message.type === "progress") {
    request.progressCallback?.(message.progress);
    return;
  }

  audioTranscriptionWorkerRequests.delete(message.id);
  if (message.type === "result") {
    request.resolve(message.result);
    return;
  }
  request.reject(new Error(message.error || "백그라운드 음성 인식 작업에 실패했습니다."));
}

function handleAudioTranscriptionWorkerFailure(error) {
  const message = error?.message || "백그라운드 음성 인식 작업이 중단되었습니다.";
  audioTranscriptionWorkerRequests.forEach(({ reject }) => reject(new Error(message)));
  audioTranscriptionWorkerRequests.clear();
  if (audioTranscriptionWorker) {
    audioTranscriptionWorker.terminate();
    audioTranscriptionWorker = null;
  }
  if (audioTranscriptionWorkerUrl) {
    URL.revokeObjectURL(audioTranscriptionWorkerUrl);
    audioTranscriptionWorkerUrl = "";
  }
}

function createAudioTranscriptionWorkerSource() {
  return `
    const transformersModuleUrl = ${JSON.stringify(AUDIO_TRANSFORMERS_MODULE_URL)};
    const pipelineCache = new Map();
    let transformersPromise = null;

    self.addEventListener("message", (event) => {
      const message = event.data || {};
      if (message.type !== "transcribe") return;
      transcribe(message).catch((error) => {
        self.postMessage({
          id: message.id,
          type: "error",
          error: error && error.message ? error.message : String(error || "Unknown worker error"),
        });
      });
    });

    async function transcribe(message) {
      const transformers = await loadTransformers();
      if (!transformers.pipeline) {
        throw new Error("Transformers.js 파이프라인을 불러오지 못했습니다.");
      }

      const transcriber = await getPipeline(transformers, message);
      const result = await transcriber(message.audioData, message.options || {});
      self.postMessage({ id: message.id, type: "result", result });
    }

    function loadTransformers() {
      if (!transformersPromise) {
        transformersPromise = import(transformersModuleUrl);
      }
      return transformersPromise;
    }

    async function getPipeline(transformers, message) {
      let lastError = null;
      const candidates = Array.isArray(message.candidates) && message.candidates.length
        ? message.candidates
        : [{ device: "wasm", dtype: { encoder_model: "q8", decoder_model_merged: "fp16" } }];
      for (const candidate of candidates) {
        const key = [message.profile.model, candidate.device, formatDtypeKey(candidate.dtype)].join(":");
        if (!pipelineCache.has(key)) {
          pipelineCache.set(
            key,
            transformers
              .pipeline("automatic-speech-recognition", message.profile.model, {
                device: candidate.device,
                dtype: candidate.dtype,
                progress_callback: (progress) => {
                  self.postMessage({ id: message.id, type: "progress", progress });
                },
              })
              .catch((error) => {
                pipelineCache.delete(key);
                throw error;
              })
          );
        }

        try {
          return await pipelineCache.get(key);
        } catch (error) {
          lastError = error;
        }
      }
      throw lastError || new Error("음성 인식 모델을 준비하지 못했습니다.");
    }

    function formatDtypeKey(dtype) {
      if (!dtype || typeof dtype !== "object") return String(dtype || "default");
      return Object.keys(dtype)
        .sort()
        .map((key) => key + ":" + dtype[key])
        .join(",");
    }
  `;
}

function extractMonoAudioPcm(audioBuffer) {
  const length = audioBuffer.length;
  const channels = Math.max(1, audioBuffer.numberOfChannels || 1);
  const mono = new Float32Array(length);
  for (let channel = 0; channel < channels; channel += 1) {
    const data = audioBuffer.getChannelData(channel);
    for (let index = 0; index < length; index += 1) {
      mono[index] += data[index] / channels;
    }
  }
  return mono;
}

function preprocessAudioPcm(samples, sampleRate) {
  const source = samples instanceof Float32Array ? samples : new Float32Array(samples || []);
  const safeSampleRate = Number.isFinite(sampleRate) && sampleRate > 0 ? sampleRate : AUDIO_PREPROCESS_TARGET_SAMPLE_RATE;
  if (!source.length) {
    return {
      samples: new Float32Array(0),
      sampleRate: AUDIO_PREPROCESS_TARGET_SAMPLE_RATE,
      stats: { originalSeconds: 0, processedSeconds: 0, removedSeconds: 0, gain: 1, changed: false },
    };
  }

  const mono = resampleAudioPcm(source, safeSampleRate, AUDIO_PREPROCESS_TARGET_SAMPLE_RATE);
  const frameSize = Math.max(160, Math.round(AUDIO_PREPROCESS_TARGET_SAMPLE_RATE * AUDIO_PREPROCESS_FRAME_SECONDS));
  const frameCount = Math.ceil(mono.length / frameSize);
  const frameRms = [];
  let maxRms = 0;

  for (let frame = 0; frame < frameCount; frame += 1) {
    const start = frame * frameSize;
    const end = Math.min(mono.length, start + frameSize);
    let sumSquares = 0;
    for (let index = start; index < end; index += 1) {
      const value = mono[index];
      sumSquares += value * value;
    }
    const rms = Math.sqrt(sumSquares / Math.max(1, end - start));
    frameRms.push(rms);
    maxRms = Math.max(maxRms, rms);
  }

  const sortedRms = [...frameRms].sort((a, b) => a - b);
  const noiseFloor = sortedRms[Math.floor(sortedRms.length * 0.2)] || 0;
  const threshold = Math.max(noiseFloor * 1.8, maxRms * 0.025, 0.0012);
  const activeFrames = frameRms.map((rms) => rms >= threshold);
  const activeCount = activeFrames.filter(Boolean).length;
  const activeRatio = activeFrames.length ? activeCount / activeFrames.length : 0;

  let startFrame = 0;
  let endFrame = Math.max(0, frameCount - 1);
  if (activeCount > 0 && activeRatio >= 0.015) {
    const firstActive = activeFrames.findIndex(Boolean);
    const lastActive = activeFrames.length - 1 - [...activeFrames].reverse().findIndex(Boolean);
    const paddingFrames = Math.max(1, Math.round(AUDIO_PREPROCESS_EDGE_PADDING_SECONDS / AUDIO_PREPROCESS_FRAME_SECONDS));
    startFrame = Math.max(0, firstActive - paddingFrames);
    endFrame = Math.min(frameCount - 1, lastActive + paddingFrames);
  }

  const startSample = Math.max(0, startFrame * frameSize);
  const endSample = Math.min(mono.length, (endFrame + 1) * frameSize);
  const trimmed = endSample > startSample ? mono.slice(startSample, endSample) : mono;
  const speechRmsValues = frameRms.slice(startFrame, endFrame + 1).filter((rms) => rms >= threshold);
  const speechRms = getAudioPercentile(speechRmsValues.length ? speechRmsValues : frameRms, 0.75) || maxRms || 0;
  const percentilePeak = estimateAudioAbsPercentile(trimmed, 0.995);
  const rmsGain = speechRms > 0 ? AUDIO_PREPROCESS_TARGET_RMS / speechRms : 1;
  const peakGain = percentilePeak > 0 ? 0.88 / percentilePeak : AUDIO_PREPROCESS_MAX_GAIN;
  const gain = Math.max(1, Math.min(AUDIO_PREPROCESS_MAX_GAIN, rmsGain, Math.max(1, peakGain)));
  const normalized = new Float32Array(trimmed.length);
  for (let index = 0; index < trimmed.length; index += 1) {
    normalized[index] = limitAudioSample(trimmed[index] * gain);
  }

  const originalSeconds = mono.length / AUDIO_PREPROCESS_TARGET_SAMPLE_RATE;
  const processedSeconds = normalized.length / AUDIO_PREPROCESS_TARGET_SAMPLE_RATE;
  return {
    samples: normalized,
    sampleRate: AUDIO_PREPROCESS_TARGET_SAMPLE_RATE,
    stats: {
      originalSeconds,
      processedSeconds,
      removedSeconds: Math.max(0, originalSeconds - processedSeconds),
      activeRatio,
      gain,
      changed: Math.abs(processedSeconds - originalSeconds) > 0.1 || Math.abs(gain - 1) > 0.05,
    },
  };
}

function getAudioPercentile(values, ratio) {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.min(sorted.length - 1, Math.max(0, Math.floor(sorted.length * ratio)));
  return sorted[index] || 0;
}

function estimateAudioAbsPercentile(samples, ratio) {
  if (!samples.length) return 0;
  const maxValues = 24000;
  const step = Math.max(1, Math.floor(samples.length / maxValues));
  const values = [];
  for (let index = 0; index < samples.length; index += step) {
    values.push(Math.abs(samples[index]));
  }
  return getAudioPercentile(values, ratio);
}

function limitAudioSample(value) {
  if (value > 1) return 1;
  if (value < -1) return -1;
  return value;
}

function resampleAudioPcm(samples, sourceRate, targetRate) {
  if (Math.round(sourceRate) === Math.round(targetRate)) return new Float32Array(samples);
  const ratio = sourceRate / targetRate;
  const length = Math.max(1, Math.round(samples.length / ratio));
  const output = new Float32Array(length);
  for (let index = 0; index < length; index += 1) {
    const sourceIndex = index * ratio;
    const before = Math.floor(sourceIndex);
    const after = Math.min(samples.length - 1, before + 1);
    const weight = sourceIndex - before;
    output[index] = samples[before] * (1 - weight) + samples[after] * weight;
  }
  return output;
}

function encodePcm16Wav(samples, sampleRate) {
  const dataLength = samples.length * 2;
  const buffer = new ArrayBuffer(44 + dataLength);
  const view = new DataView(buffer);
  writeAscii(view, 0, "RIFF");
  view.setUint32(4, 36 + dataLength, true);
  writeAscii(view, 8, "WAVE");
  writeAscii(view, 12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeAscii(view, 36, "data");
  view.setUint32(40, dataLength, true);
  let offset = 44;
  for (let index = 0; index < samples.length; index += 1) {
    const value = Math.max(-1, Math.min(1, samples[index]));
    view.setInt16(offset, value < 0 ? value * 0x8000 : value * 0x7fff, true);
    offset += 2;
  }
  return buffer;
}

function buildAudioWaveformPeaks(samples, pointCount = AUDIO_EDITOR_WAVEFORM_POINTS) {
  const source = samples instanceof Float32Array ? samples : new Float32Array(samples || []);
  const safePointCount = Math.max(1, Math.min(Math.round(pointCount) || 1, Math.max(1, source.length)));
  const peaks = new Float32Array(safePointCount * 2);
  if (!source.length) return peaks;

  const bucketSize = Math.max(1, Math.ceil(source.length / safePointCount));
  for (let point = 0; point < safePointCount; point += 1) {
    const start = point * bucketSize;
    const end = Math.min(source.length, start + bucketSize);
    let min = 0;
    let max = 0;
    for (let index = start; index < end; index += 1) {
      const value = source[index];
      if (value < min) min = value;
      if (value > max) max = value;
    }
    peaks[point * 2] = min;
    peaks[point * 2 + 1] = max;
  }
  return peaks;
}

function normalizeAudioEditRange(length, startSample, endSample, sampleRate = 44100) {
  const safeLength = Math.max(0, Math.floor(length || 0));
  const safeRate = Number.isFinite(sampleRate) && sampleRate > 0 ? sampleRate : 44100;
  if (!safeLength) return null;
  const start = clampNumber(Math.round(Number(startSample) || 0), 0, safeLength);
  const end = clampNumber(Math.round(Number(endSample) || 0), 0, safeLength);
  const min = Math.min(start, end);
  const max = Math.max(start, end);
  if (max - min < safeRate * AUDIO_EDITOR_MIN_SELECTION_SECONDS) return null;
  return { startSample: min, endSample: max };
}

function deleteAudioRange(samples, startSample, endSample) {
  const source = samples instanceof Float32Array ? samples : new Float32Array(samples || []);
  const range = normalizeAudioEditRange(source.length, startSample, endSample);
  if (!range) return new Float32Array(source);
  const output = new Float32Array(source.length - (range.endSample - range.startSample));
  output.set(source.slice(0, range.startSample), 0);
  output.set(source.slice(range.endSample), range.startSample);
  return output;
}

function keepAudioRange(samples, startSample, endSample) {
  const source = samples instanceof Float32Array ? samples : new Float32Array(samples || []);
  const range = normalizeAudioEditRange(source.length, startSample, endSample);
  return range ? source.slice(range.startSample, range.endSample) : new Float32Array(source);
}

function insertAudioSegment(samples, insertSample, segment) {
  const source = samples instanceof Float32Array ? samples : new Float32Array(samples || []);
  const clip = segment instanceof Float32Array ? segment : new Float32Array(segment || []);
  if (!clip.length) return new Float32Array(source);
  const index = clampNumber(Math.round(Number(insertSample) || 0), 0, source.length);
  const output = new Float32Array(source.length + clip.length);
  output.set(source.slice(0, index), 0);
  output.set(clip, index);
  output.set(source.slice(index), index + clip.length);
  return output;
}

function applyAudioGainRange(samples, startSample, endSample, gain) {
  const source = samples instanceof Float32Array ? samples : new Float32Array(samples || []);
  const output = new Float32Array(source);
  const safeGain = Number.isFinite(gain) ? Math.max(0, Math.min(4, gain)) : 1;
  const range = normalizeAudioEditRange(output.length, startSample, endSample) || {
    startSample: 0,
    endSample: output.length,
  };
  for (let index = range.startSample; index < range.endSample; index += 1) {
    output[index] = limitAudioSample(output[index] * safeGain);
  }
  return output;
}

function writeAscii(view, offset, text) {
  for (let index = 0; index < text.length; index += 1) {
    view.setUint8(offset + index, text.charCodeAt(index));
  }
}

function formatAudioPreprocessSummary(stats) {
  if (!stats) return "전처리를 건너뛰고 원본 녹음 파일을 분석합니다.";
  const parts = [];
  if (stats.removedSeconds >= 0.3) {
    parts.push(`앞뒤 빈 구간 ${formatDuration(stats.removedSeconds)} 정리`);
  }
  if (stats.gain > 1.15) {
    parts.push(`작은 목소리 ${stats.gain.toFixed(1)}배 보정`);
  }
  return parts.length
    ? `전처리 완료: ${parts.join(" · ")}.`
    : "전처리 완료: 대화 흐름을 유지하고 볼륨만 확인했습니다.";
}

function validateAudioFile(file, metadata) {
  if (!matchesFileAccept(file, "audio/*,.m4a,.mp3,.wav,.aac,.webm,.ogg")) {
    return "지원하지 않는 녹음 파일 형식입니다.";
  }
  if (file.size > AUDIO_TRANSCRIPTION_MAX_BYTES) {
    return `현재 베타 버전은 ${formatBytes(AUDIO_TRANSCRIPTION_MAX_BYTES)} 이하 파일부터 권장합니다.`;
  }
  if (metadata?.duration && metadata.duration > AUDIO_TRANSCRIPTION_MAX_SECONDS) {
    return `현재 베타 버전은 ${formatDuration(AUDIO_TRANSCRIPTION_MAX_SECONDS)} 이하 녹음 파일부터 지원합니다.`;
  }
  return "";
}

function getAudioModelProfile(profileId) {
  const normalizedId = AUDIO_TRANSCRIPTION_MODEL_PROFILE_ALIASES[profileId] || profileId;
  return AUDIO_TRANSCRIPTION_MODEL_PROFILES[normalizedId] || AUDIO_TRANSCRIPTION_MODEL_PROFILES[AUDIO_TRANSCRIPTION_DEFAULT_PROFILE];
}

function describeAudioProfile(profile) {
  return profile?.hint || getAudioModelProfile(AUDIO_TRANSCRIPTION_DEFAULT_PROFILE).hint;
}

function formatDuration(seconds) {
  if (!Number.isFinite(seconds) || seconds <= 0) return "0:00";
  const total = Math.round(seconds);
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const remain = total % 60;
  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(remain).padStart(2, "0")}`;
  }
  return `${minutes}:${String(remain).padStart(2, "0")}`;
}

function getAudioTranscriberCandidates(deviceMode, canUseWebGpu = Boolean(navigator.gpu)) {
  if (deviceMode === "webgpu") {
    if (!canUseWebGpu) {
      return [{ device: "wasm", dtype: AUDIO_TRANSCRIPTION_WASM_BALANCED_DTYPE }];
    }
    return [
      { device: "webgpu", dtype: AUDIO_TRANSCRIPTION_HIGH_QUALITY_DTYPE },
      { device: "wasm", dtype: AUDIO_TRANSCRIPTION_WASM_BALANCED_DTYPE },
      { device: "wasm", dtype: "fp32" },
    ];
  }
  if (deviceMode === "lightweight") {
    return [{ device: "wasm", dtype: AUDIO_TRANSCRIPTION_WASM_BALANCED_DTYPE }];
  }
  if (deviceMode === "wasm") {
    return [
      { device: "wasm", dtype: "fp32" },
      { device: "wasm", dtype: AUDIO_TRANSCRIPTION_WASM_BALANCED_DTYPE },
    ];
  }
  if (!canUseWebGpu) {
    return [{ device: "wasm", dtype: AUDIO_TRANSCRIPTION_WASM_BALANCED_DTYPE }];
  }
  return [
    { device: "webgpu", dtype: AUDIO_TRANSCRIPTION_HIGH_QUALITY_DTYPE },
    { device: "wasm", dtype: AUDIO_TRANSCRIPTION_WASM_BALANCED_DTYPE },
    { device: "wasm", dtype: "fp32" },
  ];
}

function formatAudioTranscriptionError(error) {
  const message = String(error?.message || "").trim();
  if (/can't create a session|TransposeDQWeights|Missing required scale|qdq_actions/i.test(message)) {
    return "녹음 파일 텍스트 변환에 실패했습니다. 브라우저 음성 인식 모델의 정밀도 조합이 현재 실행 환경과 맞지 않습니다. 새로고침 후 다시 시도해 주세요.";
  }
  if (/failed to fetch|load failed|network/i.test(message)) {
    return "녹음 파일 텍스트 변환에 실패했습니다. 브라우저가 선택한 녹음 파일이나 음성 인식 모델 파일을 가져오지 못했습니다. 새로고침 후 다시 시도하고, 회사망·보안 프로그램·광고 차단 기능이 cdn.jsdelivr.net, huggingface.co, cas-bridge.xethub.hf.co 접속을 막는지 확인해 주세요.";
  }
  if (/backend|webgpu|wasm|dynamically imported module/i.test(message)) {
    return "녹음 파일 텍스트 변환에 실패했습니다. 브라우저 음성 인식 백엔드를 준비하지 못했습니다. 새로고침 후 다시 시도해 주세요.";
  }
  return `녹음 파일 텍스트 변환에 실패했습니다. ${message}`.trim();
}

function formatModelProgress(progress) {
  if (!progress || typeof progress !== "object") return "";
  const value = Number(progress.progress);
  if (Number.isFinite(value)) return `모델 ${Math.max(0, Math.min(100, Math.round(value)))}%`;
  if (progress.status === "ready") return "모델 준비 완료";
  if (progress.status === "initiate") return "모델 다운로드";
  if (progress.status === "download") return "모델 다운로드";
  if (progress.status === "progress") return "모델 준비 중";
  return "";
}

function formatAudioTranscriptionResult(result, includeTimestamps) {
  const output = Array.isArray(result) ? result[0] : result;
  if (!output) return "";
  if (includeTimestamps && Array.isArray(output.chunks) && output.chunks.length > 0) {
    return output.chunks
      .map((chunk) => {
        const label = formatAudioChunkTimestamp(chunk.timestamp);
        const text = String(chunk.text || "").trim();
        return label ? `${label} ${text}` : text;
      })
      .filter(Boolean)
      .join("\n")
      .trim();
  }
  return String(output.text || "").replace(/\s+/g, " ").trim();
}

function cleanAudioTranscriptDraft(text) {
  const normalized = String(text || "").replace(/\s+/g, " ").trim();
  if (!normalized) return "";

  const phraseCleaned = cleanRepeatedAudioPhrases(normalized);
  const parts = phraseCleaned.match(/[^.!?。！？]+[.!?。！？]?/g) || [phraseCleaned];
  const kept = [];
  let previousKey = "";
  let repeatCount = 0;

  parts.forEach((part) => {
    const sentence = cleanInlineAudioRepetitions(part.replace(/\s+/g, " ").trim());
    if (!sentence) return;

    const key = normalizeAudioRepeatUnit(sentence);
    if (key && key === previousKey && key.length <= 24) {
      repeatCount += 1;
      return;
    }

    finishRepeatedAudioSentence(kept, repeatCount);
    kept.push(sentence);
    previousKey = key;
    repeatCount = 0;
  });

  finishRepeatedAudioSentence(kept, repeatCount);
  return kept.join(" ").replace(/\s+/g, " ").trim();
}

function cleanInlineAudioRepetitions(sentence) {
  const tokens = String(sentence || "")
    .split(/\s+/)
    .map((token) => token.trim())
    .filter(Boolean);
  if (tokens.length < 8) return String(sentence || "").trim();

  const keys = tokens.map(normalizeAudioRepeatToken).filter((key) => key.length >= 2);
  if (keys.length < 8) return tokens.join(" ");

  const counts = new Map();
  let previousKey = "";
  let consecutive = 0;
  let maxConsecutive = 0;
  keys.forEach((key) => {
    counts.set(key, (counts.get(key) || 0) + 1);
    consecutive = key === previousKey ? consecutive + 1 : 1;
    maxConsecutive = Math.max(maxConsecutive, consecutive);
    previousKey = key;
  });

  const dominantCount = Math.max(...counts.values());
  const dominantRatio = dominantCount / keys.length;
  if (dominantCount >= 5 && dominantRatio >= 0.42 && maxConsecutive >= 3) {
    return "";
  }

  return tokens.join(" ");
}

function cleanRepeatedAudioPhrases(text) {
  const normalized = String(text || "").trim();
  if (!normalized) return "";

  const segments = normalized.match(/[^.!?。！？]+[.!?。！？]?/g) || [normalized];
  return segments
    .map(cleanRepeatedAudioPhraseSegment)
    .filter(Boolean)
    .join(" ")
    .replace(/\s+([,，、.!?。！？])/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanRepeatedAudioPhraseSegment(text) {
  const tokens = String(text || "")
    .split(/([,，、])/)
    .map((token) => token.trim())
    .filter(Boolean);
  if (tokens.length < 3) return String(text || "").trim();

  const output = [];
  let previousPhraseKey = "";
  let repeatCount = 0;

  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index];
    if (/^[,，、]$/.test(token)) {
      if (output.length && !/[.!?。！？,，、]$/.test(output[output.length - 1])) {
        output[output.length - 1] = `${output[output.length - 1]},`;
      }
      continue;
    }

    const key = normalizeAudioRepeatUnit(token);
    const isShortRepeat = key && key === previousPhraseKey && key.length <= 28;
    if (isShortRepeat) {
      repeatCount += 1;
      continue;
    }

    finishRepeatedAudioPhrase(output, repeatCount);

    output.push(token);
    previousPhraseKey = key;
    repeatCount = 0;
  }

  finishRepeatedAudioPhrase(output, repeatCount);

  return output.join(" ").replace(/\s+([,，、.!?。！？])/g, "$1").replace(/\s+/g, " ").trim();
}

function finishRepeatedAudioSentence(items, repeatCount) {
  if (repeatCount >= 2 && items.length) {
    items.pop();
  }
}

function finishRepeatedAudioPhrase(items, repeatCount) {
  if (!repeatCount || !items.length) return;
  if (repeatCount >= 2) {
    items.pop();
    return;
  }
  items[items.length - 1] = items[items.length - 1].replace(/[,，、]\s*$/, "");
}

function normalizeAudioRepeatUnit(text) {
  return String(text || "")
    .replace(/[,.!?，、。！？'"“”‘’()[\]{}<>《》「」]/g, "")
    .replace(/\s+/g, "")
    .trim()
    .toLowerCase();
}

function normalizeAudioRepeatToken(text) {
  return String(text || "")
    .replace(/[,.!?，、。！？'"“”‘’()[\]{}<>《》「」]/g, "")
    .replace(/(입니다|이에요|예요|인가요|으로|에서|에게|까지|부터|처럼|하고|이랑|랑|와|과|은|는|이|가|을|를|의)$/g, "")
    .trim()
    .toLowerCase();
}

function breakAudioTranscriptSentences(text) {
  return String(text || "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/(^|[^\d])([.?!。？！])\s*(?=\S)/g, "$1$2\n");
}

function formatAudioChunkTimestamp(timestamp) {
  if (!Array.isArray(timestamp) || timestamp.length < 1) return "";
  const start = Number(timestamp[0]);
  const end = Number(timestamp[1]);
  if (!Number.isFinite(start)) return "";
  return Number.isFinite(end) ? `[${formatDuration(start)}-${formatDuration(end)}]` : `[${formatDuration(start)}]`;
}

function getVoiceToolCopy() {
  if (APP_LOCALE === "ja") {
    return {
      recognitionLang: "ja-JP",
      title: "音声入力テキスト化",
      checking: "確認中",
      idle: "待機",
      start: "音声入力開始",
      resume: "再開",
      pause: "一時停止",
      stop: "終了",
      clear: "リセット",
      transcriptTitle: "ライブ文字起こし",
      liveMetaInitial: "0文字 · 00:00",
      transcriptPlaceholder: "音声入力を開始すると、話した内容がここに表示されます。",
      titleLabel: "タイトル",
      titlePlaceholder: "例: 新商品の紹介動画",
      formatLabel: "形式",
      typeLabels: {
        general: "一般原稿",
        youtube: "YouTube動画",
        presentation: "プレゼン",
        meeting: "会議メモ",
      },
      removeFillers: "不要な口ぐせを整理",
      addSections: "見出しを追加",
      makeScript: "原稿を作成",
      browserNote: "認識が切れた場合、ブラウザが自動再接続を試みます。ChromeまたはEdgeを推奨します。",
      outputTitle: "仕上げ原稿",
      outputMetaInitial: "0文字",
      copy: "コピー",
      download: "TXT保存",
      outputPlaceholder: "整理された日本語原稿がここに表示されます。",
      unsupported: "音声認識に未対応",
      unsupportedToast: "ブラウザ音声認識にはChromeまたはEdgeを使用してください。",
      ready: "日本語認識の準備完了",
      listening: "認識中",
      waitingSpeech: "音声待ち",
      reconnecting: "再接続中",
      paused: "一時停止",
      permissionToast: "音声入力を始めるにはマイク権限が必要です。",
      noCopy: "コピーするテキストがありません。",
      copied: "クリップボードにコピーしました。",
      noSave: "保存するテキストがありません。",
      filenameDefault: "script",
      noSource: "先にマイクで話すかテキストを入力してください。",
      restartFail: "音声認識を再開できませんでした。もう一度開始してください。",
      liveMeta: (chars, seconds) => `${chars.toLocaleString("ja-JP")}文字 · ${formatClock(seconds)}`,
      outputMeta: (chars) => `${chars.toLocaleString("ja-JP")}文字`,
    };
  }

  if (APP_LOCALE === "zh") {
    return {
      recognitionLang: "zh-CN",
      title: "语音转文字",
      checking: "检查中",
      idle: "待机",
      start: "开始听写",
      resume: "继续",
      pause: "暂停",
      stop: "结束",
      clear: "重置",
      transcriptTitle: "实时转写",
      liveMetaInitial: "0字 · 00:00",
      transcriptPlaceholder: "开始听写后，识别到的中文会显示在这里。",
      titleLabel: "标题",
      titlePlaceholder: "例：新品介绍视频",
      formatLabel: "格式",
      typeLabels: {
        general: "通用稿",
        youtube: "YouTube视频",
        presentation: "演示稿",
        meeting: "会议摘要",
      },
      removeFillers: "清理口头填充词",
      addSections: "添加小标题",
      makeScript: "生成稿件",
      browserNote: "如果识别连接中断，浏览器会尝试自动重连。建议使用 Chrome 或 Edge。",
      outputTitle: "整理稿",
      outputMetaInitial: "0字",
      copy: "复制",
      download: "保存TXT",
      outputPlaceholder: "整理后的中文稿件会显示在这里。",
      unsupported: "不支持语音识别",
      unsupportedToast: "请使用 Chrome 或 Edge 的浏览器语音识别。",
      ready: "中文识别准备就绪",
      listening: "正在听写",
      waitingSpeech: "等待语音",
      reconnecting: "正在重连",
      paused: "已暂停",
      permissionToast: "需要允许麦克风权限才能开始听写。",
      noCopy: "没有可复制的文本。",
      copied: "已复制到剪贴板。",
      noSave: "没有可保存的文本。",
      filenameDefault: "script",
      noSource: "请先对麦克风说话或输入文本。",
      restartFail: "无法重新启动语音识别。请再次点击开始听写。",
      liveMeta: (chars, seconds) => `${chars.toLocaleString("zh-CN")}字 · ${formatClock(seconds)}`,
      outputMeta: (chars) => `${chars.toLocaleString("zh-CN")}字`,
    };
  }

  if (IS_ENGLISH_LOCALE) {
    return {
      recognitionLang: "en-US",
      title: "Speech to Text Dictation",
      checking: "Checking",
      idle: "Idle",
      start: "Start Dictation",
      resume: "Resume",
      pause: "Pause",
      stop: "Stop",
      clear: "Clear",
      transcriptTitle: "Live Transcript",
      liveMetaInitial: "0 chars · 00:00",
      transcriptPlaceholder: "When dictation starts, spoken English will appear here.",
      titleLabel: "Title",
      titlePlaceholder: "Example: New product intro video",
      formatLabel: "Format",
      typeLabels: {
        general: "General Script",
        youtube: "YouTube Video",
        presentation: "Presentation",
        meeting: "Meeting Summary",
      },
      removeFillers: "Clean filler words",
      addSections: "Add section headings",
      makeScript: "Make Script",
      browserNote:
        "If recognition disconnects, the browser will try to reconnect automatically. Chrome or Edge is recommended.",
      outputTitle: "Final Script",
      outputMetaInitial: "0 chars",
      copy: "Copy",
      download: "Save TXT",
      outputPlaceholder: "The cleaned English script will appear here.",
      unsupported: "Speech recognition unsupported",
      unsupportedToast: "Please use Chrome or Edge for browser speech recognition.",
      ready: "English recognition ready",
      listening: "Listening",
      waitingSpeech: "Waiting for speech",
      reconnecting: "Reconnecting",
      paused: "Paused",
      permissionToast: "Microphone permission is required to start dictation.",
      noCopy: "There is no text to copy.",
      copied: "Copied to clipboard.",
      noSave: "There is no text to save.",
      filenameDefault: "script",
      noSource: "Speak into the microphone or enter text first.",
      restartFail: "Speech recognition could not restart. Press Start Dictation again.",
      liveMeta: (chars, seconds) => `${chars.toLocaleString("en-US")} chars · ${formatClock(seconds)}`,
      outputMeta: (chars) => `${chars.toLocaleString("en-US")} chars`,
    };
  }

  return {
    recognitionLang: "ko-KR",
    title: "음성 텍스트 받아쓰기",
    checking: "확인 중",
    idle: "대기",
    start: "녹음 시작",
    resume: "다시 시작",
    pause: "일시정지",
    stop: "종료",
    clear: "초기화",
    transcriptTitle: "음성 텍스트",
    liveMetaInitial: "0자 · 00:00",
    transcriptPlaceholder: "녹음이 시작되면 여기에 말한 내용이 쌓입니다.",
    titleLabel: "제목",
    titlePlaceholder: "예: 신제품 소개 영상",
    formatLabel: "형식",
    typeLabels: {
      general: "일반 대본",
      youtube: "유튜브 영상",
      presentation: "발표문",
      meeting: "회의 요약",
    },
    removeFillers: "군더더기 말 정리",
    addSections: "문단 제목 추가",
    makeScript: "대본 만들기",
    browserNote:
      "마이크가 끊기면 브라우저가 자동 재연결을 시도합니다. Chrome 또는 Edge 환경을 권장합니다.",
    outputTitle: "완성 대본",
    outputMetaInitial: "0자",
    copy: "복사",
    download: "TXT 저장",
    outputPlaceholder: "정리된 대본이 여기에 만들어집니다.",
    unsupported: "음성 인식 미지원",
    unsupportedToast: "Chrome 또는 Edge에서 실행해 주세요.",
    ready: "한국어 인식 준비",
    listening: "녹음 중",
    waitingSpeech: "말 대기 중",
    reconnecting: "다시 연결 중",
    paused: "일시정지",
    permissionToast: "마이크 권한을 허용해야 녹음을 시작할 수 있습니다.",
    noCopy: "복사할 내용이 없습니다.",
    copied: "클립보드에 복사했습니다.",
    noSave: "저장할 내용이 없습니다.",
    filenameDefault: "대본",
    noSource: "먼저 마이크로 말하거나 텍스트를 입력해 주세요.",
    restartFail: "음성 인식을 다시 시작하지 못했습니다. 녹음 시작을 다시 눌러 주세요.",
    liveMeta: (chars, seconds) => `${chars.toLocaleString("ko-KR")}자 · ${formatClock(seconds)}`,
    outputMeta: (chars) => `${chars.toLocaleString("ko-KR")}자`,
  };
}

function renderVoiceTool(container) {
  const voiceCopy = getVoiceToolCopy();
  container.innerHTML = `
    <div class="tool-section">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Voice Input</p>
          <h2>${escapeHtml(voiceCopy.title)}</h2>
        </div>
        <div class="status-group" aria-live="polite">
          <span id="supportStatus" class="status-pill">${escapeHtml(voiceCopy.checking)}</span>
          <span id="recordStatus" class="record-pill">${escapeHtml(voiceCopy.idle)}</span>
        </div>
      </div>
      <div class="editor-card">
        <div class="action-row">
          <button id="startBtn" class="primary-action" type="button">${escapeHtml(voiceCopy.start)}</button>
          <button id="pauseBtn" type="button" disabled>${escapeHtml(voiceCopy.pause)}</button>
          <button id="stopBtn" type="button" disabled>${escapeHtml(voiceCopy.stop)}</button>
          <button id="clearBtn" type="button">${escapeHtml(voiceCopy.clear)}</button>
          <div class="meter" aria-hidden="true">
            <span></span><span></span><span></span><span></span>
            <span></span><span></span><span></span><span></span>
          </div>
        </div>
      </div>
      <div class="tool-grid">
        <article class="editor-card">
          <div class="section-heading">
            <div>
              <h2>${escapeHtml(voiceCopy.transcriptTitle)}</h2>
              <p id="liveMeta" class="tool-note">${escapeHtml(voiceCopy.liveMetaInitial)}</p>
            </div>
            <span id="interimText" class="tool-note"></span>
          </div>
          <textarea id="transcriptInput" placeholder="${escapeHtml(voiceCopy.transcriptPlaceholder)}"></textarea>
        </article>
        <aside class="editor-card">
          <div class="field">
            <label for="scriptTitle">${escapeHtml(voiceCopy.titleLabel)}</label>
            <input id="scriptTitle" type="text" placeholder="${escapeHtml(voiceCopy.titlePlaceholder)}" />
          </div>
          <div class="field">
            <label for="scriptType">${escapeHtml(voiceCopy.formatLabel)}</label>
            <select id="scriptType">
              <option value="general">${escapeHtml(voiceCopy.typeLabels.general)}</option>
              <option value="youtube">${escapeHtml(voiceCopy.typeLabels.youtube)}</option>
              <option value="presentation">${escapeHtml(voiceCopy.typeLabels.presentation)}</option>
              <option value="meeting">${escapeHtml(voiceCopy.typeLabels.meeting)}</option>
            </select>
          </div>
          <div class="check-row">
            <label class="check-item"><input id="removeFillers" type="checkbox" checked /> ${escapeHtml(voiceCopy.removeFillers)}</label>
            <label class="check-item"><input id="addSections" type="checkbox" checked /> ${escapeHtml(voiceCopy.addSections)}</label>
          </div>
          <button id="makeScriptBtn" class="primary-action" type="button">${escapeHtml(voiceCopy.makeScript)}</button>
          <p class="tool-note">${escapeHtml(voiceCopy.browserNote)}</p>
        </aside>
      </div>
      <article class="result-card">
        <div class="section-heading">
          <div>
            <h2>${escapeHtml(voiceCopy.outputTitle)}</h2>
            <p id="outputMeta" class="tool-note">${escapeHtml(voiceCopy.outputMetaInitial)}</p>
          </div>
          <div class="action-row">
            <button id="copyBtn" type="button">${escapeHtml(voiceCopy.copy)}</button>
            <button id="downloadBtn" type="button">${escapeHtml(voiceCopy.download)}</button>
          </div>
        </div>
        <textarea id="scriptOutput" placeholder="${escapeHtml(voiceCopy.outputPlaceholder)}"></textarea>
      </article>
    </div>
  `;

  const state = {
    recognition: null,
    isListening: false,
    isPaused: false,
    startedAt: null,
    elapsedBeforePause: 0,
    timerId: null,
    restartTimerId: null,
    noSpeechCount: 0,
    lastEndReason: null,
    heardSpeechInSession: false,
  };

  const root = container;
  const voiceEls = {
    supportStatus: root.querySelector("#supportStatus"),
    recordStatus: root.querySelector("#recordStatus"),
    startBtn: root.querySelector("#startBtn"),
    pauseBtn: root.querySelector("#pauseBtn"),
    stopBtn: root.querySelector("#stopBtn"),
    clearBtn: root.querySelector("#clearBtn"),
    makeScriptBtn: root.querySelector("#makeScriptBtn"),
    copyBtn: root.querySelector("#copyBtn"),
    downloadBtn: root.querySelector("#downloadBtn"),
    transcriptInput: root.querySelector("#transcriptInput"),
    scriptOutput: root.querySelector("#scriptOutput"),
    interimText: root.querySelector("#interimText"),
    liveMeta: root.querySelector("#liveMeta"),
    outputMeta: root.querySelector("#outputMeta"),
    scriptTitle: root.querySelector("#scriptTitle"),
    scriptType: root.querySelector("#scriptType"),
    removeFillers: root.querySelector("#removeFillers"),
    addSections: root.querySelector("#addSections"),
    meter: root.querySelector(".meter"),
  };

  if (!SpeechRecognition) {
    voiceEls.supportStatus.textContent = voiceCopy.unsupported;
    voiceEls.startBtn.disabled = true;
    showToast(voiceCopy.unsupportedToast);
  } else {
    voiceEls.supportStatus.textContent = voiceCopy.ready;
    createVoiceRecognition(state, voiceEls);
  }

  voiceEls.startBtn.addEventListener("click", startListening);
  voiceEls.pauseBtn.addEventListener("click", pauseListening);
  voiceEls.stopBtn.addEventListener("click", stopListening);
  voiceEls.clearBtn.addEventListener("click", clearAll);
  voiceEls.makeScriptBtn.addEventListener("click", makeScript);
  voiceEls.copyBtn.addEventListener("click", async () => {
    const text = voiceEls.scriptOutput.value.trim() || voiceEls.transcriptInput.value.trim();
    if (!text) {
      showToast(voiceCopy.noCopy);
      return;
    }
    await safeCopy(text, voiceCopy.copied);
  });
  voiceEls.downloadBtn.addEventListener("click", () => {
    const text = voiceEls.scriptOutput.value.trim() || voiceEls.transcriptInput.value.trim();
    if (!text) {
      showToast(voiceCopy.noSave);
      return;
    }
    downloadText(text, `${sanitizeFilename(voiceEls.scriptTitle.value || voiceCopy.filenameDefault)}.txt`);
  });
  voiceEls.transcriptInput.addEventListener("input", updateMeta);
  voiceEls.scriptOutput.addEventListener("input", updateOutputMeta);

  syncButtons();
  updateMeta();
  updateOutputMeta();

  function createVoiceRecognition(voiceState, nodes) {
    const recognition = new SpeechRecognition();
    recognition.lang = voiceCopy.recognitionLang;
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      voiceState.isListening = true;
      voiceState.isPaused = false;
      voiceState.lastEndReason = null;
      voiceState.heardSpeechInSession = false;
      nodes.recordStatus.textContent = voiceCopy.listening;
      nodes.recordStatus.classList.add("active");
      nodes.interimText.textContent = "";
      syncButtons();
      startTimer();
      startMeter();
    };

    recognition.onresult = (event) => {
      let interim = "";
      const finalParts = [];
      let heardSpeech = false;

      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        const text = event.results[index][0].transcript.trim();
        if (!text) continue;
        heardSpeech = true;
        if (event.results[index].isFinal) {
          finalParts.push(text);
        } else {
          interim += `${text} `;
        }
      }

      if (finalParts.length > 0) {
        appendTranscript(finalParts.join(" "));
      }

      if (heardSpeech) {
        voiceState.noSpeechCount = 0;
        voiceState.heardSpeechInSession = true;
      }

      nodes.interimText.textContent = interim.trim();
    };

    recognition.onerror = (event) => {
      if (event.error === "no-speech") {
        voiceState.noSpeechCount += 1;
        voiceState.lastEndReason = "no-speech";
        nodes.recordStatus.textContent = voiceCopy.waitingSpeech;
        return;
      }

      voiceState.lastEndReason = event.error;
      showToast(getRecognitionErrorMessage(event.error));
      if (
        event.error === "not-allowed" ||
        event.error === "service-not-allowed" ||
        event.error === "audio-capture"
      ) {
        stopListening();
      }
    };

    recognition.onend = () => {
      nodes.interimText.textContent = "";

      if (voiceState.isListening && !voiceState.isPaused) {
        nodes.recordStatus.textContent =
          voiceState.lastEndReason === "no-speech" ? voiceCopy.waitingSpeech : voiceCopy.reconnecting;
        scheduleRecognitionRestart(recognition);
        return;
      }

      stopTimer();
      stopMeter();
      syncIdleStatus();
    };

    voiceState.recognition = recognition;
  }

  function startListening() {
    if (!state.recognition || (state.isListening && !state.isPaused)) return;

    try {
      clearRestartTimer();
      if (!state.isPaused) {
        state.elapsedBeforePause = 0;
        state.noSpeechCount = 0;
      }
      state.startedAt = Date.now();
      state.isPaused = false;
      state.recognition.start();
    } catch (error) {
      showToast(voiceCopy.permissionToast);
      stopMeter();
    }
  }

  function pauseListening() {
    if (!state.recognition || !state.isListening) return;

    clearRestartTimer();
    state.isPaused = true;
    state.elapsedBeforePause = getElapsedMs();
    state.startedAt = null;
    state.recognition.stop();
    voiceEls.recordStatus.textContent = voiceCopy.paused;
    voiceEls.recordStatus.classList.remove("active");
    syncButtons();
  }

  function stopListening() {
    if (!state.recognition) return;
    clearRestartTimer();
    const finalElapsed = getElapsedMs();
    state.isListening = false;
    state.isPaused = false;
    state.noSpeechCount = 0;
    state.lastEndReason = null;
    state.elapsedBeforePause = finalElapsed;
    state.startedAt = null;

    try {
      state.recognition.stop();
    } catch (error) {
      syncIdleStatus();
    }

    stopTimer();
    stopMeter();
    syncIdleStatus();
  }

  function appendTranscript(text) {
    const clean = text.replace(/\s+/g, " ").trim();
    if (!clean) return;
    const current = voiceEls.transcriptInput.value.trim();
    voiceEls.transcriptInput.value = current ? `${current}\n${clean}` : clean;
    updateMeta();
  }

  function makeScript() {
    const source = voiceEls.transcriptInput.value.trim();
    if (!source) {
      showToast(voiceCopy.noSource);
      return;
    }

    const cleaned = cleanTranscript(source, voiceEls.removeFillers.checked);
    const sentences = splitSentences(cleaned);
    const script = composeScript({
      title: voiceEls.scriptTitle.value.trim(),
      type: voiceEls.scriptType.value,
      sentences,
      addSections: voiceEls.addSections.checked,
    });
    voiceEls.scriptOutput.value = script;
    updateOutputMeta();
  }

  function clearAll() {
    voiceEls.transcriptInput.value = "";
    voiceEls.scriptOutput.value = "";
    voiceEls.interimText.textContent = "";
    state.elapsedBeforePause = 0;
    state.startedAt = state.isListening && !state.isPaused ? Date.now() : null;
    updateMeta();
    updateOutputMeta();
  }

  function syncButtons() {
    voiceEls.startBtn.textContent = state.isPaused ? voiceCopy.resume : voiceCopy.start;
    voiceEls.startBtn.disabled = state.isListening && !state.isPaused;
    voiceEls.pauseBtn.disabled = !state.isListening || state.isPaused;
    voiceEls.stopBtn.disabled = !state.isListening && !state.isPaused;
  }

  function syncIdleStatus() {
    if (state.isPaused) {
      voiceEls.recordStatus.textContent = voiceCopy.paused;
      voiceEls.recordStatus.classList.remove("active");
      syncButtons();
      return;
    }

    state.isListening = false;
    voiceEls.recordStatus.textContent = voiceCopy.idle;
    voiceEls.recordStatus.classList.remove("active");
    syncButtons();
  }

  function startTimer() {
    stopTimer();
    if (!state.startedAt) state.startedAt = Date.now();
    state.timerId = window.setInterval(updateMeta, 500);
  }

  function stopTimer() {
    if (state.timerId) {
      window.clearInterval(state.timerId);
      state.timerId = null;
    }
    updateMeta();
  }

  function getElapsedMs() {
    if (!state.startedAt) return state.elapsedBeforePause;
    return state.elapsedBeforePause + Date.now() - state.startedAt;
  }

  function updateMeta() {
    const chars = voiceEls.transcriptInput.value.trim().length;
    const seconds = Math.floor(getElapsedMs() / 1000);
    voiceEls.liveMeta.textContent = voiceCopy.liveMeta(chars, seconds);
  }

  function updateOutputMeta() {
    const chars = voiceEls.scriptOutput.value.trim().length;
    voiceEls.outputMeta.textContent = voiceCopy.outputMeta(chars);
  }

  function startMeter() {
    voiceEls.meter.classList.add("listening");
  }

  function stopMeter() {
    voiceEls.meter.classList.remove("listening");
  }

  function clearRestartTimer() {
    if (state.restartTimerId) {
      window.clearTimeout(state.restartTimerId);
      state.restartTimerId = null;
    }
  }

  function scheduleRecognitionRestart(recognition, attempt = 0) {
    clearRestartTimer();
    const delay = getRestartDelay(attempt);

    state.restartTimerId = window.setTimeout(() => {
      if (!state.isListening || state.isPaused) return;
      try {
        recognition.start();
        state.restartTimerId = null;
      } catch (error) {
        if (attempt < 4) {
          scheduleRecognitionRestart(recognition, attempt + 1);
          return;
        }

        state.isListening = false;
        stopTimer();
        stopMeter();
        syncIdleStatus();
        showToast(voiceCopy.restartFail);
      }
    }, delay);
  }

  function getRestartDelay(attempt) {
    if (state.lastEndReason === "no-speech") {
      const silenceDelays = [900, 1300, 1800, 2400];
      const index = Math.min(state.noSpeechCount - 1, silenceDelays.length - 1);
      return silenceDelays[Math.max(index, 0)] + attempt * 600;
    }
    return 900 + attempt * 600;
  }
}

function renderWebcamRecorder(container) {
  const formatOptions = getRecorderFormatOptions();
  const defaultFormat = formatOptions.find((format) => format.ext === "webm") || formatOptions[0];
  const mp4Supported = formatOptions.some((format) => format.ext === "mp4");

  container.innerHTML = `
    <div class="tool-section webcam-recorder-tool">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Camera Recorder</p>
          <h2>웹캠 녹화</h2>
        </div>
        <div class="status-group" aria-live="polite">
          <span id="cameraSupportStatus" class="status-pill">확인 중</span>
          <span id="cameraRecordStatus" class="record-pill">대기</span>
        </div>
      </div>

      <article class="permission-card webcam-permission-card" aria-live="polite">
        <div>
          <p class="eyebrow">Permission</p>
          <h3 id="cameraPermissionTitle">카메라 권한이 필요합니다</h3>
          <p id="cameraPermissionText">아래 버튼을 누르면 브라우저의 카메라 권한 요청 창이 열립니다.</p>
        </div>
        <div class="permission-actions">
          <button id="requestCameraPermissionBtn" class="primary-action" type="button">카메라 권한 요청</button>
          <button id="permissionGuideBtn" type="button" aria-controls="cameraPermissionGuide" aria-expanded="false">직접 허용 방법</button>
        </div>
        <div id="cameraPermissionGuide" class="permission-guide" hidden>
          <strong>권한 창이 뜨지 않을 때</strong>
          <ol>
            <li>주소창 왼쪽의 자물쇠 또는 사이트 설정 아이콘을 누릅니다.</li>
            <li>카메라와 필요한 경우 마이크를 허용으로 변경합니다.</li>
            <li>페이지를 새로고침한 뒤 권한 요청 버튼을 다시 누릅니다.</li>
          </ol>
        </div>
      </article>

      <div class="webcam-grid">
        <article class="editor-card webcam-preview-card">
          <div class="section-heading">
            <div>
              <h2>카메라 미리보기</h2>
              <p id="recordingMeta" class="tool-note">00:00 · 녹화 전</p>
            </div>
            <span id="recordingBadge" class="recording-badge" hidden>REC</span>
          </div>

          <div class="webcam-stage">
            <video id="cameraSourceVideo" playsinline muted hidden></video>
            <canvas id="cameraPreviewCanvas"></canvas>
            <div id="webcamPlaceholder" class="webcam-placeholder">
              <strong>카메라를 켜면 미리보기가 표시됩니다.</strong>
              <span>영상은 서버로 업로드되지 않고 브라우저에서 바로 녹화됩니다.</span>
            </div>
          </div>

          <div class="action-row">
            <button id="startCameraBtn" class="primary-action" type="button">카메라 켜기</button>
            <button id="stopCameraBtn" type="button" disabled>카메라 끄기</button>
            <button id="startRecordingBtn" type="button" disabled>녹화 시작</button>
            <button id="pauseRecordingBtn" type="button" disabled>일시정지</button>
            <button id="stopRecordingBtn" type="button" disabled>녹화 종료</button>
          </div>
        </article>

        <aside class="editor-card webcam-control-card">
          <div class="field">
            <label for="cameraSelect">카메라</label>
            <select id="cameraSelect" disabled>
              <option value="">권한 허용 후 선택 가능</option>
            </select>
          </div>

          <div class="field-row">
            <div class="field">
              <label for="recordQuality">해상도</label>
              <select id="recordQuality">
                <option value="720">HD 720p</option>
                <option value="1080">Full HD 1080p</option>
                <option value="480">가벼운 480p</option>
              </select>
            </div>
            <div class="field">
              <label for="recordFormat">저장 형식</label>
              <select id="recordFormat">
                ${formatOptions
                  .map(
                    (format) =>
                      `<option value="${escapeHtml(format.value)}" ${format.value === defaultFormat?.value ? "selected" : ""}>${escapeHtml(format.label)}</option>`
                  )
                  .join("")}
              </select>
            </div>
          </div>

          <div class="check-row">
            <label class="check-item"><input id="includeMic" type="checkbox" checked /> 마이크 포함</label>
            <label class="check-item"><input id="mirrorVideo" type="checkbox" checked /> 좌우반전 적용</label>
          </div>

          <div class="field">
            <label for="filterPreset">필터</label>
            <select id="filterPreset">
              <option value="none">기본</option>
              <option value="bright">밝고 선명하게</option>
              <option value="warm">따뜻한 톤</option>
              <option value="cool">차가운 톤</option>
              <option value="mono">흑백</option>
              <option value="cinema">시네마틱</option>
              <option value="soft">부드럽게</option>
            </select>
          </div>

          <div class="range-grid">
            <label>
              <span>밝기 <output id="brightnessValue">100%</output></span>
              <input id="brightnessRange" type="range" min="70" max="140" value="100" />
            </label>
            <label>
              <span>대비 <output id="contrastValue">100%</output></span>
              <input id="contrastRange" type="range" min="70" max="150" value="100" />
            </label>
            <label>
              <span>채도 <output id="saturationValue">100%</output></span>
              <input id="saturationRange" type="range" min="0" max="180" value="100" />
            </label>
          </div>

          <div class="background-effect-card">
            <div class="section-heading compact-heading">
              <div>
                <h2>배경 효과</h2>
                <p id="backgroundEffectStatus" class="tool-note">효과를 켜면 브라우저에서만 배경을 분리합니다.</p>
              </div>
            </div>
            <div class="field">
              <label for="backgroundMode">효과</label>
              <select id="backgroundMode">
                <option value="none">사용 안 함</option>
                <option value="blur">배경 흐리게</option>
                <option value="color">단색 배경</option>
                <option value="image">이미지 배경</option>
              </select>
            </div>
            <div class="field-row background-options">
              <div class="field">
                <label for="backgroundBlurRange">흐림</label>
                <input id="backgroundBlurRange" type="range" min="4" max="28" value="14" />
              </div>
              <div class="field">
                <label for="backgroundColorInput">배경색</label>
                <input id="backgroundColorInput" type="color" value="#f4f7fb" />
              </div>
            </div>
            <div class="background-upload-row background-drop-zone" aria-label="배경 이미지 드래그 업로드">
              <label class="secondary-action background-file-label" for="backgroundImageFile">배경 이미지 선택</label>
              <input id="backgroundImageFile" type="file" accept="image/*" />
              <button id="clearBackgroundImageBtn" type="button" disabled>이미지 지우기</button>
            </div>
          </div>

          <p id="formatSupportNote" class="tool-note">
            ${mp4Supported ? "기본은 WebM입니다. 이 브라우저에서는 MP4 직접 녹화도 선택할 수 있습니다." : "기본은 WebM입니다. 현재 브라우저에서는 MP4 직접 녹화를 지원하지 않습니다."}
          </p>
        </aside>
      </div>

      <article class="result-card webcam-result-card">
        <div class="section-heading">
          <div>
            <h2>녹화 파일</h2>
            <p id="recordedMeta" class="tool-note">녹화를 완료하면 파일 정보가 표시됩니다.</p>
          </div>
          <div class="action-row">
            <button id="downloadVideoBtn" type="button" disabled>영상 저장</button>
            <button id="clearRecordingBtn" type="button" disabled>결과 지우기</button>
          </div>
        </div>
        <video id="recordedVideo" controls playsinline hidden></video>
      </article>
    </div>
  `;

  const nodes = {
    supportStatus: container.querySelector("#cameraSupportStatus"),
    recordStatus: container.querySelector("#cameraRecordStatus"),
    sourceVideo: container.querySelector("#cameraSourceVideo"),
    canvas: container.querySelector("#cameraPreviewCanvas"),
    placeholder: container.querySelector("#webcamPlaceholder"),
    recordingBadge: container.querySelector("#recordingBadge"),
    recordingMeta: container.querySelector("#recordingMeta"),
    recordedMeta: container.querySelector("#recordedMeta"),
    recordedVideo: container.querySelector("#recordedVideo"),
    startCameraBtn: container.querySelector("#startCameraBtn"),
    stopCameraBtn: container.querySelector("#stopCameraBtn"),
    startRecordingBtn: container.querySelector("#startRecordingBtn"),
    pauseRecordingBtn: container.querySelector("#pauseRecordingBtn"),
    stopRecordingBtn: container.querySelector("#stopRecordingBtn"),
    downloadVideoBtn: container.querySelector("#downloadVideoBtn"),
    clearRecordingBtn: container.querySelector("#clearRecordingBtn"),
    cameraSelect: container.querySelector("#cameraSelect"),
    recordQuality: container.querySelector("#recordQuality"),
    recordFormat: container.querySelector("#recordFormat"),
    includeMic: container.querySelector("#includeMic"),
    mirrorVideo: container.querySelector("#mirrorVideo"),
    filterPreset: container.querySelector("#filterPreset"),
    brightnessRange: container.querySelector("#brightnessRange"),
    contrastRange: container.querySelector("#contrastRange"),
    saturationRange: container.querySelector("#saturationRange"),
    brightnessValue: container.querySelector("#brightnessValue"),
    contrastValue: container.querySelector("#contrastValue"),
    saturationValue: container.querySelector("#saturationValue"),
    backgroundMode: container.querySelector("#backgroundMode"),
    backgroundBlurRange: container.querySelector("#backgroundBlurRange"),
    backgroundColorInput: container.querySelector("#backgroundColorInput"),
    backgroundImageFile: container.querySelector("#backgroundImageFile"),
    clearBackgroundImageBtn: container.querySelector("#clearBackgroundImageBtn"),
    backgroundEffectStatus: container.querySelector("#backgroundEffectStatus"),
    permissionTitle: container.querySelector("#cameraPermissionTitle"),
    permissionText: container.querySelector("#cameraPermissionText"),
    requestPermissionBtn: container.querySelector("#requestCameraPermissionBtn"),
    permissionGuideBtn: container.querySelector("#permissionGuideBtn"),
    permissionGuide: container.querySelector("#cameraPermissionGuide"),
  };

  const state = {
    stream: null,
    recorder: null,
    recordingCanvasStream: null,
    chunks: [],
    recordedBlob: null,
    recordedUrl: "",
    recordedExtension: "webm",
    animationId: null,
    timerId: null,
    startedAt: 0,
    elapsedBeforePause: 0,
    isRecording: false,
    isPaused: false,
    lastMimeType: "video/webm",
    cameraPermission: "unknown",
    micPermission: "unknown",
    backgroundImage: null,
    backgroundImageUrl: "",
    backgroundEffectReady: false,
    backgroundEffectLoading: false,
    backgroundEffectError: "",
    segmenter: null,
    segmenterPromise: null,
    segmentationBusy: false,
    lastSegmentationAt: 0,
    maskImageData: null,
    maskWidth: 0,
    maskHeight: 0,
  };

  const context = nodes.canvas.getContext("2d", { alpha: false });
  const personCanvas = document.createElement("canvas");
  const foregroundCanvas = document.createElement("canvas");
  const maskCanvas = document.createElement("canvas");
  const personContext = personCanvas.getContext("2d", { alpha: false });
  const foregroundContext = foregroundCanvas.getContext("2d");
  const maskContext = maskCanvas.getContext("2d");
  const mediaSupported =
    Boolean(navigator.mediaDevices?.getUserMedia) &&
    Boolean(window.MediaRecorder) &&
    typeof nodes.canvas.captureStream === "function";

  if (!mediaSupported) {
    nodes.supportStatus.textContent = "녹화 미지원";
    nodes.startCameraBtn.disabled = true;
    nodes.requestPermissionBtn.disabled = true;
    nodes.startRecordingBtn.disabled = true;
    nodes.permissionTitle.textContent = "이 브라우저에서는 녹화를 지원하지 않습니다";
    nodes.permissionText.textContent = "최신 Chrome 또는 Edge에서 카메라 녹화를 사용할 수 있습니다.";
    showToast("이 브라우저에서는 웹캠 녹화를 지원하지 않습니다.");
  } else {
    nodes.supportStatus.textContent = "브라우저 녹화 준비";
  }

  nodes.requestPermissionBtn.addEventListener("click", startCamera);
  nodes.permissionGuideBtn.addEventListener("click", togglePermissionGuide);
  nodes.startCameraBtn.addEventListener("click", startCamera);
  nodes.stopCameraBtn.addEventListener("click", stopCamera);
  nodes.startRecordingBtn.addEventListener("click", startRecording);
  nodes.pauseRecordingBtn.addEventListener("click", toggleRecordingPause);
  nodes.stopRecordingBtn.addEventListener("click", stopRecording);
  nodes.downloadVideoBtn.addEventListener("click", downloadRecording);
  nodes.clearRecordingBtn.addEventListener("click", clearRecording);
  nodes.cameraSelect.addEventListener("change", restartCameraIfIdle);
  nodes.recordQuality.addEventListener("change", restartCameraIfIdle);
  nodes.includeMic.addEventListener("change", restartCameraIfIdle);
  nodes.backgroundMode.addEventListener("change", handleBackgroundModeChange);
  nodes.backgroundImageFile.addEventListener("change", loadBackgroundImage);
  bindFileDropZone(container.querySelector(".background-drop-zone"), nodes.backgroundImageFile);
  nodes.clearBackgroundImageBtn.addEventListener("click", clearBackgroundImage);
  nodes.backgroundBlurRange.addEventListener("input", syncBackgroundControls);
  nodes.backgroundColorInput.addEventListener("input", syncBackgroundControls);
  [nodes.brightnessRange, nodes.contrastRange, nodes.saturationRange].forEach((input) => {
    input.addEventListener("input", syncRangeLabels);
  });
  nodes.includeMic.addEventListener("change", updatePermissionUi);
  window.addEventListener("beforeunload", stopAllMedia, { once: true });

  initPermissionStatus();
  syncRangeLabels();
  syncBackgroundControls();
  syncRecorderButtons();

  async function initPermissionStatus() {
    if (!navigator.permissions?.query) {
      updatePermissionUi();
      return;
    }

    await Promise.all([watchDevicePermission("camera", "cameraPermission"), watchDevicePermission("microphone", "micPermission")]);
    updatePermissionUi();
  }

  async function refreshPermissionStatus() {
    if (!navigator.permissions?.query) {
      updatePermissionUi();
      return;
    }

    await Promise.all([readDevicePermission("camera", "cameraPermission"), readDevicePermission("microphone", "micPermission")]);
    updatePermissionUi();
  }

  async function watchDevicePermission(permissionName, stateKey) {
    try {
      const permission = await navigator.permissions.query({ name: permissionName });
      state[stateKey] = permission.state;
      const handlePermissionChange = () => {
        state[stateKey] = permission.state;
        updatePermissionUi();
        syncRecorderButtons();
      };
      if (typeof permission.addEventListener === "function") {
        permission.addEventListener("change", handlePermissionChange);
      } else {
        permission.onchange = handlePermissionChange;
      }
    } catch (error) {
      state[stateKey] = "unknown";
    }
  }

  async function readDevicePermission(permissionName, stateKey) {
    try {
      const permission = await navigator.permissions.query({ name: permissionName });
      state[stateKey] = permission.state;
    } catch (error) {
      state[stateKey] = "unknown";
    }
  }

  function togglePermissionGuide() {
    const shouldShow = nodes.permissionGuide.hidden;
    nodes.permissionGuide.hidden = !shouldShow;
    nodes.permissionGuideBtn.setAttribute("aria-expanded", String(shouldShow));
  }

  function updatePermissionUi() {
    if (!mediaSupported) return;

    const hasCamera = Boolean(state.stream);
    const wantsMic = nodes.includeMic.checked;
    const cameraLabel = formatPermissionState(state.cameraPermission);
    const micLabel = wantsMic ? `마이크 ${formatPermissionState(state.micPermission)}` : "마이크 미포함";

    if (hasCamera) {
      nodes.permissionTitle.textContent = "카메라 권한 허용됨";
      nodes.permissionText.textContent = `현재 카메라가 연결되어 있습니다. 카메라 ${cameraLabel}, ${micLabel}.`;
      nodes.supportStatus.textContent = "카메라 연결됨";
      return;
    }

    if (isPermissionBlocked()) {
      nodes.permissionTitle.textContent = "브라우저에서 권한이 차단되어 있습니다";
      nodes.permissionText.textContent = "권한 요청 창이 뜨지 않으면 직접 허용 방법을 눌러 사이트 설정에서 카메라 권한을 허용해 주세요.";
      nodes.supportStatus.textContent = "권한 차단됨";
      return;
    }

    nodes.permissionTitle.textContent = "카메라 권한이 필요합니다";
    nodes.permissionText.textContent = `권한 요청 버튼을 누르면 브라우저 권한 창이 열립니다. 카메라 ${cameraLabel}, ${micLabel}.`;
    nodes.supportStatus.textContent = state.cameraPermission === "granted" ? "권한 허용됨" : "권한 필요";
  }

  function isPermissionBlocked() {
    return state.cameraPermission === "denied" || (nodes.includeMic.checked && state.micPermission === "denied");
  }

  function formatPermissionState(permissionState) {
    if (permissionState === "granted") return "허용됨";
    if (permissionState === "denied") return "차단됨";
    if (permissionState === "prompt") return "요청 전";
    return "확인 필요";
  }

  async function startCamera() {
    if (!mediaSupported || state.isRecording) return;

    stopCameraTracks();
    clearPreview();

    try {
      nodes.requestPermissionBtn.disabled = true;
      nodes.recordStatus.textContent = "권한 요청 중";
      const constraints = buildCameraConstraints();
      state.stream = await requestCameraStream(constraints);
      nodes.sourceVideo.srcObject = state.stream;
      await nodes.sourceVideo.play();
      await populateCameraSelect();
      nodes.placeholder.hidden = true;
      nodes.supportStatus.textContent = "카메라 연결됨";
      nodes.recordStatus.textContent = "대기";
      await refreshPermissionStatus();
      startPreviewLoop();
      syncRecorderButtons();
    } catch (error) {
      state.stream = null;
      nodes.sourceVideo.srcObject = null;
      nodes.supportStatus.textContent = "권한 필요";
      nodes.recordStatus.textContent = "대기";
      nodes.placeholder.hidden = false;
      await refreshPermissionStatus();
      showToast(getCameraErrorMessage(error));
      syncRecorderButtons();
    }
  }

  async function requestCameraStream(constraints) {
    try {
      return await navigator.mediaDevices.getUserMedia(constraints);
    } catch (error) {
      if (!constraints.audio || !shouldRetryWithoutMic(error)) {
        throw error;
      }

      const videoOnlyConstraints = { ...constraints, audio: false };
      const stream = await navigator.mediaDevices.getUserMedia(videoOnlyConstraints);
      nodes.includeMic.checked = false;
      showToast("마이크 권한 없이 카메라만 연결했습니다. 마이크가 필요하면 브라우저 설정에서 허용해 주세요.");
      return stream;
    }
  }

  function shouldRetryWithoutMic(error) {
    return ["NotAllowedError", "SecurityError", "NotFoundError", "NotReadableError"].includes(error?.name);
  }

  function stopCamera() {
    if (state.isRecording) {
      showToast("녹화 종료 후 카메라를 끌 수 있습니다.");
      return;
    }
    stopCameraTracks();
    stopPreviewLoop();
    clearPreview();
    nodes.sourceVideo.srcObject = null;
    nodes.placeholder.hidden = false;
    nodes.supportStatus.textContent = mediaSupported ? "브라우저 녹화 준비" : "녹화 미지원";
    nodes.recordStatus.textContent = "대기";
    updatePermissionUi();
    syncRecorderButtons();
  }

  async function restartCameraIfIdle() {
    if (!state.stream || state.isRecording) return;
    await startCamera();
  }

  async function handleBackgroundModeChange() {
    if (nodes.backgroundMode.value !== "none" && state.backgroundEffectError) {
      state.backgroundEffectError = "";
      state.segmenterPromise = null;
    }
    syncBackgroundControls();
    if (usesSegmentedBackground()) {
      await ensureBackgroundSegmenter();
    }
  }

  function syncBackgroundControls() {
    const mode = nodes.backgroundMode.value;
    const effectActive = mode !== "none";
    nodes.backgroundBlurRange.disabled = mode !== "blur";
    nodes.backgroundColorInput.disabled = mode !== "color";
    nodes.backgroundImageFile.disabled = mode !== "image";
    nodes.clearBackgroundImageBtn.disabled = !state.backgroundImage || state.isRecording;

    if (!effectActive) {
      nodes.backgroundEffectStatus.textContent = "효과를 켜면 브라우저에서만 배경을 분리합니다.";
      return;
    }

    if (state.backgroundEffectError) {
      nodes.backgroundEffectStatus.textContent = state.backgroundEffectError;
      return;
    }

    if (state.backgroundEffectLoading) {
      nodes.backgroundEffectStatus.textContent = "배경 효과 모델을 불러오는 중입니다.";
      return;
    }

    if (mode === "image" && !state.backgroundImage) {
      nodes.backgroundEffectStatus.textContent = "배경으로 사용할 이미지를 선택해 주세요. 파일은 서버로 업로드되지 않습니다.";
      return;
    }

    nodes.backgroundEffectStatus.textContent = state.backgroundEffectReady
      ? "배경 효과 적용 중입니다. 처리는 브라우저에서만 진행됩니다."
      : "효과를 선택하면 배경 분리 모델을 불러옵니다.";
  }

  function usesSegmentedBackground() {
    const mode = nodes.backgroundMode.value;
    return mode === "blur" || mode === "color" || (mode === "image" && Boolean(state.backgroundImage));
  }

  async function loadBackgroundImage() {
    const file = nodes.backgroundImageFile.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      showToast("이미지 파일을 선택해 주세요.");
      nodes.backgroundImageFile.value = "";
      return;
    }

    if (state.backgroundImageUrl) URL.revokeObjectURL(state.backgroundImageUrl);
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.decoding = "async";
    image.onload = async () => {
      state.backgroundImage = image;
      state.backgroundImageUrl = url;
      nodes.backgroundMode.value = "image";
      syncBackgroundControls();
      await ensureBackgroundSegmenter();
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      nodes.backgroundImageFile.value = "";
      showToast("배경 이미지를 불러오지 못했습니다.");
    };
    image.src = url;
  }

  function clearBackgroundImage() {
    if (state.backgroundImageUrl) URL.revokeObjectURL(state.backgroundImageUrl);
    state.backgroundImage = null;
    state.backgroundImageUrl = "";
    nodes.backgroundImageFile.value = "";
    if (nodes.backgroundMode.value === "image") nodes.backgroundMode.value = "none";
    syncBackgroundControls();
  }

  function buildCameraConstraints() {
    const quality = {
      "1080": { width: 1920, height: 1080 },
      "720": { width: 1280, height: 720 },
      "480": { width: 854, height: 480 },
    }[nodes.recordQuality.value] || { width: 1280, height: 720 };

    const selectedDevice = nodes.cameraSelect.value;
    return {
      video: {
        width: { ideal: quality.width },
        height: { ideal: quality.height },
        frameRate: { ideal: 30, max: 30 },
        ...(selectedDevice ? { deviceId: { exact: selectedDevice } } : {}),
      },
      audio: nodes.includeMic.checked
        ? {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
          }
        : false,
    };
  }

  async function populateCameraSelect() {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const cameras = devices.filter((device) => device.kind === "videoinput");
    const activeDeviceId = state.stream?.getVideoTracks()[0]?.getSettings().deviceId || "";

    nodes.cameraSelect.innerHTML = cameras.length
      ? cameras
          .map((device, index) => {
            const label = device.label || `카메라 ${index + 1}`;
            const selected = device.deviceId === activeDeviceId ? "selected" : "";
            return `<option value="${escapeHtml(device.deviceId)}" ${selected}>${escapeHtml(label)}</option>`;
          })
          .join("")
      : `<option value="">기본 카메라</option>`;
    nodes.cameraSelect.disabled = cameras.length <= 1 || state.isRecording;
  }

  function startPreviewLoop() {
    stopPreviewLoop();
    drawPreviewFrame();
  }

  function drawPreviewFrame() {
    const video = nodes.sourceVideo;
    const width = video.videoWidth || 1280;
    const height = video.videoHeight || 720;

    if (nodes.canvas.width !== width || nodes.canvas.height !== height) {
      nodes.canvas.width = width;
      nodes.canvas.height = height;
    }
    ensureWorkCanvasSize(width, height);

    drawCameraFrame(personContext, video, width, height);

    if (usesSegmentedBackground()) {
      drawBackgroundComposite(width, height);
    } else {
      context.drawImage(personCanvas, 0, 0, width, height);
    }

    state.animationId = window.requestAnimationFrame(drawPreviewFrame);
  }

  function ensureWorkCanvasSize(width, height) {
    [personCanvas, foregroundCanvas].forEach((canvas) => {
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    });
  }

  function drawCameraFrame(targetContext, video, width, height) {
    targetContext.save();
    targetContext.fillStyle = "#101828";
    targetContext.fillRect(0, 0, width, height);
    targetContext.filter = buildCanvasFilter();
    if (nodes.mirrorVideo.checked) {
      targetContext.translate(width, 0);
      targetContext.scale(-1, 1);
    }
    targetContext.drawImage(video, 0, 0, width, height);
    targetContext.restore();
  }

  function drawBackgroundComposite(width, height) {
    ensureBackgroundSegmenter();
    maybeUpdateSegmentationMask();

    if (!state.maskImageData) {
      context.drawImage(personCanvas, 0, 0, width, height);
      return;
    }

    drawSelectedBackground(width, height);

    foregroundContext.clearRect(0, 0, width, height);
    foregroundContext.globalCompositeOperation = "source-over";
    foregroundContext.drawImage(personCanvas, 0, 0, width, height);
    foregroundContext.globalCompositeOperation = "destination-in";
    foregroundContext.drawImage(maskCanvas, 0, 0, width, height);
    foregroundContext.globalCompositeOperation = "source-over";
    context.drawImage(foregroundCanvas, 0, 0, width, height);
  }

  function drawSelectedBackground(width, height) {
    const mode = nodes.backgroundMode.value;
    context.save();
    context.filter = "none";

    if (mode === "blur") {
      const blurPx = Number(nodes.backgroundBlurRange.value) || 14;
      context.filter = `blur(${blurPx}px)`;
      const bleed = Math.max(24, blurPx * 2);
      context.drawImage(personCanvas, -bleed, -bleed, width + bleed * 2, height + bleed * 2);
    } else if (mode === "color") {
      context.fillStyle = nodes.backgroundColorInput.value || "#f4f7fb";
      context.fillRect(0, 0, width, height);
    } else if (mode === "image" && state.backgroundImage) {
      drawImageCover(context, state.backgroundImage, 0, 0, width, height);
    } else {
      context.drawImage(personCanvas, 0, 0, width, height);
    }

    context.restore();
  }

  function drawImageCover(targetContext, image, x, y, width, height) {
    const sourceWidth = image.naturalWidth || image.width;
    const sourceHeight = image.naturalHeight || image.height;
    const scale = Math.max(width / sourceWidth, height / sourceHeight);
    const drawWidth = sourceWidth * scale;
    const drawHeight = sourceHeight * scale;
    const drawX = x + (width - drawWidth) / 2;
    const drawY = y + (height - drawHeight) / 2;
    targetContext.drawImage(image, drawX, drawY, drawWidth, drawHeight);
  }

  async function ensureBackgroundSegmenter() {
    if (!usesSegmentedBackground() || state.segmenter || state.backgroundEffectError) {
      return state.segmenter;
    }
    if (state.segmenterPromise) return state.segmenterPromise;

    state.backgroundEffectLoading = true;
    syncBackgroundControls();
    state.segmenterPromise = (async () => {
      try {
        const visionTasks = await importVisionTasks();
        const vision = await visionTasks.FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm"
        );
        const segmenter = await visionTasks.ImageSegmenter.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath:
              "https://storage.googleapis.com/mediapipe-models/image_segmenter/selfie_segmenter_landscape/float16/latest/selfie_segmenter_landscape.tflite",
            delegate: "CPU",
          },
          runningMode: "VIDEO",
          outputCategoryMask: true,
          outputConfidenceMasks: true,
        });
        state.segmenter = segmenter;
        state.backgroundEffectReady = true;
        return segmenter;
      } catch (error) {
        state.backgroundEffectError = "배경 효과를 불러오지 못했습니다. 효과 없이 녹화합니다.";
        nodes.backgroundMode.value = "none";
        throw error;
      } finally {
        state.backgroundEffectLoading = false;
        syncBackgroundControls();
      }
    })();

    try {
      return await state.segmenterPromise;
    } catch (error) {
      return null;
    }
  }

  async function importVisionTasks() {
    try {
      return await import("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14");
    } catch (error) {
      return import("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/+esm");
    }
  }

  function maybeUpdateSegmentationMask() {
    if (!state.segmenter || state.segmentationBusy || personCanvas.width === 0 || personCanvas.height === 0) return;

    const now = performance.now();
    const intervalMs = nodes.recordQuality.value === "1080" ? 170 : 120;
    if (now - state.lastSegmentationAt < intervalMs) return;

    state.segmentationBusy = true;
    state.lastSegmentationAt = now;
    try {
      const result = state.segmenter.segmentForVideo(personCanvas, now);
      if (result) applySegmentationResult(result);
    } catch (error) {
      state.backgroundEffectError = "배경 효과 처리 중 오류가 발생했습니다. 효과 없이 녹화합니다.";
      nodes.backgroundMode.value = "none";
      syncBackgroundControls();
    } finally {
      state.segmentationBusy = false;
    }
  }

  function applySegmentationResult(result) {
    const confidenceMasks = result.confidenceMasks ? Array.from(result.confidenceMasks) : [];
    const confidenceMask = confidenceMasks.length ? confidenceMasks[confidenceMasks.length - 1] : null;
    const categoryMask = result.categoryMask || null;

    if (confidenceMask?.getAsFloat32Array) {
      updateMaskCanvas(confidenceMask, confidenceMask.getAsFloat32Array(), "confidence");
    } else if (categoryMask?.getAsUint8Array) {
      updateMaskCanvas(categoryMask, categoryMask.getAsUint8Array(), "category");
    }

    closeSegmentationResult(result);
  }

  function updateMaskCanvas(mask, data, type) {
    const width = Number(mask.width) || personCanvas.width;
    const height = Number(mask.height) || personCanvas.height;
    if (!width || !height || !data || data.length < width * height) return;

    if (maskCanvas.width !== width || maskCanvas.height !== height) {
      maskCanvas.width = width;
      maskCanvas.height = height;
    }

    const imageData = maskContext.createImageData(width, height);
    for (let index = 0; index < width * height; index += 1) {
      const value = data[index];
      const alpha =
        type === "confidence"
          ? Math.max(0, Math.min(255, ((value - 0.28) / 0.36) * 255))
          : value === 1
            ? 255
            : 0;
      const offset = index * 4;
      imageData.data[offset] = 255;
      imageData.data[offset + 1] = 255;
      imageData.data[offset + 2] = 255;
      imageData.data[offset + 3] = alpha;
    }

    maskContext.putImageData(imageData, 0, 0);
    state.maskImageData = imageData;
    state.maskWidth = width;
    state.maskHeight = height;
  }

  function closeSegmentationResult(result) {
    result.categoryMask?.close?.();
    result.confidenceMasks?.forEach((mask) => mask?.close?.());
    result.close?.();
  }

  function stopPreviewLoop() {
    if (state.animationId) {
      window.cancelAnimationFrame(state.animationId);
      state.animationId = null;
    }
  }

  function clearPreview() {
    context.clearRect(0, 0, nodes.canvas.width, nodes.canvas.height);
  }

  function buildCanvasFilter() {
    const presetFilters = {
      none: "",
      bright: "brightness(1.08) contrast(1.06)",
      warm: "sepia(0.18) saturate(1.14) brightness(1.03)",
      cool: "hue-rotate(8deg) saturate(1.08) brightness(1.02)",
      mono: "grayscale(1) contrast(1.08)",
      cinema: "contrast(1.18) saturate(0.92)",
      soft: "brightness(1.05) contrast(0.94) saturate(1.08) blur(0.2px)",
    };
    return [
      presetFilters[nodes.filterPreset.value] || "",
      `brightness(${nodes.brightnessRange.value}%)`,
      `contrast(${nodes.contrastRange.value}%)`,
      `saturate(${nodes.saturationRange.value}%)`,
    ]
      .filter(Boolean)
      .join(" ");
  }

  function startRecording() {
    if (!mediaSupported) return;
    if (!state.stream) {
      showToast("먼저 카메라를 켜 주세요.");
      return;
    }
    if (state.isRecording) return;

    const format = getSelectedFormat();
    const canvasStream = nodes.canvas.captureStream(30);
    const tracks = [...canvasStream.getVideoTracks()];
    if (nodes.includeMic.checked) {
      tracks.push(...state.stream.getAudioTracks());
    }

    const recordingStream = new MediaStream(tracks);
    const options = {
      videoBitsPerSecond: getVideoBitrate(),
    };
    if (format.mime) {
      options.mimeType = format.mime;
    }

    try {
      state.chunks = [];
      state.recordingCanvasStream = canvasStream;
      state.recorder = new MediaRecorder(recordingStream, options);
      state.lastMimeType = state.recorder.mimeType || format.mime || "video/webm";
      state.recordedExtension = state.lastMimeType.includes("mp4") ? "mp4" : format.ext;
      state.recorder.addEventListener("dataavailable", (event) => {
        if (event.data && event.data.size > 0) {
          state.chunks.push(event.data);
        }
      });
      state.recorder.addEventListener("stop", finalizeRecording, { once: true });
      state.recorder.start(1000);
      state.isRecording = true;
      state.isPaused = false;
      state.elapsedBeforePause = 0;
      state.startedAt = Date.now();
      startRecordingTimer();
      nodes.recordStatus.textContent = "녹화 중";
      nodes.recordStatus.classList.add("active");
      nodes.recordingBadge.hidden = false;
      syncRecorderButtons();
    } catch (error) {
      state.recordingCanvasStream?.getTracks().forEach((track) => track.stop());
      state.recordingCanvasStream = null;
      showToast("이 브라우저에서는 선택한 형식으로 녹화할 수 없습니다.");
      syncRecorderButtons();
    }
  }

  function toggleRecordingPause() {
    if (!state.recorder || !state.isRecording) return;

    if (state.recorder.state === "recording") {
      state.recorder.pause();
      state.isPaused = true;
      state.elapsedBeforePause = getRecordingElapsedMs();
      state.startedAt = 0;
      nodes.recordStatus.textContent = "일시정지";
      nodes.recordStatus.classList.remove("active");
    } else if (state.recorder.state === "paused") {
      state.recorder.resume();
      state.isPaused = false;
      state.startedAt = Date.now();
      nodes.recordStatus.textContent = "녹화 중";
      nodes.recordStatus.classList.add("active");
    }

    updateRecordingMeta();
    syncRecorderButtons();
  }

  function stopRecording() {
    if (!state.recorder || !state.isRecording) return;

    try {
      if (state.recorder.state !== "inactive") {
        state.recorder.stop();
      }
    } catch (error) {
      finalizeRecording();
    }
  }

  function finalizeRecording() {
    stopRecordingTimer();
    state.isRecording = false;
    state.isPaused = false;
    state.startedAt = 0;
    state.recordingCanvasStream?.getTracks().forEach((track) => track.stop());
    state.recordingCanvasStream = null;

    nodes.recordStatus.textContent = "녹화 완료";
    nodes.recordStatus.classList.remove("active");
    nodes.recordingBadge.hidden = true;

    if (state.chunks.length === 0) {
      showToast("녹화된 데이터가 없습니다.");
      syncRecorderButtons();
      return;
    }

    clearRecording(false);
    state.recordedBlob = new Blob(state.chunks, { type: state.lastMimeType });
    state.recordedUrl = URL.createObjectURL(state.recordedBlob);
    nodes.recordedVideo.src = state.recordedUrl;
    nodes.recordedVideo.hidden = false;
    nodes.recordedMeta.textContent = `${formatClock(Math.floor(state.elapsedBeforePause / 1000))} · ${formatBytes(state.recordedBlob.size)} · ${state.recordedExtension.toUpperCase()}`;
    nodes.downloadVideoBtn.disabled = false;
    nodes.clearRecordingBtn.disabled = false;
    syncRecorderButtons();
  }

  function clearRecording(resetMeta = true) {
    if (state.recordedUrl) {
      URL.revokeObjectURL(state.recordedUrl);
    }
    state.recordedBlob = null;
    state.recordedUrl = "";
    nodes.recordedVideo.removeAttribute("src");
    nodes.recordedVideo.load();
    nodes.recordedVideo.hidden = true;
    nodes.downloadVideoBtn.disabled = true;
    nodes.clearRecordingBtn.disabled = true;
    if (resetMeta) {
      nodes.recordedMeta.textContent = "녹화를 완료하면 파일 정보가 표시됩니다.";
    }
  }

  function downloadRecording() {
    if (!state.recordedBlob) {
      showToast("저장할 녹화 파일이 없습니다.");
      return;
    }
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
    downloadBlob(state.recordedBlob, `webcam-recording-${timestamp}.${state.recordedExtension}`);
  }

  function getSelectedFormat() {
    const selected = formatOptions.find((format) => format.value === nodes.recordFormat.value);
    if (selected && isRecorderMimeSupported(selected.mime)) return selected;
    return formatOptions.find((format) => format.ext === "webm") || formatOptions[0] || { mime: "", ext: "webm" };
  }

  function getVideoBitrate() {
    if (nodes.recordQuality.value === "1080") return 6000000;
    if (nodes.recordQuality.value === "480") return 1800000;
    return 3500000;
  }

  function startRecordingTimer() {
    stopRecordingTimer();
    updateRecordingMeta();
    state.timerId = window.setInterval(updateRecordingMeta, 500);
  }

  function stopRecordingTimer() {
    if (state.timerId) {
      window.clearInterval(state.timerId);
      state.timerId = null;
    }
    state.elapsedBeforePause = getRecordingElapsedMs();
    updateRecordingMeta();
  }

  function getRecordingElapsedMs() {
    if (!state.startedAt) return state.elapsedBeforePause;
    return state.elapsedBeforePause + Date.now() - state.startedAt;
  }

  function updateRecordingMeta() {
    const seconds = Math.floor(getRecordingElapsedMs() / 1000);
    const format = getSelectedFormat();
    const stateText = state.isRecording ? (state.isPaused ? "일시정지" : "녹화 중") : "녹화 전";
    nodes.recordingMeta.textContent = `${formatClock(seconds)} · ${stateText} · ${format.ext.toUpperCase()}`;
  }

  function syncRangeLabels() {
    nodes.brightnessValue.textContent = `${nodes.brightnessRange.value}%`;
    nodes.contrastValue.textContent = `${nodes.contrastRange.value}%`;
    nodes.saturationValue.textContent = `${nodes.saturationRange.value}%`;
  }

  function syncRecorderButtons() {
    const hasCamera = Boolean(state.stream);
    nodes.startCameraBtn.disabled = !mediaSupported || state.isRecording;
    nodes.startCameraBtn.textContent = hasCamera ? "카메라 다시 연결" : "카메라 연결";
    nodes.requestPermissionBtn.disabled = !mediaSupported || state.isRecording;
    nodes.requestPermissionBtn.textContent = hasCamera ? "권한 재확인" : isPermissionBlocked() ? "권한 다시 요청" : "카메라 권한 요청";
    nodes.stopCameraBtn.disabled = !hasCamera || state.isRecording;
    nodes.startRecordingBtn.disabled = !mediaSupported || !hasCamera || state.isRecording;
    nodes.pauseRecordingBtn.disabled = !state.isRecording;
    nodes.pauseRecordingBtn.textContent = state.isPaused ? "다시 시작" : "일시정지";
    nodes.stopRecordingBtn.disabled = !state.isRecording;
    nodes.cameraSelect.disabled = !hasCamera || state.isRecording || nodes.cameraSelect.options.length <= 1;
    nodes.recordQuality.disabled = state.isRecording;
    nodes.recordFormat.disabled = state.isRecording || formatOptions.length === 0;
    nodes.includeMic.disabled = state.isRecording;
    updatePermissionUi();
    updateRecordingMeta();
  }

  function stopCameraTracks() {
    state.stream?.getTracks().forEach((track) => track.stop());
    state.stream = null;
  }

  function stopAllMedia() {
    if (state.recorder && state.recorder.state !== "inactive") {
      try {
        state.recorder.stop();
      } catch (error) {
        // Page is unloading; media cleanup continues below.
      }
    }
    state.recordingCanvasStream?.getTracks().forEach((track) => track.stop());
    stopCameraTracks();
    stopPreviewLoop();
    stopRecordingTimer();
    if (state.recordedUrl) URL.revokeObjectURL(state.recordedUrl);
    if (state.backgroundImageUrl) URL.revokeObjectURL(state.backgroundImageUrl);
    state.segmenter?.close?.();
  }

  function getCameraErrorMessage(error) {
    if (error?.name === "NotAllowedError" || error?.name === "SecurityError") {
      return "카메라 또는 마이크 권한을 허용해야 녹화를 시작할 수 있습니다.";
    }
    if (error?.name === "NotFoundError") {
      return "연결된 카메라를 찾지 못했습니다.";
    }
    if (error?.name === "NotReadableError") {
      return "다른 앱이 카메라를 사용 중일 수 있습니다.";
    }
    return "카메라를 시작하지 못했습니다.";
  }

  function getRecorderFormatOptions() {
    if (!window.MediaRecorder) return [];
    const candidates = [
      { value: "webm-vp9", label: "WebM VP9 (권장)", mime: "video/webm;codecs=vp9,opus", ext: "webm" },
      { value: "webm-vp8", label: "WebM VP8", mime: "video/webm;codecs=vp8,opus", ext: "webm" },
      { value: "webm", label: "WebM 자동", mime: "video/webm", ext: "webm" },
      { value: "mp4-h264", label: "MP4 H.264 (실험적)", mime: "video/mp4;codecs=h264,aac", ext: "mp4" },
      { value: "mp4", label: "MP4 자동 (실험적)", mime: "video/mp4", ext: "mp4" },
      { value: "auto", label: "브라우저 자동", mime: "", ext: "webm" },
    ];
    return candidates.filter((format) => isRecorderMimeSupported(format.mime));
  }

  function isRecorderMimeSupported(mime) {
    return !mime || MediaRecorder.isTypeSupported(mime);
  }
}

function renderAiTextCleaner(container) {
  container.innerHTML = `
    <div class="tool-section">
      <div class="tool-grid">
        <article class="input-card">
          <div class="section-heading">
            <div>
              <h2>원문</h2>
              <p class="tool-note">AI 답변, 블로그 본문, 문서 초안을 그대로 붙여넣습니다.</p>
            </div>
          </div>
          <textarea id="sourceText" placeholder="여기에 원문을 붙여넣으세요."></textarea>
        </article>
        <aside class="action-card">
          <div class="field">
            <label for="cleanMode">정리 모드</label>
            <select id="cleanMode">
              <option value="plain">일반 텍스트</option>
              <option value="document">문서용</option>
              <option value="blog">블로그 초안</option>
              <option value="table">표 정리</option>
            </select>
          </div>
          <div class="field">
            <label for="linkMode">링크 처리</label>
            <select id="linkMode">
              <option value="text">링크 텍스트만</option>
              <option value="text-url">텍스트 - URL</option>
              <option value="url">URL만</option>
            </select>
          </div>
          <div class="check-row">
            <label class="check-item"><input id="removeHeadings" type="checkbox" checked /> 제목 기호 제거</label>
            <label class="check-item"><input id="removeEmphasis" type="checkbox" checked /> 강조 기호 제거</label>
            <label class="check-item"><input id="removeCodeFences" type="checkbox" checked /> 코드블록 기호 제거</label>
            <label class="check-item"><input id="stripHtml" type="checkbox" checked /> HTML 태그 제거</label>
            <label class="check-item"><input id="normalizeBullets" type="checkbox" checked /> 목록 정리</label>
            <label class="check-item"><input id="trimBlankLines" type="checkbox" checked /> 빈 줄 압축</label>
          </div>
          <div class="action-row">
            <button id="cleanBtn" class="primary-action" type="button">정리하기</button>
            <button id="copyBtn" type="button">결과 복사</button>
          </div>
        </aside>
      </div>
      <article class="result-card">
        <div class="section-heading">
          <div>
            <h2>정리 결과</h2>
            <p id="resultMeta" class="tool-note">0자</p>
          </div>
        </div>
        <textarea id="resultText" placeholder="정리 결과가 여기에 표시됩니다."></textarea>
      </article>
    </div>
  `;

  const sourceText = container.querySelector("#sourceText");
  const resultText = container.querySelector("#resultText");
  const resultMeta = container.querySelector("#resultMeta");
  const cleanBtn = container.querySelector("#cleanBtn");
  const copyBtn = container.querySelector("#copyBtn");

  function updateMeta() {
    resultMeta.textContent = `${resultText.value.trim().length.toLocaleString("ko-KR")}자`;
  }

  cleanBtn.addEventListener("click", () => {
    const mode = container.querySelector("#cleanMode").value;
    const options = {
      mode,
      linkMode: container.querySelector("#linkMode").value,
      removeHeadings: container.querySelector("#removeHeadings").checked,
      removeEmphasis: container.querySelector("#removeEmphasis").checked,
      removeCodeFences: container.querySelector("#removeCodeFences").checked,
      stripHtml: container.querySelector("#stripHtml").checked,
      normalizeBullets: container.querySelector("#normalizeBullets").checked,
      trimBlankLines: container.querySelector("#trimBlankLines").checked,
    };

    resultText.value = cleanAiText(sourceText.value, options);
    updateMeta();
  });

  copyBtn.addEventListener("click", async () => {
    if (!resultText.value.trim()) {
      showToast("먼저 정리 결과를 만들어 주세요.");
      return;
    }
    await safeCopy(resultText.value, "정리 결과를 복사했습니다.");
  });

  resultText.addEventListener("input", updateMeta);
  updateMeta();
}

function renderAiTableConverter(container) {
  container.innerHTML = `
    <div class="tool-section ai-table-tool">
      <div class="tool-grid">
        <article class="input-card">
          <div class="section-heading">
            <div>
              <h2>AI 답변 원문</h2>
              <p class="tool-note">표 앞뒤 설명 문구까지 그대로 붙여넣으면 표 영역만 찾아 변환합니다.</p>
            </div>
            <button id="sampleTableBtn" type="button">예시 넣기</button>
          </div>
          <textarea id="tableSource" placeholder="예: 아래는 비교표입니다.\n\n| 항목 | 장점 | 단점 |\n| --- | --- | --- |\n| A안 | 빠름 | 비용 높음 |\n| B안 | 저렴 | 시간이 걸림 |\n\n필요하면 이 표를 문서에 붙여넣어 주세요."></textarea>
        </article>
        <aside class="action-card">
          <div class="field">
            <label for="detectedTableSelect">인식한 표</label>
            <select id="detectedTableSelect" disabled>
              <option>표 만들기 전입니다</option>
            </select>
          </div>
          <div class="check-row">
            <label class="check-item"><input id="stripCellFormatting" type="checkbox" checked /> 셀 안 마크다운 서식 제거</label>
            <label class="check-item"><input id="linksAsText" type="checkbox" checked /> 링크는 텍스트만 남기기</label>
            <label class="check-item"><input id="collapseCellWhitespace" type="checkbox" checked /> 셀 안 줄바꿈·공백 정리</label>
            <label class="check-item"><input id="removeEmptyRows" type="checkbox" checked /> 빈 행 제거</label>
            <label class="check-item"><input id="removeEmptyColumns" type="checkbox" checked /> 빈 열 제거</label>
          </div>
          <div class="action-row">
            <button id="convertTableBtn" class="primary-action" type="button">표 만들기</button>
          </div>
          <p class="tool-note">입력 내용은 브라우저 안에서만 파싱합니다. 문서용 복사는 가능한 경우 HTML 표와 텍스트 표를 함께 클립보드에 넣습니다.</p>
        </aside>
      </div>

      <section class="stat-grid" id="tableStats" aria-live="polite"></section>

      <article class="result-card ai-table-preview-card">
        <div class="section-heading">
          <div>
            <h2>표 미리보기</h2>
            <p id="tableMeta" class="tool-note">아직 인식한 표가 없습니다.</p>
          </div>
          <div class="action-row ai-table-copy-actions">
            <button id="copyDocumentTableBtn" type="button">문서용 표 복사</button>
            <button id="copySpreadsheetTableBtn" type="button">엑셀용 복사</button>
            <button id="copyCsvTableBtn" type="button">CSV 복사</button>
            <button id="downloadCsvTableBtn" type="button">CSV 다운로드</button>
          </div>
        </div>
        <div id="tablePreview" class="ai-table-preview markdown-preview" aria-live="polite">
          <p class="tool-note">AI 답변을 붙여넣고 표 만들기를 누르면 미리보기가 표시됩니다.</p>
        </div>
      </article>

      <div class="tool-grid ai-table-outputs">
        <article class="result-card">
          <div class="section-heading">
            <div>
              <h2>엑셀용 TSV</h2>
              <p class="tool-note">Excel, Google Sheets에 셀 단위로 붙여넣기 좋습니다.</p>
            </div>
          </div>
          <textarea id="tsvOutput" readonly placeholder="엑셀용 복사 결과"></textarea>
        </article>
        <article class="result-card">
          <div class="section-heading">
            <div>
              <h2>CSV</h2>
              <p class="tool-note">쉼표 구분 파일이나 다른 도구로 옮길 때 사용합니다.</p>
            </div>
          </div>
          <textarea id="csvOutput" readonly placeholder="CSV 결과"></textarea>
        </article>
      </div>
    </div>
  `;

  const source = container.querySelector("#tableSource");
  const tableSelect = container.querySelector("#detectedTableSelect");
  const preview = container.querySelector("#tablePreview");
  const meta = container.querySelector("#tableMeta");
  const stats = container.querySelector("#tableStats");
  const tsvOutput = container.querySelector("#tsvOutput");
  const csvOutput = container.querySelector("#csvOutput");
  const state = {
    tables: [],
    selectedIndex: 0,
  };

  function getOptions() {
    return {
      stripCellFormatting: container.querySelector("#stripCellFormatting").checked,
      linksAsText: container.querySelector("#linksAsText").checked,
      collapseCellWhitespace: container.querySelector("#collapseCellWhitespace").checked,
      removeEmptyRows: container.querySelector("#removeEmptyRows").checked,
      removeEmptyColumns: container.querySelector("#removeEmptyColumns").checked,
    };
  }

  function runConversion() {
    const result = convertAiTableInput(source.value, getOptions());
    state.tables = result.tables;
    state.selectedIndex = 0;
    renderTableSelect();
    renderSelectedTable();
    if (!state.tables.length) {
      showToast("표 형식을 확인해 주세요.");
    }
  }

  function renderTableSelect() {
    if (!state.tables.length) {
      tableSelect.innerHTML = `<option>인식한 표 없음</option>`;
      tableSelect.disabled = true;
      return;
    }
    tableSelect.disabled = state.tables.length < 2;
    tableSelect.innerHTML = state.tables
      .map((table, index) => {
        const label = `표 ${index + 1} · ${table.rows.length.toLocaleString("ko-KR")}행 · ${table.headers.length.toLocaleString("ko-KR")}열`;
        return `<option value="${index}">${escapeHtml(label)}</option>`;
      })
      .join("");
  }

  function renderSelectedTable() {
    const table = getSelectedTable();
    if (!table) {
      preview.innerHTML = `<p class="tool-note">마크다운 표, 파이프 표, TSV, CSV 형태를 찾지 못했습니다.</p>`;
      meta.textContent = "표 없음";
      stats.innerHTML = "";
      tsvOutput.value = "";
      csvOutput.value = "";
      return;
    }

    preview.innerHTML = renderAiTablePreview(table);
    meta.textContent = `${table.sourceLabel} · ${table.rows.length.toLocaleString("ko-KR")}행 · ${table.headers.length.toLocaleString("ko-KR")}열`;
    stats.innerHTML = [
      ["인식한 표", `${state.tables.length.toLocaleString("ko-KR")}개`],
      ["현재 표", `${state.selectedIndex + 1}번째`],
      ["행", `${table.rows.length.toLocaleString("ko-KR")}개`],
      ["열", `${table.headers.length.toLocaleString("ko-KR")}개`],
    ]
      .map(
        ([label, value]) => `
          <article class="stat-card">
            <span>${label}</span>
            <strong>${value}</strong>
          </article>
        `
      )
      .join("");
    tsvOutput.value = tableToTsv(table);
    csvOutput.value = tableToCsv(table);
  }

  function getSelectedTable() {
    return state.tables[state.selectedIndex] || null;
  }

  tableSelect.addEventListener("change", () => {
    state.selectedIndex = Number(tableSelect.value) || 0;
    renderSelectedTable();
  });

  container.querySelector("#convertTableBtn").addEventListener("click", runConversion);
  container.querySelector("#sampleTableBtn").addEventListener("click", () => {
    source.value = [
      "아래는 AI가 정리한 후보 비교표입니다. 이 문장까지 함께 복사해도 표만 인식되어야 합니다.",
      "",
      "| 구분 | 추천 상황 | 주의할 점 |",
      "| --- | --- | --- |",
      "| A안 | **빠르게 시작**해야 할 때 | 비용 검토 필요 |",
      "| B안 | [문서 공유](https://example.com)가 많을 때 | 초기 정리 시간이 필요 |",
      "| C안 | 장기 운영 기준이 중요할 때 | 담당자 확인 필요 |",
      "",
      "표 아래 설명 문구가 붙어 있어도 변환 결과에는 표 데이터만 남깁니다.",
    ].join("\n");
    runConversion();
  });

  container.querySelector("#copyDocumentTableBtn").addEventListener("click", async () => {
    const table = getSelectedTable();
    if (!table) {
      showToast("먼저 표를 만들어 주세요.");
      return;
    }
    try {
      await copyTableAsDocument(table);
      showToast("문서용 표를 복사했습니다.");
    } catch (error) {
      await safeCopy(tableToTsv(table), "문서용 복사가 제한되어 엑셀용 표를 복사했습니다.");
    }
  });

  container.querySelector("#copySpreadsheetTableBtn").addEventListener("click", async () => {
    const table = getSelectedTable();
    if (!table) {
      showToast("먼저 표를 만들어 주세요.");
      return;
    }
    await safeCopy(tableToTsv(table), "엑셀용 표를 복사했습니다.");
  });

  container.querySelector("#copyCsvTableBtn").addEventListener("click", async () => {
    const table = getSelectedTable();
    if (!table) {
      showToast("먼저 표를 만들어 주세요.");
      return;
    }
    await safeCopy(tableToCsv(table), "CSV를 복사했습니다.");
  });

  container.querySelector("#downloadCsvTableBtn").addEventListener("click", () => {
    const table = getSelectedTable();
    if (!table) {
      showToast("먼저 표를 만들어 주세요.");
      return;
    }
    const csv = `\ufeff${tableToCsv(table)}`;
    downloadBlob(new Blob([csv], { type: "text/csv;charset=utf-8" }), "ai-table-converted.csv");
  });
}

const SPREADSHEET_CONVERTER_MAX_FILE_BYTES = 25 * 1024 * 1024;
const SPREADSHEET_CONVERTER_MAX_TOTAL_BYTES = 120 * 1024 * 1024;

function renderCsvExcelConverter(container) {
  container.innerHTML = `
    <div class="tool-section spreadsheet-tool">
      <article class="input-card">
        <div class="section-heading">
          <div>
            <h2>CSV·TSV·XLSX 파일</h2>
            <p class="tool-note">여러 파일을 선택하면 CSV/TSV는 XLSX로, XLSX는 CSV로 브라우저 안에서 변환합니다.</p>
          </div>
          <button id="clearSpreadsheetFilesBtn" type="button">초기화</button>
        </div>
        <div class="upload-box spreadsheet-upload-box">
          <label for="spreadsheetFiles">파일 선택 또는 끌어다 놓기</label>
          <input id="spreadsheetFiles" type="file" accept=".csv,.tsv,.xlsx,text/csv,text/tab-separated-values,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" multiple />
          <p>CSV, TSV, XLSX 파일을 여러 개 선택할 수 있습니다. 구형 XLS는 첫 버전에서 제외했습니다.</p>
        </div>
        <div id="spreadsheetFileList" class="file-list" aria-live="polite"></div>
      </article>

      <aside class="action-card">
        <div class="field-grid">
          <div class="field">
            <label for="csvInputEncoding">CSV 읽기 인코딩</label>
            <select id="csvInputEncoding">
              <option value="auto">자동 감지</option>
              <option value="utf-8">UTF-8</option>
              <option value="cp949">CP949/EUC-KR</option>
            </select>
          </div>
          <div class="field">
            <label for="csvDelimiter">CSV 구분자</label>
            <select id="csvDelimiter">
              <option value="auto">자동 감지</option>
              <option value=",">쉼표</option>
              <option value="tab">탭</option>
              <option value=";">세미콜론</option>
            </select>
          </div>
          <div class="field">
            <label for="xlsxSheetMode">XLSX 시트</label>
            <select id="xlsxSheetMode">
              <option value="first">첫 시트만 CSV</option>
              <option value="all">모든 시트를 각각 CSV</option>
            </select>
          </div>
          <div class="field">
            <label for="csvOutputEncoding">CSV 저장 방식</label>
            <select id="csvOutputEncoding">
              <option value="utf8bom">UTF-8 BOM</option>
              <option value="utf8">UTF-8</option>
            </select>
          </div>
        </div>
        <div class="check-row">
          <label class="check-item"><input id="preserveSpreadsheetText" type="checkbox" checked /> 앞자리 0·긴 숫자·날짜를 텍스트로 보존</label>
          <label class="check-item"><input id="trimSpreadsheetCells" type="checkbox" checked /> 셀 앞뒤 공백 정리</label>
          <label class="check-item"><input id="removeSpreadsheetEmptyRows" type="checkbox" checked /> 빈 행 제거</label>
        </div>
        <div class="action-row">
          <button id="convertSpreadsheetBtn" class="primary-action" type="button" disabled>변환하기</button>
          <button id="downloadZipBtn" type="button" disabled>전체 ZIP 저장</button>
        </div>
        <p id="spreadsheetStatus" class="tool-note">선택한 파일은 자체 서버로 업로드되지 않습니다. 변환 라이브러리만 필요할 때 CDN에서 불러옵니다.</p>
      </aside>

      <section class="stat-grid" id="spreadsheetStats" aria-live="polite"></section>

      <article class="result-card spreadsheet-result-card">
        <div class="section-heading">
          <div>
            <h2>변환 결과</h2>
            <p id="spreadsheetResultMeta" class="tool-note">아직 변환한 결과가 없습니다.</p>
          </div>
        </div>
        <div id="spreadsheetResultList" class="spreadsheet-result-list" aria-live="polite"></div>
      </article>

      <article class="result-card spreadsheet-preview-card">
        <div class="section-heading">
          <div>
            <h2>미리보기</h2>
            <p id="spreadsheetPreviewMeta" class="tool-note">변환 후 첫 결과의 앞부분을 보여줍니다.</p>
          </div>
        </div>
        <div id="spreadsheetPreview" class="ai-table-preview spreadsheet-preview" aria-live="polite">
          <p class="tool-note">CSV나 엑셀 파일을 선택하고 변환하면 첫 8행을 확인할 수 있습니다.</p>
        </div>
      </article>
    </div>
  `;

  const fileInput = container.querySelector("#spreadsheetFiles");
  const fileList = container.querySelector("#spreadsheetFileList");
  const convertBtn = container.querySelector("#convertSpreadsheetBtn");
  const clearBtn = container.querySelector("#clearSpreadsheetFilesBtn");
  const downloadZipBtn = container.querySelector("#downloadZipBtn");
  const status = container.querySelector("#spreadsheetStatus");
  const stats = container.querySelector("#spreadsheetStats");
  const resultList = container.querySelector("#spreadsheetResultList");
  const resultMeta = container.querySelector("#spreadsheetResultMeta");
  const preview = container.querySelector("#spreadsheetPreview");
  const previewMeta = container.querySelector("#spreadsheetPreviewMeta");

  const state = {
    files: [],
    results: [],
    busy: false,
  };

  function getOptions() {
    return {
      inputEncoding: container.querySelector("#csvInputEncoding").value,
      delimiter: container.querySelector("#csvDelimiter").value,
      sheetMode: container.querySelector("#xlsxSheetMode").value,
      outputEncoding: container.querySelector("#csvOutputEncoding").value,
      preserveText: container.querySelector("#preserveSpreadsheetText").checked,
      trimCells: container.querySelector("#trimSpreadsheetCells").checked,
      removeEmptyRows: container.querySelector("#removeSpreadsheetEmptyRows").checked,
    };
  }

  fileInput.addEventListener("change", () => {
    state.files = Array.from(fileInput.files || []);
    state.results = [];
    renderSpreadsheetFileList();
    renderSpreadsheetResults();
    syncSpreadsheetActions();
  });

  clearBtn.addEventListener("click", () => {
    fileInput.value = "";
    state.files = [];
    state.results = [];
    renderSpreadsheetFileList();
    renderSpreadsheetResults();
    syncSpreadsheetActions();
    status.textContent = "파일 선택을 초기화했습니다.";
  });

  convertBtn.addEventListener("click", runSpreadsheetConversion);
  downloadZipBtn.addEventListener("click", downloadSpreadsheetResultsAsZip);
  resultList.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-result-index]");
    if (!button) return;
    const result = state.results[Number(button.dataset.resultIndex)];
    if (!result?.blob) return;
    downloadBlob(result.blob, result.outputName);
  });

  renderSpreadsheetFileList();
  renderSpreadsheetResults();
  syncSpreadsheetActions();

  async function runSpreadsheetConversion() {
    if (state.busy || !state.files.length) return;

    const totalBytes = state.files.reduce((sum, file) => sum + file.size, 0);
    if (totalBytes > SPREADSHEET_CONVERTER_MAX_TOTAL_BYTES) {
      showToast(`전체 파일 크기는 ${formatBytes(SPREADSHEET_CONVERTER_MAX_TOTAL_BYTES)} 이하부터 권장합니다.`);
      return;
    }

    state.busy = true;
    state.results = [];
    syncSpreadsheetActions();
    renderSpreadsheetResults();
    status.textContent = "변환 라이브러리를 불러오는 중입니다.";

    try {
      const XLSX = await loadLibrary("xlsx");
      const options = getOptions();
      for (const file of state.files) {
        const fileResults = await convertSpreadsheetFile(file, options, XLSX);
        state.results.push(...fileResults);
        renderSpreadsheetResults();
      }
      status.textContent = state.results.length
        ? `${state.results.length.toLocaleString("ko-KR")}개 결과를 만들었습니다.`
        : "변환 가능한 결과가 없습니다.";
      if (!state.results.length) showToast("변환 가능한 CSV, TSV, XLSX 파일을 선택해 주세요.");
    } catch (error) {
      status.textContent = formatUserNotice("스프레드시트 변환에 실패했습니다. 파일 형식이나 브라우저 메모리 상태를 확인해 주세요.");
      trackToolError(TOOL_MAP["csv-excel-converter"], error, "convert_spreadsheet");
      showToast("스프레드시트 변환에 실패했습니다.");
    } finally {
      state.busy = false;
      syncSpreadsheetActions();
      renderSpreadsheetResults();
    }
  }

  function renderSpreadsheetFileList() {
    if (!state.files.length) {
      fileList.innerHTML = `<p class="tool-note">선택한 파일이 없습니다.</p>`;
      return;
    }

    fileList.innerHTML = state.files
      .map((file, index) => {
        const kind = getSpreadsheetFileKind(file);
        const label = kind ? kind.label : "지원 제외";
        return `
          <div class="file-item">
            <span>${index + 1}. ${escapeHtml(file.name)}</span>
            <span>${escapeHtml(label)} · ${formatBytes(file.size)}</span>
          </div>
        `;
      })
      .join("");
  }

  function renderSpreadsheetResults() {
    resultMeta.textContent = state.results.length
      ? `${state.results.length.toLocaleString("ko-KR")}개 결과가 준비되었습니다.`
      : "아직 변환한 결과가 없습니다.";
    downloadZipBtn.disabled = state.busy || state.results.length === 0;

    stats.innerHTML = [
      ["선택 파일", `${state.files.length.toLocaleString("ko-KR")}개`],
      ["결과 파일", `${state.results.length.toLocaleString("ko-KR")}개`],
      ["전체 크기", formatBytes(state.files.reduce((sum, file) => sum + file.size, 0))],
      ["처리 방식", "브라우저"],
    ]
      .map(
        ([label, value]) => `
          <article class="stat-card">
            <span>${label}</span>
            <strong>${value}</strong>
          </article>
        `
      )
      .join("");

    if (!state.results.length) {
      resultList.innerHTML = `<p class="tool-note">변환 결과가 여기에 표시됩니다.</p>`;
      preview.innerHTML = `<p class="tool-note">CSV나 엑셀 파일을 선택하고 변환하면 첫 8행을 확인할 수 있습니다.</p>`;
      previewMeta.textContent = "변환 후 첫 결과의 앞부분을 보여줍니다.";
      return;
    }

    resultList.innerHTML = state.results
      .map(
        (result, index) => `
          <div class="spreadsheet-result-item">
            <div>
              <strong>${escapeHtml(result.outputName)}</strong>
              <p class="tool-note">${escapeHtml(result.inputName)} · ${escapeHtml(result.detail)} · ${formatBytes(result.blob.size)}</p>
              ${result.warning ? `<p class="tool-note warning-note">${escapeHtml(result.warning)}</p>` : ""}
            </div>
            <button type="button" data-result-index="${index}">다운로드</button>
          </div>
        `
      )
      .join("");

    const first = state.results[0];
    preview.innerHTML = renderSpreadsheetPreview(first.previewRows);
    previewMeta.textContent = `${first.outputName} · 앞부분 미리보기`;
  }

  function syncSpreadsheetActions() {
    convertBtn.disabled = state.busy || !state.files.length;
    clearBtn.disabled = state.busy || !state.files.length;
    downloadZipBtn.disabled = state.busy || !state.results.length;
  }

  async function downloadSpreadsheetResultsAsZip() {
    if (!state.results.length) {
      showToast("저장할 변환 결과가 없습니다.");
      return;
    }
    if (state.results.length === 1) {
      downloadBlob(state.results[0].blob, state.results[0].outputName);
      return;
    }

    try {
      status.textContent = "ZIP 파일을 만드는 중입니다.";
      const JSZip = await loadLibrary("jszip");
      const zip = new JSZip();
      const usedNames = new Set();
      state.results.forEach((result) => {
        zip.file(makeUniqueOutputName(result.outputName, usedNames), result.blob);
      });
      const blob = await zip.generateAsync({ type: "blob" });
      downloadBlob(blob, "csv-excel-converted.zip");
      status.textContent = "전체 결과 ZIP 파일을 만들었습니다.";
    } catch (error) {
      status.textContent = formatUserNotice("ZIP 파일 생성에 실패했습니다. 결과를 개별 다운로드해 주세요.");
      trackToolError(TOOL_MAP["csv-excel-converter"], error, "download_zip");
      showToast("ZIP 파일 생성에 실패했습니다.");
    }
  }
}

function renderCharacterCounter(container) {
  container.innerHTML = `
    <div class="tool-section">
      <article class="input-card">
        <div class="section-heading">
          <div>
            <h2>텍스트 입력</h2>
            <p class="tool-note">입력 즉시 글자수, 단어 수, 바이트 수, 예상 읽기 시간이 계산됩니다.</p>
          </div>
          <button id="copyBtn" type="button">텍스트 복사</button>
        </div>
        <textarea id="counterInput" placeholder="글자수를 확인할 텍스트를 붙여넣으세요."></textarea>
      </article>
      <section class="stat-grid" id="counterStats"></section>
    </div>
  `;

  const input = container.querySelector("#counterInput");
  const stats = container.querySelector("#counterStats");

  async function copyTextValue() {
    if (!input.value.trim()) {
      showToast("복사할 텍스트가 없습니다.");
      return;
    }
    await safeCopy(input.value, "입력 텍스트를 복사했습니다.");
  }

  container.querySelector("#copyBtn").addEventListener("click", copyTextValue);
  input.addEventListener("input", update);
  update();

  function update() {
    const values = countTextStats(input.value);
    const items = [
      ["공백 포함", `${values.characters.toLocaleString("ko-KR")}자`],
      ["공백 제외", `${values.charactersNoSpace.toLocaleString("ko-KR")}자`],
      ["단어 수", `${values.words.toLocaleString("ko-KR")}개`],
      ["줄 수", `${values.lines.toLocaleString("ko-KR")}줄`],
      ["문단 수", `${values.paragraphs.toLocaleString("ko-KR")}개`],
      ["바이트", `${values.bytes.toLocaleString("ko-KR")}B`],
      ["예상 읽기 시간", values.readTime],
      ["예상 말하기 시간", values.speechTime],
      ["문장 수", `${values.sentences.toLocaleString("ko-KR")}개`],
    ];

    stats.innerHTML = items
      .map(
        ([label, value]) => `
          <article class="stat-card">
            <span>${label}</span>
            <strong>${value}</strong>
          </article>
        `
      )
      .join("");
  }
}

function renderLineBreakCleaner(container) {
  container.innerHTML = `
    <div class="tool-section">
      <div class="tool-grid">
        <article class="input-card">
          <div class="section-heading">
            <div>
              <h2>원문</h2>
              <p class="tool-note">줄이 강제로 끊긴 텍스트를 붙여넣습니다.</p>
            </div>
          </div>
          <textarea id="sourceText" placeholder="여기에 정리할 텍스트를 붙여넣으세요."></textarea>
        </article>
        <aside class="action-card">
          <div class="check-row">
            <label class="check-item"><input id="joinLines" type="checkbox" checked /> 문장 줄바꿈 합치기</label>
            <label class="check-item"><input id="trimLines" type="checkbox" checked /> 줄 앞뒤 공백 제거</label>
            <label class="check-item"><input id="collapseBlank" type="checkbox" checked /> 빈 줄 2개로 정리</label>
            <label class="check-item"><input id="collapseSpaces" type="checkbox" checked /> 과한 공백 압축</label>
            <label class="check-item"><input id="sentenceBreak" type="checkbox" /> 마침표 기준 줄바꿈</label>
          </div>
          <div class="action-row">
            <button id="cleanBtn" class="primary-action" type="button">정리하기</button>
            <button id="copyBtn" type="button">결과 복사</button>
          </div>
        </aside>
      </div>
      <article class="result-card">
        <div class="section-heading">
          <div>
            <h2>정리 결과</h2>
            <p id="resultMeta" class="tool-note">0자</p>
          </div>
        </div>
        <textarea id="resultText" placeholder="정리 결과가 여기에 표시됩니다."></textarea>
      </article>
    </div>
  `;

  const source = container.querySelector("#sourceText");
  const output = container.querySelector("#resultText");
  const meta = container.querySelector("#resultMeta");

  function updateMeta() {
    meta.textContent = `${output.value.trim().length.toLocaleString("ko-KR")}자`;
  }

  container.querySelector("#cleanBtn").addEventListener("click", () => {
    output.value = cleanLineBreaks(source.value, {
      joinLines: container.querySelector("#joinLines").checked,
      trimLines: container.querySelector("#trimLines").checked,
      collapseBlank: container.querySelector("#collapseBlank").checked,
      collapseSpaces: container.querySelector("#collapseSpaces").checked,
      sentenceBreak: container.querySelector("#sentenceBreak").checked,
    });
    updateMeta();
  });

  container.querySelector("#copyBtn").addEventListener("click", async () => {
    if (!output.value.trim()) {
      showToast("먼저 정리 결과를 만들어 주세요.");
      return;
    }
    await safeCopy(output.value, "정리 결과를 복사했습니다.");
  });

  output.addEventListener("input", updateMeta);
  updateMeta();
}

function renderTextExtractor(container) {
  container.innerHTML = `
    <div class="tool-section">
      <article class="input-card">
        <div class="section-heading">
          <div>
            <h2>원문 입력</h2>
            <p class="tool-note">이메일, URL, 전화번호가 섞인 텍스트를 그대로 붙여넣습니다.</p>
          </div>
          <button id="extractBtn" class="primary-action" type="button">추출하기</button>
        </div>
        <textarea id="sourceText" placeholder="여기에 긴 문서나 공지문을 붙여넣으세요."></textarea>
      </article>
      <div class="tool-grid">
        <article class="result-card">
          <div class="section-heading">
            <div><h2>이메일</h2><p id="emailMeta" class="tool-note">0개</p></div>
            <button class="copy-block" data-target="emails">복사</button>
          </div>
          <textarea id="emails" placeholder="이메일 추출 결과"></textarea>
        </article>
        <article class="result-card">
          <div class="section-heading">
            <div><h2>URL</h2><p id="urlMeta" class="tool-note">0개</p></div>
            <button class="copy-block" data-target="urls">복사</button>
          </div>
          <textarea id="urls" placeholder="URL 추출 결과"></textarea>
        </article>
      </div>
      <article class="result-card">
        <div class="section-heading">
          <div><h2>전화번호</h2><p id="phoneMeta" class="tool-note">0개</p></div>
          <button class="copy-block" data-target="phones">복사</button>
        </div>
        <textarea id="phones" placeholder="전화번호 추출 결과"></textarea>
      </article>
    </div>
  `;

  const source = container.querySelector("#sourceText");
  const outputs = {
    emails: container.querySelector("#emails"),
    urls: container.querySelector("#urls"),
    phones: container.querySelector("#phones"),
  };

  container.querySelector("#extractBtn").addEventListener("click", run);
  container.querySelectorAll(".copy-block").forEach((button) => {
    button.addEventListener("click", async () => {
      const target = outputs[button.dataset.target];
      if (!target.value.trim()) {
        showToast("복사할 결과가 없습니다.");
        return;
      }
      await safeCopy(target.value, "추출 결과를 복사했습니다.");
    });
  });

  function run() {
    const extracted = extractContacts(source.value);
    outputs.emails.value = extracted.emails.join("\n");
    outputs.urls.value = extracted.urls.join("\n");
    outputs.phones.value = extracted.phones.join("\n");
    container.querySelector("#emailMeta").textContent = `${extracted.emails.length}개`;
    container.querySelector("#urlMeta").textContent = `${extracted.urls.length}개`;
    container.querySelector("#phoneMeta").textContent = `${extracted.phones.length}개`;
  }
}

function renderDuplicateLineRemover(container) {
  container.innerHTML = `
    <div class="tool-section">
      <div class="tool-grid">
        <article class="input-card">
          <div class="section-heading">
            <div>
              <h2>원본 목록</h2>
              <p class="tool-note">한 줄에 하나씩 정리된 목록을 붙여넣습니다.</p>
            </div>
          </div>
          <textarea id="sourceText" placeholder="중복 줄이 포함된 목록을 입력하세요."></textarea>
        </article>
        <aside class="action-card">
          <div class="check-row">
            <label class="check-item"><input id="trimLines" type="checkbox" checked /> 줄 앞뒤 공백 제거</label>
            <label class="check-item"><input id="caseSensitive" type="checkbox" /> 대소문자 구분</label>
            <label class="check-item"><input id="ignoreEmpty" type="checkbox" checked /> 빈 줄 제외</label>
            <label class="check-item"><input id="sortLines" type="checkbox" /> 가나다/알파벳 정렬</label>
          </div>
          <div class="action-row">
            <button id="runBtn" class="primary-action" type="button">중복 제거</button>
            <button id="copyBtn" type="button">결과 복사</button>
          </div>
          <p id="summary" class="tool-note">0줄 입력</p>
        </aside>
      </div>
      <article class="result-card">
        <div class="section-heading">
          <div><h2>정리 결과</h2></div>
        </div>
        <textarea id="resultText" placeholder="중복 제거 결과"></textarea>
      </article>
    </div>
  `;

  const source = container.querySelector("#sourceText");
  const result = container.querySelector("#resultText");
  const summary = container.querySelector("#summary");

  container.querySelector("#runBtn").addEventListener("click", () => {
    const cleaned = removeDuplicateLines(source.value, {
      trimLines: container.querySelector("#trimLines").checked,
      caseSensitive: container.querySelector("#caseSensitive").checked,
      ignoreEmpty: container.querySelector("#ignoreEmpty").checked,
      sortLines: container.querySelector("#sortLines").checked,
    });
    result.value = cleaned.lines.join("\n");
    summary.textContent = `${cleaned.originalCount}줄 중 ${cleaned.removedCount}줄 제거 · ${cleaned.lines.length}줄 유지`;
  });

  container.querySelector("#copyBtn").addEventListener("click", async () => {
    if (!result.value.trim()) {
      showToast("먼저 결과를 만들어 주세요.");
      return;
    }
    await safeCopy(result.value, "정리 결과를 복사했습니다.");
  });
}

function renderFindReplaceTool(container) {
  container.innerHTML = `
    <div class="tool-section">
      <article class="input-card">
        <div class="section-heading">
          <div>
            <h2>원문</h2>
            <p class="tool-note">치환할 본문을 붙여넣고 바꿀 규칙을 설정합니다.</p>
          </div>
        </div>
        <textarea id="sourceText" placeholder="수정할 텍스트를 입력하세요."></textarea>
      </article>
      <div class="tool-grid">
        <aside class="action-card">
          <div class="field-row">
            <div class="field">
              <label for="findText">찾을 값</label>
              <input id="findText" type="text" placeholder="예: 구버전 문구" />
            </div>
            <div class="field">
              <label for="replaceText">바꿀 값</label>
              <input id="replaceText" type="text" placeholder="예: 새 문구" />
            </div>
          </div>
          <div class="check-row">
            <label class="check-item"><input id="caseSensitive" type="checkbox" /> 대소문자 구분</label>
            <label class="check-item"><input id="wholeWord" type="checkbox" /> 영문 단어 단위</label>
            <label class="check-item"><input id="useRegex" type="checkbox" /> 정규식 사용</label>
          </div>
          <div class="action-row">
            <button id="runBtn" class="primary-action" type="button">찾기 및 바꾸기</button>
            <button id="copyBtn" type="button">결과 복사</button>
          </div>
          <p id="summary" class="tool-note">치환 전입니다.</p>
        </aside>
        <article class="result-card">
          <div class="section-heading">
            <div><h2>결과</h2></div>
          </div>
          <textarea id="resultText" placeholder="치환 결과"></textarea>
        </article>
      </div>
    </div>
  `;

  const source = container.querySelector("#sourceText");
  const result = container.querySelector("#resultText");
  const summary = container.querySelector("#summary");

  container.querySelector("#runBtn").addEventListener("click", () => {
    const findValue = container.querySelector("#findText").value;
    if (!findValue) {
      showToast("찾을 값을 입력해 주세요.");
      return;
    }

    const replaceValue = container.querySelector("#replaceText").value;
    const output = replaceInText(source.value, findValue, replaceValue, {
      caseSensitive: container.querySelector("#caseSensitive").checked,
      wholeWord: container.querySelector("#wholeWord").checked,
      useRegex: container.querySelector("#useRegex").checked,
    });
    result.value = output.text;
    summary.textContent = `${output.count}개 항목이 변경되었습니다.`;
  });

  container.querySelector("#copyBtn").addEventListener("click", async () => {
    if (!result.value.trim()) {
      showToast("먼저 치환 결과를 만들어 주세요.");
      return;
    }
    await safeCopy(result.value, "치환 결과를 복사했습니다.");
  });
}

function renderCaseConverter(container) {
  container.innerHTML = `
    <div class="tool-section">
      <div class="tool-grid">
        <article class="input-card">
          <div class="section-heading">
            <div>
              <h2>원문</h2>
              <p class="tool-note">영문 텍스트, 태그, 파일명, 라벨을 입력합니다.</p>
            </div>
          </div>
          <textarea id="sourceText" placeholder="예: user profile summary"></textarea>
        </article>
        <aside class="action-card">
          <div class="action-row">
            <button class="mode-btn" data-mode="lower">lower case</button>
            <button class="mode-btn" data-mode="upper">UPPER CASE</button>
            <button class="mode-btn" data-mode="title">Title Case</button>
            <button class="mode-btn" data-mode="sentence">Sentence case</button>
            <button class="mode-btn" data-mode="camel">camelCase</button>
            <button class="mode-btn" data-mode="pascal">PascalCase</button>
            <button class="mode-btn" data-mode="snake">snake_case</button>
            <button class="mode-btn" data-mode="kebab">kebab-case</button>
          </div>
          <button id="copyBtn" type="button">결과 복사</button>
        </aside>
      </div>
      <article class="result-card">
        <div class="section-heading">
          <div><h2>변환 결과</h2><p id="modeLabel" class="tool-note">모드를 선택하세요.</p></div>
        </div>
        <textarea id="resultText" placeholder="선택한 케이스 형식 결과"></textarea>
      </article>
    </div>
  `;

  const source = container.querySelector("#sourceText");
  const result = container.querySelector("#resultText");
  const modeLabel = container.querySelector("#modeLabel");

  container.querySelectorAll(".mode-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const mode = button.dataset.mode;
      result.value = convertCase(source.value, mode);
      modeLabel.textContent = `${button.textContent.trim()} 모드 결과`;
    });
  });

  container.querySelector("#copyBtn").addEventListener("click", async () => {
    if (!result.value.trim()) {
      showToast("먼저 변환 결과를 만들어 주세요.");
      return;
    }
    await safeCopy(result.value, "변환 결과를 복사했습니다.");
  });
}

function renderTextDiffTool(container) {
  container.innerHTML = `
    <div class="tool-section">
      <div class="split-editors">
        <article class="input-card">
          <div class="section-heading">
            <div><h2>이전 버전</h2></div>
          </div>
          <textarea id="leftText" placeholder="비교할 첫 번째 텍스트"></textarea>
        </article>
        <article class="input-card">
          <div class="section-heading">
            <div><h2>새 버전</h2></div>
          </div>
          <textarea id="rightText" placeholder="비교할 두 번째 텍스트"></textarea>
        </article>
      </div>
      <div class="action-card">
        <div class="action-row">
          <button id="runBtn" class="primary-action" type="button">비교하기</button>
        </div>
        <p id="summary" class="tool-note">줄 단위로 차이를 보여줍니다.</p>
      </div>
      <div class="diff-grid">
        <article class="diff-pane">
          <h2>이전 버전 보기</h2>
          <div id="leftDiff" class="diff-output"></div>
        </article>
        <article class="diff-pane">
          <h2>새 버전 보기</h2>
          <div id="rightDiff" class="diff-output"></div>
        </article>
      </div>
    </div>
  `;

  const leftText = container.querySelector("#leftText");
  const rightText = container.querySelector("#rightText");
  const summary = container.querySelector("#summary");
  const leftDiff = container.querySelector("#leftDiff");
  const rightDiff = container.querySelector("#rightDiff");

  container.querySelector("#runBtn").addEventListener("click", () => {
    const diff = diffLines(leftText.value, rightText.value);
    leftDiff.innerHTML = diff.leftHtml;
    rightDiff.innerHTML = diff.rightHtml;
    summary.textContent = `유지 ${diff.kept}줄 · 삭제 ${diff.removed}줄 · 추가 ${diff.added}줄`;
  });
}

function renderQrGenerator(container) {
  container.innerHTML = `
    <div class="tool-section">
      <div class="tool-grid">
        <aside class="action-card">
          <div class="field">
            <label for="qrMode">형식</label>
            <select id="qrMode">
              <option value="text">텍스트</option>
              <option value="url">URL</option>
              <option value="wifi">Wi-Fi</option>
            </select>
          </div>
          <div id="qrFields" class="stack"></div>
          <div class="field">
            <label for="qrFileName">저장 파일명</label>
            <input id="qrFileName" type="text" placeholder="qr-code" />
          </div>
          <div class="field-row">
            <div class="field">
              <label for="qrSize">크기</label>
              <input id="qrSize" type="number" min="160" max="1024" step="10" value="320" />
            </div>
            <div class="field">
              <label for="qrShape">모양</label>
              <select id="qrShape">
                <option value="rounded" selected>둥근 모듈</option>
                <option value="square">기본 사각형</option>
                <option value="dots">점형 모듈</option>
              </select>
            </div>
          </div>
          <div class="qr-options-grid">
            <div class="field qr-color-field">
              <label for="qrForeground">색상</label>
              <input id="qrForeground" type="color" value="#111827" />
            </div>
            <div class="field qr-color-field">
              <label for="qrBackground">배경</label>
              <input id="qrBackground" type="color" value="#ffffff" />
            </div>
            <div class="field">
              <label for="downloadFormat">저장 형식</label>
              <select id="downloadFormat">
                <option value="svg" selected>SVG</option>
                <option value="png">PNG</option>
                <option value="jpg">JPG</option>
              </select>
            </div>
          </div>
          <div class="action-row">
            <button id="makeBtn" class="primary-action" type="button">QR 만들기</button>
            <button id="downloadBtn" type="button">파일 저장</button>
          </div>
          <p id="status" class="tool-note">색 대비와 여백을 유지해 QR 인식률을 우선합니다.</p>
        </aside>
        <article class="preview-card">
          <div class="section-heading">
            <div><h2>미리보기</h2></div>
          </div>
          <div id="qrPreview" class="qr-frame qr-designer-frame">QR 생성 전입니다.</div>
        </article>
      </div>
    </div>
  `;

  const fields = container.querySelector("#qrFields");
  const preview = container.querySelector("#qrPreview");
  const status = container.querySelector("#status");
  const state = {
    background: "#ffffff",
    foreground: "#111827",
    size: 320,
    svg: "",
  };

  function renderFields() {
    const mode = container.querySelector("#qrMode").value;
    if (mode === "wifi") {
      fields.innerHTML = `
        <div class="field"><label for="wifiSsid">Wi-Fi 이름</label><input id="wifiSsid" type="text" /></div>
        <div class="field"><label for="wifiPassword">비밀번호</label><input id="wifiPassword" type="text" /></div>
        <div class="field">
          <label for="wifiType">보안 방식</label>
          <select id="wifiType">
            <option value="WPA">WPA/WPA2</option>
            <option value="WEP">WEP</option>
            <option value="nopass">비밀번호 없음</option>
          </select>
        </div>
      `;
      return;
    }

    fields.innerHTML = `
      <div class="field">
        <label for="qrText">${mode === "url" ? "URL" : "내용"}</label>
        <textarea id="qrText" placeholder="${mode === "url" ? "https://example.com" : "QR에 넣을 텍스트"}"></textarea>
      </div>
    `;
  }

  container.querySelector("#qrMode").addEventListener("change", renderFields);
  renderFields();

  container.querySelector("#makeBtn").addEventListener("click", async () => {
    try {
      status.textContent = "QR 라이브러리를 준비 중입니다.";
      await loadLibrary("qrcode");
      const mode = container.querySelector("#qrMode").value;
      const size = clampNumber(Number(container.querySelector("#qrSize").value || 320), 160, 1024);
      const shape = container.querySelector("#qrShape").value;
      const foregroundInput = container.querySelector("#qrForeground");
      const backgroundInput = container.querySelector("#qrBackground");
      let foreground = normalizeHexColor(foregroundInput.value, "#111827");
      let background = normalizeHexColor(backgroundInput.value, "#ffffff");
      const payload = buildQrPayload(container, mode);
      if (!payload) {
        showToast("QR에 넣을 내용을 입력해 주세요.");
        return;
      }

      if (!isStableQrColorPair(foreground, background)) {
        foreground = "#111827";
        background = "#ffffff";
        foregroundInput.value = foreground;
        backgroundInput.value = background;
        showToast("인식 안정성을 위해 어두운 색상과 밝은 배경으로 조정했습니다.");
      }

      const qr = qrcode(0, "H");
      qr.addData(payload);
      qr.make();
      state.size = size;
      state.foreground = foreground;
      state.background = background;
      state.svg = createStyledQrSvg(qr, { foreground, background, shape });
      preview.innerHTML = `<div class="qr-preview-shell" style="width:${size}px">${state.svg}</div>`;
      status.textContent = "QR 생성이 완료되었습니다. SVG, PNG, JPG로 저장할 수 있습니다.";
    } catch (error) {
      status.textContent = "QR을 생성하지 못했습니다. 내용이 너무 길면 짧게 줄여 주세요.";
      showToast("QR을 생성하지 못했습니다. 내용을 줄이거나 잠시 후 다시 시도해 주세요.");
    }
  });

  container.querySelector("#downloadBtn").addEventListener("click", async () => {
    if (!state.svg) {
      showToast("먼저 QR 코드를 만들어 주세요.");
      return;
    }

    const requestedName = container.querySelector("#qrFileName").value || "qr-code";
    const format = container.querySelector("#downloadFormat").value;
    const filename = buildQrDownloadName(requestedName, format);

    try {
      if (format === "svg") {
        const blob = new Blob([state.svg], { type: "image/svg+xml;charset=utf-8" });
        downloadBlob(blob, filename);
        return;
      }

      const mimeType = format === "jpg" ? "image/jpeg" : "image/png";
      const blob = await svgToImageBlob(state.svg, state.size, mimeType, state.background);
      downloadBlob(blob, filename);
    } catch (error) {
      showToast("QR 파일을 저장하지 못했습니다. 다시 시도해 주세요.");
    }
  });
}

function renderQrLinkExtractor(container) {
  container.innerHTML = `
    <div class="tool-section qr-reader-tool">
      <div class="tool-grid">
        <aside class="action-card">
          <div class="field">
            <label for="qrPasteBox">스크린샷 붙여넣기</label>
            <textarea
              id="qrPasteBox"
              class="qr-paste-box"
              rows="5"
              placeholder="Win+Shift+S로 QR 영역을 캡처한 뒤 여기에 Ctrl+V"
              autocomplete="off"
              spellcheck="false"
            ></textarea>
          </div>
          <div id="qrDropZone" class="upload-box qr-reader-drop" tabindex="0">
            <label for="qrImageFile">파일로 선택</label>
            <input id="qrImageFile" type="file" accept="image/*" />
            <p>저장된 QR 이미지나 스크린샷 파일을 선택하거나 이 영역에 끌어다 놓습니다.</p>
          </div>
          <div class="action-row">
            <button id="readQrBtn" class="primary-action" type="button">QR 읽기</button>
            <button id="clearQrBtn" type="button">초기화</button>
          </div>
          <p id="status" class="tool-note">위 붙여넣기 칸에 스크린샷 이미지를 붙여넣으면 브라우저 안에서만 QR 내용을 읽습니다.</p>
        </aside>
        <article class="preview-card">
          <div class="section-heading">
            <div><h2>이미지 미리보기</h2></div>
          </div>
          <div class="canvas-frame qr-reader-frame"><canvas id="qrPreviewCanvas"></canvas></div>
        </article>
      </div>
      <article class="result-card">
        <div class="section-heading">
          <div>
            <h2>추출 결과</h2>
            <p id="resultMeta" class="tool-note">아직 읽은 QR이 없습니다.</p>
          </div>
        </div>
        <div id="linkBox" class="qr-result-link">URL이 감지되면 여기에 표시됩니다.</div>
        <textarea id="resultText" readonly placeholder="QR 원문이 여기에 표시됩니다."></textarea>
        <div class="action-row">
          <button id="copyResultBtn" class="primary-action" type="button">결과 복사</button>
          <button id="openLinkBtn" type="button" disabled>링크 열기</button>
        </div>
        <p class="tool-note">안전을 위해 QR 링크는 자동으로 열지 않습니다. 주소를 확인한 뒤 직접 열어 주세요.</p>
      </article>
    </div>
  `;

  const state = {
    file: null,
    image: null,
    resultText: "",
    safeUrl: "",
  };
  const fileInput = container.querySelector("#qrImageFile");
  const pasteBox = container.querySelector("#qrPasteBox");
  const dropZone = container.querySelector("#qrDropZone");
  const canvas = container.querySelector("#qrPreviewCanvas");
  const status = container.querySelector("#status");
  const resultMeta = container.querySelector("#resultMeta");
  const resultText = container.querySelector("#resultText");
  const linkBox = container.querySelector("#linkBox");
  const openLinkBtn = container.querySelector("#openLinkBtn");

  fileInput.addEventListener("change", async () => {
    const file = fileInput.files[0];
    if (file) await loadQrImage(file);
  });

  dropZone.addEventListener("dragover", (event) => {
    event.preventDefault();
    dropZone.classList.add("is-dragging");
  });

  dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("is-dragging");
  });

  dropZone.addEventListener("drop", async (event) => {
    event.preventDefault();
    dropZone.classList.remove("is-dragging");
    const file = Array.from(event.dataTransfer.files).find((item) => item.type.startsWith("image/"));
    if (!file) {
      showToast("QR 이미지 파일을 넣어 주세요.");
      return;
    }
    await loadQrImage(file);
  });

  pasteBox.addEventListener("paste", handleQrPaste);
  pasteBox.addEventListener("input", () => {
    pasteBox.value = "";
  });
  document.addEventListener("paste", handleQrPaste);
  window.setTimeout(() => pasteBox.focus({ preventScroll: true }), 0);

  container.querySelector("#readQrBtn").addEventListener("click", async () => {
    if (!state.image) {
      showToast("먼저 QR 이미지 파일을 선택해 주세요.");
      return;
    }
    await decodeCurrentQr();
  });

  container.querySelector("#clearQrBtn").addEventListener("click", () => {
    state.file = null;
    state.image = null;
    state.resultText = "";
    state.safeUrl = "";
    fileInput.value = "";
    canvas.width = 0;
    canvas.height = 0;
    resultText.value = "";
    pasteBox.value = "";
    pasteBox.focus({ preventScroll: true });
    resultMeta.textContent = "아직 읽은 QR이 없습니다.";
    linkBox.textContent = "URL이 감지되면 여기에 표시됩니다.";
    openLinkBtn.disabled = true;
    status.textContent = "위 붙여넣기 칸에 스크린샷 이미지를 붙여넣으면 브라우저 안에서만 QR 내용을 읽습니다.";
  });

  container.querySelector("#copyResultBtn").addEventListener("click", async () => {
    if (!resultText.value.trim()) {
      showToast("복사할 QR 결과가 없습니다.");
      return;
    }
    await safeCopy(resultText.value, "QR 결과를 복사했습니다.");
  });

  openLinkBtn.addEventListener("click", () => {
    if (!state.safeUrl) return;
    window.open(state.safeUrl, "_blank", "noopener,noreferrer");
  });

  async function loadQrImage(file) {
    if (!file.type.startsWith("image/")) {
      showToast("이미지 파일만 읽을 수 있습니다.");
      return;
    }

    try {
      status.textContent = "이미지를 불러오는 중입니다.";
      const loaded = await loadImageFromFile(file);
      state.file = file;
      state.image = loaded.image;
      drawImageToCanvas(canvas, loaded.image, loaded.image.naturalWidth, loaded.image.naturalHeight);
      status.textContent = `${file.name} · ${loaded.image.naturalWidth} x ${loaded.image.naturalHeight} · ${formatBytes(file.size)}`;
      await decodeCurrentQr();
    } catch (error) {
      status.textContent = "이미지를 불러오지 못했습니다. 다른 캡처 이미지로 다시 시도해 주세요.";
      showToast("QR 이미지를 읽지 못했습니다.");
    }
  }

  async function handleQrPaste(event) {
    if (!container.isConnected || getActiveTool()?.id !== "qr-link-extractor") {
      document.removeEventListener("paste", handleQrPaste);
      return;
    }

    const file = getClipboardImageFile(event.clipboardData);
    if (!file) {
      if (event.currentTarget === pasteBox) {
        event.preventDefault();
        pasteBox.value = "";
        status.textContent = "클립보드에 이미지가 없습니다. Win+Shift+S로 QR 영역을 캡처한 뒤 다시 붙여넣어 주세요.";
        showToast("클립보드에 이미지가 없습니다.");
      }
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    pasteBox.value = "";
    await loadQrImage(file);
  }

  async function decodeCurrentQr() {
    try {
      status.textContent = "QR 판독 라이브러리를 준비 중입니다.";
      await loadLibrary("jsqr");
      const decodeCanvas = document.createElement("canvas");
      const maxSide = 1600;
      const scale = Math.min(1, maxSide / Math.max(state.image.naturalWidth, state.image.naturalHeight));
      const width = Math.max(1, Math.round(state.image.naturalWidth * scale));
      const height = Math.max(1, Math.round(state.image.naturalHeight * scale));
      drawImageToCanvas(decodeCanvas, state.image, width, height, "#ffffff");
      const context = decodeCanvas.getContext("2d", { willReadFrequently: true });
      const imageData = context.getImageData(0, 0, width, height);
      const code = jsQR(imageData.data, width, height, { inversionAttempts: "attemptBoth" });

      if (!code?.data) {
        state.resultText = "";
        state.safeUrl = "";
        resultText.value = "";
        linkBox.textContent = "QR 코드를 찾지 못했습니다.";
        resultMeta.textContent = "QR 없음";
        openLinkBtn.disabled = true;
        status.textContent = "QR을 찾지 못했습니다. QR이 더 크게 보이는 이미지나 선명한 캡처로 다시 시도해 주세요.";
        return;
      }

      const result = analyzeQrContent(code.data);
      state.resultText = code.data;
      state.safeUrl = result.safeUrl;
      resultText.value = code.data;
      linkBox.textContent = result.safeUrl || result.label;
      resultMeta.textContent = `${result.type} · ${code.data.length}자`;
      openLinkBtn.disabled = !result.safeUrl;
      status.textContent = result.safeUrl
        ? "QR에서 URL을 찾았습니다. 주소를 확인한 뒤 열거나 복사하세요."
        : "QR 원문을 추출했습니다. URL이 아니므로 원문 내용을 확인해 주세요.";
    } catch (error) {
      state.safeUrl = "";
      openLinkBtn.disabled = true;
      status.textContent = "QR 판독 중 오류가 발생했습니다. 다른 이미지로 다시 시도해 주세요.";
      showToast("QR을 읽지 못했습니다.");
    }
  }
}

function renderScreenshotSaver(container) {
  container.innerHTML = `
    <div class="tool-section screenshot-saver-tool">
      <div class="tool-grid">
        <aside class="action-card">
          <div class="field">
            <label for="screenshotPasteBox">스크린샷 붙여넣기</label>
            <textarea
              id="screenshotPasteBox"
              class="qr-paste-box"
              rows="5"
              placeholder="Win+Shift+S로 영역 캡처 후 이 칸에 Ctrl+V"
              autocomplete="off"
              spellcheck="false"
            ></textarea>
          </div>
          <div class="upload-box">
            <label for="screenshotFile">파일로 선택</label>
            <input id="screenshotFile" type="file" accept="image/*" />
            <p>저장된 스크린샷 파일을 선택하거나 이 영역에 끌어다 놓습니다.</p>
          </div>
          <div class="field-row">
            <div class="field">
              <label for="screenshotFormat">출력 형식</label>
              <select id="screenshotFormat">
                <option value="image/png">PNG</option>
                <option value="image/jpeg">JPG</option>
                <option value="image/webp">WEBP</option>
              </select>
            </div>
            <div class="field">
              <label for="screenshotQuality">품질</label>
              <input id="screenshotQuality" type="range" min="0.5" max="1" step="0.05" value="0.92" />
            </div>
          </div>
          <div class="field">
            <label for="screenshotNamePrefix">파일명 접두어</label>
            <input id="screenshotNamePrefix" type="text" value="screenshot" autocomplete="off" />
          </div>
          <div class="field">
            <label>저장 위치</label>
            <div class="action-row">
              <button id="chooseScreenshotFolderBtn" type="button">저장 위치 설정</button>
              <button id="clearScreenshotFolderBtn" type="button" disabled>저장 위치 해제</button>
            </div>
            <p id="screenshotFolderStatus" class="tool-note">저장 위치를 설정하면 이후 붙여넣기 이미지를 같은 폴더에 자동 저장합니다.</p>
          </div>
          <label class="check-item"><input id="screenshotAutoSave" type="checkbox" checked /> 붙여넣으면 즉시 저장</label>
          <div class="action-row">
            <button id="saveScreenshotBtn" class="primary-action" type="button" disabled>다시 저장</button>
            <button id="clearScreenshotBtn" type="button">붙여넣은 이미지 지우기</button>
          </div>
          <p id="status" class="tool-note">Win+Shift+S로 캡처한 뒤 Ctrl+V를 누르면 PNG로 바로 저장합니다.</p>
          <p class="tool-note">클립보드 이미지는 서버로 업로드하지 않고 브라우저 안에서만 처리합니다.</p>
        </aside>
        <article class="preview-card">
          <div class="section-heading">
            <div>
              <h2>스크린샷 미리보기</h2>
              <p id="screenshotMeta" class="tool-note">아직 붙여넣은 스크린샷이 없습니다.</p>
            </div>
          </div>
          <div class="canvas-frame"><canvas id="screenshotCanvas"></canvas></div>
        </article>
      </div>
    </div>
  `;

  const state = {
    file: null,
    image: null,
    blob: null,
    filename: "",
    width: 0,
    height: 0,
    directoryHandle: null,
  };
  const screenshotDirectoryDbName = "koWorkspaceScreenshotSaver";
  const screenshotDirectoryStoreName = "directoryHandles";
  const screenshotDirectoryKey = "saveDirectory";
  const supportsDirectorySave = typeof window.showDirectoryPicker === "function" && "indexedDB" in window;
  const pasteBox = container.querySelector("#screenshotPasteBox");
  const fileInput = container.querySelector("#screenshotFile");
  const formatSelect = container.querySelector("#screenshotFormat");
  const qualityInput = container.querySelector("#screenshotQuality");
  const prefixInput = container.querySelector("#screenshotNamePrefix");
  const autoSaveInput = container.querySelector("#screenshotAutoSave");
  const chooseFolderBtn = container.querySelector("#chooseScreenshotFolderBtn");
  const clearFolderBtn = container.querySelector("#clearScreenshotFolderBtn");
  const folderStatus = container.querySelector("#screenshotFolderStatus");
  const saveBtn = container.querySelector("#saveScreenshotBtn");
  const clearBtn = container.querySelector("#clearScreenshotBtn");
  const status = container.querySelector("#status");
  const meta = container.querySelector("#screenshotMeta");
  const canvas = container.querySelector("#screenshotCanvas");

  initScreenshotFolder();

  fileInput.addEventListener("change", async () => {
    const file = fileInput.files[0];
    if (file) await loadScreenshotSource(file, { source: "file", autoSave: false });
  });

  pasteBox.addEventListener("paste", handleScreenshotPaste);
  pasteBox.addEventListener("input", () => {
    pasteBox.value = "";
  });
  document.addEventListener("paste", handleScreenshotPaste);
  window.setTimeout(() => pasteBox.focus({ preventScroll: true }), 0);

  saveBtn.addEventListener("click", async () => {
    await saveCurrentScreenshot(false);
  });

  chooseFolderBtn.addEventListener("click", async () => {
    if (!supportsDirectorySave) {
      showToast("이 브라우저는 저장 위치 고정을 지원하지 않습니다.");
      return;
    }

    try {
      const handle = await window.showDirectoryPicker({ id: "ko-workspace-screenshot-saver", mode: "readwrite" });
      const allowed = await ensureScreenshotDirectoryPermission(handle, true);
      if (!allowed) {
        folderStatus.textContent = "저장 위치 권한이 필요합니다. 저장 위치 설정을 다시 눌러 허용해 주세요.";
        showToast("저장 위치 권한이 필요합니다.");
        return;
      }

      state.directoryHandle = handle;
      await storeScreenshotDirectoryHandle(handle);
      await updateScreenshotFolderStatus();
      status.textContent = `저장 위치 설정 완료: ${handle.name}`;
      showToast("저장 위치를 설정했습니다.");
      pasteBox.focus({ preventScroll: true });
    } catch (error) {
      if (error?.name !== "AbortError") {
        folderStatus.textContent = "저장 위치를 설정하지 못했습니다. 브라우저 권한을 확인해 주세요.";
        showToast("저장 위치를 설정하지 못했습니다.");
      }
    }
  });

  clearFolderBtn.addEventListener("click", async () => {
    state.directoryHandle = null;
    try {
      await clearStoredScreenshotDirectoryHandle();
    } catch (error) {
      // The in-memory handle is already cleared; keep the UI usable if IndexedDB cleanup fails.
    }
    await updateScreenshotFolderStatus();
    status.textContent = "저장 위치를 해제했습니다. 이후 저장은 브라우저 다운로드로 처리됩니다.";
    showToast("저장 위치를 해제했습니다.");
    pasteBox.focus({ preventScroll: true });
  });

  clearBtn.addEventListener("click", () => {
    state.file = null;
    state.image = null;
    state.blob = null;
    state.filename = "";
    state.width = 0;
    state.height = 0;
    fileInput.value = "";
    pasteBox.value = "";
    canvas.width = 0;
    canvas.height = 0;
    saveBtn.disabled = true;
    meta.textContent = "아직 붙여넣은 스크린샷이 없습니다.";
    status.textContent = "Win+Shift+S로 캡처한 뒤 Ctrl+V를 누르면 PNG로 바로 저장합니다.";
    pasteBox.focus({ preventScroll: true });
  });

  async function handleScreenshotPaste(event) {
    if (!container.isConnected || getActiveTool()?.id !== "screenshot-saver") {
      document.removeEventListener("paste", handleScreenshotPaste);
      return;
    }

    const file = getClipboardImageFile(event.clipboardData);
    if (!file) {
      if (event.currentTarget === pasteBox) {
        event.preventDefault();
        pasteBox.value = "";
        status.textContent = "클립보드에 이미지가 없습니다. Win+Shift+S로 영역을 캡처한 뒤 다시 붙여넣어 주세요.";
        showToast("클립보드에 이미지가 없습니다.");
      }
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    pasteBox.value = "";
    await loadScreenshotSource(file, { source: "paste", autoSave: autoSaveInput.checked });
  }

  async function loadScreenshotSource(file, options) {
    if (!file.type.startsWith("image/")) {
      showToast("이미지 파일만 사용할 수 있습니다.");
      return;
    }

    const output = getScreenshotOutput();
    const directPngSave = options.source === "paste" && options.autoSave && output.mime === "image/png" && file.type === "image/png";
    state.file = file;
    state.blob = null;
    state.filename = "";
    saveBtn.disabled = true;
    status.textContent = options.source === "paste" ? "붙여넣은 이미지를 처리하는 중입니다." : "스샷을 불러오는 중입니다.";

    if (directPngSave) {
      state.blob = file;
      state.filename = buildScreenshotFileName(output.ext);
      await saveScreenshotBlob(file, state.filename, true);
    }

    try {
      const loaded = await loadImageFromFile(file);
      state.image = loaded.image;
      state.width = loaded.image.naturalWidth;
      state.height = loaded.image.naturalHeight;
      drawImageToCanvas(canvas, loaded.image, state.width, state.height);
      meta.textContent = `붙여넣은 이미지 ${state.width} x ${state.height} · ${formatBytes(file.size)}`;
      saveBtn.disabled = false;

      if (options.autoSave && !directPngSave) {
        await saveCurrentScreenshot(true);
      } else if (!directPngSave) {
        status.textContent = `붙여넣은 이미지 ${state.width} x ${state.height} · 다시 저장을 누르면 파일로 저장합니다.`;
      }
    } catch (error) {
      if (directPngSave) {
        meta.textContent = "미리보기를 표시하지 못했지만 원본 PNG 저장은 시도했습니다.";
        saveBtn.disabled = false;
        return;
      }
      state.image = null;
      state.width = 0;
      state.height = 0;
      canvas.width = 0;
      canvas.height = 0;
      status.textContent = "클립보드 이미지를 불러오지 못했습니다. 다시 캡처해 붙여넣어 주세요.";
      showToast("스샷을 불러오지 못했습니다.");
    }
  }

  async function saveCurrentScreenshot(isAutomatic) {
    const output = getScreenshotOutput();
    const filename = buildScreenshotFileName(output.ext);

    try {
      if (!state.image && state.blob) {
        state.filename = filename;
        await saveScreenshotBlob(state.blob, filename, isAutomatic);
        return;
      }

      if (!state.image) {
        showToast("저장할 스크린샷이 없습니다.");
        return;
      }

      const background = output.mime === "image/jpeg" ? "#ffffff" : null;
      drawImageToCanvas(canvas, state.image, state.width, state.height, background);
      const blob =
        output.mime === "image/png" && state.file?.type === "image/png"
          ? state.file
          : await canvasToBlob(canvas, output.mime, output.quality);
      state.blob = blob;
      state.filename = filename;
      await saveScreenshotBlob(blob, filename, isAutomatic);
    } catch (error) {
      status.textContent = "스샷 저장을 완료하지 못했습니다.";
      showToast("스샷 저장을 완료하지 못했습니다.");
    }
  }

  async function initScreenshotFolder() {
    if (!supportsDirectorySave) {
      chooseFolderBtn.disabled = true;
      clearFolderBtn.disabled = true;
      folderStatus.textContent = "이 브라우저는 저장 위치 고정을 지원하지 않아 기본 다운로드로 저장합니다.";
      return;
    }

    try {
      state.directoryHandle = await readStoredScreenshotDirectoryHandle();
      await updateScreenshotFolderStatus();
    } catch (error) {
      state.directoryHandle = null;
      folderStatus.textContent = "저장 위치 정보를 불러오지 못했습니다. 필요하면 다시 설정해 주세요.";
      clearFolderBtn.disabled = true;
    }
  }

  async function updateScreenshotFolderStatus() {
    if (!supportsDirectorySave) {
      chooseFolderBtn.disabled = true;
      clearFolderBtn.disabled = true;
      folderStatus.textContent = "이 브라우저는 저장 위치 고정을 지원하지 않아 기본 다운로드로 저장합니다.";
      return;
    }

    chooseFolderBtn.textContent = state.directoryHandle ? "저장 위치 바꾸기" : "저장 위치 설정";
    clearFolderBtn.disabled = !state.directoryHandle;

    if (!state.directoryHandle) {
      folderStatus.textContent = "저장 위치를 설정하면 이후 붙여넣기 이미지를 같은 폴더에 자동 저장합니다.";
      return;
    }

    const allowed = await ensureScreenshotDirectoryPermission(state.directoryHandle, false);
    folderStatus.textContent = allowed
      ? `현재 저장 위치: ${state.directoryHandle.name}`
      : `저장 위치 권한 확인 필요: ${state.directoryHandle.name} · 저장 위치 바꾸기를 눌러 다시 허용해 주세요.`;
  }

  async function saveScreenshotBlob(blob, filename, isAutomatic) {
    if (state.directoryHandle) {
      const allowed = await ensureScreenshotDirectoryPermission(state.directoryHandle, !isAutomatic);
      if (allowed) {
        try {
          const fileHandle = await state.directoryHandle.getFileHandle(filename, { create: true });
          const writable = await fileHandle.createWritable();
          await writable.write(blob);
          await writable.close();
          state.filename = filename;
          const message = `저장 완료: ${state.directoryHandle.name}\\${filename}`;
          status.textContent = message;
          showToast(message);
          await updateScreenshotFolderStatus();
          return;
        } catch (error) {
          folderStatus.textContent = "지정 폴더에 저장하지 못해 브라우저 다운로드로 저장했습니다.";
        }
      } else {
        folderStatus.textContent = "저장 위치 권한이 필요합니다. 저장 위치 바꾸기를 눌러 다시 허용해 주세요.";
      }
    }

    downloadBlob(blob, filename);
    state.filename = filename;
    status.textContent = state.directoryHandle
      ? "지정 폴더 권한을 사용할 수 없어 브라우저 다운로드로 저장했습니다."
      : isAutomatic
        ? "자동 저장을 시도했습니다. 저장 위치를 설정하면 지정 폴더에 바로 저장됩니다."
        : "스샷을 저장했습니다.";
    showToast("스샷을 저장했습니다.");
  }

  async function ensureScreenshotDirectoryPermission(handle, shouldPrompt) {
    if (!handle || typeof handle.queryPermission !== "function") return false;
    const current = await handle.queryPermission({ mode: "readwrite" });
    if (current === "granted") return true;
    if (!shouldPrompt || typeof handle.requestPermission !== "function") return false;
    const next = await handle.requestPermission({ mode: "readwrite" });
    return next === "granted";
  }

  function openScreenshotDirectoryDb() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(screenshotDirectoryDbName, 1);
      request.onupgradeneeded = () => {
        request.result.createObjectStore(screenshotDirectoryStoreName);
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async function storeScreenshotDirectoryHandle(handle) {
    const db = await openScreenshotDirectoryDb();
    return runScreenshotDirectoryTransaction(db, "readwrite", (store) => store.put(handle, screenshotDirectoryKey));
  }

  async function readStoredScreenshotDirectoryHandle() {
    const db = await openScreenshotDirectoryDb();
    return runScreenshotDirectoryTransaction(db, "readonly", (store) => store.get(screenshotDirectoryKey));
  }

  async function clearStoredScreenshotDirectoryHandle() {
    const db = await openScreenshotDirectoryDb();
    return runScreenshotDirectoryTransaction(db, "readwrite", (store) => store.delete(screenshotDirectoryKey));
  }

  function runScreenshotDirectoryTransaction(db, mode, action) {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(screenshotDirectoryStoreName, mode);
      const request = action(transaction.objectStore(screenshotDirectoryStoreName));
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
      transaction.oncomplete = () => db.close();
      transaction.onabort = () => {
        db.close();
        reject(transaction.error);
      };
    });
  }

  function getScreenshotOutput() {
    const mime = formatSelect.value || "image/png";
    return {
      mime,
      ext: getExtensionForMime(mime),
      quality: Number(qualityInput.value || 0.92),
    };
  }

  function buildScreenshotFileName(ext) {
    const prefix = sanitizeFilename(prefixInput.value || "screenshot")
      .replace(/\.(png|jpe?g|webp)$/i, "")
      .trim() || "screenshot";
    const timestamp = new Date().toISOString().slice(0, 19).replace(/[-:T]/g, "");
    return `${prefix}-${timestamp}.${ext}`;
  }
}

function buildQrDownloadName(name, format) {
  const base = sanitizeFilename(name || "qr-code").replace(/\.(svg|png|jpe?g)$/i, "") || "qr-code";
  return `${base}.${format}`;
}

function createStyledQrSvg(qr, options) {
  const moduleCount = qr.getModuleCount();
  const margin = 4;
  const viewSize = moduleCount + margin * 2;
  const foreground = options.foreground;
  const background = options.background;
  const shape = options.shape || "rounded";
  const parts = [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${viewSize} ${viewSize}" role="img" aria-label="QR code">`,
    `<rect width="${viewSize}" height="${viewSize}" rx="1.2" fill="${background}"/>`,
    `<g fill="${foreground}" shape-rendering="${shape === "square" ? "crispEdges" : "geometricPrecision"}">`,
  ];

  for (let row = 0; row < moduleCount; row += 1) {
    for (let col = 0; col < moduleCount; col += 1) {
      if (!qr.isDark(row, col) || isFinderArea(row, col, moduleCount)) continue;
      parts.push(renderQrModule(col + margin, row + margin, shape));
    }
  }

  parts.push("</g>");
  parts.push(renderQrFinder(margin, margin, foreground, background));
  parts.push(renderQrFinder(moduleCount - 7 + margin, margin, foreground, background));
  parts.push(renderQrFinder(margin, moduleCount - 7 + margin, foreground, background));
  parts.push("</svg>");
  return parts.join("");
}

function renderQrModule(x, y, shape) {
  if (shape === "dots") {
    return `<circle cx="${x + 0.5}" cy="${y + 0.5}" r="0.42"/>`;
  }

  if (shape === "square") {
    return `<rect x="${x}" y="${y}" width="1" height="1"/>`;
  }

  return `<rect x="${x + 0.04}" y="${y + 0.04}" width="0.92" height="0.92" rx="0.2"/>`;
}

function renderQrFinder(x, y, foreground, background) {
  return [
    `<g shape-rendering="crispEdges">`,
    `<rect x="${x}" y="${y}" width="7" height="7" fill="${foreground}"/>`,
    `<rect x="${x + 1}" y="${y + 1}" width="5" height="5" fill="${background}"/>`,
    `<rect x="${x + 2}" y="${y + 2}" width="3" height="3" fill="${foreground}"/>`,
    `</g>`,
  ].join("");
}

function isFinderArea(row, col, moduleCount) {
  const inTop = row < 7;
  const inLeft = col < 7;
  const inRight = col >= moduleCount - 7;
  const inBottom = row >= moduleCount - 7;
  return (inTop && inLeft) || (inTop && inRight) || (inBottom && inLeft);
}

function normalizeHexColor(value, fallback) {
  const color = String(value || "").trim();
  return /^#[0-9a-f]{6}$/i.test(color) ? color.toLowerCase() : fallback;
}

function isStableQrColorPair(foreground, background) {
  const foregroundRgb = hexToRgb(foreground);
  const backgroundRgb = hexToRgb(background);
  if (!foregroundRgb || !backgroundRgb) return false;
  const foregroundLuminance = relativeLuminance(foregroundRgb);
  const backgroundLuminance = relativeLuminance(backgroundRgb);
  const lighter = Math.max(foregroundLuminance, backgroundLuminance);
  const darker = Math.min(foregroundLuminance, backgroundLuminance);
  const contrastRatio = (lighter + 0.05) / (darker + 0.05);
  return foregroundLuminance < backgroundLuminance && contrastRatio >= 4.5;
}

function hexToRgb(color) {
  const match = /^#([0-9a-f]{6})$/i.exec(color);
  if (!match) return null;
  const value = Number.parseInt(match[1], 16);
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

function relativeLuminance(rgb) {
  const channels = [rgb.r, rgb.g, rgb.b].map((channel) => {
    const value = channel / 255;
    return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}

function svgToImageBlob(svg, size, mimeType, background) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const svgBlob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const objectUrl = URL.createObjectURL(svgBlob);

    image.onload = async () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const context = canvas.getContext("2d");
        context.fillStyle = background;
        context.fillRect(0, 0, size, size);
        context.drawImage(image, 0, 0, size, size);
        URL.revokeObjectURL(objectUrl);
        resolve(await canvasToBlob(canvas, mimeType, mimeType === "image/jpeg" ? 0.92 : 1));
      } catch (error) {
        URL.revokeObjectURL(objectUrl);
        reject(error);
      }
    };

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("QR image export failed"));
    };

    image.src = objectUrl;
  });
}

function renderImageResizer(container) {
  container.innerHTML = `
    <div class="tool-section">
      <div class="tool-grid">
        <aside class="action-card">
          <div class="upload-box">
            <label for="imageFile">이미지 업로드</label>
            <input id="imageFile" type="file" accept="image/*" />
            <p>JPG, PNG, WEBP 이미지를 선택하거나 이 영역에 끌어다 놓으세요.</p>
          </div>
          <div class="field-row">
            <div class="field"><label for="resizeWidth">가로</label><input id="resizeWidth" type="number" min="1" /></div>
            <div class="field"><label for="resizeHeight">세로</label><input id="resizeHeight" type="number" min="1" /></div>
          </div>
          <label class="check-item"><input id="keepRatio" type="checkbox" checked /> 원본 비율 유지</label>
          <div class="action-row">
            <button id="applyBtn" class="primary-action" type="button">크기 적용</button>
            <button id="downloadBtn" type="button">이미지 저장</button>
          </div>
          <p id="status" class="tool-note">이미지를 선택하면 원본 크기를 불러옵니다.</p>
        </aside>
        <article class="preview-card">
          <div class="section-heading">
            <div><h2>미리보기</h2></div>
          </div>
          <div class="canvas-frame"><canvas id="previewCanvas"></canvas></div>
        </article>
      </div>
    </div>
  `;

  const state = { file: null, image: null, canvas: container.querySelector("#previewCanvas") };
  const fileInput = container.querySelector("#imageFile");
  const widthInput = container.querySelector("#resizeWidth");
  const heightInput = container.querySelector("#resizeHeight");
  const keepRatio = container.querySelector("#keepRatio");
  const status = container.querySelector("#status");

  fileInput.addEventListener("change", async () => {
    const file = fileInput.files[0];
    if (!file) return;
    const loaded = await loadImageFromFile(file);
    state.file = file;
    state.image = loaded.image;
    widthInput.value = loaded.image.naturalWidth;
    heightInput.value = loaded.image.naturalHeight;
    drawImageToCanvas(state.canvas, loaded.image, loaded.image.naturalWidth, loaded.image.naturalHeight);
    status.textContent = `원본 ${loaded.image.naturalWidth} x ${loaded.image.naturalHeight} · ${formatBytes(file.size)}`;
  });

  widthInput.addEventListener("input", () => syncImageDimensions("width"));
  heightInput.addEventListener("input", () => syncImageDimensions("height"));

  container.querySelector("#applyBtn").addEventListener("click", () => {
    if (!state.image) {
      showToast("먼저 이미지를 선택해 주세요.");
      return;
    }
    const width = clampNumber(Number(widthInput.value || state.image.naturalWidth), 1, 10000);
    const height = clampNumber(Number(heightInput.value || state.image.naturalHeight), 1, 10000);
    drawImageToCanvas(state.canvas, state.image, width, height);
    status.textContent = `출력 ${width} x ${height}`;
  });

  container.querySelector("#downloadBtn").addEventListener("click", async () => {
    if (!state.image) {
      showToast("먼저 이미지를 선택해 주세요.");
      return;
    }
    const blob = await canvasToBlob(state.canvas, state.file.type || "image/png", 0.92);
    downloadBlob(blob, buildImageName(state.file.name, "resized"));
  });

  function syncImageDimensions(changed) {
    if (!keepRatio.checked || !state.image) return;
    const ratio = state.image.naturalWidth / state.image.naturalHeight;
    if (changed === "width") {
      const width = clampNumber(Number(widthInput.value || state.image.naturalWidth), 1, 10000);
      heightInput.value = Math.round(width / ratio);
    } else {
      const height = clampNumber(Number(heightInput.value || state.image.naturalHeight), 1, 10000);
      widthInput.value = Math.round(height * ratio);
    }
  }
}

function renderImageConverter(container) {
  container.innerHTML = `
    <div class="tool-section">
      <div class="tool-grid">
        <aside class="action-card">
          <div class="upload-box">
            <label for="imageFile">이미지 업로드</label>
            <input id="imageFile" type="file" accept="image/*" />
            <p>원본 이미지를 선택하거나 이 영역에 끌어다 놓은 뒤 변환 형식을 고릅니다.</p>
          </div>
          <div class="field-row">
            <div class="field">
              <label for="targetType">변환 형식</label>
              <select id="targetType">
                <option value="image/jpeg">JPG</option>
                <option value="image/png">PNG</option>
                <option value="image/webp">WEBP</option>
              </select>
            </div>
            <div class="field">
              <label for="quality">품질</label>
              <input id="quality" type="range" min="0.4" max="1" step="0.05" value="0.9" />
            </div>
          </div>
          <div class="action-row">
            <button id="convertBtn" class="primary-action" type="button">변환하기</button>
            <button id="downloadBtn" type="button">이미지 저장</button>
          </div>
          <p id="status" class="tool-note">변환 전입니다.</p>
        </aside>
        <article class="preview-card">
          <div class="section-heading">
            <div><h2>미리보기</h2></div>
          </div>
          <div class="canvas-frame"><canvas id="previewCanvas"></canvas></div>
        </article>
      </div>
    </div>
  `;

  const state = { file: null, image: null, canvas: container.querySelector("#previewCanvas") };
  const fileInput = container.querySelector("#imageFile");
  const status = container.querySelector("#status");

  fileInput.addEventListener("change", async () => {
    const file = fileInput.files[0];
    if (!file) return;
    const loaded = await loadImageFromFile(file);
    state.file = file;
    state.image = loaded.image;
    drawImageToCanvas(state.canvas, loaded.image, loaded.image.naturalWidth, loaded.image.naturalHeight);
    status.textContent = `원본 ${formatBytes(file.size)} · ${loaded.image.naturalWidth} x ${loaded.image.naturalHeight}`;
  });

  container.querySelector("#convertBtn").addEventListener("click", () => {
    if (!state.image) {
      showToast("먼저 이미지를 선택해 주세요.");
      return;
    }
    const targetType = container.querySelector("#targetType").value;
    drawImageToCanvas(
      state.canvas,
      state.image,
      state.image.naturalWidth,
      state.image.naturalHeight,
      targetType === "image/jpeg" ? "#ffffff" : null
    );
    status.textContent = "변환 미리보기를 준비했습니다.";
  });

  container.querySelector("#downloadBtn").addEventListener("click", async () => {
    if (!state.image) {
      showToast("먼저 이미지를 선택해 주세요.");
      return;
    }

    const targetType = container.querySelector("#targetType").value;
    const quality = Number(container.querySelector("#quality").value || 0.9);
    drawImageToCanvas(
      state.canvas,
      state.image,
      state.image.naturalWidth,
      state.image.naturalHeight,
      targetType === "image/jpeg" ? "#ffffff" : null
    );
    const blob = await canvasToBlob(state.canvas, targetType, quality);
    downloadBlob(blob, buildImageName(state.file.name, "converted", getExtensionForMime(targetType)));
  });
}

function renderImageCompressor(container) {
  container.innerHTML = `
    <div class="tool-section">
      <div class="tool-grid">
        <aside class="action-card">
          <div class="upload-box">
            <label for="imageFile">이미지 업로드</label>
            <input id="imageFile" type="file" accept="image/*" />
            <p>업로드용으로 줄일 이미지를 선택하거나 이 영역에 끌어다 놓으세요.</p>
          </div>
          <div class="field-row">
            <div class="field"><label for="quality">품질</label><input id="quality" type="range" min="0.3" max="1" step="0.05" value="0.75" /></div>
            <div class="field"><label for="maxWidth">최대 너비</label><input id="maxWidth" type="number" min="200" step="10" placeholder="원본 유지" /></div>
          </div>
          <div class="field">
            <label for="targetType">출력 형식</label>
            <select id="targetType">
              <option value="image/jpeg">JPG</option>
              <option value="image/webp">WEBP</option>
              <option value="image/png">PNG</option>
            </select>
          </div>
          <div class="action-row">
            <button id="compressBtn" class="primary-action" type="button">압축하기</button>
            <button id="downloadBtn" type="button">이미지 저장</button>
          </div>
          <p id="status" class="tool-note">압축 전입니다.</p>
        </aside>
        <article class="preview-card">
          <div class="section-heading">
            <div><h2>압축 결과</h2></div>
          </div>
          <div class="canvas-frame"><canvas id="previewCanvas"></canvas></div>
        </article>
      </div>
    </div>
  `;

  const state = { file: null, image: null, canvas: container.querySelector("#previewCanvas"), blob: null };
  const fileInput = container.querySelector("#imageFile");
  const status = container.querySelector("#status");

  fileInput.addEventListener("change", async () => {
    const file = fileInput.files[0];
    if (!file) return;
    const loaded = await loadImageFromFile(file);
    state.file = file;
    state.image = loaded.image;
    drawImageToCanvas(state.canvas, loaded.image, loaded.image.naturalWidth, loaded.image.naturalHeight);
    status.textContent = `원본 ${formatBytes(file.size)} · ${loaded.image.naturalWidth} x ${loaded.image.naturalHeight}`;
  });

  container.querySelector("#compressBtn").addEventListener("click", async () => {
    if (!state.image) {
      showToast("먼저 이미지를 선택해 주세요.");
      return;
    }

    const quality = Number(container.querySelector("#quality").value || 0.75);
    const maxWidth = Number(container.querySelector("#maxWidth").value || state.image.naturalWidth);
    const targetType = container.querySelector("#targetType").value;
    const width = Math.min(state.image.naturalWidth, maxWidth || state.image.naturalWidth);
    const height = Math.round((state.image.naturalHeight * width) / state.image.naturalWidth);
    drawImageToCanvas(
      state.canvas,
      state.image,
      width,
      height,
      targetType === "image/jpeg" ? "#ffffff" : null
    );
    state.blob = await canvasToBlob(state.canvas, targetType, quality);
    status.textContent = `원본 ${formatBytes(state.file.size)} → 결과 ${formatBytes(state.blob.size)} · ${width} x ${height}`;
  });

  container.querySelector("#downloadBtn").addEventListener("click", () => {
    if (!state.blob) {
      showToast("먼저 압축 결과를 만들어 주세요.");
      return;
    }
    const ext = getExtensionForMime(container.querySelector("#targetType").value);
    downloadBlob(state.blob, buildImageName(state.file.name, "compressed", ext));
  });
}

function renderExifMetadataRemover(container) {
  container.innerHTML = `
    <div class="tool-section">
      <div class="tool-grid">
        <aside class="action-card">
          <div class="upload-box">
            <label for="exifImageFile">사진 파일 선택</label>
            <input id="exifImageFile" type="file" accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp" />
            <p>JPG, PNG, WEBP 이미지를 선택하거나 이 영역에 끌어다 놓으세요.</p>
          </div>
          <div id="metadataList" class="file-list"></div>
          <div class="action-row">
            <button id="cleanBtn" class="primary-action" type="button" disabled>메타데이터 제거</button>
            <button id="downloadBtn" type="button" disabled>정리된 이미지 저장</button>
          </div>
          <p id="status" class="tool-note">사진을 선택하면 감지 가능한 메타데이터 항목을 확인합니다.</p>
          <p class="tool-note">이미지 내용은 서버로 전송되지 않습니다. 결과는 브라우저 안에서 만들어집니다.</p>
        </aside>
        <article class="preview-card">
          <div class="section-heading">
            <div>
              <h2>미리보기</h2>
              <p class="tool-note">현재 브라우저가 표시할 수 있는 이미지 기준으로 보여줍니다.</p>
            </div>
          </div>
          <div class="canvas-frame"><canvas id="previewCanvas"></canvas></div>
        </article>
      </div>
    </div>
  `;

  const state = {
    file: null,
    bytes: null,
    kind: null,
    cleanedBlob: null,
    cleanedName: "",
    canvas: container.querySelector("#previewCanvas"),
  };
  const fileInput = container.querySelector("#exifImageFile");
  const metadataList = container.querySelector("#metadataList");
  const status = container.querySelector("#status");
  const cleanBtn = container.querySelector("#cleanBtn");
  const downloadBtn = container.querySelector("#downloadBtn");

  fileInput.addEventListener("change", async () => {
    const file = fileInput.files[0];
    if (!file) return;
    await loadExifSource(file);
  });

  cleanBtn.addEventListener("click", () => {
    if (!state.file || !state.bytes || !state.kind) {
      showToast("먼저 JPG, PNG, WEBP 이미지를 선택해 주세요.");
      return;
    }

    try {
      const result = removeImageMetadata(state.bytes, state.kind);
      state.cleanedBlob = new Blob([result.bytes], { type: state.kind.mime });
      state.cleanedName = buildImageName(state.file.name, "metadata-cleaned", state.kind.ext);
      downloadBtn.disabled = false;
      renderMetadataList(metadataList, result.removedLabels, result.bytes.length, state.file.size, true);
      status.textContent = result.removedLabels.length
        ? `정리 완료 · ${describeMetadataLabels(result.removedLabels)} 제거 · ${formatBytes(state.file.size)} → ${formatBytes(result.bytes.length)}`
        : `정리 완료 · 감지된 메타데이터는 없었습니다. ${formatBytes(result.bytes.length)}`;
    } catch (error) {
      status.textContent = "메타데이터 제거 중 오류가 발생했습니다.";
      showToast("메타데이터 제거를 완료하지 못했습니다. 다른 이미지 파일로 다시 시도해 주세요.");
      trackToolError(getActiveTool(), error, "remove_metadata");
    }
  });

  downloadBtn.addEventListener("click", () => {
    if (!state.cleanedBlob) {
      showToast("먼저 메타데이터 제거를 실행해 주세요.");
      return;
    }
    downloadBlob(state.cleanedBlob, state.cleanedName);
  });

  async function loadExifSource(file) {
    const bytes = new Uint8Array(await file.arrayBuffer());
    const kind = detectMetadataImageKind(file, bytes);
    if (!kind) {
      resetExifState();
      showToast("현재는 JPG, PNG, WEBP 이미지 파일만 지원합니다.");
      return;
    }

    state.file = file;
    state.bytes = bytes;
    state.kind = kind;
    state.cleanedBlob = null;
    state.cleanedName = "";
    cleanBtn.disabled = false;
    downloadBtn.disabled = true;

    const labels = inspectImageMetadata(bytes, kind);
    renderMetadataList(metadataList, labels, bytes.length, file.size, false);
    status.textContent = labels.length
      ? `${file.name} · ${describeMetadataLabels(labels)} 감지 · ${formatBytes(file.size)}`
      : `${file.name} · 감지된 개인정보성 메타데이터가 없습니다. ${formatBytes(file.size)}`;

    try {
      const loaded = await loadImageFromFile(file);
      const width = loaded.image.naturalWidth;
      const height = loaded.image.naturalHeight;
      const maxEdge = 1200;
      const scale = Math.min(1, maxEdge / Math.max(width, height));
      drawImageToCanvas(state.canvas, loaded.image, Math.round(width * scale), Math.round(height * scale));
    } catch {
      state.canvas.width = 0;
      state.canvas.height = 0;
    }
  }

  function resetExifState() {
    state.file = null;
    state.bytes = null;
    state.kind = null;
    state.cleanedBlob = null;
    state.cleanedName = "";
    cleanBtn.disabled = true;
    downloadBtn.disabled = true;
    metadataList.innerHTML = "";
    state.canvas.width = 0;
    state.canvas.height = 0;
    status.textContent = "사진을 선택하면 감지 가능한 메타데이터 항목을 확인합니다.";
  }
}

function renderPdfMerge(container) {
  container.innerHTML = `
    <div class="tool-section">
      <aside class="action-card">
        <div class="upload-box">
          <label for="pdfFiles">PDF 여러 개 선택</label>
          <input id="pdfFiles" type="file" accept="application/pdf" multiple />
          <p>PDF 파일을 선택하거나 이 영역에 끌어다 놓으면 선택한 순서대로 병합됩니다.</p>
        </div>
        <div id="fileList" class="file-list"></div>
        <div class="action-row">
          <button id="mergeBtn" class="primary-action" type="button">PDF 합치기</button>
        </div>
        <p id="status" class="tool-note">PDF 라이브러리를 필요한 순간에만 불러옵니다.</p>
      </aside>
    </div>
  `;

  const fileInput = container.querySelector("#pdfFiles");
  const fileList = container.querySelector("#fileList");
  const status = container.querySelector("#status");

  fileInput.addEventListener("change", () => {
    fileList.innerHTML = Array.from(fileInput.files)
      .map((file, index) => `<div class="file-item"><span>${index + 1}. ${escapeHtml(file.name)}</span><span>${formatBytes(file.size)}</span></div>`)
      .join("");
  });

  container.querySelector("#mergeBtn").addEventListener("click", async () => {
    const files = Array.from(fileInput.files || []);
    if (files.length < 2) {
      showToast("병합하려면 PDF 두 개 이상이 필요합니다.");
      return;
    }

    try {
      status.textContent = "PDF 라이브러리를 준비 중입니다.";
      await loadLibrary("pdfLib");
      const mergedPdf = await PDFLib.PDFDocument.create();

      for (const file of files) {
        status.textContent = `${file.name} 페이지를 읽는 중입니다.`;
        const sourcePdf = await PDFLib.PDFDocument.load(await file.arrayBuffer());
        const pageIndices = sourcePdf.getPageIndices();
        const pages = await mergedPdf.copyPages(sourcePdf, pageIndices);
        pages.forEach((page) => mergedPdf.addPage(page));
      }

      const bytes = await mergedPdf.save();
      downloadBlob(new Blob([bytes], { type: "application/pdf" }), "merged.pdf");
      status.textContent = `병합 완료 · ${files.length}개 파일을 하나로 묶었습니다.`;
    } catch (error) {
      status.textContent = "PDF 병합 중 오류가 발생했습니다.";
      showToast("PDF 병합을 완료하지 못했습니다. 파일 형식과 브라우저 상태를 확인해 주세요.");
    }
  });
}

function renderPdfSplit(container) {
  container.innerHTML = `
    <div class="tool-section">
      <aside class="action-card">
        <div class="upload-box">
          <label for="pdfFile">PDF 선택</label>
          <input id="pdfFile" type="file" accept="application/pdf" />
          <p>PDF 파일을 선택하거나 이 영역에 끌어다 놓은 뒤 페이지 수 기준으로 나눕니다.</p>
        </div>
        <div class="field-row">
          <div class="field"><label for="pagesPerFile">파일당 페이지 수</label><input id="pagesPerFile" type="number" min="1" value="1" /></div>
          <div class="field"><label for="filePrefix">파일명 접두어</label><input id="filePrefix" type="text" placeholder="split" /></div>
        </div>
        <div class="action-row">
          <button id="splitBtn" class="primary-action" type="button">PDF 분할</button>
        </div>
        <p id="status" class="tool-note">분할된 PDF는 브라우저 다운로드로 순차 저장됩니다.</p>
      </aside>
    </div>
  `;

  const fileInput = container.querySelector("#pdfFile");
  const status = container.querySelector("#status");

  container.querySelector("#splitBtn").addEventListener("click", async () => {
    const file = fileInput.files[0];
    const pagesPerFile = Math.max(1, Number(container.querySelector("#pagesPerFile").value || 1));
    const prefix = sanitizeFilename(container.querySelector("#filePrefix").value || "split");
    if (!file) {
      showToast("분할할 PDF를 선택해 주세요.");
      return;
    }

    try {
      await loadLibrary("pdfLib");
      const sourcePdf = await PDFLib.PDFDocument.load(await file.arrayBuffer());
      const pageCount = sourcePdf.getPageCount();
      let part = 1;

      for (let start = 0; start < pageCount; start += pagesPerFile) {
        const chunkPdf = await PDFLib.PDFDocument.create();
        const end = Math.min(start + pagesPerFile, pageCount);
        const indices = [];
        for (let index = start; index < end; index += 1) indices.push(index);
        const pages = await chunkPdf.copyPages(sourcePdf, indices);
        pages.forEach((page) => chunkPdf.addPage(page));
        const bytes = await chunkPdf.save();
        downloadBlob(new Blob([bytes], { type: "application/pdf" }), `${prefix}-${part}.pdf`);
        part += 1;
        await wait(120);
      }

      status.textContent = `${pageCount}페이지를 ${part - 1}개 파일로 분할했습니다.`;
    } catch (error) {
      status.textContent = "PDF 분할 중 오류가 발생했습니다.";
      showToast("PDF 분할을 완료하지 못했습니다. 파일 형식과 브라우저 상태를 확인해 주세요.");
    }
  });
}

function renderPdfExtractPages(container) {
  container.innerHTML = `
    <div class="tool-section">
      <aside class="action-card">
        <div class="upload-box">
          <label for="pdfFile">PDF 선택</label>
          <input id="pdfFile" type="file" accept="application/pdf" />
          <p>PDF 파일을 선택하거나 이 영역에 끌어다 놓은 뒤 예: 1-3,5,8 형식으로 필요한 페이지를 추출합니다.</p>
        </div>
        <div class="field-row">
          <div class="field"><label for="pageRanges">페이지 범위</label><input id="pageRanges" type="text" placeholder="1-3,5" /></div>
          <div class="field"><label for="fileName">파일명</label><input id="fileName" type="text" placeholder="extracted-pages" /></div>
        </div>
        <div class="action-row">
          <button id="extractBtn" class="primary-action" type="button">페이지 추출</button>
        </div>
        <p id="status" class="tool-note">원본 페이지 순서를 유지한 새 PDF를 만듭니다.</p>
      </aside>
    </div>
  `;

  const fileInput = container.querySelector("#pdfFile");
  const status = container.querySelector("#status");

  container.querySelector("#extractBtn").addEventListener("click", async () => {
    const file = fileInput.files[0];
    if (!file) {
      showToast("PDF를 선택해 주세요.");
      return;
    }

    try {
      await loadLibrary("pdfLib");
      const sourcePdf = await PDFLib.PDFDocument.load(await file.arrayBuffer());
      const ranges = parsePageRanges(container.querySelector("#pageRanges").value, sourcePdf.getPageCount());
      if (ranges.length === 0) {
        showToast("유효한 페이지 범위를 입력해 주세요.");
        return;
      }

      const extracted = await PDFLib.PDFDocument.create();
      const pages = await extracted.copyPages(sourcePdf, ranges);
      pages.forEach((page) => extracted.addPage(page));
      const bytes = await extracted.save();
      const filename = `${sanitizeFilename(container.querySelector("#fileName").value || "extracted-pages")}.pdf`;
      downloadBlob(new Blob([bytes], { type: "application/pdf" }), filename);
      status.textContent = `${ranges.length}페이지를 추출했습니다.`;
    } catch (error) {
      status.textContent = "페이지 추출 중 오류가 발생했습니다.";
      showToast("PDF 페이지 추출을 완료하지 못했습니다.");
    }
  });
}

function renderImageToPdf(container) {
  container.innerHTML = `
    <div class="tool-section">
      <aside class="action-card">
        <div class="upload-box">
          <label for="imageFiles">이미지 여러 장 선택</label>
          <input id="imageFiles" type="file" accept="image/*" multiple />
          <p>이미지를 선택하거나 이 영역에 끌어다 놓으면 선택한 순서대로 PDF 페이지를 만듭니다.</p>
        </div>
        <div id="fileList" class="file-list"></div>
        <div class="action-row">
          <button id="makeBtn" class="primary-action" type="button">PDF 만들기</button>
        </div>
        <p id="status" class="tool-note">이미지 업로드 후 PDF 생성 버튼을 누르세요.</p>
      </aside>
    </div>
  `;

  const fileInput = container.querySelector("#imageFiles");
  const fileList = container.querySelector("#fileList");
  const status = container.querySelector("#status");

  fileInput.addEventListener("change", () => {
    fileList.innerHTML = Array.from(fileInput.files)
      .map((file, index) => `<div class="file-item"><span>${index + 1}. ${escapeHtml(file.name)}</span><span>${formatBytes(file.size)}</span></div>`)
      .join("");
  });

  container.querySelector("#makeBtn").addEventListener("click", async () => {
    const files = Array.from(fileInput.files || []);
    if (files.length === 0) {
      showToast("이미지를 먼저 선택해 주세요.");
      return;
    }

    try {
      await loadLibrary("pdfLib");
      const pdf = await PDFLib.PDFDocument.create();

      for (const file of files) {
        let pageImage;
        if (file.type === "image/png") {
          pageImage = await pdf.embedPng(new Uint8Array(await file.arrayBuffer()));
        } else if (file.type === "image/jpeg" || file.type === "image/jpg") {
          pageImage = await pdf.embedJpg(new Uint8Array(await file.arrayBuffer()));
        } else {
          const bytes = await convertImageFileToPngBytes(file);
          pageImage = await pdf.embedPng(bytes);
        }
        const page = pdf.addPage([pageImage.width + 40, pageImage.height + 40]);
        page.drawImage(pageImage, {
          x: 20,
          y: 20,
          width: pageImage.width,
          height: pageImage.height,
        });
      }

      const pdfBytes = await pdf.save();
      downloadBlob(new Blob([pdfBytes], { type: "application/pdf" }), "images-to-pdf.pdf");
      status.textContent = `${files.length}장 이미지를 PDF로 묶었습니다.`;
    } catch (error) {
      status.textContent = "이미지 PDF 변환 중 오류가 발생했습니다.";
      showToast("이미지 PDF 변환을 완료하지 못했습니다.");
    }
  });
}

function renderPdfToImage(container) {
  container.innerHTML = `
    <div class="tool-section">
      <aside class="action-card">
        <div class="upload-box">
          <label for="pdfFile">PDF 선택</label>
          <input id="pdfFile" type="file" accept="application/pdf" />
          <p>PDF 파일을 선택하거나 이 영역에 끌어다 놓으면 페이지를 PNG로 렌더링합니다.</p>
        </div>
        <div class="field">
          <label for="renderScale">렌더링 배율</label>
          <input id="renderScale" type="number" min="1" max="3" step="0.25" value="1.5" />
        </div>
        <div class="action-row">
          <button id="renderBtn" class="primary-action" type="button">페이지 렌더링</button>
          <button id="downloadAllBtn" type="button">전체 다운로드</button>
        </div>
        <p id="status" class="tool-note">페이지 수가 많으면 렌더링에 시간이 걸릴 수 있습니다.</p>
      </aside>
      <div id="gallery" class="gallery-grid"></div>
    </div>
  `;

  const fileInput = container.querySelector("#pdfFile");
  const status = container.querySelector("#status");
  const gallery = container.querySelector("#gallery");
  let renderedPages = [];

  container.querySelector("#renderBtn").addEventListener("click", async () => {
    const file = fileInput.files[0];
    if (!file) {
      showToast("PDF를 선택해 주세요.");
      return;
    }

    try {
      await loadLibrary("pdfjs");
      status.textContent = "PDF 페이지를 렌더링 중입니다.";
      gallery.innerHTML = "";
      renderedPages = [];

      const pdf = await pdfjsLib.getDocument({ data: await file.arrayBuffer() }).promise;
      const scale = clampNumber(Number(container.querySelector("#renderScale").value || 1.5), 1, 3);

      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
        const page = await pdf.getPage(pageNumber);
        const viewport = page.getViewport({ scale });
        const canvas = document.createElement("canvas");
        canvas.width = Math.ceil(viewport.width);
        canvas.height = Math.ceil(viewport.height);
        await page.render({ canvasContext: canvas.getContext("2d"), viewport }).promise;
        renderedPages.push({ pageNumber, canvas });

        const item = document.createElement("article");
        item.className = "gallery-item";
        item.innerHTML = `<strong>${pageNumber}페이지</strong>`;
        item.appendChild(canvas);
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = "PNG 저장";
        button.addEventListener("click", async () => {
          const blob = await canvasToBlob(canvas, "image/png", 1);
          downloadBlob(blob, `pdf-page-${pageNumber}.png`);
        });
        item.appendChild(button);
        gallery.appendChild(item);
      }

      status.textContent = `${pdf.numPages}페이지 렌더링이 완료되었습니다.`;
    } catch (error) {
      status.textContent = "PDF 렌더링 중 오류가 발생했습니다.";
      showToast("PDF 이미지를 만들지 못했습니다. 다른 PDF로 다시 시도해 주세요.");
    }
  });

  container.querySelector("#downloadAllBtn").addEventListener("click", async () => {
    if (renderedPages.length === 0) {
      showToast("먼저 PDF 페이지를 렌더링해 주세요.");
      return;
    }

    for (const page of renderedPages) {
      const blob = await canvasToBlob(page.canvas, "image/png", 1);
      downloadBlob(blob, `pdf-page-${page.pageNumber}.png`);
      await wait(120);
    }
  });
}

function renderSrtCleaner(container) {
  container.innerHTML = `
    <div class="tool-section">
      <div class="tool-grid">
        <article class="input-card subtitle-drop-zone" aria-label="SRT 자막 파일 드래그 업로드">
          <div class="section-heading">
            <div><h2>원본 SRT</h2></div>
            <label class="secondary-action" for="subtitleFile">파일 열기</label>
            <input id="subtitleFile" class="hidden" type="file" accept=".srt,text/plain" />
          </div>
          <textarea id="sourceText" class="subtitle-textarea" placeholder="SRT 자막을 붙여넣으세요."></textarea>
        </article>
        <aside class="action-card">
          <div class="check-row">
            <label class="check-item"><input id="trimText" type="checkbox" checked /> 줄 앞뒤 공백 제거</label>
            <label class="check-item"><input id="collapseText" type="checkbox" checked /> 문장 사이 공백 압축</label>
            <label class="check-item"><input id="renumber" type="checkbox" checked /> 번호 다시 매기기</label>
          </div>
          <div class="action-row">
            <button id="cleanBtn" class="primary-action" type="button">SRT 정리</button>
            <button id="copyBtn" type="button">결과 복사</button>
            <button id="downloadBtn" type="button">SRT 저장</button>
          </div>
          <p id="status" class="tool-note">SRT 구조가 깨진 일부 자막은 사람이 한번 더 확인하는 것이 좋습니다.</p>
        </aside>
      </div>
      <article class="result-card">
        <div class="section-heading">
          <div><h2>정리 결과</h2></div>
        </div>
        <textarea id="resultText" class="subtitle-textarea" placeholder="정리된 SRT"></textarea>
      </article>
    </div>
  `;

  bindSubtitleFileInput(container, "#subtitleFile", "#sourceText");

  const source = container.querySelector("#sourceText");
  const result = container.querySelector("#resultText");

  container.querySelector("#cleanBtn").addEventListener("click", () => {
    result.value = cleanSrt(source.value, {
      trimText: container.querySelector("#trimText").checked,
      collapseText: container.querySelector("#collapseText").checked,
      renumber: container.querySelector("#renumber").checked,
    });
  });

  container.querySelector("#copyBtn").addEventListener("click", async () => {
    if (!result.value.trim()) {
      showToast("먼저 정리 결과를 만들어 주세요.");
      return;
    }
    await safeCopy(result.value, "정리된 SRT를 복사했습니다.");
  });

  container.querySelector("#downloadBtn").addEventListener("click", () => {
    if (!result.value.trim()) {
      showToast("먼저 정리 결과를 만들어 주세요.");
      return;
    }
    downloadText(result.value, "cleaned-subtitle.srt");
  });
}

function renderSubtitleConverter(container) {
  container.innerHTML = `
    <div class="tool-section">
      <div class="tool-grid">
        <article class="input-card subtitle-drop-zone" aria-label="SRT 또는 VTT 자막 파일 드래그 업로드">
          <div class="section-heading">
            <div><h2>원본 자막</h2></div>
            <label class="secondary-action" for="subtitleFile">파일 열기</label>
            <input id="subtitleFile" class="hidden" type="file" accept=".srt,.vtt,text/plain" />
          </div>
          <textarea id="sourceText" class="subtitle-textarea" placeholder="SRT 또는 VTT 자막을 붙여넣으세요."></textarea>
        </article>
        <aside class="action-card">
          <div class="field-row">
            <div class="field">
              <label for="sourceType">원본 형식</label>
              <select id="sourceType">
                <option value="auto">자동 감지</option>
                <option value="srt">SRT</option>
                <option value="vtt">VTT</option>
              </select>
            </div>
            <div class="field">
              <label for="targetType">대상 형식</label>
              <select id="targetType">
                <option value="vtt">VTT</option>
                <option value="srt">SRT</option>
              </select>
            </div>
          </div>
          <div class="action-row">
            <button id="convertBtn" class="primary-action" type="button">형식 변환</button>
            <button id="copyBtn" type="button">결과 복사</button>
            <button id="downloadBtn" type="button">파일 저장</button>
          </div>
          <p id="status" class="tool-note">기본적인 SRT, VTT 구조를 기준으로 변환합니다.</p>
        </aside>
      </div>
      <article class="result-card">
        <div class="section-heading">
          <div><h2>변환 결과</h2></div>
        </div>
        <textarea id="resultText" class="subtitle-textarea" placeholder="변환 결과"></textarea>
      </article>
    </div>
  `;

  bindSubtitleFileInput(container, "#subtitleFile", "#sourceText");

  const source = container.querySelector("#sourceText");
  const result = container.querySelector("#resultText");
  const status = container.querySelector("#status");

  container.querySelector("#convertBtn").addEventListener("click", () => {
    const preferredSource = container.querySelector("#sourceType").value;
    const sourceType = preferredSource === "auto" ? detectSubtitleFormat(source.value) : preferredSource;
    const targetType = container.querySelector("#targetType").value;
    if (!sourceType || sourceType === targetType) {
      showToast("원본 형식과 대상 형식을 다시 확인해 주세요.");
      return;
    }
    result.value = convertSubtitle(source.value, sourceType, targetType);
    status.textContent = `${sourceType.toUpperCase()} → ${targetType.toUpperCase()} 변환 완료`;
  });

  container.querySelector("#copyBtn").addEventListener("click", async () => {
    if (!result.value.trim()) {
      showToast("먼저 변환 결과를 만들어 주세요.");
      return;
    }
    await safeCopy(result.value, "변환 결과를 복사했습니다.");
  });

  container.querySelector("#downloadBtn").addEventListener("click", () => {
    if (!result.value.trim()) {
      showToast("먼저 변환 결과를 만들어 주세요.");
      return;
    }
    const targetType = container.querySelector("#targetType").value;
    downloadText(result.value, `converted-subtitle.${targetType}`);
  });
}

function renderSubtitleTiming(container) {
  container.innerHTML = `
    <div class="tool-section">
      <div class="tool-grid">
        <article class="input-card subtitle-drop-zone" aria-label="SRT 또는 VTT 자막 파일 드래그 업로드">
          <div class="section-heading">
            <div><h2>원본 자막</h2></div>
            <label class="secondary-action" for="subtitleFile">파일 열기</label>
            <input id="subtitleFile" class="hidden" type="file" accept=".srt,.vtt,text/plain" />
          </div>
          <textarea id="sourceText" class="subtitle-textarea" placeholder="SRT 또는 VTT 자막을 붙여넣으세요."></textarea>
        </article>
        <aside class="action-card">
          <div class="field-row">
            <div class="field">
              <label for="offsetSeconds">이동 초</label>
              <input id="offsetSeconds" type="number" step="0.1" value="0.5" />
            </div>
            <div class="field">
              <label for="subtitleType">형식</label>
              <select id="subtitleType">
                <option value="auto">자동 감지</option>
                <option value="srt">SRT</option>
                <option value="vtt">VTT</option>
              </select>
            </div>
          </div>
          <div class="action-row">
            <button id="shiftBtn" class="primary-action" type="button">시간 보정</button>
            <button id="copyBtn" type="button">결과 복사</button>
            <button id="downloadBtn" type="button">파일 저장</button>
          </div>
          <p id="status" class="tool-note">음수 값을 넣으면 자막을 앞으로 당기고, 양수 값을 넣으면 뒤로 미룹니다.</p>
        </aside>
      </div>
      <article class="result-card">
        <div class="section-heading">
          <div><h2>보정 결과</h2></div>
        </div>
        <textarea id="resultText" class="subtitle-textarea" placeholder="보정된 자막"></textarea>
      </article>
    </div>
  `;

  bindSubtitleFileInput(container, "#subtitleFile", "#sourceText");

  const source = container.querySelector("#sourceText");
  const result = container.querySelector("#resultText");
  const status = container.querySelector("#status");

  container.querySelector("#shiftBtn").addEventListener("click", () => {
    const preferred = container.querySelector("#subtitleType").value;
    const type = preferred === "auto" ? detectSubtitleFormat(source.value) : preferred;
    if (!type) {
      showToast("SRT 또는 VTT 형식을 확인할 수 없습니다.");
      return;
    }

    const offsetMs = Math.round(Number(container.querySelector("#offsetSeconds").value || 0) * 1000);
    result.value = shiftSubtitleTimings(source.value, type, offsetMs);
    status.textContent = `${type.toUpperCase()} 자막을 ${offsetMs / 1000}초 이동했습니다.`;
  });

  container.querySelector("#copyBtn").addEventListener("click", async () => {
    if (!result.value.trim()) {
      showToast("먼저 보정 결과를 만들어 주세요.");
      return;
    }
    await safeCopy(result.value, "보정된 자막을 복사했습니다.");
  });

  container.querySelector("#downloadBtn").addEventListener("click", () => {
    if (!result.value.trim()) {
      showToast("먼저 보정 결과를 만들어 주세요.");
      return;
    }
    const preferred = container.querySelector("#subtitleType").value;
    const type = preferred === "auto" ? detectSubtitleFormat(source.value) || "srt" : preferred;
    downloadText(result.value, `shifted-subtitle.${type}`);
  });
}

function cleanTranscript(text, removeFillers) {
  let result = text.replace(/\s+/g, " ").replace(/\s+([,.?!。！？])/g, "$1").trim();
  if (!removeFillers) return result;

  if (IS_ENGLISH_LOCALE) {
    const fillerWords = ["um", "uh", "erm", "like", "you know", "sort of", "kind of", "basically", "actually", "i mean"];
    const pattern = new RegExp(`\\b(${fillerWords.map(escapeRegExp).join("|")})\\b[,.]?`, "gi");
    return result.replace(pattern, " ").replace(/\s+/g, " ").trim();
  }

  if (APP_LOCALE === "ja") {
    const fillerWords = ["えー", "えっと", "あの", "その", "まあ", "なんか", "つまり"];
    const pattern = new RegExp(`(^|\\s)(${fillerWords.map(escapeRegExp).join("|")})(?=\\s|,|\\.|。|$)`, "g");
    return result.replace(pattern, " ").replace(/\s+/g, " ").trim();
  }

  if (APP_LOCALE === "zh") {
    const fillerWords = ["嗯", "呃", "那个", "就是", "然后", "其实", "基本上"];
    const pattern = new RegExp(`(^|\\s)(${fillerWords.map(escapeRegExp).join("|")})(?=\\s|,|\\.|。|$)`, "g");
    return result.replace(pattern, " ").replace(/\s+/g, " ").trim();
  }

  const fillerWords = ["음", "어", "그러니까", "뭐랄까", "약간", "이제", "일단", "뭔가"];
  const pattern = new RegExp(`(^|\\s)(${fillerWords.join("|")})(?=\\s|,|\\.|$)`, "g");
  return result.replace(pattern, " ").replace(/\s+/g, " ").trim();
}

function splitSentences(text) {
  const normalized = text
    .replace(/([.!?。！？])\s*/g, "$1|")
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean);
  if (normalized.length > 1) return normalized.map(ensureSentenceEnd);
  return chunkLongText(text).map(ensureSentenceEnd);
}

function chunkLongText(text) {
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length <= 18) return [text];

  const chunks = [];
  let current = [];
  let charCount = 0;
  words.forEach((word) => {
    current.push(word);
    charCount += word.length;
    if (charCount >= 42) {
      chunks.push(current.join(" "));
      current = [];
      charCount = 0;
    }
  });
  if (current.length > 0) chunks.push(current.join(" "));
  return chunks;
}

function ensureSentenceEnd(sentence) {
  return /[.!?。！？]$/.test(sentence) ? sentence : `${sentence}.`;
}

function composeScript({ title, type, sentences, addSections }) {
  const heading = title || getDefaultTitle(type);
  const body = groupParagraphs(sentences, 3);
  if (type === "meeting") return composeMeetingSummary(heading, sentences, addSections);

  const sectionLabels = getSectionLabels(type, body.length);
  const lines = [`# ${heading}`, ""];
  body.forEach((paragraph, index) => {
    if (addSections) {
      lines.push(`## ${sectionLabels[index] || getPartLabel(index)}`);
    }
    lines.push(paragraph.join(" "));
    lines.push("");
  });
  return lines.join("\n").trim();
}

function composeMeetingSummary(heading, sentences, addSections) {
  const lines = [`# ${heading}`, ""];
  const summary = sentences.slice(0, 4);
  const details = sentences.slice(4);
  if (addSections) lines.push(getMeetingSectionLabel("summary"));
  summary.forEach((sentence) => lines.push(`- ${sentence}`));
  if (details.length > 0) {
    lines.push("");
    if (addSections) lines.push(getMeetingSectionLabel("details"));
    details.forEach((sentence) => lines.push(`- ${sentence}`));
  }
  return lines.join("\n").trim();
}

function groupParagraphs(sentences, size) {
  const groups = [];
  for (let index = 0; index < sentences.length; index += size) {
    groups.push(sentences.slice(index, index + size));
  }
  return groups;
}

function getSectionLabels(type, count) {
  const labelsByLocale = {
    en: {
        general: ["Introduction", "Main Points", "Closing"],
        youtube: ["Opening", "Main Content", "Call to Action"],
        presentation: ["Problem", "Key Points", "Conclusion"],
      },
    ja: {
        general: ["導入", "主な内容", "まとめ"],
        youtube: ["オープニング", "本編", "行動喚起"],
        presentation: ["課題", "要点", "結論"],
      },
    zh: {
        general: ["开头", "重点内容", "结尾"],
        youtube: ["开场", "主体内容", "行动引导"],
        presentation: ["问题", "要点", "结论"],
      },
    ko: {
        general: ["도입", "본문", "마무리"],
        youtube: ["오프닝", "핵심 내용", "콜 투 액션"],
        presentation: ["문제 제기", "주요 내용", "결론"],
      },
  };
  const labels = labelsByLocale[APP_LOCALE] || labelsByLocale.ko;
  const base = labels[type] || labels.general;
  return Array.from({ length: count }, (_, index) => base[index] || getPartLabel(index));
}

function getDefaultTitle(type) {
  const titlesByLocale = {
    en: {
        general: "Generated Script",
        youtube: "YouTube Video Script",
        presentation: "Presentation Script",
        meeting: "Meeting Summary",
      },
    ja: {
        general: "作成された原稿",
        youtube: "YouTube動画原稿",
        presentation: "プレゼン原稿",
        meeting: "会議メモ",
      },
    zh: {
        general: "生成的稿件",
        youtube: "YouTube视频稿",
        presentation: "演示稿",
        meeting: "会议摘要",
      },
    ko: {
        general: "생성된 대본",
        youtube: "유튜브 영상 대본",
        presentation: "발표 대본",
        meeting: "회의 요약",
      },
  };
  const titles = titlesByLocale[APP_LOCALE] || titlesByLocale.ko;
  return titles[type] || titles.general;
}

function getRecognitionErrorMessage(error) {
  const messagesByLocale = {
    en: {
        "no-speech": "No speech was detected. Try speaking a little louder.",
        "audio-capture": "No microphone was found.",
        "not-allowed": "Microphone permission is blocked.",
        "service-not-allowed": "The browser speech recognition service is blocked.",
        network: "The speech recognition service connection is unstable.",
      },
    ja: {
        "no-speech": "音声が検出されませんでした。少し大きめに話してください。",
        "audio-capture": "マイクが見つかりません。",
        "not-allowed": "マイク権限がブロックされています。",
        "service-not-allowed": "ブラウザの音声認識サービスがブロックされています。",
        network: "音声認識サービスの接続が不安定です。",
      },
    zh: {
        "no-speech": "未检测到语音。请稍微大声一点。",
        "audio-capture": "未找到麦克风。",
        "not-allowed": "麦克风权限已被阻止。",
        "service-not-allowed": "浏览器语音识别服务被阻止。",
        network: "语音识别服务连接不稳定。",
      },
    ko: {
        "no-speech": "소리가 감지되지 않았습니다. 조금 더 크게 말해 주세요.",
        "audio-capture": "마이크를 찾을 수 없습니다.",
        "not-allowed": "마이크 권한이 차단되었습니다.",
        "service-not-allowed": "브라우저 음성 인식 서비스가 차단되었습니다.",
        network: "음성 인식 서비스 연결이 불안정합니다.",
      },
  };
  const messages = messagesByLocale[APP_LOCALE] || messagesByLocale.ko;
  const fallback = {
    en: `Speech recognition error: ${error}`,
    ja: `音声認識エラー: ${error}`,
    zh: `语音识别错误: ${error}`,
    ko: `음성 인식 오류: ${error}`,
  };
  return messages[error] || fallback[APP_LOCALE] || fallback.ko;
}

function getPartLabel(index) {
  const partLabels = {
    en: `Part ${index + 1}`,
    ja: `パート${index + 1}`,
    zh: `第${index + 1}部分`,
    ko: `파트 ${index + 1}`,
  };
  return partLabels[APP_LOCALE] || partLabels.ko;
}

function getMeetingSectionLabel(section) {
  const labels = {
    summary: {
      en: "## Key Summary",
      ja: "## 要点",
      zh: "## 重点摘要",
      ko: "## 핵심 요약",
    },
    details: {
      en: "## Details",
      ja: "## 詳細",
      zh: "## 详细内容",
      ko: "## 상세 내용",
    },
  };
  return labels[section]?.[APP_LOCALE] || labels[section]?.ko || "";
}

function cleanAiText(text, options) {
  if (!text.trim()) return "";
  let result = normalizeNewlines(text);

  if (options.stripHtml) {
    result = result.replace(/<br\s*\/?>/gi, "\n").replace(/<\/p>/gi, "\n\n").replace(/<[^>]+>/g, "");
  }

  if (options.mode === "table") {
    const table = convertMarkdownTableToTsv(result);
    if (table) {
      return collapseResult(table, options.trimBlankLines);
    }
  }

  if (options.removeCodeFences) {
    result = result.replace(/```[\w-]*\n?([\s\S]*?)```/g, "$1");
    result = result.replace(/`([^`]+)`/g, "$1");
  }

  if (options.removeHeadings) {
    result = result.replace(/^\s{0,3}#{1,6}\s*/gm, "");
  }

  result = result.replace(/^\s*>\s?/gm, "");
  result = result.replace(/^\s*[-*_]{3,}\s*$/gm, "");

  result = result.replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, (_, label, url) => {
    if (options.linkMode === "url") return url;
    if (options.linkMode === "text-url") return `${label} - ${url}`;
    return label;
  });

  if (options.removeEmphasis) {
    result = result
      .replace(/\*\*([^*]+)\*\*/g, "$1")
      .replace(/__([^_]+)__/g, "$1")
      .replace(/\*([^*]+)\*/g, "$1")
      .replace(/_([^_]+)_/g, "$1");
  }

  if (options.normalizeBullets) {
    if (options.mode === "plain") {
      result = result.replace(/^\s*[-*+]\s+/gm, "");
    } else {
      result = result.replace(/^\s*[-*+]\s+/gm, "- ");
    }
  }

  if (options.mode === "document") {
    result = result.replace(/^\s*-\s+/gm, "• ");
  }

  if (options.mode === "plain") {
    result = joinParagraphLines(result);
  }

  return collapseResult(result, options.trimBlankLines);
}

function collapseResult(text, trimBlankLines) {
  let result = text.replace(/\t/g, "  ");
  result = result
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n");
  if (trimBlankLines) {
    result = result.replace(/\n{3,}/g, "\n\n");
  }
  return result.trim();
}

function countTextStats(text) {
  const normalized = normalizeNewlines(text);
  const words = normalized.trim() ? normalized.trim().split(/\s+/).filter(Boolean) : [];
  const sentences = normalized.match(/[.!?。！？]+/g) || [];
  const nonEmptyLines = normalized ? normalized.split("\n") : [];
  const paragraphs = normalized
    .split(/\n\s*\n/)
    .map((item) => item.trim())
    .filter(Boolean);
  const encoder = new TextEncoder();
  const characters = normalized.length;
  const wordsCount = words.length;
  return {
    characters,
    charactersNoSpace: normalized.replace(/\s/g, "").length,
    words: wordsCount,
    lines: normalized ? nonEmptyLines.length : 0,
    paragraphs: paragraphs.length,
    bytes: encoder.encode(normalized).length,
    sentences: sentences.length || (normalized.trim() ? 1 : 0),
    readTime: formatMinutes(wordsCount / 250),
    speechTime: formatMinutes(wordsCount / 170),
  };
}

function cleanLineBreaks(text, options) {
  let result = normalizeNewlines(text);
  if (options.trimLines) {
    result = result
      .split("\n")
      .map((line) => line.trim())
      .join("\n");
  }
  if (options.joinLines) {
    result = joinParagraphLines(result);
  }
  if (options.collapseSpaces) {
    result = result.replace(/[ \t]{2,}/g, " ");
  }
  if (options.sentenceBreak) {
    result = breakBySentencePunctuation(result);
  }
  if (options.collapseBlank) {
    result = result.replace(/\n{3,}/g, "\n\n");
  }
  return result.trim();
}

function breakBySentencePunctuation(text) {
  return text
    .split(/\n\s*\n/)
    .map((paragraph) =>
      paragraph
        .replace(/([.!?。！？])\s+(?=\S)/g, "$1\n")
        .replace(/([.!?。！？])(?=[가-힣A-Za-z「『“‘《〈([{])/g, "$1\n")
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .join("\n")
    )
    .filter(Boolean)
    .join("\n\n");
}

function joinParagraphLines(text) {
  return text
    .split(/\n\s*\n/)
    .map((paragraph) => {
      const lines = paragraph
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

      return lines
        .reduce((joined, line, index) => {
          if (index === 0) return line;
          const previousLine = lines[index - 1];
          const separator = shouldJoinKoreanLineWithoutSpace(previousLine, line) ? "" : " ";
          return `${joined}${separator}${line}`;
        }, "")
        .replace(/[ \t]{2,}/g, " ")
        .trim();
    })
    .filter(Boolean)
    .join("\n\n");
}

function shouldJoinKoreanLineWithoutSpace(leftLine, rightLine) {
  const leftText = leftLine.trimEnd();
  const rightText = rightLine.trimStart();
  const leftChar = leftText.slice(-1);
  const rightChar = rightText.slice(0, 1);

  if (!/[가-힣]/.test(leftChar) || !/[가-힣]/.test(rightChar)) {
    return false;
  }

  return (
    /^으로/.test(rightText) ||
    (leftText.endsWith("으") && rightText.startsWith("로")) ||
    /^(?:은|는|이|가|을|를|의|에|에서|에게|께|께서|와|과|도|만|까지|부터|처럼|보다|마다|조차|마저|로서|로써)(?=[가-힣]|$)/.test(
      rightText
    )
  );
}

function extractContacts(text) {
  const emails = uniqueList(text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi) || []);
  const urls = uniqueList(
    (text.match(/\b((?:https?:\/\/|www\.)[^\s<>"')\]]+)/gi) || []).map((url) =>
      url.replace(/[),.;]+$/, "")
    )
  );
  const phones = uniqueList(
    (text.match(/(?:\+?\d[\d()\-\s]{7,}\d)/g) || [])
      .map((item) => item.replace(/\s+/g, " ").trim())
      .filter((item) => item.replace(/[^\d]/g, "").length >= 8)
  );

  return { emails, urls, phones };
}

function removeDuplicateLines(text, options) {
  const lines = normalizeNewlines(text).split("\n");
  const seen = new Set();
  const cleaned = [];
  let removedCount = 0;

  lines.forEach((line) => {
    let normalized = options.trimLines ? line.trim() : line;
    if (options.ignoreEmpty && !normalized) return;
    const key = options.caseSensitive ? normalized : normalized.toLowerCase();
    if (seen.has(key)) {
      removedCount += 1;
      return;
    }
    seen.add(key);
    cleaned.push(normalized);
  });

  if (options.sortLines) {
    cleaned.sort((left, right) => left.localeCompare(right, "ko"));
  }

  return {
    lines: cleaned,
    removedCount,
    originalCount: lines.filter((line) => !(options.ignoreEmpty && !line.trim())).length,
  };
}

function replaceInText(text, findValue, replaceValue, options) {
  let pattern = findValue;
  if (!options.useRegex) {
    pattern = escapeRegExp(findValue);
  }
  if (options.wholeWord) {
    pattern = `\\b${pattern}\\b`;
  }
  const flags = options.caseSensitive ? "g" : "gi";
  const regex = new RegExp(pattern, flags);
  const matches = text.match(regex);
  return {
    text: text.replace(regex, replaceValue),
    count: matches ? matches.length : 0,
  };
}

function convertCase(text, mode) {
  const source = text.trim();
  if (!source) return "";
  const tokens = source
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean);

  if (tokens.length === 0) {
    if (mode === "upper") return source.toUpperCase();
    if (mode === "lower") return source.toLowerCase();
    return source;
  }

  const lowerTokens = tokens.map((token) => token.toLowerCase());
  switch (mode) {
    case "lower":
      return source.toLowerCase();
    case "upper":
      return source.toUpperCase();
    case "title":
      return lowerTokens.map(capitalizeWord).join(" ");
    case "sentence":
      return capitalizeWord(source.toLowerCase());
    case "camel":
      return `${lowerTokens[0]}${lowerTokens.slice(1).map(capitalizeWord).join("")}`;
    case "pascal":
      return lowerTokens.map(capitalizeWord).join("");
    case "snake":
      return lowerTokens.join("_");
    case "kebab":
      return lowerTokens.join("-");
    default:
      return source;
  }
}

function capitalizeWord(word) {
  return word ? `${word.charAt(0).toUpperCase()}${word.slice(1)}` : "";
}

function diffLines(leftText, rightText) {
  const left = normalizeNewlines(leftText).split("\n");
  const right = normalizeNewlines(rightText).split("\n");
  const matrix = buildLcsMatrix(left, right);
  const operations = [];
  let i = left.length;
  let j = right.length;

  while (i > 0 && j > 0) {
    if (left[i - 1] === right[j - 1]) {
      operations.push({ type: "equal", left: left[i - 1], right: right[j - 1] });
      i -= 1;
      j -= 1;
    } else if (matrix[i - 1][j] >= matrix[i][j - 1]) {
      operations.push({ type: "remove", left: left[i - 1], right: "" });
      i -= 1;
    } else {
      operations.push({ type: "add", left: "", right: right[j - 1] });
      j -= 1;
    }
  }

  while (i > 0) {
    operations.push({ type: "remove", left: left[i - 1], right: "" });
    i -= 1;
  }
  while (j > 0) {
    operations.push({ type: "add", left: "", right: right[j - 1] });
    j -= 1;
  }

  operations.reverse();

  let kept = 0;
  let removed = 0;
  let added = 0;
  let leftLine = 1;
  let rightLine = 1;
  const leftHtml = [];
  const rightHtml = [];

  operations.forEach((op) => {
    if (op.type === "equal") {
      kept += 1;
      leftHtml.push(renderDiffRow("equal", leftLine, op.left));
      rightHtml.push(renderDiffRow("equal", rightLine, op.right));
      leftLine += 1;
      rightLine += 1;
      return;
    }

    if (op.type === "remove") {
      removed += 1;
      leftHtml.push(renderDiffRow("remove", leftLine, op.left));
      rightHtml.push(renderDiffRow("remove", "", ""));
      leftLine += 1;
      return;
    }

    added += 1;
    leftHtml.push(renderDiffRow("add", "", ""));
    rightHtml.push(renderDiffRow("add", rightLine, op.right));
    rightLine += 1;
  });

  return {
    kept,
    removed,
    added,
    leftHtml: leftHtml.join(""),
    rightHtml: rightHtml.join(""),
  };
}

function buildLcsMatrix(left, right) {
  const matrix = Array.from({ length: left.length + 1 }, () => Array(right.length + 1).fill(0));
  for (let i = 1; i <= left.length; i += 1) {
    for (let j = 1; j <= right.length; j += 1) {
      if (left[i - 1] === right[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1] + 1;
      } else {
        matrix[i][j] = Math.max(matrix[i - 1][j], matrix[i][j - 1]);
      }
    }
  }
  return matrix;
}

function renderDiffRow(type, lineNumber, text) {
  return `
    <div class="diff-row is-${type}">
      <span>${lineNumber}</span>
      <code>${escapeHtml(text || " ")}</code>
    </div>
  `;
}

function buildQrPayload(container, mode) {
  if (mode === "wifi") {
    const ssid = container.querySelector("#wifiSsid").value.trim();
    if (!ssid) return "";
    const password = container.querySelector("#wifiPassword").value.trim();
    const authType = container.querySelector("#wifiType").value;
    return `WIFI:T:${authType};S:${ssid};P:${password};;`;
  }

  const value = container.querySelector("#qrText").value.trim();
  return value;
}

function getClipboardImageFile(clipboardData) {
  if (!clipboardData) return null;

  const file = Array.from(clipboardData.files || []).find((item) => item.type.startsWith("image/"));
  if (file) return file;

  const imageItem = Array.from(clipboardData.items || []).find((item) => item.type.startsWith("image/"));
  return imageItem?.getAsFile() || null;
}

function analyzeQrContent(value) {
  const text = String(value || "").trim();
  const safeUrl = extractHttpUrlFromQrText(text);
  if (safeUrl) {
    return { type: "URL", label: safeUrl, safeUrl };
  }

  if (/^WIFI:/i.test(text)) {
    return { type: "Wi-Fi 정보", label: "Wi-Fi 접속 정보 QR입니다.", safeUrl: "" };
  }

  if (/^mailto:/i.test(text)) {
    return { type: "이메일 링크", label: "이메일 링크 QR입니다.", safeUrl: "" };
  }

  if (/^tel:/i.test(text)) {
    return { type: "전화 링크", label: "전화번호 링크 QR입니다.", safeUrl: "" };
  }

  if (/^BEGIN:VCARD/i.test(text)) {
    return { type: "연락처", label: "연락처 정보 QR입니다.", safeUrl: "" };
  }

  return { type: "텍스트", label: "일반 텍스트 QR입니다.", safeUrl: "" };
}

function extractHttpUrlFromQrText(text) {
  const bookmarkMatch = /^MEBKM:.*?URL:([^;]+);/is.exec(text);
  if (bookmarkMatch) {
    const url = normalizeHttpUrl(bookmarkMatch[1]);
    if (url) return url;
  }

  const urlToMatch = /^URLTO:[^:]*:(https?:\/\/.+)$/is.exec(text);
  if (urlToMatch) {
    const url = normalizeHttpUrl(urlToMatch[1]);
    if (url) return url;
  }

  const direct = normalizeHttpUrl(text);
  if (direct) return direct;

  const match = text.match(/https?:\/\/[^\s<>"']+/i) || text.match(/\bwww\.[^\s<>"']+/i);
  if (!match) return "";

  return normalizeHttpUrl(match[0].replace(/[),.;]+$/, "")) || "";
}

function normalizeHttpUrl(value) {
  let text = String(value || "").trim();
  if (!text) return "";

  if (/^www\./i.test(text) || /^[a-z0-9][a-z0-9.-]+\.[a-z]{2,}([/?#].*)?$/i.test(text)) {
    text = `https://${text}`;
  }

  if (!/^https?:\/\//i.test(text)) return "";

  try {
    const url = new URL(text);
    return ["http:", "https:"].includes(url.protocol) ? url.href : "";
  } catch {
    return "";
  }
}

function bindUploadBoxDrops(scope) {
  scope.querySelectorAll(".upload-box").forEach((dropZone) => {
    if (dropZone.classList.contains("qr-reader-drop") || dropZone.dataset.dropBound === "true") return;
    const fileInput = dropZone.querySelector('input[type="file"]');
    bindFileDropZone(dropZone, fileInput);
  });
}

function bindFileDropZone(dropZone, fileInput) {
  if (!dropZone || !fileInput || dropZone.dataset.dropBound === "true") return;

  dropZone.dataset.dropBound = "true";

  ["dragenter", "dragover"].forEach((eventName) => {
    dropZone.addEventListener(eventName, (event) => {
      event.preventDefault();
      dropZone.classList.add("is-dragging");
    });
  });

  dropZone.addEventListener("dragleave", (event) => {
    if (event.relatedTarget && dropZone.contains(event.relatedTarget)) return;
    dropZone.classList.remove("is-dragging");
  });

  dropZone.addEventListener("drop", (event) => {
    event.preventDefault();
    event.stopPropagation();
    dropZone.classList.remove("is-dragging");

    const files = Array.from(event.dataTransfer?.files || []);
    const acceptedFiles = files.filter((file) => matchesFileAccept(file, fileInput.accept));
    if (acceptedFiles.length === 0) {
      showToast("지원하지 않는 파일 형식입니다. 파일 형식을 확인해 주세요.");
      return;
    }

    const nextFiles = fileInput.multiple ? acceptedFiles : acceptedFiles.slice(0, 1);
    if (!setFileInputFiles(fileInput, nextFiles)) {
      showToast("이 브라우저에서는 드래그 업로드를 지원하지 않습니다. 파일 선택 버튼을 사용해 주세요.");
      return;
    }

    fileInput.dispatchEvent(new Event("change", { bubbles: true }));
  });
}

function setFileInputFiles(fileInput, files) {
  if (typeof DataTransfer === "undefined") return false;
  const transfer = new DataTransfer();
  files.forEach((file) => transfer.items.add(file));
  fileInput.files = transfer.files;
  return true;
}

function matchesFileAccept(file, accept) {
  if (!accept) return true;
  const filename = file.name.toLowerCase();
  const mime = (file.type || "").toLowerCase();
  return accept
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean)
    .some((rule) => {
      if (rule.startsWith(".")) return filename.endsWith(rule);
      if (rule.endsWith("/*")) return mime.startsWith(rule.slice(0, -1));
      return mime === rule;
    });
}

function bindSubtitleFileInput(container, inputSelector, textareaSelector) {
  const fileInput = container.querySelector(inputSelector);
  const textarea = container.querySelector(textareaSelector);
  bindFileDropZone(container.querySelector(".subtitle-drop-zone"), fileInput);
  fileInput.addEventListener("change", async () => {
    const file = fileInput.files[0];
    if (!file) return;
    textarea.value = await file.text();
  });
}

function cleanSrt(text, options) {
  const cues = parseSrt(text);
  if (cues.length === 0) return "";
  return cues
    .map((cue, index) => {
      const lines = cue.textLines.map((line) => {
        let value = options.trimText ? line.trim() : line;
        if (options.collapseText) {
          value = value.replace(/\s{2,}/g, " ");
        }
        return value;
      });
      return [
        options.renumber ? String(index + 1) : cue.index,
        `${cue.start} --> ${cue.end}`,
        lines.join("\n"),
      ].join("\n");
    })
    .join("\n\n")
    .trim();
}

function detectSubtitleFormat(text) {
  const normalized = normalizeNewlines(text).trim();
  if (!normalized) return "";
  if (/^WEBVTT/m.test(normalized)) return "vtt";
  if (/^\d+\s*\n\d{2}:\d{2}:\d{2},\d{3}\s+-->/m.test(normalized)) return "srt";
  if (/\d{2}:\d{2}:\d{2}\.\d{3}\s+-->/m.test(normalized)) return "vtt";
  return "";
}

function convertSubtitle(text, sourceType, targetType) {
  if (sourceType === "srt" && targetType === "vtt") {
    const cues = parseSrt(text);
    return ["WEBVTT", ""]
      .concat(
        cues.map((cue) => `${cue.start.replace(",", ".")} --> ${cue.end.replace(",", ".")}\n${cue.textLines.join("\n")}`)
      )
      .join("\n\n")
      .trim();
  }

  if (sourceType === "vtt" && targetType === "srt") {
    const cues = parseVtt(text);
    return cues
      .map(
        (cue, index) =>
          `${index + 1}\n${cue.start.replace(".", ",")} --> ${cue.end.replace(".", ",")}\n${cue.textLines.join("\n")}`
      )
      .join("\n\n")
      .trim();
  }

  return text;
}

function shiftSubtitleTimings(text, type, offsetMs) {
  if (type === "srt") {
    return parseSrt(text)
      .map(
        (cue, index) =>
          `${index + 1}\n${shiftSrtTime(cue.start, offsetMs)} --> ${shiftSrtTime(cue.end, offsetMs)}\n${cue.textLines.join("\n")}`
      )
      .join("\n\n")
      .trim();
  }

  return ["WEBVTT", ""]
    .concat(
      parseVtt(text).map(
        (cue) =>
          `${shiftVttTime(cue.start, offsetMs)} --> ${shiftVttTime(cue.end, offsetMs)}\n${cue.textLines.join("\n")}`
      )
    )
    .join("\n\n")
    .trim();
}

function parseSrt(text) {
  return normalizeNewlines(text)
    .trim()
    .split(/\n\s*\n/)
    .map((block) => {
      const lines = block.split("\n").map((line) => line.trimEnd());
      if (lines.length < 2 || !lines[1].includes("-->")) return null;
      return {
        index: lines[0].trim(),
        start: lines[1].split("-->")[0].trim(),
        end: lines[1].split("-->")[1].trim(),
        textLines: lines.slice(2),
      };
    })
    .filter(Boolean);
}

function parseVtt(text) {
  return normalizeNewlines(text)
    .replace(/^WEBVTT\s*/i, "")
    .trim()
    .split(/\n\s*\n/)
    .map((block) => {
      const lines = block.split("\n").map((line) => line.trimEnd());
      const cueLineIndex = lines.findIndex((line) => line.includes("-->"));
      if (cueLineIndex === -1) return null;
      const cueLine = lines[cueLineIndex];
      return {
        start: cueLine.split("-->")[0].trim(),
        end: cueLine.split("-->")[1].trim(),
        textLines: lines.slice(cueLineIndex + 1),
      };
    })
    .filter(Boolean);
}

function shiftSrtTime(value, offsetMs) {
  const ms = Math.max(0, parseSrtTime(value) + offsetMs);
  return formatSrtTime(ms);
}

function shiftVttTime(value, offsetMs) {
  const ms = Math.max(0, parseVttTime(value) + offsetMs);
  return formatVttTime(ms);
}

function parseSrtTime(value) {
  const match = value.match(/(\d{2}):(\d{2}):(\d{2}),(\d{3})/);
  if (!match) return 0;
  return (
    Number(match[1]) * 3600000 +
    Number(match[2]) * 60000 +
    Number(match[3]) * 1000 +
    Number(match[4])
  );
}

function parseVttTime(value) {
  const match = value.match(/(\d{2}):(\d{2}):(\d{2})\.(\d{3})/);
  if (!match) return 0;
  return (
    Number(match[1]) * 3600000 +
    Number(match[2]) * 60000 +
    Number(match[3]) * 1000 +
    Number(match[4])
  );
}

function formatSrtTime(ms) {
  const total = Math.max(0, ms);
  const hours = String(Math.floor(total / 3600000)).padStart(2, "0");
  const minutes = String(Math.floor((total % 3600000) / 60000)).padStart(2, "0");
  const seconds = String(Math.floor((total % 60000) / 1000)).padStart(2, "0");
  const millis = String(total % 1000).padStart(3, "0");
  return `${hours}:${minutes}:${seconds},${millis}`;
}

function formatVttTime(ms) {
  const total = Math.max(0, ms);
  const hours = String(Math.floor(total / 3600000)).padStart(2, "0");
  const minutes = String(Math.floor((total % 3600000) / 60000)).padStart(2, "0");
  const seconds = String(Math.floor((total % 60000) / 1000)).padStart(2, "0");
  const millis = String(total % 1000).padStart(3, "0");
  return `${hours}:${minutes}:${seconds}.${millis}`;
}

function parsePageRanges(value, pageCount) {
  return uniqueList(
    value
      .split(",")
      .flatMap((part) => {
        const trimmed = part.trim();
        if (!trimmed) return [];
        if (trimmed.includes("-")) {
          const [startText, endText] = trimmed.split("-");
          const start = Number(startText);
          const end = Number(endText);
          if (!Number.isFinite(start) || !Number.isFinite(end)) return [];
          const range = [];
          for (let index = start; index <= end; index += 1) {
            if (index >= 1 && index <= pageCount) range.push(index - 1);
          }
          return range;
        }
        const page = Number(trimmed);
        return Number.isFinite(page) && page >= 1 && page <= pageCount ? [page - 1] : [];
      })
      .sort((left, right) => left - right)
  );
}

async function loadLibrary(name) {
  const info = LIBRARIES[name];
  if (!info) throw new Error(`Unknown library: ${name}`);
  if (window[info.global]) {
    if (name === "pdfjs") {
      pdfjsLib.GlobalWorkerOptions.workerSrc = info.worker;
    }
    return window[info.global];
  }

  if (!libraryCache[name]) {
    if (info.type === "module") {
      libraryCache[name] = import(info.src).then((module) => {
        if (info.worker && module.GlobalWorkerOptions) {
          module.GlobalWorkerOptions.workerSrc = info.worker;
        }
        window[info.global] = module;
        return module;
      });
      return libraryCache[name];
    }

    libraryCache[name] = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = info.src;
      script.async = true;
      script.crossOrigin = "anonymous";
      script.referrerPolicy = "no-referrer";
      script.onload = () => {
        if (name === "pdfjs") {
          pdfjsLib.GlobalWorkerOptions.workerSrc = info.worker;
        }
        resolve(window[info.global]);
      };
      script.onerror = () => reject(new Error(`${name} library failed to load.`));
      document.head.appendChild(script);
    });
  }

  return libraryCache[name];
}

function detectMetadataImageKind(file, bytes) {
  const type = (file.type || "").toLowerCase();
  const name = file.name.toLowerCase();
  if (isJpegBytes(bytes) || type === "image/jpeg" || /\.(jpe?g)$/.test(name)) {
    return { id: "jpeg", mime: "image/jpeg", ext: "jpg" };
  }
  if (isPngBytes(bytes) || type === "image/png" || name.endsWith(".png")) {
    return { id: "png", mime: "image/png", ext: "png" };
  }
  if (isWebpBytes(bytes) || type === "image/webp" || name.endsWith(".webp")) {
    return { id: "webp", mime: "image/webp", ext: "webp" };
  }
  return null;
}

function inspectImageMetadata(bytes, kind) {
  if (kind.id === "jpeg") return inspectJpegMetadata(bytes);
  if (kind.id === "png") return inspectPngMetadata(bytes);
  if (kind.id === "webp") return inspectWebpMetadata(bytes);
  return [];
}

function removeImageMetadata(bytes, kind) {
  if (kind.id === "jpeg") return stripJpegMetadata(bytes);
  if (kind.id === "png") return stripPngMetadata(bytes);
  if (kind.id === "webp") return stripWebpMetadata(bytes);
  return { bytes, removedLabels: [] };
}

function renderMetadataList(container, labels, resultSize, originalSize, cleaned) {
  const labelText = labels.length ? describeMetadataLabels(labels) : "감지된 항목 없음";
  const rows = [
    ["상태", cleaned ? "정리 완료" : "분석 완료"],
    ["메타데이터", labelText],
    ["파일 크기", cleaned ? `${formatBytes(originalSize)} → ${formatBytes(resultSize)}` : formatBytes(originalSize)],
  ];

  container.innerHTML = rows
    .map(([label, value]) => `<div class="file-item"><span>${escapeHtml(label)}</span><span>${escapeHtml(value)}</span></div>`)
    .join("");
}

function describeMetadataLabels(labels) {
  return uniqueList(labels).join(", ");
}

function isJpegBytes(bytes) {
  return bytes.length > 3 && bytes[0] === 0xff && bytes[1] === 0xd8;
}

function isPngBytes(bytes) {
  const signature = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
  return signature.every((value, index) => bytes[index] === value);
}

function isWebpBytes(bytes) {
  return bytes.length > 12 && readAscii(bytes, 0, 4) === "RIFF" && readAscii(bytes, 8, 4) === "WEBP";
}

function inspectJpegMetadata(bytes) {
  return stripJpegMetadata(bytes, true).removedLabels;
}

function stripJpegMetadata(bytes, inspectOnly = false) {
  if (!isJpegBytes(bytes)) return { bytes, removedLabels: [] };
  const parts = inspectOnly ? [] : [bytes.slice(0, 2)];
  const removedLabels = [];
  let offset = 2;

  while (offset < bytes.length) {
    const markerStart = offset;
    if (bytes[offset] !== 0xff) {
      if (!inspectOnly) parts.push(bytes.slice(offset));
      break;
    }

    while (bytes[offset] === 0xff) offset += 1;
    const marker = bytes[offset];
    offset += 1;

    if (marker === 0xda || marker === 0xd9) {
      if (!inspectOnly) parts.push(bytes.slice(markerStart));
      break;
    }

    if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
      if (!inspectOnly) parts.push(bytes.slice(markerStart, offset));
      continue;
    }

    if (offset + 2 > bytes.length) break;
    const length = (bytes[offset] << 8) | bytes[offset + 1];
    const segmentEnd = offset + length;
    if (length < 2 || segmentEnd > bytes.length) {
      if (!inspectOnly) parts.push(bytes.slice(markerStart));
      break;
    }

    const data = bytes.slice(offset + 2, segmentEnd);
    const label = classifyJpegMetadataSegment(marker, data);
    if (label) {
      removedLabels.push(label);
    } else if (!inspectOnly) {
      parts.push(bytes.slice(markerStart, segmentEnd));
    }

    offset = segmentEnd;
  }

  return {
    bytes: inspectOnly ? bytes : concatUint8Arrays(parts),
    removedLabels: uniqueList(removedLabels),
  };
}

function classifyJpegMetadataSegment(marker, data) {
  if (marker === 0xe1 && startsWithAscii(data, "Exif\0\0")) return "EXIF";
  if (marker === 0xe1 && startsWithAscii(data, "http://ns.adobe.com/xap/1.0/")) return "XMP";
  if (marker === 0xed && startsWithAscii(data, "Photoshop 3.0")) return "IPTC";
  if (marker === 0xfe) return "Comment";
  return "";
}

function inspectPngMetadata(bytes) {
  return stripPngMetadata(bytes, true).removedLabels;
}

function stripPngMetadata(bytes, inspectOnly = false) {
  if (!isPngBytes(bytes)) return { bytes, removedLabels: [] };
  const parts = inspectOnly ? [] : [bytes.slice(0, 8)];
  const removedLabels = [];
  let offset = 8;
  const removable = new Set(["eXIf", "tEXt", "zTXt", "iTXt", "tIME"]);
  const labels = {
    eXIf: "EXIF",
    tEXt: "Text",
    zTXt: "Compressed text",
    iTXt: "International text",
    tIME: "Timestamp",
  };

  while (offset + 12 <= bytes.length) {
    const length = readUint32be(bytes, offset);
    const type = readAscii(bytes, offset + 4, 4);
    const chunkEnd = offset + 12 + length;
    if (chunkEnd > bytes.length) break;

    if (removable.has(type)) {
      removedLabels.push(labels[type] || type);
    } else if (!inspectOnly) {
      parts.push(bytes.slice(offset, chunkEnd));
    }

    offset = chunkEnd;
    if (type === "IEND") break;
  }

  return {
    bytes: inspectOnly ? bytes : concatUint8Arrays(parts),
    removedLabels: uniqueList(removedLabels),
  };
}

function inspectWebpMetadata(bytes) {
  return stripWebpMetadata(bytes, true).removedLabels;
}

function stripWebpMetadata(bytes, inspectOnly = false) {
  if (!isWebpBytes(bytes)) return { bytes, removedLabels: [] };
  const chunks = [];
  const removedTypes = new Set();
  const removedLabels = [];
  let offset = 12;

  while (offset + 8 <= bytes.length) {
    const type = readAscii(bytes, offset, 4);
    const length = readUint32le(bytes, offset + 4);
    const dataStart = offset + 8;
    const dataEnd = dataStart + length;
    const paddedEnd = dataEnd + (length % 2);
    if (dataEnd > bytes.length) break;

    if (type === "EXIF" || type === "XMP ") {
      removedTypes.add(type);
      removedLabels.push(type === "EXIF" ? "EXIF" : "XMP");
    } else if (!inspectOnly) {
      chunks.push({
        type,
        data: bytes.slice(dataStart, dataEnd),
        pad: length % 2 ? bytes.slice(dataEnd, paddedEnd) : new Uint8Array(0),
      });
    }

    offset = paddedEnd;
  }

  if (inspectOnly) return { bytes, removedLabels: uniqueList(removedLabels) };

  const parts = [asciiBytes("RIFF"), new Uint8Array(4), asciiBytes("WEBP")];
  for (const chunk of chunks) {
    let data = chunk.data;
    if (chunk.type === "VP8X" && data.length > 0) {
      data = data.slice();
      if (removedTypes.has("EXIF")) data[0] &= ~0x08;
      if (removedTypes.has("XMP ")) data[0] &= ~0x04;
    }
    parts.push(asciiBytes(chunk.type), writeUint32le(data.length), data);
    if (data.length % 2) parts.push(new Uint8Array([0]));
  }

  const output = concatUint8Arrays(parts);
  writeUint32leInto(output, 4, output.length - 8);
  return { bytes: output, removedLabels: uniqueList(removedLabels) };
}

function readAscii(bytes, offset, length) {
  let value = "";
  for (let index = 0; index < length; index += 1) {
    value += String.fromCharCode(bytes[offset + index] || 0);
  }
  return value;
}

function startsWithAscii(bytes, text) {
  if (bytes.length < text.length) return false;
  for (let index = 0; index < text.length; index += 1) {
    if (bytes[index] !== text.charCodeAt(index)) return false;
  }
  return true;
}

function asciiBytes(text) {
  const bytes = new Uint8Array(text.length);
  for (let index = 0; index < text.length; index += 1) bytes[index] = text.charCodeAt(index);
  return bytes;
}

function readUint32be(bytes, offset) {
  return ((bytes[offset] << 24) | (bytes[offset + 1] << 16) | (bytes[offset + 2] << 8) | bytes[offset + 3]) >>> 0;
}

function readUint32le(bytes, offset) {
  return (bytes[offset] | (bytes[offset + 1] << 8) | (bytes[offset + 2] << 16) | (bytes[offset + 3] << 24)) >>> 0;
}

function writeUint32le(value) {
  const bytes = new Uint8Array(4);
  writeUint32leInto(bytes, 0, value);
  return bytes;
}

function writeUint32leInto(bytes, offset, value) {
  bytes[offset] = value & 0xff;
  bytes[offset + 1] = (value >>> 8) & 0xff;
  bytes[offset + 2] = (value >>> 16) & 0xff;
  bytes[offset + 3] = (value >>> 24) & 0xff;
}

function concatUint8Arrays(parts) {
  const total = parts.reduce((sum, part) => sum + part.length, 0);
  const output = new Uint8Array(total);
  let offset = 0;
  for (const part of parts) {
    output.set(part, offset);
    offset += part.length;
  }
  return output;
}

async function loadImageFromFile(file) {
  const image = new Image();
  const objectUrl = URL.createObjectURL(file);
  image.src = objectUrl;
  await image.decode();
  URL.revokeObjectURL(objectUrl);
  return { image };
}

async function convertImageFileToPngBytes(file) {
  const loaded = await loadImageFromFile(file);
  const canvas = document.createElement("canvas");
  drawImageToCanvas(canvas, loaded.image, loaded.image.naturalWidth, loaded.image.naturalHeight);
  const blob = await canvasToBlob(canvas, "image/png", 1);
  return new Uint8Array(await blob.arrayBuffer());
}

function drawImageToCanvas(canvas, image, width, height, backgroundColor = null) {
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (backgroundColor) {
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, width, height);
  } else {
    context.clearRect(0, 0, width, height);
  }
  context.drawImage(image, 0, 0, width, height);
}

function canvasToBlob(canvas, type, quality) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error("Canvas export failed"));
        return;
      }
      resolve(blob);
    }, type, quality);
  });
}

function buildImageName(originalName, suffix, extOverride = null) {
  const base = originalName.replace(/\.[^.]+$/, "");
  const ext = extOverride || originalName.split(".").pop();
  return `${sanitizeFilename(base)}-${suffix}.${ext}`;
}

function getExtensionForMime(type) {
  if (type === "image/jpeg") return "jpg";
  if (type === "image/webp") return "webp";
  return "png";
}

function convertMarkdownTableToTsv(text) {
  const result = convertAiTableInput(text, {
    stripCellFormatting: true,
    linksAsText: true,
    collapseCellWhitespace: true,
    removeEmptyRows: true,
    removeEmptyColumns: true,
  });
  return result.tables[0] ? tableToTsv(result.tables[0]) : "";
}

function convertAiTableInput(text, options = {}) {
  const normalized = normalizeNewlines(text);
  const parseOptions = {
    stripCellFormatting: options.stripCellFormatting !== false,
    linksAsText: options.linksAsText !== false,
    collapseCellWhitespace: options.collapseCellWhitespace !== false,
    removeEmptyRows: options.removeEmptyRows !== false,
    removeEmptyColumns: options.removeEmptyColumns !== false,
  };
  const tables = [
    ...extractMarkdownTables(normalized, parseOptions),
    ...extractLoosePipeTables(normalized, parseOptions),
    ...extractDelimitedTables(normalized, parseOptions),
  ];
  const seen = new Set();
  const uniqueTables = [];

  for (const table of tables) {
    const key = tableToTsv(table);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    uniqueTables.push(table);
  }

  return { tables: uniqueTables };
}

function extractMarkdownTables(text, options) {
  const lines = stripFenceOnlyLines(text).split("\n");
  const tables = [];
  let index = 0;

  while (index < lines.length - 1) {
    const header = splitMarkdownTableRow(lines[index]);
    const separator = splitMarkdownTableRow(lines[index + 1]);
    if (!isUsableTableRow(header) || !isMarkdownSeparatorRow(separator)) {
      index += 1;
      continue;
    }

    const rawRows = [header];
    index += 2;
    while (index < lines.length) {
      const cells = splitMarkdownTableRow(lines[index]);
      if (!isUsableTableRow(cells)) break;
      rawRows.push(cells);
      index += 1;
    }

    const table = normalizeAiTableRows(rawRows, "마크다운 표", options);
    if (table) tables.push(table);
  }

  return tables;
}

function extractLoosePipeTables(text, options) {
  const lines = stripFenceOnlyLines(text).split("\n");
  const tables = [];
  let block = [];
  let skippingMarkdownRows = false;

  for (const line of lines) {
    const cells = splitMarkdownTableRow(line);
    const isSeparator = isMarkdownSeparatorRow(cells);
    if (isSeparator) {
      flush();
      skippingMarkdownRows = true;
      continue;
    }
    if (isUsableTableRow(cells) && !isSeparator) {
      if (skippingMarkdownRows) continue;
      block.push(cells);
      continue;
    }
    skippingMarkdownRows = false;
    flush();
  }
  flush();

  return tables;

  function flush() {
    if (block.length >= 2) {
      const table = normalizeAiTableRows(block, "파이프 표", options);
      if (table) tables.push(table);
    }
    block = [];
  }
}

function extractDelimitedTables(text, options) {
  const lines = stripFenceOnlyLines(text)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const tables = [];

  for (const delimiter of ["\t", ","]) {
    let block = [];
    const flushBlock = () => {
      if (block.length >= 2 && hasConsistentColumnCount(block)) {
        const sourceLabel = delimiter === "\t" ? "TSV 표" : "CSV 표";
        const table = normalizeAiTableRows(block, sourceLabel, options);
        if (table) tables.push(table);
      }
      block = [];
    };

    for (const line of lines) {
      const cells = delimiter === "\t" ? line.split("\t").map((cell) => cell.trim()) : splitCsvLine(line);
      if (isUsableTableRow(cells)) {
        block.push(cells);
        continue;
      }
      flushBlock();
    }
    flushBlock();
  }

  return tables;
}

function hasConsistentColumnCount(rows) {
  if (!rows.length) return false;
  const counts = rows.map((row) => row.length);
  const first = counts[0];
  return first >= 2 && counts.every((count) => count === first);
}

function stripFenceOnlyLines(text) {
  return normalizeNewlines(text).replace(/^\s*```[\w-]*\s*$/gm, "");
}

function splitMarkdownTableRow(line) {
  const source = String(line || "").trim();
  if (!source.includes("|")) return [];

  const cells = [];
  let cell = "";
  for (let index = 0; index < source.length; index += 1) {
    const char = source[index];
    if (char === "\\") {
      if (source[index + 1] === "|") {
        cell += "|";
        index += 1;
      } else {
        cell += char;
      }
      continue;
    }
    if (char === "|") {
      cells.push(cell.trim());
      cell = "";
      continue;
    }
    cell += char;
  }
  cells.push(cell.trim());

  if (source.startsWith("|") && cells[0] === "") cells.shift();
  if (source.endsWith("|") && cells[cells.length - 1] === "") cells.pop();
  return cells;
}

function isUsableTableRow(cells) {
  return cells.length >= 2 && cells.some((cell) => String(cell || "").trim());
}

function isMarkdownSeparatorRow(cells) {
  return (
    cells.length >= 2 &&
    cells.every((cell) => {
      const compact = String(cell || "").replace(/\s/g, "");
      return /^:?-{3,}:?$/.test(compact);
    })
  );
}

function splitCsvLine(line) {
  const cells = [];
  let cell = "";
  let quoted = false;
  const source = String(line || "");

  for (let index = 0; index < source.length; index += 1) {
    const char = source[index];
    if (char === "\"") {
      if (quoted && source[index + 1] === "\"") {
        cell += "\"";
        index += 1;
      } else {
        quoted = !quoted;
      }
      continue;
    }
    if (char === "," && !quoted) {
      cells.push(cell.trim());
      cell = "";
      continue;
    }
    cell += char;
  }

  cells.push(cell.trim());
  return cells.length >= 2 ? cells : [];
}

function normalizeAiTableRows(rawRows, sourceLabel, options) {
  if (!Array.isArray(rawRows) || rawRows.length < 2) return null;
  const width = rawRows.reduce((max, row) => Math.max(max, row.length), 0);
  if (width < 2) return null;

  let rows = rawRows.map((row) =>
    Array.from({ length: width }, (_, index) => cleanAiTableCell(row[index] || "", options))
  );

  if (options.removeEmptyRows) {
    rows = rows.filter((row) => row.some((cell) => cell.trim()));
  }
  if (rows.length < 2) return null;

  if (options.removeEmptyColumns) {
    const keepIndexes = [];
    for (let column = 0; column < width; column += 1) {
      if (rows.some((row) => row[column]?.trim())) keepIndexes.push(column);
    }
    rows = rows.map((row) => keepIndexes.map((column) => row[column] || ""));
  }
  if (!rows[0] || rows[0].length < 2 || rows.length < 2) return null;

  const headers = rows[0].map((cell, index) => cell || `열 ${index + 1}`);
  return {
    sourceLabel,
    headers,
    rows: rows.slice(1),
  };
}

function cleanAiTableCell(value, options) {
  let cell = normalizeNewlines(value)
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .trim();

  if (options.stripCellFormatting) {
    cell = cell
      .replace(/<[^>]+>/g, "")
      .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, options.linksAsText ? "$1" : "$1 - $2")
      .replace(/`{3,}[\w-]*\n?/g, "")
      .replace(/`([^`]+)`/g, "$1")
      .replace(/^#{1,6}\s+/g, "")
      .replace(/^\s*[-*+]\s+/g, "")
      .replace(/^\s*\d+\.\s+/g, "")
      .replace(/\*\*([^*]+)\*\*/g, "$1")
      .replace(/__([^_]+)__/g, "$1")
      .replace(/\*([^*]+)\*/g, "$1")
      .replace(/_([^_]+)_/g, "$1")
      .replace(/~~([^~]+)~~/g, "$1");
  }

  if (options.collapseCellWhitespace) {
    cell = cell.replace(/\s+/g, " ");
  }

  return cell.trim();
}

function renderAiTablePreview(table) {
  return `
    <table>
      <thead>
        <tr>${table.headers.map((cell) => `<th>${escapeHtml(cell)}</th>`).join("")}</tr>
      </thead>
      <tbody>
        ${table.rows
          .map((row) => `<tr>${table.headers.map((_, index) => `<td>${escapeHtml(row[index] || "")}</td>`).join("")}</tr>`)
          .join("")}
      </tbody>
    </table>
  `;
}

function tableToTsv(table) {
  return tableToMatrix(table)
    .map((row) => row.map(formatDelimitedCell).join("\t"))
    .join("\n");
}

function tableToCsv(table) {
  return tableToMatrix(table)
    .map((row) => row.map(formatCsvCell).join(","))
    .join("\n");
}

function tableToMatrix(table) {
  if (!table) return [];
  return [table.headers, ...table.rows].map((row) => table.headers.map((_, index) => row[index] || ""));
}

function formatDelimitedCell(cell) {
  return String(cell || "").replace(/[\t\r\n]+/g, " ").trim();
}

function formatCsvCell(cell) {
  const value = formatDelimitedCell(cell);
  return /[",\n]/.test(value) ? `"${value.replace(/"/g, "\"\"")}"` : value;
}

async function copyTableAsDocument(table) {
  const html = buildDocumentTableHtml(table);
  const plain = tableToTsv(table);
  if (navigator.clipboard?.write && window.ClipboardItem && window.isSecureContext) {
    await navigator.clipboard.write([
      new window.ClipboardItem({
        "text/html": new Blob([html], { type: "text/html" }),
        "text/plain": new Blob([plain], { type: "text/plain" }),
      }),
    ]);
    return;
  }
  await writeClipboard(plain);
}

function buildDocumentTableHtml(table) {
  const cellBase = "border:1px solid #cfd7e3;padding:6px 8px;text-align:left;vertical-align:top;";
  const headerStyle = `${cellBase}background:#f6f8fb;font-weight:700;`;
  const bodyStyle = `${cellBase}background:#ffffff;`;
  const headerHtml = table.headers.map((cell) => `<th style="${headerStyle}">${escapeHtml(cell)}</th>`).join("");
  const bodyHtml = table.rows
    .map((row) => `<tr>${table.headers.map((_, index) => `<td style="${bodyStyle}">${escapeHtml(row[index] || "")}</td>`).join("")}</tr>`)
    .join("");
  return [
    "<!doctype html><html><head><meta charset=\"utf-8\"></head><body>",
    "<table style=\"border-collapse:collapse;width:100%;font-family:'Malgun Gothic',Arial,sans-serif;font-size:14px;\">",
    `<thead><tr>${headerHtml}</tr></thead>`,
    `<tbody>${bodyHtml}</tbody>`,
    "</table></body></html>",
  ].join("");
}

async function convertSpreadsheetFile(file, options, XLSX) {
  if (file.size > SPREADSHEET_CONVERTER_MAX_FILE_BYTES) {
    throw new Error(`File too large: ${file.name}`);
  }

  const kind = getSpreadsheetFileKind(file);
  if (!kind) {
    throw new Error(`Unsupported spreadsheet file: ${file.name}`);
  }

  const buffer = await file.arrayBuffer();
  if (kind.source === "delimited") {
    return [convertDelimitedFileToXlsx(file, buffer, kind, options, XLSX)];
  }

  return convertXlsxFileToCsv(file, buffer, options, XLSX);
}

function convertDelimitedFileToXlsx(file, buffer, kind, options, XLSX) {
  const decoded = decodeSpreadsheetText(buffer, options.inputEncoding);
  const delimiter = resolveSpreadsheetDelimiter(decoded.text, options.delimiter, kind.id);
  const rows = normalizeSpreadsheetRows(parseDelimitedText(decoded.text, delimiter), options);
  const workbook = XLSX.utils.book_new();
  const sheet = XLSX.utils.aoa_to_sheet(rows.map((row) => row.map((cell) => (options.preserveText ? String(cell) : coerceSpreadsheetCellValue(cell)))));
  sheet["!cols"] = estimateSpreadsheetColumns(rows);
  XLSX.utils.book_append_sheet(workbook, sheet, sanitizeSheetName(getSpreadsheetBaseName(file.name) || "Sheet1"));
  const bytes = XLSX.write(workbook, { bookType: "xlsx", type: "array", compression: true });
  const outputName = `${sanitizeFilename(getSpreadsheetBaseName(file.name) || "converted")}.xlsx`;
  return {
    inputName: file.name,
    outputName,
    blob: new Blob([bytes], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    }),
    detail: `${kind.label} -> XLSX · ${rows.length.toLocaleString("ko-KR")}행 · ${decoded.encodingLabel} · ${formatDelimiterLabel(delimiter)}`,
    warning: rows.length ? "" : "읽을 수 있는 행이 없었습니다.",
    previewRows: rows,
  };
}

function convertXlsxFileToCsv(file, buffer, options, XLSX) {
  const workbook = XLSX.read(buffer, { type: "array", cellFormula: false, cellHTML: false, cellText: true });
  const sheetNames = options.sheetMode === "all" ? workbook.SheetNames : workbook.SheetNames.slice(0, 1);
  const results = [];

  for (const sheetName of sheetNames) {
    const sheet = workbook.Sheets[sheetName];
    if (!sheet) continue;
    const rows = normalizeSpreadsheetRows(
      XLSX.utils.sheet_to_json(sheet, {
        header: 1,
        defval: "",
        blankrows: !options.removeEmptyRows,
        raw: false,
      }),
      { ...options, preserveText: true }
    );
    const csv = matrixToDelimitedText(rows, ",");
    const outputName = buildSheetCsvFilename(file.name, sheetName, sheetNames.length > 1);
    results.push({
      inputName: file.name,
      outputName,
      blob: new Blob([encodeCsvOutput(csv, options.outputEncoding)], { type: "text/csv;charset=utf-8" }),
      detail: `XLSX -> CSV · ${escapeControlText(sheetName)} · ${rows.length.toLocaleString("ko-KR")}행`,
      warning: rows.length ? "" : "빈 시트이거나 내보낼 셀이 없습니다.",
      previewRows: rows,
    });
  }

  return results;
}

function getSpreadsheetFileKind(file) {
  const name = String(file?.name || "").toLowerCase();
  const type = String(file?.type || "").toLowerCase();
  if (name.endsWith(".csv") || type === "text/csv") return { id: "csv", label: "CSV", source: "delimited" };
  if (name.endsWith(".tsv") || type === "text/tab-separated-values") return { id: "tsv", label: "TSV", source: "delimited" };
  if (
    name.endsWith(".xlsx") ||
    type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ) {
    return { id: "xlsx", label: "XLSX", source: "workbook" };
  }
  return null;
}

function decodeSpreadsheetText(buffer, encoding) {
  const bytes = new Uint8Array(buffer);
  const body = hasUtf8Bom(bytes) ? bytes.subarray(3) : bytes;
  if (encoding === "utf-8" || hasUtf8Bom(bytes)) {
    return { text: decodeTextWithEncoding(body, "utf-8"), encodingLabel: hasUtf8Bom(bytes) ? "UTF-8 BOM" : "UTF-8" };
  }
  if (encoding === "cp949") {
    return { text: decodeTextWithEncoding(body, "euc-kr"), encodingLabel: "CP949/EUC-KR" };
  }

  try {
    return { text: decodeTextWithEncoding(body, "utf-8", true), encodingLabel: hasUtf8Bom(bytes) ? "UTF-8 BOM" : "UTF-8" };
  } catch {
    return { text: decodeTextWithEncoding(body, "euc-kr"), encodingLabel: "CP949/EUC-KR" };
  }
}

function hasUtf8Bom(bytes) {
  return bytes.length >= 3 && bytes[0] === 0xef && bytes[1] === 0xbb && bytes[2] === 0xbf;
}

function decodeTextWithEncoding(bytes, encoding, fatal = false) {
  return new TextDecoder(encoding, { fatal }).decode(bytes).replace(/^\ufeff/, "");
}

function resolveSpreadsheetDelimiter(text, option, fileKind) {
  if (option === "tab") return "\t";
  if (option === "," || option === ";") return option;
  if (fileKind === "tsv") return "\t";
  return detectDelimitedTextDelimiter(text);
}

function detectDelimitedTextDelimiter(text) {
  const sample = normalizeNewlines(text).split("\n").slice(0, 40).filter((line) => line.trim()).join("\n");
  const candidates = [",", "\t", ";"];
  let best = ",";
  let bestScore = -1;

  for (const delimiter of candidates) {
    const rows = parseDelimitedText(sample, delimiter).slice(0, 20);
    const counts = rows.map((row) => row.length).filter((count) => count > 1);
    if (!counts.length) continue;
    const common = mostCommonNumber(counts);
    const score = counts.filter((count) => count === common).length * common;
    if (score > bestScore) {
      bestScore = score;
      best = delimiter;
    }
  }

  return best;
}

function parseDelimitedText(text, delimiter = ",") {
  const source = normalizeNewlines(text);
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;

  for (let index = 0; index < source.length; index += 1) {
    const char = source[index];
    if (char === "\"") {
      if (quoted && source[index + 1] === "\"") {
        cell += "\"";
        index += 1;
      } else {
        quoted = !quoted;
      }
      continue;
    }
    if (char === delimiter && !quoted) {
      row.push(cell);
      cell = "";
      continue;
    }
    if (char === "\n" && !quoted) {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
      continue;
    }
    cell += char;
  }

  row.push(cell);
  rows.push(row);
  while (rows.length && rows[rows.length - 1].every((value) => String(value).trim() === "")) rows.pop();
  return rows;
}

function normalizeSpreadsheetRows(rows, options) {
  const normalized = rows.map((row) =>
    row.map((value) => {
      const text = value === null || value === undefined ? "" : String(value);
      return options.trimCells ? text.trim() : text;
    })
  );
  return options.removeEmptyRows ? normalized.filter((row) => row.some((cell) => String(cell).trim() !== "")) : normalized;
}

function coerceSpreadsheetCellValue(value) {
  const text = String(value ?? "").trim();
  if (!text) return "";
  if (/^-?\d+(\.\d+)?$/.test(text) && !/^[-+]?0\d/.test(text) && text.replace(/[-.]/g, "").length < 15) {
    return Number(text);
  }
  return text;
}

function matrixToDelimitedText(rows, delimiter = ",") {
  return rows
    .map((row) =>
      row
        .map((cell) => {
          const value = cell === null || cell === undefined ? "" : String(cell);
          return value.includes("\"") || value.includes("\n") || value.includes("\r") || value.includes(delimiter)
            ? `"${value.replace(/"/g, "\"\"")}"`
            : value;
        })
        .join(delimiter)
    )
    .join("\r\n");
}

function encodeCsvOutput(text, outputEncoding) {
  return outputEncoding === "utf8bom" ? `\ufeff${text}` : text;
}

function estimateSpreadsheetColumns(rows) {
  const width = Math.min(30, rows.reduce((max, row) => Math.max(max, row.length), 0));
  return Array.from({ length: width }, (_, column) => {
    const maxLength = rows.slice(0, 100).reduce((max, row) => Math.max(max, String(row[column] || "").length), 0);
    return { wch: clampNumber(maxLength + 2, 8, 34) };
  });
}

function renderSpreadsheetPreview(rows) {
  if (!rows?.length) return `<p class="tool-note">미리볼 행이 없습니다.</p>`;
  const sample = rows.slice(0, 8);
  const width = Math.min(8, rows.reduce((max, row) => Math.max(max, row.length), 0));
  return `
    <table>
      <tbody>
        ${sample
          .map((row) => `<tr>${Array.from({ length: width }, (_, index) => `<td>${escapeHtml(row[index] ?? "")}</td>`).join("")}</tr>`)
          .join("")}
      </tbody>
    </table>
  `;
}

function mostCommonNumber(values) {
  const counts = new Map();
  values.forEach((value) => counts.set(value, (counts.get(value) || 0) + 1));
  return [...counts].sort((left, right) => right[1] - left[1])[0]?.[0] || 0;
}

function getSpreadsheetBaseName(name) {
  return String(name || "").replace(/\.[^.]+$/, "");
}

function sanitizeSheetName(name) {
  const cleaned = String(name || "Sheet1")
    .replace(/[\[\]:*?/\\]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 31);
  return cleaned || "Sheet1";
}

function buildSheetCsvFilename(fileName, sheetName, includeSheetName) {
  const base = sanitizeFilename(getSpreadsheetBaseName(fileName) || "converted");
  const suffix = includeSheetName ? `-${sanitizeFilename(escapeControlText(sheetName)).slice(0, 40) || "sheet"}` : "";
  return `${base}${suffix}.csv`;
}

function makeUniqueOutputName(name, usedNames) {
  const safeName = sanitizeFilename(name || "converted");
  if (!usedNames.has(safeName)) {
    usedNames.add(safeName);
    return safeName;
  }
  const dotIndex = safeName.lastIndexOf(".");
  const base = dotIndex > 0 ? safeName.slice(0, dotIndex) : safeName;
  const ext = dotIndex > 0 ? safeName.slice(dotIndex) : "";
  let counter = 2;
  while (usedNames.has(`${base}-${counter}${ext}`)) counter += 1;
  const nextName = `${base}-${counter}${ext}`;
  usedNames.add(nextName);
  return nextName;
}

function formatDelimiterLabel(delimiter) {
  if (delimiter === "\t") return "탭";
  if (delimiter === ";") return "세미콜론";
  return "쉼표";
}

function escapeControlText(value) {
  return String(value || "").replace(/[\u0000-\u001f\u007f]/g, " ").trim();
}

function normalizeNewlines(text) {
  return String(text || "").replace(/\r\n?/g, "\n");
}

function formatClock(totalSeconds) {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function formatMinutes(value) {
  if (!Number.isFinite(value) || value <= 0) return "0분";
  const minutes = Math.max(1, Math.round(value));
  return `${minutes}분`;
}

function formatBytes(bytes) {
  if (!Number.isFinite(bytes)) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  let index = 0;
  let value = bytes;
  while (value >= 1024 && index < units.length - 1) {
    value /= 1024;
    index += 1;
  }
  return `${value.toFixed(index === 0 ? 0 : 1)} ${units[index]}`;
}

function uniqueList(values) {
  return Array.from(new Set(values));
}

function clampNumber(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function sanitizeFilename(name) {
  return name.trim().replace(/[\\/:*?"<>|]/g, "_") || "download";
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function downloadText(text, filename) {
  downloadBlob(new Blob([text], { type: "text/plain;charset=utf-8" }), filename);
}

function downloadBlob(blob, filename) {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(link.href);
}

async function safeCopy(text, successMessage) {
  try {
    await writeClipboard(text);
    showToast(successMessage);
  } catch (error) {
    showToast("브라우저에서 복사를 허용하지 않았습니다.");
  }
}

async function writeClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const helper = document.createElement("textarea");
  helper.value = text;
  helper.setAttribute("readonly", "");
  helper.style.position = "fixed";
  helper.style.top = "-1000px";
  helper.style.opacity = "0";
  document.body.appendChild(helper);
  helper.select();
  const copied = document.execCommand("copy");
  helper.remove();
  if (!copied) {
    throw new Error("Clipboard fallback failed");
  }
}

function showToast(message) {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();
  const toast = document.createElement("div");
  toast.className = "toast";
  const notice = IS_KOREAN_LOCALE ? formatUserNotice(message) : translateWorkspaceText(formatUserNotice(message));
  toast.textContent = notice;
  document.body.appendChild(toast);
  window.setTimeout(() => toast.remove(), notice.includes(SUPPORT_EMAIL) ? 6400 : 3200);
}

function formatUserNotice(message) {
  const text = String(message || "").trim();
  if (!text || text.includes(SUPPORT_EMAIL)) return text;
  return shouldIncludeSupportContact(text) ? `${text} ${SUPPORT_CONTACT_MESSAGE}` : text;
}

function shouldIncludeSupportContact(message) {
  return SUPPORT_ERROR_PATTERNS.some((pattern) => pattern.test(message));
}

function handleGlobalAppError(event) {
  if (shouldIgnoreGlobalAppError(event)) {
    event?.preventDefault?.();
    return;
  }
  showToast(`예상하지 못한 오류가 발생했습니다. ${SUPPORT_CONTACT_MESSAGE}`);
}

function shouldIgnoreGlobalAppError(event) {
  if (!event) return false;

  if (event.type === "unhandledrejection" && event.reason === undefined) {
    return true;
  }

  const sourceUrl = event.filename || event.reason?.fileName || event.reason?.sourceURL || "";
  const message = String(event.message || event.reason?.message || event.reason || "");
  if (/adsbygoogle|googlesyndication|doubleclick|pagead/i.test(`${sourceUrl} ${message}`)) {
    return true;
  }

  if (!sourceUrl) return false;

  try {
    const source = new URL(sourceUrl, window.location.href);
    return source.origin !== window.location.origin;
  } catch {
    return false;
  }
}

function handleSelectionPointerDown(event) {
  if (els.selectionCopyBtn.contains(event.target)) {
    return;
  }

  appState.selectionPointerDown = { x: event.clientX, y: event.clientY };

  if (els.selectionCopyBtn.hidden) {
    return;
  }

  const info = getSelectedTextInfo();
  appState.selectionDismissedByPointer = true;
  appState.dismissedSelectionText = info?.text.trim() || "";
  clearCurrentSelection();
  hideSelectionCopyButton();
}

function handleSelectionPointerUp(event) {
  appState.lastPointer = { x: event.clientX, y: event.clientY };

  const start = appState.selectionPointerDown;
  const moved =
    start && Math.hypot(event.clientX - start.x, event.clientY - start.y) > 6;
  appState.selectionPointerDown = null;

  if (moved) {
    appState.dismissedSelectionText = "";
    appState.selectionDismissedByPointer = false;
    queueSelectionCheck();
    return;
  }

  if (appState.selectionDismissedByPointer) {
    appState.selectionDismissedByPointer = false;
    hideSelectionCopyButton();
    return;
  }

  queueSelectionCheck();
}

function handleSelectionKeyUp() {
  appState.dismissedSelectionText = "";
  appState.selectionDismissedByPointer = false;
  queueSelectionCheck();
}

function queueSelectionCheck() {
  if (appState.selectionCheckTimerId) {
    window.clearTimeout(appState.selectionCheckTimerId);
  }

  appState.selectionCheckTimerId = window.setTimeout(() => {
    appState.selectionCheckTimerId = null;
    updateSelectionCopyButton();
  }, 0);
}

function updateSelectionCopyButton() {
  const info = getSelectedTextInfo();
  if (!info || !info.text.trim()) {
    appState.dismissedSelectionText = "";
    appState.selectionDismissedByPointer = false;
    hideSelectionCopyButton();
    return;
  }

  const selectedText = info.text.trim();
  if (appState.selectionDismissedByPointer) {
    hideSelectionCopyButton();
    return;
  }

  if (appState.dismissedSelectionText && selectedText === appState.dismissedSelectionText) {
    hideSelectionCopyButton();
    return;
  }

  appState.dismissedSelectionText = "";
  appState.selectionDismissedByPointer = false;
  appState.selectedText = info.text;
  positionSelectionCopyButton(info);
  els.selectionCopyBtn.hidden = false;
}

function clearCurrentSelection() {
  const active = document.activeElement;
  if (active && (active.tagName === "TEXTAREA" || isTextInput(active))) {
    const caret = active.selectionEnd ?? active.value.length;
    active.setSelectionRange(caret, caret);
  }

  const selection = window.getSelection();
  if (selection && selection.rangeCount > 0) {
    selection.removeAllRanges();
  }
}

function getSelectedTextInfo() {
  const active = document.activeElement;
  if (active && (active.tagName === "TEXTAREA" || isTextInput(active))) {
    const start = active.selectionStart;
    const end = active.selectionEnd;
    if (typeof start === "number" && typeof end === "number" && end > start) {
      return {
        text: active.value.slice(start, end),
        rect: active.getBoundingClientRect(),
        usePointer: true,
      };
    }
  }

  const selection = window.getSelection();
  if (!selection || selection.isCollapsed || selection.rangeCount === 0) {
    return null;
  }

  const text = selection.toString();
  const range = selection.getRangeAt(0);
  return { text, rect: range.getBoundingClientRect(), usePointer: false };
}

function isTextInput(node) {
  return node.tagName === "INPUT" && ["text", "search", "url"].includes(node.type);
}

function positionSelectionCopyButton(selection) {
  const rect = selection.rect;
  const width = 92;
  const height = 34;
  let left = appState.lastPointer.x - width / 2;
  let top = appState.lastPointer.y - height - 12;

  if (!selection.usePointer && rect && rect.width > 0) {
    left = rect.left + rect.width / 2 - width / 2;
    top = rect.top - height - 10;
  }

  left = Math.max(8, Math.min(left, window.innerWidth - width - 8));
  top = Math.max(8, Math.min(top, window.innerHeight - height - 8));

  els.selectionCopyBtn.style.left = `${left}px`;
  els.selectionCopyBtn.style.top = `${top}px`;
}

function hideSelectionCopyButton() {
  appState.selectedText = "";
  els.selectionCopyBtn.hidden = true;
}

async function copySelectedText() {
  if (!appState.selectedText.trim()) {
    hideSelectionCopyButton();
    return;
  }
  await safeCopy(appState.selectedText, t("selectionCopied"));
  hideSelectionCopyButton();
}

function renderQuickToolDock(activeTool) {
  const dock = ensureQuickToolDock();
  if (!dock) return;

  if (!activeTool) {
    dock.hidden = true;
    dock.innerHTML = "";
    return;
  }

  const tools = TOOL_DEFS_ACTIVE.filter((tool) => tool.id !== activeTool.id);
  const pageSize = 10;
  const step = 5;
  const maxOffset = Math.max(0, tools.length - pageSize);
  appState.quickOffset = Math.min(Math.max(appState.quickOffset, 0), maxOffset);
  const visible = tools.slice(appState.quickOffset, appState.quickOffset + pageSize);
  const motionClass = appState.quickMotion ? ` is-sliding-${appState.quickMotion}` : "";

  dock.hidden = false;
  dock.innerHTML = `
    <div class="quick-tool-head">
      <strong>${escapeHtml(t("otherTools"))}</strong>
      <span>${appState.quickOffset + 1}-${Math.min(appState.quickOffset + pageSize, tools.length)} / ${tools.length}</span>
    </div>
    <div class="quick-tool-strip" aria-label="${escapeHtml(t("otherTools"))}">
      <button class="quick-tool-arrow" type="button" data-shift="${-step}" aria-label="${escapeHtml(t("previousTools") || (IS_ENGLISH_LOCALE ? "Previous tools" : "이전 도구 보기"))}" ${appState.quickOffset === 0 ? "disabled" : ""}>‹</button>
      <div class="quick-tool-icons${motionClass}">
        ${visible.map(renderQuickToolIcon).join("")}
      </div>
      <button class="quick-tool-arrow" type="button" data-shift="${step}" aria-label="${escapeHtml(t("nextTools") || (IS_ENGLISH_LOCALE ? "Next tools" : "다음 도구 보기"))}" ${appState.quickOffset >= maxOffset ? "disabled" : ""}>›</button>
    </div>
  `;

  dock.querySelectorAll(".quick-tool-arrow").forEach((button) => {
    button.addEventListener("click", () => {
      const shift = Number(button.dataset.shift);
      const nextOffset = Math.min(maxOffset, Math.max(0, appState.quickOffset + shift));
      if (nextOffset === appState.quickOffset) return;
      appState.quickOffset = nextOffset;
      appState.quickMotion = shift > 0 ? "next" : "prev";
      renderQuickToolDock(activeTool);
    });
  });

  if (appState.quickMotion) {
    const icons = dock.querySelector(".quick-tool-icons");
    const currentMotion = appState.quickMotion;
    const clearMotion = () => {
      icons?.classList.remove(`is-sliding-${currentMotion}`);
      if (appState.quickMotion === currentMotion) appState.quickMotion = "";
    };
    window.clearTimeout(appState.quickMotionTimerId);
    icons?.addEventListener("animationend", clearMotion, { once: true });
    appState.quickMotionTimerId = window.setTimeout(clearMotion, 360);
  }
}

function ensureQuickToolDock() {
  let dock = document.querySelector("#quickToolDock");
  if (dock) return dock;

  const infoGrid = document.querySelector(".info-grid");
  if (!infoGrid || !infoGrid.parentElement) return null;

  dock = document.createElement("section");
  dock.id = "quickToolDock";
  dock.className = "quick-tool-dock";
  infoGrid.parentElement.insertBefore(dock, infoGrid);
  return dock;
}

function renderQuickToolIcon(tool) {
  const visual = getToolVisual(tool);

  return `
    <a class="quick-tool-item" href="${tool.path}" data-tone="${escapeHtml(visual.tone)}" title="${escapeHtml(tool.title)}" aria-label="${escapeHtml(t("openToolLabel", tool.title))}">
      <span class="quick-tool-icon" aria-hidden="true">
        <span class="quick-tool-symbol">${escapeHtml(visual.icon)}</span>
      </span>
      <span class="quick-tool-label">${escapeHtml(tool.title)}</span>
    </a>
  `;
}

function renderMarkdownViewer(container) {
  const copy = APP_LOCALE === "en"
    ? {
        loadTitle: "Open Markdown File",
        loadNote: "Files stay in your browser. Raw HTML inside Markdown is escaped before preview.",
        dropTitle: "Choose or drop an MD file",
        dropHint: ".md, .markdown, and .txt files up to 8 MB",
        readerTitle: "Document",
        emptyTitle: "No file loaded",
        emptyText: "Choose a Markdown file to show the document here.",
        outlineTitle: "Outline",
        outlineEmpty: "Headings appear here after loading a file.",
        sourceTitle: "Source",
        statsEmpty: "No file loaded",
        viewLabel: "View",
        previewMode: "Preview",
        splitMode: "Split",
        sourceMode: "Source",
        themeLabel: "Theme",
        lightTheme: "Light",
        paperTheme: "Paper",
        darkTheme: "Dark",
        fontLabel: "Font",
        lineLabel: "Line",
        openWindow: "Open window/edit",
        windowTitle: "Markdown Workspace",
        editorTitle: "Edit MD",
        saveEdited: "Save MD",
        closeWindow: "Close",
        copySource: "Copy MD",
        copyText: "Copy text",
        sourceCopied: "Markdown source copied.",
        textCopied: "Plain text copied.",
        noCopy: "Nothing to copy yet.",
        popupBlocked: "Allow pop-ups to open the Markdown workspace.",
        loaded: "Loaded",
        tooLarge: `Files up to ${formatBytes(MARKDOWN_VIEWER_MAX_BYTES)} are recommended.`,
        unsupported: "Choose an .md, .markdown, or .txt file.",
        readFail: "Could not read this file. Check the file format and try again.",
        emptyPreview: "Load a Markdown file to preview it here.",
        count: (chars, lines, headings, minutes) =>
          `${chars.toLocaleString("en-US")} chars · ${lines.toLocaleString("en-US")} lines · ${headings.toLocaleString("en-US")} headings · ${minutes} min read`,
      }
    : {
        loadTitle: "MD 파일 열기",
        loadNote: "파일은 브라우저에서만 읽습니다. MD 안의 원시 HTML은 실행하지 않고 안전하게 표시합니다.",
        dropTitle: "MD 파일 선택 또는 드래그",
        dropHint: ".md, .markdown, .txt 파일 · 최대 8MB 권장",
        readerTitle: "문서 내용",
        emptyTitle: "아직 파일을 열지 않았습니다",
        emptyText: "마크다운 파일을 선택하면 문서 내용이 여기에 표시됩니다.",
        outlineTitle: "목차",
        outlineEmpty: "파일을 열면 제목 목록이 표시됩니다.",
        sourceTitle: "원문",
        statsEmpty: "파일 없음",
        viewLabel: "보기",
        previewMode: "미리보기",
        splitMode: "분할",
        sourceMode: "원문",
        themeLabel: "테마",
        lightTheme: "밝게",
        paperTheme: "종이",
        darkTheme: "어둡게",
        fontLabel: "글자",
        lineLabel: "줄간격",
        openWindow: "새창에서 보기/편집",
        windowTitle: "MD 새창 작업 공간",
        editorTitle: "MD 편집",
        saveEdited: "MD 저장",
        closeWindow: "닫기",
        copySource: "MD 복사",
        copyText: "텍스트 복사",
        sourceCopied: "마크다운 원문을 복사했습니다.",
        textCopied: "일반 텍스트를 복사했습니다.",
        noCopy: "복사할 내용이 없습니다.",
        popupBlocked: "새창 작업 공간을 열 수 있도록 팝업을 허용해 주세요.",
        loaded: "불러옴",
        tooLarge: `${formatBytes(MARKDOWN_VIEWER_MAX_BYTES)} 이하 파일부터 권장합니다.`,
        unsupported: ".md, .markdown, .txt 파일을 선택해 주세요.",
        readFail: "파일을 읽지 못했습니다. 형식과 인코딩을 확인해 주세요.",
        emptyPreview: "마크다운 파일을 불러오면 미리보기가 표시됩니다.",
        count: (chars, lines, headings, minutes) =>
          `${chars.toLocaleString("ko-KR")}자 · ${lines.toLocaleString("ko-KR")}줄 · 제목 ${headings.toLocaleString("ko-KR")}개 · 약 ${minutes}분`,
      };

  container.innerHTML = `
    <div class="tool-section markdown-viewer-tool">
      <section class="input-card markdown-viewer-loader">
        <div class="section-heading">
          <div>
            <h2>${escapeHtml(copy.loadTitle)}</h2>
            <p class="tool-note">${escapeHtml(copy.loadNote)}</p>
          </div>
          <div class="action-row compact-actions">
            <button id="markdownViewerOpenWindow" type="button">${escapeHtml(copy.openWindow)}</button>
            <button id="markdownViewerCopySource" type="button">${escapeHtml(copy.copySource)}</button>
            <button id="markdownViewerCopyText" type="button">${escapeHtml(copy.copyText)}</button>
          </div>
        </div>
        <div class="upload-box markdown-viewer-upload">
          <input id="markdownViewFile" type="file" accept=".md,.markdown,.txt,text/markdown,text/plain" />
          <strong>${escapeHtml(copy.dropTitle)}</strong>
          <span>${escapeHtml(copy.dropHint)}</span>
        </div>
        <div class="markdown-viewer-controls" aria-label="${escapeHtml(copy.readerTitle)}">
          <label>${escapeHtml(copy.viewLabel)}
            <select id="markdownViewerMode">
              <option value="preview">${escapeHtml(copy.previewMode)}</option>
              <option value="split">${escapeHtml(copy.splitMode)}</option>
              <option value="source">${escapeHtml(copy.sourceMode)}</option>
            </select>
          </label>
          <label>${escapeHtml(copy.themeLabel)}
            <select id="markdownViewerTheme">
              <option value="light">${escapeHtml(copy.lightTheme)}</option>
              <option value="paper">${escapeHtml(copy.paperTheme)}</option>
              <option value="dark">${escapeHtml(copy.darkTheme)}</option>
            </select>
          </label>
          <label>${escapeHtml(copy.fontLabel)}
            <input id="markdownViewerFont" type="range" min="14" max="22" step="1" value="17" />
            <output id="markdownViewerFontValue">17px</output>
          </label>
          <label>${escapeHtml(copy.lineLabel)}
            <input id="markdownViewerLine" type="range" min="145" max="200" step="5" value="170" />
            <output id="markdownViewerLineValue">1.70</output>
          </label>
        </div>
        <p id="markdownViewerStats" class="tool-note">${escapeHtml(copy.statsEmpty)}</p>
      </section>
      <section class="markdown-viewer-stage" data-mode="preview" data-theme="light">
        <aside class="markdown-viewer-outline" aria-labelledby="markdownViewerOutlineTitle">
          <h3 id="markdownViewerOutlineTitle">${escapeHtml(copy.outlineTitle)}</h3>
          <div id="markdownViewerOutlineList" class="markdown-viewer-outline-list">
            <p class="tool-note">${escapeHtml(copy.outlineEmpty)}</p>
          </div>
        </aside>
        <article class="result-card markdown-viewer-reader" aria-labelledby="markdownViewerReaderTitle">
          <div class="section-heading markdown-pane-head">
            <div>
              <h2 id="markdownViewerReaderTitle">${escapeHtml(copy.readerTitle)}</h2>
              <p id="markdownViewerStatus" class="tool-note">${escapeHtml(copy.emptyTitle)}</p>
            </div>
          </div>
          <div class="markdown-viewer-canvas">
            <div id="markdownViewerPreview" class="markdown-preview markdown-viewer-preview">
              <h2>${escapeHtml(copy.emptyTitle)}</h2>
              <p>${escapeHtml(copy.emptyText)}</p>
            </div>
            <pre id="markdownViewerSource" class="markdown-viewer-source" hidden></pre>
          </div>
        </article>
      </section>
    </div>
  `;

  const nodes = {
    fileInput: container.querySelector("#markdownViewFile"),
    mode: container.querySelector("#markdownViewerMode"),
    theme: container.querySelector("#markdownViewerTheme"),
    font: container.querySelector("#markdownViewerFont"),
    fontValue: container.querySelector("#markdownViewerFontValue"),
    line: container.querySelector("#markdownViewerLine"),
    lineValue: container.querySelector("#markdownViewerLineValue"),
    stats: container.querySelector("#markdownViewerStats"),
    stage: container.querySelector(".markdown-viewer-stage"),
    reader: container.querySelector(".markdown-viewer-reader"),
    preview: container.querySelector("#markdownViewerPreview"),
    source: container.querySelector("#markdownViewerSource"),
    status: container.querySelector("#markdownViewerStatus"),
    outline: container.querySelector("#markdownViewerOutlineList"),
    openWindow: container.querySelector("#markdownViewerOpenWindow"),
    copySource: container.querySelector("#markdownViewerCopySource"),
    copyText: container.querySelector("#markdownViewerCopyText"),
  };
  const state = { markdown: "", plain: "", headings: [] };

  function updateReaderSettings() {
    const fontSize = Number(nodes.font.value) || 17;
    const lineHeight = (Number(nodes.line.value) || 170) / 100;
    nodes.fontValue.value = `${fontSize}px`;
    nodes.lineValue.value = lineHeight.toFixed(2);
    nodes.stage.dataset.mode = nodes.mode.value;
    nodes.stage.dataset.theme = nodes.theme.value;
    nodes.reader.style.setProperty("--markdown-viewer-font-size", `${fontSize}px`);
    nodes.reader.style.setProperty("--markdown-viewer-line-height", String(lineHeight));
    nodes.source.hidden = nodes.mode.value === "preview";
  }

  function renderMarkdownDocument(markdown, file) {
    const normalized = normalizeNewlines(markdown);
    state.markdown = normalized;
    state.plain = markdownToPlainText(normalized);
    state.headings = extractMarkdownHeadings(normalized);
    nodes.preview.innerHTML = markdownToHtml(normalized, copy.emptyPreview);
    nodes.source.textContent = normalized;
    renderMarkdownOutline(nodes.outline, state.headings, nodes.preview, copy.outlineEmpty);

    const lines = normalized ? normalized.split("\n").length : 0;
    const readBase = APP_LOCALE === "en" ? 900 : 700;
    const minutes = Math.max(1, Math.ceil(Math.max(state.plain.length, normalized.length) / readBase));
    nodes.stats.textContent = `${copy.count(normalized.length, lines, state.headings.length, minutes)} · ${formatBytes(file.size)}`;
    nodes.status.textContent = `${copy.loaded} · ${formatBytes(file.size)}`;
  }

  async function loadFile() {
    const file = nodes.fileInput.files?.[0];
    if (!file) return;
    if (!isMarkdownViewerFile(file)) {
      showToast(copy.unsupported);
      nodes.fileInput.value = "";
      return;
    }
    if (file.size > MARKDOWN_VIEWER_MAX_BYTES) {
      showToast(copy.tooLarge);
      nodes.fileInput.value = "";
      return;
    }

    try {
      const text = await file.text();
      renderMarkdownDocument(text, file);
    } catch (error) {
      trackToolError(TOOL_MAP["markdown-viewer"], error, "read_markdown_file");
      showToast(copy.readFail);
    }
  }

  nodes.fileInput.addEventListener("change", loadFile);
  [nodes.mode, nodes.theme, nodes.font, nodes.line].forEach((node) => {
    node.addEventListener("input", updateReaderSettings);
    node.addEventListener("change", updateReaderSettings);
  });
  nodes.openWindow.addEventListener("click", () => {
    if (!state.markdown.trim()) {
      showToast(copy.noCopy);
      return;
    }
    openMarkdownViewerWindow(state.markdown, copy);
  });
  nodes.copySource.addEventListener("click", async () => {
    if (!state.markdown.trim()) {
      showToast(copy.noCopy);
      return;
    }
    await safeCopy(state.markdown, copy.sourceCopied);
  });
  nodes.copyText.addEventListener("click", async () => {
    if (!state.plain.trim()) {
      showToast(copy.noCopy);
      return;
    }
    await safeCopy(state.plain, copy.textCopied);
  });

  updateReaderSettings();
}

function openMarkdownViewerWindow(markdown, copy) {
  const workspace = window.open("", "_blank");
  if (!workspace) {
    showToast(copy.popupBlocked);
    return;
  }

  const doc = workspace.document;
  doc.documentElement.lang = ACTIVE_LOCALE_CONFIG.htmlLang;
  doc.title = copy.windowTitle;
  doc.head.replaceChildren();
  doc.body.replaceChildren();

  const charset = doc.createElement("meta");
  charset.setAttribute("charset", "utf-8");
  const viewport = doc.createElement("meta");
  viewport.setAttribute("name", "viewport");
  viewport.setAttribute("content", "width=device-width, initial-scale=1");
  const title = doc.createElement("title");
  title.textContent = copy.windowTitle;
  const style = doc.createElement("style");
  style.textContent = `
    *, *::before, *::after { box-sizing: border-box; }
    :root { --font-size: 17px; color-scheme: light; }
    body {
      margin: 0;
      min-height: 100vh;
      display: grid;
      grid-template-rows: auto minmax(0, 1fr);
      background: #f4f7fb;
      color: #172033;
      font-family: Arial, "Malgun Gothic", sans-serif;
    }
    header {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 10px;
      padding: 10px 14px;
      border-bottom: 1px solid #dfe5ee;
      background: #ffffff;
    }
    h1 {
      margin: 0 auto 0 0;
      font-size: 1rem;
      line-height: 1.2;
    }
    label {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      color: #344054;
      font-size: 0.86rem;
      font-weight: 800;
    }
    input[type="range"] { width: 132px; }
    button {
      min-height: 34px;
      border: 1px solid #cfd7e5;
      border-radius: 8px;
      background: #ffffff;
      color: #20242d;
      font-weight: 800;
      padding: 0 12px;
      cursor: pointer;
    }
    button:hover { border-color: #e5322d; }
    main {
      min-height: 0;
      display: grid;
      padding: 12px;
    }
    section {
      min-width: 0;
      min-height: 0;
      display: grid;
      grid-template-rows: auto minmax(0, 1fr);
      gap: 8px;
    }
    h2 {
      margin: 0;
      color: #344054;
      font-size: 0.88rem;
    }
    textarea {
      width: 100%;
      min-width: 0;
      min-height: 0;
      height: 100%;
      overflow: auto;
      resize: none;
      border: 1px solid #d8e0ec;
      border-radius: 8px;
      background: #ffffff;
      color: #101828;
      padding: clamp(14px, 2vw, 24px);
      font-family: Consolas, "SFMono-Regular", "Malgun Gothic", monospace;
      font-size: var(--font-size);
      line-height: 1.72;
      white-space: pre-wrap;
      overflow-wrap: anywhere;
      word-break: break-word;
    }
    textarea:focus {
      border-color: #e5322d;
      box-shadow: 0 0 0 3px rgba(229, 50, 45, 0.14);
      outline: none;
    }
    .status {
      color: #667085;
      font-size: 0.78rem;
      font-weight: 700;
    }
  `;
  doc.head.replaceChildren(charset, viewport, title, style);

  const create = (tag, className, text) => {
    const element = doc.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  };
  const header = create("header");
  const heading = create("h1", "", copy.windowTitle);
  const fontLabel = create("label", "", copy.fontLabel);
  const fontInput = doc.createElement("input");
  fontInput.type = "range";
  fontInput.min = "13";
  fontInput.max = "28";
  fontInput.step = "1";
  fontInput.value = "17";
  const fontValue = doc.createElement("output");
  fontValue.value = "17px";
  fontLabel.append(" ", fontInput, " ", fontValue);
  const copyButton = create("button", "", copy.copySource);
  copyButton.type = "button";
  const saveButton = create("button", "", copy.saveEdited);
  saveButton.type = "button";
  const closeButton = create("button", "", copy.closeWindow);
  closeButton.type = "button";
  const status = create("span", "status");
  header.append(heading, fontLabel, copyButton, saveButton, closeButton, status);

  const main = create("main");
  const section = create("section");
  const editorTitle = create("h2", "", copy.editorTitle);
  const source = doc.createElement("textarea");
  source.id = "source";
  source.spellcheck = false;
  source.wrap = "soft";
  source.value = String(markdown || "");
  section.append(editorTitle, source);
  main.append(section);
  doc.body.replaceChildren(header, main);

  const updateStatus = () => {
    const locale = ACTIVE_LOCALE_CONFIG.numberLocale;
    const chars = source.value.length.toLocaleString(locale);
    const lines = (source.value ? source.value.split("\n").length : 0).toLocaleString(locale);
    const charLabel = APP_LOCALE === "en" ? " chars" : "자";
    const lineLabel = APP_LOCALE === "en" ? " lines" : "줄";
    status.textContent = `${chars}${charLabel} · ${lines}${lineLabel}`;
  };
  const updateFont = () => {
    const size = Number(fontInput.value) || 17;
    doc.documentElement.style.setProperty("--font-size", `${size}px`);
    fontValue.value = `${size}px`;
  };
  const copySource = async () => {
    try {
      await workspace.navigator.clipboard.writeText(source.value);
      status.textContent = copy.sourceCopied;
    } catch (error) {
      source.focus();
      source.select();
      doc.execCommand("copy");
      status.textContent = copy.sourceCopied;
    }
  };
  const saveSource = () => {
    const blob = new workspace.Blob([source.value], { type: "text/markdown;charset=utf-8" });
    const url = workspace.URL.createObjectURL(blob);
    const link = doc.createElement("a");
    link.href = url;
    link.download = "markdown-document.md";
    doc.body.appendChild(link);
    link.click();
    workspace.setTimeout(() => {
      workspace.URL.revokeObjectURL(url);
      link.remove();
    }, 0);
  };

  fontInput.addEventListener("input", updateFont);
  source.addEventListener("input", updateStatus);
  copyButton.addEventListener("click", copySource);
  saveButton.addEventListener("click", saveSource);
  closeButton.addEventListener("click", () => workspace.close());
  updateFont();
  updateStatus();
  workspace.focus();
  source.focus();
}

function buildMarkdownViewerWindowHtml(markdown, labels) {
  const lang = ACTIVE_LOCALE_CONFIG.htmlLang;
  const initialMarkdown = JSON.stringify(String(markdown || "")).replace(/[<>&]/g, (char) => {
    return { "<": "\\u003c", ">": "\\u003e", "&": "\\u0026" }[char];
  });
  const labelData = JSON.stringify(labels).replace(/[<>&]/g, (char) => {
    return { "<": "\\u003c", ">": "\\u003e", "&": "\\u0026" }[char];
  });

  return `<!doctype html>
<html lang="${lang}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(labels.title)}</title>
    <style>
      *, *::before, *::after { box-sizing: border-box; }
      :root { --font-size: 17px; --line-height: 1.72; color-scheme: light; }
      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        grid-template-rows: auto minmax(0, 1fr);
        background: #f5f7fb;
        color: #1f2937;
        font-family: Arial, "Malgun Gothic", sans-serif;
      }
      header {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 10px;
        padding: 10px 14px;
        border-bottom: 1px solid #dfe5ee;
        background: #ffffff;
      }
      h1 {
        margin: 0 auto 0 0;
        color: #172033;
        font-size: 1rem;
        line-height: 1.2;
      }
      label {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        color: #344054;
        font-size: 0.86rem;
        font-weight: 800;
      }
      input[type="range"] { width: 132px; }
      button {
        min-height: 34px;
        border: 1px solid #cfd7e5;
        border-radius: 8px;
        background: #ffffff;
        color: #20242d;
        font-weight: 800;
        padding: 0 12px;
        cursor: pointer;
      }
      button:hover { border-color: #e5322d; }
      main {
        min-height: 0;
        display: grid;
        padding: 12px;
      }
      section {
        min-width: 0;
        min-height: 0;
        display: grid;
        grid-template-rows: auto minmax(0, 1fr);
        gap: 8px;
      }
      h2 {
        margin: 0;
        color: #344054;
        font-size: 0.88rem;
      }
      textarea {
        width: 100%;
        min-width: 0;
        min-height: 0;
        height: 100%;
        overflow: auto;
        border: 1px solid #d8e0ec;
        border-radius: 8px;
        background: #ffffff;
        font-size: var(--font-size);
        line-height: var(--line-height);
        overflow-wrap: anywhere;
        word-break: break-word;
      }
      textarea {
        resize: none;
        padding: 14px;
        color: #101828;
        font-family: Consolas, "SFMono-Regular", "Malgun Gothic", monospace;
        white-space: pre-wrap;
      }
      .status {
        color: #667085;
        font-size: 0.78rem;
        font-weight: 700;
      }
    </style>
  </head>
  <body>
    <header>
      <h1>${escapeHtml(labels.title)}</h1>
      <label>${escapeHtml(labels.font)} <input id="fontSize" type="range" min="13" max="28" value="17" /> <output id="fontValue">17px</output></label>
      <button id="copySource" type="button">${escapeHtml(labels.copy)}</button>
      <button id="saveSource" type="button">${escapeHtml(labels.save)}</button>
      <button id="closeWindow" type="button">${escapeHtml(labels.close)}</button>
      <span id="status" class="status"></span>
    </header>
    <main>
      <section>
        <h2>${escapeHtml(labels.editor)}</h2>
        <textarea id="source" spellcheck="false"></textarea>
      </section>
    </main>
    <script>
      const labels = ${labelData};
      const source = document.getElementById("source");
      const fontSize = document.getElementById("fontSize");
      const fontValue = document.getElementById("fontValue");
      const status = document.getElementById("status");
      source.value = ${initialMarkdown};

      function render() {
        const markdown = source.value;
        const lines = markdown ? markdown.split("\\n").length : 0;
        status.textContent = markdown.length.toLocaleString() + " chars · " + lines.toLocaleString() + " lines";
      }

      function setFont() {
        const size = Number(fontSize.value) || 17;
        document.documentElement.style.setProperty("--font-size", size + "px");
        fontValue.value = size + "px";
      }

      document.getElementById("copySource").addEventListener("click", async () => {
        await navigator.clipboard.writeText(source.value);
      });
      document.getElementById("saveSource").addEventListener("click", () => {
        const blob = new Blob([source.value], { type: "text/markdown;charset=utf-8" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "markdown-document.md";
        document.body.appendChild(link);
        link.click();
        setTimeout(() => {
          URL.revokeObjectURL(link.href);
          link.remove();
        }, 0);
      });
      document.getElementById("closeWindow").addEventListener("click", () => window.close());
      source.addEventListener("input", render);
      fontSize.addEventListener("input", () => {
        setFont();
        render();
      });
      setFont();
      render();
    </script>
  </body>
</html>`;
}

function isMarkdownViewerFile(file) {
  const name = (file.name || "").toLowerCase();
  const type = (file.type || "").toLowerCase();
  return name.endsWith(".md") || name.endsWith(".markdown") || name.endsWith(".txt") || type === "text/markdown" || type === "text/plain";
}

function extractMarkdownHeadings(markdown) {
  const headings = [];
  const lines = normalizeNewlines(markdown).split("\n");
  let inFence = false;
  for (const line of lines) {
    if (/^```/.test(line.trim())) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const match = line.match(/^(#{1,3})\s+(.+)$/);
    if (!match) continue;
    headings.push({
      level: match[1].length,
      text: cleanMarkdownHeadingText(match[2]),
    });
  }
  return headings;
}

function cleanMarkdownHeadingText(markdown) {
  const raw = String(markdown || "").trim();
  const parsed = parseMarkdownHeadingNumber(raw);
  if (!parsed) {
    return markdownToPlainText(raw).replace(/\s+/g, " ").trim() || raw;
  }

  const suffix = parsed.parts.length === 1 ? "." : "";
  const body = markdownToPlainText(parsed.rest).replace(/\s+/g, " ").trim() || parsed.rest;
  return `${parsed.value}${suffix}${body ? ` ${body}` : ""}`.trim();
}

function getMarkdownHeadingNumberDepth(text) {
  const parsed = parseMarkdownHeadingNumber(text);
  if (!parsed) return null;
  return parsed.parts.length;
}

function parseMarkdownHeadingNumber(text) {
  const trimmed = String(text || "").trim();
  const match = trimmed.match(/^(\d+(?:\.\d+)*)(?:[.)])?\s+/);
  if (!match) return null;
  return {
    value: match[1],
    parts: match[1].split("."),
    rest: trimmed.slice(match[0].length).trim(),
  };
}

function buildMarkdownOutlineItems(headings) {
  if (!headings.length) return [];

  const baseLevel = Math.min(...headings.map((heading) => heading.level));
  const parsedNumbers = headings.map((heading) => parseMarkdownHeadingNumber(heading.text));
  const hasDocumentTitle = !parsedNumbers[0];
  const inferredParentNumbers = new Map();
  const seenTopNumbers = new Set();

  for (let index = 0; index < headings.length; index += 1) {
    const parsed = parsedNumbers[index];
    if (parsed) {
      seenTopNumbers.add(parsed.parts[0]);
      continue;
    }

    const nextParsed = parsedNumbers[index + 1];
    if (!nextParsed || nextParsed.parts.length < 2) continue;
    const topNumber = nextParsed.parts[0];
    if (!seenTopNumbers.has(topNumber)) {
      inferredParentNumbers.set(index, topNumber);
      seenTopNumbers.add(topNumber);
    }
  }

  return headings.map((heading, index) => {
    const parsed = parsedNumbers[index];
    const inferredNumber = inferredParentNumbers.get(index);
    let depth = 0;
    let label = heading.text;

    if (parsed) {
      depth = parsed.parts.length - (hasDocumentTitle ? 0 : 1);
    } else if (inferredNumber) {
      depth = hasDocumentTitle ? 1 : 0;
      label = `${inferredNumber}. ${heading.text}`;
    } else if (index > 0) {
      depth = Math.max(heading.level - baseLevel, 1);
    }

    return {
      ...heading,
      depth: Math.min(Math.max(depth, 0), 2),
      label,
    };
  });
}

function computeMarkdownOutlineDepths(headings) {
  return buildMarkdownOutlineItems(headings).map((item) => item.depth);
}

function renderMarkdownOutline(container, headings, preview, emptyText) {
  if (!headings.length) {
    container.innerHTML = `<p class="tool-note">${escapeHtml(emptyText)}</p>`;
    return;
  }

  const outlineItems = buildMarkdownOutlineItems(headings);
  container.innerHTML = outlineItems
    .map((item, index) => {
      return `<button type="button" data-heading-index="${index}" data-level="${item.level}" data-depth="${item.depth}" aria-level="${item.depth + 1}">${escapeHtml(item.label)}</button>`;
    })
    .join("");
  container.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      const heading = preview.querySelectorAll("h1,h2,h3")[Number(button.dataset.headingIndex)];
      heading?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function renderMarkdownEditor(container) {
  container.innerHTML = `
    <div class="tool-section markdown-tool markdown-editor-v2">
      <div class="markdown-shell">
        <article class="input-card markdown-pane markdown-input-pane">
          <div class="section-heading markdown-pane-head">
            <div>
              <h2>마크다운 입력</h2>
              <p class="tool-note">빈 문서에서도 버튼을 눌러 제목, 목록, 표, 코드 블록을 바로 작성합니다.</p>
            </div>
          </div>
          <div class="markdown-toolbar" role="toolbar" aria-label="마크다운 서식">
            <div class="toolbar-group" aria-label="제목">
              <button type="button" data-format="h1" title="큰 제목">H1</button>
              <button type="button" data-format="h2" title="중간 제목">H2</button>
              <button type="button" data-format="h3" title="작은 제목">H3</button>
            </div>
            <div class="toolbar-group" aria-label="강조">
              <button type="button" data-format="bold" title="굵게">B</button>
              <button type="button" data-format="italic" title="기울임">I</button>
              <button type="button" data-format="strike" title="취소선">S</button>
              <button type="button" data-format="inline-code" title="인라인 코드">&lt;/&gt;</button>
            </div>
            <div class="toolbar-group" aria-label="목록">
              <button type="button" data-format="bullet-list" title="글머리 기호">•</button>
              <button type="button" data-format="number-list" title="번호 목록">1.</button>
              <button type="button" data-format="check-list" title="체크 목록">☐</button>
              <button type="button" data-format="quote" title="인용">❝</button>
            </div>
            <div class="toolbar-group" aria-label="삽입">
              <button type="button" data-format="link" title="링크">링크</button>
              <button type="button" data-format="table" title="표">표</button>
              <button type="button" data-format="code-block" title="코드 블록">코드</button>
              <button type="button" data-format="divider" title="구분선">—</button>
            </div>
          </div>
          <textarea id="markdownInput" class="markdown-textarea" spellcheck="false" placeholder="# 제목&#10;&#10;문서를 작성하거나 일반 텍스트를 붙여넣으세요."></textarea>
        </article>
        <article class="result-card markdown-pane markdown-preview-pane">
          <div class="section-heading markdown-pane-head">
            <div>
              <h2>미리보기</h2>
              <p id="markdownMeta" class="tool-note">0자 · 0줄</p>
            </div>
            <div class="action-row compact-actions">
              <button id="copyMarkdownBtn" type="button">MD 복사</button>
              <button id="copyPlainBtn" type="button">텍스트 복사</button>
              <button id="downloadMarkdownBtn" type="button">MD 저장</button>
            </div>
          </div>
          <div id="markdownPreview" class="markdown-preview" aria-live="polite"></div>
        </article>
      </div>
    </div>
  `;

  const input = container.querySelector("#markdownInput");
  const preview = container.querySelector("#markdownPreview");
  const meta = container.querySelector("#markdownMeta");

  function render() {
    preview.innerHTML = markdownToHtml(input.value);
    const lines = input.value ? normalizeNewlines(input.value).split("\n").length : 0;
    meta.textContent = `${input.value.length.toLocaleString("ko-KR")}자 · ${lines.toLocaleString("ko-KR")}줄`;
  }

  container.querySelectorAll(".markdown-toolbar button").forEach((button) => {
    button.addEventListener("click", () => {
      applyMarkdownFormat(input, button.dataset.format);
      render();
      input.focus();
    });
  });

  container.querySelector("#copyMarkdownBtn").addEventListener("click", async () => {
    if (!input.value.trim()) {
      showToast("복사할 마크다운이 없습니다.");
      return;
    }
    await safeCopy(input.value, "마크다운을 복사했습니다.");
  });

  container.querySelector("#copyPlainBtn").addEventListener("click", async () => {
    const plainText = markdownToPlainText(input.value);
    if (!plainText.trim()) {
      showToast("복사할 텍스트가 없습니다.");
      return;
    }
    await safeCopy(plainText, "일반 텍스트를 복사했습니다.");
  });

  container.querySelector("#downloadMarkdownBtn").addEventListener("click", () => {
    if (!input.value.trim()) {
      showToast("저장할 마크다운이 없습니다.");
      return;
    }
    downloadText(input.value, "markdown-document.md");
  });

  input.addEventListener("input", render);
  render();
}

function applyMarkdownFormat(textarea, mode) {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const value = textarea.value;
  const selected = value.slice(start, end);
  const result = buildMarkdownEdit(mode, selected, value, start, end);

  textarea.value = `${value.slice(0, start)}${result.text}${value.slice(end)}`;
  textarea.setSelectionRange(start + result.selectionStart, start + result.selectionEnd);
}

function buildMarkdownEdit(mode, selected, value, start, end) {
  const hasSelection = selected.length > 0;
  const text = selected || markdownPlaceholder(mode);
  const linePrefix = start > 0 && value[start - 1] !== "\n" ? "\n" : "";
  const lineSuffix = end < value.length && value[end] !== "\n" ? "\n" : "";

  if (mode === "h1" || mode === "h2" || mode === "h3") {
    const level = Number(mode.slice(1));
    return markdownEdit(`${"#".repeat(level)} ${text}`, linePrefix.length + level + 1, linePrefix.length + level + 1 + text.length, linePrefix, lineSuffix);
  }
  if (mode === "bold") return markdownInlineEdit(`**${text}**`, 2, text.length);
  if (mode === "italic") return markdownInlineEdit(`*${text}*`, 1, text.length);
  if (mode === "strike") return markdownInlineEdit(`~~${text}~~`, 2, text.length);
  if (mode === "inline-code") return markdownInlineEdit(`\`${text}\``, 1, text.length);
  if (mode === "bullet-list") {
    const body = listifyMarkdownLines(text, (line) => `- ${line}`);
    return markdownEdit(body, linePrefix.length + 2, linePrefix.length + body.length, linePrefix, lineSuffix);
  }
  if (mode === "number-list") {
    const lines = normalizeNewlines(text).split("\n");
    const body = lines.map((line, index) => `${index + 1}. ${stripListMarker(line) || markdownPlaceholder(mode)}`).join("\n");
    return markdownEdit(body, linePrefix.length + 3, linePrefix.length + body.length, linePrefix, lineSuffix);
  }
  if (mode === "check-list") {
    const body = listifyMarkdownLines(text, (line) => `- [ ] ${line}`);
    return markdownEdit(body, linePrefix.length + 6, linePrefix.length + body.length, linePrefix, lineSuffix);
  }
  if (mode === "quote") {
    const body = normalizeNewlines(text)
      .split("\n")
      .map((line) => `> ${line.replace(/^\s*>\s?/, "").trim() || markdownPlaceholder(mode)}`)
      .join("\n");
    return markdownEdit(body, linePrefix.length + 2, linePrefix.length + body.length, linePrefix, lineSuffix);
  }
  if (mode === "link") {
    const replacement = `[${text}](https://example.com)`;
    return { text: replacement, selectionStart: 1, selectionEnd: 1 + text.length };
  }
  if (mode === "table") {
    const firstCell = hasSelection ? selected.trim().split(/\s+/)[0] || "항목" : "항목";
    const table = `| ${firstCell} | 내용 |\n| --- | --- |\n| 예시 | 설명 |`;
    return markdownEdit(table, linePrefix.length + 2, linePrefix.length + 2 + firstCell.length, linePrefix, lineSuffix);
  }
  if (mode === "code-block") {
    const code = selected || "code";
    const block = `\`\`\`\n${code}\n\`\`\``;
    return markdownEdit(block, linePrefix.length + 4, linePrefix.length + 4 + code.length, linePrefix, lineSuffix);
  }
  if (mode === "divider") return markdownEdit("---", 3, 3, linePrefix, lineSuffix);
  return { text, selectionStart: 0, selectionEnd: text.length };
}

function markdownEdit(body, selectionStart, selectionEnd, prefix = "", suffix = "") {
  return { text: `${prefix}${body}${suffix}`, selectionStart, selectionEnd };
}

function markdownInlineEdit(replacement, markerLength, contentLength) {
  return { text: replacement, selectionStart: markerLength, selectionEnd: markerLength + contentLength };
}

function markdownPlaceholder(mode) {
  const placeholders = {
    h1: "큰 제목",
    h2: "제목",
    h3: "소제목",
    bold: "굵게 표시할 텍스트",
    italic: "기울일 텍스트",
    strike: "취소할 텍스트",
    "inline-code": "code",
    "bullet-list": "목록 항목",
    "number-list": "목록 항목",
    "check-list": "할 일",
    quote: "인용문",
    link: "링크 텍스트",
    table: "항목",
    "code-block": "code",
  };
  return placeholders[mode] || "텍스트";
}

function listifyMarkdownLines(text, mapper) {
  return normalizeNewlines(text)
    .split("\n")
    .map((line) => mapper(stripListMarker(line) || "목록 항목"))
    .join("\n");
}

function stripListMarker(line) {
  return String(line)
    .replace(/^\s*-\s+\[[ xX]\]\s+/, "")
    .replace(/^\s*[-*+]\s+/, "")
    .replace(/^\s*\d+\.\s+/, "")
    .trim();
}

function markdownToHtml(markdown, emptyMessage = "마크다운을 입력하면 미리보기가 여기에 표시됩니다.") {
  const source = normalizeNewlines(markdown);
  if (!source.trim()) {
    return `<p class="tool-note">${escapeHtml(emptyMessage)}</p>`;
  }

  const lines = source.split("\n");
  const html = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    if (!line.trim()) {
      index += 1;
      continue;
    }

    if (/^```/.test(line.trim())) {
      const codeLines = [];
      index += 1;
      while (index < lines.length && !/^```/.test(lines[index].trim())) {
        codeLines.push(lines[index]);
        index += 1;
      }
      if (index < lines.length) index += 1;
      html.push(`<pre><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`);
      continue;
    }

    if (/^\s*\|?.+\|.+/.test(line) && index + 1 < lines.length && /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(lines[index + 1])) {
      const tableLines = [line, lines[index + 1]];
      index += 2;
      while (index < lines.length && /\|/.test(lines[index]) && lines[index].trim()) {
        tableLines.push(lines[index]);
        index += 1;
      }
      html.push(renderMarkdownTable(tableLines));
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      const level = heading[1].length;
      html.push(`<h${level}>${renderMarkdownInline(heading[2])}</h${level}>`);
      index += 1;
      continue;
    }

    if (/^\s*([-*_])(?:\s*\1){2,}\s*$/.test(line)) {
      html.push("<hr>");
      index += 1;
      continue;
    }

    if (/^\s*-\s+\[[ xX]\]\s+/.test(line)) {
      const items = [];
      while (index < lines.length && /^\s*-\s+\[[ xX]\]\s+/.test(lines[index])) {
        const checked = /^\s*-\s+\[[xX]\]\s+/.test(lines[index]);
        const label = lines[index].replace(/^\s*-\s+\[[ xX]\]\s+/, "");
        items.push(`<li><input type="checkbox" disabled ${checked ? "checked" : ""}> ${renderMarkdownInline(label)}</li>`);
        index += 1;
      }
      html.push(`<ul class="task-list">${items.join("")}</ul>`);
      continue;
    }

    if (/^\s*[-*+]\s+/.test(line)) {
      const items = [];
      while (index < lines.length && /^\s*[-*+]\s+/.test(lines[index])) {
        items.push(`<li>${renderMarkdownInline(lines[index].replace(/^\s*[-*+]\s+/, ""))}</li>`);
        index += 1;
      }
      html.push(`<ul>${items.join("")}</ul>`);
      continue;
    }

    if (/^\s*\d+\.\s+/.test(line)) {
      const items = [];
      while (index < lines.length && /^\s*\d+\.\s+/.test(lines[index])) {
        items.push(`<li>${renderMarkdownInline(lines[index].replace(/^\s*\d+\.\s+/, ""))}</li>`);
        index += 1;
      }
      html.push(`<ol>${items.join("")}</ol>`);
      continue;
    }

    if (/^\s*>\s?/.test(line)) {
      const quoteLines = [];
      while (index < lines.length && /^\s*>\s?/.test(lines[index])) {
        quoteLines.push(lines[index].replace(/^\s*>\s?/, ""));
        index += 1;
      }
      html.push(`<blockquote>${quoteLines.map(renderMarkdownInline).join("<br>")}</blockquote>`);
      continue;
    }

    const paragraph = [];
    while (index < lines.length && lines[index].trim() && !isMarkdownBlockStart(lines[index], lines[index + 1])) {
      paragraph.push(lines[index]);
      index += 1;
    }
    html.push(`<p>${paragraph.map(renderMarkdownInline).join("<br>")}</p>`);
  }

  return html.join("");
}

function isMarkdownBlockStart(line, nextLine = "") {
  return (
    /^```/.test(line.trim()) ||
    /^(#{1,6})\s+/.test(line) ||
    /^\s*([-*_])(?:\s*\1){2,}\s*$/.test(line) ||
    /^\s*-\s+\[[ xX]\]\s+/.test(line) ||
    /^\s*[-*+]\s+/.test(line) ||
    /^\s*\d+\.\s+/.test(line) ||
    /^\s*>\s?/.test(line) ||
    (/^\s*\|?.+\|.+/.test(line) && /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(nextLine))
  );
}

function renderMarkdownTable(lines) {
  const rows = lines
    .filter((line, index) => index !== 1)
    .map((line) =>
      line
        .trim()
        .replace(/^\|/, "")
        .replace(/\|$/, "")
        .split("|")
        .map((cell) => cell.trim())
    );

  if (rows.length === 0) return "";
  const head = rows[0].map((cell) => `<th>${renderMarkdownInline(cell)}</th>`).join("");
  const body = rows
    .slice(1)
    .map((row) => `<tr>${row.map((cell) => `<td>${renderMarkdownInline(cell)}</td>`).join("")}</tr>`)
    .join("");

  return `<table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`;
}

function renderMarkdownInline(text) {
  const codeSpans = [];
  let result = String(text).replace(/`([^`]+)`/g, (_, code) => {
    const token = `@@CODE_${codeSpans.length}@@`;
    codeSpans.push(`<code>${escapeHtml(code)}</code>`);
    return token;
  });

  result = escapeHtml(result);
  result = result.replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  result = result.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  result = result.replace(/__([^_]+)__/g, "<strong>$1</strong>");
  result = result.replace(/~~([^~]+)~~/g, "<del>$1</del>");
  result = result.replace(/(^|[^*])\*([^*\n]+)\*/g, "$1<em>$2</em>");
  result = result.replace(/(^|[^_])_([^_\n]+)_/g, "$1<em>$2</em>");
  codeSpans.forEach((html, index) => {
    result = result.replace(`@@CODE_${index}@@`, html);
  });
  return result;
}

function markdownToPlainText(markdown) {
  return normalizeNewlines(markdown)
    .replace(/```[\s\S]*?```/g, (match) => match.replace(/```/g, "").trim())
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^\s*-\s+\[[ xX]\]\s+/gm, "")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/^\s*\d+\.\s+/gm, "")
    .replace(/^\s*>\s?/gm, "")
    .replace(/^\s*[-*_]{3,}\s*$/gm, "")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/__([^_]+)__/g, "$1")
    .replace(/~~([^~]+)~~/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/_([^_]+)_/g, "$1")
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, "$1 $2")
    .trim();
}

function wait(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

init();
