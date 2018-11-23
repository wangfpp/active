# -*- coding: utf-8 -*-
# @Author: wangfpp
# @Date:   2018-11-22 18:21:35
# @Last Modified by:   wangfpp
# @Last Modified time: 2018-11-22 18:22:05
import re
class validate():
    def __init__(self):
        self.emainre = re.compile(r'[^\._][\w\._-]+@(?:[A-Za-z0-9]+\.)+[A-Za-z]+$')
        self.phonere = re.compile(r'[1][^1269]\d{9}')
    def isEmail(self, email):
        res = self.emainre.match(email)
        if res:
            return True
        else:
            return False
    def isPhone(self, phone):
        res = self.phonere.match(phone)
        if res:
            return True
        else:
            return False
if __name__ == "__main__":
    a = validate()
