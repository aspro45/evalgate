# EvalGate contract specification

Contract: [0xe1EB337542D67b51cfB61ebDEc0b9D9D49490B79](https://explorer-studio.genlayer.com/address/0xe1EB337542D67b51cfB61ebDEc0b9D9D49490B79)

## Domain records

- Primary record: `model_release`
- Child record A: `evaluation` through `add_evaluation_run`
- Child record B: `risk_finding` through `add_risk_finding`
- Review method: `assess_release_gate_with_genlayer`
- States: `DRAFT`, `EVALUATING`, `REVIEWED`, `CHALLENGE_WINDOW`, `APPEALED`, `GATED`, `ARCHIVED`
- Outcomes: `pending`, `approved`, `blocked`, `conditional`

Evidence and domain records require the primary record operator. Protocol changes require the contract owner. Validator review ignores instructions embedded in rendered source content. Pending challenges or appeals block finalization, and granted rulings can revise the stored outcome and confidence before settlement.
