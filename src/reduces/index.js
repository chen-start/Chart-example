export default (state= {}, action) => {
    switch(action.type){
        case 'Login':
            state.isLogin = true;
            return '登录成功!';
        case 'Logout':
            return '退出登录!';
        default:
            return null;
    }
}