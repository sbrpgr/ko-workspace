const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

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
  recognitionRunning: false,
  heardSpeechInSession: false,
  selectedText: "",
  lastPointer: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
  selectionCheckTimerId: null,
};

const els = {
  supportStatus: document.querySelector("#supportStatus"),
  recordStatus: document.querySelector("#recordStatus"),
  startBtn: document.querySelector("#startBtn"),
  pauseBtn: document.querySelector("#pauseBtn"),
  stopBtn: document.querySelector("#stopBtn"),
  clearBtn: document.querySelector("#clearBtn"),
  makeScriptBtn: document.querySelector("#makeScriptBtn"),
  copyBtn: document.querySelector("#copyBtn"),
  downloadBtn: document.querySelector("#downloadBtn"),
  transcriptInput: document.querySelector("#transcriptInput"),
  scriptOutput: document.querySelector("#scriptOutput"),
  interimText: document.querySelector("#interimText"),
  liveMeta: document.querySelector("#liveMeta"),
  outputMeta: document.querySelector("#outputMeta"),
  scriptTitle: document.querySelector("#scriptTitle"),
  scriptType: document.querySelector("#scriptType"),
  removeFillers: document.querySelector("#removeFillers"),
  addSections: document.querySelector("#addSections"),
  meter: document.querySelector(".meter"),
  selectionCopyBtn: document.querySelector("#selectionCopyBtn"),
};

function init() {
  if (!SpeechRecognition) {
    els.supportStatus.textContent = "음성 인식 미지원";
    els.startBtn.disabled = true;
    showToast("Chrome 또는 Edge에서 실행해 주세요.");
  } else {
    els.supportStatus.textContent = "한국어 인식 준비";
    createRecognition();
  }

  bindEvents();
  updateMeta();
}

function bindEvents() {
  els.startBtn.addEventListener("click", startListening);
  els.pauseBtn.addEventListener("click", pauseListening);
  els.stopBtn.addEventListener("click", stopListening);
  els.clearBtn.addEventListener("click", clearAll);
  els.makeScriptBtn.addEventListener("click", makeScript);
  els.copyBtn.addEventListener("click", copyScript);
  els.downloadBtn.addEventListener("click", downloadScript);
  els.transcriptInput.addEventListener("input", updateMeta);
  els.scriptOutput.addEventListener("input", updateOutputMeta);

  els.selectionCopyBtn.addEventListener("pointerdown", (event) => event.preventDefault());
  els.selectionCopyBtn.addEventListener("click", copySelectedText);

  [els.transcriptInput, els.scriptOutput].forEach((field) => {
    field.addEventListener("select", queueSelectionCheck);
    field.addEventListener("keyup", queueSelectionCheck);
    field.addEventListener("mouseup", queueSelectionCheck);
    field.addEventListener("touchend", queueSelectionCheck);
    field.addEventListener("input", hideSelectionCopyButton);
  });

  document.addEventListener("pointerup", (event) => {
    state.lastPointer = { x: event.clientX, y: event.clientY };
    queueSelectionCheck();
  });
  document.addEventListener("selectionchange", queueSelectionCheck);
  window.addEventListener("scroll", hideSelectionCopyButton, true);
  window.addEventListener("resize", hideSelectionCopyButton);
}

function createRecognition() {
  const recognition = new SpeechRecognition();
  recognition.lang = "ko-KR";
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;

  recognition.onstart = () => {
    state.isListening = true;
    state.isPaused = false;
    state.lastEndReason = null;
    state.recognitionRunning = true;
    state.heardSpeechInSession = false;
    els.recordStatus.textContent = "녹음 중";
    els.recordStatus.classList.add("active");
    els.interimText.textContent = "";
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
      state.noSpeechCount = 0;
      state.heardSpeechInSession = true;
    }

    els.interimText.textContent = interim.trim();
  };

  recognition.onerror = (event) => {
    if (event.error === "no-speech") {
      state.noSpeechCount += 1;
      state.lastEndReason = "no-speech";
      els.recordStatus.textContent = "말 대기 중";
      return;
    }

    state.lastEndReason = event.error;
    const message = getRecognitionErrorMessage(event.error);
    showToast(message);
    if (
      event.error === "not-allowed" ||
      event.error === "service-not-allowed" ||
      event.error === "audio-capture"
    ) {
      stopListening();
    }
  };

  recognition.onend = () => {
    state.recognitionRunning = false;
    els.interimText.textContent = "";

    if (state.isListening && !state.isPaused) {
      els.recordStatus.textContent =
        state.lastEndReason === "no-speech" ? "말 대기 중" : "다시 연결 중";
      scheduleRecognitionRestart(recognition);
      return;
    }

    stopTimer();
    stopMeter();
    syncIdleStatus();
  };

  state.recognition = recognition;
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
  els.recordStatus.textContent = "일시정지";
  els.recordStatus.classList.remove("active");
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

  const current = els.transcriptInput.value.trim();
  els.transcriptInput.value = current ? `${current}\n${clean}` : clean;
  updateMeta();
}

function makeScript() {
  const source = els.transcriptInput.value.trim();
  if (!source) {
    showToast("먼저 마이크로 말하거나 텍스트를 입력해 주세요.");
    return;
  }

  const title = els.scriptTitle.value.trim();
  const cleaned = cleanTranscript(source, els.removeFillers.checked);
  const sentences = splitSentences(cleaned);
  const script = composeScript({
    title,
    type: els.scriptType.value,
    sentences,
    addSections: els.addSections.checked,
  });

  els.scriptOutput.value = script;
  updateOutputMeta();
}

function cleanTranscript(text, removeFillers) {
  let result = text
    .replace(/\s+/g, " ")
    .replace(/\s+([,.?!。！？])/g, "$1")
    .trim();

  if (removeFillers) {
    const fillerWords = [
      "음",
      "어",
      "그러니까",
      "뭐랄까",
      "약간",
      "이제",
      "일단",
      "뭔가",
    ];
    const fillerPattern = new RegExp(`(^|\\s)(${fillerWords.join("|")})(?=\\s|,|\\.|$)`, "g");
    result = result.replace(fillerPattern, " ").replace(/\s+/g, " ").trim();
  }

  return result;
}

function splitSentences(text) {
  const normalized = text
    .replace(/([.!?。！？])\s*/g, "$1|")
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean);

  if (normalized.length > 1) {
    return normalized.map(ensureSentenceEnd);
  }

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

  if (current.length > 0) {
    chunks.push(current.join(" "));
  }

  return chunks;
}

function ensureSentenceEnd(sentence) {
  if (/[.!?。！？]$/.test(sentence)) return sentence;
  return `${sentence}.`;
}

function composeScript({ title, type, sentences, addSections }) {
  const heading = title || getDefaultTitle(type);
  const body = groupParagraphs(sentences, 3);

  if (type === "meeting") {
    return composeMeetingSummary(heading, sentences, addSections);
  }

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

function startMeter() {
  els.meter.classList.add("listening");
}

function stopMeter() {
  els.meter.classList.remove("listening");
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
    const silenceIndex = Math.min(state.noSpeechCount - 1, silenceDelays.length - 1);
    return silenceDelays[Math.max(silenceIndex, 0)] + attempt * 600;
  }

  return 900 + attempt * 600;
}

function clearAll() {
  els.transcriptInput.value = "";
  els.scriptOutput.value = "";
  els.interimText.textContent = "";
  state.elapsedBeforePause = 0;
  state.startedAt = state.isListening && !state.isPaused ? Date.now() : null;
  updateMeta();
  updateOutputMeta();
}

async function copyScript() {
  const text = els.scriptOutput.value.trim() || els.transcriptInput.value.trim();
  if (!text) {
    showToast("복사할 내용이 없습니다.");
    return;
  }

  try {
    await writeClipboard(text);
    showToast("클립보드에 복사했습니다.");
  } catch (error) {
    showToast("브라우저에서 복사를 허용하지 않았습니다.");
  }
}

async function copySelectedText() {
  const text = state.selectedText;
  if (!text.trim()) {
    hideSelectionCopyButton();
    return;
  }

  try {
    await writeClipboard(text);
    hideSelectionCopyButton();
    showToast("선택한 내용을 복사했습니다.");
  } catch (error) {
    showToast("선택한 내용을 복사하지 못했습니다.");
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

function downloadScript() {
  const text = els.scriptOutput.value.trim() || els.transcriptInput.value.trim();
  if (!text) {
    showToast("저장할 내용이 없습니다.");
    return;
  }

  const filename = `${sanitizeFilename(els.scriptTitle.value || "대본")}.txt`;
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(link.href);
}

function sanitizeFilename(name) {
  return name.trim().replace(/[\\/:*?"<>|]/g, "_") || "대본";
}

function queueSelectionCheck() {
  if (state.selectionCheckTimerId) {
    window.clearTimeout(state.selectionCheckTimerId);
  }

  state.selectionCheckTimerId = window.setTimeout(() => {
    state.selectionCheckTimerId = null;
    updateSelectionCopyButton();
  }, 0);
}

function updateSelectionCopyButton() {
  const selection = getSelectedTextInfo();
  if (!selection || !selection.text.trim()) {
    hideSelectionCopyButton();
    return;
  }

  state.selectedText = selection.text;
  positionSelectionCopyButton(selection);
  els.selectionCopyBtn.hidden = false;
}

function getSelectedTextInfo() {
  const active = document.activeElement;
  if (isEditableTextControl(active)) {
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
  return {
    text,
    rect: range.getBoundingClientRect(),
    usePointer: false,
  };
}

function isEditableTextControl(element) {
  return element === els.transcriptInput || element === els.scriptOutput;
}

function positionSelectionCopyButton(selection) {
  const button = els.selectionCopyBtn;
  const rect = selection.rect;
  const buttonWidth = 92;
  const buttonHeight = 34;
  let left = state.lastPointer.x - buttonWidth / 2;
  let top = state.lastPointer.y - buttonHeight - 12;

  if (!selection.usePointer && rect && rect.width > 0) {
    left = rect.left + rect.width / 2 - buttonWidth / 2;
    top = rect.top - buttonHeight - 10;
  }

  if (selection.usePointer && rect) {
    const insideField =
      state.lastPointer.x >= rect.left &&
      state.lastPointer.x <= rect.right &&
      state.lastPointer.y >= rect.top &&
      state.lastPointer.y <= rect.bottom;

    if (!insideField) {
      left = rect.right - buttonWidth - 12;
      top = rect.top + 12;
    }
  }

  left = Math.max(8, Math.min(left, window.innerWidth - buttonWidth - 8));
  top = Math.max(8, Math.min(top, window.innerHeight - buttonHeight - 8));

  button.style.left = `${left}px`;
  button.style.top = `${top}px`;
}

function hideSelectionCopyButton() {
  state.selectedText = "";
  els.selectionCopyBtn.hidden = true;
}

function syncButtons() {
  els.startBtn.textContent = state.isPaused ? "다시 시작" : "녹음 시작";
  els.startBtn.disabled = state.isListening && !state.isPaused;
  els.pauseBtn.disabled = !state.isListening || state.isPaused;
  els.stopBtn.disabled = !state.isListening && !state.isPaused;
}

function syncIdleStatus() {
  if (state.isPaused) {
    els.recordStatus.textContent = "일시정지";
    els.recordStatus.classList.remove("active");
    syncButtons();
    return;
  }

  state.isListening = false;
  els.recordStatus.textContent = "대기";
  els.recordStatus.classList.remove("active");
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
  const chars = els.transcriptInput.value.trim().length;
  const seconds = Math.floor(getElapsedMs() / 1000);
  els.liveMeta.textContent = `${chars.toLocaleString("ko-KR")}자 · ${formatTime(seconds)}`;
}

function updateOutputMeta() {
  const chars = els.scriptOutput.value.trim().length;
  els.outputMeta.textContent = `${chars.toLocaleString("ko-KR")}자`;
}

function formatTime(totalSeconds) {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
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

function showToast(message) {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);

  window.setTimeout(() => {
    toast.remove();
  }, 3200);
}

init();
