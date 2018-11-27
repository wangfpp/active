# -*- coding: utf8 -*-
# @Author: wang
# @Date:   2018-11-21 15:51:33
# @Last Modified by:   wang
# @Last Modified time: 2018-11-21 15:51:49
import tornado.ioloop
import tornado.web
import json
import pymysql
import time
from validater import validate

db = pymysql.connect('172.16.1.60', 'root', 'ddkk1212', 'dinner', charset='utf8')
cursor = db.cursor()
# print (db)
def bytesjson(b):
    if isinstance(b, bytes):
        string = bytes.decode(b)           
        userInfo = json.loads(string)
    else:
        userInfo = json.loads(b)
    return userInfo

class BaseHandler(tornado.web.RequestHandler):
    @property # 修饰期　可以把函数当成一个属性来访问
    def get_current_user(self):
        return self.get_secure_cookie('user')

class preLogin(BaseHandler):
    def get(self):
        print (self.get_current_user)
        # if self.get_current_user:
        #     userInfo = bytesjson(self.get_current_user)
        #     self.finish({"data": {"code": 1, "user": json.dumps(userInfo)}})

class login(tornado.web.RequestHandler): # 用户登录接口
    def post(self):
        body = self.request.body
        userInfo = bytesjson(body)
        user = userInfo['user']
        password = userInfo['password']
        isexite = db.query("SELECT name from `users` where phone='{}' or email='{}';".format(user,user))
        cursor.execute("SELECT name,phone,password,isable,isadmin,email from `users` where phone='{}' or email='{}';".format(user,user))
        data = cursor.fetchone()
        if isexite == 0:
            self.set_status(401)
            self.finish({"data": {"code": 0, "reason": '用户名不存在'}})
        else:
            passcode = data[2]
            isable = data[3]
            isadmin = data[4]
            email = data[5]
            res_data = {"name": data[0], "phone": data[1], "isadmin": isadmin, "email": email}
            if not passcode == password:
                self.set_status(401)
                self.finish({"data": {"code": 0, "reason": '密码错误'}})
            elif isable == 0:
                self.set_status(401)
                self.finish({"data": {"code": 0, "reason": '此账号已被禁用'}})
            else:
                self.set_secure_cookie('user', json.dumps(res_data), expires_days=2, version=2) # expires=time.time()+60,过期时间　n*60 n为分钟数
                self.set_status(200)
                self.finish({"data": {"code": 1, "reason": '登录成功', "user":res_data}})
                

class register(tornado.web.RequestHandler): #注册接口
    def post(self):
        body = self.request.body
        if isinstance(body, bytes):
            string = bytes.decode(body)           
            userInfo = json.loads(string)
        else:
            userInfo = json.loads(body)
        phone = userInfo['phone']
        password = userInfo['password']
        if (validate.isPhone(phone) or validate.isEmail(phone)):
            isresitered = db.query("SELECT name from `users` where phone='{}' or email='{}';".format(phone,phone))
            if isresitered == 0:
                account_type = 'phone' if (validate.isPhone(phone)) else 'email'
                try:
                    db.ping(reconnect=True)
                    sqlexec = 'INSERT into `users`({}, password) VALUES (%s, %s)'.format(account_type)
                    db.cursor().execute(sqlexec, (phone,password))
                    db.commit()
                    db.close()
                    self.set_status(200)
                    self.finish({"data":{"code": 1, "reason": '注册成功'}})
                except:
                    self.set_status(500)
                    self.finish({"data":{"code": 0, "reason": '服务异常'}})
            else:
                self.set_status(400)
                self.finish({"data":{"code": 1, "reason": '该账号已被注册'}}) 
        else:
            self.set_status(400)
            self.finish({"data":{"code": 0, "reason": '登录账号格式不正确'}})     

def main():
    settings = {
        "cookie_secret": "ddkk1212"
    }
    app = tornado.web.Application(
        [
            (r'/login', login),
            (r'/register', register),
            (r'/prelogin', preLogin)
        ], **settings
    )
    app.listen('8097')
    tornado.ioloop.IOLoop.current().start()
if __name__ == '__main__':
    validate = validate()
    main()

# 局域网链接数据库 https://blog.csdn.net/cryhelyxx/article/details/40114695
    