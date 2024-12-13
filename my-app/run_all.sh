#!/bin/bash
#cd to the backend root, Replace ROOT/BACKEND with location
cd ~/ROOT/BACKEND && startup.sh && run.sh &

#cd to the frontend root, Replace ROOT/FRONTEND with location
cd ~/ROOT/FRONTEND/my-app && startup.sh && run.sh &