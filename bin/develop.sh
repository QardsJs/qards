#!/bin/bash

export GATSBY_DIR="/site"
export PATH="$PATH:/usr/local/bin/gatsby"

if  [ "$1" == "develop" ]
then
    rm -rf ${GATSBY_DIR}/public
    rm -rf ${GATSBY_DIR}/.cache

    gatsby develop --host 0.0.0.0
elif  [ "$1" == "build" ]
then
    rm -rf ${GATSBY_DIR}/public
    rm -rf ${GATSBY_DIR}/.cache
    gatsby build
elif  [ "$1" == "stage" ]
then
    rm -rf ${GATSBY_DIR}/public
    rm -rf ${GATSBY_DIR}/.cache
    gatsby build
    gatsby serve --port 0.0.0.0:8000
else
    exec $@
fi
