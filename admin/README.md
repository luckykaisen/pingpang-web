
打包：
    docker rmi -f weikaisen/pingpang-nginx:1.0
    docker build -t weikaisen/pingpang-nginx:1.0 .

推送：
    docker push weikaisen/pingpang-nginx:1.0

部署：docker run -d -p 80:80 --name nginx --net pingpang-network weikaisen/nginx:1.0
