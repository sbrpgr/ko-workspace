const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const TOOL_ORIGIN = "https://ko-workspace.com";
const BRAND_NAME = "코워크스페이스";
const BRAND_NAME_EN = "ko-workspace";
const BRAND_DISPLAY_NAME = `${BRAND_NAME} (${BRAND_NAME_EN})`;
const BRAND_DESCRIPTION =
  "코워크스페이스(ko-workspace)는 로그인 없이 브라우저에서 바로 실행되는 텍스트, 이미지, PDF, 자막, 음성 업무 도구 모음입니다.";

const TOOL_DEFS = [
  {
    id: "voice-to-text",
    path: "/tools/voice-to-text/",
    category: "핵심",
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
    related: ["ai-text-cleaner", "character-counter", "line-break-cleaner"],
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
    related: ["line-break-cleaner", "find-replace", "character-counter"],
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
    related: ["line-break-cleaner", "ai-text-cleaner", "duplicate-line-remover"],
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
    related: ["ai-text-cleaner", "duplicate-line-remover", "find-replace"],
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
    related: ["duplicate-line-remover", "find-replace", "character-counter"],
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
    related: ["text-extractor", "line-break-cleaner", "character-counter"],
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
    related: ["line-break-cleaner", "ai-text-cleaner", "case-converter"],
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
    related: ["find-replace", "ai-text-cleaner", "text-diff"],
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
    related: ["find-replace", "case-converter", "duplicate-line-remover"],
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
    related: ["image-resizer", "image-converter", "text-extractor"],
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
    related: ["image-converter", "image-compressor", "qr-code-generator"],
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
    related: ["image-resizer", "image-compressor", "image-to-pdf"],
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
    related: ["image-resizer", "image-converter", "image-to-pdf"],
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
    related: ["pdf-split", "pdf-extract-pages", "image-to-pdf"],
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
    related: ["pdf-merge", "pdf-extract-pages", "pdf-to-image"],
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
    related: ["pdf-merge", "pdf-split", "pdf-to-image"],
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
    related: ["pdf-merge", "image-converter", "pdf-to-image"],
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
    related: ["pdf-extract-pages", "image-to-pdf", "pdf-split"],
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
    related: ["subtitle-converter", "subtitle-timing", "find-replace"],
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
    related: ["srt-cleaner", "subtitle-timing", "text-diff"],
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
    related: ["srt-cleaner", "subtitle-converter", "text-diff"],
  },
];

const TOOL_MAP = Object.fromEntries(TOOL_DEFS.map((tool) => [tool.id, tool]));
const CATEGORY_ORDER = ["전체", "핵심", "텍스트", "이미지", "PDF", "자막"];
const TOOL_BADGES = {
  "voice-to-text": "MIC",
  "ai-text-cleaner": "AI",
  "character-counter": "TXT",
  "line-break-cleaner": "BR",
  "text-extractor": "@",
  "duplicate-line-remover": "DUP",
  "find-replace": "FR",
  "case-converter": "Aa",
  "text-diff": "DIF",
  "qr-code-generator": "QR",
  "image-resizer": "IMG",
  "image-converter": "JPG",
  "image-compressor": "ZIP",
  "pdf-merge": "PDF",
  "pdf-split": "CUT",
  "pdf-extract-pages": "PGE",
  "image-to-pdf": "I2P",
  "pdf-to-image": "P2I",
  "srt-cleaner": "SRT",
  "subtitle-converter": "VTT",
  "subtitle-timing": "SYNC",
};

const HOME_CATEGORY_META = {
  핵심: {
    label: "Core",
    description: "가장 자주 쓰는 입력 도구입니다.",
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
  relatedTools: document.querySelector("#relatedTools"),
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
    "자주 쓰는 업무 도구를 한 화면에서 고르고 바로 실행하는 작업 허브입니다."
  );

  setDocumentMeta({
    title: `${BRAND_NAME} | 브라우저 기반 업무 도구 (${BRAND_NAME_EN})`,
    description: BRAND_DESCRIPTION,
    url: `${TOOL_ORIGIN}/`,
  });

  els.toolOverview.innerHTML = `
    <div class="overview-header">
      <p class="eyebrow">Tool Launcher</p>
      <h2>필요한 기능을 바로 여세요</h2>
      <p>
        텍스트 정리, 이미지 변환, PDF 처리, 자막 보정, 음성 입력을 카테고리별로 정리했습니다. 각 카드를 누르면 해당 도구가 바로 열립니다.
      </p>
    </div>
    <div class="home-metrics" aria-label="서비스 요약">
      <span><strong>${TOOL_DEFS.length}</strong><small>tools</small></span>
      <span><strong>${CATEGORY_ORDER.length - 1}</strong><small>groups</small></span>
      <span><strong>0</strong><small>login</small></span>
    </div>
  `;

  els.toolWorkspace.innerHTML = `
    <div class="stack">
      ${renderHomeSections()}
    </div>
  `;

  renderGuideList([]);
  renderRelatedTools([]);
}

function renderToolPage(tool) {
  setPageMode("tool");
  setHeroCopy(tool.category, tool.title, tool.summary);
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
  renderRelatedTools(
    tool.related.map((toolId) => ({
      path: TOOL_MAP[toolId].path,
      title: TOOL_MAP[toolId].title,
    }))
  );

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
  return CATEGORY_ORDER.filter((category) => category !== "전체")
    .map((category) => {
      const tools = TOOL_DEFS.filter((tool) => tool.category === category);
      const meta = HOME_CATEGORY_META[category] || {
        label: category,
        description: `${category} 도구 모음입니다.`,
      };
      return `
        <section class="home-tool-section">
          <div class="home-section-head">
            <span class="home-section-mark">${escapeHtml(meta.label)}</span>
            <div class="home-section-copy">
              <p class="eyebrow">${escapeHtml(category)}</p>
              <h2>${escapeHtml(category)} 도구</h2>
              <p>${escapeHtml(meta.description)}</p>
            </div>
            <span class="home-section-count">${tools.length}개</span>
          </div>
          <div class="tool-launch-grid">
            ${tools.map((tool) => renderToolLaunchCard(tool)).join("")}
          </div>
        </section>
      `;
    })
    .join("");
}

function renderToolLaunchCard(tool) {
  const badge = TOOL_BADGES[tool.id] || tool.title.slice(0, 2).toUpperCase();
  return `
    <a class="tool-launch-card" href="${tool.path}" data-category="${escapeHtml(tool.category)}">
      <span class="tool-launch-top">
        <span class="tool-launch-icon">${escapeHtml(badge)}</span>
        <span class="tool-launch-category">${escapeHtml(tool.category)}</span>
      </span>
      <strong>${escapeHtml(tool.title)}</strong>
      <p>${escapeHtml(tool.summary)}</p>
      <span class="tool-launch-action" aria-hidden="true">열기</span>
    </a>
  `;
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

function renderRelatedTools(items) {
  if (!items || items.length === 0) {
    els.relatedTools.innerHTML = "";
    return;
  }
  els.relatedTools.innerHTML = items
    .map((item) => `<a href="${item.path}">${escapeHtml(item.title)}</a>`)
    .join("");
}

function injectStructuredData(tool) {
  document.querySelectorAll('script[data-schema="dynamic"]').forEach((node) => node.remove());
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
        description: tool.summary,
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
  "ai-text-cleaner": renderAiTextCleaner,
  "character-counter": renderCharacterCounter,
  "line-break-cleaner": renderLineBreakCleaner,
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
  if (options.collapseBlank) {
    result = result.replace(/\n{3,}/g, "\n\n");
  }
  return result.trim();
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

function wait(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

init();
