using System.Collections;
using System.Collections.Generic;
using UnityEngine;


public struct Card
{
    string m_cardName;
    string m_cardDesc;
    string m_tag1;

    CardEffect m_Effect;
    CardEffectCrew m_CrewEffect;

    const string FileToRead = "deck.csv";

    public string Name
    {
        get { return m_cardName; }
    }

    public string Description
    {
        get { return m_cardDesc; }
    }

    public string Tag
    {
        get { return m_tag1; }
    }

    public CardEffect PlayEffect
    {
        get { return m_Effect; }
    }

    public CardEffectCrew PlayCrewEffect
    {
        get { return m_CrewEffect; }
    }

    public Card(string a_sName, string a_sDesc, string a_sDamage)
    {
        m_cardName = a_sName;
        m_cardDesc = a_sDesc;
        m_tag1 = a_sDamage;

        float damage = 0;
        float.TryParse(a_sDamage, out damage);

        m_Effect = CardEffects.Attack(damage);
        m_CrewEffect = CardEffects.AttackCrew(damage);
    }

    public static Card FromCSV(string[] csvColumns)
    {
        return new Card(csvColumns[0], csvColumns[1], csvColumns[2]);
    }

    
}
