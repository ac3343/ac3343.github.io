using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public delegate void CardEffect(Character target);
public delegate void CardEffectCrew(Crew target);
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

    public static CardEffectCrew AttackCrew(float a_fDamage)
    {
        void NewAttack(Crew target)
        {
            target.TakeDamge(a_fDamage);
        }

        return NewAttack;
    }
}
