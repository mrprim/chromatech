#!/bin/bash

ssh pi@pi 'bash -i -c "cd ~/server/chromatech && git pull"'
ssh pi@pi 'bash -i -c "cd ~/server/chromatech && npm ci && npm run start"'
