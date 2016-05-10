#!/bin/bash
PGMNAME=`basename $0`

#docker run -p 3000:3000 -it cesaregb/laundry-web
IMAGE_NAME="interactivelabs/laundry-web"
PORT_IN=3000
PORT_OUT=3000

docker run -p ${PORT_OUT}:${PORT_IN} \
  -e NODE_ENV='production' \
  
  -it -d ${IMAGE_NAME}


exit 0;
