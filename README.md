# Ola Ayilara Portfolio Assistant

A responsive conversational portfolio that answers grounded questions about Ola Ayilara's product design experience. It is designed for GitHub Pages and uses no backend, external AI API, database, or tracking service.

## Product scope

The assistant uses weighted phrase matching, multi topic responses, conversation context, follow up awareness, and dynamic suggested questions. It covers target roles, AI product work, measurable outcomes, skills, process, collaboration, accessibility, leadership, tools, public service, fintech, research, design systems, contact information, and the downloadable resume.

The assistant does not generate open ended content. This is intentional. A static GitHub Pages site cannot protect an AI API secret, and grounded local answers prevent fabricated career claims while keeping visitor questions private.

## Files

1. `index.html` contains the complete website, design system, content, interaction logic, guardrails, and Debug Center.
2. `Ola_Ayilara_Resume_Generic.docx` is the downloadable generic resume.
3. `scripts/build_resume.js` generates the resume from verified source content.
4. `tests/site.test.mjs` verifies critical content, security, accessibility, and guardrail requirements.
5. `tests/browser.test.mjs` verifies real browser interaction and responsive behavior at 1440, 1024, 768, and 390 pixel widths.

## Local setup

No installation is required to view the site. Open `index.html` in a browser.

For a local web server, run:

```text
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Tests

Run:

```text
npm test
```

The test suite uses only Node.js built in modules.

## Updating content

Portfolio answers, keywords, phrases, detailed follow ups, and related prompts are centralized in the `knowledgeBase` object inside `index.html`. Resume content is centralized in `scripts/build_resume.js`.

After changing resume content, run:

```text
NODE_PATH=/path/to/node_modules node scripts/build_resume.js
```

Review the generated document before publishing. Do not add career claims unless they are verified.

## Abuse prevention

The site uses layered client side guardrails:

1. Portfolio only response scope
2. Maximum question length of 280 characters
3. Submission throttling and a short cooldown
4. Prompt injection and harmful request detection
5. Safe rendering with `textContent`
6. No dynamic code execution
7. No network requests
8. Bounded conversation history and logs
9. Generic refusal messages that reveal no hidden implementation detail

Client side rate limits improve normal interface safety but cannot stop a determined user from modifying code in their own browser. The stronger protection is architectural: the site exposes no API, secret, account, database, or write operation to attack.

## Security review

Data classification: public professional information only. Visitor questions are processed in memory and are not transmitted. Event logs record categories and outcomes, never question text, passwords, tokens, or personal information.

The Content Security Policy blocks network connections, remote scripts, embedded objects, and form submissions. External links use safe relationship attributes. The application does not use cookies, authentication, payments, user uploads, or privileged operations, so CSRF and server authorization risks do not apply.

## Observability

The Debug Center is available from the page footer. It shows timestamped system, interaction, guardrail, and error events for the current browser session. Logs are searchable, filterable, and clearable. Each event includes a readable explanation and suggested action.

## Accessibility

The interface targets WCAG 2.2 AA. It includes semantic landmarks, keyboard operation, visible focus states, a skip link, labelled controls, status announcements, reduced motion support, minimum touch target sizing, and clear error recovery.

## Performance

The site has no framework bundle, remote font, image request, analytics request, or API call. All critical styles and logic are included in the entry page. This minimizes render blocking work and is intended to meet the project targets for LCP, CLS, and interaction readiness on typical mobile connections.

## GitHub Pages deployment

1. Commit all project files to the `main` branch.
2. Open repository Settings.
3. Open Pages.
4. Select Deploy from a branch.
5. Select `main` and the repository root.
6. Save and wait for the public URL.

## Rollback

Open the repository commit history, identify the last known good commit, and restore those file versions through GitHub. Do not delete history. Reverting a commit is the preferred recovery method.

## Pre release review

Confirm that tests pass, the resume opens, suggested questions respond, unknown questions recover safely, rapid submissions are throttled, abusive requests are refused, keyboard navigation works, mobile content remains readable, and the Debug Center records errors without storing question text.

## Production premortem

1. A future content edit introduces an unverified claim. Mitigation: require resume source review before publishing.
2. A browser blocks session storage. Mitigation: logs degrade safely and the assistant remains operational.
3. Repeated submissions overwhelm the interface. Mitigation: cooldown, rate window, busy state, and bounded history.
4. GitHub Pages serves an older commit. Mitigation: verify the Pages source and current deployment after each release.
5. A visitor expects general purpose AI. Mitigation: scope labels, deterministic answers, suggested questions, and clear refusals.
