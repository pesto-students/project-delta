#!/bin/bash

RET_CODE=0

for package in `ls packages`; do
  cd packages/$package

  yarn test:related "$@"

  if [ $? -ne 0 ]; then
    RET_CODE=1
  fi;

  cd ../..
done;

exit $RET_CODE
