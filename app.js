const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const TOOL_ORIGIN = "https://ko-workspace.com";
const BRAND_NAME = "코워크스페이스";
const BRAND_NAME_EN = "ko-workspace";
const BRAND_DISPLAY_NAME = `${BRAND_NAME} (${BRAND_NAME_EN})`;
const BRAND_DESCRIPTION =
  "코워크스페이스(ko-workspace)는 로그인 없이 브라우저에서 바로 실행되는 텍스트, 이미지, PDF, 자막, 음성, 영상 업무 도구 모음입니다.";

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
    id: "webcam-recorder",
    path: "/tools/webcam-recorder/",
    category: "영상",
    title: "웹캠 녹화기",
    summary:
      "카메라와 마이크를 브라우저에서 바로 녹화하고, 좌우반전·밝기·대비·채도·필터를 적용해 WebM 파일로 저장합니다.",
    seoTitle: "웹캠 녹화기 | 브라우저 카메라 녹화",
    seoDescription:
      "설치 없이 브라우저에서 웹캠과 마이크를 녹화하고 좌우반전, 밝기, 대비, 채도, 필터를 적용해 WebM으로 저장합니다.",
    keywords: ["웹캠", "녹화", "WebM", "좌우반전"],
    guide: [
      { title: "카메라 허용", text: "브라우저 권한 창에서 카메라와 필요한 경우 마이크 사용을 허용합니다." },
      { title: "화면 조정", text: "좌우반전, 밝기, 대비, 채도, 필터를 미리보기에서 확인하며 맞춥니다." },
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
      "ChatGPT, Claude, Gemini 같은 AI 답변을 붙여넣었을 때 남는 마크다운, 별표, 제목, 링크, 코드블록을 일반 문서용 텍스트로 정리합니다.",
    seoTitle: "AI 복붙 서식 정리 | ChatGPT 마크다운 제거",
    seoDescription:
      "AI 답변 복사 후 붙는 별표, 제목, 링크, 코드블록, 줄바꿈을 브라우저에서 정리하는 무료 도구입니다.",
    keywords: ["ChatGPT", "마크다운", "별표", "서식"],
    guide: [
      { title: "원문 붙여넣기", text: "AI 답변이나 웹에서 복사한 텍스트를 입력합니다." },
      { title: "정리 모드 선택", text: "일반 텍스트, 문서용, 블로그용, 표 정리 모드 중 하나를 고릅니다." },
      { title: "옵션 조정", text: "링크 처리, 코드블록 제거, 제목 처리, 공백 정리 여부를 선택합니다." },
      { title: "결과 사용", text: "출력 텍스트를 복사해서 메일, 워드, 한글, 메신저에 바로 붙여넣습니다." },
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
      { title: "텍스트 입력", text: "원고, 보고서, 댓글, 설명문 등 원하는 텍스트를 붙여넣습니다." },
      { title: "실시간 확인", text: "입력 즉시 글자수와 바이트 수가 자동으로 계산됩니다." },
      { title: "분량 점검", text: "읽기 시간과 문단 수를 함께 보며 초안 분량을 빠르게 확인합니다." },
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
      "URL, 일반 텍스트, Wi-Fi 접속 정보를 QR 코드로 만들고 SVG로 저장합니다.",
    seoTitle: "QR 코드 생성기 | URL 텍스트 Wi-Fi QR 만들기",
    seoDescription:
      "브라우저에서 URL, 텍스트, Wi-Fi 정보를 QR 코드로 만들고 바로 다운로드하는 무료 도구입니다.",
    keywords: ["QR", "URL", "Wi-Fi", "생성"],
    guide: [
      { title: "형식 선택", text: "URL, 텍스트, Wi-Fi 정보 중 하나를 고릅니다." },
      { title: "내용 입력", text: "QR에 넣을 값을 입력하고 크기와 오류 복원 수준을 조정합니다." },
      { title: "생성 및 저장", text: "즉시 생성된 QR을 미리 보고 SVG 파일로 저장합니다." },
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
      { title: "이미지 업로드", text: "JPG, PNG, WEBP 이미지를 선택합니다." },
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
      { title: "원본 선택", text: "변환할 이미지를 업로드합니다." },
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
      { title: "파일 업로드", text: "압축할 이미지를 선택합니다." },
      { title: "압축 수준 조정", text: "품질과 최대 너비를 조절하며 미리보기를 확인합니다." },
      { title: "결과 저장", text: "원본 대비 용량 변화를 확인하고 압축본을 저장합니다." },
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
      { title: "파일 선택", text: "합칠 PDF를 순서대로 업로드합니다." },
      { title: "병합 실행", text: "브라우저 안에서 페이지를 복사해 하나의 PDF로 결합합니다." },
      { title: "저장", text: "완성된 병합 PDF를 바로 내려받습니다." },
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
      { title: "파일 업로드", text: "분할할 PDF 파일 한 개를 선택합니다." },
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
      { title: "파일 선택", text: "원본 PDF를 업로드합니다." },
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
      { title: "이미지 업로드", text: "PDF로 묶을 이미지를 여러 장 선택합니다." },
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
      { title: "PDF 업로드", text: "이미지로 바꿀 PDF를 한 개 선택합니다." },
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

const TOOL_MAP = Object.fromEntries(TOOL_DEFS.map((tool) => [tool.id, tool]));
const CATEGORY_ORDER = ["\uC804\uCCB4", "\uC74C\uC131", "영상", "\uD14D\uC2A4\uD2B8", "\uC774\uBBF8\uC9C0", "PDF", "\uC790\uB9C9"];
const TOOL_VISUALS = {
  "voice-to-text": { icon: "\uD83C\uDFA4", tone: "red", copy: "\ub9d0\ud558\uba74 \ubc14\ub85c \ud14d\uc2a4\ud2b8\ub85c \ubc1b\uc544 \uc801\uc2b5\ub2c8\ub2e4." },
  "webcam-recorder": { icon: "\uD83C\uDFA5", tone: "orange", copy: "\uc6f9\ucea0\uacfc \ub9c8\uc774\ud06c\ub97c \ud544\ud130\ub97c \uc801\uc6a9\ud574 \ub179\ud654\ud569\ub2c8\ub2e4." },
  "ai-text-cleaner": { icon: "\u2728", tone: "violet", copy: "AI \ub2f5\ubcc0\uc758 \ubcc4\ud45c\uc640 \ub9c8\ud06c\ub2e4\uc6b4\uc744 \uc815\ub9ac\ud569\ub2c8\ub2e4." },
  "character-counter": { icon: "\uD83D\uDD22", tone: "blue", copy: "\uacf5\ubc31 \ud3ec\ud568\uacfc \uc81c\uc678 \uae00\uc790\uc218\ub97c \uacc4\uc0b0\ud569\ub2c8\ub2e4." },
  "line-break-cleaner": { icon: "\u21B5", tone: "cyan", copy: "\uc904\ubc14\uafc8\uacfc \uacf5\ubc31\uc744 \ubb38\ub2e8\uc73c\ub85c \uc815\ub9ac\ud569\ub2c8\ub2e4." },
  "markdown-editor": { icon: "MD", tone: "indigo", copy: "\uc77c\ubc18 \ud14d\uc2a4\ud2b8\ub97c \ub9c8\ud06c\ub2e4\uc6b4 \ubb38\uc11c\ub85c \ud3b8\uc9d1\ud569\ub2c8\ub2e4." },
  "text-extractor": { icon: "@", tone: "green", copy: "\uc774\uba54\uc77c, URL, \uc804\ud654\ubc88\ud638\ub9cc \ube60\ub974\uac8c \ucd94\ucd9c\ud569\ub2c8\ub2e4." },
  "duplicate-line-remover": { icon: "\u29C9", tone: "slate", copy: "\ubaa9\ub85d\uc5d0\uc11c \uc911\ubcf5\ub41c \uc904\uc744 \uc81c\uac70\ud569\ub2c8\ub2e4." },
  "find-replace": { icon: "\uD83D\uDD0E", tone: "amber", copy: "\ubb38\uc11c \uc548\uc758 \ub2e8\uc5b4\ub97c \ud55c \ubc88\uc5d0 \ubc14\uafc9\ub2c8\ub2e4." },
  "case-converter": { icon: "Aa", tone: "indigo", copy: "\ub300\uc18c\ubb38\uc790\uc640 camelCase \ud615\uc2dd\uc744 \ubcc0\ud658\ud569\ub2c8\ub2e4." },
  "text-diff": { icon: "\u2260", tone: "purple", copy: "\ub450 \ud14d\uc2a4\ud2b8\uc758 \ubcc0\uacbd\uc810\uc744 \ube44\uad50\ud569\ub2c8\ub2e4." },
  "qr-code-generator": { icon: "\u25A6", tone: "emerald", copy: "URL, \ud14d\uc2a4\ud2b8, Wi-Fi QR\uc744 \ub9cc\ub4ed\ub2c8\ub2e4." },
  "image-resizer": { icon: "\u2194", tone: "orange", copy: "\uc0ac\uc9c4 \ud06c\uae30\ub97c \ud53d\uc140\uc774\ub098 \ube44\uc728\ub85c \uc870\uc808\ud569\ub2c8\ub2e4." },
  "image-converter": { icon: "\uD83D\uDDBC\uFE0F", tone: "pink", copy: "JPG, PNG, WEBP \ud615\uc2dd\uc744 \ubcc0\ud658\ud569\ub2c8\ub2e4." },
  "image-compressor": { icon: "\uD83D\uDDDC\uFE0F", tone: "yellow", copy: "\uc5c5\ub85c\ub4dc\uc6a9 \uc774\ubbf8\uc9c0 \uc6a9\ub7c9\uc744 \uc904\uc785\ub2c8\ub2e4." },
  "pdf-merge": { icon: "\uD83D\uDCCE", tone: "red", copy: "\uc5ec\ub7ec PDF\ub97c \ud558\ub098\uc758 \ubb38\uc11c\ub85c \ud569\uce69\ub2c8\ub2e4." },
  "pdf-split": { icon: "\u2702", tone: "blue", copy: "PDF\ub97c \ud398\uc774\uc9c0 \ub2e8\uc704\ub85c \ub098\ub215\ub2c8\ub2e4." },
  "pdf-extract-pages": { icon: "\uD83D\uDCC4", tone: "teal", copy: "\ud544\uc694\ud55c PDF \ud398\uc774\uc9c0\ub9cc \ucd94\ucd9c\ud569\ub2c8\ub2e4." },
  "image-to-pdf": { icon: "\uD83E\uDDFE", tone: "orange", copy: "\uc774\ubbf8\uc9c0\ub97c PDF \ubb38\uc11c\ub85c \ubcc0\ud658\ud569\ub2c8\ub2e4." },
  "pdf-to-image": { icon: "\uD83C\uDFDE\uFE0F", tone: "green", copy: "PDF \ud398\uc774\uc9c0\ub97c \uc774\ubbf8\uc9c0\ub85c \uc800\uc7a5\ud569\ub2c8\ub2e4." },
  "srt-cleaner": { icon: "\uD83C\uDFAC", tone: "slate", copy: "SRT \uc790\ub9c9 \ubc88\ud638\uc640 \ud615\uc2dd\uc744 \uc815\ub9ac\ud569\ub2c8\ub2e4." },
  "subtitle-converter": { icon: "\uD83D\uDD01", tone: "violet", copy: "SRT\uc640 VTT \uc790\ub9c9 \ud3ec\ub9f7\uc744 \ubcc0\ud658\ud569\ub2c8\ub2e4." },
  "subtitle-timing": { icon: "\u23F1\uFE0F", tone: "cyan", copy: "\uc790\ub9c9 \uc2f1\ud06c\ub97c \uc55e\ub4a4\ub85c \uc77c\uad04 \ubcf4\uc815\ud569\ub2c8\ub2e4." },
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

const LIBRARIES = {
  qrcode: {
    global: "qrcode",
    src: "https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qrcode.min.js",
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
};

const libraryCache = {};

const appState = {
  category: "전체",
  quickOffset: 0,
  quickMotion: "",
  quickMotionTimerId: null,
  selectedText: "",
  lastPointer: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
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
  bindGlobalEvents();
  renderCategoryFilters();
  renderSidebarTools();

  const activeTool = getActiveTool();
  if (activeTool) {
    renderToolPage(activeTool);
  } else {
    renderHomePage();
  }

  initAdSlots();
  injectStructuredData(activeTool);
}

function getActiveTool() {
  const toolId = document.body.dataset.tool;
  return TOOL_MAP[toolId] || null;
}

function bindGlobalEvents() {
  els.toolSearch.addEventListener("input", renderSidebarTools);
  els.helpBtn.addEventListener("click", openHelpDialog);
  els.helpCloseBtn.addEventListener("click", closeHelpDialog);
  els.helpDialog.addEventListener("click", closeHelpDialogFromBackdrop);

  els.selectionCopyBtn.addEventListener("pointerdown", (event) => event.preventDefault());
  els.selectionCopyBtn.addEventListener("click", copySelectedText);

  document.addEventListener("pointerup", (event) => {
    appState.lastPointer = { x: event.clientX, y: event.clientY };
    queueSelectionCheck();
  });
  document.addEventListener("selectionchange", queueSelectionCheck);
  document.addEventListener("keyup", queueSelectionCheck);
  document.addEventListener("mouseup", queueSelectionCheck);
  document.addEventListener("input", queueSelectionCheck, true);
  window.addEventListener("scroll", hideSelectionCopyButton, true);
  window.addEventListener("resize", hideSelectionCopyButton);
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
    return `<button class="${activeClass}" type="button" data-category="${category}">${category}</button>`;
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
  const filtered = TOOL_DEFS.filter((tool) => {
    if (appState.category !== "전체" && tool.category !== appState.category) {
      return false;
    }

    if (!query) return true;
    const haystack = [tool.title, tool.summary, tool.category, tool.keywords.join(" ")]
      .join(" ")
      .toLowerCase();
    return haystack.includes(query);
  });

  if (filtered.length === 0) {
    els.toolList.innerHTML = `<div class="tool-note">검색 조건에 맞는 도구가 없습니다.</div>`;
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
        <a class="tool-link ${activeClass}" href="${tool.path}">
          <div class="tool-link-tags">${tags}</div>
          <strong>${escapeHtml(tool.title)}</strong>
          <p>${escapeHtml(tool.summary)}</p>
        </a>
      `;
    })
    .join("");
}

function renderHomePage() {
  setPageMode("home");
  setHeroCopy(
    BRAND_NAME_EN,
    BRAND_NAME,
    "필요한 작업을 찾고, 넓은 작업공간에서 바로 처리하세요."
  );

  setDocumentMeta({
    title: `${BRAND_NAME} | 브라우저 기반 업무 도구 (${BRAND_NAME_EN})`,
    description: BRAND_DESCRIPTION,
    url: `${TOOL_ORIGIN}/`,
  });

  els.toolOverview.innerHTML = `
    <section class="home-toolbar" aria-label="도구 검색">
      <div class="home-toolbar-copy">
        <strong>무엇을 처리할까요?</strong>
        <span>${TOOL_DEFS.length}개 업무 도구를 바로 실행합니다.</span>
      </div>
      <label class="home-search" for="homeToolSearch">
        <span>도구 검색</span>
        <input id="homeToolSearch" type="search" placeholder="글자수, PDF, QR, 자막" autocomplete="off" />
      </label>
    </section>
  `;

  els.toolWorkspace.innerHTML = `
    <section class="home-tool-section home-directory" aria-label="\ub3c4\uad6c \ubaa9\ub85d">
      <div class="tool-launch-grid">
        ${TOOL_DEFS.map((tool) => renderToolLaunchCard(tool)).join("")}
      </div>
    </section>
  `;

  bindHomeToolSearch();
  renderGuideList([]);
  renderQuickToolDock(null);
}

function renderToolPage(tool) {
  setPageMode("tool");
  setHeroCopy("무료 온라인 도구", tool.title, tool.summary);
  setDocumentMeta({
    title: `${tool.seoTitle} | ${BRAND_NAME}`,
    description: tool.seoDescription,
    url: `${TOOL_ORIGIN}${tool.path}`,
  });

  els.toolOverview.innerHTML = `
    <div class="overview-header">
      <p class="eyebrow">${escapeHtml(tool.category)}</p>
      <h2>${escapeHtml(tool.title)}</h2>
      <p>${escapeHtml(tool.summary)}</p>
    </div>
    <div class="overview-meta">
      ${tool.keywords.map((keyword) => `<span class="mini-pill">${escapeHtml(keyword)}</span>`).join("")}
    </div>
  `;

  renderGuideList(tool.guide);
  renderQuickToolDock(tool);

  const renderer = TOOL_RENDERERS[tool.id];
  if (!renderer) {
    els.toolWorkspace.innerHTML = `<div class="tool-note">이 도구는 아직 연결되지 않았습니다.</div>`;
    return;
  }

  renderer(els.toolWorkspace);
}

function setPageMode(mode) {
  document.body.classList.toggle("home-mode", mode === "home");
  document.body.classList.toggle("tool-mode", mode === "tool");
}

function renderHomeSections() {
  return `
    <section class="home-tool-section home-directory" aria-label="\ub3c4\uad6c \ubaa9\ub85d">
      <div class="tool-launch-grid">
        ${TOOL_DEFS.map((tool) => renderToolLaunchCard(tool)).join("")}
      </div>
    </section>
  `;
}

function renderToolLaunchCard(tool) {
  const visual = TOOL_VISUALS[tool.id] || {
    icon: tool.title.slice(0, 1),
    tone: "slate",
    copy: tool.summary,
  };
  const searchText = [tool.title, tool.summary, visual.copy, ...tool.keywords].join(" ");

  return `
    <a class="tool-launch-card" href="${tool.path}" data-tone="${escapeHtml(visual.tone)}" data-search="${escapeHtml(searchText)}" aria-label="${escapeHtml(tool.title)} 열기">
      <span class="tool-launch-icon" aria-hidden="true">${escapeHtml(visual.icon)}</span>
      <span class="tool-launch-body">
        <strong>${escapeHtml(tool.title)}</strong>
        <span>${escapeHtml(visual.copy)}</span>
      </span>
      <span class="tool-launch-arrow" aria-hidden="true">&rsaquo;</span>
    </a>
  `;
}

function bindHomeToolSearch() {
  const searchInput = document.querySelector("#homeToolSearch");
  if (!searchInput) return;

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();
    document.querySelectorAll(".home-directory .tool-launch-card").forEach((card) => {
      const text = (card.dataset.search || card.textContent || "").toLowerCase();
      card.hidden = query.length > 0 && !text.includes(query);
    });
  });
}

function setHeroCopy(kicker, title, description) {
  els.heroEyebrow.textContent = kicker;
  els.pageTitle.textContent = title;
  els.pageDescription.textContent = description;
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

function injectStructuredData(tool) {
  document.querySelectorAll('script[data-schema="dynamic"]').forEach((node) => node.remove());
  if (document.querySelector(tool ? 'script[data-schema="static-tool"]' : 'script[data-schema="static-site"]')) {
    return;
  }
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.dataset.schema = "dynamic";

  if (!tool) {
    const categories = CATEGORY_ORDER.filter((category) => category !== "전체").map((category) => ({
      "@type": "ListItem",
      position: CATEGORY_ORDER.indexOf(category),
      name: category,
    }));
    script.textContent = JSON.stringify(
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${TOOL_ORIGIN}/#website`,
        name: BRAND_NAME,
        alternateName: [BRAND_NAME_EN, BRAND_DISPLAY_NAME],
        url: `${TOOL_ORIGIN}/`,
        inLanguage: "ko-KR",
        description: BRAND_DESCRIPTION,
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
        name: `${tool.title} - ${BRAND_NAME}`,
        alternateName: `${tool.title} - ${BRAND_NAME_EN}`,
        url: `${TOOL_ORIGIN}${tool.path}`,
        applicationCategory: "BusinessApplication",
        browserRequirements: "Requires a modern browser with JavaScript enabled",
        inLanguage: "ko-KR",
        description: tool.seoDescription || tool.summary,
        keywords: tool.keywords.join(", "),
        publisher: {
          "@type": "Organization",
          name: BRAND_NAME,
          url: `${TOOL_ORIGIN}/`,
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

const TOOL_RENDERERS = {
  "voice-to-text": renderVoiceTool,
  "webcam-recorder": renderWebcamRecorder,
  "ai-text-cleaner": renderAiTextCleaner,
  "character-counter": renderCharacterCounter,
  "line-break-cleaner": renderLineBreakCleaner,
  "markdown-editor": renderMarkdownEditor,
  "text-extractor": renderTextExtractor,
  "duplicate-line-remover": renderDuplicateLineRemover,
  "find-replace": renderFindReplaceTool,
  "case-converter": renderCaseConverter,
  "text-diff": renderTextDiffTool,
  "qr-code-generator": renderQrGenerator,
  "image-resizer": renderImageResizer,
  "image-converter": renderImageConverter,
  "image-compressor": renderImageCompressor,
  "pdf-merge": renderPdfMerge,
  "pdf-split": renderPdfSplit,
  "pdf-extract-pages": renderPdfExtractPages,
  "image-to-pdf": renderImageToPdf,
  "pdf-to-image": renderPdfToImage,
  "srt-cleaner": renderSrtCleaner,
  "subtitle-converter": renderSubtitleConverter,
  "subtitle-timing": renderSubtitleTiming,
};

function renderVoiceTool(container) {
  container.innerHTML = `
    <div class="tool-section">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Voice Input</p>
          <h2>음성 텍스트 받아쓰기</h2>
        </div>
        <div class="status-group" aria-live="polite">
          <span id="supportStatus" class="status-pill">확인 중</span>
          <span id="recordStatus" class="record-pill">대기</span>
        </div>
      </div>
      <div class="editor-card">
        <div class="action-row">
          <button id="startBtn" class="primary-action" type="button">녹음 시작</button>
          <button id="pauseBtn" type="button" disabled>일시정지</button>
          <button id="stopBtn" type="button" disabled>종료</button>
          <button id="clearBtn" type="button">초기화</button>
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
              <h2>음성 텍스트</h2>
              <p id="liveMeta" class="tool-note">0자 · 00:00</p>
            </div>
            <span id="interimText" class="tool-note"></span>
          </div>
          <textarea id="transcriptInput" placeholder="녹음이 시작되면 여기에 말한 내용이 쌓입니다."></textarea>
        </article>
        <aside class="editor-card">
          <div class="field">
            <label for="scriptTitle">제목</label>
            <input id="scriptTitle" type="text" placeholder="예: 신제품 소개 영상" />
          </div>
          <div class="field">
            <label for="scriptType">형식</label>
            <select id="scriptType">
              <option value="general">일반 대본</option>
              <option value="youtube">유튜브 영상</option>
              <option value="presentation">발표문</option>
              <option value="meeting">회의 요약</option>
            </select>
          </div>
          <div class="check-row">
            <label class="check-item"><input id="removeFillers" type="checkbox" checked /> 군더더기 말 정리</label>
            <label class="check-item"><input id="addSections" type="checkbox" checked /> 문단 제목 추가</label>
          </div>
          <button id="makeScriptBtn" class="primary-action" type="button">대본 만들기</button>
          <p class="tool-note">마이크가 끊기면 브라우저가 자동 재연결을 시도합니다. Chrome 또는 Edge 환경을 권장합니다.</p>
        </aside>
      </div>
      <article class="result-card">
        <div class="section-heading">
          <div>
            <h2>완성 대본</h2>
            <p id="outputMeta" class="tool-note">0자</p>
          </div>
          <div class="action-row">
            <button id="copyBtn" type="button">복사</button>
            <button id="downloadBtn" type="button">TXT 저장</button>
          </div>
        </div>
        <textarea id="scriptOutput" placeholder="정리된 대본이 여기에 만들어집니다."></textarea>
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
    voiceEls.supportStatus.textContent = "음성 인식 미지원";
    voiceEls.startBtn.disabled = true;
    showToast("Chrome 또는 Edge에서 실행해 주세요.");
  } else {
    voiceEls.supportStatus.textContent = "한국어 인식 준비";
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
      showToast("복사할 내용이 없습니다.");
      return;
    }
    await safeCopy(text, "클립보드에 복사했습니다.");
  });
  voiceEls.downloadBtn.addEventListener("click", () => {
    const text = voiceEls.scriptOutput.value.trim() || voiceEls.transcriptInput.value.trim();
    if (!text) {
      showToast("저장할 내용이 없습니다.");
      return;
    }
    downloadText(text, `${sanitizeFilename(voiceEls.scriptTitle.value || "대본")}.txt`);
  });
  voiceEls.transcriptInput.addEventListener("input", updateMeta);
  voiceEls.scriptOutput.addEventListener("input", updateOutputMeta);

  syncButtons();
  updateMeta();
  updateOutputMeta();

  function createVoiceRecognition(voiceState, nodes) {
    const recognition = new SpeechRecognition();
    recognition.lang = "ko-KR";
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      voiceState.isListening = true;
      voiceState.isPaused = false;
      voiceState.lastEndReason = null;
      voiceState.heardSpeechInSession = false;
      nodes.recordStatus.textContent = "녹음 중";
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
        nodes.recordStatus.textContent = "말 대기 중";
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
          voiceState.lastEndReason === "no-speech" ? "말 대기 중" : "다시 연결 중";
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
      showToast("마이크 권한을 허용해야 녹음을 시작할 수 있습니다.");
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
    voiceEls.recordStatus.textContent = "일시정지";
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
      showToast("먼저 마이크로 말하거나 텍스트를 입력해 주세요.");
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
    voiceEls.startBtn.textContent = state.isPaused ? "다시 시작" : "녹음 시작";
    voiceEls.startBtn.disabled = state.isListening && !state.isPaused;
    voiceEls.pauseBtn.disabled = !state.isListening || state.isPaused;
    voiceEls.stopBtn.disabled = !state.isListening && !state.isPaused;
  }

  function syncIdleStatus() {
    if (state.isPaused) {
      voiceEls.recordStatus.textContent = "일시정지";
      voiceEls.recordStatus.classList.remove("active");
      syncButtons();
      return;
    }

    state.isListening = false;
    voiceEls.recordStatus.textContent = "대기";
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
    voiceEls.liveMeta.textContent = `${chars.toLocaleString("ko-KR")}자 · ${formatClock(seconds)}`;
  }

  function updateOutputMeta() {
    const chars = voiceEls.scriptOutput.value.trim().length;
    voiceEls.outputMeta.textContent = `${chars.toLocaleString("ko-KR")}자`;
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
        showToast("음성 인식을 다시 시작하지 못했습니다. 녹음 시작을 다시 눌러 주세요.");
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
  };

  const context = nodes.canvas.getContext("2d", { alpha: false });
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
  [nodes.brightnessRange, nodes.contrastRange, nodes.saturationRange].forEach((input) => {
    input.addEventListener("input", syncRangeLabels);
  });
  nodes.includeMic.addEventListener("change", updatePermissionUi);
  window.addEventListener("beforeunload", stopAllMedia, { once: true });

  initPermissionStatus();
  syncRangeLabels();
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

    context.save();
    context.fillStyle = "#101828";
    context.fillRect(0, 0, width, height);
    context.filter = buildCanvasFilter();
    if (nodes.mirrorVideo.checked) {
      context.translate(width, 0);
      context.scale(-1, 1);
    }
    context.drawImage(video, 0, 0, width, height);
    context.restore();

    state.animationId = window.requestAnimationFrame(drawPreviewFrame);
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
          <div class="field-row">
            <div class="field">
              <label for="qrSize">크기</label>
              <input id="qrSize" type="number" min="120" max="720" step="10" value="240" />
            </div>
            <div class="field">
              <label for="qrLevel">오류 복원</label>
              <select id="qrLevel">
                <option value="L">L</option>
                <option value="M" selected>M</option>
                <option value="Q">Q</option>
                <option value="H">H</option>
              </select>
            </div>
          </div>
          <div class="action-row">
            <button id="makeBtn" class="primary-action" type="button">QR 만들기</button>
            <button id="downloadBtn" type="button">SVG 저장</button>
          </div>
          <p id="status" class="tool-note">라이브러리를 불러오는 동안 잠시 기다릴 수 있습니다.</p>
        </aside>
        <article class="preview-card">
          <div class="section-heading">
            <div><h2>미리보기</h2></div>
          </div>
          <div id="qrPreview" class="qr-frame">QR 생성 전입니다.</div>
        </article>
      </div>
    </div>
  `;

  const fields = container.querySelector("#qrFields");
  const preview = container.querySelector("#qrPreview");
  const status = container.querySelector("#status");
  let lastSvg = "";

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
      const level = container.querySelector("#qrLevel").value;
      const size = clampNumber(Number(container.querySelector("#qrSize").value || 240), 120, 720);
      const payload = buildQrPayload(container, mode);
      if (!payload) {
        showToast("QR에 넣을 내용을 입력해 주세요.");
        return;
      }

      const qr = qrcode(0, level);
      qr.addData(payload);
      qr.make();
      lastSvg = qr.createSvgTag({ scalable: true, margin: 0 });
      preview.innerHTML = `<div style="width:${size}px">${lastSvg}</div>`;
      status.textContent = "QR 생성이 완료되었습니다.";
    } catch (error) {
      status.textContent = "QR 라이브러리를 불러오지 못했습니다.";
      showToast("QR 기능을 준비하지 못했습니다. 잠시 후 다시 시도해 주세요.");
    }
  });

  container.querySelector("#downloadBtn").addEventListener("click", () => {
    if (!lastSvg) {
      showToast("먼저 QR 코드를 만들어 주세요.");
      return;
    }
    const blob = new Blob([lastSvg], { type: "image/svg+xml;charset=utf-8" });
    downloadBlob(blob, "qr-code.svg");
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
            <p>JPG, PNG, WEBP 이미지를 선택합니다.</p>
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
            <p>원본 이미지를 선택한 뒤 변환 형식을 고릅니다.</p>
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
            <p>업로드용으로 줄일 이미지를 선택합니다.</p>
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

function renderPdfMerge(container) {
  container.innerHTML = `
    <div class="tool-section">
      <aside class="action-card">
        <div class="upload-box">
          <label for="pdfFiles">PDF 여러 개 선택</label>
          <input id="pdfFiles" type="file" accept="application/pdf" multiple />
          <p>선택한 순서대로 병합됩니다.</p>
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
          <p>페이지 수 기준으로 여러 PDF로 나눕니다.</p>
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
          <p>예: 1-3,5,8 같은 형식으로 필요한 페이지를 추출합니다.</p>
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
          <p>선택한 이미지 순서대로 PDF 페이지를 만듭니다.</p>
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
          <p>페이지를 PNG로 렌더링합니다.</p>
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
        <article class="input-card">
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
        <article class="input-card">
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
        <article class="input-card">
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
      lines.push(`## ${sectionLabels[index] || `파트 ${index + 1}`}`);
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
  if (addSections) lines.push("## 핵심 요약");
  summary.forEach((sentence) => lines.push(`- ${sentence}`));
  if (details.length > 0) {
    lines.push("");
    if (addSections) lines.push("## 상세 내용");
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
  const labels = {
    general: ["도입", "본문", "마무리"],
    youtube: ["오프닝", "핵심 내용", "콜 투 액션"],
    presentation: ["문제 제기", "주요 내용", "결론"],
  };
  const base = labels[type] || labels.general;
  return Array.from({ length: count }, (_, index) => base[index] || `파트 ${index + 1}`);
}

function getDefaultTitle(type) {
  const titles = {
    general: "생성된 대본",
    youtube: "유튜브 영상 대본",
    presentation: "발표 대본",
    meeting: "회의 요약",
  };
  return titles[type] || titles.general;
}

function getRecognitionErrorMessage(error) {
  const messages = {
    "no-speech": "소리가 감지되지 않았습니다. 조금 더 크게 말해 주세요.",
    "audio-capture": "마이크를 찾을 수 없습니다.",
    "not-allowed": "마이크 권한이 차단되었습니다.",
    "service-not-allowed": "브라우저 음성 인식 서비스가 차단되었습니다.",
    network: "음성 인식 서비스 연결이 불안정합니다.",
  };
  return messages[error] || `음성 인식 오류: ${error}`;
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
        .replace(/([.!?。！？])(?=[가-힣A-Za-z])/g, "$1\n")
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
    .map((paragraph) => paragraph.replace(/\s*\n\s*/g, " ").replace(/[ \t]{2,}/g, " ").trim())
    .filter(Boolean)
    .join("\n\n");
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

function bindSubtitleFileInput(container, inputSelector, textareaSelector) {
  const fileInput = container.querySelector(inputSelector);
  const textarea = container.querySelector(textareaSelector);
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
        module.GlobalWorkerOptions.workerSrc = info.worker;
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
  const lines = normalizeNewlines(text)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  if (lines.length < 2 || !lines.every((line) => line.includes("|"))) return "";

  const rows = lines
    .filter((line, index) => !(index === 1 && /^[:|\-\s]+$/.test(line)))
    .map((line) =>
      line
        .replace(/^\|/, "")
        .replace(/\|$/, "")
        .split("|")
        .map((cell) => cell.trim())
        .join("\t")
    );

  return rows.join("\n");
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
  toast.textContent = message;
  document.body.appendChild(toast);
  window.setTimeout(() => toast.remove(), 3200);
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
    hideSelectionCopyButton();
    return;
  }

  appState.selectedText = info.text;
  positionSelectionCopyButton(info);
  els.selectionCopyBtn.hidden = false;
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
  await safeCopy(appState.selectedText, "선택한 내용을 복사했습니다.");
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

  const tools = TOOL_DEFS.filter((tool) => tool.id !== activeTool.id);
  const pageSize = 10;
  const step = 5;
  const maxOffset = Math.max(0, tools.length - pageSize);
  appState.quickOffset = Math.min(Math.max(appState.quickOffset, 0), maxOffset);
  const visible = tools.slice(appState.quickOffset, appState.quickOffset + pageSize);
  const motionClass = appState.quickMotion ? ` is-sliding-${appState.quickMotion}` : "";

  dock.hidden = false;
  dock.innerHTML = `
    <div class="quick-tool-head">
      <strong>다른 도구</strong>
      <span>${appState.quickOffset + 1}-${Math.min(appState.quickOffset + pageSize, tools.length)} / ${tools.length}</span>
    </div>
    <div class="quick-tool-strip" aria-label="다른 도구로 이동">
      <button class="quick-tool-arrow" type="button" data-shift="${-step}" aria-label="이전 도구 보기" ${appState.quickOffset === 0 ? "disabled" : ""}>‹</button>
      <div class="quick-tool-icons${motionClass}">
        ${visible.map(renderQuickToolIcon).join("")}
      </div>
      <button class="quick-tool-arrow" type="button" data-shift="${step}" aria-label="다음 도구 보기" ${appState.quickOffset >= maxOffset ? "disabled" : ""}>›</button>
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
  const visual = TOOL_VISUALS[tool.id] || {
    icon: tool.title.slice(0, 1),
    tone: "slate",
  };

  return `
    <a class="quick-tool-item" href="${tool.path}" data-tone="${escapeHtml(visual.tone)}" title="${escapeHtml(tool.title)}" aria-label="${escapeHtml(tool.title)} 열기">
      <span class="quick-tool-icon" aria-hidden="true">
        <span class="quick-tool-symbol">${escapeHtml(visual.icon)}</span>
      </span>
      <span class="quick-tool-label">${escapeHtml(tool.title)}</span>
    </a>
  `;
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

function markdownToHtml(markdown) {
  const source = normalizeNewlines(markdown);
  if (!source.trim()) {
    return `<p class="tool-note">마크다운을 입력하면 미리보기가 여기에 표시됩니다.</p>`;
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
