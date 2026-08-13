# EvalGate

A release gate backed by evaluations, not a checkbox.

EvalGate is a GenLayer Studionet application for ai model evaluation and release decision. It gives model release committees, red teams, and governance engineers a concrete workflow to bind public model cards, evaluation runs, and unresolved risk findings to an appealable release gate. The client reads its register from the deployed intelligent contract; it does not ship sample records or substitute static outcomes when a contract read fails.

## Live architecture

| Layer | Implementation |
| --- | --- |
| Live app | [evalgate-registry.vercel.app](https://evalgate-registry.vercel.app) |
| Network | GenLayer Studionet, chain `61999` |
| Contract | [`0xe1EB337542D67b51cfB61ebDEc0b9D9D49490B79`](https://explorer-studio.genlayer.com/address/0xe1EB337542D67b51cfB61ebDEc0b9D9D49490B79) |
| Reasoning | `gl.nondet.web.render`, `gl.nondet.exec_prompt`, comparative validator consensus |
| Settlement | operator permissions, challenges, appeals, blocked finalization, audit log, reputation |
| Wallet UX | RainbowKit + wagmi on Studionet |
| Interface | lab notebook, CSS evaluation matrix, Font Awesome prepared icon assets |

## Product workflow

1. Create a model release with a public primary source.
2. Attach evaluation and risk finding records.
3. Lock the evidence set and invoke GenLayer web reasoning.
4. Open the review window, then resolve challenges and appeals.
5. Finalize only when no filing remains pending.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Connect an EVM browser wallet through RainbowKit and switch to GenLayer Studionet when prompted.

## Verification

```bash
npm run typecheck
npm run build
npm test
npm run test:studionet
```

See [CONTRACT_SPEC.md](./CONTRACT_SPEC.md), [DESIGN.md](./DESIGN.md), [SECURITY.md](./SECURITY.md), and [public/assets/ASSET_SOURCES.md](./public/assets/ASSET_SOURCES.md).
