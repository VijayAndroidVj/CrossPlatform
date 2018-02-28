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
import com.example.chandru.laundry.Pojo.vservice;
import com.example.chandru.laundry.R;
import com.example.chandru.laundry.ViewService;

import java.util.List;


public class ViewServiceAdapter extends RecyclerView.Adapter<ViewServiceAdapter.MyViewHolderone> {
    private Context context;
    private List<vservice> list;
    private AdapterListener listener;
    public static final int LIST_TAG = 5555;
    int selectedPosition = -1;


    public ViewServiceAdapter(List<vservice> list, ViewService mainActivity, ViewService listener) {
        this.list = list;
        this.context = mainActivity;
        this.listener = listener;
    }

    @Override
    public MyViewHolderone onCreateViewHolder(ViewGroup parent, int viewType) {
        View itemView = LayoutInflater.from(context).inflate(R.layout.view_service, parent, false);
        return new MyViewHolderone(itemView);
    }


    @Override
    public void onBindViewHolder(MyViewHolderone holder, final int position) {
        vservice dboard = list.get(position);
        String name = dboard.getCategory_name();
        name = name.substring(0, 1).toUpperCase() + name.substring(1, name.length());
        holder.title.setText(name);
        holder.subtitle.setText(dboard.getCategory_description());
        holder.subtitle.setVisibility(View.GONE);
        holder.subtitleone.setVisibility(View.GONE);
//        holder.subtitleone.setText(dboard.getRanduniq());
        Glide.with(context)
                .load("http://demo.adityametals.com/" + dboard.getIcon_image())
                .asBitmap()
                .diskCacheStrategy(DiskCacheStrategy.NONE)
                .into(holder.icon);


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

        private ImageView icon;

        private LinearLayout linCat;

        public MyViewHolderone(View view) {
            super(view);

            title = (TextView) view.findViewById(R.id.title);
            subtitle = (TextView) view.findViewById(R.id.subtitle);
            subtitleone = (TextView) view.findViewById(R.id.subtitleone);
            icon = (ImageView) view.findViewById(R.id.icon);


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
