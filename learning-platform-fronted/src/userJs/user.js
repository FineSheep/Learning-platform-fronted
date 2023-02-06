import myAxios from "@/axios/myAxios";

export default {
   async getCurrentUser() {
        const userId = Number(localStorage.getItem("userId"));
        //从远程处获取用户信息
       const user =await myAxios.get("/user/userInfo/" + userId);
       if (user.code ==0){
           return user.data;
       }
       return null;
    }

}