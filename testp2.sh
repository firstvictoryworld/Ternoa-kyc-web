docker stop testps2
docker rm testps2
docker run --name testps2 -d -p 8080:80 -v /Users/mickaelcanu/www3/ternoa/kyc-web/build/:/usr/share/nginx/html:ro -d nginx