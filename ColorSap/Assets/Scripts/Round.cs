using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Round
{
    int damage;

    public int Damage
    {
        get { return damage; }
    }

    public Round(int _damage)
    {
        damage = _damage;
    }
}
