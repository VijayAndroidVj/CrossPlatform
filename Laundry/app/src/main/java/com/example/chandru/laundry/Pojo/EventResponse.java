package com.example.chandru.laundry.Pojo;

import com.google.gson.annotations.SerializedName;

/**
 * Created by iyara_rajan on 18-07-2017.
 */

public class EventResponse {

    @SerializedName("username")
    private String username;

    @SerializedName("profileName")
    private String profileName;

    @SerializedName("password")
    private String password;

    @SerializedName("name")
    private String name;

    @SerializedName("gender")
    private String gender;

    @SerializedName("state")
    private String state;

    @SerializedName("country")
    private String country;

    @SerializedName("aboutme")
    private String aboutme;

    @SerializedName("email")
    private String email;

    @SerializedName("result")
    private String result;

    @SerializedName("message")
    private String message;

    @SerializedName("privacyOn")
    private String privacyOn;

    @SerializedName("serverimage")
    private String serverimage;

    @SerializedName("cover_image")
    private String coverimage;

    @SerializedName("error")
    private String error;

    @SerializedName("error_msg")
    private String error_msg;

    public String getProfileName() {
        return profileName;
    }

    public void setProfileName(String profileName) {
        this.profileName = profileName;
    }

    public String getPrivacyOn() {
        return privacyOn;
    }

    public void setPrivacyOn(String privacyOn) {
        this.privacyOn = privacyOn;
    }

    public String getCoverimage() {
        return coverimage;
    }

    public void setCoverimage(String coverimage) {
        this.coverimage = coverimage;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getAboutme() {
        return aboutme;
    }

    public void setAboutme(String aboutme) {
        this.aboutme = aboutme;
    }

    public String getServerimage() {
        return serverimage;
    }

    public void setServerimage(String serverimage) {
        this.serverimage = serverimage;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "result = " + result + " , message = " + message;
    }
}
