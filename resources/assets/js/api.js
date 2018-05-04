import axios from 'axios'

export default {
    user: {
        login: credentials =>
            axios.post("/api/login", credentials),
        getUserResetPassword: token =>
            axios.get("/api/password/reset/" + token),
        resetPasswordLink: credentials =>
            axios.post("/api/password/email", credentials),
        resetPassword: credentials =>
            axios.post("/api/password/reset", credentials),
        resetPasswordByUser: (id, credentials) =>
            axios.put(`/api/user/password/reset/${id}`, credentials),
        logout: () =>
            axios.post("/api/logout"),
        confirm: token =>
            axios
                .post('/api/auth/confirmation', {token})
                .then(res => res.data.user),
        resetPasswordRequest: email =>
            axios.post('/api/auth/reset_password_request', {email}),
        validateToken: token => axios.post('/api/auth/validate_token', {token}),
        getAll: () =>
            axios.get('/api/user'),
        create: data =>
            axios.post('/api/user', data),
        getOne: id =>
            axios.get(`/api/user/${id}`),
        edit: (id, data) =>
            axios.put(`/api/user/${id}`, data),
        delete: id =>
            axios.post(`/api/user/delete`, {id: id}),
        getPermission: id =>
            axios.get(`/api/user/get-permission`)
    },
    books: {
        fetchAll: () => axios.get('/api/books').then(res => res.data.books),
        create: book =>
            axios.post('/api/books', {book}).then(res => res.data.book)
    },
    company: {
        updateQrcode1: (id, data) =>
            axios.put(`/api/company/qrcode-1/${id}`, data),
        storeQrCode1: data =>
            axios.post(`/api/company/store/generate-qrcode-1`, data),
        getQrcode1 :  () =>
            axios.get('/api/company/generate-qrcode-1'),
        getPolicy :  () =>
            axios.get('/api/company/policy'),
        editCompanyPolicy :  (data) =>
            axios.post('/api/company/policy', data),
        printQrCode : serial =>
            axios.get('/api/company/print/' + serial),
        getAllStoreForMap : () =>
            axios.get('/api/company/store'),
        getStoreTop : () =>
            axios.get('/api/company/store-top?limit=10'),
        fetchAll: () =>
            axios.get('/api/company'),
        create: data =>
            axios.post('/api/company', data),
        getOne: id =>
            axios.get(`/api/company/${id}`),
        edit: (id, data) =>
            axios.put(`/api/company/${id}`, data),
        delete: id =>
            axios.post(`/api/company/delete`, {id: id}),
        guider: id =>
            axios.get('/api/company/guider'),
        guiderAdd: data =>
            axios.post('/api/guider',data),
        guiderDelete: id =>
            axios.delete('/api/guider/'+id).then(res => res.data),
        getGuiderId: id =>
            axios.get('/api/guider/'+id),
        guiderEdit: (data,id) =>
            axios.put('/api/guider/'+id,data),
        getOneStore : id =>
            axios.get('/api/company/store/'+id),
        qrcodeAdd: data =>
            axios.post('/api/qrcode',data),
        qrcode2Add: data =>
            axios.post('/api/qrcode2',data),
        getCompanyForCreateUser: data =>
            axios.get('/api/user/company'),
        getGuiderQrcode1: () =>
            axios.get('/api/company/guider/qrcode-1'),
        fetchQrCode1: () =>
            axios.get('/api/company/qrcode-1'),
    },
    store: {
        getAll: () =>
            axios.get('/api/store'),
        getStoreForCreateUser: () =>
            axios.get('/api/user/store'),
        getAllStore: (id = null) =>
            axios.get(id == null ? '/api/store-all' : `/api/store-all/${id}`),
        create: data =>
            axios.post('/api/store', data),
        getOne: id =>
            axios.get(`/api/store/${id}`),
        edit: (id, data) =>
            axios.put(`/api/store/${id}`, data),
        delete: id =>
            axios.post(`/api/store/delete`, {id: id}),
        searchName: name =>
            axios.get(`/api/store/search?search=${name}`),
    },
    guider: {
        getManager: () => 
            axios.get('/api/guider/manager'),
        getGuiderForCreateUser: () =>
            axios.get('/api/user/guider'),
    },
    city: {
        getAll: () =>
            axios.get('/api/city'),
        create: data =>
            axios.post('/api/city', data),
        edit: (id, data) =>
            axios.put(`/api/city/${id}`, data)
    },
    country: {
        getAll: data =>
            axios.get('/api/country'),
        create: data =>
            axios.post('/api/country', data),
        edit: (id, data) =>
            axios.put(`/api/country/${id}`, data)
    },
    report: {
        getAll: data =>
            axios.post('/api/report', data),
        getReportCompanyStore: data =>
            axios.post('/api/report/company-store', data),
        getReportCompanyGuider: data =>
            axios.post('/api/report/company-guider', data),
        getReportGuiderStore: data =>
            axios.post('/api/report/guider-store', data),
        create: data =>
            axios.post('/api/report', data),
    },
    role: {
        getAll: () =>
            axios.get('/api/role'),
        getRoleForCreateUpdate: () =>
            axios.get('/api/role/get-role'),
        create: data =>
            axios.post('/api/role', data),
        getOne: id =>
            axios.get(`/api/role/${id}`),
        edit: (id, data) =>
            axios.put(`/api/role/${id}`, data),
        delete: id =>
            axios.post(`/api/role/delete`, {id: id})
    },
    permission: {
        getAll: () =>
            axios.get('/api/permission'),
    },
    type: {
        getAll: () =>
            axios.get('/api/type'),
        getAllType: () =>
            axios.get('/api/type-all'),
    },

}
