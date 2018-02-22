package com.example.chandru.laundry.Pojo;

import com.google.gson.annotations.SerializedName;

import java.util.ArrayList;

/**
 * Created by vijay on 22/2/18.
 */

public class ServiceMain {

    @SerializedName("item")
    private ArrayList<cat> item;

    public ArrayList<cat> getItem() {
        return item;
    }

    public void setItem(ArrayList<cat> item) {
        this.item = item;
    }
}
