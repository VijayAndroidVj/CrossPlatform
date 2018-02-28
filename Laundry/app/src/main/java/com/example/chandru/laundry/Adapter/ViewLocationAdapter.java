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
import com.example.chandru.laundry.Pojo.vloation;
import com.example.chandru.laundry.R;
import com.example.chandru.laundry.ViewLocation;

import java.util.List;

/**
 * Created by chandru on 2/28/2018.
 */


public class ViewLocationAdapter extends RecyclerView.Adapter<ViewLocationAdapter.MyViewHolderone> {
    private Context context;
    private List<vloation> list;
    private AdapterListener listener;
    public static final int LIST_TAG = 5555;
    int selectedPosition = -1;


    public ViewLocationAdapter(List<vloation> list, ViewLocation mainActivity, AdapterListener listener) {
        this.list = list;
        this.context = mainActivity;
        this.listener = listener;
    }

    @Override
    public MyViewHolderone onCreateViewHolder(ViewGroup parent, int viewType) {
        View itemView = LayoutInflater.from(context).inflate(R.layout.view_location, parent, false);
        return new MyViewHolderone(itemView);
    }


    @Override
    public void onBindViewHolder(MyViewHolderone holder, final int position) {
        vloation dboard = list.get(position);
        holder.tvTwo.setText(": " + dboard.getLocation_name());
        holder.tvThree.setText(": " + dboard.getLocation_description());

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
        private TextView tvTwo, tvThree;

        private LinearLayout linCat;

        public MyViewHolderone(View view) {
            super(view);

            tvTwo = (TextView) view.findViewById(R.id.tvTwo);
            tvThree = (TextView) view.findViewById(R.id.tvThree);


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
