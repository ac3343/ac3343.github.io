using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Player : MonoBehaviour
{
    AllColors allColors;
    Queue<SoulColor> sappedColors;

    Weapon equippedWeapon;

    // Start is called before the first frame update
    void Start()
    {
        allColors = new AllColors();
        sappedColors = new Queue<SoulColor>();       
    }

    // Update is called once per frame
    void Update()
    {
        
        if (Input.GetKeyDown(KeyCode.Space))
        {
            SapColor();
        }
        if (Input.GetKeyDown(KeyCode.RightArrow)){
            NextColor();
        }
        if (Input.GetKeyDown(KeyCode.LeftArrow))
        {
            PrevColor();
        }
        if (Input.GetKeyDown(KeyCode.A))
        {
            UseBoost();
        }
        if (Input.GetKeyDown(KeyCode.S))
        {
            CreateWeapon();
        }
        if (Input.anyKeyDown)
        {
            PrintInfo();
        }
    }

    void SapColor()
    {
        if(sappedColors.Count < 3)
        {
            SoulColor sappedColor = GetColor();
            sappedColors.Enqueue(sappedColor);
            Debug.Log("Sapped " + sappedColor.Name);
        }
        else
        {
            Debug.Log("Colors full");
        }
    }

    SoulColor GetColor()
    {
        return allColors.ColorList[Random.Range(0, 4)];
    }
    void PrintColors()
    {
        Debug.Log(sappedColors.Count + " Colors Stored");
        for(int i = 0; i < sappedColors.Count; i++)
        {
            SoulColor currentColor = sappedColors.Dequeue();
            Debug.Log("Color " + (i + 1) + ": " + currentColor.Name);
            sappedColors.Enqueue(currentColor);
        }
    }
    void PrintInfo()
    {
        string info = "Player\nEquipped Weapon: ";
        info += equippedWeapon == null ? "None" : equippedWeapon.Name;
        info += "\nColors[" +sappedColors.Count+"]: ";
        for (int i = 0; i < sappedColors.Count; i++)
        {
            SoulColor currentColor = sappedColors.Dequeue();
            info += currentColor.Name + ", ";
            sappedColors.Enqueue(currentColor);
        }

        Debug.Log(info);
    }

    void NextColor()
    {
        SoulColor currentColor = sappedColors.Dequeue();
        sappedColors.Enqueue(currentColor);
    }

    void PrevColor()
    {
        NextColor();
        NextColor();
    }

    void CreateWeapon()
    {
        if(sappedColors.Count > 0)
        {
            SoulColor currentColor = sappedColors.Dequeue();
            equippedWeapon = currentColor.ColorWeapon;
            Debug.Log("Equipped Weapon is " + equippedWeapon.Name);
        }
        else
        {
            Debug.Log("No color available to create weapon");
        }
    }

    void DestroyWeapon()
    {
        string weaponName = equippedWeapon.Name;
        equippedWeapon = null;
        Debug.Log(weaponName + " destroyed");
    }

    void UseBoost()
    {
        SoulColor currentColor = sappedColors.Dequeue();
        Debug.Log(currentColor.BoostEffect + " increased");
    }
    
    void CreateAmmo()
    {

    }
}
