package com.example.passwordgenerator;

import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.PopupWindow;
import android.widget.SeekBar;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;
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
    boolean useSpec= true, useNums= true, useCaps= true, useLow = true;
    SeekBar passLengthBar;
    int stringLength;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
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
    }

    public void generatePass(View view){
        //Intent intent = new Intent(this, DisplayMessageActivity.class);
        TextView passText = (TextView) findViewById(R.id.passfield);
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
                    Context context = getApplicationContext();
                    CharSequence text = "Select at least 1 character type";
                    int duration = Toast.LENGTH_SHORT;

                    Toast toast = Toast.makeText(context, text, duration);
                    toast.show();
                    return;
                }
                int randomNum = rng.nextInt(validLetters.length());
                randomChar = validLetters.charAt(randomNum);
            }


            newPass = newPass.concat(String.valueOf(randomChar));
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
}