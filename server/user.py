# -*- coding: utf-8 -*-
# @Author: wangfpp
# @Date:   2018-11-21 15:22:53
# @Last Modified by:   wangfpp
# @Last Modified time: 2018-11-21 15:24:11
#desc 用户管理
import tornado.web
import tornado.ioloop
import uuid
import pymysql
db = pymysql.connect('172.16.1.60', 'root', 'ddkk1212', 'dinner', charset='utf8')

