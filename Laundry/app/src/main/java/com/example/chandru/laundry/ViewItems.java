package com.example.chandru.laundry;

import android.app.Activity;
import android.app.AlertDialog;
import android.app.ProgressDialog;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.AsyncTask;
import android.os.Build;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.v7.app.ActionBar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.example.chandru.laundry.Adapter.ViewItemAdapter;
import com.example.chandru.laundry.Adapter.deliverylistAdapter;
import com.example.chandru.laundry.Listener.AdapterListener;
import com.example.chandru.laundry.Pojo.vitem;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class ViewItems extends AppCompatActivity implements View.OnClickListener, AdapterListener {

    private List<vitem> maintain = new ArrayList<>();
    private ViewItemAdapter bAdapter;
    private RecyclerView recycler_view;
    private String dataOne,deleteId,dataTwo;
    private FloatingActionButton fab;

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case android.R.id.home:
                onBackPressed();
                break;
        }
        return super.onOptionsItemSelected(item);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_view_items);


        ActionBar actionBar = getSupportActionBar();
        actionBar.setTitle("View Laundry Items");
        actionBar.setDisplayHomeAsUpEnabled(true);
        actionBar.setHomeButtonEnabled(true);
        actionBar.setDisplayHomeAsUpEnabled(true);


        Window window = this.getWindow();
        window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
        window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            window.setStatusBarColor(this.getResources().getColor(R.color.background_color));
        }

        fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(ViewItems.this, AddProduct.class);
                startActivity(intent);
            }
        });

        if (CommonUtil.isNetworkAvailable(ViewItems.this)) {
            SharedPreferences pref = getApplicationContext().getSharedPreferences("MyPref", MODE_PRIVATE);
            String uid = (pref.getString("uid", ""));
            String Url = "http://demo.adityametals.com/api/view_item.php?user_id="+uid;
            new serverUpload().execute(Url);
        } else {
            Toast.makeText(ViewItems.this, "Check your internet connection!", Toast.LENGTH_SHORT).show();
        }

//        if (CommonUtil.isNetworkAvailable(this)) {
//            SharedPreferences pref = getApplicationContext().getSharedPreferences("MyPref", MODE_PRIVATE);
//            String uid = (pref.getString("uid", ""));
//            String Url = "http://demo.adityametals.com/api/view_item.php";
//            new serverUpload().execute(Url);
//        } else {
//            Toast.makeText(this, "Check your internet connection!", Toast.LENGTH_SHORT).show();
//        }


    }

    @Override
    public void onClick(View view) {

    }

    public void showMeetingtAlert(Activity activity, String title, String message) {
        AlertDialog.Builder alertDialogBuilder = new AlertDialog.Builder(activity);
        LayoutInflater inflater = activity.getLayoutInflater();
        final View dialogView = inflater.inflate(R.layout.custom_ok_dialog_, null);
        alertDialogBuilder.setView(dialogView);

        final AlertDialog alertDialog = alertDialogBuilder.create();
        alertDialog.requestWindowFeature(Window.FEATURE_NO_TITLE);
        Button dialogButtonOk = (Button) dialogView.findViewById(R.id.customDialogOk);
        Button dialogButtonCancel = (Button) dialogView.findViewById(R.id.customDialogCancel);

        TextView txtTitle = (TextView) dialogView.findViewById(R.id.dialog_title);
        TextView txtMessage = (TextView) dialogView.findViewById(R.id.dialog_message);

        txtTitle.setText(title);
        txtMessage.setText(message);
        dialogButtonOk.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                alertDialog.dismiss();
                if (CommonUtil.isNetworkAvailable(ViewItems.this)) {

                    SharedPreferences pref = getApplicationContext().getSharedPreferences("MyPref", MODE_PRIVATE);
                    String uid = (pref.getString("uid", ""));
                    String Url = "http://demo.adityametals.com/api/delete.php?table=laundry_item&id="+deleteId+"&user_id="+uid;
                    new serverDelete().execute(Url);
                } else {
                    Toast.makeText(ViewItems.this, "Check your internet connection!", Toast.LENGTH_SHORT).show();
                }
//                PreferenceUtil preferenceUtil = new PreferenceUtil(ViewService.this);
//                preferenceUtil.logout();
//                Intent intent = new Intent(ViewService.this, LoginActivity.class);
//                intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK);
//                startActivity(intent);
//                finish();
            }
        });
        dialogButtonCancel.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                alertDialog.dismiss();

            }
        });
        alertDialog.show();
    }

    @Override
    public void adapterActionListener(int state, Object data) {
        if (state == deliverylistAdapter.LIST_TAG && data != null) {
            int pois = (int) data;
            deleteId=maintain.get(pois).getId();
            showMeetingtAlert(ViewItems.this, "Delete", "Are you sure to delete  "+maintain.get(pois).getLaundry_item()+"?");
            // String Url = "http://demo.adityametals.com/api/items.php?service_id="+maintain.get(pois).getId();
            // new Order.update().execute(Url);

//            Intent detail =new Intent(this,DeliveryActivity.class);
//            detail.putExtra("message", maintain.get(pois).getOrder_id());
//            startActivity(detail);
        }

    }

    private class serverUpload extends AsyncTask<String, Void, Boolean> {

        ProgressDialog dialog;


        @Override
        protected void onPreExecute() {
            super.onPreExecute();

            dialog = new ProgressDialog(ViewItems.this);
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
            try {
                JSONObject jsono = new JSONObject(dataOne);
                maintain.clear();
                JSONArray jsonOneArray = jsono.getJSONArray("item");
                for (int i = 0; i < jsonOneArray.length(); i++) {
                    JSONObject jss = jsonOneArray.getJSONObject(i);
                    vitem dboard = new vitem();
                    dboard.setId(jss.getString("id"));
                    dboard.setRanduniq(jss.getString("randuniq"));
                    dboard.setLaundry_item(jss.getString("laundry_item"));
                    dboard.setLaundry_price(jss.getString("laundry_price"));
                    dboard.setLaundry_quantity(jss.getString("laundry_quantity"));

                    dboard.setLaundry_id(jss.getString("laundry_id"));
                    dboard.setService(jss.getString("service"));
                    dboard.setIcon_image(jss.getString("icon_image"));

                    maintain.add(dboard);
                }
                recycler_view = (RecyclerView) findViewById(R.id.recycler_view);
                LinearLayoutManager lmanager = new LinearLayoutManager(ViewItems.this);
                recycler_view.setLayoutManager(lmanager);
                bAdapter = new ViewItemAdapter(maintain, ViewItems.this, ViewItems.this);
                recycler_view.setAdapter(bAdapter);
                bAdapter.notifyDataSetChanged();
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }


    }

    private class serverDelete extends AsyncTask<String, Void, Boolean> {

        ProgressDialog dialog;


        @Override
        protected void onPreExecute() {
            super.onPreExecute();
            dialog = new ProgressDialog(ViewItems.this);
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
                dataTwo = (EntityUtils.toString(entity));


            } catch (IOException e) {
                e.printStackTrace();
            }
            return false;
        }

        @Override
        protected void onPostExecute(Boolean aBoolean) {
            dialog.dismiss();
            try {
                JSONObject jsono = new JSONObject(dataTwo);

                String msg = jsono.getString("error");

                if (msg.equals("false")) {
                    Toast.makeText(ViewItems.this, "Data deleted successfully!", Toast.LENGTH_SHORT).show();
                    if (CommonUtil.isNetworkAvailable(ViewItems.this)) {
                        SharedPreferences pref = getApplicationContext().getSharedPreferences("MyPref", MODE_PRIVATE);
                        String uid = (pref.getString("uid", ""));
                        String Url = "http://demo.adityametals.com/api/view_item.php?user_id="+uid;
                        new serverUpload().execute(Url);
                    } else {
                        Toast.makeText(ViewItems.this, "Check your internet connection!", Toast.LENGTH_SHORT).show();
                    }

                } else {
                    Toast.makeText(ViewItems.this, "Error", Toast.LENGTH_SHORT).show();
                }


            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
    }
}
