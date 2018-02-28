package com.example.chandru.laundry.Pojo;


public class vloation {


    private String id;
    private String location_name;
    private String location_description;


    public vloation(){

    }


    public vloation(String id, String location_name,String location_description) {
        this.id = id;
        this.location_name = location_name;
        this.location_description = location_description;





    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLocation_name() {
        return location_name;
    }

    public void setLocation_name(String location_name) {
        this.location_name = location_name;
    }

    public String getLocation_description() {
        return location_description;
    }

    public void setLocation_description(String location_description) {
        this.location_description = location_description;
    }
}
