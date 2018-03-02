package com.example.chandru.laundry;

import android.app.ActivityOptions;
import android.app.ProgressDialog;
import android.content.Intent;
import android.os.AsyncTask;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;

public class Forgot extends AppCompatActivity {

    private EditText login_emailid;
    private String dataOne;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        requestWindowFeature(Window.FEATURE_NO_TITLE);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
                WindowManager.LayoutParams.FLAG_FULLSCREEN);
        setContentView(R.layout.activity_forgot);

        login_emailid = (EditText)findViewById(R.id.login_emailid);

    }


    public void forgotpassword(View view){
        String email = login_emailid.getText().toString();

        if(email.equals("") || email.equals("NaN") || email == null){
            Toast.makeText(this, "Please enter email address", Toast.LENGTH_SHORT).show();
        }else {

            if (CommonUtil.isNetworkAvailable(Forgot.this)) {
                String Url = "http://demo.adityametals.com/api/forget_password.php?email="+email;
                new serverUpload().execute(Url);
            } else {
                Toast.makeText(Forgot.this, "Check your internet connection!", Toast.LENGTH_SHORT).show();
            }

        }

    }

    private class serverUpload extends AsyncTask<String, Void, Boolean> {
        ProgressDialog dialog;

        @Override
        protected void onPreExecute() {
            super.onPreExecute();
            dialog = new ProgressDialog(Forgot.this);
            dialog.setMessage("Loading in.., please wait");
            dialog.setTitle("");
            // dialog.getWindow().getAttributes().windowAnimations = R.style.dialog_animation;
            dialog.show();
            dialog.setCancelable(false);
        }

        @Override
        protected Boolean doInBackground(String... params) {
            try {
                //String url = params[0].replace(" ", "%20");
                HttpGet httppost = new HttpGet(params[0]);
                HttpClient httpclient = new DefaultHttpClient();
                HttpResponse response = httpclient.execute(httppost);


                HttpEntity entity = response.getEntity();
                dataOne = (EntityUtils.toString(entity));


            } catch (IOException e) {
                e.printStackTrace();
            }
            return false;
        }

        @Override
        protected void onPostExecute(Boolean aBoolean) {
            dialog.dismiss();



                if(dataOne.equals("Invalid Address")){
                    Toast.makeText(Forgot.this, dataOne, Toast.LENGTH_SHORT).show();
                }else {
                    Toast.makeText(Forgot.this, "Successfully updated", Toast.LENGTH_SHORT).show();
                    Intent myIntent = new Intent(Forgot.this, LoginActivity.class);
                    ActivityOptions options =
                            ActivityOptions.makeCustomAnimation(Forgot.this, R.anim.left_enter, R.anim.left_out);
                    startActivity(myIntent, options.toBundle());

                }
               // JSONObject jsono = new JSONObject(dataOne);
                //String msg = jsono.getString("error");

//                if (msg.equals("false")) {
//                    // sendDatatoServer(billno);
//                    Toast.makeText(Forgot.this, "Successfully updated", Toast.LENGTH_SHORT).show();
//                    Intent myIntent = new Intent(Forgot.this, LoginActivity.class);
//                    ActivityOptions options =
//                            ActivityOptions.makeCustomAnimation(Forgot.this, R.anim.left_enter, R.anim.left_out);
//                    startActivity(myIntent, options.toBundle());
//                } else {
//                    Toast.makeText(Forgot.this, "Error", Toast.LENGTH_SHORT).show();
//                }



        }
    }
}
