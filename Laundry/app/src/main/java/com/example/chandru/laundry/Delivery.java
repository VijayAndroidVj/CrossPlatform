package com.example.chandru.laundry;

import android.app.ProgressDialog;
import android.app.SearchManager;
import android.content.Context;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Build;
import android.os.Bundle;
import android.support.v4.view.MenuItemCompat;
import android.support.v4.widget.SwipeRefreshLayout;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.SearchView;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.Toast;

import com.example.chandru.laundry.Adapter.deliverylistAdapter;
import com.example.chandru.laundry.Listener.AdapterListener;
import com.example.chandru.laundry.Pojo.deliverylist;

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

public class Delivery extends AppCompatActivity implements View.OnClickListener, AdapterListener, SearchView.OnQueryTextListener {

    private List<deliverylist> maintain = new ArrayList<>();
    private deliverylistAdapter bAdapter;
    private RecyclerView recycler_view;
    private String dataOne;
    private SwipeRefreshLayout swipeRefreshLayout;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_delivery);
        getSupportActionBar().setTitle("Delivery details");
        Window window = this.getWindow();
        window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
        window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            window.setStatusBarColor(this.getResources().getColor(R.color.background_color));
        }
        swipeRefreshLayout = (SwipeRefreshLayout) findViewById(R.id.swipeRefreshLayout);

        if (CommonUtil.isNetworkAvailable(Delivery.this)) {
            String Url = "http://demo.adityametals.com/api/order_list.php";
            new serverUpload().execute(Url);
        } else {
            Toast.makeText(Delivery.this, "Check your internet connection!", Toast.LENGTH_SHORT).show();
        }


        swipeRefreshLayout.setOnRefreshListener(new SwipeRefreshLayout.OnRefreshListener() {
            @Override
            public void onRefresh() {
                // Refresh items

                if (CommonUtil.isNetworkAvailable(Delivery.this)) {
                    String Url = "http://demo.adityametals.com/api/order_list.php";
                    new serverUpload().execute(Url);
                } else {
                    hideRefresh();
                    Toast.makeText(Delivery.this, "Check your internet connection!", Toast.LENGTH_SHORT).show();
                }


            }
        });


    }

    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater menuInflater = getMenuInflater();
        menuInflater.inflate(R.menu.search, menu);

        MenuItem searchItem = menu.findItem(R.id.action_search);

        SearchManager searchManager = (SearchManager) Delivery.this.getSystemService(Context.SEARCH_SERVICE);

        SearchView searchView = null;
        if (searchItem != null) {
            searchView = (SearchView) searchItem.getActionView();

            searchView.setOnQueryTextListener( Delivery.this);
        }
        if (searchView != null) {
            searchView.setSearchableInfo(searchManager.getSearchableInfo(Delivery.this.getComponentName()));
        }
        return super.onCreateOptionsMenu(menu);
    }

//    @Override
//    public boolean onCreateOptionsMenu(Menu menu) {
//        // Inflate the menu; this adds items to the action bar if it is present.
//        getMenuInflater().inflate(R.menu.search, menu);
//        final MenuItem item = menu.findItem(R.id.action_search);
//        final SearchView searchView = (SearchView) MenuItemCompat.getActionView(item);
//        searchView.setOnQueryTextListener( Delivery.this);
//
//        item.setOnActionExpandListener( new MenuItem.OnActionExpandListener() {
//
//            @Override
//            public boolean onMenuItemActionExpand(MenuItem item) {
//
//                return true;
//            }
//
//            @Override
//            public boolean onMenuItemActionCollapse(MenuItem item) {
//                // Do something when collapsed
//                bAdapter.setSearchResult(maintain);
//                return true; // Return true to collapse action view
//
//
//            }
//
//        });
//        return true;
//    }

    @Override
    public boolean onQueryTextSubmit(String query) {
        return false;
    }

    @Override
    public boolean onQueryTextChange(String newText) {
        final List<deliverylist> filteredModelList = filter(maintain, newText);
        bAdapter.setSearchResult(filteredModelList);
        return true;
    }

    private List<deliverylist> filter(List<deliverylist> maintain, String newText) {
        newText = newText.toLowerCase();
        final List<deliverylist> filteredModelList = new ArrayList<>();
        for (deliverylist model : maintain) {
            final String text = model.getOrder_id().toLowerCase();
            if (text.contains(newText)) {
                filteredModelList.add(model);
            }
        }

        return filteredModelList;
    }




    public void hideRefresh() {
        try {
            if (swipeRefreshLayout != null)
                swipeRefreshLayout.setRefreshing(false);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void onClick(View view) {

    }

    @Override
    public void adapterActionListener(int state, Object data) {
        if (state == deliverylistAdapter.LIST_TAG && data != null) {
            int pois = (int) data;
            // String Url = "http://demo.adityametals.com/api/items.php?service_id="+maintain.get(pois).getId();
            // new Order.update().execute(Url);

            Intent detail = new Intent(this, DeliveryActivity.class);
            detail.putExtra("message", maintain.get(pois).getOrder_id());
            startActivity(detail);
        }

    }

    

    private class serverUpload extends AsyncTask<String, Void, Boolean> {

        ProgressDialog dialog;


        @Override
        protected void onPreExecute() {
            super.onPreExecute();

            dialog = new ProgressDialog(Delivery.this);
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
            hideRefresh();
            try {
                JSONObject jsono = new JSONObject(dataOne);
                maintain.clear();
                JSONArray jsonOneArray = jsono.getJSONArray("details");
                for (int i = 0; i < jsonOneArray.length(); i++) {
                    JSONObject jss = jsonOneArray.getJSONObject(i);
                  //  String abc =jss.getString("delivery_status");

                    if(jss.getString("delivery_status").equalsIgnoreCase("Delivered")){
                        deliverylist dboard = new deliverylist();
                        dboard.setId(jss.getString("id"));
                        dboard.setOrder_id(jss.getString("order_id"));
                        dboard.setStore_ref(jss.getString("store_ref"));
                        dboard.setOrder_date(jss.getString("order_date"));
                        dboard.setCustomer_name(jss.getString("customer_name"));

                        dboard.setCustomer_phone(jss.getString("customer_phone"));
                        dboard.setCustomer_address(jss.getString("customer_address"));
                        dboard.setDelivery_status(jss.getString("delivery_status"));
                        dboard.setLocation(jss.getString("location"));
                        dboard.setLaundry_for(jss.getString("laundry_for"));

                        dboard.setDelivery_date(jss.getString("delivery_date"));
                        dboard.setTotal_laundry(jss.getString("total_laundry"));
                        dboard.setTotal_amount(jss.getString("total_amount"));
                        dboard.setAdvance_amount(jss.getString("advance_amount"));
                        dboard.setBalance_amount(jss.getString("balance_amount"));

                        dboard.setPaid(jss.getString("paid"));
                        dboard.setDelivered_on(jss.getString("delivered_on"));
                        dboard.setLaundry_(jss.getString("laundry_"));
                        dboard.setCheck_(jss.getString("check_"));
                        dboard.setSummary(jss.getString("summary"));
                        maintain.add(dboard);

                    }

                }
                recycler_view = (RecyclerView) findViewById(R.id.recycler_view);
                LinearLayoutManager lmanager = new LinearLayoutManager(Delivery.this);
                recycler_view.setLayoutManager(lmanager);
                bAdapter = new deliverylistAdapter(maintain, Delivery.this, Delivery.this);
                recycler_view.setAdapter(bAdapter);
                bAdapter.notifyDataSetChanged();
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
    }
}
