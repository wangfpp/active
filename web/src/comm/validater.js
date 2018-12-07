const validate = {
    isPhone: phone => {
        let pattern = /^[1][3,4,5,7,8][0-9]{9}$/;
        return pattern.test(phone) ? true : false;
    },
    isEmail: email => {
        let pattern = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
        return pattern.test(email) ? true : false;
    },
    limitName: name => {
        let pattern = /^[a-zA-Z0-9_\u4E00-\u9FA5]{3,10}$/;
        return pattern.test(name) ? true : false;
    }
};
export {
    validate
}