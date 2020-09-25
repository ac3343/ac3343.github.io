package com.example.passwordgenerator;

import android.app.IntentService;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.PictureInPictureParams;
import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.util.DebugUtils;
import android.util.Log;
import android.util.Rational;
import android.view.View;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.PopupWindow;
import android.widget.SeekBar;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.annotation.RequiresApi;
import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;
import androidx.preference.PreferenceFragmentCompat;

import org.w3c.dom.Text;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;
import java.util.Random;

import static android.provider.AlarmClock.EXTRA_MESSAGE;

public class SettingsActivity extends AppCompatActivity {
    static boolean useSpec= true, useNums= true, useCaps= true, useLow = true;
    static SeekBar passLengthBar;
    static int stringLength;
    final String CHANNEL_ID = "PassGen";
    NotificationCompat.Builder builder;
    private static final String TAG = "PassGenNotif";
    private static final String PASS_ACTION =  "GEN_PASS_ACTION";

    @RequiresApi(api = Build.VERSION_CODES.N)
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        createNotificationChannel();
        setContentView(R.layout.settings_activity);
        passLengthBar = findViewById(R.id.seekBar3);
        TextView lengthText = findViewById(R.id.textView11);
        lengthText.setText("12");
        passLengthBar.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
            int progressChangedValue = 0;

            public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
                progressChangedValue = progress;
                TextView lengthText = findViewById(R.id.textView11);

                lengthText.setText(String.valueOf(progress + 8));
            }

            public void onStartTrackingTouch(SeekBar seekBar) {
                // TODO Auto-generated method stub
            }

            public void onStopTrackingTouch(SeekBar seekBar) {

            }
        });

        // Create an explicit intent for an Activity in your app
        Intent intent = new Intent(this, SettingsActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        PendingIntent pendingIntent = PendingIntent.getActivity(this, 0, intent, 0);

        Intent genPassIntent = new Intent(this, NotificationActionService.class);
        genPassIntent.setAction(PASS_ACTION);
        genPassIntent.putExtra(TAG + 2, 0);
        PendingIntent genPassPendingIntent =
                PendingIntent.getService(this, 0, genPassIntent, PendingIntent.FLAG_ONE_SHOT);

        builder = new NotificationCompat.Builder(this, CHANNEL_ID)
                .setSmallIcon(R.drawable.ic_launcher_background)
                .setContentTitle("Generate Password")
                .setContentText("Tap To Change Settings")
                .setContentIntent(pendingIntent)
                .setOngoing(true)
                .setPriority(NotificationCompat.PRIORITY_LOW)
                .addAction(R.drawable.ic_launcher_background, getString(R.string.gen_pass),
                        genPassPendingIntent);

        NotificationManagerCompat notificationManager = NotificationManagerCompat.from(this);

        // notificationId is a unique int for each notification that you must define
        notificationManager.notify(TAG, 1, builder.build());


        //Rational aspectRatio = new Rational(10, 7);

        //PictureInPictureParams params = null;
        //if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
        //    params = new PictureInPictureParams.Builder()
        //            .setAspectRatio(aspectRatio).build();
        //    enterPictureInPictureMode(params);
        //}

    }

    public void generatePass(View view){


        //Intent intent = new Intent(this, DisplayMessageActivity.class);
        TextView passText = (TextView) findViewById(R.id.passfield);

        String newPass = createPassword();
        if(newPass == ""){
            Context context = getApplicationContext();
            CharSequence text = "Select at least 1 character type";
            int duration = Toast.LENGTH_SHORT;

            Toast toast = Toast.makeText(context, text, duration);
            toast.show();
            return;
        }

        Context context = getApplicationContext();
        CharSequence text = "New Pass: " + newPass;
        int duration = Toast.LENGTH_SHORT;

        Toast toast = Toast.makeText(context, text, duration);
        toast.show();
        passText.setText(newPass);
        //intent.putExtra(EXTRA_MESSAGE, newPass);
        //startActivity(intent);
    }

    public void copyPass(View view){
        ClipboardManager clipboard = (ClipboardManager) getSystemService(Context.CLIPBOARD_SERVICE);
        TextView passText = (TextView) findViewById(R.id.passfield);
        ClipData clip = ClipData.newPlainText("Password", passText.getText().toString());
        clipboard.setPrimaryClip(clip);

        Context context = getApplicationContext();
        CharSequence text = "Copied Password";
        int duration = Toast.LENGTH_SHORT;

        Toast toast = Toast.makeText(context, text, duration);
        toast.show();
    }

    public void clickCheckBox(View view){
        CheckBox clickedBox = (CheckBox) view;

        switch (clickedBox.getId()){
            case R.id.numCheckBox:
                useNums = clickedBox.isChecked();
                break;
            case R.id.lowCheckBox:
                useLow = clickedBox.isChecked();
                break;
            case R.id.capCheckBox:
                useCaps = clickedBox.isChecked();
                break;
            case R.id.specCheckBox:
                useSpec = clickedBox.isChecked();
                break;
            default:
                return;
        }
    }

    private void createNotificationChannel() {
        // Create the NotificationChannel, but only on API 26+ because
        // the NotificationChannel class is new and not in the support library
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            CharSequence name = getString(R.string.channel_name);
            String description = getString(R.string.channel_description);
            int importance = NotificationManager.IMPORTANCE_LOW;
            NotificationChannel channel = new NotificationChannel(CHANNEL_ID, name, importance);
            channel.setDescription(description);
            // Register the channel with the system; you can't change the importance
            // or other notification behaviors after this
            NotificationManager notificationManager = getSystemService(NotificationManager.class);
            notificationManager.createNotificationChannel(channel);
        }
    }

    public static String createPassword(){
        String specChars = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
        String nums = "0123456789";
        String capLets ="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        String lowLets = "abcdefghijklmnopqrstuvwxyz";

        String validLetters = "";
        if(useSpec){
            validLetters += specChars;
        }
        if(useLow){
            validLetters += lowLets;
        }
        if(useCaps){
            validLetters += capLets;
        }
        if(useNums){
            validLetters += nums;
        }

        Random rng = new Random();

        stringLength = passLengthBar.getProgress() + 8;

        int mandSpec, mandNum, mandCap, mandLow;
        List<Integer> stringPositions =  new ArrayList<Integer>();
        for(int i = 0; i < stringLength; i++){
            stringPositions.add(i, i);
        }

        mandSpec = stringPositions.remove(rng.nextInt(stringPositions.size()));
        mandNum = stringPositions.remove(rng.nextInt(stringPositions.size()));
        mandCap = stringPositions.remove(rng.nextInt(stringPositions.size()));
        mandLow = stringPositions.remove(rng.nextInt(stringPositions.size()));

        String newPass = "";
        for(int i = 0; i < stringLength; i++){
            char randomChar;
            if(i == mandCap && useCaps){
                int randomNum = rng.nextInt(capLets.length());
                randomChar = capLets.charAt(randomNum);
            }
            else if(i == mandLow && useLow){
                int randomNum = rng.nextInt(lowLets.length());
                randomChar = lowLets.charAt(randomNum);
            }
            else if(i == mandNum && useNums){
                int randomNum = rng.nextInt(nums.length());
                randomChar = nums.charAt(randomNum);
            }
            else if(i == mandSpec && useSpec){
                int randomNum = rng.nextInt(specChars.length());
                randomChar = specChars.charAt(randomNum);
            }
            else{
                if(validLetters.length() < 1){
                    return "";
                }
                int randomNum = rng.nextInt(validLetters.length());
                randomChar = validLetters.charAt(randomNum);
            }


            newPass = newPass.concat(String.valueOf(randomChar));
        }
        return newPass;
    }

    public static class NotificationActionService extends IntentService {

        public NotificationActionService() {
            super(NotificationActionService.class.getSimpleName());
        }

        @Override
        protected void onHandleIntent(Intent intent) {
            String action = intent.getAction();
            Log.println(Log.INFO,"Action name",action);
            if (PASS_ACTION.equals(action)) {
                // TODO: handle action 1.
                // If you want to cancel the notification: NotificationManagerCompat.from(this).cancel(NOTIFICATION_ID);
                String newPass = SettingsActivity.createPassword();

                Context context = getApplicationContext();
                int duration = Toast.LENGTH_SHORT;
                CharSequence text;

                if (newPass == "") {
                    text = "Select at least 1 character type";
                } else {
                    text = "Password copied";
                    ClipboardManager clipboard = (ClipboardManager) getSystemService(Context.CLIPBOARD_SERVICE);
                    ClipData clip = ClipData.newPlainText("Password", newPass);
                    clipboard.setPrimaryClip(clip);
                }

                Toast toast = Toast.makeText(context, text, duration);
                toast.show();
            }
        }
    }
}