package com.example.chandru.laundry.Api;


import android.database.Observable;
import android.os.Build;
import android.support.annotation.RequiresApi;

import com.example.chandru.laundry.Pojo.addservice;
import com.example.chandru.laundry.Pojo.cat;
import com.example.chandru.laundry.Pojo.customer;
import com.example.chandru.laundry.Pojo.login;

import retrofit2.Call;
import retrofit2.http.Field;
import retrofit2.http.FormUrlEncoded;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Query;

public interface ApiInterface {

    @GET("login.php/api/login.php")
    Call<login> getLogin(@Query("username") String username,@Query("password") String password);

    @GET("add_customer.php?")
    Call<customer> getCustomer(@Query("name") String name,@Query("address") String address,@Query("contact") String contact);

    @GET("service.php?")
    Call<cat> getCat();


    @POST("/posts")
    @FormUrlEncoded
     Call<addservice> savePost(@Field("icon_image") String title,
                                     @Field("name") String body,
                                     @Field("description") String image);
}
