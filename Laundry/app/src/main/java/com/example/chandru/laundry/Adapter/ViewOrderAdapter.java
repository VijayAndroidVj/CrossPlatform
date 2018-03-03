package com.example.chandru.laundry.Adapter;

import android.content.Context;
import android.graphics.Color;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.example.chandru.laundry.Listener.AdapterListener;
import com.example.chandru.laundry.Pojo.deliverylist;
import com.example.chandru.laundry.R;
import com.example.chandru.laundry.ViewOrders;

import java.util.List;

/**
 * Created by chandru on 3/2/2018.
 */

public class ViewOrderAdapter extends RecyclerView.Adapter<ViewOrderAdapter.MyViewHolderone> {
    private Context context;
    private List<deliverylist> list;
    private AdapterListener listener;
    public static final int LIST_TAG = 5555;
    int selectedPosition = -1;


    public void setSearchResult(List<deliverylist> maintain) {
        this.list = maintain;
        notifyDataSetChanged();
    }

    public ViewOrderAdapter(List<deliverylist> list, ViewOrders mainActivity, AdapterListener listener) {
        this.list = list;
        this.context = mainActivity;
        this.listener = listener;
    }

    @Override
    public MyViewHolderone onCreateViewHolder(ViewGroup parent, int viewType) {
        View itemView = LayoutInflater.from(context).inflate(R.layout.view_order, parent, false);
        return new MyViewHolderone(itemView);
    }


    @Override
    public void onBindViewHolder(MyViewHolderone holder, final int position) {
        deliverylist dboard = list.get(position);
        holder.tvTwo.setText(dboard.getCustomer_name());
        holder.tvThree.setText(dboard.getOrder_id());
        holder.tvFour.setText(dboard.getTotal_laundry());
        holder.tvFive.setText(dboard.getCustomer_phone());
        holder.tvSix.setText(dboard.getTotal_amount());
        holder.tvSeven.setText(dboard.getDelivery_status());

        if (dboard.getDelivery_status().equals("Open")) {
            holder.tvSeven.setBackgroundColor(Color.parseColor("#35D15B"));
        } else {
            holder.tvSeven.setBackgroundColor(Color.parseColor("#DE4F4F"));
        }


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
        private TextView tvTwo, tvThree, tvFour, tvFive, tvSix, tvSeven;

        private LinearLayout linCat;

        public MyViewHolderone(View view) {
            super(view);

            tvTwo = (TextView) view.findViewById(R.id.tvTwo);
            tvThree = (TextView) view.findViewById(R.id.tvThree);
            tvFour = (TextView) view.findViewById(R.id.tvFour);
            tvFive = (TextView) view.findViewById(R.id.tvFive);
            tvSix = (TextView) view.findViewById(R.id.tvSix);
            tvSeven = (TextView) view.findViewById(R.id.tvSeven);
//            btnAccept=(TextView)view.findViewById(R.id.btnAccept);
//
//
//
//            btnAccept.setOnClickListener(new View.OnClickListener() {
//                @Override
//                public void onClick(View view) {
//                    int pos = (int) view.getTag();
//                    listener.adapterActionListener(LIST_TAG,pos);
//                }
//            });


//            btnAccept.setOnClickListener(new View.OnClickListener() {
//                @Override
//                public void onClick(View view) {
//                    int pos = (int) view.getTag();
//                    listener.adapterActionListener(LIST_TAGa,pos);
//
//                }
//            });
//            btnReject = (Button) view.findViewById(R.id.btnReject);
//            btnReject.setOnClickListener(new View.OnClickListener() {
//                @Override
//                public void onClick(View view) {
//                    int pos = (int) view.getTag();
//                    listener.adapterActionListener(LIST_TAGr,pos);
//
//                }
//            });
        }
    }
}
