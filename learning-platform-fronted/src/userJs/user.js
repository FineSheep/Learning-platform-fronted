import myAxios from "@/axios/myAxios";

export default {
   async getCurrentUser() {
        //从远程处获取用户信息
       const user =await myAxios.get("/user/userInfo");
       if (user.code ==0){
           return user.data;
       }
       return null;
    }

}