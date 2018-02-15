package com.example.chandru.laundry;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.widget.TextView;

public class SplashScreen extends AppCompatActivity {
    private Activity activity;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        //Fabric.with(this, new Crashlytics());
        activity = this;
        setContentView(R.layout.activity_splash);
        TextView tv_splashscreen_appversion = (TextView) findViewById(R.id.tv_splashscreen_appversion);
        tv_splashscreen_appversion.setText("v" + BuildConfig.VERSION_NAME);

        new Handler().postDelayed(new Runnable() {
            /*
             * Showing splash screen with a timer. This will be useful when you
             * want to show case your app logo / company
             */
            @Override
            public void run() {
                // This method will be executed once the timer is over
                // Start your app main activity
                PreferenceUtil preferenceUtil = new PreferenceUtil(SplashScreen.this);
                if(preferenceUtil.isLoggined()) {
                    Intent intent = new Intent(SplashScreen.this, MainActivity.class);
                    intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK);
                    startActivity(intent);
                    finish();
                }else{
                    Intent intent = new Intent(SplashScreen.this, LoginActivity.class);
                    intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK);
                    startActivity(intent);
                    finish();
                }
            }
        }, 3000);


    }

    @Override
    protected void onResume() {
        super.onResume();
    }
}

