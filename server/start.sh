# @Author: wangfpp
# @Date:   2018-11-29 16:43:20
# @Last Modified by:   wangfpp
# @Last Modified time: 2018-12-07 18:50:09
# !/sbin/bash

export PATH=$PATH:/home/tx1/bin:/home/tk1/bin:/usr/local/sbin
# Shell 函数 Shell和Javascript一样都是顺序执行函数先声明后使用
function isUseingPort() { #Shell获取参数 用${n}
    sudo netstat -apn | grep '^tcp*'| grep $1 > /dev/null #/dev/null  把信息扔进null中  
    return $?
}

function start_server() { #Shell
    if isUseingPort '9066';then
        echo 'Nginx is running'
    else
        echo 'Start Nginx.....'
        sudo nginx -c /home/wang/work/dinner/server/nginx/conf/nginx.conf
        echo 'Start Server'
        python3 login.py && python3 user.py
    fi
}

function stop_server() {
    sudo nginx -c /home/wang/work/dinner/server/nginx/conf/nginx.conf -s stop
}





if [ ${1} == "start" ]
then
    start_server
elif [ ${1} == "stop" ]
then
    stop_server
else
    echo '仅支持start stop对服务进行操作'
fi




