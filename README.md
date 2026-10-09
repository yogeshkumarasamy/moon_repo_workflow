# Moon Monorepo: Affected CI Workflow & Bazel Remote Caching

This monorepo demonstrates an end-to-end, high-performance monorepo architecture powered by **[Moonrepo](https://moonrepo.dev)**, **pnpm workspaces**, and **Bazel Remote Execution v2 API (via `bazel-remote`)**.

---

## 🎯 Key Objectives Demonstrated

1. **Affected-Only CI Workflow**: PRs only trigger tasks (`build`, `test`, `lint`) for projects affected by the change (plus upstream/downstream dependencies according to the dependency graph).
2. **Bazel Remote Caching**: Action caching and artifact hashing compatible with Bazel REAPI v2, eliminating duplicate build/test executions across CI runs and local machines.
3. **Multi-App & Microservice Architecture**: Clean separation of apps, services, and shared libraries with type safety across the entire stack.

---

## 📦 Project Structure

```text
├── apps/
│   ├── admin/               # Internal Admin Portal (React + Vite)
│   └── web/                 # Customer Web App (React + Vite)
├── services/
│   ├── api/                 # REST API Service (Node.js + TypeScript)
│   └── worker/              # Background Task Queue Processor (Node.js + TypeScript)
├── packages/
│   ├── types/               # Shared TypeScript schemas & DTOs
│   ├── ui/                  # Reusable UI component library (React)
│   └── utils/               # Shared domain utilities & logging
├── deploy/                  # Cloud deployment manifests (Render, Koyeb, Dockerfile)
├── docs/                    # Remote cache hosting evaluation & guides
├── .github/workflows/ci.yml # GitHub Actions workflow with Moon CI & Bazel cache
└── .moon/                   # Workspace-level Moonrepo configuration
```

### Dependency Graph

```text
                 [types]
                    ▲
         ┌──────────┴──────────┐
         │                     │
      [utils]               [utils]
         ▲                     ▲
   ┌─────┴─────┐         ┌─────┴─────┐
   │           │         │           │
 [ui]        [ui]      [api]      [worker]
   ▲           ▲
 [web]      [admin]
```

- When `packages/utils` changes, all dependent applications (`web`, `admin`, `api`, `worker`) and `packages/ui` are marked as affected.
- When `apps/web` changes alone, only `apps/web` tasks are executed.

---

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js**: >= 20
- **pnpm**: >= 8 (`npm i -g pnpm`)
- **Moon**: `curl -fsSL https://moonrepo.dev/install/moon.sh | bash` (or via local `pnpm exec moon`)

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Run Tasks via Moon

Run builds across all projects:
```bash
pnpm exec moon run :build
```

Run test suites:
```bash
pnpm exec moon run :test
```

Run linter / typechecking:
```bash
pnpm exec moon run :lint
```

Target a specific project:
```bash
pnpm exec moon check web
pnpm exec moon check api
```

---

## ⚡ Bazel Remote Caching Setup

Moonrepo connects natively to Bazel Remote Execution API v2 servers.

### Local Remote Cache (Docker)
Start the included `bazel-remote` container locally:
```bash
docker compose up -d
```
- gRPC Port: `9092` (`grpc://127.0.0.1:9092`)
- HTTP Web UI & status: [http://localhost:8080/status](http://localhost:8080/status)

### Cloud Hosting for POC
See [`docs/REMOTE_CACHE.md`](./docs/REMOTE_CACHE.md) for full evaluations of free hosting providers:
- **BuildBuddy Cloud (Recommended for Zero-Ops)**: Free tier, gRPC endpoint at `grpcs://remote.buildbuddy.io`.
- **Koyeb**: Free 24/7 Nano Docker instance.
- **Render**: Free Web Service Docker deployment via [`deploy/render.yaml`](./deploy/render.yaml).

Configure remote caching in `.moon/workspace.yml` or via the `MOON_REMOTE_HOST` environment variable:
```yaml
remote:
  api: 'grpc'
  host: 'grpc://127.0.0.1:9092'
```

---

## 🔄 CI Workflow (`.github/workflows/ci.yml`)

The CI workflow automatically:
1. Spawns an in-runner `bazel-remote` cache service.
2. Identifies affected projects using `moon ci --base <base-ref>`.
3. Replays cached artifacts instantly for unchanged inputs.
4. Generates an interactive run report posted to the PR!
