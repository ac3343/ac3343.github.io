using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public struct Attack
{
    string attackName;
    int damage;
    string type;
    int cost;

    public int Damage
    {
        get { return damage; }
    }

    public string Name
    {
        get { return attackName; }
    }
    public string Type
    {
        get { return type; }
    }
    public int Cost
    {
        get { return cost; }
    }

    public Attack(string name, int damage, string type, int cost)
    {
        this.attackName = name;
        this.damage = damage;
        this.type = type;
        this.cost = cost;
    }
}
