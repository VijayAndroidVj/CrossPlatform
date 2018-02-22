package com.example.chandru.laundry;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.AsyncTask;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Toast;

import com.example.chandru.laundry.Api.ApiInterface;
import com.example.chandru.laundry.Pojo.addservice;

import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.BasicResponseHandler;
import org.apache.http.impl.client.DefaultHttpClient;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class AddService extends AppCompatActivity {
    private ImageView image_view;
    private static int RESULT_LOAD_IMG = 1;
    private EditText name,decription ;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_service);

        image_view =(ImageView)findViewById(R.id.image_view);
        name=(EditText)findViewById(R.id.name);
        decription=(EditText)findViewById(R.id.description);
    }

    public void choose(View view){
        Intent photoPickerIntent = new Intent(Intent.ACTION_PICK);
        photoPickerIntent.setType("image/*");
        startActivityForResult(photoPickerIntent, RESULT_LOAD_IMG);
    }


    @Override
    protected void onActivityResult(int reqCode, int resultCode, Intent data) {
        super.onActivityResult(reqCode, resultCode, data);


        if (resultCode == RESULT_OK) {
            try {
                final Uri imageUri = data.getData();
                final InputStream imageStream = getContentResolver().openInputStream(imageUri);
                final Bitmap selectedImage = BitmapFactory.decodeStream(imageStream);
                image_view.setImageBitmap(selectedImage);
            } catch (FileNotFoundException e) {
                e.printStackTrace();
                Toast.makeText(AddService.this, "Something went wrong", Toast.LENGTH_LONG).show();
            }

        }else {
            Toast.makeText(AddService.this, "You haven't picked Image",Toast.LENGTH_LONG).show();
        }
    }


    //demo.adityametals.com/api/add_service.php

    public void sendPost() {

        String nme=name.getText().toString();
        String des=decription.getText().toString();


        ApiInterface.savePost(nme, des, 1).enqueue(new Callback<addservice>() {
            @Override
            public void onResponse(Call<addservice> call, Response<addservice> response) {

                if(response.isSuccessful()) {
                    showResponse(response.body().toString());
                    Log.i("Success", "post submitted to API." + response.body().toString());
                }
            }

            @Override
            public void onFailure(Call<addservice> call, Throwable t) {
                Log.e("Success", "Unable to submit post to API.");
            }
        });
    }

    public void showResponse(String response) {
       // if(mResponseTv.getVisibility() == View.GONE) {
       //     mResponseTv.setVisibility(View.VISIBLE);
       // }
      //  mResponseTv.setText(response);
    }





}
