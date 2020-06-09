import axios from 'axios';

export const getList =()=>{
    // 请求列表数据
    return axios.get('/api/list')
};

// 登录请求
export const login = (params)=>{
    // 登录需要传递用户名和密码
    return axios.get('/api/login',{params:params})
};

// 删除请求
export const del =(params)=>{
    return axios.get('/api/del',{params:params})
};

// 添加数据请求 或者 修改数据请求
export const add =(params)=>{
    // post 请求第二个参数就是一个对对象
    // get 请求第二个参数也是一个对象，但是属性名必须是params对应的属性值，才是要传递的参数
    return axios.post('/api/add',params)
}