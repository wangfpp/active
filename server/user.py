# -*- coding: utf-8 -*-
# @Author: wangfpp
# @Date:   2018-11-21 15:22:53
# @Last Modified by:   wangfpp
# @Last Modified time: 2018-11-21 15:24:11
#desc 用户管理
from tornado import web,ioloop
import uuid
import pymysql
db = pymysql.connect('172.16.1.60', 'root', 'ddkk1212', 'dinner', charset='utf8')

class queryAllUser(web.RequestHandler):
    def get(self):
        sql = "SELECT phone,name,email,isable FROM users"
        query = self.application.cursor.execute(sql)
        keyList = ['phone', 'name', 'email', 'isable']
        data = []
        if query:
            queryData = self.application.cursor.fetchall()
            for item in queryData:
                zipped = zip(keyList, list(item)) # python 内置zip函数
                data.append(dict(zipped)) # list to dict
            self.set_status(200)
            self.finish({"data": {"code": 1, "users": data}})
        else:
            self.set_status(200)
            self.finish({"data": {"code": 1, "users": data}})

class modifyInfo(web.RequestHandler):
    def put(self):
        print(self.request.body)


class Application(web.Application): 
    def __init__(self, loop):
        self.loop = loop
        handlers = [
            (r'/queryAllUser', queryAllUser),
            (r'/modifyInfo', modifyInfo)
        ]
        web.Application.__init__(self, handlers = handlers)

if __name__ == "__main__":
    port = 8098
    loop = ioloop.IOLoop.instance()
    app = Application(loop)
    app.listen(port)
    app.db = pymysql.connect('172.16.1.60', 'root', 'ddkk1212', 'dinner', charset='utf8')
    app.cursor = app.db.cursor()
    loop.start()


