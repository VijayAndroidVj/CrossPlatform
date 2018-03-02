package com.example.chandru.laundry.Pojo;

/**
 * Created by USER on 3/2/2018.
 */

public class vcustomer {


    private String id;
    private String customer_name;
    private String customer_address;
    private String customer_contact1;
    private String type;
    private String balance;
    private String user_id;


    public vcustomer(){

    }


    public vcustomer(String id, String customer_name,String customer_address, String customer_contact1,String type,String balance,String user_id) {
        this.id = id;
        this.customer_name = customer_name;
        this.customer_address = customer_address;
        this.customer_contact1 = customer_contact1;
        this.type = type;
        this.balance = balance;
        this.user_id = user_id;





    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCustomer_name() {
        return customer_name;
    }

    public void setCustomer_name(String customer_name) {
        this.customer_name = customer_name;
    }

    public String getCustomer_address() {
        return customer_address;
    }

    public void setCustomer_address(String customer_address) {
        this.customer_address = customer_address;
    }

    public String getCustomer_contact1() {
        return customer_contact1;
    }

    public void setCustomer_contact1(String customer_contact1) {
        this.customer_contact1 = customer_contact1;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getBalance() {
        return balance;
    }

    public void setBalance(String balance) {
        this.balance = balance;
    }

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }
}
