package com.example.chandru.laundry;

import android.app.DatePickerDialog;
import android.app.ProgressDialog;
import android.app.TimePickerDialog;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.AsyncTask;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.TimePicker;
import android.widget.Toast;

import com.example.chandru.laundry.Adapter.deliveryAdapter;
import com.example.chandru.laundry.Listener.AdapterListener;
import com.example.chandru.laundry.Pojo.delivery;

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
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Locale;

public class DeliveryActivity extends AppCompatActivity implements View.OnClickListener, AdapterListener {
    private List<delivery> maintain = new ArrayList<>();
    private deliveryAdapter bAdapter;
    private RecyclerView recycler_view;
    private String dataOne, dataTwos, Billno, bamt,uid,dataTwo;
    private TextView cname, bill, phone, address, qty, amt, advance, balance,pickup,delivery;
    private EditText editText3;
    Calendar myCalendar = Calendar.getInstance();
    private int mYear, mMonth, mDay, mHour, mMinute;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_delivery_details);
        getSupportActionBar().setTitle("Delivey Details");
        cname = (TextView) findViewById(R.id.cname);
        bill = (TextView) findViewById(R.id.bill);
        phone = (TextView) findViewById(R.id.phone);
        address = (TextView) findViewById(R.id.address);
        qty = (TextView) findViewById(R.id.qty);
        amt = (TextView) findViewById(R.id.amt);
        advance = (TextView) findViewById(R.id.advance);
        balance = (TextView) findViewById(R.id.balance);
        pickup = (TextView) findViewById(R.id.pick);
        delivery = (TextView) findViewById(R.id.delivery);
        editText3 = (EditText)findViewById(R.id.editText3);



        editText3.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {


                new DatePickerDialog(DeliveryActivity.this, ye, myCalendar
                        .get(Calendar.YEAR), myCalendar.get(Calendar.MONTH),
                        myCalendar.get(Calendar.DAY_OF_MONTH)).show();

            }
        });

        findViewById(R.id.btnDeliveryupdate).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (CommonUtil.isNetworkAvailable(DeliveryActivity.this)) {
                    String bills = bill.getText().toString();
                    String dastes = editText3.getText().toString();
                    SharedPreferences pref = getApplicationContext().getSharedPreferences("MyPref", MODE_PRIVATE);
                    String uid = (pref.getString("uid", ""));
                    String Url = "http://demo.adityametals.com/api/update_delivery_date.php?bill="+bills+"&date="+dastes+"&user_id="+uid;
                    new serverDateUpdate().execute(Url);
                } else {
                    Toast.makeText(DeliveryActivity.this, "Check your internet connection!", Toast.LENGTH_SHORT).show();
                }
            }
        });


        SharedPreferences pref = getApplicationContext().getSharedPreferences("MyPref", MODE_PRIVATE);
        uid = (pref.getString("uid", ""));


        findViewById(R.id.cancelbtn).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                onBackPressed();
            }
        });
        findViewById(R.id.btnDelivery).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                findViewById(R.id.progress).setVisibility(View.VISIBLE);
                new Handler().postDelayed(new Runnable() {
                    @Override
                    public void run() {

                        EditText re = (EditText) findViewById(R.id.receive);
                        EditText remar = (EditText) findViewById(R.id.remark);
                        String receive = re.getText().toString();
                        String remark = remar.getText().toString();
                        //http://demo.adityametals.com/api/update_delivery.php?bill="+Billno+"&paid="+bamt+"&summary="+remark+"&recieve="+receive
                        String Url = "http://demo.adityametals.com/api/update_delivery.php?bill=" + Billno + "&paid=" + bamt + "&summary=" + remark + "&recieve=" + receive+"&user_id="+uid;
                        new customerentry().execute(Url);

//                        Toast.makeText(DeliveryActivity.this, "Delivered successfully", Toast.LENGTH_SHORT).show();
//                        Intent intent = new Intent(DeliveryActivity.this, MainActivity.class);
//                        intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK);
//                        startActivity(intent);
//                        finish();
//                        findViewById(R.id.progress).setVisibility(View.GONE);
                    }
                }, 1500);
            }
        });

        Window window = this.getWindow();
        window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
        window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            window.setStatusBarColor(this.getResources().getColor(R.color.background_color));
        }
        Bundle bundle = getIntent().getExtras();
        String message = bundle.getString("message");
        if (CommonUtil.isNetworkAvailable(DeliveryActivity.this)) {
            String Url = "http://demo.adityametals.com/api/view_order.php?bill_no=" + message+"&user_id="+uid;
            new serverUpload().execute(Url);
        } else {
            Toast.makeText(DeliveryActivity.this, "Check your internet connection!", Toast.LENGTH_SHORT).show();
        }


    }

    @Override
    public void onClick(View view) {

    }

    @Override
    public void adapterActionListener(int state, Object data) {

    }

    private class serverUpload extends AsyncTask<String, Void, Boolean> {
        ProgressDialog dialog;

        @Override
        protected void onPreExecute() {
            super.onPreExecute();
            dialog = new ProgressDialog(DeliveryActivity.this);
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
                String[] separated = dataOne.split("\\}\\{");
                String one = separated[0] + "}";
                String two = "{" + separated[1];
                Log.d("success", one);
                maintain.clear();
                JSONObject jsono = new JSONObject(one);
                JSONArray jsonOneArrayOne = jsono.getJSONArray("details");
                for (int i = 0; i < jsonOneArrayOne.length(); i++) {
                    JSONObject jssOne = jsonOneArrayOne.getJSONObject(i);
//cname,bill,phone,address,qty,amt,advance,balance
                    String Cname = jssOne.getString("customer_name");
                    Billno = jssOne.getString("order_id");
                    String phones = jssOne.getString("customer_phone");
                    String addresss = jssOne.getString("customer_address");
                    String amtt = jssOne.getString("total_amount");
                    String adamt = jssOne.getString("advance_amount");
                    bamt = jssOne.getString("balance_amount");
                    String qtyts = jssOne.getString("total_laundry");
                    String pickupss = jssOne.getString("order_date");
                    String deliveryss = jssOne.getString("delivery_date");

                    cname.setText(Cname);
                    bill.setText(Billno);
                    phone.setText(phones);
                    address.setText(addresss);
                    qty.setText(qtyts);
                    amt.setText(amtt);
                    advance.setText(adamt);
                    balance.setText(bamt);
                    pickup.setText(pickupss);
                    delivery.setText(deliveryss);
                    editText3.setText(deliveryss);


//                    deliverylist dboard = new deliverylist();
//                    dboard.setId(jss.getString("id"));
//                    dboard.setOrder_id(jss.getString("order_id"));
//                    dboard.setStore_ref(jss.getString("store_ref"));
//                    dboard.setOrder_date(jss.getString("order_date"));
//                    dboard.setCustomer_name(jss.getString("customer_name"));
//
//                    dboard.setCustomer_phone(jss.getString("customer_phone"));
//                    dboard.setCustomer_address(jss.getString("customer_address"));
//                    dboard.setDelivery_status(jss.getString("delivery_status"));
//                    dboard.setLocation(jss.getString("location"));
//                    dboard.setLaundry_for(jss.getString("laundry_for"));
//
//                    dboard.setDelivery_date(jss.getString("delivery_date"));
//                    dboard.setTotal_laundry(jss.getString("total_laundry"));
//                    dboard.setTotal_amount(jss.getString("total_amount"));
//                    dboard.setAdvance_amount(jss.getString("advance_amount"));
//                    dboard.setBalance_amount(jss.getString("balance_amount"));
//
//                    dboard.setPaid(jss.getString("paid"));
//                    dboard.setDelivered_on(jss.getString("delivered_on"));
//                    dboard.setLaundry_(jss.getString("laundry_"));
//                    dboard.setCheck_(jss.getString("check_"));
//                    dboard.setSummary(jss.getString("summary"));
                    // maintain.add(dboard);
                }

                JSONObject jsonoss = new JSONObject(two);
                JSONArray jsonOneArray = jsonoss.getJSONArray("items");
                for (int i = 0; i < jsonOneArray.length(); i++) {
                    JSONObject jss = jsonOneArray.getJSONObject(i);
                    delivery dboard = new delivery();
                    dboard.setId(jss.getString("id"));
                    dboard.setBill_id(jss.getString("bill_id"));
                    dboard.setService_name(jss.getString("service_name"));
                    dboard.setService_id(jss.getString("service_id"));
                    dboard.setItem_name(jss.getString("item_name"));
                    dboard.setItem_id(jss.getString("item_id"));
                    dboard.setPrice(jss.getString("price"));
                    dboard.setQuantity(jss.getString("quantity"));
                    dboard.setTotal(jss.getString("total"));
                    dboard.setDate(jss.getString("date"));
                    dboard.setCount(jss.getString("count"));
                    maintain.add(dboard);
                }


                recycler_view = (RecyclerView) findViewById(R.id.recycler_view_one);
                LinearLayoutManager lmanager = new LinearLayoutManager(DeliveryActivity.this);
                recycler_view.setLayoutManager(lmanager);
                bAdapter = new deliveryAdapter(maintain, DeliveryActivity.this, DeliveryActivity.this);
                recycler_view.setAdapter(bAdapter);
                bAdapter.notifyDataSetChanged();
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
    }

    DatePickerDialog.OnDateSetListener ye = new DatePickerDialog.OnDateSetListener() {


        @Override
        public void onDateSet(DatePicker view, int year, int monthOfYear,
                              int dayOfMonth) {
            // TODO Auto-generated method stub
            myCalendar.set(Calendar.YEAR, year);
            myCalendar.set(Calendar.MONTH, monthOfYear);
            myCalendar.set(Calendar.DAY_OF_MONTH, dayOfMonth);
            updateLabelOne();
        }

    };

    private void updateLabelOne() {

        // Get Current Time
        final Calendar c = Calendar.getInstance();
        mHour = c.get(Calendar.HOUR_OF_DAY);
        mMinute = c.get(Calendar.MINUTE);





        // Launch Time Picker Dialog
        TimePickerDialog timePickerDialog = new TimePickerDialog(this,
                new TimePickerDialog.OnTimeSetListener() {

                    @Override
                    public void onTimeSet(TimePicker view, int hourOfDay,
                                          int minute) {
                        String myFormat = "dd-MM-yyyy"; //In which you need put here
                        SimpleDateFormat sdf = new SimpleDateFormat(myFormat, Locale.US);

                        editText3.setText(sdf.format(myCalendar.getTime() )+","+hourOfDay + ":" + minute);
                    }
                }, mHour, mMinute, false);
        timePickerDialog.show();


    }


    public void next(View view) {
        EditText re = (EditText) findViewById(R.id.receive);
        EditText remar = (EditText) findViewById(R.id.remark);
        String receive = re.getText().toString();
        String remark = remar.getText().toString();
        //http://demo.adityametals.com/api/update_delivery.php?bill="+Billno+"&paid="+bamt+"&summary="+remark+"&recieve="+receive
        String Url = "http://demo.adityametals.com/api/update_delivery.php?bill=" + Billno + "&paid=" + bamt + "&summary=" + remark + "&recieve=" + receive+"&user_id="+uid;
        new customerentry().execute(Url);
    }

    private class customerentry extends AsyncTask<String, Void, Boolean> {


        ProgressDialog dialog;

        @Override
        protected void onPreExecute() {
            super.onPreExecute();
            dialog = new ProgressDialog(DeliveryActivity.this);
            dialog.setMessage("Loading in.., please wait");
            dialog.setTitle("");
            dialog.show();
            dialog.setCancelable(false);
        }

        @Override
        protected Boolean doInBackground(String... params) {
            try {
                HttpGet httppost = new HttpGet(params[0]);
                HttpClient httpclient = new DefaultHttpClient();
                HttpResponse response = httpclient.execute(httppost);
                HttpEntity entity = response.getEntity();
                dataTwos = (EntityUtils.toString(entity));
            } catch (IOException e) {
                e.printStackTrace();
            }
            return false;
        }

        @Override
        protected void onPostExecute(Boolean aBoolean) {
            dialog.dismiss();
            try {
                JSONObject jsono = new JSONObject(dataTwos);
                String msg = jsono.getString("error");

                if (msg.equals("false")) {
                    //   Toast.makeText(DeliveryActivity.this, "Successfully updated", Toast.LENGTH_SHORT).show();
                    //  Intent myIntent = new Intent(DeliveryActivity.this, MainActivity.class);
                    //  ActivityOptions options =
                    //      ActivityOptions.makeCustomAnimation(DeliveryActivity.this, R.anim.left_enter, R.anim.left_out);
                    // startActivity(myIntent, options.toBundle());

                    Toast.makeText(DeliveryActivity.this, "Delivered successfully", Toast.LENGTH_SHORT).show();
                    Intent intent = new Intent(DeliveryActivity.this, MainActivity.class);
                    intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK);
                    startActivity(intent);
                    finish();
                    findViewById(R.id.progress).setVisibility(View.GONE);
                } else {
                    Toast.makeText(DeliveryActivity.this, "Could not Connect To the Server..", Toast.LENGTH_SHORT).show();
                }

            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
    }


    private class serverDateUpdate extends AsyncTask<String, Void, Boolean> {

        ProgressDialog dialog;


        @Override
        protected void onPreExecute() {
            super.onPreExecute();
            dialog = new ProgressDialog(DeliveryActivity.this);
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
                    Toast.makeText(DeliveryActivity.this, "Data deleted successfully!", Toast.LENGTH_SHORT).show();


                } else {
                    Toast.makeText(DeliveryActivity.this, "Error", Toast.LENGTH_SHORT).show();
                }


            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
    }
}
