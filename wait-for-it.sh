#!/usr/bin/env bash
#   Use this script to test if a given TCP host/port are available
#   by waiting until they are.
#
# Source: https://github.com/vishnubob/wait-for-it
set -e

TIMEOUT=15
QUIET=0

usage()
{
    echo "Usage: $0 host:port [-t timeout] [-- command args]"
    exit 1
}

wait_for()
{
    hostport=(${1//:/ })
    host=${hostport[0]}
    port=${hostport[1]}
    echo "Waiting for $host:$port..."
    for ((i=0;i<TIMEOUT;i++)); do
        nc -z "$host" "$port" && return 0
        sleep 1
    done
    echo "Operation timed out: $host:$port"
    return 1
}

if [ $# -lt 1 ]; then
    usage
fi

HOSTPORT=$1
shift

while [[ "$#" -gt 0 ]]; do
    case "$1" in
        -t|--timeout)
            TIMEOUT="$2"
            shift 2
            ;;
        --)
            shift
            break
            ;;
        *)
            shift
            ;;
    esac
done

wait_for "$HOSTPORT"

if [ $# -gt 0 ]; then
    exec "$@"
fi