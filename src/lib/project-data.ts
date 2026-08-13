import deployment from '../../deployment.json';

export const project = {
  id: "61-evalgate",
  name: "EvalGate",
  product: "AI model evaluation and release decision",
  audience: "model release committees, red teams, and governance engineers",
  pain: "bind public model cards, evaluation runs, and unresolved risk findings to an appealable release gate",
  kicker: "Model release lab",
  headline: "A release gate backed by evaluations, not a checkbox.",
  intro: "Bind model cards, benchmark runs, red-team findings, public standards, challenges, and the final release gate to one record.",
  metric: "gate confidence",
  action: "Propose release",
  icon: "fa-microchip",
  primaryKind: "model_release",
  primaryTitle: "Model release",
  extraLabel: "Model family",
  createMethod: "propose_model_release",
  childA: "evaluation",
  childB: "risk finding",
  routes: ["releases","model-card","evaluations","findings","gate"],
  statuses: ["DRAFT","EVALUATING","REVIEWED","CHALLENGE_WINDOW","APPEALED","GATED","ARCHIVED"],
  outcomes: ["pending","approved","blocked","conditional"],
  sourceUrl: "https://www.nist.gov/itl/ai-risk-management-framework",
  sourceLabel: "NIST AI Risk Management Framework",
  layout: "lab-notebook",
  palette: ["#f5f5f2","#17191e","#ff5c35","#20a4b8"],
} as const;

export const contractState = {
  network: 'GenLayer Studionet',
  chainId: deployment.chainId,
  status: 'deployed',
  address: deployment.contractAddress,
  deployTxHash: deployment.deployTxHash,
  explorerUrl: deployment.contractExplorer,
};
