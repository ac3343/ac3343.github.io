using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Ammo
{
    string name;
    int numOfRounds;
    int roundsPerShot;
    int damage;

    public int NumOfRounds
    {
        get { return numOfRounds; }
    }

    public int Damage
    {
        get { return damage; }
    }

    public int RoundsPerShot
    {
        get { return roundsPerShot; }
    }

    public Ammo(string _name, int _rounds, int _rps, int _damage)
    {
        name = _name;
        numOfRounds = _rounds;
        roundsPerShot = _rps;
        damage = _damage;
    }
}
