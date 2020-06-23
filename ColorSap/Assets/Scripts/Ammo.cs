using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Ammo
{
    string name;
    int numOfRounds;
    int prefabIndex;
    int roundsPerShot;
    int damage;

    public Ammo(string _name, int _rounds, int _index, int _rps)
    {
        name = _name;
        numOfRounds = _rounds;
        prefabIndex = _index;
        roundsPerShot = _rps;
    }
}
