# Decisions

The `.specs/STATE.md` ledger stays canonical. These pages hold what an append-only ledger
structurally cannot: which requirements a decision constrains, which invariant it follows from,
which alternative it killed.

* [Deep review cadence](deep-review-cadence.md) - Deep review is a merge gate only when the product phase can afford it; `cadence = "skip"` merges without it and the human runs `wreview` over several delivered features on demand.
* [QA at feature close](qa-at-feature-close.md) - QA runs once, over the integrated feature, as a real user walks it; no slice runs QA Plan or QA Execute, and the per-slice Technical Verifier stays.
