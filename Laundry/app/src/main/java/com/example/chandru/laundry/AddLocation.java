package com.example.chandru.laundry;

import android.app.ActivityOptions;
import android.content.Intent;
import android.content.SharedPreferences;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import com.example.chandru.laundry.Api.Api;
import com.example.chandru.laundry.Api.ApiInterface;
import com.example.chandru.laundry.Pojo.customer;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class AddLocation extends AppCompatActivity {

    private EditText location, description;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_location);

        location =(EditText)findViewById(R.id.location);
        description=(EditText)findViewById(R.id.description);
    }


    public  void addlocate(View view){

        String loca=location.getText().toString();
        String dest=location.getText().toString();

        ApiInterface apiService =
                Api.getClient().create(ApiInterface.class);

        Call<customer> call = apiService.getlocation(loca,dest);
        call.enqueue(new Callback<customer>() {
            @Override
            public void onResponse(Call<customer>call, Response<customer> response) {
                String movies =response.body().getError();
                String msg=response.body().getError_msg();

                Log.d("success", "Number of movies received: " + movies);
                if(movies.equals("false")){

                    Toast.makeText(AddLocation.this, msg, Toast.LENGTH_SHORT)
                            .show();

                   // Intent myIntent = new Intent(AddLocation.this, Order.class);
                   // ActivityOptions options =
                    //        ActivityOptions.makeCustomAnimation(AddLocation.this, R.anim.left_enter, R.anim.left_out);
                    //startActivity(myIntent, options.toBundle());
                }else{
                    // loginLayout.startAnimation(shakeAnimation);
                    Toast.makeText(AddLocation.this, "Insert error", Toast.LENGTH_SHORT)
                            .show();
                }
            }

            @Override
            public void onFailure(Call<customer>call, Throwable t) {
                // Log error here since request failed
                Log.e("error", t.toString());
            }
        });



    }


}
