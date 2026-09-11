# R10 integrated verification remediation

- Foreign-checkout Graft probe records invocation with shell-builtin `printf`, so restricted `PATH` cannot hide execution.
- Controlled fallback fixture asserts returned `status: fallback` and serialized `jobs.json.repository_intelligence.graft.status`.
- Both prior R9 mutants fail their targeted tests in the isolated sensor checkout; final Review/full gates remain required evidence.
