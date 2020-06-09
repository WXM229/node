import axios from 'axios';

export const getList =()=>{
    // 请求列表数据
    return axios.get('/api/list')
};

// 登录请求
export const login = (params)=>{
    return axios.get('/api/login',{params:params})
};

// 删除请求
export const del =(params)=>{
    return axios.get('/api/del',{params:params})
};

// 添加数据请求 或者 修改数据请求
export const add =(params)=>{
    return axios.post('/api/add',params)
}