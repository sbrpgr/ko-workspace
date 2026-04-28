# Privacy-Safe Analytics Plan

코워크스페이스의 GA/GTM 이벤트는 도구 사용 흐름만 파악하고, 사용자가 입력한 텍스트, 파일명, 추출 결과, 녹음/녹화 내용은 전송하지 않는다.

## Current Event Contract

| Event | When | Allowed Parameters |
| --- | --- | --- |
| `tool_open` | 도구 페이지가 열렸을 때 | `tool_id`, `tool_category` |
| `tool_run` | 정리, 변환, 생성, 비교, 렌더링, 녹화 시작 같은 실행 버튼을 눌렀을 때 | `tool_id`, `tool_category`, `action`, `control_id`, `output_format` |
| `result_copy` | 결과 복사 버튼을 눌렀을 때 | `tool_id`, `tool_category`, `action`, `control_id` |
| `file_download` | 다운로드 버튼을 눌렀을 때 | `tool_id`, `tool_category`, `action`, `control_id`, `output_format` |
| `permission_request` | 마이크/카메라 권한 요청 또는 연결 버튼을 눌렀을 때 | `tool_id`, `tool_category`, `action`, `control_id` |
| `tool_help_open` | 사용 예시와 FAQ 접힘 영역을 열었을 때 | `tool_id`, `tool_category`, `section` |
| `tool_error` | 향후 오류 추적이 필요한 경우 | `tool_id`, `tool_category`, `action`, `control_id` |
| `category_open` | 카테고리 랜딩 페이지가 열렸을 때 | `category_page_id`, `category_page_title`, `tool_count` |

## Never Send

- 사용자가 입력한 텍스트
- 파일명
- 이메일, URL, 전화번호 추출 결과
- 녹음 또는 녹화 내용
- 업로드한 이미지의 이름이나 내용
- 브라우저 권한의 세부 사용자 설정

## GTM Setup Notes

- GTM container: `GTM-W3MF6BSN`
- GA4 태그는 GTM 안에서 `dataLayer` 이벤트명을 기준으로 연결한다.
- 이벤트 매개변수는 위 표에 있는 allowlist만 사용한다.
- 전환 이벤트는 충분한 사용량을 확인한 뒤 `file_download`, `result_copy` 중 필요한 항목만 지정한다.
