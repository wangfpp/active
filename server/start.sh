# @Author: wangfpp
# @Date:   2018-11-29 16:43:20
# @Last Modified by:   wangfpp
# @Last Modified time: 2018-11-29 16:43:43
# !/sbin/bash

export PATH=$PATH:/home/tx1/bin:/home/tk1/bin:/usr/local/sbin
# Shell 函数 Shell和Javascript一样都是顺序执行函数先声明后使用
function isUseingPort() {
    sudo netstat -apn | grep '^tcp*'| grep $1 > /dev/null
    return $?
}

function start_server() { #Shell
    if isUseingPort '9066';then
        echo 'Nginx is running'
    else
        echo 'Start Nginx.....'
        sudo nginx -c /home/wang/work/dinner/server/nginx/conf/nginx.conf
        echo 'Start Server'
        python3 user.py &
        python3 login.py &
    fi
}

function stop_server() {
    pid1=$(sudo netstat -anp|grep 8097|awk '{printf $7}'|cut -d/ -f1)
    pid2=$(sudo netstat -anp|grep 8098|awk '{printf $7}'|cut -d/ -f1)
    #echo ${pid1} ${pid2}
    sudo kill -9 ${pid1}&
    sudo kill -9 ${pid2}&
    echo 'Kill all port using'
    sudo nginx -c /home/wang/work/dinner/server/nginx/conf/nginx.conf -s stop
    echo 'Stop Nginx'
}





if [ ${1} == "start" ]
then
    start_server
elif [ ${1} == "stop" ]
then
    echo 'stop'
    stop_server
else
    echo '仅支持start stop对服务进行操作'
fi




