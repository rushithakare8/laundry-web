#!/bin/bash
PGMNAME=`basename $0`

#docker run -p 3000:3000 -it cesaregb/laundry-web
IMAGE_NAME="interactivelabs/laundry-web"
PORT_IN=3000
PORT_OUT=3000

docker run -p ${PORT_OUT}:${PORT_IN} \
  -e NODE_ENV='production' \
  -e VAULT='{"auth":{"facebook":{"clientId":"881601445289245","clientSecret":"8b3671fe28e22dd57b525d8cb864a2c9"}},"password":"wx8(rOqJIA^yok4aBv!(l25GjwHTP0g&","api":{"user":"user","password":"user"},"stripe":"sk_test_m1f9mBO7U4X1lDnerfKhTyK9"}' \
  -it -d ${IMAGE_NAME}

exit 0;
