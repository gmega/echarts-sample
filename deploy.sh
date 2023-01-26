#!/usr/bin/env bash
set -e

yarn build

cd build
gsutil -m -h 'Cache-Control:public, max-age=0' cp -r . gs://notebooks.window.finance/echarts-demo/