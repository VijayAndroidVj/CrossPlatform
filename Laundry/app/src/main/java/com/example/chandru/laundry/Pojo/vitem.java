package com.example.chandru.laundry.Pojo;

/**
 * Created by chandru on 2/28/2018.
 */

public class vitem {



    private String id;
    private String randuniq;
    private String laundry_item;
    private String laundry_price;
    private String laundry_quantity;
    private String laundry_id;
    private String service;
    private String icon_image;

    public vitem(){

    }


    public vitem(String idid, String randuniq,String laundry_item, String laundry_price,String laundry_quantity, String laundry_id,String service,String icon_image) {
        this.id = id;
        this.randuniq = randuniq;
        this.laundry_item = laundry_item;
        this.laundry_price = laundry_price;
        this.laundry_quantity = laundry_quantity;
        this.laundry_id = laundry_id;
        this.service=service;
        this.icon_image=icon_image;




    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getRanduniq() {
        return randuniq;
    }

    public void setRanduniq(String randuniq) {
        this.randuniq = randuniq;
    }

    public String getLaundry_item() {
        return laundry_item;
    }

    public void setLaundry_item(String laundry_item) {
        this.laundry_item = laundry_item;
    }

    public String getLaundry_price() {
        return laundry_price;
    }

    public void setLaundry_price(String laundry_price) {
        this.laundry_price = laundry_price;
    }

    public String getLaundry_quantity() {
        return laundry_quantity;
    }

    public void setLaundry_quantity(String laundry_quantity) {
        this.laundry_quantity = laundry_quantity;
    }

    public String getLaundry_id() {
        return laundry_id;
    }

    public void setLaundry_id(String laundry_id) {
        this.laundry_id = laundry_id;
    }

    public String getService() {
        return service;
    }

    public void setService(String service) {
        this.service = service;
    }

    public String getIcon_image() {
        return icon_image;
    }

    public void setIcon_image(String icon_image) {
        this.icon_image = icon_image;
    }
}

