import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

const root = new URL("../", import.meta.url);
const html = await readFile(new URL("index.html", root), "utf8");
const resumeSource = await readFile(new URL("scripts/build_resume.js", root), "utf8");
const resume = await readFile(new URL("Ola_Ayilara_Resume_Generic.docx", root));
const inlineScript = html.match(/<script>([\s\S]*?)<\/script>/)?.[1] || "";

test("ships the required GitHub Pages entry file", () => {
  assert.match(html, /^<!doctype html>/i);
  assert.match(html, /<title>Ola Ayilara \| Product Design Portfolio Assistant<\/title>/);
  assert.match(html, /href="Ola_Ayilara_Resume_Generic\.docx"/);
});

test("contains generic positioning without Babylist language", () => {
  assert.doesNotMatch(html, /Babylist/i);
  assert.doesNotMatch(resumeSource, /Babylist/i);
  assert.match(html, /Senior Product Designer/);
  assert.match(resumeSource, /B2B SaaS/);
});

test("uses the approved centred layout without portfolio website links", () => {
  assert.doesNotMatch(html, /class="profile-panel"/);
  assert.match(html, /class="profile-strip"/);
  assert.match(html, /class="chat-panel"/);
  assert.doesNotMatch(html, /href="https?:\/\/(www\.)?tunde\.me/i);
  assert.doesNotMatch(html, />\s*(View full portfolio|www\.tunde\.me)\s*</i);
});

test("resume is a valid Office ZIP container", () => {
  assert.equal(resume.subarray(0, 2).toString("utf8"), "PK");
  assert.ok(resume.length > 5000);
});

test("inline JavaScript has valid syntax", () => {
  assert.ok(inlineScript.length > 1000);
  assert.doesNotThrow(() => new vm.Script(inlineScript));
});

test("guardrails are present and bounded", () => {
  assert.match(inlineScript, /MAX_INPUT_LENGTH = 280/);
  assert.match(inlineScript, /MAX_MESSAGES_PER_WINDOW = 6/);
  assert.match(inlineScript, /RATE_WINDOW_MS = 30000/);
  assert.match(inlineScript, /MAX_RENDERED_ROWS = 25/);
  assert.match(inlineScript, /abusePattern/);
  assert.match(html, /maxlength="280"/);
  assert.match(html, /Portfolio questions only/);
});

test("local engine supports weighted matching and conversation context", () => {
  assert.match(inlineScript, /const knowledgeBase =/);
  assert.match(inlineScript, /function scoreIntent/);
  assert.match(inlineScript, /conversationState/);
  assert.match(inlineScript, /followUpPattern/);
  assert.match(inlineScript, /renderSuggestions/);
});

test("does not contain remote data or code execution paths", () => {
  assert.doesNotMatch(inlineScript, /\bfetch\s*\(/);
  assert.doesNotMatch(inlineScript, /XMLHttpRequest|WebSocket|EventSource/);
  assert.doesNotMatch(inlineScript, /\.innerHTML\s*=|\beval\s*\(|new Function/);
  assert.match(html, /connect-src 'none'/);
});

test("provides accessible interaction and recovery surfaces", () => {
  assert.match(html, /role="log"/);
  assert.match(html, /aria-live="polite"/);
  assert.match(html, /aria-label="Conversation"/);
  assert.match(html, /prefers-reduced-motion/);
  assert.match(html, /Skip to the portfolio assistant/);
  assert.match(html, /Local Debug Center/);
  assert.match(html, /Enter a portfolio question before sending/);
});

test("uses verified headline outcomes", () => {
  for (const fact of ["15M+", "40%", "30%", "18 percent"]) assert.match(html, new RegExp(fact.replace("+", "\\+")));
});
