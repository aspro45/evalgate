import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const config = JSON.parse(fs.readFileSync(path.join(root, "tests", "project.config.json"), "utf8"));
const source = fs.readFileSync(path.join(root, "contracts", config.file), "utf8");

function methodBody(name) {
  const marker = `    def ${name}(`;
  const start = source.indexOf(marker);
  assert.notEqual(start, -1, `missing method ${name}`);
  const candidates = [
    source.indexOf("\n    @gl.public.", start + marker.length),
    source.indexOf("\n    def ", start + marker.length),
    source.indexOf("\nclass ", start + marker.length),
  ].filter(index => index >= 0);
  return source.slice(start, candidates.length ? Math.min(...candidates) : source.length);
}

test("contract uses native GenLayer reasoning", () => {
  assert.match(source, /class\s+EvalGate\(gl\.Contract\)/);
  assert.match(source, /gl\.nondet\.web\.render/);
  assert.match(source, /gl\.nondet\.exec_prompt/);
  assert.match(source, /gl\.(?:vm\.run_nondet_unsafe|eq_principle\.prompt_comparative)/);
  assert.match(source, /gl\.eq_principle\.prompt_comparative/);
  assert.match(source, /prompt.inject/i);
  assert.match(source, /Validator-local rendered evidence/);
  assert.match(source, /CHALLENGE_WINDOW_SECONDS/);
});

test("authority and settlement invariants are explicit", () => {
  for (const name of ["configure_protocol", "add_evidence", "add_evaluation_run", "add_risk_finding", "review_with_genlayer", "finalize_case", "archive_case"]) {
    assert.match(methodBody(name), /_require_(admin|operator)/, `${name} must enforce authority`);
  }
  assert.match(methodBody("review_with_genlayer"), /_has_open_filings/);
  assert.match(methodBody("finalize_case"), /open_filing/);
  assert.match(methodBody("submit_challenge"), /challenge_window_closed/);
  assert.match(methodBody("submit_appeal"), /challenge_required/);
  assert.match(methodBody("resolve_challenge_with_genlayer"), /challenge_already_resolved/);
  assert.match(methodBody("resolve_appeal_with_genlayer"), /appeal_already_resolved/);
  assert.match(methodBody("expire_challenge"), /challenge_period_active/);
  assert.match(methodBody("expire_appeal"), /appeal_period_active/);
  assert.match(methodBody("finalize_case"), /challenge_period_active/);
});

test("the ai model evaluation and release decision surface is complete", () => {
  for (const method of [
    "propose_model_release", "assess_release_gate_with_genlayer", "archive_model_release",
    "get_model_release_count", "get_model_release", "add_evaluation_run", "add_risk_finding",
    "get_evaluations", "get_risk_findings", "get_frontend_bootstrap",
  ]) assert.ok(methodBody(method).length > 20, `missing ${method}`);
  assert.match(source, /DRAFT|EVALUATING|REVIEWED|CHALLENGE_WINDOW|APPEALED|GATED|ARCHIVED/);
  assert.match(source, /pending|approved|blocked|conditional/);
});
