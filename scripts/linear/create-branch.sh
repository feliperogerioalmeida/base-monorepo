#!/bin/bash
set -e

source "$(dirname "$0")/_common.sh"

ISSUE_ID=$1
ISSUE_TITLE=$2
BRANCH_TYPE=${3:-feature}

if [ -z "$ISSUE_ID" ]; then
    echo "Usage: $0 <ISSUE_ID> [ISSUE_TITLE] [BRANCH_TYPE]"
    exit 1
fi

slugify() {
    echo "$1" \
        | tr '[:upper:]' '[:lower:]' \
        | sed 's/[^a-z0-9]/-/g' \
        | sed 's/--*/-/g' \
        | sed 's/^-//' \
        | sed 's/-$//' \
        | cut -c1-50
}

CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

if [ "$CURRENT_BRANCH" != "main" ] && [ "$CURRENT_BRANCH" != "master" ]; then
    echo -e "${YELLOW}Currently on branch: $CURRENT_BRANCH${NC}"
    echo "Switching to main..."
    git checkout main 2>/dev/null || git checkout master 2>/dev/null
fi

git pull --rebase 2>&1 | grep -v "Already up to date" || true

ISSUE_ID_LOWER=$(echo "$ISSUE_ID" | tr '[:upper:]' '[:lower:]')

if [ -n "$ISSUE_TITLE" ]; then
    SLUG=$(slugify "$ISSUE_TITLE")
    BRANCH_NAME="${BRANCH_TYPE}/${ISSUE_ID_LOWER}-${SLUG}"
else
    BRANCH_NAME="${BRANCH_TYPE}/${ISSUE_ID_LOWER}"
fi

if git rev-parse --verify "$BRANCH_NAME" >/dev/null 2>&1; then
    echo -e "${YELLOW}Branch $BRANCH_NAME already exists${NC}"
    echo "Switching to existing branch..."
    git checkout "$BRANCH_NAME"
    echo "$BRANCH_NAME"
    exit 0
fi

git checkout -b "$BRANCH_NAME"

echo -e "${GREEN}Created branch: $BRANCH_NAME${NC}"
echo "$BRANCH_NAME"
