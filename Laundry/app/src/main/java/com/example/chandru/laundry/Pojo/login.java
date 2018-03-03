package com.example.chandru.laundry.Pojo;


import com.google.gson.annotations.SerializedName;

import java.util.List;

public class login {
    @SerializedName("error")
    private String error;
    @SerializedName("u_id")
    private String u_id;

    @SerializedName("user")
    private user results;

    public login(String error, String u_id) {
        this.error = error;
        this.u_id = u_id;
      //  this.results = results;

    }

    public user getResults() {
        return results;
    }

    public void setResults(user results) {
        this.results = results;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public String getU_id() {
        return u_id;
    }

    public void setU_id(String u_id) {
        this.u_id = u_id;
    }


}



