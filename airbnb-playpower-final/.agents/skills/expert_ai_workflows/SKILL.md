---
name: expert_ai_workflows
description: Triggers whenever Antigravity interacts with LLM Intelligence tools (e.g., score_posting, generate_resume, approve_api_recipe), token management, or JSON parsing from LLMs.
---

# AI Workflows & Intelligence Protocol (FAANG Standards)

You are tasked with building bulletproof logic for the Intelligence Layer of the application. When wrapping or communicating with external LLMs, the system must be deterministic, token-efficient, and hallucination-resistant.

## 1. Prompt Isolation & Templates
LLM System Prompts and User Prompts can grow massive and undergo frequent iteration.
*   **The Mandate:** Do not hardcode multi-line LLM prompts directly inside functional business logic (e.g., inside a Tool or Service method).
*   Prompts MUST be extracted into dedicated template files (e.g., `prompts/score_posting_v1.md`) or stored as constant strings in a dedicated `constants/` file. 

## 2. Token Budgeting & Truncation (The DOM Hazard)
Passing raw DOM representations to an LLM without checks will result in `context_length_exceeded` crashes.
*   **The Mandate:** Before feeding extracted DOM payloads into an intelligence tool, enforce strict token truncation.
*   Use minification techniques: Run Turndown (HTML to Markdown) or JSDOM to strip `<script>`, `<style>`, and SVG data before sending to the LLM. 
*   Never blindly pass a 64MB HTML string into an LLM context.

## 3. Deterministic Parsing & Fallbacks
LLMs hallucinate. They will wrap JSON in ` ```json ` blocks, insert trailing commas, or forget required keys.
*   **The Mandate:** LLM responses must be parsed using rigorous `zod` schemas. 
*   If `JSON.parse` fails, you must implement a sanitization regex (to strip markdown blocks) and retry.
*   If `zod` validation fails, you must implement a fallback/retry loop or gracefully fail the transaction. Bad JSON must *never* crash the server or corrupt the SQLite database.

## 4. The Evaluation Matrix
When building tools that "Score" or "Match" data (like Job Postings), ensure the output is structured.
*   **The Mandate:** All scores must include an `explanation` or `reasoning` field alongside the numeric/boolean score to provide an audit trail of the AI's decision.
