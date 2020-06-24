using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SoulColor
{
    string name;
    string boostEffect;
    Weapon colorWeapon;
    Ammo ammoType;

    public string Name
    {
        get { return name; }
    }

    public string BoostEffect
    {
        get { return boostEffect; }
    }

    public Weapon ColorWeapon
    {
        get { return colorWeapon; }
    }

    public Ammo AmmoType
    {
        get { return ammoType; }
    }

    public SoulColor(string _name, string _boostEffect, Weapon _colorWeapon, Ammo _ammoType)
    {
        name = _name;
        boostEffect = _boostEffect;
        colorWeapon = _colorWeapon;
        ammoType = _ammoType;
    }
 
}
