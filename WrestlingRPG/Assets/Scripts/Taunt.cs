using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Taunt
{
    //Fields
    string name;
    string description;
    int cost;

    //Effect delegates and instances
    public delegate int AttackEffect (int attackValue);
    AttackEffect boostAttack;
    public delegate void UniqueEffect();
    UniqueEffect uniqueFunction;

    //Properties
    public string Name
    {
        get { return name; }
    }

    public string Description
    {
        get { return description; }
    }

    public int Cost
    {
        get { return cost; }
    }

    public AttackEffect AttackModifier
    {
        get { if (boostAttack != null) return boostAttack; else return null; }
    }

    public UniqueEffect OtherEffect
    {
        get { if (uniqueFunction != null) return uniqueFunction; else return null; }
    }

    //Constructor
    public Taunt(string name, string description, int cost, AttackEffect effectFunction)
    {
        //Sets up fields
        this.name = name;
        this.description = description;
        this.cost = cost;

        //Sets effect function
        boostAttack = effectFunction;
        uniqueFunction = null;
    }

    public Taunt(string name, string description, int cost, UniqueEffect effectFunction)
    {
        //Sets up fields
        this.name = name;
        this.description = description;
        this.cost = cost;

        //Sets effect function
        boostAttack = null;
        uniqueFunction = effectFunction;
    }


}
