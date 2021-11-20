import axiosCreate from "./axiosCreate";

class productService 
{
    add = (data) => 
    {
        return axiosCreate.post('api/product/add', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
    update = (data) => 
    {
        return axiosCreate.post('api/product/edit', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
    delete = (code) => 
    {
        return axiosCreate.post('api/product/delete', code);
    }
}

export default new productService();