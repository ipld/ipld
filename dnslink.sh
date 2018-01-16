#!/usr/bin/env bash

#
# Usage:
#   DNSIMPLE_TOKEN=<token> ./dnslink.sh <domain> <hash>
#
# Example:
#   DNSIMPLE_TOKEN=trustno1 ./dnslink.sh website.protocol.ai Qmfoobar
#
# Dependencies:
# - bash
# - curl
# - jq
#
# From:
#   https://raw.githubusercontent.com/ipfs/infrastructure/master/scripts/dnslink.sh
#

set -e

ZONE="$1"
HASH="$2"

([ ! -z "$DNSIMPLE_TOKEN" ] && [ ! -z "$ZONE" ] && [ ! -z "$HASH" ]) \
  || (echo "Usage: DNSIMPLE_TOKEN=<token> ./dnslink.sh <domain> <hash>" && exit 1)

RECORD_NAME="_dnslink"
RECORD_TTL=120

record_id=$(
  curl -v -s "https://api.dnsimple.com/v1/domains/$ZONE/records?name=$RECORD_NAME&type=TXT" \
    -H "X-DNSimple-Domain-Token: $DNSIMPLE_TOKEN" \
    -H "Accept: application/json" \
    | jq -r '.[].record.id'
)

if [ -z "$record_id" ]; then
  curl -v -s -X POST "https://api.dnsimple.com/v1/domains/$ZONE/records" \
    -H "X-DNSimple-Domain-Token: $DNSIMPLE_TOKEN" \
    -H "Accept: application/json" \
    -H "Content-Type: application/json" \
    -d "{\"record\":{ \"name\":\"$RECORD_NAME\", \"record_type\":\"TXT\", \"content\":\"dnslink=/ipfs/$HASH\", \"ttl\":\"$RECORD_TTL\" }}" \
    | jq -r '.record' \
  && printf "\\nIt looks like we're good: https://ipfs.io/ipns/$ZONE\\n"
else
  curl -v -s -X PUT "https://api.dnsimple.com/v1/domains/$ZONE/records/$record_id" \
    -H "X-DNSimple-Domain-Token: $DNSIMPLE_TOKEN" \
    -H "Accept: application/json" \
    -H "Content-Type: application/json" \
    -d "{\"record\":{ \"content\":\"dnslink=/ipfs/$HASH\", \"name\":\"$RECORD_NAME\", \"ttl\":\"$RECORD_TTL\" }}" \
    | jq -r '.record' \
  && printf "\\nIt looks like we're good: https://ipfs.io/ipns/$ZONE\\n"
fi
