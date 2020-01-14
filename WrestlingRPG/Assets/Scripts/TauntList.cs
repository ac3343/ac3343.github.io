using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class TauntList
{
    //Taunts
    static Taunt roar = new Taunt("Roar", "Boosts attack", 3, new Taunt.AttackEffect(DoubleAttackPower));
    

    //Taunt properties
    public static Taunt Roar
    {
        get { return roar; }
    }
    //Taunt methods
    static int DoubleAttackPower(int attackValue)
    {
        return attackValue * 2;
    }
}
