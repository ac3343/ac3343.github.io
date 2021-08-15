using System.Collections;
using System.Collections.Generic;
using UnityEngine;


public struct Card
{
    string m_cardName;
    string m_cardDesc;
    string m_tag1;

    CardEffect m_Effect;

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

    public Card(string a_sName, string a_sDesc, string a_sTag)
    {
        m_cardName = a_sName;
        m_cardDesc = a_sDesc;
        m_tag1 = a_sTag;
        m_Effect = CardEffects.Attack(4.5f);
    }

    public static Card FromCSV(string[] csvFields)
    {
        return new Card(csvFields[0], csvFields[1], csvFields[2]);
    }

    
}
