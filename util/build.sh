#!/bin/bash

set -e

UTILDIR=$(cd $(dirname $0) && pwd)
BASEDIR=$(cd "$UTILDIR/.." && pwd)
SRCDIR="$BASEDIR/src"
TOOLSDIR="$SRCDIR/js/util/buildscripts"
PROFILE="$BASEDIR/profiles/main.profile.js"
CSSDIR="$SRCDIR/css"
DISTDIR="$BASEDIR/dist"

if [ ! -d "$TOOLSDIR" ]; then
    echo "Can't find Dojo build tools -- did you initialise submodules? (git submodule update --init --recursive)"
    exit 1
fi

if [ ! -f "$PROFILE" ]; then
    echo "Invalid input profile"
    exit 1
fi

echo "Using $PROFILE. CSS will be copied and JS will be built."

# clean the old distribution files
echo -n "Cleaning old files..."
rm -rf "$DISTDIR"
echo " Done"

cd "$TOOLSDIR"

if which node >/dev/null; then
    node ../../dojo/dojo.js load=build "profile=$PROFILE" "releaseDir=$DISTDIR" "$@"
else
    echo "Need node.js to build!"
    exit 1
fi

cd "$UTILDIR"

# copy the html
cp "$SRCDIR/schedule.html" "$DISTDIR/schedule.html"

echo "Build complete"
