#!/usr/bin/env bash
set -Eeuo pipefail

PROJECT_NAME="${PROJECT_NAME:-forest-nav}"
BRANCH="${BRANCH:-main}"
REPO_URL="${REPO_URL:-https://github.com/shali10/forest-nav.git}"
KEEP_SOURCE="${KEEP_SOURCE:-0}"
SOURCE_DIR="${SOURCE_DIR:-}"

say() { printf '\n\033[1;32m==> %s\033[0m\n' "$*"; }
die() { printf '\n\033[1;31m错误：%s\033[0m\n' "$*" >&2; exit 1; }

command -v git >/dev/null 2>&1 || die "缺少 git，请先安装 Git。"
command -v node >/dev/null 2>&1 || die "缺少 Node.js 18+。"
command -v npx >/dev/null 2>&1 || die "缺少 npx，请安装 Node.js/npm。"

NODE_MAJOR="$(node -p "Number(process.versions.node.split('.')[0])")"
[ "$NODE_MAJOR" -ge 18 ] || die "Node.js 版本过低，至少需要 18，当前为 $(node -v)。"

CLEANUP_DIR=""
if [ -z "$SOURCE_DIR" ]; then
  CLEANUP_DIR="$(mktemp -d -t forest-nav.XXXXXX)"
  SOURCE_DIR="$CLEANUP_DIR/source"
  trap 'if [ -n "${CLEANUP_DIR:-}" ] && [ "${KEEP_SOURCE:-0}" != "1" ]; then rm -rf "$CLEANUP_DIR"; fi' EXIT
  say "获取项目源码"
  git clone --depth 1 --branch "$BRANCH" "$REPO_URL" "$SOURCE_DIR"
else
  SOURCE_DIR="$(cd "$SOURCE_DIR" && pwd)"
fi

[ -f "$SOURCE_DIR/index.html" ] || die "项目目录中缺少 index.html：$SOURCE_DIR"
[ -d "$SOURCE_DIR/functions" ] || die "项目目录中缺少 Pages Functions：$SOURCE_DIR/functions"

say "检查 Cloudflare 登录状态"
if ! npx --yes wrangler whoami >/dev/null 2>&1; then
  if [ -n "${CLOUDFLARE_API_TOKEN:-}" ]; then
    die "CLOUDFLARE_API_TOKEN 无效或权限不足。"
  fi
  if [ -n "${CLOUDFLARE_API_KEY:-}" ] && [ -n "${CLOUDFLARE_EMAIL:-}" ]; then
    die "CLOUDFLARE_API_KEY 或 CLOUDFLARE_EMAIL 无效。"
  fi
  if [ ! -t 0 ]; then
    die "尚未登录 Cloudflare。请先运行：npx wrangler login；服务器环境可设置 CLOUDFLARE_API_TOKEN。"
  fi
  npx --yes wrangler login
fi

say "部署到 Cloudflare Pages：$PROJECT_NAME"
set +e
DEPLOY_OUTPUT="$(cd "$SOURCE_DIR" && npx --yes wrangler pages deploy . \
  --project-name="$PROJECT_NAME" \
  --branch="$BRANCH" \
  --commit-dirty=true 2>&1)"
DEPLOY_STATUS=$?
set -e

if [ "$DEPLOY_STATUS" -ne 0 ] && printf '%s' "$DEPLOY_OUTPUT" | grep -qiE 'project.*(not found|does not exist)|Unable to find project'; then
  say "首次部署：创建 Pages 项目"
  npx --yes wrangler pages project create "$PROJECT_NAME" --production-branch="$BRANCH"
  DEPLOY_OUTPUT="$(cd "$SOURCE_DIR" && npx --yes wrangler pages deploy . \
    --project-name="$PROJECT_NAME" \
    --branch="$BRANCH" \
    --commit-dirty=true 2>&1)"
  DEPLOY_STATUS=$?
fi

printf '%s\n' "$DEPLOY_OUTPUT"
[ "$DEPLOY_STATUS" -eq 0 ] || die "Cloudflare Pages 部署失败。"

DEPLOY_URL="$(printf '%s\n' "$DEPLOY_OUTPUT" | grep -Eo 'https://[[:alnum:]-]+\.[[:alnum:]-]+\.pages\.dev' | tail -1 || true)"
[ -n "$DEPLOY_URL" ] || DEPLOY_URL="https://${PROJECT_NAME}.pages.dev"

say "部署完成"
printf '项目：%s\n分支：%s\n地址：%s\n' "$PROJECT_NAME" "$BRANCH" "$DEPLOY_URL"
printf '\n自定义域名请在 Cloudflare Dashboard → Workers & Pages → %s → Custom domains 中绑定。\n' "$PROJECT_NAME"
