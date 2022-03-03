using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Weapon
{
    string name;
    int damagePerHit;
    int durability;
    int comboLength;

    public string Name
    {
        get { return name; }
    }

    public int DamagePerHit
    {
        get { return damagePerHit; }
    }
    
    public int Durability
    {
        get { return durability; }
    }


    public Weapon(string _name, int _dph, int _dura)
    {
        name = _name;
        durability = _dura;
        damagePerHit = _dph;
    }
}
