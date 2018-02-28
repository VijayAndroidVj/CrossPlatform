package com.example.chandru.laundry;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class Setting extends AppCompatActivity {
    private Button btnsservice,btnlocation,btnitem;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_setting);

        btnsservice = (Button)findViewById(R.id.btnservice);
        btnlocation = (Button)findViewById(R.id.btnlocation);
        btnitem = (Button)findViewById(R.id.btnitem);




        btnsservice.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intentd = new Intent(Setting.this, ViewService.class);

                startActivity(intentd);
            }
        });
        btnlocation.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intentd = new Intent(Setting.this, ViewLocation.class);

                startActivity(intentd);
            }
        });
        btnitem.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intentd = new Intent(Setting.this, ViewItems.class);

                startActivity(intentd);
            }
        });
    }
}
