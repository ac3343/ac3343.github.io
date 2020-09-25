package com.example.passwordgenerator;

import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;

import android.app.PictureInPictureParams;
import android.os.Build;
import android.os.Bundle;
import android.util.Rational;

public class PopUpActivity extends AppCompatActivity {

    @RequiresApi(api = Build.VERSION_CODES.N)
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_pop_up);
        Rational aspectRatio = new Rational(10, 7);

        PictureInPictureParams params = null;
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
            params = new PictureInPictureParams.Builder()
                    .setAspectRatio(aspectRatio).build();
            enterPictureInPictureMode(params);
        }
    }
}