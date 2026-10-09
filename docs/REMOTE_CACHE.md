# Remote Caching Architecture & Free Hosting Evaluation

This document outlines the evaluation of free hosting services for running a Bazel Remote Cache (`bazel-remote` or managed Bazel REAPI) with **Moonrepo**, along with instructions for both local and cloud setups.

---

## 1. How Moonrepo Remote Caching Works

Moonrepo implements the standard **Bazel Remote Execution API (REAPI v2)** over gRPC (and supports standard HTTP caching).

When tasks run:
1. Moon calculates an action digest / hash from task inputs, environment, and configuration.
2. It checks the local cache (`.moon/cache`).
3. If not found locally, it queries the remote cache (Content Addressable Storage - CAS and Action Cache - AC).
4. On a cache hit, Moon downloads and extracts the outputs into the target directory (`dist/`), skipping execution completely!
5. On a cache miss, Moon runs the task, packages the output artifacts, and uploads them to the remote cache.

---

## 2. Evaluation of Free Hosting Services for Bazel Remote Cache

| Service | Protocol | Price / Free Tier | Persistence | Cold Starts | Recommendation |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Koyeb** | HTTP & gRPC (HTTP/2) | **Free** ($5.50/mo monthly credit, 1 Nano instance 24/7) | Ephemeral disk or S3/Cloudflare R2 | None (runs 24/7) | ⭐ **Top Pick for self-hosted Docker** |
| **Hugging Face Spaces** | HTTP (Port 7860) | **100% Free** (2 vCPU, 16GB RAM) | Ephemeral disk | None (24/7 uptime) | ⭐ **Great high-memory free host** |
| **Render** | HTTP | **Free** (512MB RAM Web Service) | Ephemeral disk or S3/R2 | ~50s after 15m idle | Good for low-traffic POCs |
| **BuildBuddy Cloud** | gRPC (`remote.buildbuddy.io`) | **Free** (Generous free tier for OSS/developers) | Managed cloud storage | None | ⭐ **Top Pick for Zero Maintenance** |
| **GitHub Actions Service Container** | gRPC (`localhost:9092`) | **Included in GitHub Actions** | Persisted via `actions/cache` | 0s (runs in-job) | ⭐ **Best Out-of-the-Box CI Experience** |

---

## 3. Deployment Guides

### Option A: Koyeb (Self-Hosted Docker, 24/7 Free)
1. Sign up at [koyeb.com](https://www.koyeb.com).
2. Create a new service selecting **Docker Image**:
   - Image: `buchgr/bazel-remote:v2.4.4`
   - Command: `--max_size=5 --dir=/tmp/cache --http_address=0.0.0.0:8080 --storage_mode=uncompressed`
   - Port: `8080` (HTTP)
3. Copy your Koyeb public URL (e.g. `https://bazel-remote-myuser.koyeb.app`).
4. Set in GitHub Repository Secrets:
   - `MOON_REMOTE_HOST`: `https://bazel-remote-myuser.koyeb.app`

### Option B: BuildBuddy Cloud (Zero Maintenance, Free Managed Tier)
1. Sign up at [cloud.buildbuddy.io](https://cloud.buildbuddy.io) with GitHub.
2. Go to **Settings** -> **API Keys** -> Create an API Key.
3. Configure in `.moon/workspace.yml`:
   ```yaml
   remote:
     api: 'grpc'
     host: 'grpcs://remote.buildbuddy.io'
     auth:
       headers:
         'x-buildbuddy-api-key': 'YOUR_BUILDBUDDY_KEY'
   ```
4. Provides real-time dashboards of build cache hits and timings!

### Option C: Local Development with Docker Compose
Run the pre-configured `bazel-remote` container locally:
```bash
docker compose up -d
```
- gRPC endpoint: `grpc://127.0.0.1:9092`
- HTTP endpoint: `http://127.0.0.1:8080`
- Web UI & Status: `http://localhost:8080/status`

To stop:
```bash
docker compose down
```

---

## 4. In-Workflow GitHub Actions Remote Cache

In `.github/workflows/ci.yml`, we run `buchgr/bazel-remote` directly as a service container in the CI runner job:
- **Port:** `9092` (gRPC)
- **Cache Persistence:** Backed by GitHub Actions cache (`actions/cache`) for the `/data` directory.
- **Failover:** If `MOON_REMOTE_HOST` secret is set, Moon connects directly to your external cloud instance. If not set, it connects to the local runner service container.
