package com.example.chandru.laundry.Adapter;

import android.content.Context;
import android.graphics.Color;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.bumptech.glide.Glide;
import com.bumptech.glide.load.engine.DiskCacheStrategy;
import com.example.chandru.laundry.Listener.AdapterListener;
import com.example.chandru.laundry.Pojo.vcustomer;
import com.example.chandru.laundry.Pojo.vservice;
import com.example.chandru.laundry.R;
import com.example.chandru.laundry.ViewCustomer;
import com.example.chandru.laundry.ViewService;

import java.util.List;

/**
 * Created by USER on 3/2/2018.
 */

public class ViewCustomerAdapter extends RecyclerView.Adapter<ViewCustomerAdapter.MyViewHolderone> {
    private Context context;
    private List<vcustomer> list;
    private AdapterListener listener;
    public static final int LIST_TAG = 5555;
    int selectedPosition = -1;


    public ViewCustomerAdapter(List<vcustomer> list, ViewCustomer mainActivity, ViewCustomer listener) {
        this.list = list;
        this.context = mainActivity;
        this.listener = listener;
    }

    @Override
    public MyViewHolderone onCreateViewHolder(ViewGroup parent, int viewType) {
        View itemView = LayoutInflater.from(context).inflate(R.layout.view_customer, parent, false);
        return new MyViewHolderone(itemView);
    }


    @Override
    public void onBindViewHolder(MyViewHolderone holder, final int position) {
        vcustomer dboard = list.get(position);
        String name = dboard.getCustomer_name();
        name = name.substring(0, 1).toUpperCase() + name.substring(1, name.length());
        holder.title.setText(name);
        holder.subtitle.setText(dboard.getCustomer_contact1());
        holder.subtitleone.setText(dboard.getCustomer_address());


        if (selectedPosition == position)
            holder.itemView.setBackgroundColor(Color.parseColor("#009688"));
        else
            holder.itemView.setBackgroundColor(Color.parseColor("#ffffff"));

        holder.itemView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                selectedPosition = position;
                notifyDataSetChanged();

            }
        });

        // holder.btnAccept.setTag(position);


    }

    @Override
    public int getItemCount() {
        return list != null ? list.size() : 0;
    }

    public class MyViewHolderone extends RecyclerView.ViewHolder {
        private TextView title, subtitle, subtitleone;


        private LinearLayout linCat;

        public MyViewHolderone(View view) {
            super(view);

            title = (TextView) view.findViewById(R.id.title);
            subtitle = (TextView) view.findViewById(R.id.subtitle);
            subtitleone = (TextView) view.findViewById(R.id.subtitleone);



//            btnAccept.setOnClickListener(new View.OnClickListener() {
//                @Override
//                public void onClick(View view) {
//                    int pos = (int) view.getTag();
//                    listener.adapterActionListener(LIST_TAG,pos);
//                }
//            });


        }
    }
}
