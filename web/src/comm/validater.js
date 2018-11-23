const validate = {
    isPhone: (phone => {
        let pattern = /^[1][3,4,5,7,8][0-9]{9}$/;
        return pattern.test(phone) ? true : false;
    }),
    isEmail: (email => {
        let pattern = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
        return pattern.test(email) ? true : false;
    }),
};
export {
    validate
}