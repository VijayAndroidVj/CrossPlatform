package com.example.chandru.laundry.Pojo;

import com.google.gson.annotations.SerializedName;

/**
 * Created by USER on 3/3/2018.
 */

public class user {

    @SerializedName("name")
    private String name;
    @SerializedName("email")
    private String email;
    @SerializedName("type")
    private String type;
    @SerializedName("unique_id")
    private String unique_id;

    public user(String name, String type,String email, String unique_id) {
        this.name = name;
        this.type = type;
        this.email = email;
        this.unique_id = unique_id;


    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUnique_id() {
        return unique_id;
    }

    public void setUnique_id(String unique_id) {
        this.unique_id = unique_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
