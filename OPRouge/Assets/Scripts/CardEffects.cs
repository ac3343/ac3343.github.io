using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public delegate void CardEffect(Character target);
public class CardEffects
{
    public static CardEffect Attack(float a_fDamage)
    {
        void NewAttack(Character target)
        {
            target.TakeDamge(a_fDamage);
        }

        return NewAttack;
    }
}
