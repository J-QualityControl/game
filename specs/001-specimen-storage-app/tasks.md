# Tasks: Specimen Storage Management Web App

**Input**: Design documents from `/specs/001-specimen-storage-app/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are REQUIRED. Include happy-path and edge-case coverage for each implemented story, and regression tests for bug fixes.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and baseline tooling

- [ ] T001 Initialize Next.js 14 + TypeScript project settings in `package.json`, `tsconfig.json`, and `next.config.js`
- [ ] T002 Create environment template and runtime variable docs in `.env.example` and `docs/architecture/env.md`
- [ ] T003 Configure linting and formatting for TypeScript/Next.js in `eslint.config.js` and `.prettierrc`
- [ ] T004 [P] Configure unit/integration test tooling in `vitest.config.ts` and `tests/setup/vitest.setup.ts`
- [ ] T005 [P] Configure e2e test runner in `playwright.config.ts` and `tests/e2e/.gitkeep`
- [ ] T006 Create base App Router shell and dashboard route group in `src/app/layout.tsx` and `src/app/(dashboard)/page.tsx`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**CRITICAL**: No user story work can begin until this phase is complete

- [ ] T007 Create initial normalized schema migration for `upload`, `sample`, `sample_box`, `slot`, `event` in `scripts/sql/001_init_schema.sql`
- [ ] T008 Add uniqueness, CHECK constraints, and performance indexes for LABEL-N/BOX-ID and expiry queries in `scripts/sql/002_constraints_indexes.sql`
- [ ] T009 [P] Add SQL helpers for deterministic version diff in `scripts/sql/003_version_diff.sql`
- [ ] T010 [P] Implement Supabase browser/server/admin clients in `src/lib/supabase/client.ts`, `src/lib/supabase/server.ts`, and `src/lib/supabase/admin.ts`
- [ ] T011 [P] Implement canonical BOX-ID and LABEL-N validators in `src/lib/validation/box-id.ts` and `src/lib/validation/label-n.ts`
- [ ] T012 [P] Implement shared ingestion row schemas for master/rack uploads in `src/lib/validation/master-row.ts` and `src/lib/validation/rack-row.ts`
- [ ] T013 Implement transactional ingestion publish service in `src/lib/ingest/publish-version.ts`
- [ ] T014 [P] Implement append-only event writer utility in `src/lib/events/write-event.ts`
- [ ] T015 Implement role guard and API auth helpers in `src/lib/auth/roles.ts` and `src/lib/auth/require-role.ts`
- [ ] T016 Define shared domain DTO types in `src/lib/types/domain.ts`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Upload and Maintain Master List (Priority: P1) - MVP

**Goal**: Upload master/rack files with strict parsing, create immutable versions, and provide version diff.

**Independent Test**: Upload valid and invalid files, then compare versions and verify add/change/remove results.

### Tests for User Story 1

- [ ] T017 [P] [US1] Add unit tests for BOX-ID and LABEL-N canonical parsing in `tests/unit/validation/parsing.test.ts`
- [ ] T018 [P] [US1] Add integration tests for upload publish transaction behavior in `tests/integration/ingest/upload-publish.test.ts`
- [ ] T019 [P] [US1] Add contract tests for `/api/uploads/master`, `/api/uploads/rack`, and `/api/versions/{versionNo}/diff/{previousVersionNo}` in `tests/contract/uploads-and-diff.contract.test.ts`

### Implementation for User Story 1

- [ ] T020 [US1] Implement master upload API route in `src/app/api/uploads/master/route.ts`
- [ ] T021 [US1] Implement rack upload API route in `src/app/api/uploads/rack/route.ts`
- [ ] T022 [US1] Implement version diff API route in `src/app/api/versions/[versionNo]/diff/[previousVersionNo]/route.ts`
- [ ] T023 [US1] Implement CSV parsing and staging helpers in `src/lib/ingest/parse-upload.ts`
- [ ] T024 [US1] Implement upload + version management repository in `src/lib/repositories/upload-repository.ts`
- [ ] T025 [US1] Implement upload and version comparison UI in `src/app/(dashboard)/uploads/page.tsx` and `src/components/uploads/version-diff-table.tsx`

**Checkpoint**: User Story 1 is independently functional and testable

---

## Phase 4: User Story 2 - Find Specimens by Label and Review History (Priority: P1)

**Goal**: Deliver label-first exact lookup with history timeline and close-match suggestions.

**Independent Test**: Search by LABEL-N and verify location payload and ordered event history.

### Tests for User Story 2

- [ ] T026 [P] [US2] Add unit tests for label-first query normalization and fallback ranking in `tests/unit/search/label-search.test.ts`
- [ ] T027 [P] [US2] Add integration tests for search and history queries in `tests/integration/search/search-history.test.ts`
- [ ] T028 [P] [US2] Add contract tests for `/api/samples/search` and `/api/samples/{sampleId}/history` in `tests/contract/search-history.contract.test.ts`

### Implementation for User Story 2

- [ ] T029 [US2] Implement label-first search API route in `src/app/api/samples/search/route.ts`
- [ ] T030 [US2] Implement sample history API route in `src/app/api/samples/[sampleId]/history/route.ts`
- [ ] T031 [US2] Implement search repository for exact + suggestion query paths in `src/lib/repositories/search-repository.ts`
- [ ] T032 [US2] Implement search and history UI in `src/app/(dashboard)/search/page.tsx` and `src/components/search/history-timeline.tsx`

**Checkpoint**: User Stories 1 and 2 both work independently

---

## Phase 5: User Story 3 - Visualize 7 Cabinets and 5x7 Slots (Priority: P2)

**Goal**: Render 7-cabinet 5x7 occupancy visualization with slot drill-down.

**Independent Test**: Open visualization and confirm all cabinet/slot positions and occupancy details render correctly.

### Tests for User Story 3

- [ ] T033 [P] [US3] Add unit tests for cabinet-grid transformation logic in `tests/unit/visualization/grid-transform.test.ts`
- [ ] T034 [P] [US3] Add integration tests for cabinet visualization data retrieval in `tests/integration/visualization/cabinets.test.ts`
- [ ] T035 [P] [US3] Add contract test for `/api/cabinets/visualization` in `tests/contract/cabinet-visualization.contract.test.ts`

### Implementation for User Story 3

- [ ] T036 [US3] Implement cabinet visualization API route in `src/app/api/cabinets/visualization/route.ts`
- [ ] T037 [US3] Implement occupancy repository query logic in `src/lib/repositories/cabinet-repository.ts`
- [ ] T038 [US3] Implement visualization page and grid components in `src/app/(dashboard)/cabinets/page.tsx` and `src/components/cabinets/cabinet-grid.tsx`

**Checkpoint**: User Stories 1-3 are independently functional

---

## Phase 6: User Story 4 - Manage Rack List BOX-ID to LABEL-N Mapping (Priority: P2)

**Goal**: Manage rack mapping with strict active uniqueness and conflict feedback.

**Independent Test**: Update mapping and verify persisted results, history event, and conflict rejection.

### Tests for User Story 4

- [ ] T039 [P] [US4] Add unit tests for rack mapping conflict detection in `tests/unit/mapping/conflict-rules.test.ts`
- [ ] T040 [P] [US4] Add integration tests for mapping update transaction in `tests/integration/mapping/update-mapping.test.ts`
- [ ] T041 [P] [US4] Add contract tests for `/api/rack-mappings` GET/PATCH in `tests/contract/rack-mappings.contract.test.ts`

### Implementation for User Story 4

- [ ] T042 [US4] Implement rack mapping GET/PATCH API route in `src/app/api/rack-mappings/route.ts`
- [ ] T043 [US4] Implement rack mapping repository with active uniqueness checks in `src/lib/repositories/rack-mapping-repository.ts`
- [ ] T044 [US4] Implement rack mapping management UI in `src/app/(dashboard)/rack-mappings/page.tsx` and `src/components/mappings/rack-mapping-table.tsx`

**Checkpoint**: User Stories 1-4 are independently functional

---

## Phase 7: User Story 5 - Receive Disposal Alerts and Ask Basic Questions (Priority: P3)

**Goal**: Provide expiry-driven alert workflow and bounded chatbot queries.

**Independent Test**: Generate due alerts and verify status updates; execute supported chatbot intents and verify bounded responses.

### Tests for User Story 5

- [ ] T045 [P] [US5] Add unit tests for supported chatbot intent classification in `tests/unit/chatbot/intent-routing.test.ts`
- [ ] T046 [P] [US5] Add integration tests for disposal alert lifecycle in `tests/integration/alerts/disposal-alerts.test.ts`
- [ ] T047 [P] [US5] Add contract tests for `/api/disposal-alerts`, `/api/disposal-alerts/{alertId}/status`, and `/api/chatbot/query` in `tests/contract/alerts-chatbot.contract.test.ts`

### Implementation for User Story 5

- [ ] T048 [US5] Implement disposal alert list API route in `src/app/api/disposal-alerts/route.ts`
- [ ] T049 [US5] Implement disposal alert status update API route in `src/app/api/disposal-alerts/[alertId]/status/route.ts`
- [ ] T050 [US5] Implement bounded chatbot query API route in `src/app/api/chatbot/query/route.ts`
- [ ] T051 [US5] Implement disposal alert scheduler Edge Function in `supabase/functions/refresh-disposal-alerts/index.ts`
- [ ] T052 [US5] Implement alert and chatbot UI in `src/app/(dashboard)/alerts/page.tsx` and `src/components/chatbot/chatbot-panel.tsx`

**Checkpoint**: All user stories are independently functional

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Final quality, security, and release readiness across all stories

- [ ] T053 [P] Document final architecture and data flow in `docs/architecture/specimen-storage-overview.md`
- [ ] T054 Add error boundary and audit-safe user messaging in `src/app/error.tsx` and `src/lib/errors/api-errors.ts`
- [ ] T055 [P] Add performance smoke tests for label and expiry query SLAs in `tests/integration/performance/query-sla.test.ts`
- [ ] T056 [P] Add regression test for duplicate active BOX-ID/LABEL-N ingestion conflict in `tests/integration/ingest/duplicate-active-mapping-regression.test.ts`
- [ ] T057 Validate quickstart end-to-end and update steps in `specs/001-specimen-storage-app/quickstart.md`
- [ ] T058 Run quality gates and record results in `specs/001-specimen-storage-app/checklists/requirements.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- Setup (Phase 1): No dependencies
- Foundational (Phase 2): Depends on Setup completion; blocks all user stories
- User Story Phases (3-7): Depend on Foundational completion
- Polish (Phase 8): Depends on completion of all targeted user stories

### User Story Dependencies

- US1 (P1): Starts immediately after Foundational; defines ingestion/version baseline
- US2 (P1): Starts after Foundational; independent from US1 except shared infra
- US3 (P2): Starts after Foundational; consumes slot/cabinet data
- US4 (P2): Starts after Foundational; consumes mapping constraints and event logging
- US5 (P3): Starts after Foundational; depends on sample lifecycle/expiry fields

### Within Each User Story

- Tests first (must fail before implementation)
- API and repository logic before UI integration
- Event/audit logging included before marking story complete

### Parallel Opportunities

- Tasks marked [P] are parallelizable within each phase
- US2-US5 can run in parallel once Foundational is complete if team capacity allows

---

## Parallel Example: User Story 1

```bash
# Run in parallel:
Task: "T017 [US1] parsing unit tests in tests/unit/validation/parsing.test.ts"
Task: "T018 [US1] upload integration tests in tests/integration/ingest/upload-publish.test.ts"
Task: "T019 [US1] upload/diff contract tests in tests/contract/uploads-and-diff.contract.test.ts"

# Then in parallel where safe:
Task: "T020 [US1] master upload route in src/app/api/uploads/master/route.ts"
Task: "T021 [US1] rack upload route in src/app/api/uploads/rack/route.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 and Phase 2
2. Complete Phase 3 (US1)
3. Validate upload + version diff independently
4. Demo MVP

### Incremental Delivery

1. Deliver US1 (ingestion + diff)
2. Deliver US2 (search + history)
3. Deliver US3 (visualization)
4. Deliver US4 (rack mapping management)
5. Deliver US5 (alerts + chatbot)

### Parallel Team Strategy

1. Team completes Setup + Foundational together
2. Developer A: US1/US2
3. Developer B: US3/US4
4. Developer C: US5 + Polish

---

## Notes

- All tasks follow required checklist format with IDs, optional [P], and [US#] labels for story phases.
- Every implementation task includes explicit file paths.
- Suggested MVP scope: Phase 3 (US1) after Foundational completion.
