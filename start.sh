#!/bin/bash
PGMNAME=`basename $0`

#application configuration...
NODE_ENV=dev
VAULT='{"auth":{"facebook":{"clientId":"881601445289245","clientSecret":"8b3671fe28e22dd57b525d8cb864a2c9"}},"password":"wx8(rOqJIA^yok4aBv!(l25GjwHTP0g&","api":{"user":"user","password":"user"},"stripe":"sk_test_m1f9mBO7U4X1lDnerfKhTyK9"}'

export NODE_ENV
export VAULT

#--env-file /home/aaa.properties

exit 0;
